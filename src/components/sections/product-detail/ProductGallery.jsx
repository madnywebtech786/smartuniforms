"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

/**
 * Main image + selectable thumbnail row for the product detail page.
 * Crossfades the main image on thumbnail selection rather than hard-cutting
 * — both the outgoing and incoming image stay mounted only long enough to
 * blend, via AnimatePresence's default (not "wait") mode.
 */
export default function ProductGallery({ gallery }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeKey, setActiveKey] = useState(gallery[0]);
  const activeImage = STOCK_IMAGES[activeKey];

  return (
    <div className="lg:sticky lg:top-28 lg:h-fit">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeKey}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={activeKey === gallery[0]}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {gallery.map((key) => {
            const image = STOCK_IMAGES[key];
            const isActive = key === activeKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveKey(key)}
                aria-label={`Show image: ${image.alt}`}
                aria-pressed={isActive}
                className={`group relative aspect-4/5 w-full overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                  isActive ? "border-primary" : "border-transparent hover:border-foreground/30"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
                <span
                  className={`absolute inset-0 bg-background transition-opacity duration-200 ${
                    isActive ? "opacity-0" : "opacity-30 group-hover:opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
