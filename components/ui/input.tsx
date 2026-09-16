import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[#E5E5E5] bg-white px-3.5 py-2 text-sm text-neutral-900 shadow-subtle transition-all duration-150",
          "placeholder:text-neutral-400 focus-visible:outline-none focus-visible:border-black focus-visible:ring-2 focus-visible:ring-black/10",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#FAFAF9]",
          error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
