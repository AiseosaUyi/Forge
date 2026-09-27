import * as React from "react";
import { cn } from "../lib/utils";

/**
 * Textarea — maps to Figma "Textarea_base" (Base Components section, node
 * 1326:36015). Shares Textfield's corrected radius-sm (8px, not
 * radius-normal) and 14px value text, and 16px padding to match.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const areaId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-2">
        {label ? (
          <label htmlFor={areaId} className="text-[14px] font-bold leading-[20px] text-[var(--color-text-main)]">
            {label}
          </label>
        ) : null}
        <textarea
          id={areaId}
          ref={ref}
          aria-invalid={Boolean(error)}
          className={cn(
            "min-h-24 w-full rounded-[var(--radius-sm)] border bg-white p-4 text-[14px] leading-[24px] text-[var(--color-text-main)] outline-none placeholder:text-[var(--color-text-sub)] transition-colors",
            error
              ? "border-[var(--color-error-500)]"
              : "border-[var(--color-elements-stroke)] focus:border-[var(--color-primary-500)]",
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="text-[12px] leading-[16px] text-[var(--color-error-500)]">{error}</span>
        ) : hint ? (
          <span className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{hint}</span>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
