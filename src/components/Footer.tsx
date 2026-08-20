import { PawPrint } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="container-layout border-t border-orange-100/60 py-8 px-6 mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-orange text-white flex items-center justify-center shrink-0">
            <PawPrint className="w-4 h-4 fill-current" />
          </div>
          <span className="text-base font-black text-slate-900 tracking-tight">
            PetTopic
          </span>
        </div>

        <p className="text-center text-slate-400 font-medium">
          © 2026 PetTopic. Made with love for healthier pets.
        </p>

        <nav className="flex items-center gap-6 text-slate-600">
          <a href="#quiz" className="hover:text-orange transition-colors">
            Health Quiz
          </a>
          <a href="#nutrition" className="hover:text-orange transition-colors">
            Nutrition
          </a>
          <a href="#shop" className="hover:text-orange transition-colors">
            Shop
          </a>
        </nav>
      </div>
    </footer>
  );
};
