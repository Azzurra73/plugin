"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsMeta } from "@/lib/news";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function NewsList({
  items,
  categories,
}: {
  items: NewsMeta[];
  categories: string[];
}) {
  const [active, setActive] = React.useState("All");
  const filtered =
    active === "All" ? items : items.filter((n) => n.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-sm border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide transition-colors ${
              active === c
                ? "border-gold/50 bg-gold/[0.08] text-gold"
                : "border-line text-cream/55 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <Link
            key={n.slug}
            href={`/news/${n.slug}`}
            className="group flex h-full flex-col rounded-md border border-line bg-navy-mid/70 p-6 transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-sm border border-gold/30 bg-gold/[0.06] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-gold">
                {n.category}
              </span>
              <span className="font-mono text-[0.62rem] text-cream/40">
                {formatDate(n.date)}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg leading-snug text-cream">
              {n.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/55">
              {n.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wide2 text-gold-light transition-colors group-hover:text-gold">
              Read more
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-cream/45">
          No updates in this category yet.
        </p>
      )}
    </div>
  );
}
