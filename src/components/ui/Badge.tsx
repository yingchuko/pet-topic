import React from "react";

interface BadgeProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ icon, children, className = "" }: BadgeProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange text-xs font-bold tracking-wide ${className}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
};
