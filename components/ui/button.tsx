import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-white shadow-subtle hover:bg-neutral-800 font-medium tracking-tight",
        secondary:
          "bg-white text-black border border-[#E5E5E5] hover:bg-neutral-50 hover:border-neutral-300",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        outline:
          "border border-[#E5E5E5] text-neutral-800 bg-transparent hover:bg-white hover:border-neutral-300",
        link:
          "text-black underline-offset-4 hover:underline p-0 h-auto font-medium rounded-none",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-[13px] tracking-[0.01em]",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-sm font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
