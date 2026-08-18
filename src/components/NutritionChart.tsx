import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

export const NutritionChart = () => {
  return (
    <section id="nutrition" className="container-layout py-12">
      <div className="max-w-4xl mx-auto">
        <Card>
          {/* 標題 */}
          <div className="space-y-4 mb-8">
            <Badge>💧 Hydration matters</Badge>
            <div className="space-y-2">
              <h2 className="section-title">Wet vs. dry moisture</h2>
              <p className="section-subtitle">
                Average water content by food type. More moisture means better
                hydration for kidneys and urinary health.
              </p>
            </div>
          </div>

          {/* 圖表 */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                <span>Wet food</span>
                <span className="text-base font-black">78%</span>
              </div>
              <div className="bar-track h-9">
                <div
                  className="h-full bg-orange rounded-xl transition-all duration-1000"
                  style={{ width: "78%" }}
                />
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Close to a cat's natural prey diet
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
                <span>Dry kibble</span>
                <span className="text-base font-black">10%</span>
              </div>
              <div className="bar-track h-9">
                <div
                  className="h-full bg-slate-400 rounded-xl transition-all duration-1000"
                  style={{ width: "10%" }}
                />
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Cats rarely drink enough to make up the gap
              </p>
            </div>

            {/* 3. 底部 */}
            <div className="p-4 rounded-full bg-cream/20 border border-orange-100/80 flex items-start sm:items-center gap-3 text-xs text-slate-600 font-medium leading-relaxed">
              <div className="w-5 h-5 rounded-full border border-orange text-orange flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold">
                !
              </div>
              <p>
                <strong className="text-slate-800 font-bold">
                  PetTopic recipes average 74–82% moisture
                </strong>
                , helping your cat stay hydrated without extra effort.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
