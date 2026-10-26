"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  Wifi,
  BatteryCharging,
  Layers,
  ChevronRight,
  Volume2,
  VolumeX,
  FileText,
  TerminalSquare,
} from "lucide-react";
import { PortfolioProvider, usePortfolio, THEMES, ThemeKey } from "@/context/PortfolioContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import ThreeCanvas from "@/components/ThreeCanvas";
import CyberEffects from "@/components/CyberEffects";
import Footer from "@/components/Footer";
import { TerminalModal } from "@/components/TerminalModal";
import { CVModal } from "@/components/CVModal";
import { soundFx } from "@/lib/sound";

interface EmailTemplateItem {
  id: string;
  category: "ecommerce" | "saas" | "transactional" | "marketing";
  tag: { vi: string; en: string };
  icon: string;
  title: string;
  desc: { vi: string; en: string };
  file: string;
  specs: string[];
}

const EMAIL_TEMPLATES: EmailTemplateItem[] = [
  {
    id: "ecommerce-promo",
    category: "ecommerce",
    tag: { vi: "Thương Mại Điện Tử", en: "E-Commerce" },
    icon: "🛍️",
    title: "AURA - Summer Flash Sale EDM",
    desc: {
      vi: "Layout 2 cột responsive tự động co về 1 cột trên điện thoại, nút VML cho Outlook, mã giảm giá, trust badges.",
      en: "Multi-column responsive product grid, promotional voucher banner, MSO bulletproof buttons, and trust badges.",
    },
    file: "ecommerce-promo.html",
    specs: ["2-to-1 Stacking", "MSO VML Buttons", "Dark Mode Ready", "600px Max-Width"],
  },
  {
    id: "saas-welcome",
    category: "saas",
    tag: { vi: "SaaS Onboarding", en: "SaaS" },
    icon: "🚀",
    title: "PulseCloud - Workspace Onboarding Flow",
    desc: {
      vi: "Email chào mừng người dùng mới phong cách Linear/Stripe, 3 bước hướng dẫn trực quan, nút CTA nổi bật.",
      en: "Clean transactional SaaS onboarding with 3-step numbered setup cards and customer support trigger.",
    },
    file: "saas-welcome.html",
    specs: ["Transactional EDM", "Accessible Contrast", "Clean Typography", "GDPR Footer"],
  },
  {
    id: "tech-newsletter",
    category: "marketing",
    tag: { vi: "Bản Tin Công Nghệ", en: "Newsletter" },
    icon: "📰",
    title: "Frontend Pulse #48 - Weekly Digest",
    desc: {
      vi: "Bản tin công nghệ định kỳ với ảnh bìa bài viết chính, danh sách bài tuyển chọn, partner feature và widget bình chọn.",
      en: "Editorial newsletter with hero banner, curated article lists, partner feature box, and interactive feedback poll.",
    },
    file: "tech-newsletter.html",
    specs: ["Editorial Layout", "Issue Header", "Feedback Reactions", "Dark/Light Scheme"],
  },
  {
    id: "order-confirmation",
    category: "transactional",
    tag: { vi: "Hóa Đơn / Vận Đơn", en: "Receipt" },
    icon: "📦",
    title: "LUMINA - Order Confirmation #ORD-84920",
    desc: {
      vi: "Hóa đơn xác nhận đơn hàng đầy đủ giỏ đồ, tính thuế/phí ship, địa chỉ giao hàng và nút tra cứu đơn vận.",
      en: "Complete e-commerce receipt with itemized cart list, tax calculation, delivery timeline, and shipping address.",
    },
    file: "order-confirmation.html",
    specs: ["Order Itemization", "Price Breakdown", "Tracking Button", "Dual Address"],
  },
  {
    id: "password-reset",
    category: "transactional",
    tag: { vi: "Bảo Mật Tài Khoản", en: "Security" },
    icon: "🔒",
    title: "VaultShield - Password Reset & Magic Link",
    desc: {
      vi: "Email bảo mật cao với mã xác nhận 6 số lớn, cảnh báo hết hạn 15 phút, thông tin thiết bị/IP request.",
      en: "High-security transactional email with 6-digit confirmation pin, expiry alert, and request context.",
    },
    file: "password-reset.html",
    specs: ["Expiry Alert", "6-Digit Code", "IP/Device Context", "1-Click CTA"],
  },
  {
    id: "webinar-invitation",
    category: "marketing",
    tag: { vi: "Sự Kiện B2B", en: "Event / B2B" },
    icon: "🎙️",
    title: "DevCon Live - AI Agent Architectures Masterclass",
    desc: {
      vi: "Thư mời hội thảo trực tuyến B2B kèm thẻ thông tin diễn giả, lịch trình chi tiết và link đồng bộ lịch .ics.",
      en: "B2B webinar invite with date badge, 2 speaker profile cards, syllabus takeaways, and calendar links.",
    },
    file: "webinar-invitation.html",
    specs: ["Speaker Cards", "Calendar Links", "Live Badge", "Bulletproof Button"],
  },
  {
    id: "abandoned-cart",
    category: "ecommerce",
    tag: { vi: "Giỏ Hàng Bỏ Quên", en: "Retention" },
    icon: "🛒",
    title: "VELOCITY - Abandoned Bag Recovery",
    desc: {
      vi: "Chiến dịch kéo khách hàng quay lại với ảnh sản phẩm đang giữ trong giỏ, cảnh báo số lượng có hạn và voucher 15%.",
      en: "High-converting retention email with left-behind product thumbnail, urgency stock notice, and 15% voucher.",
    },
    file: "abandoned-cart.html",
    specs: ["Urgency Stock Badge", "Coupon Block", "1-Click Checkout", "Low Payload"],
  },
  {
    id: "black-friday-flash",
    category: "ecommerce",
    tag: { vi: "Flash Sale Đêm", en: "Flash Sale" },
    icon: "⚡",
    title: "NeonTech - Black Friday Midnight Doorbusters",
    desc: {
      vi: "Chiến dịch sales Black Friday tone nền đen thuần kết hợp viền vàng neon, đồng hồ đếm ngược và bảng deal 70% off.",
      en: "Ultra-dark high-contrast sales campaign with countdown timer badge, 70% off badges, and audio product grid.",
    },
    file: "black-friday-flash.html",
    specs: ["Pure Dark Mode", "Countdown Timer", "High Contrast Gold", "2-Col Deals"],
  },
  {
    id: "customer-feedback",
    category: "saas",
    tag: { vi: "Khảo Sát Khách Hàng", en: "Feedback / NPS" },
    icon: "⭐",
    title: "NovaDesk - 60-Second NPS Survey Flow",
    desc: {
      vi: "Khảo sát chỉ số hài lòng khách hàng (NPS) với thang điểm 0–10 tương tác nhanh, phần thưởng thẻ quà tặng và chữ ký CEO.",
      en: "Interactive 0-10 Net Promoter Score rating scale with gift card drawing reward and founder signature.",
    },
    file: "customer-feedback.html",
    specs: ["0-10 Rating Scale", "Mobile Touch Friendly", "Founder Signature", "Incentive Box"],
  },
  {
    id: "re-engagement-winback",
    category: "marketing",
    tag: { vi: "Khách Hàng Cũ", en: "Winback" },
    icon: "🎁",
    title: "Atlas Goods - We Miss You ($25 Credit)",
    desc: {
      vi: "Email kích hoạt khách hàng cũ không hoạt động với ưu đãi tặng 25$ credit, danh sách tính năng mới ra mắt.",
      en: "Customer winback EDM featuring a $25 complimentary credit banner and summary of platform improvements.",
    },
    file: "re-engagement-winback.html",
    specs: ["$25 Voucher Box", "What's New Cards", "Reactivation CTA", "CAN-SPAM Link"],
  },
];

function EDMNav() {
  const { lang, setLang, theme, setTheme, soundEnabled, toggleSound, setCVOpen, setTerminalOpen } = usePortfolio();
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-line bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        
        {/* Left: Logo & Back Link */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => soundFx.playClick()}
            className="group flex items-center gap-2.5 rounded-lg py-1 transition-opacity duration-200 hover:opacity-90"
            aria-label="Trương Quang Hy • Dany"
          >
            <div className="relative hidden sm:block h-8 w-auto">
              <Image
                src="/images/logo-mau-2.png"
                alt="Trương Quang Hy • Dany"
                width={220}
                height={32}
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
            <div className="relative flex sm:hidden h-8 w-8 items-center justify-center">
              <Image
                src="/images/logo-monogram.png"
                alt="Trương Quang Hy"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
            </div>
          </Link>

          <span className="hidden sm:inline h-4 w-px bg-line" aria-hidden="true" />

          <Link
            href="/#projects"
            onClick={() => soundFx.playClick()}
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="hidden md:inline">{t("Về danh sách dự án", "Back to Projects")}</span>
          </Link>
        </div>

        {/* Center: Current Studio Indicator */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-1 font-mono text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-fg font-medium">EDM & Email Studio</span>
          <span className="text-subtle">·</span>
          <span>10 {t("Chiến dịch thực tế", "Campaigns")}</span>
        </div>

        {/* Right: Controls matching Home Navbar */}
        <div className="flex items-center gap-1.5">
          {/* Accent Color Switcher Pill */}
          <div className="hidden sm:flex items-center gap-1 rounded-lg border border-line bg-surface px-2 py-1">
            {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
              const selected = theme === key;
              return (
                <button
                  key={key}
                  title={THEMES[key].name[lang]}
                  onClick={() => setTheme(key)}
                  className={`h-4 w-4 rounded-full transition-transform duration-200 hover:scale-125 ${
                    selected ? "ring-2 ring-offset-2 ring-offset-surface-2 ring-fg scale-110" : "opacity-60"
                  }`}
                  style={{ background: THEMES[key].accent }}
                />
              );
            })}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="icon-btn"
            title={soundEnabled ? t("Tắt âm thanh", "Mute sound") : t("Bật âm thanh", "Unmute sound")}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-accent" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setLang(lang === "vi" ? "en" : "vi");
            }}
            className="rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-semibold text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            {lang === "vi" ? "EN" : "VI"}
          </button>

          {/* Terminal CLI Modal Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setTerminalOpen(true);
            }}
            className="icon-btn hidden sm:inline-flex"
            title="Terminal CLI"
          >
            <TerminalSquare className="h-4 w-4" />
          </button>

          {/* CV Modal Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setCVOpen(true);
            }}
            className="btn btn-primary !h-8 !px-3 !text-xs hidden sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>CV</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

function EDMStudioMain() {
  const { lang } = usePortfolio();
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentId, setCurrentId] = useState<string>(EMAIL_TEMPLATES[0].id);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState<boolean>(false);

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const currentTemplate = EMAIL_TEMPLATES.find((tpl) => tpl.id === currentId) || EMAIL_TEMPLATES[0];

  const filteredList = EMAIL_TEMPLATES.filter(
    (tpl) => activeCategory === "all" || tpl.category === activeCategory
  );

  const handleCopyLink = () => {
    const rawUrl = `${window.location.origin}/emails/${currentTemplate.file}`;
    navigator.clipboard.writeText(rawUrl);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  const deviceButtons: { id: "desktop" | "tablet" | "mobile"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "desktop", label: "Desktop (680px)", icon: Monitor },
    { id: "tablet", label: "iPad Pro (768px)", icon: Tablet },
    { id: "mobile", label: "iPhone 16 Pro (390px)", icon: Smartphone },
  ];

  return (
    <main id="main" className="relative z-10 mx-auto max-w-6xl space-y-12 px-5 pt-28 pb-28 sm:space-y-16 sm:px-8">
      
      {/* SECTION 1: HEADER & STATS */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-mono text-xs font-semibold text-accent mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>HTML EMAIL & EDM ARCHITECTURE</span>
            </div>

            <h1 className="font-display text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.08] text-fg">
              {t("Kiến Trúc HTML Email & EDM Doanh Nghiệp", "Enterprise HTML Email & EDM Architecture")}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted max-w-[65ch]">
              {t(
                "Bộ sưu tập 10 chiến dịch email marketing và transactional chuẩn quốc tế. Tương thích hoàn hảo trên 40+ email client (Outlook Desktop MSO/VML, Gmail, Apple Mail, Yahoo Mail) với cơ chế co giãn fluid không vỡ layout.",
                "Production-ready email engineering suite tested across 40+ email rendering engines. Engineered with strict nested tables, Outlook MSO/VML bulletproof buttons, and responsive fluid stacking under 100KB."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-xs self-start md:self-end">
            <span className="chip text-accent border-accent/30 bg-accent/5">✓ Outlook 2016-2024 VML</span>
            <span className="chip">✓ 100% Fluid Mobile Stacking</span>
            <span className="chip">✓ Dark Mode Ready</span>
            <span className="chip">✓ &lt; 100KB Payload</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: TOP CAMPAIGN SELECTOR */}
      <section className="panel p-3 sm:p-3.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5">
          <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-semibold text-fg">
            <Layers className="h-3.5 w-3.5 text-accent" />
            <span>{t("Chọn Chiến Dịch Email (10 Mẫu Thực Tế)", "Select Campaign Template (10 Available)")}</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
            {[
              { id: "all", vi: "Tất cả (10)", en: "All (10)" },
              { id: "ecommerce", vi: "🛍️ E-Commerce (3)", en: "🛍️ E-Commerce (3)" },
              { id: "saas", vi: "🚀 SaaS (2)", en: "🚀 SaaS (2)" },
              { id: "transactional", vi: "📦 Hóa đơn/Bảo mật (2)", en: "📦 Transactional (2)" },
              { id: "marketing", vi: "📰 Marketing (3)", en: "📰 Marketing (3)" },
            ].map((c) => {
              const isCatActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFx.playHover();
                    setActiveCategory(c.id);
                  }}
                  className={`chip !text-[11px] !py-0.5 !px-2.5 relative transition-colors cursor-pointer ${
                    isCatActive
                      ? "!bg-accent !text-accent-ink font-semibold !border-accent"
                      : "hover:!border-line-strong hover:!text-fg"
                  }`}
                >
                  {t(c.vi, c.en)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Grid of Template Cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {filteredList.map((tpl) => {
            const isActive = tpl.id === currentId;
            return (
              <motion.button
                key={tpl.id}
                layout={!reduced}
                onClick={() => {
                  soundFx.playClick();
                  setCurrentId(tpl.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
                whileHover={reduced ? undefined : { y: -1.5 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`group relative flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "border-accent bg-accent/15 ring-1 ring-accent shadow-sm"
                    : "border-line bg-surface-2/50 hover:border-line-strong hover:bg-surface-2"
                }`}
              >
                <span className="text-lg shrink-0 select-none">{tpl.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`font-display text-xs font-semibold truncate transition-colors ${
                      isActive ? "text-accent" : "text-fg group-hover:text-accent"
                    }`}>
                      {tpl.title.split(" - ")[0]}
                    </h3>
                    {isActive && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-muted truncate mt-0.5">
                    {tpl.specs[0]}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: FULL-WIDTH SHOWCASE PREVIEW STAGE WITH SMOOTH MOTION */}
      <section className="panel overflow-hidden relative shadow-2xl">
        
        {/* Stage Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface-2 px-6 py-4">
          <div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-fg flex items-center gap-2">
              <span>{currentTemplate.icon}</span>
              <span>{currentTemplate.title}</span>
            </h2>
            <p className="text-xs text-muted mt-0.5">{currentTemplate.desc[lang]}</p>
          </div>

          {/* Action Buttons & Device Switcher with sliding pill */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* 3-DEVICE SWITCHER WITH SPRING PILL */}
            <div className="relative flex rounded-xl border border-line bg-surface p-1 shadow-inner">
              {deviceButtons.map((d) => {
                const isSelected = device === d.id;
                const IconComponent = d.icon;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      soundFx.playClick();
                      setDevice(d.id);
                    }}
                    className={`relative z-10 flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                      isSelected ? "text-fg font-semibold" : "text-muted hover:text-fg"
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    <span>{d.label}</span>
                    {isSelected && (
                      <motion.span
                        layoutId="active-device-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-surface-3 shadow-md border border-line-strong"
                        transition={{ type: "spring", stiffness: 480, damping: 36 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Copy Direct Link */}
            <button
              onClick={handleCopyLink}
              title={t("Sao chép liên kết trực tiếp", "Copy direct link")}
              className="icon-btn"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>

            {/* Open in Raw Tab */}
            <a
              href={`/emails/${currentTemplate.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !h-8 !px-3.5 !text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>{t("Mở toàn màn hình", "Raw View")}</span>
            </a>
          </div>
        </div>

        {/* Specs Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-3/50 px-6 py-2.5 text-xs">
          <div className="flex flex-wrap gap-1.5">
            {currentTemplate.specs.map((sp) => (
              <span
                key={sp}
                className="rounded bg-accent/10 border border-accent/20 px-2.5 py-0.5 font-mono text-[11px] text-accent font-medium"
              >
                {sp}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3.5 font-mono text-[11px] text-muted">
            <span className="flex items-center gap-1 text-accent font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Outlook Desktop MSO
            </span>
            <span className="flex items-center gap-1 text-accent font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Gmail App
            </span>
            <span className="flex items-center gap-1 text-accent font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Apple Mail
            </span>
          </div>
        </div>

        {/* PREVIEW CANVAS WITH SILKY SMOOTH ANIMATEPRESENCE TRANSITIONS */}
        <div className="flex min-h-[840px] items-start justify-center bg-[#07090e] p-6 sm:p-12 overflow-x-auto transition-colors duration-500">
          <AnimatePresence mode="wait">
            
            {/* 1. DESKTOP VIEWPORT (MACOS SAFARI BROWSER FRAME) */}
            {device === "desktop" && (
              <motion.div
                key={`screen-desktop-${device}`}
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[700px] rounded-xl border border-line-strong bg-white shadow-2xl overflow-hidden"
              >
                {/* Safari Browser Top Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="rounded-md bg-white border border-gray-300 px-4 py-1 text-[11px] font-mono text-gray-500 w-72 text-center truncate">
                    mail.google.com/mail/u/0/#inbox/{currentTemplate.id}
                  </div>
                  <div className="w-12 text-right text-[10px] text-gray-400 font-mono">100%</div>
                </div>

                <motion.div
                  key={currentTemplate.id}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="h-[760px] w-full bg-white"
                >
                  <iframe
                    src={`/emails/${currentTemplate.file}`}
                    title={currentTemplate.title}
                    className="h-full w-full border-none"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* 2. TABLET / IPAD PRO VIEWPORT (AUTHENTIC IPAD 11" UNIBODY CHASSIS) */}
            {device === "tablet" && (
              <motion.div
                key={`screen-tablet-${device}`}
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[780px] rounded-[38px] border-[14px] border-[#1e2330] bg-[#0c1017] p-0 shadow-[0_30px_70px_rgba(0,0,0,0.85)] ring-2 ring-slate-700/50"
              >
                {/* Front FaceTime Camera & Sensor on Top Bezel */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                  <span className="h-2 w-2 rounded-full bg-[#0a1128] ring-1 ring-blue-900/50" />
                  <span className="h-1 w-1 rounded-full bg-[#1e293b]" />
                </div>

                {/* Display Screen */}
                <div className="relative w-full h-[840px] rounded-[24px] overflow-hidden bg-white flex flex-col">
                  {/* iPadOS Top Status Bar */}
                  <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/90 px-6 py-2 text-[11px] font-sans text-gray-600">
                    <div className="font-semibold">Tuesday, Oct 26 &nbsp; 9:41 AM</div>
                    <div className="flex items-center gap-3">
                      <Wifi className="h-3.5 w-3.5 text-gray-700" />
                      <div className="flex items-center gap-1 font-semibold text-[10px]">
                        <span>100%</span>
                        <BatteryCharging className="h-4 w-4 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <motion.div
                    key={currentTemplate.id}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex-1 w-full bg-white overflow-hidden"
                  >
                    <iframe
                      src={`/emails/${currentTemplate.file}`}
                      title={currentTemplate.title}
                      className="h-full w-full border-none"
                    />
                  </motion.div>

                  {/* iPadOS Bottom Home Indicator Bar */}
                  <div className="py-2 bg-gray-50/80 flex justify-center">
                    <div className="h-1 w-44 rounded-full bg-gray-400" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. MOBILE VIEWPORT (ULTRA-REALISTIC IPHONE 16 PRO MOCKUP - NO HORIZONTAL SCROLL) */}
            {device === "mobile" && (
              <motion.div
                key={`screen-mobile-${device}`}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                
                {/* Hardware Side Buttons */}
                {/* Left Side: Action Button, Volume Up, Volume Down */}
                <div className="absolute -left-[5px] top-28 h-7 w-[4px] rounded-l-sm bg-[#475569]" />
                <div className="absolute -left-[5px] top-40 h-12 w-[4px] rounded-l-sm bg-[#475569]" />
                <div className="absolute -left-[5px] top-56 h-12 w-[4px] rounded-l-sm bg-[#475569]" />

                {/* Right Side: Power Button & Camera Control */}
                <div className="absolute -right-[5px] top-36 h-16 w-[4px] rounded-r-sm bg-[#475569]" />
                <div className="absolute -right-[5px] top-72 h-14 w-[4px] rounded-r-sm bg-[#475569]" />

                {/* Titanium Phone Body (Outer Chassis) */}
                <div className="w-[414px] rounded-[54px] border-[4px] border-[#384252] bg-[#0c1017] p-[10px] shadow-[0_0_0_1.5px_#1e293b,0_0_0_4px_#0f172a,0_30px_70px_rgba(0,0,0,0.95)] ring-1 ring-white/10">
                  
                  {/* Inside Screen Display (390px x 820px - iPhone 16 Pro Viewport) */}
                  <div className="relative h-[820px] w-[390px] rounded-[44px] overflow-hidden bg-black flex flex-col shadow-inner">
                    
                    {/* iOS 18 Top Status Bar */}
                    <div className="relative z-30 flex h-11 w-full items-center justify-between px-7 bg-black text-white select-none">
                      {/* Left: Clock */}
                      <span className="font-semibold text-xs tracking-tight">9:41</span>

                      {/* Center: DYNAMIC ISLAND */}
                      <div className="h-7 w-28 rounded-full bg-black border border-white/10 flex items-center justify-between px-2.5 shadow-sm">
                        {/* Camera Lens Reflection */}
                        <div className="h-2.5 w-2.5 rounded-full bg-[#0a1128] ring-1 ring-blue-900/60 relative">
                          <span className="absolute top-0.5 right-0.5 h-1 w-1 rounded-full bg-blue-400/80" />
                        </div>
                        {/* TrueDepth Sensor */}
                        <div className="h-1.5 w-1.5 rounded-full bg-[#111827]" />
                      </div>

                      {/* Right: Cellular, Wi-Fi & Battery */}
                      <div className="flex items-center gap-1.5 text-xs">
                        {/* 4 Cellular Bars */}
                        <div className="flex items-end gap-0.5 h-2.5">
                          <span className="w-0.5 h-1 bg-white rounded-xs" />
                          <span className="w-0.5 h-1.5 bg-white rounded-xs" />
                          <span className="w-0.5 h-2 bg-white rounded-xs" />
                          <span className="w-0.5 h-2.5 bg-white rounded-xs" />
                        </div>

                        {/* Wi-Fi Icon */}
                        <Wifi className="h-3 w-3 text-white ml-0.5" />

                        {/* Battery Icon with 100% green charge */}
                        <div className="flex items-center ml-1">
                          <div className="h-3 w-5 rounded-[3px] border border-white/60 p-0.5 flex items-center">
                            <div className="h-full w-full bg-emerald-500 rounded-[1.5px]" />
                          </div>
                          <div className="h-1.5 w-0.5 bg-white/60 rounded-r-xs" />
                        </div>
                      </div>
                    </div>

                    {/* IFRAME CONTAINER (STRICT OVERFLOW-X HIDDEN, NO HORIZONTAL SCROLL) */}
                    <motion.div
                      key={currentTemplate.id}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="relative flex-1 w-full overflow-hidden bg-white"
                    >
                      <iframe
                        src={`/emails/${currentTemplate.file}`}
                        title={currentTemplate.title}
                        className="h-full w-full border-none"
                        style={{ overflowX: "hidden" }}
                      />
                    </motion.div>

                    {/* iOS 18 Bottom Home Indicator Pill */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                      <div className="h-1 w-36 rounded-full bg-black/60 dark:bg-white/70 backdrop-blur-md shadow-sm" />
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4: ENTERPRISE ENGINEERING STANDARDS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-fg">
            {t("Quy Chuẩn Kỹ Thuật HTML Email Chuẩn Enterprise", "Enterprise HTML Email Engineering Standards")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="panel p-6">
            <h3 className="font-display text-base font-semibold text-fg mb-2">
              {t("Cấu trúc Table lồng nhau nghiêm ngặt", "Strict Table Nesting")}
            </h3>
            <p className="text-sm text-fg-2 leading-relaxed">
              {t(
                "Toàn bộ layout được xây dựng bằng thẻ table presentation với reset cellpadding, cellspacing và border triệt để, loại bỏ khe hở 1px ngẫu nhiên trên Microsoft Word rendering engine của Outlook.",
                "Zero margin collapse and whitespace bugs across all desktop Outlook versions using strict presentation tables and conditional comments."
              )}
            </p>
          </div>

          <div className="panel p-6">
            <h3 className="font-display text-base font-semibold text-fg mb-2">
              {t("Nút bấm Bulletproof VML", "Bulletproof VML Buttons")}
            </h3>
            <p className="text-sm text-fg-2 leading-relaxed">
              {t(
                "Sử dụng Vector Markup Language (VML) cho máy khách Outlook Desktop để giữ trọn vẹn màu nền, bán kính bo góc (arcsize) và kích thước bấm mà không bị biến dạng thành text link.",
                "Retains 100% border radius, background gradients, and clickable hitboxes on desktop Outlook without degrading to plain links."
              )}
            </p>
          </div>

          <div className="panel p-6">
            <h3 className="font-display text-base font-semibold text-fg mb-2">
              {t("Tối ưu dung lượng < 100KB", "Payload < 100KB Optimization")}
            </h3>
            <p className="text-sm text-fg-2 leading-relaxed">
              {t(
                "Mọi file template được tối ưu payload dưới 100KB để ngăn chặn Gmail cắt cụt (clipping) với thông báo '[Message clipped] View entire message', đảm bảo 100% tỉ lệ đọc và click CTA.",
                "Under 100KB HTML payload prevents Gmail from clipping the email, safeguarding conversion rates and tracking pixels."
              )}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function EDMStudioPage() {
  return (
    <PortfolioProvider>
      <SmoothScroll>
        {/* Background Atmosphere Matching Home */}
        <ThreeCanvas />
        <CyberEffects />

        {/* Global Navigation Matching Home Navbar */}
        <EDMNav />

        {/* Main Content */}
        <EDMStudioMain />

        {/* Footer Matching Home Footer */}
        <Footer />

        {/* Modals from Home */}
        <TerminalModal />
        <CVModal />
      </SmoothScroll>
    </PortfolioProvider>
  );
}
