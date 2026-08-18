import { Sparkles, ArrowRight, PawPrint } from "lucide-react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export const Hero = () => {
  return (
    <section className="container-layout pt-8 pb-12 lg:pt-16 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* 左側 */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <Badge icon={<Sparkles className="w-3.5 h-3.5" />}>
            Vet-informed nutrition, made simple
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15]">
            Happier bowls, <br />
            <span className="text-orange">healthier companions.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            PetTopic builds a personalized food plan for your pet in minutes.
            Answer a few questions and we'll match hydration-smart meals
            delivered right to your door.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Button href="#quiz" variant="primary" size="lg" className="gap-2">
              Start Health Quiz
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#shop" variant="secondary" size="lg">
              Browse food
            </Button>
          </div>

          <p className="text-xs text-slate-500 font-medium pt-2">
            🚚 Free delivery on every subscription box
          </p>
        </div>

        {/* 右側 */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="aspect-4/3 sm:aspect-square rounded-4xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1625316708582-7c38734be31d?q=80&w=987&auto=format&fit=crop"
                alt="Happy Dog"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-4 -left-2 sm:-left-12 bg-white/95 backdrop-blur-sm border border-orange-200 p-4 rounded-4xl flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange">
                <PawPrint />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">12k+</p>
                <p className="text-xs font-semibold text-slate-500">
                  happy tails fed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
