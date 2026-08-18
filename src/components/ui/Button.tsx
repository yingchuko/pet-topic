import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  // 基礎樣式
  const baseStyles =
    "inline-flex items-center justify-center font-extrabold transition cursor-pointer group rounded-full";

  // 尺寸變體
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "w-full sm:w-auto px-8 py-4 text-base",
  };

  // 風格變體
  const variantStyles = {
    primary:
      "bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg shadow-orange-500/20",
    secondary:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200",
    outline:
      "border border-slate-200 text-slate-700 hover:border-brand-orange hover:text-brand-orange bg-white",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // 如果有傳入 href，渲染為 <a> 標籤，否則渲染為 <button>
  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
