/**
 * lucide-react dropped brand/logo glyphs (Facebook included) from its
 * core set — this is a minimal hand-drawn stand-in kept to the same
 * stroke-based style as the rest of the icon set instead of pulling in a
 * separate brand-icon library for one glyph. Filled (not stroked) so it
 * reads clearly at small sizes against the topbar's white background.
 */
export default function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.14C15.99 3.1 15.13 3 14.13 3c-2.13 0-3.59 1.3-3.59 3.68v2.06H7.77v3.2h2.77V21z" />
    </svg>
  );
}
