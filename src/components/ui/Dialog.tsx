"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { lockScroll, unlockScroll } from "@/lib/scroll";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Element to focus on open; defaults to the first focusable element. */
  initialFocus?: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function DialogBody({ onClose, labelledBy, children, className, id, initialFocus }: Omit<DialogProps, "open">) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();

    const focusTimer = window.setTimeout(() => {
      const target = initialFocus?.current ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? panelRef.current;
      target?.focus({ preventScroll: true });
    }, 30);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || e.defaultPrevented || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKey);
      unlockScroll();
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [initialFocus]);

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-[#05060a]/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        data-lenis-prevent
        className={`relative z-10 w-full outline-none ${className ?? ""}`}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.985 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
        transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Dialog({ open, ...rest }: DialogProps) {
  return <AnimatePresence>{open && <DialogBody key="dialog" {...rest} />}</AnimatePresence>;
}
