"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, Github, Mail, Phone, Send } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { soundFx } from "@/lib/sound";
import { copyText } from "@/lib/clipboard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function Contact() {
  const { personal } = PORTFOLIO_DATA;
  const { lang, showToast } = usePortfolio();
  const vi = lang === "vi";
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const copy = async (key: string, value: string) => {
    const ok = await copyText(value);
    if (!ok) return showToast(vi ? "Không sao chép được" : "Copy failed");
    soundFx.playSuccess();
    setCopied(key);
    showToast(vi ? "Đã sao chép" : "Copied");
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = vi ? `Liên hệ từ ${form.name}` : `Hello from ${form.name}`;
    const body = `${form.message}\n\n${form.name} · ${form.email}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    soundFx.playSuccess();
    setSent(true);
  };

  const channels = [
    { key: "email", icon: Mail, label: "Email", value: personal.email, copy: personal.email, href: `mailto:${personal.email}` },
    { key: "phone", icon: Phone, label: vi ? "Điện thoại / Zalo" : "Phone / Zalo", value: "+84 334 881 329", copy: personal.phone, href: `tel:+84${personal.phone.slice(1)}` },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <SectionHeading
        id="contact-title"
        title={vi ? "Liên hệ" : "Contact"}
        lead={
          vi
            ? "Đang tìm người làm front-end hoặc full-stack cho sản phẩm thật? Gửi vài dòng, tôi trả lời trong 24 giờ."
            : "Looking for someone to build front-end or full-stack for a real product? Send a note; I reply within 24 hours."
        }
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <ul className="divide-y divide-line border-y border-line">
            {channels.map((c) => (
              <li key={c.key} className="flex items-center gap-4 py-5">
                <c.icon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted">{c.label}</p>
                  <a href={c.href} className="block truncate text-[17px] font-medium text-fg hover:text-accent">
                    {c.value}
                  </a>
                </div>
                <button onClick={() => copy(c.key, c.copy)} className="icon-btn" aria-label={`${vi ? "Sao chép" : "Copy"} ${c.label}`}>
                  {copied === c.key ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </button>
              </li>
            ))}
            <li className="flex items-center gap-4 py-5">
              <Github className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-muted">GitHub</p>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[17px] font-medium text-fg hover:text-accent">
                  {personal.github.replace("https://github.com/", "@")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </li>
          </ul>
          <p className="mt-6 flex items-center gap-2.5 text-sm text-fg-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {vi ? "Đang mở cho cơ hội mới · TP. Thủ Đức, TP.HCM" : "Open to new roles · Thu Duc, Ho Chi Minh City"}
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="panel p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                  role="status"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink">
                    <Check className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-fg">{vi ? "Đã mở ứng dụng email" : "Your mail app is open"}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[15px] text-fg-2">
                    {vi
                      ? `Kiểm tra nội dung rồi bấm gửi. Nếu không thấy gì, viết thẳng tới ${personal.email}.`
                      : `Check the draft and hit send. If nothing opened, write to ${personal.email}.`}
                  </p>
                  <button onClick={() => setSent(false)} className="btn btn-ghost mt-6">
                    {vi ? "Viết lại" : "Write again"}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-2 block text-sm font-medium text-fg-2">
                        {vi ? "Tên của bạn" : "Your name"}
                      </label>
                      <input id="c-name" required autoComplete="name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-2 block text-sm font-medium text-fg-2">
                        Email
                      </label>
                      <input id="c-email" type="email" required autoComplete="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="mb-2 block text-sm font-medium text-fg-2">
                      {vi ? "Nội dung" : "Message"}
                    </label>
                    <textarea
                      id="c-msg"
                      required
                      rows={5}
                      className="field resize-none"
                      placeholder={vi ? "Dự án, vai trò, thời gian bắt đầu..." : "Project, role, start date..."}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[13px] text-muted">{vi ? "Gửi qua ứng dụng email của bạn." : "Sends through your own mail app."}</p>
                    <button type="submit" className="btn btn-primary">
                      <Send className="h-4 w-4" /> {vi ? "Gửi tin nhắn" : "Send message"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
