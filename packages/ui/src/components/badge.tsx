import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Badge — maps to two real Figma component sets: "Badge Master" (Size
 * axis, node 1507:4173 — verified exact padding/radius/font below) and
 * "Badges" (Type/color axis, node 1507:4203, each variant is literally an
 * instance of Badge Master Medium with the fill swapped). Types follow
 * the 50/100 → 500 → 700/900 semantic pattern documented in
 * docs/design-system/tokens/colors.md. Font weight is Medium (500), not
 * Bold — confirmed off the live node, corrected from an earlier guess.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--radius-xl)] font-medium leading-[16px]",
  {
    variants: {
      type: {
        grey: "bg-[var(--color-grey-50)] text-[var(--color-grey-900)]",
        completed: "bg-[var(--color-success-50)] text-[var(--color-success-900)]",
        processing: "bg-[var(--color-warning-50)] text-[var(--color-warning-900)]",
        failed: "bg-[var(--color-error-50)] text-[var(--color-error-900)]",
        blue: "bg-[var(--color-blue-50)] text-[var(--color-blue-900)]",
        yellow: "bg-[var(--color-yellow-50)] text-[var(--color-yellow-900)]",
        secondary: "bg-[var(--color-secondary-50)] text-[var(--color-secondary-900)]",
      },
      /** Padding/font sizes verified exact against Badge Master Size=Small/Medium/Mini. */
      size: {
        small: "text-[12px] px-2 py-1",
        medium: "text-[14px] px-2 py-1.5",
        mini: "text-[10px] px-2 py-0.5",
      },
    },
    defaultVariants: {
      type: "grey",
      size: "small",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, type, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ type, size }), className)} {...props} />;
}

export { badgeVariants };
