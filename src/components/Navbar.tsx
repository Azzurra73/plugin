"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/OnboardingModal";

const NAV = [
  { href: "/products/eti", label: "ETI" },
  { href: "/products/amc", label: "AMC" },
  { href: "/products/fund-platform", label: "Fund Platform" },
  { href: "/products/alternatives", label: "Alternatives" },
  { href: "/products/vc", label: "VC" },
  { href: "/documents", label: "Documents" },
  { href: "/news", label: "News" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-navy/95 backdrop-blur-md"
          : "border-b border-transparent bg-navy/40 backdrop-blur-sm"
      }`}
    >
      <nav className="container-wide flex h-16 items-center justify-between">
        <Wordmark />

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-[0.7rem] uppercase tracking-wide2 text-cream/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/advisory">Consulenza</Link>
          </Button>
          <OnboardingModal
            trigger={
              <Button size="sm">
                Investitore
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            }
          />
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-sm text-cream lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-navy/98 lg:hidden">
          <ul className="container-wide flex flex-col py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-xs uppercase tracking-wide2 text-cream/80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-col gap-2">
              <Button asChild variant="outline" size="md">
                <Link href="/advisory" onClick={() => setOpen(false)}>
                  Richiedi Consulenza
                </Link>
              </Button>
              <OnboardingModal
                trigger={
                  <Button size="md">Accedi come Investitore</Button>
                }
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
