"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

type Filter = Project["category"];

const FILTERS: { id: Filter; vi: string; en: string }[] = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "enterprise", vi: "Doanh nghiệp", en: "Enterprise" },
  { id: "realtime_ai", vi: "Thời gian thực", en: "Real-time" },
  { id: "mobile", vi: "Di động", en: "Mobile" },
  { id: "streaming", vi: "Streaming", en: "Streaming" },
  { id: "email_edm", vi: "HTML Email & EDM", en: "HTML Email & EDM" },
];

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { lang } = usePortfolio();
  const reduced = useReducedMotion();
  const wide = project.featured && index < 2;

  return (
    <motion.li
      layout={!reduced}
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={wide ? "md:col-span-2" : ""}
    >
      <button
        onClick={() => {
          soundFx.playClick();
          onOpen();
        }}
        onMouseEnter={() => soundFx.playHover()}
        aria-haspopup="dialog"
        className="group panel relative flex h-full w-full flex-col overflow-hidden text-left transition-colors duration-300 hover:border-line-strong"
      >
        {project.image && (
          <div className={`relative overflow-hidden border-b border-line bg-surface-2 ${wide ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
            <Image
              src={project.image}
              alt=""
              fill
              sizes={wide ? "(min-width: 768px) 1100px, 100vw" : "(min-width: 768px) 540px, 100vw"}
              className={`${
                project.imageFit === "contain" ? "object-contain p-6" : "object-cover"
              } transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]`}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 font-mono text-[12px] text-muted">
            <span>{project.categoryLabel[lang]}</span>
            <span className="tabular">{project.period.replace("Present", lang === "vi" ? "Nay" : "Present")}</span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
              {project.title}
            </span>
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-fg-2 line-clamp-3">{project.tagline[lang]}</p>

          <p className="mt-4 text-sm text-muted">
            {project.role[lang]} · {project.clientOrOrg}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, wide ? 6 : 4).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg-2 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

export function Projects() {
  const { lang } = usePortfolio();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Project | null>(null);

  const list = useMemo(
    () => PORTFOLIO_DATA.projects.filter((p) => filter === "all" || p.category === filter),
    [filter]
  );
  const counts = useMemo(() => {
    const m: Record<string, number> = { all: PORTFOLIO_DATA.projects.length };
    PORTFOLIO_DATA.projects.forEach((p) => (m[p.category] = (m[p.category] ?? 0) + 1));
    return m;
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24">
      <SectionHeading
        id="projects-title"
        title={lang === "vi" ? "Dự án" : "Projects"}
        lead={
          lang === "vi"
            ? "Sản phẩm đang chạy thật: nhắn tin mã hóa, lưu trữ đám mây, cổng quản trị và hai ứng dụng cá nhân."
            : "Products running in production: encrypted chat, cloud storage, admin portals and two personal apps."
        }
      />

      <LayoutGroup>
        <div role="tablist" aria-label={lang === "vi" ? "Lọc dự án" : "Filter projects"} className="mb-8 flex flex-wrap gap-1.5">
          {FILTERS.filter((f) => counts[f.id]).map((f) => {
            const selected = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setFilter(f.id);
                  soundFx.playClick();
                }}
                className={`relative h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                  selected ? "text-accent-ink" : "text-fg-2 hover:text-fg"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">
                  {f[lang]} <span className="tabular opacity-60">{counts[f.id]}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={filter === "all" ? i : 99} onOpen={() => setActive(p)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <ProjectDetailModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
