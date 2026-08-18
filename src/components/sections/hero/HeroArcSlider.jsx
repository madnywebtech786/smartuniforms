"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "motion/react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { STOCK_IMAGES } from "@/lib/images";
import { EASE_CINEMATIC as EASE } from "@/lib/motion";

const COUNT = PRODUCTS.length;

// Coordinate space the circle math operates in, matched per `size` to the
// stage div's actual pixel dimensions below.
//
// On desktop ("large"), the circle's center sits on the stage's right
// edge and the radius is tied to the stage height — the apex (resting
// position) lands left-of-center, appropriate next to the text column,
// and there's no width constraint since the arc bleeds toward the edge.
//
// On mobile ("small") there's no text beside it, so the circle is
// centered on the stage instead. Here the radius must be bounded by half
// the stage *width* (not height) — otherwise the apex, which sits
// `radius` to the left of center, would land past the stage's left edge.
const ARC_SPACE = {
  large: { width: 400, height: 520, centerX: "edge" },
  small: { width: 300, height: 380, centerX: "middle" },
};

function getArcGeometry(size) {
  const { width, height, centerX } = ARC_SPACE[size];

  if (centerX === "middle") {
    // Radius smaller than half the width, so the apex (center.x - radius)
    // lands with real margin from the stage's left edge instead of
    // touching it exactly.
    const radius = width * 0.32;
    return { width, height, radius, center: { x: width / 2, y: height / 2 } };
  }

  const radius = height / 2;
  return { width, height, radius, center: { x: width, y: height / 2 } };
}

// Angle for a given "slot" — 0 is the resting position at the arc's apex
// (the leftmost point, angle = PI), each whole step is 1/COUNT of a full
// turn further clockwise around the back of the circle. Slot 0 = apex,
// slot 1 = one step clockwise (down and around, out of view), slot -1 =
// one step counter-clockwise (up and around, also out of view) — so the
// image arriving to take over always approaches from the same side it
// last exited toward, reading as one continuous clockwise sweep rather
// than a ping-pong.
function angleForSlot(slot) {
  return Math.PI + (slot * (2 * Math.PI)) / COUNT;
}

function pointForAngle(angle, geometry) {
  return {
    x: geometry.center.x + geometry.radius * Math.cos(angle),
    y: geometry.center.y + geometry.radius * Math.sin(angle),
  };
}

/**
 * The hero's signature interaction: 5 product images arranged around a
 * circle, one at a time resting at the arc's apex. On rotation every
 * image advances one slot clockwise along the same circle — the active
 * image sweeps away from the apex while the next one sweeps in to take
 * its place — so the motion reads as one continuous turning carousel,
 * not a two-point jump or a cross-fade.
 *
 * Built on Motion's `animate()` driving a single per-image MotionValue
 * (`slot`), with x/y/scale/opacity all derived from it via useTransform.
 * Only transform/opacity are ever animated — no layout properties.
 *
 * `size` scales the whole stage down for the mobile strip layout without
 * needing a second animation implementation.
 */
export default function HeroArcSlider({ activeIndex, size = "large" }) {
  const prefersReducedMotion = useReducedMotion();
  const geometry = getArcGeometry(size);
  const stageHeight = size === "large" ? "h-[600px] w-[460px]" : "h-[380px] w-[300px]";
  const imageSize = size === "large" ? 400 : 270;

  return (
    <div className={`relative mx-auto ${stageHeight}`}>
      {/* Decorative register-mark numeral, echoing the large index numerals
          already used in Services.jsx — reinforces the "spec sheet" motif
          and gives the stage's negative space a reason to exist rather
          than sitting empty. */}
      {size === "large" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none font-display text-[13rem] leading-none text-foreground/4"
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
      )}

      {PRODUCTS.map((product, index) => (
        <ArcImage
          key={product.slug}
          product={product}
          index={index}
          activeIndex={activeIndex}
          imageSize={imageSize}
          geometry={geometry}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

// Shortest signed slot distance from `index` to `activeIndex` around the
// circular sequence — e.g. with 5 products, going from slide 4 to slide 0
// is +1 slot (clockwise), not -4, so the sweep always takes the short way
// round and always in the forward (clockwise) direction of travel.
function slotFor(index, activeIndex) {
  const raw = index - activeIndex;
  const half = COUNT / 2;
  if (raw > half) return raw - COUNT;
  if (raw < -half) return raw + COUNT;
  return raw;
}

function ArcImage({ product, index, activeIndex, imageSize, geometry, prefersReducedMotion }) {
  const targetSlot = slotFor(index, activeIndex);
  const slot = useMotionValue(targetSlot);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      slot.jump(targetSlot);
      return;
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
      slot.jump(targetSlot);
      return;
    }
    const controls = animate(slot, targetSlot, { duration: 1.1, ease: EASE });
    return () => controls.stop();
  }, [targetSlot, slot, prefersReducedMotion]);

  const x = useTransform(
    slot,
    (s) => `${(pointForAngle(angleForSlot(s), geometry).x / geometry.width) * 100}%`
  );
  const y = useTransform(
    slot,
    (s) => `${(pointForAngle(angleForSlot(s), geometry).y / geometry.height) * 100}%`
  );
  const scale = useTransform(slot, [-1, 0, 1], [0.5, 1, 0.5]);
  const opacity = useTransform(slot, [-1, -0.35, 0, 0.35, 1], [0, 0.5, 1, 0.5, 0]);
  const rotate = useTransform(slot, [-1, 0, 1], [14, 0, -14]);

  const image = STOCK_IMAGES[product.imageKey];

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border shadow-[0_20px_60px_-20px_rgba(20,19,15,0.25)]"
      style={{
        width: imageSize,
        height: imageSize * 1.25,
        left: x,
        top: y,
        scale,
        opacity,
        rotate,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={`${imageSize}px`}
        className="object-cover"
        priority={index === 0}
      />
    </motion.div>
  );
}
