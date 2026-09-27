import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../lib/utils";

/**
 * Tooltip — maps to Figma "Tooltip" component set (Base Components
 * section, node 1326:36139). Corrected against the live node tree, which
 * is richer than the original implementation assumed: near-black
 * Grey/900 fill (already correct), but cornerRadius is 4px (not 8), the
 * content panel has generous ~16px padding on every side (not 12px/6px),
 * and it has a real directional arrow — added below via Radix's built-in
 * Arrow primitive, styled to match the same dark fill.
 */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-w-xs rounded-[var(--radius-xsm)] bg-[var(--color-grey-900)] p-4 text-[12px] leading-[16px] text-white shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    >
      {props.children}
      <TooltipPrimitive.Arrow className="fill-[var(--color-grey-900)]" width={12} height={6} />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";
