import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Input — maps to Figma "Textfield" (Base Components section, node
 * 1326:35800). Verified exact geometry from the live node tree: input box
 * height comes from 16px padding around a 24px content row (→ 56px total,
 * corrected from a fixed 48px), cornerRadius 8px (corrected from 16px —
 * inputs use `radius-sm`, not the `radius-normal` cards/buttons use),
 * value/placeholder text 14px (corrected from 16px), 8px gap between
 * label/box/helper (corrected from 6px). Label/hint/error pattern matches
 * the file's Label/Text/Hint-text placeholder convention
 * (docs/design-system/components/form-controls.md).
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label htmlFor={inputId} className="text-[14px] font-bold leading-[20px] text-[var(--color-text-main)]">
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            "flex items-center gap-2 rounded-[var(--radius-sm)] border bg-white p-4 transition-colors",
            error
              ? "border-[var(--color-error-500)]"
              : "border-[var(--color-elements-stroke)] focus-within:border-[var(--color-primary-500)]",
          )}
        >
          {leftIcon}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-transparent text-[14px] leading-[24px] text-[var(--color-text-main)] outline-none placeholder:text-[var(--color-text-sub)]",
              className,
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {rightIcon}
        </div>
        {error ? (
          <span className="text-[12px] leading-[16px] text-[var(--color-error-500)]">{error}</span>
        ) : hint ? (
          <span className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{hint}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
