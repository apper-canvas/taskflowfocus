import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Textarea = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;