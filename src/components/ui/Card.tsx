import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-4xl border border-orange-100/80 shadow-sm p-6 sm:p-10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
