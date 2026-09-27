import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/utils";

/**
 * Switch — maps to Figma "Toggle" component set (Base Components section,
 * node 1326:36122). Verified exact: track 44×24px (matched already),
 * thumb travel corrected from 22px to the geometrically exact 20px
 * (44 track − 20 thumb − 2×2px inset = 20px of travel).
 */
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const switchId = id ?? React.useId();
    return (
      <div className="flex items-center gap-2">
        <SwitchPrimitive.Root
          id={switchId}
          ref={ref}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-[var(--radius-xl)] bg-[var(--color-grey-200)] transition-colors data-[state=checked]:bg-[var(--color-primary-500)]",
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-[var(--shadow-xs)] transition-transform data-[state=checked]:translate-x-[20px]" />
        </SwitchPrimitive.Root>
        {label ? (
          <label htmlFor={switchId} className="text-[14px] leading-[20px] text-[var(--color-text-main)]">
            {label}
          </label>
        ) : null}
      </div>
    );
  },
);
Switch.displayName = "Switch";
