import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { SITE } from "@/lib/utils";
import { products } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy-mid/60">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark withTagline />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/55">
            {SITE.regulator}
          </p>
          <p className="mt-4 text-[0.8rem] leading-relaxed text-cream/45">
            {SITE.address}
            <br />
            Tel: {SITE.phone}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Products</p>
          <ul className="space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm text-cream/65 transition-colors hover:text-gold"
                >
                  {p.code} · {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Platform</p>
          <ul className="space-y-2.5">
            {[
              { href: "/documents", label: "Document Library" },
              { href: "/onboarding", label: "Investor Onboarding" },
              { href: "/advisory", label: "Advisory & Consultation" },
              { href: "/news", label: "News & Insights" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-cream/65 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-wide flex flex-col gap-3 py-5 text-[0.7rem] tracking-wide text-cream/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.legalName} · {SITE.licence}
          </span>
          <span className="max-w-xl leading-relaxed">
            Marketing communication only. Not investment advice. Capital is at
            risk. Read the relevant KID/KIID and offering documents before
            investing.
          </span>
        </div>
      </div>
    </footer>
  );
}
