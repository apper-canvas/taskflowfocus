import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:shadow-lg hover:scale-105",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:shadow-lg hover:scale-105"
  };

  const sizes = {
    default: "px-4 py-2 text-sm font-medium",
    sm: "px-3 py-1.5 text-xs font-medium",
    lg: "px-6 py-3 text-base font-medium",
    xl: "px-8 py-4 text-lg font-semibold"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;