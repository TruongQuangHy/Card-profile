"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis, scrollToTarget } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // In-page anchors go through the same scroller whether or not Lenis runs.
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(hash === "#home" ? 0 : el);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", handleAnchorClick);

    if (reduced) {
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      autoRaf: true,
    });
    registerLenis(lenis);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
