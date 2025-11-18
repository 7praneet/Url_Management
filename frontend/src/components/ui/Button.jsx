import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "bg-gradient-to-r from-[#7C5CFF] to-[#9575FF] text-white hover:shadow-lg hover:shadow-[#7C5CFF]/25 focus:ring-[#7C5CFF]/50",
      outline:
        "border-2 border-white/10 bg-white/[0.02] text-slate-200 hover:bg-white/[0.05] hover:border-white/20 focus:ring-white/30",
      ghost: "text-slate-300 hover:bg-white/5 focus:ring-white/20",
    };

    const sizes = {
      default: "px-6 py-3 text-base",
      sm: "px-4 py-2 text-sm",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
