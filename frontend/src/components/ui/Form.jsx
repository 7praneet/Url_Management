import React from "react";
import { cn } from "@/lib/utils";

export const Form = React.forwardRef(
  ({ className, onSubmit, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        onSubmit={onSubmit}
        {...props}
      />
    );
  }
);
Form.displayName = "Form";

export const FormField = ({ children }) => {
  return <div>{children}</div>;
};

export const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("block text-sm font-medium text-slate-200 mb-2", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export const FormControl = ({ children }) => {
  return <div>{children}</div>;
};

export const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-red-400 mt-1.5", className)}
        role="alert"
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";
