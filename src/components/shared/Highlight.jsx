/**
 * Marks the emphasized word(s) within a heading in the brand's primary
 * gold. Site-wide typographic rule: every major heading highlights its
 * one key word — the term the sentence is actually about, not a random
 * word — so emphasis stays intentional rather than decorative.
 *
 * Usage: <h2>Built on <Highlight>decades</Highlight> at the sewing machine.</h2>
 */
export default function Highlight({ children }) {
  return <span className="text-primary">{children}</span>;
}
