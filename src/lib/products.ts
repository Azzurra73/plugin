export type DocStatus = "available" | "draft" | "coming-soon";

export type DocType =
  | "Term Sheet"
  | "Information Memorandum"
  | "Subscription Form"
  | "KIID"
  | "Factsheet"
  | "Risk Report"
  | "LP Agreement";

export interface ProductDocument {
  id: string;
  title: string;
  type: DocType;
  status: DocStatus;
  /** Path under /public/documents. Placeholder until real files are provided. */
  file: string;
  size?: string;
  updated?: string;
  /** Gated documents require login or an email before download. */
  gated: boolean;
}

export interface SubPage {
  slug: string;
  name: string;
  summary: string;
  points: string[];
}

export type ModuleAccent = "eti" | "amc" | "fund" | "vc" | "alt";

export interface Product {
  slug: string;
  code: string;
  name: string;
  category: string;
  /** Module accent key — maps to the architecture colour palette. */
  accent: ModuleAccent;
  icon: string;
  /** One-line positioning for cards. */
  tagline: string;
  /** Hero paragraph — real Framont positioning. */
  intro: string;
  /** Longer editorial body shown on the landing page. */
  body: string[];
  highlights: { label: string; value: string }[];
  subPages: SubPage[];
  documents: ProductDocument[];
  /** Which CTA flow is primary for this product. */
  primaryCta: "investor" | "advisory";
  source?: string;
}

const doc = (
  id: string,
  title: string,
  type: DocType,
  status: DocStatus,
  gated = true,
  size?: string,
): ProductDocument => ({
  id,
  title,
  type,
  status,
  gated,
  size,
  file: `/documents/${id}.pdf`,
  updated: "2026-06",
});

export const products: Product[] = [
  {
    slug: "eti",
    code: "ETI",
    name: "Exchange Traded Instruments",
    category: "Listed Instruments",
    accent: "eti",
    icon: "📈",
    tagline: "Listed, EU-passported strategies tradable like a share.",
    intro:
      "Framont structures and acts as Delegated Portfolio Manager for Exchange Traded Instruments listed on European stock exchanges and tradable through standard brokerage accounts. Each ETI pairs an investable strategy with institutional-grade MFSA oversight under AIFMD II.",
    body: [
      "An ETI is a debt security listed on a regulated European exchange that gives investors transparent, liquid access to a defined strategy — without subscription documents or lock-up periods. The instrument trades like a share, settles through standard custody, and is supported by a market maker providing continuous bid/ask liquidity.",
      "Framont & Partners Management Ltd, as MFSA-authorised AIFM, acts as Delegated Portfolio Manager: responsible for implementing the strategy and ensuring the portfolio complies with the instrument's investment guidelines and applicable regulation at all times. Issuance and market-making are handled by specialist partners such as iMaps ETI AG (Liechtenstein), keeping a clear separation between strategy development, portfolio management, issuance, and liquidity provision.",
      "This architecture lets strategy developers and asset managers bring a rules-based, listed product to market with full European regulatory standing — from systematic quantitative strategies to tokenised and thematic exposures.",
    ],
    highlights: [
      { label: "Access from", value: "€1,000" },
      { label: "Listing", value: "European exchange" },
      { label: "Manager", value: "MFSA AIFM" },
      { label: "Passport", value: "27 EEA states" },
    ],
    subPages: [
      {
        slug: "sistematici",
        name: "ETI Sistematici",
        summary:
          "Systematic, rules-based strategies driven entirely by a defined mathematical or quantitative model — no discretion, no sentiment overlay.",
        points: [
          "Transparent regime-classification and signal logic",
          "Backtested and documented methodology",
          "Unleveraged and leveraged variants where applicable",
          "Daily NAV and exchange listing",
        ],
      },
      {
        slug: "tokenizzati",
        name: "ETI Tokenizzati / DLT",
        summary:
          "Instruments leveraging distributed-ledger infrastructure for issuance, settlement and registry, combining on-chain efficiency with a regulated EU wrapper.",
        points: [
          "DLT-based registry and settlement rails",
          "Regulated wrapper, exchange-listed ISIN",
          "Fractional, programmable exposure",
          "Institutional custody and compliance",
        ],
      },
      {
        slug: "tematici",
        name: "ETI Tematici",
        summary:
          "Thematic vehicles targeting structural opportunities — AI-driven platforms, digital infrastructure, European tech sovereignty and beyond.",
        points: [
          "Concentrated thematic mandate",
          "Curated underlying basket",
          "Aligned with long-horizon megatrends",
          "Listed, liquid, transparent",
        ],
      },
    ],
    documents: [
      doc("eti-term-sheet", "ETI Term Sheet", "Term Sheet", "available", true, "412 KB"),
      doc("eti-kiid", "Key Information Document (KID)", "KIID", "available", true, "287 KB"),
      doc("eti-factsheet", "Strategy Factsheet", "Factsheet", "available", false, "640 KB"),
      doc("eti-im", "Information Memorandum", "Information Memorandum", "draft", true),
      doc("eti-risk", "Risk Report", "Risk Report", "coming-soon", true),
    ],
    primaryCta: "investor",
    source: "https://www.framontmanagement.com/eu-investment-vehicles/",
  },
  {
    slug: "amc",
    code: "AMC",
    name: "Actively Managed Certificates",
    category: "Wealth Strategies",
    accent: "amc",
    icon: "🏦",
    tagline: "Bankable, ISIN-listed wrappers for an actively managed strategy.",
    intro:
      "Actively Managed Certificates turn a discretionary investment strategy into a single bankable security with its own ISIN. Framont provides the regulated management layer so wealth managers and advisors can deploy a dynamic, rules-flexible mandate that clients hold in any standard custody account.",
    body: [
      "An AMC is a structured product that tracks an actively managed strategy rather than a static index. The investment manager can adjust allocations within agreed guidelines, while investors gain exposure through a single, transferable ISIN that settles like any other listed security.",
      "Under Framont's MFSA-authorised platform, the strategy benefits from institutional governance — Investment Committee, Risk Manager and Compliance Officer — together with depositary oversight and regulatory reporting. This makes the AMC a fast, capital-efficient route to market for portfolio managers, family offices and advisory boutiques that want their own branded strategy without standing up a full fund.",
      "AMCs suit multi-asset mandates, fund-linked allocations and bespoke thematic baskets, with transparent fee mechanics and the flexibility to evolve the portfolio as markets move.",
    ],
    highlights: [
      { label: "Wrapper", value: "Single ISIN" },
      { label: "Time to market", value: "Weeks" },
      { label: "Governance", value: "MFSA AIFM" },
      { label: "Custody", value: "Standard bankable" },
    ],
    subPages: [
      {
        slug: "standard",
        name: "AMC Standard",
        summary:
          "A single discretionary strategy wrapped into one ISIN — the most direct way to industrialise a manager's flagship approach.",
        points: [
          "One strategy, one bankable certificate",
          "Active rebalancing within guidelines",
          "Transparent NAV and reporting",
          "Distributable across EU custody networks",
        ],
      },
      {
        slug: "multi-asset",
        name: "AMC Multi-asset",
        summary:
          "Cross-asset mandates blending equities, fixed income, alternatives and cash in a single dynamically managed wrapper.",
        points: [
          "Dynamic multi-asset allocation",
          "Risk-budgeted exposure management",
          "Currency and hedging overlays",
          "Single line in the client portfolio",
        ],
      },
      {
        slug: "fund-linked-notes",
        name: "Fund-Linked Notes",
        summary:
          "Notes whose performance is linked to one or more underlying funds, giving structured, bankable access to fund strategies.",
        points: [
          "Exposure to selected fund strategies",
          "Structured payoff and reporting",
          "ISIN-listed, transferable",
          "Tailored to advisory mandates",
        ],
      },
    ],
    documents: [
      doc("amc-term-sheet", "AMC Term Sheet", "Term Sheet", "available", true, "356 KB"),
      doc("amc-factsheet", "AMC Factsheet", "Factsheet", "available", false, "520 KB"),
      doc("amc-im", "Information Memorandum", "Information Memorandum", "draft", true),
      doc("amc-sub", "Subscription Form", "Subscription Form", "available", true, "198 KB"),
      doc("amc-risk", "Risk Report", "Risk Report", "coming-soon", true),
    ],
    primaryCta: "advisory",
    source: "https://www.framontmanagement.com/wealth-strategies/",
  },
  {
    slug: "fund-platform",
    code: "FUND",
    name: "Fund Platform",
    category: "Ready-made & Bespoke Funds",
    accent: "fund",
    icon: "🏗️",
    tagline: "Launch a regulated, EU-passported fund in as little as 15 days.",
    intro:
      "Framont's fund platform lets promoters launch their own AIFMD II-compliant fund without building the structure from scratch. A dedicated sub-fund within our Maltese SICAV gives you the complete regulatory machine — AIFM authorisation, depositary, administration, compliance and an EU passport — operational from day one.",
    body: [
      "A regulated fund has traditionally required €200,000–€400,000 and 18 to 24 months before accepting a first subscription. Framont eliminates both barriers. Under our umbrella you enter as a dedicated sub-fund of an already-authorised AIFM, with MFSA notification, depositary onboarding and the investor portal operational in 15 business days from a signed term sheet.",
      "You bring a focused investment thesis, your investor network and execution. We bring the complete regulatory stack: MFSA AIFM authorisation with Investment Committee, Risk Manager and Compliance Officer; a regulated depositary bank and independent fund administrator; full AML/KYC, statutory audit, MFSA filings, investor reporting and SFDR disclosures.",
      "Framont operates as a true partner — management and performance fees aligned, no hidden setup costs. At scale, your fund can migrate to a Luxembourg RAIF or transfer to your own management company, and your track record always remains yours.",
    ],
    highlights: [
      { label: "Launch", value: "15 days" },
      { label: "Structure", value: "NAIF / SICAV" },
      { label: "Min. ticket", value: "from €10,000" },
      { label: "Saves", value: "€200K+ & 18 months" },
    ],
    subPages: [
      {
        slug: "fondo-pronto",
        name: "Fondo Pronto",
        summary:
          "A ready-made sub-fund within Framont's authorised SICAV — the fastest route from thesis to a live, regulated vehicle.",
        points: [
          "Dedicated sub-fund under an authorised AIFM",
          "Operational in 15 business days",
          "EU passport across 27 markets",
          "Investor portal and onboarding included",
        ],
      },
      {
        slug: "fondo-dedicato",
        name: "Fondo Dedicato",
        summary:
          "A bespoke fund structured around your specific strategy, share classes, fee mechanics and investor base.",
        points: [
          "Custom investment guidelines and share classes",
          "Hurdle rates and carried interest, native to fund law",
          "Tailored governance and reporting",
          "Migration path to RAIF or own AIFM at scale",
        ],
      },
      {
        slug: "reporting-compliance",
        name: "Reporting & Compliance",
        summary:
          "The full operational backbone: audit, AML/KYC, MFSA filings, SFDR disclosures and investor reporting — zero burden on the promoter.",
        points: [
          "Annual statutory audit and MFSA filings",
          "AML/KYC framework fully managed",
          "SFDR and regulatory disclosures",
          "Real-time risk and compliance oversight",
        ],
      },
    ],
    documents: [
      doc("fund-whitepaper", "Fund Lab White Paper", "Information Memorandum", "available", false, "1.2 MB"),
      doc("fund-term-sheet", "Sub-Fund Term Sheet", "Term Sheet", "available", true, "390 KB"),
      doc("fund-sub", "Subscription Form", "Subscription Form", "available", true, "210 KB"),
      doc("fund-lp", "LP / Partnership Agreement", "LP Agreement", "draft", true),
      doc("fund-risk", "Risk Report", "Risk Report", "coming-soon", true),
    ],
    primaryCta: "advisory",
    source: "https://www.framontmanagement.com/fund-platform/",
  },
  {
    slug: "alternatives",
    code: "ALT",
    name: "Alternative Funds",
    category: "Private Markets",
    accent: "alt",
    icon: "🏢",
    tagline: "Private equity, real assets and absolute-return strategies.",
    intro:
      "Framont structures and manages alternative investment funds across private markets — private equity and credit, real assets and hedge-style absolute-return strategies — within an AIFMD II-compliant, EU-passported framework that institutional and semi-institutional LPs require.",
    body: [
      "Alternative strategies demand robust structure: legal segregation of investor assets, independent depositary oversight, and governance that sophisticated capital can diligence with confidence. Framont's MFSA-authorised platform provides exactly that, wrapping illiquid and complex strategies in a vehicle recognised across all 27 EEA member states.",
      "Investors subscribe to fund units directly — no notarial deeds, no shareholder meetings — while assets are segregated by law from the manager's estate and from other sub-funds. Hurdle rates, carried interest and differentiated share classes are native to fund law and immediately enforceable, exactly as institutional LPs expect.",
      "From buyout and private credit to real estate, infrastructure and market-neutral strategies, Framont delivers the regulatory standing and operational infrastructure that turns a private-markets thesis into a fundable, scalable European vehicle.",
    ],
    highlights: [
      { label: "Framework", value: "AIFMD II" },
      { label: "Asset protection", value: "Legal segregation" },
      { label: "Mechanics", value: "Carry & hurdle" },
      { label: "Investors", value: "Professional / LP" },
    ],
    subPages: [
      {
        slug: "private-equity-credit",
        name: "Private Equity / Credit",
        summary:
          "Buyout, growth and private-credit strategies with institutional governance and EU-wide distribution.",
        points: [
          "Closed-ended or evergreen structures",
          "Capital calls and distribution waterfalls",
          "Carried interest and hurdle mechanics",
          "Independent depositary and audit",
        ],
      },
      {
        slug: "real-assets",
        name: "Real Assets",
        summary:
          "Real estate, infrastructure and tangible-asset mandates structured for long-horizon, income-generating exposure.",
        points: [
          "Direct and co-investment structures",
          "Asset-level reporting and valuation",
          "SFDR-aligned disclosures where relevant",
          "Cross-border investor access",
        ],
      },
      {
        slug: "absolute-return",
        name: "Absolute Return",
        summary:
          "Hedge-style, market-neutral and multi-strategy approaches targeting returns largely uncorrelated to traditional markets.",
        points: [
          "Long/short and market-neutral mandates",
          "Risk-budgeted, liquidity-aware design",
          "Daily or periodic NAV options",
          "Real-time risk oversight",
        ],
      },
    ],
    documents: [
      doc("alt-im", "Information Memorandum", "Information Memorandum", "available", true, "880 KB"),
      doc("alt-lp", "LP Agreement", "LP Agreement", "available", true, "540 KB"),
      doc("alt-term-sheet", "Term Sheet", "Term Sheet", "draft", true),
      doc("alt-factsheet", "Strategy Factsheet", "Factsheet", "coming-soon", false),
      doc("alt-risk", "Risk Report", "Risk Report", "coming-soon", true),
    ],
    primaryCta: "advisory",
  },
  {
    slug: "vc",
    code: "VC",
    name: "Venture Capital Funds",
    category: "Venture & Innovation",
    accent: "vc",
    icon: "🚀",
    tagline: "Turn your network and thesis into a regulated venture vehicle.",
    intro:
      "Framont enables operators, angels and platform builders to launch venture capital funds as dedicated sub-funds — turning a community and a thesis into a regulated, EU-passported vehicle with a €10,000 minimum investor ticket and institutional governance.",
    body: [
      "The most talented operators and sector experts often never formalise their edge because launching a regulated venture fund feels insurmountable. Framont removes the structural obstacles: licensing, compliance, depositary and administration are handled, leaving you to do what you do best — source deals, build relationships and back founders.",
      "A Framont venture sub-fund can be structured as a thematic vehicle — AI-driven platforms, digital infrastructure, European tech sovereignty — making the fund a native extension of your ecosystem. With a €10,000 minimum ticket, your community of founders, alumni and operators can participate directly as Limited Partners, so your community validates your deal flow and your fund validates your community.",
      "Passported across the entire EEA from day one, the structure reaches professional investors in 27 markets with no national filings. For exceptional projects, Framont may participate as a direct co-investor, aligning capital with conviction.",
    ],
    highlights: [
      { label: "Min. LP ticket", value: "€10,000" },
      { label: "Reach", value: "27 EEA states" },
      { label: "Model", value: "Partnership" },
      { label: "Co-invest", value: "Case by case" },
    ],
    subPages: [
      {
        slug: "early-stage",
        name: "Early Stage",
        summary:
          "Seed and pre-seed mandates backing founders at the earliest, highest-conviction stage with a regulated wrapper.",
        points: [
          "Seed / pre-seed deployment",
          "Community LP base from €10,000",
          "Diversified early portfolio",
          "Founder-aligned governance",
        ],
      },
      {
        slug: "growth-thematic",
        name: "Growth / Thematic",
        summary:
          "Growth-stage and thematic venture strategies targeting structural megatrends across European innovation.",
        points: [
          "Series A+ and thematic focus",
          "AI, digital infrastructure, deep tech",
          "Follow-on reserves and pro-rata",
          "EU-passported distribution",
        ],
      },
      {
        slug: "co-investment-spv",
        name: "Co-Investment SPV",
        summary:
          "Single-asset or deal-by-deal SPVs that let LPs co-invest alongside the fund in selected opportunities.",
        points: [
          "Deal-by-deal co-investment vehicles",
          "Single-asset SPV structuring",
          "Transparent fee and carry terms",
          "Fast assembly under the platform",
        ],
      },
    ],
    documents: [
      doc("vc-term-sheet", "Fund Term Sheet", "Term Sheet", "available", true, "365 KB"),
      doc("vc-im", "Information Memorandum", "Information Memorandum", "available", true, "910 KB"),
      doc("vc-lp", "LP Agreement", "LP Agreement", "draft", true),
      doc("vc-sub", "Subscription Form", "Subscription Form", "available", true, "205 KB"),
      doc("vc-factsheet", "Factsheet", "Factsheet", "coming-soon", false),
    ],
    primaryCta: "advisory",
    source: "https://www.framontmanagement.com/eu-investment-vehicles/",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function allProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export const DOC_TYPES: DocType[] = [
  "Term Sheet",
  "Information Memorandum",
  "Subscription Form",
  "KIID",
  "Factsheet",
  "Risk Report",
  "LP Agreement",
];
