import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "../lib/utils";

/**
 * RadioGroup / RadioGroupItem — maps to Figma "Radio Button" component set
 * (Base Components section, node 1326:36104). Verified exact: 20px outer
 * ring, 12px inner filled dot (corrected from an earlier 10px guess),
 * inner dot bound to Primary/500.
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("flex flex-col gap-3", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, id, ...props }, ref) => {
  const itemId = id ?? React.useId();
  return (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        id={itemId}
        ref={ref}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--color-elements-stroke)] bg-white data-[state=checked]:border-[var(--color-primary-500)]",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="h-3 w-3 rounded-full bg-[var(--color-primary-500)]" />
      </RadioGroupPrimitive.Item>
      {label ? (
        <label htmlFor={itemId} className="text-[14px] leading-[20px] text-[var(--color-text-main)]">
          {label}
        </label>
      ) : null}
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
