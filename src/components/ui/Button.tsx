import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "option";
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  selected = false,
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  // 基礎樣式
  const baseStyles =
    "inline-flex items-center font-extrabold transition cursor-pointer group rounded-full justify-center";

  // 尺寸變體
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "w-full sm:w-auto px-8 py-4 text-base",
  };

  // 風格變體
  const variantStyles = {
    primary:
      "bg-orange hover:bg-orange-hover text-white shadow-lg shadow-orange-500/20",
    secondary: "bg-cream hover:bg-orange-100/60 text-slate-700",
    outline:
      "border border-slate-200 text-slate-700 hover:border-orange hover:text-orange bg-white",
    option: `w-full p-4 border transition-all !justify-between font-semibold ${
      selected
        ? "border-orange bg-orange-100/50 text-slate-900 font-bold"
        : "border-orange-100/80 bg-cream/40 hover:bg-cream text-slate-700"
    }`,
  };

  const currentSizeClass = variant === "option" ? "" : sizeStyles[size];
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${currentSizeClass} ${className}`;

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
