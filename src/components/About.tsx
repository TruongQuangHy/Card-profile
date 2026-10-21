"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Reveal } from "@/components/ui/Reveal";

const FOCUS = [
  {
    title: { vi: "Kiến trúc front-end", en: "Front-end architecture" },
    body: {
      vi: "Vue 3 / Nuxt 3 và React 19 / Next.js. Tổ chức mã theo Feature-Sliced Design, Nx monorepo, design system trên Storybook.",
      en: "Vue 3 / Nuxt 3 and React 19 / Next.js. Feature-Sliced Design, Nx monorepos, design systems in Storybook.",
    },
  },
  {
    title: { vi: "Thời gian thực", en: "Real-time" },
    body: {
      vi: "WebSocket có heartbeat và tự kết nối lại, giao diện lạc quan không trùng tin nhắn, hỗ trợ RTL cho TBChat.",
      en: "WebSockets with heartbeat and auto-reconnect, optimistic UI without duplicate messages, RTL support for TBChat.",
    },
  },
  {
    title: { vi: "Full-stack & di động", en: "Full-stack & mobile" },
    body: {
      vi: "NestJS trên Fastify, Prisma, PostgreSQL, BullMQ. React Native (Expo) với nhận dạng giọng nói tiếng Việt trên thiết bị.",
      en: "NestJS on Fastify, Prisma, PostgreSQL, BullMQ. React Native (Expo) with on-device Vietnamese speech recognition.",
    },
  },
];

export default function About() {
  const { education } = PORTFOLIO_DATA;
  const { lang } = usePortfolio();

  const facts = [
    { k: lang === "vi" ? "Học vấn" : "Education", v: `${education.specialized[lang]}, HUTECH` },
    { k: lang === "vi" ? "Tốt nghiệp" : "Graduated", v: "09/2023" },
    { k: lang === "vi" ? "Nơi ở" : "Based in", v: lang === "vi" ? "TP. Thủ Đức, TP.HCM" : "Thu Duc, Ho Chi Minh City" },
    { k: lang === "vi" ? "Múi giờ" : "Time zone", v: "GMT+7" },
    { k: lang === "vi" ? "Ngôn ngữ" : "Languages", v: lang === "vi" ? "Tiếng Việt, tiếng Anh" : "Vietnamese, English" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal>
          <h2 id="about-title" className="font-display text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-fg">
            {lang === "vi" ? "Về tôi" : "About"}
          </h2>
          <p className="mt-8 font-display text-[1.45rem] sm:text-[1.75rem] leading-[1.35] tracking-[-0.015em] text-fg">
            {lang === "vi"
              ? "Tôi thích những phần khó ở giữa giao diện và hệ thống: tin nhắn đến đúng thứ tự khi mạng chập chờn, tệp lớn tải lên không treo trình duyệt, bàn phím iOS không làm nhảy bố cục."
              : "I like the hard parts between interface and system: messages that arrive in order on a flaky network, large uploads that don't freeze the browser, an iOS keyboard that doesn't shove the layout."}
          </p>
          <p className="mt-6 max-w-[62ch] text-base sm:text-lg leading-relaxed text-fg-2">
            {lang === "vi"
              ? "Hiện tôi là kỹ sư Front-End tại Nexsoft Technology, phụ trách TBChat Web, TB Cloud Drive và TB Admin. Ngoài giờ tôi tự xây và phát hành HyFlim, nền tảng xem phim HLS, cùng NOAN, trợ lý nấu ăn bằng giọng nói."
              : "I'm currently a Front-End engineer at Nexsoft Technology, working on TBChat Web, TB Cloud Drive and TB Admin. On my own time I built and shipped HyFlim, an HLS streaming platform, and NOAN, a voice-guided cooking assistant."}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="divide-y divide-line border-y border-line lg:mt-[5.5rem]">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-sm text-muted">{f.k}</dt>
                <dd className="text-right text-[15px] font-medium text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3">
        {FOCUS.map((f, i) => (
          <Reveal key={f.title.en} delay={i * 0.06} className="bg-surface p-7 sm:p-8">
            <h3 className="font-display text-lg font-semibold tracking-tight text-fg">{f.title[lang]}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{f.body[lang]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
