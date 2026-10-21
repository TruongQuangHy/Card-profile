import { PORTFOLIO_DATA } from "@/data/portfolioData";

/** vCard 3.0 for the hero card's QR code and the "save contact" download. */
export function buildVCard() {
  const p = PORTFOLIO_DATA.personal;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Trương;Quang Hy;;;",
    `FN:${p.name}`,
    "TITLE:Software Engineer (Front-End & Full-Stack)",
    `TEL;TYPE=CELL:+84${p.phone.replace(/^0/, "")}`,
    `EMAIL;TYPE=INTERNET:${p.email}`,
    `URL:${p.github}`,
    "ADR;TYPE=HOME:;;Thu Duc;Ho Chi Minh City;;;Vietnam",
    "END:VCARD",
  ].join("\n");
}
