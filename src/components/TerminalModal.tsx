"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { SHAPES, THEMES, ThemeKey, usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { scrollToTarget } from "@/lib/scroll";
import { Dialog } from "@/components/ui/Dialog";

interface Entry {
  id: number;
  command: string;
  output: React.ReactNode;
}

const COMMANDS = ["help", "about", "projects", "skills", "contact", "cv", "theme", "shape", "goto", "clear", "exit"];
const SECTIONS = ["about", "skills", "experience", "projects", "contact"];

export function TerminalModal() {
  const { lang, isTerminalOpen, setTerminalOpen, setCVOpen, setTheme, cycleShape, shapeIndex } = usePortfolio();
  const vi = lang === "vi";
  const [input, setInput] = useState("");
  const [log, setLog] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  // Global shortcut: Ctrl/⌘ + K toggles the terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(!isTerminalOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isTerminalOpen, setTerminalOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [log]);

  const close = () => setTerminalOpen(false);

  const run = (raw: string) => {
    const line = raw.trim();
    if (!line) return;
    const [cmd, ...args] = line.toLowerCase().split(/\s+/);
    const arg = args[0];
    let out: React.ReactNode;
    soundFx.playKeystroke();

    switch (cmd) {
      case "help":
        out = (
          <dl className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1">
            {[
              ["about", vi ? "giới thiệu ngắn" : "short bio"],
              ["projects", vi ? "danh sách dự án" : "list projects"],
              ["skills", vi ? "công nghệ chính" : "main stack"],
              ["contact", vi ? "cách liên hệ" : "how to reach me"],
              ["cv", vi ? "mở CV để in" : "open printable CV"],
              ["theme <tên>", Object.keys(THEMES).join(" | ")],
              ["shape", vi ? "đổi khối 3D" : "cycle 3D shape"],
              ["goto <mục>", SECTIONS.join(" | ")],
              ["clear", vi ? "xóa màn hình" : "clear screen"],
              ["exit", vi ? "đóng (Esc)" : "close (Esc)"],
            ].map(([k, d]) => (
              <React.Fragment key={k}>
                <dt className="text-accent">{k}</dt>
                <dd className="text-muted">{d}</dd>
              </React.Fragment>
            ))}
          </dl>
        );
        break;
      case "about":
      case "whoami":
        out = <p className="max-w-[70ch] text-fg-2">{PORTFOLIO_DATA.personal.bio[lang]}</p>;
        break;
      case "projects":
      case "ls":
        out = (
          <ul className="space-y-1">
            {PORTFOLIO_DATA.projects.map((p) => (
              <li key={p.id}>
                <span className="text-fg">{p.title}</span> <span className="text-subtle">· {p.period}</span>
              </li>
            ))}
          </ul>
        );
        break;
      case "skills":
        out = (
          <p className="text-fg-2">
            Vue 3 · Nuxt 3 · React 19 · Next.js · TypeScript · Nx · FSD · NestJS · Fastify · Prisma · PostgreSQL · Redis · BullMQ · React Native
          </p>
        );
        break;
      case "contact":
        out = (
          <ul className="space-y-1 text-fg-2">
            <li>email&nbsp;&nbsp;{PORTFOLIO_DATA.personal.email}</li>
            <li>phone&nbsp;&nbsp;{PORTFOLIO_DATA.personal.phone}</li>
            <li>
              github{" "}
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                {PORTFOLIO_DATA.personal.github.replace("https://", "")}
              </a>
            </li>
          </ul>
        );
        break;
      case "cv":
      case "resume":
        close();
        window.setTimeout(() => setCVOpen(true), 180);
        out = <p className="text-muted">{vi ? "Đang mở CV..." : "Opening CV..."}</p>;
        break;
      case "theme":
        if (arg && arg in THEMES) {
          setTheme(arg as ThemeKey);
          out = <p className="text-accent">theme → {THEMES[arg as ThemeKey].name[lang]}</p>;
        } else {
          out = <p className="text-muted">{vi ? "Dùng:" : "Usage:"} theme {Object.keys(THEMES).join(" | ")}</p>;
        }
        break;
      case "shape":
        cycleShape();
        out = <p className="text-accent">shape → {SHAPES[(shapeIndex + 1) % SHAPES.length].name[lang]}</p>;
        break;
      case "goto":
      case "cd":
        if (arg && SECTIONS.includes(arg)) {
          close();
          window.setTimeout(() => scrollToTarget(`#${arg}`), 200);
          out = <p className="text-muted">→ #{arg}</p>;
        } else {
          out = <p className="text-muted">{vi ? "Dùng:" : "Usage:"} goto {SECTIONS.join(" | ")}</p>;
        }
        break;
      case "clear":
        setLog([]);
        setInput("");
        setHistory((h) => [line, ...h]);
        return;
      case "exit":
        close();
        setInput("");
        return;
      case "sudo":
        out = <p className="text-fg-2">{vi ? "Không cần sudo. Gõ 'contact' là được." : "No sudo needed. Try 'contact'."}</p>;
        break;
      default:
        out = (
          <p className="text-fg-2">
            {cmd}: {vi ? "không có lệnh này. Gõ" : "command not found. Try"} <span className="text-accent">help</span>
          </p>
        );
    }

    setLog((l) => [...l, { id: ++idRef.current, command: line, output: out }]);
    setHistory((h) => [line, ...h]);
    setCursor(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      const match = COMMANDS.find((c) => input && c.startsWith(input.toLowerCase()));
      if (match) {
        e.preventDefault();
        setInput(match + " ");
      }
    }
  };

  return (
    <Dialog
      open={isTerminalOpen}
      onClose={close}
      labelledBy="terminal-title"
      initialFocus={inputRef}
      className="flex h-[min(560px,85dvh)] max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-[#0a0c10] font-mono text-[13px] sm:rounded-2xl"
    >
      <header className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 id="terminal-title" className="text-xs text-muted">
          quanghy@portfolio: ~
        </h2>
        <div className="flex items-center gap-3">
          <kbd className="hidden text-[11px] text-subtle sm:inline">Esc</kbd>
          <button onClick={close} className="icon-btn !h-8 !w-8" aria-label={vi ? "Đóng terminal" : "Close terminal"}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div
        ref={bodyRef}
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 leading-relaxed"
        onClick={() => inputRef.current?.focus()}
        data-lenis-prevent
        aria-live="polite"
      >
        <p className="text-muted">
          {vi ? "Gõ " : "Type "}
          <span className="text-accent">help</span>
          {vi ? " để xem lệnh. ↑↓ lịch sử, Tab gợi ý." : " for commands. ↑↓ history, Tab completes."}
        </p>
        {log.map((e) => (
          <div key={e.id}>
            <p>
              <span className="text-accent">❯</span> <span className="text-fg">{e.command}</span>
            </p>
            <div className="mt-1 pl-4">{e.output}</div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
        className="flex items-center gap-2 border-t border-line px-4 py-3"
      >
        <span className="text-accent" aria-hidden="true">
          ❯
        </span>
        <label htmlFor="terminal-input" className="sr-only">
          {vi ? "Nhập lệnh" : "Command"}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="off"
          className="flex-1 bg-transparent text-fg outline-none placeholder:text-subtle focus-visible:outline-none"
          placeholder="help"
        />
      </form>
    </Dialog>
  );
}
