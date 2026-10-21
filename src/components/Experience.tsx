"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PORTFOLIO_DATA, Experience as Exp } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Role({ exp, isCurrent }: { exp: Exp; isCurrent: boolean }) {
  const { lang } = usePortfolio();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const all = exp.achievements[lang];
  const first = all.slice(0, 2);
  const rest = all.slice(2);
  const panelId = `${exp.id}-more`;

  return (
    <Reveal as="li" className="relative pl-10 sm:pl-14">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[9px] flex h-[15px] w-[15px] -translate-x-[7px] items-center justify-center rounded-full border ${
          isCurrent ? "border-accent bg-ink" : "border-line-strong bg-ink"
        }`}
      >
        {isCurrent && <span className="h-[7px] w-[7px] rounded-full bg-accent" />}
      </span>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-fg">{exp.role[lang]}</h3>
        <p className="shrink-0 font-mono text-[13px] text-muted tabular">{exp.period[lang]}</p>
      </div>
      <p className="mt-1 text-[15px] text-fg-2">
        <span className="font-medium text-accent">{exp.company}</span>
        <span className="text-subtle"> · {exp.type[lang]}</span>
      </p>

      <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-fg-2">{exp.description[lang]}</p>

      <ul className="mt-4 max-w-[68ch] space-y-2.5">
        {first.map((a) => (
          <li key={a} className="relative pl-5 text-[15px] leading-relaxed text-fg-2">
            <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-subtle" aria-hidden="true" />
            {a}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open && rest.length > 0 && (
          <motion.ul
            id={panelId}
            key="more"
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[68ch] overflow-hidden"
          >
            {rest.map((a) => (
              <li key={a} className="relative mt-2.5 pl-5 text-[15px] leading-relaxed text-fg-2">
                <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-subtle" aria-hidden="true" />
                {a}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        {rest.length > 0 && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            {open
              ? lang === "vi"
                ? "Thu gọn"
                : "Show less"
              : lang === "vi"
                ? `Thêm ${rest.length} thành tích`
                : `${rest.length} more`}
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {exp.skills.slice(0, 8).map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
        {exp.skills.length > 8 && <span className="chip text-subtle">+{exp.skills.length - 8}</span>}
      </div>
    </Reveal>
  );
}

export function Experience() {
  const { experiences } = PORTFOLIO_DATA;
  const { lang } = usePortfolio();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24">
      <SectionHeading
        id="experience-title"
        title={lang === "vi" ? "Kinh nghiệm" : "Experience"}
        lead={
          lang === "vi"
            ? "Từ back-end WordPress năm 2023 đến front-end cho ba sản phẩm doanh nghiệp hiện tại."
            : "From WordPress back-end work in 2023 to front-end for three enterprise products today."
        }
      />

      <ol ref={listRef} className="relative ml-[7px] space-y-14 sm:space-y-16">
        <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-line" />
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-2 bottom-2 w-px origin-top bg-accent"
          style={{ scaleY: progress }}
        />
        {experiences.map((exp, i) => (
          <Role key={exp.id} exp={exp} isCurrent={i === 0} />
        ))}
      </ol>
    </section>
  );
}
