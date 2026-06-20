"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Lock, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/badge";
import { DOC_TYPES, type DocType, type ProductDocument } from "@/lib/products";

export interface LibraryDoc extends ProductDocument {
  productName: string;
  productSlug: string;
}

const ACCESS_KEY = "framont_doc_access";

function hasAccess(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ACCESS_KEY) === "1";
}

function GateDialog({
  doc,
  onClose,
  onGranted,
}: {
  doc: LibraryDoc | null;
  onClose: () => void;
  onGranted: (doc: LibraryDoc) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !doc) return;
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `Document access request: ${doc.title} (${doc.productName})`,
          product: doc.productSlug,
          intent: "document-access",
        }),
      });
    } catch {
      /* non-blocking: access is still granted client-side */
    }
    window.localStorage.setItem(ACCESS_KEY, "1");
    setSubmitting(false);
    onGranted(doc);
  }

  return (
    <Dialog.Root open={!!doc} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {doc && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-line bg-navy-mid shadow-card"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
              >
                <div className="flex items-start gap-3 border-b border-line p-5">
                  <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-sm border border-gold/30 bg-gold/[0.06]">
                    <Lock className="h-4 w-4 text-gold" />
                  </span>
                  <div className="flex-1">
                    <Dialog.Title className="font-display text-lg text-cream">
                      Gated document
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-cream/55">
                      Enter your details to access{" "}
                      <span className="text-cream">{doc.title}</span>. Required
                      for documentation of regulated instruments.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="grid h-7 w-7 flex-none place-items-center rounded-sm text-cream/50 hover:bg-white/[0.06] hover:text-cream">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>
                <form onSubmit={submit} className="space-y-4 p-5">
                  <div>
                    <Label htmlFor="g-name">Full name</Label>
                    <Input
                      id="g-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="g-email">Email address</Label>
                    <Input
                      id="g-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Verifying…" : "Access document"}
                    <Download className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-[0.7rem] leading-relaxed text-cream/40">
                    By continuing you agree to be contacted by Framont about your
                    request. No spam.
                  </p>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function DocRow({
  doc,
  showProduct,
  onRequest,
}: {
  doc: LibraryDoc;
  showProduct: boolean;
  onRequest: (d: LibraryDoc) => void;
}) {
  const disabled = doc.status === "coming-soon";

  function handle() {
    if (disabled) return;
    if (doc.gated && !hasAccess()) {
      onRequest(doc);
      return;
    }
    window.open(doc.file, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex items-center gap-4 border-b border-line/60 px-4 py-4 transition-colors hover:bg-gold/[0.02]">
      <span className="grid h-10 w-10 flex-none place-items-center rounded-sm border border-line bg-navy/50 text-cream/60">
        <FileText className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-cream">{doc.title}</p>
          {doc.gated && (
            <Lock className="h-3 w-3 flex-none text-slate-light" aria-label="Gated" />
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wide text-cream/40">
          <span>{doc.type}</span>
          {doc.size && <span>· {doc.size}</span>}
          {showProduct && <span>· {doc.productName}</span>}
        </div>
      </div>
      <StatusBadge status={doc.status} />
      <Button
        variant={disabled ? "subtle" : "outline"}
        size="sm"
        onClick={handle}
        disabled={disabled}
        className="flex-none"
      >
        {disabled ? (
          "Soon"
        ) : doc.gated && !hasAccess() ? (
          <>
            <Lock className="h-3.5 w-3.5" /> Request
          </>
        ) : (
          <>
            <Download className="h-3.5 w-3.5" /> Download
          </>
        )}
      </Button>
    </div>
  );
}

export function DocumentLibrary({
  docs,
  showFilters = false,
  showProduct = false,
}: {
  docs: LibraryDoc[];
  showFilters?: boolean;
  showProduct?: boolean;
}) {
  const [gateDoc, setGateDoc] = React.useState<LibraryDoc | null>(null);
  const [granted, setGranted] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState<DocType | "All">("All");
  const [productFilter, setProductFilter] = React.useState<string>("All");

  const products = React.useMemo(
    () =>
      Array.from(new Map(docs.map((d) => [d.productSlug, d.productName]))),
    [docs],
  );

  const filtered = docs.filter(
    (d) =>
      (typeFilter === "All" || d.type === typeFilter) &&
      (productFilter === "All" || d.productSlug === productFilter),
  );

  function onGranted(doc: LibraryDoc) {
    setGranted(true);
    setGateDoc(null);
    window.open(doc.file, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      {showFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <FilterChip
            active={productFilter === "All"}
            onClick={() => setProductFilter("All")}
          >
            All products
          </FilterChip>
          {products.map(([slug, name]) => (
            <FilterChip
              key={slug}
              active={productFilter === slug}
              onClick={() => setProductFilter(slug)}
            >
              {name}
            </FilterChip>
          ))}
          <span className="mx-1 h-5 w-px bg-line" />
          <FilterChip
            active={typeFilter === "All"}
            onClick={() => setTypeFilter("All")}
          >
            All types
          </FilterChip>
          {DOC_TYPES.map((t) => (
            <FilterChip
              key={t}
              active={typeFilter === t}
              onClick={() => setTypeFilter(t)}
            >
              {t}
            </FilterChip>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-md border border-line bg-navy-mid/50">
        {filtered.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-cream/45">
            No documents match the current filter.
          </p>
        ) : (
          filtered.map((doc) => (
            <DocRow
              key={`${doc.productSlug}-${doc.id}`}
              doc={doc}
              showProduct={showProduct}
              onRequest={setGateDoc}
            />
          ))
        )}
      </div>

      {granted && (
        <p className="mt-3 flex items-center gap-2 text-xs text-success">
          <Check className="h-3.5 w-3.5" /> Access granted for this session.
          Available documents now download directly.
        </p>
      )}

      <GateDialog
        doc={gateDoc}
        onClose={() => setGateDoc(null)}
        onGranted={onGranted}
      />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-sm border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide transition-colors ${
        active
          ? "border-gold/50 bg-gold/[0.08] text-gold"
          : "border-line text-cream/55 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
