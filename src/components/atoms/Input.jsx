import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({
  className,
  type = "text",
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;