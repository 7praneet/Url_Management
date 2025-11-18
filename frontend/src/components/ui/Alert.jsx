import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Alert = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white/[0.03] border-white/10 text-slate-200",
      destructive: "bg-red-500/5 border-red-500/20 text-red-300",
    };

    return (
      <motion.div
        ref={ref}
        role="alert"
        className={cn(
          "relative rounded-xl border p-4 backdrop-blur-sm",
          variants[variant],
          className
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        {...props}
      >
        <div className="flex items-start gap-3">{children}</div>
      </motion.div>
    );
  }
);
Alert.displayName = "Alert";

export const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium", className)}
        {...props}
      />
    );
  }
);
AlertDescription.displayName = "AlertDescription";
