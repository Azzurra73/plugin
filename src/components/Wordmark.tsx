import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand lockup rendered as the gold Playfair wordmark from the platform
 * architecture schema. Keeps a single coherent gold/navy identity across the
 * dark UI. The official raster/SVG logos live in /public/brand for print and
 * external use.
 */
export function Wordmark({
  className,
  withTagline = false,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex flex-col", className)}>
      <span className="font-display text-xl font-bold tracking-[0.04em] text-gold transition-colors group-hover:text-gold-light">
        FRAMONT
        <span className="ml-1 align-top font-sans text-[0.6rem] font-medium tracking-wide2 text-slate-light">
          &amp; PARTNERS
        </span>
      </span>
      {withTagline && (
        <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-wide3 text-slate-light">
          MFSA-Authorised AIFM · Malta
        </span>
      )}
    </Link>
  );
}
