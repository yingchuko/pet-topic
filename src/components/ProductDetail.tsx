import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Star } from "lucide-react";
import { useStore } from "../store/useStore";
import type { Product } from "../types";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { QuantityStepper } from "./ui/QuantityStepper";

type DetailTab = "overview" | "ingredients" | "reviews";

interface ProductDetailContentProps {
  product: Product;
  onClose: () => void;
}

// 內部內容元件：負責單一商品的資訊展示、頁籤切換與加入購物車操作
const ProductDetailContent = ({
  product,
  onClose,
}: ProductDetailContentProps) => {
  const addToCart = useStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");

  const nutritionStats = [
    { label: "Moisture", value: `${product.moisture}%` },
    { label: "Protein", value: `${product.protein}%` },
    { label: "Calories", value: `${product.calories}kcal` },
  ];

  const reviews = product.reviews ?? [];
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  const tabs: { key: DetailTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "ingredients", label: "Ingredients" },
    {
      key: "reviews",
      label: `Reviews${reviews.length > 0 ? ` (${reviews.length})` : ""}`,
    },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:h-full">
      {/* --- 左半邊：商品主圖與營養指標 --- */}
      <div className="md:col-span-5 flex flex-col gap-3.5 md:h-full">
        {/* 商品圖片容器 */}
        <div className="relative aspect-4/3 md:aspect-auto md:flex-1 md:min-h-0 rounded-3xl overflow-hidden bg-white border border-orange-100/70">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 營養數值三欄卡片 */}
        <div className="grid grid-cols-3 gap-2.5 shrink-0">
          {nutritionStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-4 border border-orange-100/70 text-center"
            >
              <span className="text-xs font-bold text-slate-400">
                {stat.label}
              </span>
              <p className="text-sm sm:text-base font-black text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- 右半邊：商品資訊、可滾動頁籤內容與底部操作列 --- */}
      <div className="md:col-span-7 flex flex-col md:h-full md:min-h-0">
        <div className="shrink-0 space-y-3">
          {/* 標籤列與關閉按鈕 */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-visible flex-nowrap sm:flex-wrap min-w-0 py-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {product.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  className="whitespace-nowrap shrink-0 text-[11px] sm:text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="shrink-0 w-9 h-9 rounded-full bg-white text-slate-600 hover:text-slate-900 hover:bg-orange-50 border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 商品名稱與單價 */}
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="product-detail-title"
              className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight"
            >
              {product.name}
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-slate-400">/ can</span>
            </div>
          </div>

          {/* 平均星等視覺呈現 */}
          {averageRating && (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-0.5 text-amber-400"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-3.5 h-3.5 ${
                      idx < Math.round(Number(averageRating))
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 fill-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-extrabold text-slate-800">
                {averageRating}
              </span>
            </div>
          )}

          {/* 商品描述 */}
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {product.description}
          </p>

          {/* 頁籤切換列 */}
          <div className="border-b border-slate-200/80 flex gap-5 pt-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2.5 text-xs sm:text-sm font-extrabold border-b-2 transition-colors cursor-pointer ${
                    isActive
                      ? "border-orange text-slate-900"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側中間可獨立滾動的頁籤內容區 */}
        <div className="py-4 md:flex-1 md:min-h-0 md:overflow-y-auto pr-1 text-xs sm:text-sm text-slate-600">
          {activeTab === "overview" && (
            <div className="space-y-2.5 leading-relaxed">
              <p>
                Formulated to support daily hydration and palatable mealtime
                routines for cats of various ages.
              </p>
              <p className="text-slate-500">
                Serving tip: Serve at room temperature for richer aroma, and
                refrigerate unused portions promptly.
              </p>
            </div>
          )}

          {activeTab === "ingredients" &&
            (product.ingredients && product.ingredients.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white border border-orange-100 text-slate-700 font-semibold text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">
                Ingredient details will be updated soon.
              </p>
            ))}

          {activeTab === "reviews" &&
            (reviews.length > 0 ? (
              <div className="space-y-2.5">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl bg-white p-3.5 border border-orange-100/70 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-800 text-xs">
                        {review.user}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {review.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No reviews yet for this recipe.</p>
            ))}
        </div>

        {/* 右側底部固定操作區：數量調整與加入購物車 */}
        <div className="shrink-0 pt-4 border-t border-orange-100/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="text-xs font-bold text-slate-500 sm:hidden">
              Quantity
            </span>
            <QuantityStepper
              size="md"
              quantity={quantity}
              onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setQuantity((prev) => prev + 1)}
            />
          </div>

          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="md"
            className="flex-1 gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart · ${(product.price * quantity).toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// 外層彈窗容器：負責讀取選中商品、鎖定背景捲動與動畫呈現
export const ProductDetail = () => {
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  // 關閉彈窗並清空選中商品
  const handleClose = () => setSelectedProduct(null);

  // 彈窗開啟時鎖定背景捲動，關閉或卸載時還原原本的 overflow 值
  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProduct]);

  return (
    <AnimatePresence>
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
        >
          {/* 背景遮罩：點擊可關閉彈窗 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs"
          />

          {/* 彈窗主體：桌機版固定高度讓右側頁籤內容可獨立捲動 */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] md:h-[520px] overflow-y-auto md:overflow-hidden rounded-4xl bg-cream border border-orange-100 shadow-2xl p-5 sm:p-8"
          >
            {/* 傳入 product.id 作為 key，切換不同商品時自動重置數量與頁籤 */}
            <ProductDetailContent
              key={selectedProduct.id}
              product={selectedProduct}
              onClose={handleClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
