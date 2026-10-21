"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Menu, X, SlidersHorizontal, Volume2, VolumeX, Shapes, TerminalSquare } from "lucide-react";
import { usePortfolio, THEMES, SHAPES, ThemeKey } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { scrollToTarget } from "@/lib/scroll";

const SECTIONS = ["about", "skills", "experience", "projects", "contact"] as const;

const LABELS: Record<(typeof SECTIONS)[number], { vi: string; en: string }> = {
  about: { vi: "Giới thiệu", en: "About" },
  skills: { vi: "Kỹ năng", en: "Skills" },
  experience: { vi: "Kinh nghiệm", en: "Experience" },
  projects: { vi: "Dự án", en: "Projects" },
  contact: { vi: "Liên hệ", en: "Contact" },
};

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return active;
}

function StudioPanel() {
  const { lang, theme, setTheme, shapeIndex, cycleShape, soundEnabled, toggleSound } = usePortfolio();
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium text-muted mb-2.5">{t("Màu nhấn", "Accent")}</p>
        <div className="flex gap-2" role="radiogroup" aria-label={t("Màu nhấn", "Accent color")}>
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
            const selected = theme === key;
            return (
              <button
                key={key}
                role="radio"
                aria-checked={selected}
                aria-label={THEMES[key].name[lang]}
                title={THEMES[key].name[lang]}
                onClick={() => setTheme(key)}
                className={`relative h-8 w-8 rounded-full transition-transform duration-200 hover:scale-110 ${
                  selected ? "ring-2 ring-offset-2 ring-offset-surface-2 ring-fg" : ""
                }`}
                style={{ background: THEMES[key].accent }}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={cycleShape}
        className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-3 text-left transition-colors hover:border-line-strong"
      >
        <span className="flex items-center gap-2.5 text-sm text-fg">
          <Shapes className="h-4 w-4 text-accent" />
          {t("Hình khối 3D", "3D shape")}
        </span>
        <span className="text-xs text-muted">{SHAPES[shapeIndex].name[lang]}</span>
      </button>

      <button
        onClick={toggleSound}
        role="switch"
        aria-checked={soundEnabled}
        className="flex w-full items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-3 text-left transition-colors hover:border-line-strong"
      >
        <span className="flex items-center gap-2.5 text-sm text-fg">
          {soundEnabled ? <Volume2 className="h-4 w-4 text-accent" /> : <VolumeX className="h-4 w-4 text-muted" />}
          {t("Âm thanh tương tác", "Interface sounds")}
        </span>
        <span
          className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${soundEnabled ? "bg-accent" : "bg-surface-3"}`}
          aria-hidden="true"
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-fg transition-transform duration-200 ${
              soundEnabled ? "translate-x-[18px]" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

export function Navbar() {
  const { lang, setLang, setCVOpen, setTerminalOpen } = usePortfolio();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!studioOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!studioRef.current?.contains(e.target as Node)) setStudioOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStudioOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [studioOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={`transition-[background-color,border-color] duration-300 border-b ${
          scrolled || menuOpen ? "bg-ink/85 backdrop-blur-md border-line" : "bg-transparent border-transparent"
        }`}
      >
        <nav
          aria-label={t("Điều hướng chính", "Main navigation")}
          className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-lg py-1 transition-opacity duration-200 hover:opacity-90"
            onClick={() => soundFx.playClick()}
            aria-label="Trương Quang Hy • Dany"
          >
            {/* Desktop & Tablet: Full Mẫu 2 logo */}
            <div className="relative hidden sm:block h-8 w-auto">
              <Image
                src="/images/logo-mau-2.png"
                alt="Trương Quang Hy • Dany"
                width={240}
                height={32}
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
            {/* Mobile: Compact luxury Monogram mark */}
            <div className="relative flex sm:hidden h-8 w-8 items-center justify-center">
              <Image
                src="/images/logo-monogram.png"
                alt="Trương Quang Hy"
                width={32}
                height={32}
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((id) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    onClick={() => soundFx.playClick()}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {LABELS[id][lang]}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-surface-3"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                setLang(lang === "vi" ? "en" : "vi");
              }}
              className="icon-btn w-auto px-2.5 text-xs font-semibold tracking-wide"
              aria-label={t("Chuyển sang tiếng Anh", "Switch to Vietnamese")}
            >
              <span className={lang === "vi" ? "text-fg" : "text-subtle"}>VI</span>
              <span className="mx-1 text-subtle">/</span>
              <span className={lang === "en" ? "text-fg" : "text-subtle"}>EN</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setTerminalOpen(true);
              }}
              className="icon-btn hidden sm:inline-flex"
              aria-label={t("Mở terminal (Ctrl K)", "Open terminal (Ctrl K)")}
              title="Terminal · Ctrl K"
            >
              <TerminalSquare className="h-[18px] w-[18px]" />
            </button>

            <div ref={studioRef} className="relative hidden sm:block">
              <button
                onClick={() => setStudioOpen((v) => !v)}
                className={`icon-btn ${studioOpen ? "bg-surface-3 text-fg" : ""}`}
                aria-expanded={studioOpen}
                aria-haspopup="dialog"
                aria-label={t("Tùy chỉnh giao diện", "Customize")}
                title={t("Tùy chỉnh", "Customize")}
              >
                <SlidersHorizontal className="h-[18px] w-[18px]" />
              </button>
              <AnimatePresence>
                {studioOpen && (
                  <motion.div
                    role="dialog"
                    aria-label={t("Tùy chỉnh giao diện", "Customize")}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.14 } }}
                    transition={{ type: "spring", stiffness: 480, damping: 34 }}
                    className="absolute right-0 top-[calc(100%+10px)] w-72 origin-top-right rounded-2xl border border-line-strong bg-surface-2 p-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
                  >
                    <StudioPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setCVOpen(true);
              }}
              className="btn btn-primary ml-1 h-9 px-3.5 text-[13px]"
            >
              <FileText className="h-4 w-4" />
              <span>CV</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="icon-btn max-lg:inline-flex lg:!hidden hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("Đóng menu", "Close menu") : t("Mở menu", "Open menu")}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 36 }}
            className="lg:hidden border-b border-line bg-ink/95 backdrop-blur-md"
          >
            <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-6 pt-2">
              <ul className="divide-y divide-line">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        soundFx.playClick();
                        const el = document.getElementById(id);
                        if (el) scrollToTarget(el);
                      }}
                      className={`flex w-full items-center justify-between py-3.5 text-left font-display text-xl tracking-tight ${
                        active === id ? "text-accent" : "text-fg"
                      }`}
                    >
                      {LABELS[id][lang]}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-2xl border border-line bg-surface-2 p-4 sm:hidden">
                <StudioPanel />
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setTerminalOpen(true);
                }}
                className="btn btn-ghost mt-3 w-full sm:hidden"
              >
                <TerminalSquare className="h-4 w-4" />
                Terminal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
