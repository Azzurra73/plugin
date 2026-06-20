import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Reveal } from "@/components/Reveal";
import { getAllNews, getNewsArticle } from "@/lib/news";

export function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getNewsArticle(params.slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getNewsArticle(params.slug);
  if (!article) notFound();

  return (
    <article className="bg-hero-navy">
      <div className="container-wide max-w-3xl pt-32 pb-24 md:pt-40">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All news
        </Link>

        <Reveal>
          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-sm border border-gold/30 bg-gold/[0.06] px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide text-gold">
              {article.category}
            </span>
            <span className="font-mono text-[0.65rem] text-cream/45">
              {formatDate(article.date)} · {article.author}
            </span>
          </div>
          <h1 className="mt-5 font-display text-3xl leading-tight text-cream md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-cream/60">
            {article.excerpt}
          </p>
        </Reveal>

        <div className="mt-10 border-t border-line pt-10">
          <div className="prose-framont">
            <MDXRemote source={article.content} />
          </div>
        </div>
      </div>
    </article>
  );
}
