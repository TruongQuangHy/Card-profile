"use client";

import React from "react";
import { useReducedMotion } from "motion/react";

const STACK = [
  "Vue 3",
  "Nuxt 3",
  "React 19",
  "Next.js",
  "TypeScript",
  "Vite",
  "Nx Monorepo",
  "Feature-Sliced Design",
  "NestJS",
  "Fastify",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "BullMQ",
  "React Native",
  "WebSocket",
];

/** A quiet, edge-faded strip of the daily stack. Pauses on hover; static for reduced motion. */
export default function TechMarquee() {
  const reduced = useReducedMotion();
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {STACK.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
          {t}
          <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Tech stack" className="relative border-y border-line py-5">
      <div
        className="group flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        {reduced ? (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 px-2">
            {STACK.map((t) => (
              <li key={t} className="font-mono text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused]">
            {row(false)}
            {row(true)}
          </div>
        )}
      </div>
    </section>
  );
}
