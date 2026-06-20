import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ACCENT_HEX } from "@/lib/accents";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const accent = ACCENT_HEX[product.accent];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col rounded-md border border-line bg-navy-mid/70 p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-card"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="mb-4 flex items-center justify-between">
        <span
          className="grid h-10 w-10 place-items-center rounded-sm text-lg"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
        >
          {product.icon}
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-wide2 text-cream/40">
          {product.code}
        </span>
      </div>

      <h3 className="font-display text-xl text-cream">{product.name}</h3>
      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wide text-gold/80">
        {product.category}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/55">
        {product.tagline}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {product.subPages.map((s) => (
          <span
            key={s.slug}
            className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.6rem] text-cream/50"
          >
            {s.name}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide2 text-gold-light transition-colors group-hover:text-gold">
        Explore {product.code}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
