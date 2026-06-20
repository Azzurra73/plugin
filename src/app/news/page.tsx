import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { NewsList } from "@/components/NewsList";
import { Reveal } from "@/components/Reveal";
import { getAllNews, getNewsCategories } from "@/lib/news";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Updates and insights across Framont's product categories — ETI, AMC, Fund Platform, Alternatives and Venture Capital.",
};

export default function NewsPage() {
  const items = getAllNews();
  const categories = getNewsCategories();

  return (
    <>
      <section className="relative overflow-hidden bg-hero-navy pt-32 pb-16 md:pt-40">
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow-chip">
              <Newspaper className="h-3.5 w-3.5" /> News & insights
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream md:text-5xl">
              Perspectives across the{" "}
              <em className="not-italic text-gold">platform</em>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
              Regulatory developments, product launches and structuring insight,
              organised by product category.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <NewsList items={items} categories={categories} />
        </div>
      </section>
    </>
  );
}
