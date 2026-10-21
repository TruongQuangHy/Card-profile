"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { soundFx } from "@/lib/sound";

export type Lang = "vi" | "en";
export type ThemeKey = "cyan" | "purple" | "emerald" | "gold";

export interface ThemeConfig {
  name: { vi: string; en: string };
  accent: string;
  rgb: string;
  ink: string;
  hex: number;
}

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  cyan: { name: { vi: "Băng", en: "Glacier" }, accent: "#6fd3ef", rgb: "111, 211, 239", ink: "#06222b", hex: 0x6fd3ef },
  purple: { name: { vi: "Tử đinh hương", en: "Lilac" }, accent: "#b9a4ff", rgb: "185, 164, 255", ink: "#1b1236", hex: 0xb9a4ff },
  emerald: { name: { vi: "Lá non", en: "Sage" }, accent: "#86dbb0", rgb: "134, 219, 176", ink: "#0a2a1b", hex: 0x86dbb0 },
  gold: { name: { vi: "Hổ phách", en: "Amber" }, accent: "#f2c272", rgb: "242, 194, 114", ink: "#2e1f05", hex: 0xf2c272 },
};

export const SHAPES = [
  { id: 0, name: { vi: "Khối hai mươi mặt", en: "Icosahedron" } },
  { id: 1, name: { vi: "Nút xoắn", en: "Torus knot" } },
  { id: 2, name: { vi: "Khối tám mặt", en: "Octahedron" } },
];

interface ToastState {
  id: number;
  message: string;
}

interface PortfolioContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: ThemeKey;
  themeConfig: ThemeConfig;
  setTheme: (t: ThemeKey) => void;
  shapeIndex: number;
  cycleShape: () => void;
  toast: ToastState | null;
  showToast: (message: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isCVOpen: boolean;
  setCVOpen: (open: boolean) => void;
  isTerminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function applyTheme(t: ThemeKey) {
  const c = THEMES[t];
  const root = document.documentElement.style;
  root.setProperty("--accent", c.accent);
  root.setProperty("--accent-rgb", c.rgb);
  root.setProperty("--accent-ink", c.ink);
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");
  const [theme, setThemeState] = useState<ThemeKey>("cyan");
  const [shapeIndex, setShapeIndex] = useState(0);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isCVOpen, setCVOpen] = useState(false);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore persisted preferences after hydration.
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang");
    if (savedLang === "vi" || savedLang === "en") setLangState(savedLang);
    const savedTheme = localStorage.getItem("portfolio_theme") as ThemeKey | null;
    if (savedTheme && savedTheme in THEMES) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    }
    setSoundEnabled(!soundFx.getIsMuted());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("portfolio_lang", l);
  }, []);

  const setTheme = useCallback((t: ThemeKey) => {
    setThemeState(t);
    applyTheme(t);
    localStorage.setItem("portfolio_theme", t);
    soundFx.playClick();
  }, []);

  const cycleShape = useCallback(() => {
    setShapeIndex((prev) => (prev + 1) % SHAPES.length);
    soundFx.playClick();
  }, []);

  const toggleSound = useCallback(() => {
    const muted = soundFx.toggleMute();
    setSoundEnabled(!muted);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      theme,
      themeConfig: THEMES[theme],
      setTheme,
      shapeIndex,
      cycleShape,
      toast,
      showToast,
      soundEnabled,
      toggleSound,
      isCVOpen,
      setCVOpen,
      isTerminalOpen,
      setTerminalOpen,
    }),
    [lang, setLang, theme, setTheme, shapeIndex, cycleShape, toast, showToast, soundEnabled, toggleSound, isCVOpen, isTerminalOpen]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within a PortfolioProvider");
  return context;
}
