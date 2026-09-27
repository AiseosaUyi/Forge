import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Button — maps 1:1 to Figma "Button_Master" (Style Guide canvas, Base
 * Components section, node 1326:36051). Verified exact geometry:
 * 237×72px, padding 24px/40px (v/h), 10px icon gap, cornerRadius 200
 * (pill), Satoshi Bold 18px — reproduced below as `size="xl"`.
 *
 * Figma only defines ONE size (no Size property on Button_Master) — `l`/
 * `sm`/`mini` are extrapolated for dashboard density using the real
 * Button/L, Button/SM, Button/Mini Satoshi text styles (16/14/12px,
 * already real Figma text styles per docs/design-system/tokens/typography.md)
 * scaled proportionally. Only `xl` is pixel-verified against a live node.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-xl)] font-bold transition-colors disabled:pointer-events-none disabled:bg-[var(--color-button-disabled)] disabled:text-[var(--color-grey-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-300)] focus-visible:ring-offset-2",
  {
    variants: {
      intent: {
        primary:
          "bg-[var(--color-button-primary-default)] text-white hover:bg-[var(--color-primary-600)]",
        secondary:
          "bg-[var(--color-secondary-500)] text-white hover:bg-[var(--color-secondary-600)]",
        destructive:
          "bg-[var(--color-button-error-default)] text-white hover:bg-[var(--color-error-600)]",
        outline:
          "bg-transparent text-[var(--color-text-main)] border border-[var(--color-elements-stroke)] hover:bg-[var(--color-card-surface)]",
        ghost:
          "bg-transparent text-[var(--color-text-primary-action)] hover:bg-[var(--color-card-primary-surface)]",
      },
      size: {
        /** Figma-verified exact match (node 1326:36051): 72px tall, 40px horizontal padding. */
        xl: "h-[72px] px-10 text-[18px] leading-[24px]",
        l: "h-[52px] px-8 text-[16px] leading-[24px]",
        sm: "h-[44px] px-6 text-[14px] leading-[24px]",
        mini: "h-[36px] px-4 text-[12px] leading-[16px]",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "l",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, intent, size, asChild = false, leftIcon, rightIcon, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ intent, size }), className)}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
