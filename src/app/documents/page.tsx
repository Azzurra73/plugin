import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { DocumentLibrary, type LibraryDoc } from "@/components/DocumentLibrary";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Document Library",
  description:
    "Unified document library across all Framont products — term sheets, information memoranda, KIDs, factsheets, risk reports and LP agreements.",
};

export default function DocumentsPage() {
  const docs: LibraryDoc[] = products.flatMap((p) =>
    p.documents.map((d) => ({
      ...d,
      productName: p.name,
      productSlug: p.slug,
    })),
  );

  const available = docs.filter((d) => d.status === "available").length;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-navy pt-32 pb-16 md:pt-40">
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow-chip">
              <FileText className="h-3.5 w-3.5" /> Document library
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream md:text-5xl">
              Every document, <em className="not-italic text-gold">one place</em>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
              Browse the full documentation set across all five product modules.
              Filter by product or document type. Gated items require a quick
              verification; {available} documents are currently available.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <DocumentLibrary docs={docs} showFilters showProduct />
          <p className="mt-6 text-[0.78rem] leading-relaxed text-cream/40">
            Documents shown are placeholders pending the final approved files.
            All official documentation for regulated instruments — KID/KIID,
            prospectus, ISIN and subscription materials — is provided exclusively
            by Framont & Partners Management Ltd. Marketing communication only;
            capital is at risk.
          </p>
        </div>
      </section>
    </>
  );
}
