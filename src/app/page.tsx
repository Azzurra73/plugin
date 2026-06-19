import Link from "next/link";
import {
  ShieldCheck,
  Globe2,
  Layers,
  Lock,
  Network,
  Building2,
  ArrowRight,
} from "lucide-react";
import { CTAButtons } from "@/components/CTAButtons";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { SITE } from "@/lib/utils";

const STATS = [
  { value: "27", label: "EEA member states passported" },
  { value: "AIFMD II", label: "Directive 2024/927/EU" },
  { value: "30+", label: "Years of management experience" },
  { value: "15 days", label: "From term sheet to live fund" },
];

const FLOW = [
  { n: "01", label: "InvestGlass Portal", sub: "Digital access, guided onboarding" },
  { n: "02", label: "KYC / AML", sub: "Identity, risk profile, suitability" },
  { n: "03", label: "Product Selection", sub: "Framont modular catalogue" },
  { n: "04", label: "Subscription", sub: "E-signature, documents, settlement" },
  { n: "05", label: "Reporting", sub: "Portfolio, performance, compliance" },
];

const GOVERNANCE = [
  {
    icon: Building2,
    title: "MFSA-Authorised AIFM",
    body: "Regulated by the Malta Financial Services Authority under AIFMD II, with a Category 2 Investment Services Licence and an EU passport across 27 states.",
  },
  {
    icon: ShieldCheck,
    title: "Institutional Governance",
    body: "Independent Investment Committee, Risk Manager and Compliance Officer oversee every vehicle, with depositary and audit built in.",
  },
  {
    icon: Lock,
    title: "Data Sovereignty",
    body: "Investor data is handled on InvestGlass infrastructure in Switzerland — GDPR-aligned, with no data leaving controlled jurisdictions.",
  },
  {
    icon: Network,
    title: "Open Integrations",
    body: "An open API ecosystem connects custody, transfer agents, NAV providers and reporting into a single investor experience.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-navy pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow-chip">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gold" />
              MFSA-Authorised AIFM · Malta · AIFMD II
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-normal leading-[1.08] text-cream md:text-6xl">
              One regulated platform.{" "}
              <em className="not-italic text-gold">Modular vehicles</em> for every
              investor.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
              Framont aggregates regulated EU investment vehicles — ETIs,
              Actively Managed Certificates, ready-made and bespoke funds,
              alternatives and venture capital — under a single digital platform.
              Investors onboard through InvestGlass with integrated KYC,
              e-signature and full lifecycle management.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CTAButtons className="mt-9" />
          </Reveal>

          {/* STAT BAND */}
          <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label} className="bg-navy-mid p-5">
                <p className="font-display text-2xl text-gold md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-cream/55">
                  {s.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section className="section">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">
              <Layers className="h-3.5 w-3.5" /> The platform · five modules
            </span>
            <h2 className="section-title mt-3">Products for every mandate</h2>
            <p className="lede mt-3 max-w-2xl">
              Each module is a dedicated landing experience with its own document
              library and onboarding path — from listed instruments to private
              markets and venture capital.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
            <Reveal delay={products.length * 0.05}>
              <div className="flex h-full flex-col justify-between rounded-md border border-dashed border-gold/30 bg-gold/[0.03] p-6">
                <div>
                  <h3 className="font-display text-xl text-cream">
                    Launch your own vehicle
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/55">
                    Bring the thesis and the network. We bring the complete
                    regulatory machine — operational in as little as 15 days.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-6 self-start">
                  <Link href="/advisory">
                    Talk to us <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INVESTOR FLOW */}
      <section className="section border-y border-line bg-navy-mid/40">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">
              <Globe2 className="h-3.5 w-3.5" /> Investor journey
            </span>
            <h2 className="section-title mt-3">From access to portfolio</h2>
            <p className="lede mt-3 max-w-2xl">
              A single gateway. Investors never see the regulatory complexity
              underneath — only their portfolio and the products available to
              them.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-3 md:grid-cols-5">
            {FLOW.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06}>
                <div className="relative h-full rounded-md border border-line bg-navy p-5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-wide2 text-gold">
                    {step.n}
                  </span>
                  <p className="mt-2 font-medium text-cream">{step.label}</p>
                  <p className="mt-1 text-xs leading-snug text-cream/50">
                    {step.sub}
                  </p>
                  {i < FLOW.length - 1 && (
                    <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-gold/70 md:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* INVESTGLASS GATEWAY */}
          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 rounded-md border border-slate-light/30 bg-navy-soft/40 p-6 md:grid-cols-[auto_1fr] md:p-8">
              <div className="grid h-14 w-14 flex-none place-items-center rounded-sm border border-slate-light/30 bg-slate-light/[0.08]">
                <span className="font-display text-2xl font-bold text-slate-light">
                  IG
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-cream">
                  InvestGlass — the unified onboarding gateway
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cream/60">
                  A Swiss, AI-native platform combining CRM, digital onboarding,
                  automated KYC/AML, e-signature, MiFID II suitability and a
                  client portal. Framont uses it as the single front door to
                  every product, with Swiss data residency and an open API
                  ecosystem.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Digital Onboarding",
                    "KYC / AML",
                    "e-Signature",
                    "MiFID II Suitability",
                    "Client Portal",
                    "Portfolio Management",
                    "GDPR · Swiss DC",
                  ].map((f) => (
                    <span
                      key={f}
                      className="rounded-sm border border-slate-light/20 bg-slate-light/[0.06] px-2.5 py-1 text-[0.68rem] text-slate-light"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/onboarding">
                      See onboarding flow <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="section">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">
              <ShieldCheck className="h-3.5 w-3.5" /> Governance & compliance
            </span>
            <h2 className="section-title mt-3">
              The regulatory backbone you can trust
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {GOVERNANCE.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="h-full rounded-md border border-line bg-navy-mid/60 p-6">
                  <g.icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-display text-lg text-cream">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section border-t border-line bg-hero-navy">
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-3xl leading-tight text-cream md:text-5xl">
              Your conviction deserves a{" "}
              <em className="not-italic text-gold">regulated stage.</em>
            </h2>
            <p className="lede mx-auto mt-5 max-w-2xl">
              Whether you are an investor seeking access or a manager ready to
              launch, Framont provides the regulated infrastructure to move with
              confidence across European markets.
            </p>
            <CTAButtons className="mt-9 justify-center" />
            <p className="mt-8 text-xs text-cream/40">
              {SITE.legalName} · {SITE.address}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
