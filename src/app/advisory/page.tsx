import type { Metadata } from "next";
import { CalendarClock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Advisory & Consultation",
  description:
    "Request a consultation with the Framont team. Discuss product selection, fund structuring or launching your own regulated EU vehicle.",
};

export default function AdvisoryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-navy pt-32 pb-16 md:pt-40">
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow-chip">
              <CalendarClock className="h-3.5 w-3.5" /> Advisory
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-cream md:text-5xl">
              Request a <em className="not-italic text-gold">consultation</em>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
              Tell us about your objectives — investing in a Framont vehicle,
              structuring an AMC or ETI, or launching your own regulated fund. Our
              team responds within 72 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="rounded-lg border border-line bg-navy-mid/60 p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              {/* Calendly embed slot */}
              <div className="rounded-md border border-line bg-navy-mid/60 p-6">
                <span className="eyebrow">
                  <CalendarClock className="h-3.5 w-3.5" /> Book directly
                </span>
                <h3 className="mt-3 font-display text-lg text-cream">
                  Schedule a 30-minute call
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">
                  Prefer to pick a time now? Book a structuring call with the
                  Framont team.
                </p>
                {/*
                  Calendly inline embed. Set the URL in src/lib/utils.ts (SITE.calendlyUrl).
                  To enable the full embed, add the Calendly widget script and
                  render <div className="calendly-inline-widget" data-url={SITE.calendlyUrl} />.
                */}
                <a
                  href={SITE.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-gold/40 px-4 py-3 text-sm text-cream transition-colors hover:border-gold hover:bg-gold/[0.06]"
                >
                  <CalendarClock className="h-4 w-4 text-gold" />
                  Open Calendly
                </a>
              </div>

              <div className="rounded-md border border-line bg-navy-mid/60 p-6">
                <span className="eyebrow">Direct contact</span>
                <ul className="mt-4 space-y-3 text-sm text-cream/70">
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 flex-none text-gold" />
                    {SITE.phone}
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 flex-none text-gold" />
                    {SITE.email}
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" />
                    {SITE.address}
                  </li>
                </ul>
                <p className="mt-5 border-t border-line pt-4 text-[0.78rem] leading-relaxed text-cream/45">
                  {SITE.legalName} · {SITE.licence}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
