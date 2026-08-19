import { useState } from "react";
import { ShoppingBag, Droplet } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/mockData";
import { useStore } from "../store/useStore";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { QuantityStepper } from "./ui/QuantityStepper";

export const ProductList = () => {
  const addToCart = useStore((state) => state.addToCart);

  // 儲存所有商品的暫選數量
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // 取得指定商品的當前暫選數量，若已有記錄則回傳該數量；若無記錄（尚未點擊過 + / - ），則預設回傳 1
  const getQuantity = (id: string) => quantities[id] || 1;

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = Math.max(1, current + delta); // 確保數量最低為 1
      return { ...prev, [id]: updated }; // 其餘運算子回傳全新物件，僅更新當前商品 ID
    });
  };

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    const qty = getQuantity(product.id);
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  return (
    <section id="shop" className="container-layout py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {MOCK_PRODUCTS.map((product) => {
          const qty = getQuantity(product.id);
          return (
            <Card key={product.id} className="!p-0">
              <div>
                <div className="relative aspect-4/3 rounded-t-4xl overflow-hidden mb-4">
                  <Badge
                    className="absolute top-4 left-4 !bg-cream"
                    icon={<Droplet className="w-3.5 h-3.5 fill-orange" />}
                  >
                    {product.moisture}% moisture
                  </Badge>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium min-h-[40px]">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <Badge key={idx}>{tag}</Badge>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        / can
                      </span>
                    </div>
                    <QuantityStepper
                      size="md"
                      quantity={qty}
                      onDecrease={() => handleQuantityChange(product.id, -1)}
                      onIncrease={() => handleQuantityChange(product.id, 1)}
                    />
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    variant="primary"
                    size="md"
                    className="w-full gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
