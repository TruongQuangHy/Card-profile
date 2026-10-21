"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Printer, Maximize2, FileText, Mail, Phone, MapPin, Github, Check, Copy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { Reveal } from "@/components/ui/Reveal";

function H({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="print-dark mb-3 border-b border-neutral-300 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 print-border">
      {children}
    </h3>
  );
}

export default function CVSection() {
  const { lang, setCVOpen } = usePortfolio();
  const { personal, education, experiences, projects } = PORTFOLIO_DATA;
  const vi = lang === "vi";
  const now = vi ? "Hiện tại" : "Present";
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    soundFx.playSuccess();
    window.print();
  };

  const handleCopyLink = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(window.location.origin + "#cv");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cv" aria-labelledby="cv-heading" className="scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{vi ? "Hồ sơ nghề nghiệp" : "Curriculum Vitae"}</span>
          </div>
          <h2
            id="cv-heading"
            className="mt-3 font-display text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-fg"
          >
            {vi ? "Hồ sơ CV" : "Resume & CV"}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base sm:text-lg leading-relaxed text-fg-2">
            {vi
              ? "Bản tóm tắt năng lực kỹ thuật, kinh nghiệm thực chiến và học vấn theo định dạng A4 chuẩn tuyển dụng quốc tế."
              : "Comprehensive technical summary, production experience, and education formatted for standard A4 recruitment."}
          </p>
        </Reveal>

        {/* Action Controls */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="btn btn-primary !h-10 !px-4 text-xs sm:text-sm shadow-sm"
              aria-label={vi ? "In hoặc Lưu file PDF" : "Print or Save PDF"}
            >
              <Printer className="h-4 w-4" />
              <span>{vi ? "In / Lưu PDF" : "Print / Save PDF"}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setCVOpen(true);
              }}
              className="btn btn-ghost !h-10 !px-4 text-xs sm:text-sm"
              aria-label={vi ? "Mở toàn màn hình" : "Open Fullscreen"}
            >
              <Maximize2 className="h-4 w-4" />
              <span>{vi ? "Mở toàn màn hình" : "Fullscreen"}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="icon-btn !h-10 !w-10"
              title={vi ? "Sao chép liên kết mục CV" : "Copy link to CV"}
              aria-label={vi ? "Sao chép liên kết mục CV" : "Copy link to CV"}
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </Reveal>
      </div>

      {/* CV Sheet Container */}
      <Reveal delay={0.2} className="mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-2 p-3 sm:p-8 lg:p-10 shadow-xl">
          {/* Top Paper Header Bar */}
          <div className="no-print mb-4 flex items-center justify-between border-b border-line pb-3 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>{vi ? "Bản chuẩn A4 · Sẵn sàng in ấn" : "A4 Standard · Ready to print"}</span>
            </div>
            <span className="font-mono text-[11px]">A4 · 210 × 297 mm</span>
          </div>

          {/* Embedded Printable CV Sheet */}
          <article
            id="cv-print"
            className="mx-auto max-w-[760px] rounded-xl bg-white p-6 sm:p-10 lg:p-12 text-[13px] leading-relaxed text-neutral-800 shadow-lg ring-1 ring-black/5"
          >
            {/* CV Header */}
            <header className="flex flex-col gap-4 border-b border-neutral-300 pb-6 sm:flex-row sm:items-end sm:justify-between print-border">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src="/images/logo-monogram.png"
                    alt="Logo Monogram"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="print-dark font-display text-[26px] font-semibold tracking-tight text-neutral-950">
                    {personal.name}
                  </h3>
                  <p className="mt-0.5 text-[14px] font-medium text-neutral-600 print-muted">{personal.title[lang]}</p>
                </div>
              </div>
              <ul className="space-y-0.5 text-[12px] text-neutral-600 sm:text-right print-muted">
                <li>{personal.email}</li>
                <li>{personal.phone}</li>
                <li>{personal.github.replace("https://", "")}</li>
                <li>{vi ? "TP. Thủ Đức, TP.HCM" : "Thu Duc, Ho Chi Minh City"}</li>
              </ul>
            </header>

            {/* Giới thiệu / Summary */}
            <section className="mt-6">
              <H>{vi ? "Giới thiệu" : "Summary"}</H>
              <p className="text-justify text-neutral-700">{personal.bio[lang]}</p>
            </section>

            {/* Kinh nghiệm / Experience */}
            <section className="mt-6">
              <H>{vi ? "Kinh nghiệm làm việc" : "Experience"}</H>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="print-dark font-semibold text-neutral-950">
                        {exp.role[lang]} · {exp.company}
                      </p>
                      <p className="tabular text-[12px] text-neutral-500 print-muted">{exp.period[lang]}</p>
                    </div>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 marker:text-neutral-400">
                      {exp.achievements[lang].slice(0, 4).map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                    <p className="mt-1.5 text-[12px] font-medium text-neutral-500 print-muted">
                      {exp.skills.slice(0, 10).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dự án tiêu biểu / Projects */}
            <section className="mt-6">
              <H>{vi ? "Dự án tiêu biểu" : "Selected projects"}</H>
              <div className="space-y-3.5">
                {projects.map((p) => (
                  <div key={p.id} className="break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <p className="print-dark font-semibold text-neutral-950">{p.title}</p>
                      <p className="tabular text-[12px] text-neutral-500 print-muted">
                        {p.period.replace("Present", now)}
                      </p>
                    </div>
                    <p className="mt-0.5 text-neutral-600">{p.tagline[lang]}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Học vấn / Education */}
            <section className="mt-6 break-inside-avoid">
              <H>{vi ? "Học vấn" : "Education"}</H>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="print-dark font-semibold text-neutral-950">{education.school[lang]}</p>
                <p className="tabular text-[12px] text-neutral-500 print-muted">{education.period}</p>
              </div>
              <p className="mt-0.5 text-neutral-600">
                {education.field[lang]} · {education.specialized[lang]}
              </p>
            </section>
          </article>

          {/* Bottom Quick Action Banner */}
          <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p className="text-xs text-muted">
              {vi
                ? "💡 Bạn có thể bấm 'In / Lưu PDF' để xuất trực tiếp file PDF chuẩn chỉnh, không bị vỡ bố cục."
                : "💡 Click 'Print / Save PDF' to instantly export a clean, unclipped A4 PDF."}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="btn btn-primary !h-9 !px-3.5 text-xs"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>{vi ? "In / Lưu PDF" : "Print / Save PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
