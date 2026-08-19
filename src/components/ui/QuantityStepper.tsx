import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  size?: "sm" | "md";
}

export const QuantityStepper = ({
  quantity,
  onDecrease,
  onIncrease,
  size = "sm",
}: QuantityStepperProps) => {
  const isSm = size === "sm";

  return (
    <div
      className={`inline-flex items-center bg-[#FAF7F2] rounded-full border border-orange-100/60 text-slate-700 ${
        isSm ? "gap-2 px-2.5 py-1" : "gap-3 px-3 py-1.5"
      }`}
    >
      <button
        onClick={onDecrease}
        className="p-0.5 text-slate-400 hover:text-slate-800 transition cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus
          className={isSm ? "w-3 h-3 stroke-[3]" : "w-3.5 h-3.5 stroke-[3]"}
        />
      </button>

      <span
        className={`font-black text-center ${isSm ? "text-xs w-4" : "text-sm w-4"}`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="p-0.5 text-slate-400 hover:text-slate-800 transition cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus
          className={isSm ? "w-3 h-3 stroke-[3]" : "w-3.5 h-3.5 stroke-[3]"}
        />
      </button>
    </div>
  );
};
