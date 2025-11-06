import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({
  className,
  checked,
  onCheckedChange,
  ...props
}, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20",
        checked
          ? "bg-success border-success"
          : "border-gray-300 hover:border-primary",
        className
      )}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;