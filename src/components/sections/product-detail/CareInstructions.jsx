import { Droplets } from "lucide-react";

/**
 * Garment-care panel — always visible, same divided-row language as
 * SpecAccordion.jsx (which it sits directly beneath) so specs and care
 * read as one continuous, fully-visible details block rather than two
 * differently-styled pieces.
 */
export default function CareInstructions({ care }) {
  if (!care || care.length === 0) return null;

  return (
    <div className="border-t border-border py-4">
      <div className="flex items-baseline gap-4">
        <Droplets className="h-4 w-4 shrink-0 translate-y-0.5 text-primary" strokeWidth={1.75} />
        <p className="w-28 shrink-0 font-sans text-sm font-semibold text-foreground">Care</p>
        <ul className="flex flex-col gap-1.5">
          {care.map((instruction) => (
            <li key={instruction} className="font-sans text-sm leading-relaxed text-muted-foreground">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
