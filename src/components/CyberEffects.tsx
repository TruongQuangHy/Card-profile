"use client";

import React from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Check } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

/** Scroll progress hairline and the toast. Both run off motion values, no React re-render per frame. */
export default function CyberEffects() {
  const { toast } = usePortfolio();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <>
      <div className="page-wash" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left bg-accent"
        style={{ scaleX }}
      />

      <div className="fixed bottom-5 right-5 z-[100] pointer-events-none" role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.18 } }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="flex items-center gap-3 rounded-xl bg-surface-3 border border-line-strong px-4 py-3 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-ink">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-fg">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
