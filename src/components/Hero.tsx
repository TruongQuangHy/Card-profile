"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Check, Copy, Download, FileText, Github, Facebook, Instagram, MapPin, RotateCcw, QrCode } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { copyText } from "@/lib/clipboard";
import { buildVCard } from "@/lib/vcard";

const EASE = [0.22, 1, 0.36, 1] as const;

function useHcmClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function CopyRow({ value, display, label, icon }: { value: string; display: string; label: string; icon: React.ReactNode }) {
  const { showToast, lang } = usePortfolio();
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        const ok = await copyText(value);
        if (!ok) return;
        soundFx.playSuccess();
        setCopied(true);
        showToast(lang === "vi" ? `Đã sao chép ${label.toLowerCase()}` : `${label} copied`);
        window.setTimeout(() => setCopied(false), 2000);
      }}
      className="group inline-flex items-center gap-2 rounded-lg py-1 text-sm text-fg-2 transition-colors hover:text-fg"
      aria-label={`${lang === "vi" ? "Sao chép" : "Copy"} ${label}: ${display}`}
    >
      <span className="text-subtle group-hover:text-accent transition-colors">{icon}</span>
      <span className="font-mono text-[13px]">{display}</span>
      <span className="relative h-3.5 w-3.5 text-subtle">
        <Copy
          className={`absolute inset-0 h-3.5 w-3.5 transition-all duration-200 ${copied ? "scale-50 opacity-0" : "opacity-0 group-hover:opacity-100"}`}
        />
        <Check className={`absolute inset-0 h-3.5 w-3.5 text-accent transition-all duration-200 ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
      </span>
    </button>
  );
}

function IdCard() {
  const { personal, metrics } = PORTFOLIO_DATA;
  const { lang } = usePortfolio();
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>("");

  useEffect(() => {
    QRCode.toString(buildVCard(), {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#0b0d12", light: "#00000000" },
    })
      .then(setQrSvg)
      .catch(() => setQrSvg(""));
  }, []);

  // Pointer position in -0.5..0.5, springs do the smoothing; no React state per frame.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 170, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 170, damping: 18, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10), transparent 55%)`;
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
    glareOpacity.set(0);
  };

  const flip = () => {
    soundFx.playClick();
    setFlipped((v) => !v);
  };

  const downloadVcf = () => {
    const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "truong-quang-hy.vcf";
    a.click();
    URL.revokeObjectURL(url);
    soundFx.playSuccess();
  };

  const years = metrics[0];
  const projects = metrics[1];

  return (
    <div className="w-full max-w-[360px]" style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="grid"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
        >
          {/* Front */}
          <div
            className="card-face relative [grid-area:1/1] overflow-hidden rounded-[28px] border border-line-strong bg-surface-2 p-6 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.75)]"
            aria-hidden={flipped}
          >
            <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare, opacity: glareOpacity }} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(var(--accent-rgb),0.14),transparent)]" />

            <div className="relative flex items-start justify-between">
              <div className="relative h-[84px] w-[84px] overflow-hidden rounded-2xl border border-line-strong">
                <Image src={personal.avatar} alt={personal.name} fill sizes="84px" className="object-cover object-top" priority />
              </div>
              <button onClick={flip} className="icon-btn h-9 w-9 bg-surface-3/70" aria-label={lang === "vi" ? "Lật thẻ xem mã QR" : "Flip card to QR code"} tabIndex={flipped ? -1 : 0}>
                <QrCode className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-6">
              <p className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] text-fg">{personal.name}</p>
              <p className="mt-1 text-sm text-fg-2">{lang === "vi" ? "Kỹ sư phần mềm" : "Software Engineer"} · Front-End &amp; Full-Stack</p>
            </div>

            <dl className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-surface-2 px-4 py-3">
                <dt className="text-xs text-muted">{lang === "vi" ? "Kinh nghiệm" : "Experience"}</dt>
                <dd className="mt-0.5 font-display text-xl font-semibold text-fg tabular">
                  {years.value} <span className="text-sm font-normal text-fg-2">{lang === "vi" ? "năm" : "years"}</span>
                </dd>
              </div>
              <div className="bg-surface-2 px-4 py-3">
                <dt className="text-xs text-muted">{lang === "vi" ? "Dự án sản xuất" : "Shipped projects"}</dt>
                <dd className="mt-0.5 font-display text-xl font-semibold text-fg tabular">{projects.value}</dd>
              </div>
              <div className="col-span-2 bg-surface-2 px-4 py-3">
                <dt className="text-xs text-muted">{lang === "vi" ? "Đang làm tại" : "Currently at"}</dt>
                <dd className="mt-0.5 text-sm font-medium text-fg">Nexsoft Technology</dd>
              </div>
            </dl>

            <div className="relative mt-5 flex items-center justify-between">
              <div className="flex gap-1">
                {[
                  { href: personal.github, label: "GitHub", Icon: Github },
                  { href: personal.facebook, label: "Facebook", Icon: Facebook },
                  { href: personal.instagram, label: "Instagram", Icon: Instagram },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn h-9 w-9"
                    aria-label={label}
                    tabIndex={flipped ? -1 : 0}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <span className="font-mono text-[11px] text-subtle">HUTECH · 2023</span>
            </div>
          </div>

          {/* Back */}
          <div
            className="card-face relative [grid-area:1/1] flex flex-col rounded-[28px] border border-line-strong bg-surface-2 p-6 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.75)]"
            style={{ transform: "rotateY(180deg)" }}
            aria-hidden={!flipped}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-fg">{lang === "vi" ? "Lưu danh bạ" : "Save contact"}</p>
              <button onClick={flip} className="icon-btn h-9 w-9 bg-surface-3/70" aria-label={lang === "vi" ? "Lật về mặt trước" : "Flip to front"} tabIndex={flipped ? 0 : -1}>
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="my-auto flex flex-col items-center py-4">
              <div className="rounded-2xl bg-[#f4f6fa] p-4">
                {qrSvg ? (
                  <div
                    className="h-40 w-40 [&>svg]:h-full [&>svg]:w-full"
                    role="img"
                    aria-label={lang === "vi" ? "Mã QR danh bạ của Trương Quang Hy" : "QR code with Truong Quang Hy's contact"}
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                ) : (
                  <div className="h-40 w-40 animate-pulse rounded-lg bg-[#dde2ea]" />
                )}
              </div>
              <p className="mt-4 text-center text-sm text-fg-2">
                {lang === "vi" ? "Quét bằng camera điện thoại để thêm vào danh bạ." : "Scan with your phone camera to add the contact."}
              </p>
            </div>

            <button onClick={downloadVcf} className="btn btn-ghost w-full" tabIndex={flipped ? 0 : -1}>
              <Download className="h-4 w-4" />
              {lang === "vi" ? "Tải tệp .vcf" : "Download .vcf"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { personal } = PORTFOLIO_DATA;
  const { lang, setCVOpen } = usePortfolio();
  const reduced = useReducedMotion();
  const time = useHcmClock();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pt-[92px] pb-16">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.h1
            id="hero-title"
            {...rise(0.05)}
            className="font-display text-[clamp(2.75rem,7.2vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-fg"
          >
            {lang === "vi" ? (
              <>
                Giao diện nhanh,
                <br />
                hệ thống <span className="text-accent">bền</span>.
              </>
            ) : (
              <>
                Fast interfaces,
                <br />
                <span className="text-accent">durable</span> systems.
              </>
            )}
          </motion.h1>

          <motion.p {...rise(0.15)} className="mt-7 max-w-[56ch] text-lg leading-relaxed text-fg-2">
            {lang === "vi" ? (
              <>
                Tôi là <strong className="font-semibold text-fg">Trương Quang Hy</strong>, kỹ sư Front-End &amp; Full-Stack ở TP.HCM.
                Hơn 3 năm làm nhắn tin thời gian thực, lưu trữ đám mây, cổng quản trị Web3 và ứng dụng React Native.
              </>
            ) : (
              <>
                I&apos;m <strong className="font-semibold text-fg">Truong Quang Hy</strong>, a Front-End &amp; Full-Stack engineer in Ho Chi Minh City.
                3+ years on real-time messaging, cloud storage, Web3 admin portals and React Native apps.
              </>
            )}
          </motion.p>

          <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group h-12 px-5" onClick={() => soundFx.playClick()}>
              {lang === "vi" ? "Xem dự án" : "See the work"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#cv"
              onClick={() => soundFx.playClick()}
              className="btn btn-ghost h-12 px-5"
            >
              <FileText className="h-4 w-4" />
              {lang === "vi" ? "Xem CV" : "View CV"}
            </a>
          </motion.div>

          <motion.div {...rise(0.35)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6">
            <span className="inline-flex items-center gap-2 text-sm text-fg-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ee2a8] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ee2a8]" />
              </span>
              {lang === "vi" ? "Đang nhận cơ hội mới" : "Open to new roles"}
            </span>
            <CopyRow value={personal.email} display={personal.email} label="Email" icon={<span className="text-xs">@</span>} />
            <span className="inline-flex items-center gap-2 text-sm text-fg-2">
              <MapPin className="h-3.5 w-3.5 text-subtle" />
              {lang === "vi" ? "Thủ Đức, TP.HCM" : "Thu Duc, HCMC"}
              {time && <span className="font-mono text-[13px] text-subtle tabular">{time}</span>}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={reduced ? undefined : { opacity: 0, y: 30, rotateX: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          style={{ transformPerspective: 1200 }}
        >
          <IdCard />
        </motion.div>
      </div>
    </section>
  );
}
