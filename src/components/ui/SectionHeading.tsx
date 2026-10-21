import React from "react";

interface SectionHeadingProps {
  id: string;
  title: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
}

export function SectionHeading({ id, title, lead, aside }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10 sm:mb-14">
      <div className="max-w-2xl">
        <h2
          id={id}
          className="font-display text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-fg"
        >
          {title}
        </h2>
        {lead && <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted max-w-[60ch]">{lead}</p>}
      </div>
      {aside}
    </div>
  );
}
