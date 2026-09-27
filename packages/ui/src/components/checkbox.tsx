import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../lib/utils";

/**
 * Checkbox — maps to Figma "checkbox" component set (Base Components
 * section, node 1326:36055). Verified exact size: 24×24px (corrected
 * from an earlier 20×20px guess) — Figma's checked state is literally the
 * "tick-square" Iconsax icon rather than a hand-drawn check path; this
 * reproduces the same visual with a custom SVG since the icon system
 * isn't wired into code yet (see registry.json notMigratedYet).
 */
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id ?? React.useId();
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        id={checkboxId}
        ref={ref}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-xsm)] border border-[var(--color-elements-stroke)] bg-white data-[state=checked]:border-[var(--color-primary-500)] data-[state=checked]:bg-[var(--color-primary-500)]",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-white">
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label ? (
        <label htmlFor={checkboxId} className="text-[14px] leading-[20px] text-[var(--color-text-main)]">
          {label}
        </label>
      ) : null}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
