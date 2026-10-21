import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display-face",
  display: "swap",
});

const code = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quanghy.dev"),
  title: "Trương Quang Hy · Kỹ sư phần mềm Front-End & Full-Stack",
  description:
    "Hồ sơ của Trương Quang Hy, kỹ sư phần mềm Front-End & Full-Stack tại TP.HCM. Hơn 3 năm xây dựng hệ thống nhắn tin thời gian thực, lưu trữ đám mây, cổng quản trị Web3 và ứng dụng di động React Native.",
  keywords: [
    "Trương Quang Hy",
    "Truong Quang Hy",
    "Software Engineer",
    "Front-End Engineer",
    "Full-Stack Engineer",
    "Next.js",
    "React 19",
    "Nuxt 3",
    "Vue 3",
    "React Native",
    "HyFlim",
    "TBChat",
    "HUTECH",
  ],
  authors: [{ name: "Trương Quang Hy", url: "https://github.com/TruongQuangHy" }],
  creator: "Trương Quang Hy",
  icons: {
    icon: "/images/avatar.jpg",
  },
  openGraph: {
    title: "Trương Quang Hy · Kỹ sư phần mềm Front-End & Full-Stack",
    description:
      "Các dự án TBChat Web, TB Cloud Drive, TB Admin, HyFlim và NOAN cùng kinh nghiệm làm việc của Trương Quang Hy.",
    url: "https://quanghy.dev",
    siteName: "Trương Quang Hy",
    images: [
      {
        url: "/images/avatar.jpg",
        width: 800,
        height: 800,
        alt: "Trương Quang Hy",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark ${body.variable} ${display.variable} ${code.variable}`}>
      <body className="antialiased bg-ink text-fg min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
