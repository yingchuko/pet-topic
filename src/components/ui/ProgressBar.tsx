import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar = ({ progress, className = "" }: ProgressBarProps) => {
  return (
    <div
      className={`w-full h-2 bg-orange-100/60 rounded-full overflow-hidden ${className}`}
    >
      <motion.div
        className="h-full bg-orange rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
};
