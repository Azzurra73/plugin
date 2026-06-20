import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Central configuration for external integrations. */
export const SITE = {
  name: "Framont & Partners Management",
  shortName: "Framont",
  legalName: "Framont & Partners Management Ltd",
  tagline: "Tailored Fund Solutions & Wealth Strategies",
  regulator:
    "Authorised by the Malta Financial Services Authority (MFSA) as an Alternative Investment Fund Manager under AIFMD II (Directive 2024/927/EU).",
  licence: "Category 2 Investment Services Licence · MFSA, Malta",
  address: "Dragonara Business Centre, 5th Floor, Dragonara Road, San Ġiljan STJ 3141, Malta",
  phone: "+356 20105592",
  email: "info@framontmanagement.com",
  website: "https://www.framontmanagement.com",
  ceo: "Gianluigi Montagner",
  // Investor onboarding is handled externally by InvestGlass.
  investGlassUrl: "https://www.investglass.com/",
  // Optional Calendly link for advisory bookings (configure per environment).
  calendlyUrl: "https://calendly.com/framontmanagement/consultation",
} as const;
