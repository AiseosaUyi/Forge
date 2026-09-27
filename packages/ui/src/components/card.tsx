import * as React from "react";
import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * Card — maps to Figma "Card_Master" component set (Style Guide canvas →
 * Composite Components → Card, built this session). Two layers:
 *
 * 1. Primitives (Card, CardHeader, CardTitle, CardDescription, CardContent,
 *    CardFooter) — shadcn-style, compose your own layout freely.
 * 2. Pre-composed variants (StatCard, BalanceCard, KycProgressCard,
 *    InfoCard, EmptyCard) — 1:1 with the five Figma variants, for the
 *    patterns that were repeated ad hoc across the B2B module dozens of
 *    times (see B2B_PLATFORM_UX_CONTEXT.md §3, §5, §6) before this pass.
 */

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-normal)] border border-[var(--color-elements-stroke)] bg-[var(--color-card-main)] shadow-[var(--shadow-xs)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-[16px] font-bold leading-[24px] text-[var(--color-text-main)]", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[14px] leading-[20px] text-[var(--color-text-sub)]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 px-6 pb-6", className)} {...props} />;
}

// ---------------------------------------------------------------------------
// Pre-composed variants — 1:1 with the Figma "Type=" variants
// ---------------------------------------------------------------------------

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  delta?: string;
  icon?: React.ReactNode;
}

/** Figma: Card_Master, Type=Stat. E.g. "Transactions Made", "Avg Transaction Value", "Next Payout". */
export function StatCard({ label, value, delta, icon, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-1 p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{label}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[18px] font-black leading-[24px] text-[var(--color-text-main)]">{value}</span>
        {delta ? (
          <span className="text-[12px] font-bold leading-[16px] text-[var(--color-success-500)]">{delta}</span>
        ) : null}
      </div>
    </Card>
  );
}

export interface BalanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  assetDots?: Array<"primary" | "success" | "warning" | "secondary">;
  actions?: Array<{ label: string; onClick?: () => void }>;
}

const dotColor: Record<NonNullable<BalanceCardProps["assetDots"]>[number], string> = {
  primary: "bg-[var(--color-primary-500)]",
  success: "bg-[var(--color-success-500)]",
  warning: "bg-[var(--color-warning-500)]",
  secondary: "bg-[var(--color-secondary-500)]",
};

/** Figma: Card_Master, Type=Balance. E.g. the Wallet Balance card (B2B audit §3): value + Fund/Transfer/Swap. */
export function BalanceCard({ label, value, assetDots = [], actions = [], className, ...props }: BalanceCardProps) {
  return (
    <Card className={cn("flex flex-col gap-4 bg-[var(--color-card-primary-surface)] p-6", className)} {...props}>
      <div className="flex items-center gap-2">
        <span className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{label}</span>
        <div className="flex -space-x-1">
          {assetDots.map((color, i) => (
            <span key={i} className={cn("h-2 w-2 rounded-full ring-1 ring-white", dotColor[color])} />
          ))}
        </div>
      </div>
      <span className="text-[24px] font-black leading-[32px] text-[var(--color-text-main)]">{value}</span>
      {actions.length ? (
        <div className="flex gap-2">
          {actions.map((action) => (
            <Button key={action.label} size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export interface KycProgressCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  percent: number;
  stepsLabel: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

/** Figma: Card_Master, Type=KYC-Progress. Maps to the "Verify Account" 0→10→20→25→50→90/100% card (B2B audit §2). */
export function KycProgressCard({
  title,
  percent,
  stepsLabel,
  ctaLabel,
  onCtaClick,
  className,
  ...props
}: KycProgressCardProps) {
  return (
    <Card className={cn("flex flex-col gap-3 p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-bold leading-[24px] text-[var(--color-text-main)]">{title}</span>
        <span className="rounded-[var(--radius-xl)] bg-[var(--color-card-primary-surface)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--color-text-primary-action)]">
          {percent}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-grey-100)]">
        <div
          className="h-full rounded-[var(--radius-xl)] bg-[var(--color-primary-500)] transition-[width]"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{stepsLabel}</span>
        {ctaLabel ? (
          <button
            type="button"
            onClick={onCtaClick}
            className="text-[12px] font-bold leading-[16px] text-[var(--color-text-primary-action)]"
          >
            {ctaLabel}
          </button>
        ) : null}
      </div>
    </Card>
  );
}

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  body: string;
  linkLabel?: string;
  onLinkClick?: () => void;
}

/** Figma: Card_Master, Type=Info. Formalizes the ad hoc "Info Card" frames used ~30 times across the B2B module. */
export function InfoCard({ title, body, linkLabel, onLinkClick, className, ...props }: InfoCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2 bg-[var(--color-card-surface)] p-6", className)} {...props}>
      <span className="text-[16px] font-bold leading-[24px] text-[var(--color-text-main)]">{title}</span>
      <p className="text-[14px] leading-[20px] text-[var(--color-text-sub)]">{body}</p>
      {linkLabel ? (
        <button
          type="button"
          onClick={onLinkClick}
          className="self-start text-[12px] font-bold leading-[16px] text-[var(--color-text-primary-action)]"
        >
          {linkLabel}
        </button>
      ) : null}
    </Card>
  );
}

export interface EmptyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

/** Figma: Card_Master, Type=Empty. Maps to "No Active Payment Link" / "No Customer Yet" / "No orders found" patterns. */
export function EmptyCard({ icon, title, subtitle, ctaLabel, onCtaClick, className, ...props }: EmptyCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-3 border-dashed p-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-card-surface)] text-[var(--color-elements-icon)]">
        {icon}
      </div>
      <span className="text-[16px] font-bold leading-[24px] text-[var(--color-text-main)]">{title}</span>
      <p className="text-[12px] leading-[16px] text-[var(--color-text-sub)]">{subtitle}</p>
      {ctaLabel ? (
        <Button size="sm" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      ) : null}
    </Card>
  );
}
