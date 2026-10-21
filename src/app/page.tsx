"use client";

import React from "react";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import ThreeCanvas from "@/components/ThreeCanvas";
import CyberEffects from "@/components/CyberEffects";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import CVSection from "@/components/CVSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TerminalModal } from "@/components/TerminalModal";
import { CVModal } from "@/components/CVModal";

export default function Home() {
  return (
    <PortfolioProvider>
      <SmoothScroll>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Bỏ qua tới nội dung
        </a>
        <ThreeCanvas />
        <CyberEffects />
        <Navbar />

        <main id="main" className="relative z-10 mx-auto max-w-6xl space-y-28 px-5 pb-28 sm:space-y-36 sm:px-8">
          <Hero />
          <TechMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <CVSection />
          <Contact />
        </main>

        <Footer />
        <TerminalModal />
        <CVModal />
      </SmoothScroll>
    </PortfolioProvider>
  );
}
