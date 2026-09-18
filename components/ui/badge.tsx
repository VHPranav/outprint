import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#F5F5F4] text-neutral-900 border border-[#E5E5E5]",
        secondary:
          "bg-[#F5F5F4] text-neutral-800 border border-[#E5E5E5]",
        outline:
          "text-neutral-800 border border-[#E5E5E5] bg-transparent",
        solid:
          "bg-black text-white",
        muted:
          "bg-neutral-100 text-neutral-500",
      },
      size: {
        default: "text-xs px-2.5 py-0.5",
        sm: "text-[10px] uppercase tracking-wider px-2 py-0.5 font-medium",
        lg: "text-xs px-3.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
