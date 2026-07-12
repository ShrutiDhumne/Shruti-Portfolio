"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * A button that leans toward the cursor and springs back when it leaves.
 *
 * Kept deliberately restrained: the pull is capped at 8px and scaled by distance,
 * so it reads as weight rather than as the button running away from you. The
 * classic mistake is a 30px pull, which makes a control feel unreliable — you
 * aim at it and it moves.
 *
 * Pointer-only. On touch there is no cursor to be attracted to, and hijacking a
 * tap target's position is a good way to make it un-tappable.
 */
export function Magnetic({
  children,
  strength = 8,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const render = () => {
      // Lerp toward the target — the spring back is what sells it.
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(render);
      } else {
        raf = 0;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      // Normalise by half the element, then cap — a wide button shouldn't pull harder.
      tx = Math.max(-1, Math.min(1, dx / (r.width / 2))) * strength;
      ty = Math.max(-1, Math.min(1, dy / (r.height / 2))) * strength;
      kick();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, reduced]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`.trim()}>
      {children}
    </span>
  );
}
