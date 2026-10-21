"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp, Facebook, Github, Instagram, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { scrollToTarget } from "@/lib/scroll";

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;
  const { lang } = usePortfolio();
  const links = [
    { href: personal.github, label: "GitHub", icon: Github },
    { href: personal.facebook, label: "Facebook", icon: Facebook },
    { href: personal.instagram, label: "Instagram", icon: Instagram },
    { href: `mailto:${personal.email}`, label: "Email", icon: Mail },
  ];

  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={personal.logo}
            alt="Trương Quang Hy • Dany"
            width={170}
            height={24}
            className="h-6 w-auto object-contain opacity-85 transition-opacity duration-200 hover:opacity-100"
          />
          <span className="hidden sm:inline text-xs text-muted">|</span>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {personal.name}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={l.label}
            >
              <l.icon className="h-4 w-4" />
            </a>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          <button onClick={() => scrollToTarget(0)} className="icon-btn" aria-label={lang === "vi" ? "Lên đầu trang" : "Back to top"}>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
