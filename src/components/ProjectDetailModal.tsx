"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, Github, X } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { Dialog } from "@/components/ui/Dialog";

type Tab = "overview" | "engineering" | "stack";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="relative pl-5 text-[15px] leading-relaxed text-fg-2">
          <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-subtle" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetailModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang } = usePortfolio();
  const [tab, setTab] = useState<Tab>("overview");
  // Keep the last project mounted while the exit animation runs.
  const [shown, setShown] = useState<Project | null>(project);

  useEffect(() => {
    if (project) {
      setShown(project);
      setTab("overview");
    }
  }, [project]);

  const p = project ?? shown;
  const close = () => {
    soundFx.playClick();
    onClose();
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: lang === "vi" ? "Tổng quan" : "Overview" },
    { id: "engineering", label: lang === "vi" ? "Kỹ thuật" : "Engineering" },
    { id: "stack", label: lang === "vi" ? "Công nghệ" : "Stack" },
  ];

  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      labelledBy="project-dialog-title"
      className="flex max-h-[92dvh] max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-surface sm:rounded-3xl"
    >
      {p && (
        <>
          <header className="flex items-start gap-4 border-b border-line p-6 sm:p-7">
            {p.logo && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2">
                <Image src={p.logo} alt="" fill sizes="48px" className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[12px] text-muted">
                {p.categoryLabel[lang]} · <span className="tabular">{p.period.replace("Present", lang === "vi" ? "Nay" : "Present")}</span>
              </p>
              <h2 id="project-dialog-title" className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-fg">
                {p.title}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {p.role[lang]} · {p.clientOrOrg}
                {p.teamSize ? ` · ${p.teamSize} ${lang === "vi" ? "người" : "people"}` : ""}
              </p>
            </div>
            <button onClick={close} className="icon-btn -mr-2 -mt-1" aria-label={lang === "vi" ? "Đóng" : "Close"}>
              <X className="h-5 w-5" />
            </button>
          </header>

          <div role="tablist" aria-label={p.title} className="flex gap-1 border-b border-line px-4 sm:px-5">
            {tabs.map((t) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  id={`ptab-${t.id}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="ptab-panel"
                  onClick={() => setTab(t.id)}
                  className={`relative px-3 py-3.5 text-sm font-medium transition-colors ${selected ? "text-fg" : "text-muted hover:text-fg-2"}`}
                >
                  {t.label}
                  {selected && (
                    <motion.span
                      layoutId="project-tab-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="ptab-panel"
            role="tabpanel"
            aria-labelledby={`ptab-${tab}`}
            className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-7"
            data-lenis-prevent
          >
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {tab === "overview" && (
                <div className="space-y-7">
                  {p.image && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface-2">
                      <Image src={p.image} alt={p.title} fill sizes="720px" className="object-cover" />
                    </div>
                  )}
                  <p className="text-base leading-relaxed text-fg-2">{p.description[lang]}</p>
                  <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                    {p.stats.map((s) => (
                      <div key={s.label.en} className="bg-surface p-4">
                        <dt className="text-[13px] text-muted">{s.label[lang]}</dt>
                        <dd className="mt-1 font-display text-lg font-semibold text-fg">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {tab === "engineering" && (
                <div className="space-y-8">
                  <section>
                    <h3 className="mb-3 font-display text-lg font-semibold text-fg">{lang === "vi" ? "Bài toán" : "The problem"}</h3>
                    <Bullets items={p.challenges[lang]} />
                  </section>
                  <section>
                    <h3 className="mb-3 font-display text-lg font-semibold text-fg">{lang === "vi" ? "Cách giải quyết" : "What I built"}</h3>
                    <Bullets items={p.solutions[lang]} />
                  </section>
                  <section>
                    <h3 className="mb-3 font-display text-lg font-semibold text-fg">{lang === "vi" ? "Kiến trúc" : "Architecture"}</h3>
                    <Bullets items={p.architectureHighlights[lang]} />
                  </section>
                </div>
              )}

              {tab === "stack" && (
                <div className="flex flex-wrap gap-2">
                  {p.techStack.map((t) => (
                    <span key={t} className="chip !h-8 !text-[0.8rem]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {(p.githubUrl || p.liveUrl || p.apkDownload) && (
            <footer className="flex flex-wrap items-center gap-3 border-t border-line p-5 sm:px-7">
              {p.apkDownload && (
                <span className="text-sm text-muted">
                  {lang === "vi" ? "Có bản APK Android, liên hệ để nhận." : "Android APK available on request."}
                </span>
              )}
              <div className="ml-auto flex gap-2">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <ExternalLink className="h-4 w-4" /> {lang === "vi" ? "Xem trực tiếp" : "Live site"}
                  </a>
                )}
              </div>
            </footer>
          )}
        </>
      )}
    </Dialog>
  );
}
