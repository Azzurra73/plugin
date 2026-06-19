import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, FileText, ExternalLink } from "lucide-react";
import { CTAButtons } from "@/components/CTAButtons";
import { Reveal } from "@/components/Reveal";
import { DocumentLibrary, type LibraryDoc } from "@/components/DocumentLibrary";
import { allProductSlugs, getProduct } from "@/lib/products";
import { ACCENT_HEX } from "@/lib/accents";
import { SITE } from "@/lib/utils";

export function generateStaticParams() {
  return allProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} (${product.code})`,
    description: product.intro,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const accent = ACCENT_HEX[product.accent];
  const libraryDocs: LibraryDoc[] = product.documents.map((d) => ({
    ...d,
    productName: product.name,
    productSlug: product.slug,
  }));

  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-hero-navy pt-32 pb-20 md:pt-40"
        style={{ borderBottom: `1px solid ${accent}44` }}
      >
        <div
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: accent }}
        />
        <div className="container-wide relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All products
          </Link>

          <Reveal>
            <div className="mt-6 flex items-center gap-3">
              <span
                className="grid h-12 w-12 place-items-center rounded-sm text-xl"
                style={{ background: `${accent}22`, border: `1px solid ${accent}66` }}
              >
                {product.icon}
              </span>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-wide2 text-gold">
                  {product.code} · {product.category}
                </p>
              </div>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.1] text-cream md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream/65 md:text-lg">
              {product.intro}
            </p>
            <CTAButtons className="mt-8" primary={product.primaryCta} />
          </Reveal>

          {/* HIGHLIGHTS */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
            {product.highlights.map((h) => (
              <div key={h.label} className="bg-navy-mid p-5">
                <p className="font-display text-xl text-gold md:text-2xl">
                  {h.value}
                </p>
                <p className="mt-1 text-xs text-cream/55">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <div className="mt-4 space-y-5">
              {product.body.map((para, i) => (
                <p key={i} className="text-[0.95rem] leading-relaxed text-cream/70">
                  {para}
                </p>
              ))}
            </div>
            {product.source && (
              <a
                href={product.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide2 text-gold-light hover:text-gold"
              >
                Reference: framontmanagement.com
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </Reveal>

          {/* SUB-MODULES */}
          <Reveal delay={0.1}>
            <span className="eyebrow">Sub-modules</span>
            <div className="mt-4 space-y-3">
              {product.subPages.map((s) => (
                <div
                  key={s.slug}
                  className="rounded-md border border-line bg-navy-mid/60 p-5"
                  style={{ borderLeft: `3px solid ${accent}` }}
                >
                  <h3 className="font-display text-lg text-cream">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/55">
                    {s.summary}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {s.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-[0.82rem] text-cream/60"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 flex-none"
                          style={{ color: accent }}
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DOCUMENT LIBRARY */}
      <section className="section border-t border-line bg-navy-mid/40">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">
              <FileText className="h-3.5 w-3.5" /> Document library
            </span>
            <h2 className="section-title mt-3">{product.code} documentation</h2>
            <p className="lede mt-3 max-w-2xl">
              Term sheets, information memoranda, KIDs, factsheets and reports.
              Gated documents require a quick verification. Capital is at risk —
              read the relevant KID before investing.
            </p>
          </Reveal>
          <div className="mt-10">
            <DocumentLibrary docs={libraryDocs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-wide rounded-lg border border-line bg-hero-navy p-10 text-center md:p-16">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-cream md:text-4xl">
              Interested in {product.name}?
            </h2>
            <p className="lede mx-auto mt-4 max-w-xl">
              Request the full documentation and a conversation with our team, or
              begin onboarding through the InvestGlass portal.
            </p>
            <CTAButtons
              className="mt-8 justify-center"
              primary={product.primaryCta}
            />
            <p className="mt-6 text-xs text-cream/40">
              {SITE.legalName} · {SITE.licence}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
