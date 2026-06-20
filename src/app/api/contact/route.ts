import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  product?: string;
  message?: string;
  intent?: "advisory" | "document-access";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, product, message, intent } = body;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 },
    );
  }
  if (intent !== "document-access" && (!name || !message)) {
    return NextResponse.json(
      { error: "Name and message are required" },
      { status: 400 },
    );
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    intent: intent ?? "advisory",
    name: name ?? "",
    email,
    company: company ?? "",
    product: product ?? "",
    message: message ?? "",
  };

  // Delivery: wire up to the Framont mailbox or CRM here.
  // Supported out of the box via environment variables:
  //   - CONTACT_WEBHOOK_URL  → POSTs the lead as JSON (Slack, Make, Zapier, n8n)
  //   - RESEND_API_KEY + CONTACT_TO → transactional email via Resend
  // Until configured, leads are logged on the server for inspection.
  try {
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    if (resendKey && to) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Framont Platform <noreply@framontmanagement.com>",
          to,
          reply_to: email,
          subject: `[${lead.intent}] ${lead.name || email}${
            lead.product ? ` · ${lead.product}` : ""
          }`,
          text: [
            `Intent: ${lead.intent}`,
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Company: ${lead.company}`,
            `Product: ${lead.product}`,
            "",
            lead.message,
          ].join("\n"),
        }),
      });
    }

    if (!webhook && !(resendKey && to)) {
      console.info("[contact] lead received (no delivery configured):", lead);
    }
  } catch (err) {
    console.error("[contact] delivery error:", err);
    // Do not fail the user-facing request if delivery has a transient issue.
  }

  return NextResponse.json({ ok: true });
}
