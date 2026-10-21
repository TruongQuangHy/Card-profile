import type Lenis from "lenis";

let lenis: Lenis | null = null;
let lockCount = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll to a section id ("#projects"), an element, or a pixel offset, through Lenis when it is running. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (typeof window === "undefined") return;
  const navOffset = -84;

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(target, {
      offset: typeof target === "number" ? 0 : navOffset,
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + navOffset;
  window.scrollTo({ top });
}

/** Reference-counted scroll lock so stacked dialogs (terminal opening the CV) unlock correctly. */
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}
