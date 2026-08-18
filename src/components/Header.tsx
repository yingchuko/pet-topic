import { ShoppingBag, PawPrint } from "lucide-react";
import { useStore } from "../store/useStore";
import { Button } from "./ui/Button";

export const Header = () => {
  const cart = useStore((state) => state.cart);
  const toggleCart = useStore((state) => state.toggleCart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 bg-brand-cream/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
      <div className="container-layout h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-2xl font-extrabold text-slate-800 tracking-tight"
        >
          <PawPrint className="w-10 h-10 p-2 rounded-full bg-brand-orange flex items-center justify-center text-white" />
          PetTopic
        </a>

        {/* 導覽選單 */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <a href="#quiz" className="hover:text-brand-orange transition-colors">
            Health Quiz
          </a>
          <a
            href="#nutrition"
            className="hover:text-brand-orange transition-colors"
          >
            Nutrition
          </a>
          <a href="#shop" className="hover:text-brand-orange transition-colors">
            Shop
          </a>
        </nav>

        {/* 購物車按鈕 */}
        <Button
          variant="outline"
          size="md"
          onClick={toggleCart}
          className="relative gap-2"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-orange text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {totalItems}
            </span>
          )}
          Cart
        </Button>
      </div>
    </header>
  );
};
