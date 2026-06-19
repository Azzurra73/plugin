import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-sm border border-line bg-navy/60 px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(base, "min-h-[120px] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(base, "appearance-none bg-navy/60", className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block font-mono text-[0.65rem] uppercase tracking-wide2 text-cream/55",
        className,
      )}
      {...props}
    />
  );
}
