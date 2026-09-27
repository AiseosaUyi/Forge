import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Avatar — maps to a real Figma component set discovered mid-audit
 * (Style Guide → Base Components, node 1326:36456) that had never been
 * documented: 18 variants across Size × Type=Placeholder/Icon/Image. Its
 * "Placeholder" type is already an initials-in-circle pattern, not a flat
 * color blob — reproduced here as the `initials` type. Never render a
 * bare solid-color circle as a stand-in for a real avatar/icon/logo.
 *
 * All 6 sizes verified exact against their live variant nodes (1326:36469
 * through 1326:36502) — `xlarge` corrected from an earlier 64px guess to
 * the real 56px.
 */
const avatarSizes = {
  xsmall: "h-5 w-5 text-[10px]",
  mini: "h-6 w-6 text-[10px]",
  small: "h-8 w-8 text-[12px]",
  normal: "h-10 w-10 text-[14px]",
  large: "h-12 w-12 text-[16px]",
  xlarge: "h-14 w-14 text-[18px]",
} as const;

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-grey-100)] font-bold text-[var(--color-grey-600)]",
  {
    variants: {
      size: avatarSizes,
    },
    defaultVariants: {
      size: "normal",
    },
  },
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Photo, business logo, or service-brand logo. Falls back to `initials` if it fails to load. */
  src?: string;
  alt?: string;
  /** Shown when there is no `src` (or it fails to load) — reproduces the Figma "Placeholder" variant. */
  initials?: string;
  /** Shown instead of initials for a generic/system avatar (e.g. an app icon in a notification list). */
  icon?: React.ReactNode;
  className?: string;
}

export function Avatar({ src, alt, initials, icon, size, className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root className={cn(avatarVariants({ size }), className)}>
      {src ? <AvatarPrimitive.Image src={src} alt={alt ?? ""} className="h-full w-full object-cover" /> : null}
      <AvatarPrimitive.Fallback delayMs={src ? 200 : 0} className="flex h-full w-full items-center justify-center">
        {icon ?? initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
