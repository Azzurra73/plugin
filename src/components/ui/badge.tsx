import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { DocStatus } from "@/lib/products";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide2",
  {
    variants: {
      tone: {
        gold: "border-gold/30 bg-gold/[0.06] text-gold",
        green: "border-success/40 bg-success/[0.08] text-success",
        slate: "border-slate-light/30 bg-slate-light/[0.06] text-slate-light",
        cream: "border-line text-cream/60",
      },
    },
    defaultVariants: { tone: "gold" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}

const STATUS_MAP: Record<
  DocStatus,
  { label: string; tone: "green" | "gold" | "slate" }
> = {
  available: { label: "Available", tone: "green" },
  draft: { label: "Draft", tone: "gold" },
  "coming-soon": { label: "Coming Soon", tone: "slate" },
};

export function StatusBadge({ status }: { status: DocStatus }) {
  const cfg = STATUS_MAP[status];
  return (
    <Badge tone={cfg.tone}>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{
          background:
            cfg.tone === "green"
              ? "#52B788"
              : cfg.tone === "gold"
                ? "#C9A84C"
                : "#8DA5BC",
        }}
      />
      {cfg.label}
    </Badge>
  );
}
