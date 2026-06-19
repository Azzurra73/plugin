import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/OnboardingModal";
import { cn } from "@/lib/utils";

/**
 * The two distinct CTA flows used across the platform:
 *  1. "Accedi come Investitore" → InvestGlass pre-check modal → portal redirect
 *  2. "Richiedi Consulenza" → internal advisory form
 */
export function CTAButtons({
  className,
  size = "lg",
  primary = "investor",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  primary?: "investor" | "advisory";
}) {
  const investor = (
    <OnboardingModal
      trigger={
        <Button
          variant={primary === "investor" ? "primary" : "outline"}
          size={size}
        >
          Accedi come Investitore
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      }
    />
  );

  const advisory = (
    <Button
      asChild
      variant={primary === "advisory" ? "primary" : "outline"}
      size={size}
    >
      <Link href="/advisory">
        Richiedi Consulenza
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {primary === "investor" ? (
        <>
          {investor}
          {advisory}
        </>
      ) : (
        <>
          {advisory}
          {investor}
        </>
      )}
    </div>
  );
}
