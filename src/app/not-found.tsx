import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-hero-navy">
      <div className="container-wide text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-wide2 text-gold">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl text-cream md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-cream/55">
          The page you are looking for does not exist or has moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
