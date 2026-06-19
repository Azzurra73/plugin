import type { Metadata } from "next";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { OnboardingModal } from "@/components/OnboardingModal";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Investor Onboarding",
  description:
    "Begin investor onboarding through the InvestGlass portal. Pre-onboarding checklist, eligibility and required documents.",
};

const STEPS = [
  {
    n: "01",
    title: "Pre-check & eligibility",
    body: "Confirm your investor classification and gather the documents below. Some vehicles are restricted to professional or qualifying investors.",
  },
  {
    n: "02",
    title: "InvestGlass portal",
    body: "You are redirected to the secure InvestGlass platform — Swiss data residency, GDPR-aligned — where onboarding is completed end to end.",
  },
  {
    n: "03",
    title: "KYC / AML & suitability",
    body: "Automated identity verification, source-of-funds checks and the MiFID II suitability questionnaire establish your profile.",
  },
  {
    n: "04",
    title: "E-signature & subscription",
    body: "Review the instrument documentation, sign electronically and complete your subscription securely in the portal.",
  },
  {
    n: "05",
    title: "Client portal & reporting",
    body: "Access your portfolio, performance and statements in your personal InvestGlass client portal.",
  },
];

const DOCUMENTS_NEEDED = [
  "Valid passport or national identity card",
  "Proof of address dated within the last three months",
  "Tax identification number / details",
  "Source-of-funds documentation",
  "Investor classification evidence (where professional status is claimed)",
];

export default function OnboardingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-navy pt-32 pb-16 md:pt-40">
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow-chip">
              <ShieldCheck className="h-3.5 w-3.5" /> Investor onboarding
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream md:text-5xl">
              Onboard securely through{" "}
              <em className="not-italic text-gold">InvestGlass</em>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
              Framont uses InvestGlass as its single, secure gateway for investor
              onboarding — handling KYC/AML, MiFID II suitability, e-signature and
              your ongoing client portal. Review the checklist, then continue to
              the portal.
            </p>
            <OnboardingModal
              trigger={
                <Button size="lg" className="mt-8">
                  Start onboarding
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <span className="eyebrow">The five steps</span>
            <div className="mt-6 space-y-3">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-4 rounded-md border border-line bg-navy-mid/60 p-5"
                >
                  <span className="font-mono text-sm text-gold">{s.n}</span>
                  <div>
                    <h3 className="font-display text-lg text-cream">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/55">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-md border border-gold/30 bg-gold/[0.03] p-6">
              <span className="eyebrow">Documents you will need</span>
              <ul className="mt-5 space-y-3">
                {DOCUMENTS_NEEDED.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-cream/70">
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-gold/40 bg-gold/[0.08]">
                      <Check className="h-3 w-3 text-gold" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[0.8rem] leading-relaxed text-cream/45">
                  Prefer to speak with us first? Request a consultation and our
                  team will guide you through eligibility before you begin.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a href="/advisory">
                    Richiedi Consulenza <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-wide mt-10">
          <p className="rounded-md border border-line bg-navy-mid/40 p-5 text-[0.8rem] leading-relaxed text-cream/45">
            Onboarding is completed on the third-party InvestGlass platform
            ({SITE.investGlassUrl}) under its own terms and privacy policy.
            Framont products are regulated investment vehicles and capital is at
            risk. This page is a marketing communication and is not investment
            advice.
          </p>
        </div>
      </section>
    </>
  );
}
