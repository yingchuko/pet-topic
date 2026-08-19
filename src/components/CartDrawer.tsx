import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { Button } from "./ui/Button";
import { FREE_SHIPPING_THRESHOLD } from "../data/mockData";
import { ProgressBar } from "./ui/ProgressBar";
import { QuantityStepper } from "./ui/QuantityStepper";

export const CartDrawer = () => {
  const cart = useStore((state) => state.cart);
  const isCartOpen = useStore((state) => state.isCartOpen);
  const setCartOpen = useStore((state) => state.setCartOpen);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const totalItems = useStore((state) => state.getTotalItems());
  const subtotal = useStore((state) => state.getSubtotal());

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 左側半透明黑色遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* 右側滑出式抽屜 */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream z-50 flex flex-col shadow-2xl border-l border-orange-100/60"
          >
            <div className="p-6 flex items-center justify-between border-b border-orange-100/80 bg-cream">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Your Box
                </h2>
                {totalItems > 0 && (
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-brand-orange text-xs font-black flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <Button
                variant="icon"
                size="sm"
                ariaLabel="Close cart"
                onClick={() => setCartOpen(false)}
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </Button>
            </div>

            {/* 根據購物車是否有商品，切換顯示：[無商品空狀態] 或 [商品列表狀態] */}
            {cart.length === 0 ? (
              /* 空購物車狀態 */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Your box is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-[240px] leading-relaxed">
                    Add some hydration-rich meals and they'll show up here.
                  </p>
                </div>
                <Button
                  onClick={() => setCartOpen(false)}
                  variant="outline"
                  size="md"
                >
                  Keep browsing
                </Button>
              </div>
            ) : (
              /* 有商品購物車狀態 */
              <>
                {/* 免運滿額進度 */}
                <div className="px-6 py-4 space-y-2">
                  <p className="text-xs font-bold text-slate-600">
                    {FREE_SHIPPING_THRESHOLD - subtotal > 0 ? (
                      <>
                        Add{" "}
                        <span className="text-slate-900 font-black">
                          ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                        </span>{" "}
                        more for free shipping
                      </>
                    ) : (
                      <span className="text-brand-orange font-black">
                        🎉 You've unlocked free shipping!
                      </span>
                    )}
                  </p>
                  <ProgressBar
                    progress={(subtotal / FREE_SHIPPING_THRESHOLD) * 100}
                  />
                </div>

                {/* 商品列表 */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-2xl bg-white/80 border border-orange-100/60 shadow-xs flex gap-4 items-stretch justify-between"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-semibold">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        <QuantityStepper
                          size="sm"
                          quantity={item.quantity}
                          onDecrease={() => updateQuantity(item.product.id, -1)}
                          onIncrease={() => updateQuantity(item.product.id, 1)}
                        />
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <Button
                          variant="icon"
                          size="sm"
                          ariaLabel="Close cart"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="text-right shrink-0 self-end mb-1">
                          <span className="text-sm font-black text-slate-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 底部結帳區塊 */}
                <div className="p-6 bg-white border-t border-orange-100/60 space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-bold text-slate-700">
                        Subtotal
                      </span>
                      <span className="text-2xl font-black text-slate-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Taxes calculated at checkout. Cancel or pause anytime.
                    </p>
                  </div>
                  <Button variant="primary" className="w-full">
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
