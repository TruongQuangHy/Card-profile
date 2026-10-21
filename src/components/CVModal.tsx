"use client";

import React from "react";
import { Printer, X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { Dialog } from "@/components/ui/Dialog";

function H({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="print-dark mb-3 border-b border-neutral-300 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 print-border">
      {children}
    </h3>
  );
}

export function CVModal() {
  const { lang, isCVOpen, setCVOpen } = usePortfolio();
  const { personal, education, experiences, projects } = PORTFOLIO_DATA;
  const vi = lang === "vi";
  const close = () => setCVOpen(false);
  const now = vi ? "Nay" : "Present";

  return (
    <Dialog
      open={isCVOpen}
      onClose={close}
      labelledBy="cv-title"
      className="flex max-h-[94dvh] max-w-[860px] flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface sm:rounded-2xl"
    >
      <div className="no-print flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="text-sm text-muted">{vi ? "CV · khổ A4" : "CV · A4"}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playSuccess();
              window.print();
            }}
            className="btn btn-primary !h-9"
          >
            <Printer className="h-4 w-4" /> {vi ? "In / Lưu PDF" : "Print / Save PDF"}
          </button>
          <button onClick={close} className="icon-btn" aria-label={vi ? "Đóng CV" : "Close CV"}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto overscroll-contain bg-neutral-200/10 p-3 sm:p-6" data-lenis-prevent>
        <article id="cv-print" className="mx-auto max-w-[760px] rounded-lg bg-white px-7 py-9 text-[13px] leading-relaxed text-neutral-800 sm:px-12 sm:py-12">
          <header className="flex flex-col gap-4 border-b border-neutral-300 pb-6 sm:flex-row sm:items-end sm:justify-between print-border">
            <div>
              <h2 id="cv-title" className="print-dark font-display text-[28px] font-semibold tracking-tight text-neutral-950">
                {personal.name}
              </h2>
              <p className="mt-1 text-[14px] text-neutral-600 print-muted">{personal.title[lang]}</p>
            </div>
            <ul className="space-y-0.5 text-[12px] text-neutral-600 sm:text-right print-muted">
              <li>{personal.email}</li>
              <li>{personal.phone}</li>
              <li>{personal.github.replace("https://", "")}</li>
              <li>{vi ? "TP. Thủ Đức, TP.HCM" : "Thu Duc, Ho Chi Minh City"}</li>
            </ul>
          </header>

          <section className="mt-6">
            <H>{vi ? "Giới thiệu" : "Summary"}</H>
            <p>{personal.bio[lang]}</p>
          </section>

          <section className="mt-6">
            <H>{vi ? "Kinh nghiệm" : "Experience"}</H>
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
                  <p className="mt-1.5 text-[12px] text-neutral-500 print-muted">{exp.skills.slice(0, 10).join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <H>{vi ? "Dự án tiêu biểu" : "Selected projects"}</H>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="print-dark font-semibold text-neutral-950">{p.title}</p>
                    <p className="tabular text-[12px] text-neutral-500 print-muted">{p.period.replace("Present", now)}</p>
                  </div>
                  <p>{p.tagline[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 break-inside-avoid">
            <H>{vi ? "Học vấn" : "Education"}</H>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="print-dark font-semibold text-neutral-950">{education.school[lang]}</p>
              <p className="tabular text-[12px] text-neutral-500 print-muted">{education.period}</p>
            </div>
            <p>
              {education.field[lang]} · {education.specialized[lang]}
            </p>
          </section>
        </article>
      </div>
    </Dialog>
  );
}
