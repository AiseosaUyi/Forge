import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Alert — maps to Figma "Alert" component set (Base Components section,
 * node 1326:36426). State axis: Success | Error | Warning | Info, each an
 * optional dismissible banner (Close prop).
 */
const alertVariants = cva(
  "flex items-start gap-3 rounded-[var(--radius-normal)] border p-4 text-[14px] leading-[20px]",
  {
    variants: {
      state: {
        success:
          "bg-[var(--color-success-50)] border-[var(--color-success-100)] text-[var(--color-success-900)]",
        error:
          "bg-[var(--color-error-50)] border-[var(--color-error-100)] text-[var(--color-error-900)]",
        warning:
          "bg-[var(--color-warning-50)] border-[var(--color-warning-100)] text-[var(--color-warning-900)]",
        info: "bg-[var(--color-blue-50)] border-[var(--color-blue-100)] text-[var(--color-blue-900)]",
      },
    },
    defaultVariants: {
      state: "info",
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  onClose?: () => void;
}

export function Alert({ className, state, icon, onClose, children, ...props }: AlertProps) {
  return (
    <div role="alert" className={cn(alertVariants({ state }), className)} {...props}>
      {icon}
      <div className="flex-1">{children}</div>
      {onClose ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="shrink-0 opacity-60 hover:opacity-100"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}

export { alertVariants };
