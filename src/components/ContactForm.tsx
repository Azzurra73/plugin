"use client";

import * as React from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label } from "@/components/ui/input";
import { products } from "@/lib/products";

type State = "idle" | "submitting" | "ok" | "error";

export function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const [state, setState] = React.useState<State>("idle");
  const [error, setError] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, intent: "advisory" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed");
      }
      setState("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-md border border-success/40 bg-success/[0.06] p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-4 font-display text-xl text-cream">Request received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/60">
          Thank you. Our team will be in touch within 72 hours to schedule your
          consultation. For urgent matters, call {`+356 20105592`}.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => setState("idle")}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company / Organisation</Label>
          <Input id="company" name="company" placeholder="Optional" />
        </div>
        <div>
          <Label htmlFor="product">Product of interest</Label>
          <Select id="product" name="product" defaultValue={defaultProduct ?? ""}>
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.code} — {p.name}
              </option>
            ))}
            <option value="fund-launch">Launch my own fund</option>
            <option value="other">Other / Not sure</option>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">How can we help? *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your objectives, mandate or the structure you have in mind."
        />
      </div>

      {state === "error" && (
        <p className="flex items-center gap-2 text-sm text-module-alt">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.7rem] leading-relaxed text-cream/40">
          By submitting you agree to be contacted by {`Framont & Partners`}. No
          spam, no commitment.
        </p>
        <Button type="submit" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Send request"}
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
