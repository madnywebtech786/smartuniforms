/**
 * Product spec list — always-visible rows, same numbered-index visual
 * grammar as WhyChooseUs.jsx (font-display "01/02/03" markers, divided
 * rows) rather than a click-to-expand accordion: every spec should be
 * readable at a glance on a page whose whole job is showing a garment's
 * details, not hiding them behind an interaction.
 *
 * Renders whatever `product.specs` ({ label, value } pairs) the item
 * carries rather than assuming fixed fields — different categories have
 * genuinely different attributes (a cap has no sleeve length, a polo has
 * no size for the strap).
 */
export default function SpecAccordion({ product }) {
  const sections = product.specs ?? [];

  if (sections.length === 0) return null;

  return (
    <dl className="divide-y divide-border border-t border-border">
      {sections.map((section, index) => (
        <div key={section.label} className="flex items-baseline gap-4 py-4">
          <span className="font-display text-sm leading-none text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <dt className="w-28 shrink-0 font-sans text-sm font-semibold text-foreground">
            {section.label}
          </dt>
          <dd className="font-sans text-sm leading-relaxed text-muted-foreground">
            {section.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
