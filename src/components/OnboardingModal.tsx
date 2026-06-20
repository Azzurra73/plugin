"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

const CHECKLIST = [
  {
    title: "Eligibility",
    body: "You qualify as a professional or elective-professional investor, or are advised by one. Certain vehicles are restricted to qualifying investors only.",
  },
  {
    title: "Identity & KYC documents",
    body: "A valid passport or national ID, proof of address (utility bill or bank statement, < 3 months), and tax identification details.",
  },
  {
    title: "Source of funds",
    body: "Documentation evidencing the origin of the funds to be invested, in line with AML/KYC requirements.",
  },
  {
    title: "Suitability profile",
    body: "Be ready to complete the MiFID II suitability and appropriateness questionnaire covering knowledge, experience and risk tolerance.",
  },
  {
    title: "Instrument documentation",
    body: "Read the relevant KID/KIID, Information Memorandum or prospectus before subscribing. Capital is at risk.",
  },
];

export function OnboardingModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [ack, setAck] = React.useState(false);

  function proceed() {
    window.open(SITE.investGlassUrl, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
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
                className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border border-line bg-navy-mid shadow-card"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="flex items-start gap-4 border-b border-line bg-navy-soft/40 p-6">
                  <div className="grid h-11 w-11 flex-none place-items-center rounded-sm border border-slate-light/30 bg-slate-light/[0.08]">
                    <span className="font-display text-lg font-bold text-slate-light">
                      IG
                    </span>
                  </div>
                  <div className="flex-1">
                    <Dialog.Title className="font-display text-xl text-cream">
                      Investor onboarding via InvestGlass
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-sm text-cream/55">
                      Onboarding, KYC/AML, MiFID II suitability and e-signature
                      are handled securely on the InvestGlass portal. Review the
                      pre-check below before continuing.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close className="grid h-8 w-8 flex-none place-items-center rounded-sm text-cream/50 transition-colors hover:bg-white/[0.06] hover:text-cream">
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>

                <div className="max-h-[55vh] overflow-y-auto p-6">
                  <p className="eyebrow mb-4">Pre-onboarding checklist</p>
                  <ul className="space-y-3">
                    {CHECKLIST.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border border-gold/40 bg-gold/[0.08]">
                          <Check className="h-3 w-3 text-gold" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-cream">
                            {item.title}
                          </p>
                          <p className="text-[0.82rem] leading-relaxed text-cream/55">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-sm border border-line bg-navy/40 p-4">
                    <input
                      type="checkbox"
                      checked={ack}
                      onChange={(e) => setAck(e.target.checked)}
                      className="mt-0.5 h-4 w-4 flex-none accent-gold"
                    />
                    <span className="text-[0.8rem] leading-relaxed text-cream/60">
                      I understand that Framont products are regulated
                      investment vehicles, that capital is at risk, and that
                      onboarding is completed on the third-party InvestGlass
                      platform under its own terms and privacy policy.
                    </span>
                  </label>
                </div>

                <div className="flex flex-col-reverse items-center gap-3 border-t border-line bg-navy-soft/40 p-5 sm:flex-row sm:justify-between">
                  <p className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wide2 text-slate-light">
                    <ShieldCheck className="h-3.5 w-3.5" /> Swiss data sovereignty
                    · GDPR
                  </p>
                  <Button
                    onClick={proceed}
                    disabled={!ack}
                    className="w-full sm:w-auto"
                  >
                    Continue to InvestGlass
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
