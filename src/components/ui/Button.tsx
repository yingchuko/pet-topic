import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "option" | "icon";
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  selected = false,
  size = "md",
  href,
  ariaLabel,
  children,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-extrabold transition cursor-pointer group rounded-full shrink-0";

  // 尺寸變體
  const standardSizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "w-full sm:w-auto px-8 py-4 text-base",
  };

  // IconButton 尺寸變體
  const iconSizeStyles = {
    sm: "p-1.5 text-xs",
    md: "p-2 text-sm",
    lg: "p-3 text-base",
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
    icon: "text-slate-400 hover:text-slate-800 hover:bg-orange-100/50 bg-transparent shadow-none",
  };

  // 動態決定尺寸 padding
  let sizeClass = standardSizeStyles[size];
  if (variant === "option") {
    sizeClass = "";
  } else if (variant === "icon") {
    sizeClass = iconSizeStyles[size];
  }

  const combinedClasses =
    `${baseStyles} ${variantStyles[variant]} ${sizeClass} ${className}`.trim();

  // 如果有傳入 href，渲染為 <a> 標籤，否則渲染為 <button>
  if (href) {
    return (
      <a href={href} className={combinedClasses} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
};
