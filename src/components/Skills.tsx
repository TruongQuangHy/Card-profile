"use client";

import React from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Group {
  title: { vi: string; en: string };
  primary: string[];
  also: string[];
  proof: { vi: string; en: string };
}

const GROUPS: Group[] = [
  {
    title: { vi: "Front-end", en: "Front-end" },
    primary: ["Vue 3", "Nuxt 3", "React 19", "Next.js", "TypeScript"],
    also: ["Tailwind CSS v4", "Pinia", "Zustand", "TanStack Query", "TanStack Table", "Reka UI", "shadcn/ui", "Storybook", "Zod"],
    proof: { vi: "TBChat Web, TB Cloud Drive, TB Admin, XEPO, TALIO", en: "TBChat Web, TB Cloud Drive, TB Admin, XEPO, TALIO" },
  },
  {
    title: { vi: "Kiến trúc & công cụ", en: "Architecture & tooling" },
    primary: ["Feature-Sliced Design", "Nx Monorepo", "Vite"],
    also: ["Steiger", "Vitest", "Playwright", "LinguiJS", "Docker"],
    proof: { vi: "TB Cloud Drive: FSD 6 tầng kiểm soát bằng Steiger", en: "TB Cloud Drive: 6-layer FSD enforced with Steiger" },
  },
  {
    title: { vi: "Thời gian thực", en: "Real-time" },
    primary: ["WebSockets", "WebRTC", "RxJS"],
    also: ["SSE", "Nitro proxy", "Optimistic UI"],
    proof: { vi: "TBChat Web: heartbeat, tự kết nối lại, chống trùng tin nhắn", en: "TBChat Web: heartbeat, auto-reconnect, no duplicate messages" },
  },
  {
    title: { vi: "Back-end", en: "Back-end" },
    primary: ["NestJS", "Fastify", "Prisma", "PostgreSQL"],
    also: ["Redis", "BullMQ", "Supabase", "AWS S3", "MongoDB", "MySQL", "PHP"],
    proof: { vi: "NOAN: API NestJS 11, hàng đợi BullMQ, tải lên S3 presigned", en: "NOAN: NestJS 11 API, BullMQ queues, S3 presigned uploads" },
  },
  {
    title: { vi: "Di động", en: "Mobile" },
    primary: ["React Native", "Expo"],
    also: ["NativeWind", "Reanimated", "expo-speech-recognition", "Hermes", "Capacitor"],
    proof: { vi: "NOAN và HyFlim: phát hành bản APK", en: "NOAN and HyFlim: shipped as APKs" },
  },
  {
    title: { vi: "Media", en: "Media" },
    primary: ["HLS.js"],
    also: ["Adaptive bitrate", "Watch-history sync"],
    proof: { vi: "HyFlim: phát phim HLS trên web và di động", en: "HyFlim: HLS playback on web and mobile" },
  },
];

export function Skills() {
  const { lang } = usePortfolio();

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24">
      <SectionHeading
        id="skills-title"
        title={lang === "vi" ? "Kỹ năng" : "Skills"}
        lead={
          lang === "vi"
            ? "Nhóm theo việc tôi làm hằng ngày, kèm nơi đã dùng thật. Chữ đậm là công cụ chính."
            : "Grouped by what I do day to day, with where each was used. Bold is the main tool."
        }
      />

      <div className="border-t border-line">
        {GROUPS.map((g, i) => (
          <Reveal
            key={g.title.en}
            delay={Math.min(i, 3) * 0.04}
            className="group grid gap-4 border-b border-line py-7 md:grid-cols-[220px_1fr] md:gap-10"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent">
              {g.title[lang]}
            </h3>
            <div>
              <p className="text-[15px] leading-relaxed">
                {g.primary.map((s, idx) => (
                  <React.Fragment key={s}>
                    <span className="font-semibold text-fg">{s}</span>
                    {idx < g.primary.length - 1 && <span className="text-subtle">, </span>}
                  </React.Fragment>
                ))}
                {g.also.length > 0 && <span className="text-subtle">, </span>}
                <span className="text-fg-2">{g.also.join(", ")}</span>
              </p>
              <p className="mt-2.5 text-sm text-muted">{g.proof[lang]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
