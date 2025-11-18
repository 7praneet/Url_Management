import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <motion.input
      type={type}
      className={cn(
        "w-full px-4 py-3.5 rounded-xl",
        "bg-white/[0.03] border border-white/10",
        "text-slate-100 placeholder:text-slate-500",
        "backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]/30 focus:border-[#7C5CFF]/50",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      ref={ref}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  );
});
Input.displayName = "Input";
