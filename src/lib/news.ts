import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "src", "content", "news");

export interface NewsMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
}

export interface NewsArticle extends NewsMeta {
  content: string;
}

function readFiles(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith(".mdx"));
}

export function getAllNews(): NewsMeta[] {
  return readFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        category: data.category ?? "General",
        excerpt: data.excerpt ?? "",
        author: data.author ?? "Framont",
      } satisfies NewsMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsArticle(slug: string): NewsArticle | null {
  const file = path.join(NEWS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    category: data.category ?? "General",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "Framont",
    content,
  };
}

export function getNewsCategories(): string[] {
  const set = new Set(getAllNews().map((n) => n.category));
  return ["All", ...Array.from(set)];
}
