/**
 * Shared Motion variants and easing curves — the "grammar" every section's
 * entrance/scroll animation draws from, so the site reads as one
 * choreographed system rather than per-section effects.
 */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1];

export const revealUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
