export interface Project {
  id: string;
  title: string;
  tagline: {
    en: string;
    vi: string;
  };
  category: "all" | "enterprise" | "realtime_ai" | "mobile" | "streaming";
  categoryLabel: {
    en: string;
    vi: string;
  };
  featured: boolean;
  image?: string;
  imageFit?: "contain" | "cover";
  logo?: string;
  apkDownload?: string;
  liveUrl?: string;
  githubUrl?: string;
  role: {
    en: string;
    vi: string;
  };
  period: string;
  clientOrOrg: string;
  teamSize?: number;
  stats: {
    label: { en: string; vi: string };
    value: string;
  }[];
  description: {
    en: string;
    vi: string;
  };
  challenges: {
    en: string[];
    vi: string[];
  };
  solutions: {
    en: string[];
    vi: string[];
  };
  techStack: string[];
  architectureHighlights: {
    en: string[];
    vi: string[];
  };
}

export interface Experience {
  id: string;
  role: {
    en: string;
    vi: string;
  };
  company: string;
  location: string;
  period: {
    en: string;
    vi: string;
  };
  type: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  achievements: {
    en: string[];
    vi: string[];
  };
  skills: string[];
  projectsIncluded?: string[];
}

export interface Education {
  school: {
    en: string;
    vi: string;
  };
  field: {
    en: string;
    vi: string;
  };
  specialized: {
    en: string;
    vi: string;
  };
  period: string;
}

export interface SkillCategory {
  title: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  skills: {
    name: string;
    level: number;
    iconName: string;
    tag?: string;
  }[];
}

export const PORTFOLIO_DATA: {
  personal: {
    name: string;
    latinName: string;
    dob: string;
    phone: string;
    avatar: string;
    email: string;
    github: string;
    facebook: string;
    instagram: string;
    address: {
      en: string;
      vi: string;
    };
    location: string;
    title: { en: string; vi: string };
    subtitle: { en: string; vi: string };
    status: { en: string; vi: string };
    bio: { en: string; vi: string };
  };
  education: Education;
  metrics: {
    value: string;
    suffix: string;
    label: { en: string; vi: string };
  }[];
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
} = {
  personal: {
    name: "Trương Quang Hy",
    latinName: "Truong Quang Hy",
    dob: "01/03/2001",
    phone: "0334881329",
    avatar: "/images/avatar.jpg",
    email: "hytruong.work@gmail.com",
    github: "https://github.com/TruongQuangHy",
    facebook: "https://www.facebook.com/quanghy123",
    instagram: "https://www.instagram.com/_qhyqhy_/",
    address: {
      en: "Tran Thi Dieu street, Phuoc Long B ward, Thu Duc city, Ho Chi Minh City",
      vi: "Đường Trần Thị Điệu, Phường Phước Long B, TP. Thủ Đức, TP. Hồ Chí Minh",
    },
    location: "Thu Duc City, Ho Chi Minh City, Vietnam",
    title: {
      en: "Software Engineer • Front-End & Full-Stack",
      vi: "Kỹ Sư Phần Mềm • Front-End & Full-Stack",
    },
    subtitle: {
      en: "Specialized in modern Front-End architectures (Vue 3/Nuxt 3, React 19/Next.js 16, Vite, FSD, Nx Monorepo) paired with robust Full-Stack (NestJS/Fastify, Prisma, PostgreSQL, Redis, BullMQ) and React Native mobile development.",
      vi: "Chuyên sâu kiến trúc Front-End hiện đại (Vue 3/Nuxt 3, React 19/Next.js 16, Vite, FSD, Nx Monorepo) kết hợp năng lực Full-Stack vững chắc (NestJS/Fastify, Prisma, PostgreSQL, Redis, BullMQ) và phát triển di động React Native.",
    },
    status: {
      en: "Available for Senior Engineer / Tech Lead opportunities",
      vi: "Sẵn sàng cho vị trí Senior Engineer / Tech Lead",
    },
    bio: {
      en: "Dynamic Software Engineer with over 3 years of hands-on experience in building high-performance, production-ready web and mobile applications. Specialized in modern Front-End architectures (Vue 3/Nuxt 3, React 19/Next.js 16, Vite, Feature-Sliced Design, Nx Monorepo) paired with robust Full-Stack capabilities (Node.js, NestJS/Fastify, Prisma, PostgreSQL, Redis, BullMQ) and React Native mobile development. Proven track record delivering complex real-time encrypted messaging, high-throughput cloud storage systems, enterprise administrative portals with Web3 integrations, and AI voice-guided applications. Seeking a forward-thinking environment to architect resilient systems, optimize developer velocity and application performance, and advance toward a Senior Software Engineer / Technical Lead role.",
      vi: "Kỹ sư phần mềm năng động với hơn 3 năm kinh nghiệm thực chiến phát triển các ứng dụng web và di động hiệu năng cao, sẵn sàng phục vụ sản xuất. Chuyên sâu các kiến trúc Front-End hiện đại (Vue 3/Nuxt 3, React 19/Next.js 16, Vite, Feature-Sliced Design, Nx Monorepo) kết hợp năng lực Full-Stack mạnh mẽ (Node.js, NestJS/Fastify, Prisma, PostgreSQL, Redis, BullMQ) và ứng dụng di động React Native. Đã trực tiếp xây dựng và bàn giao các hệ thống nhắn tin mã hóa thời gian thực, nền tảng lưu trữ đám mây băng thông cao, cổng quản trị doanh nghiệp tích hợp Web3 và trợ lý nấu ăn AI bằng giọng nói.",
    },
  },
  education: {
    school: {
      en: "Ho Chi Minh City University of Technology (HUTECH)",
      vi: "Trường Đại học Công nghệ Thành phố Hồ Chí Minh (HUTECH)",
    },
    field: {
      en: "Information Technology",
      vi: "Công Nghệ Thông Tin",
    },
    specialized: {
      en: "Software Engineering",
      vi: "Kỹ Thuật Phần Mềm",
    },
    period: "09/2019 - 09/2023",
  },
  metrics: [
    {
      value: "3+",
      suffix: "Years",
      label: { en: "Engineering Experience", vi: "Năm Kinh Nghiệm Thực Chiến" },
    },
    {
      value: "7+",
      suffix: "Projects",
      label: { en: "Enterprise & Flagship Apps", vi: "Dự Án Sản Xuất Lớn" },
    },
    {
      value: "99.9%",
      suffix: "Stability",
      label: { en: "SSR & Web Vitals Uptime", vi: "Hiệu Năng & Độ Ổn Định SSR" },
    },
    {
      value: "60+",
      suffix: "Members",
      label: { en: "Collaborated in Large Teams", vi: "Quy Mô Đội Ngũ Tham Gia" },
    },
  ],
  projects: [
    {
      id: "tbchat-web",
      title: "TBChat Web (Official Chat Web)",
      tagline: {
        en: "Enterprise real-time communication platform supporting E2E encrypted messaging, media transfers, and decentralized P2P infrastructure",
        vi: "Nền tảng nhắn tin doanh nghiệp thời gian thực với mã hóa E2E, truyền tệp tin media và kết nối P2P phi tập trung",
      },
      category: "realtime_ai",
      categoryLabel: { en: "Realtime & P2P", vi: "Thời Gian Thực & P2P" },
      featured: true,
      image: "/images/tbchat-screen.png",
      imageFit: "cover",
      logo: "/images/tbchat-icon.webp",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Front-End Chính",
      },
      period: "11/2025 - Present",
      clientOrOrg: "Nexsoft Technology",
      teamSize: 7,
      stats: [
        { label: { en: "Team Size", vi: "Quy mô nhóm" }, value: "7 members" },
        { label: { en: "P2P & WebSockets", vi: "Giao thức mạng" }, value: "E2E Encrypted" },
        { label: { en: "RTL Support", vi: "Hỗ trợ văn bản" }, value: "Urdu / Arabic" },
      ],
      description: {
        en: "Enterprise web-based real-time communication platform supporting end-to-end encrypted messaging, media transfers, and multi-language services integrated with decentralized P2P infrastructure.",
        vi: "Nền tảng truyền thông doanh nghiệp thời gian thực trên web hỗ trợ nhắn tin mã hóa đầu cuối (E2E), truyền tệp đa phương tiện và đa ngôn ngữ tích hợp hạ tầng mạng P2P phi tập trung.",
      },
      challenges: {
        en: [
          "Eliminating message duplication and layout jumping during concurrent media uploads.",
          "Preventing virtual keyboard layout shifting, input focus jitter, and attachment panel positioning bugs on iOS and mobile browsers.",
          "Handling unstable network drops without losing active session states.",
        ],
        vi: [
          "Xử lý hiện tượng trùng lặp tin nhắn và giật nhảy layout khi nhiều người dùng tải tệp tin đa phương tiện lên cùng lúc.",
          "Khắc phục triệt để lỗi nhảy layout bàn phím ảo, giật tiêu điểm khung gõ phím trên trình duyệt Safari iOS và di động.",
          "Đảm bảo duy trì trạng thái phiên trò chuyện ổn định khi kết nối mạng chập chờn.",
        ],
      },
      solutions: {
        en: [
          "Architected real-time WebSocket communication layer with intelligent heartbeat detection, timeout recovery, and automatic session reconnection.",
          "Optimized optimistic UI rendering using media content hashing and file size matching to eliminate duplication and layout shifts.",
          "Polyfilled ResizeObserver to guarantee SSR stability; engineered bidirectional layout support for RTL languages (Urdu, Arabic).",
          "Built a Nitro server-side proxy to bypass CORS constraints during high-bandwidth media downloads.",
        ],
        vi: [
          "Kiến trúc tầng truyền thông WebSocket thời gian thực với cơ chế phát hiện heartbeat thông minh, khôi phục timeout và tự động kết nối lại.",
          "Tối ưu hóa render UI lạc quan (optimistic UI) bằng hàm băm nội dung media kết hợp so khớp dung lượng file.",
          "Polyfill ResizeObserver đảm bảo độ ổn định SSR; xây dựng hỗ trợ giao diện 2 chiều cho các ngôn ngữ RTL (tiếng Urdu, Ả Rập).",
          "Tạo Nitro server proxy để vượt qua giới hạn CORS khi tải tệp dữ liệu dung lượng lớn.",
        ],
      },
      techStack: [
        "Nuxt 3 (SSR)",
        "Vue 3",
        "TypeScript",
        "Tailwind CSS v4",
        "Pinia",
        "Nitro",
        "WebSockets",
        "Reka UI",
        "Vaul-Vue",
        "RxJS",
        "Vitest",
      ],
      architectureHighlights: {
        en: [
          "Intelligent WebSocket heartbeat detection & auto-reconnect",
          "Optimistic UI rendering with content hashing",
          "Nitro server-side proxy for seamless media transfer",
        ],
        vi: [
          "Cơ chế heartbeat WebSocket phát hiện ngắt mạng và tự kết nối lại",
          "Render lạc quan bằng băm nội dung tệp tin media",
          "Proxy Nitro phía máy chủ xử lý vượt rào CORS tải media",
        ],
      },
    },
    {
      id: "tb-cloud-drive",
      title: "TB Cloud Drive Web",
      tagline: {
        en: "High-performance decentralized cloud drive web app with chunked resumable uploads & client-side encryption",
        vi: "Ứng dụng lưu trữ đám mây phi tập trung với cơ chế tải lên theo khối có thể tiếp tục & mã hóa client",
      },
      category: "enterprise",
      categoryLabel: { en: "Cloud & Storage", vi: "Lưu Trữ Đám Mây" },
      featured: true,
      image: "/images/tb-cloud-drive-screen.png",
      imageFit: "cover",
      logo: "/images/tbchat-icon.webp",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Front-End",
      },
      period: "11/2025 - Present",
      clientOrOrg: "Nexsoft Technology",
      teamSize: 7,
      stats: [
        { label: { en: "Architecture", vi: "Kiến trúc chuẩn" }, value: "FSD (6 Layers)" },
        { label: { en: "Upload Manager", vi: "Trình tải lên" }, value: "Chunk Resumable" },
        { label: { en: "Privacy Module", vi: "Bảo mật riêng tư" }, value: "PIN & Encryption" },
      ],
      description: {
        en: "High-performance decentralized cloud drive web application providing file/folder hierarchy, chunked resumable uploads, storage quota analytics, and client-side encryption.",
        vi: "Ứng dụng web lưu trữ đám mây phi tập trung hiệu năng cao cung cấp cây phân cấp thư mục/tệp tin, tải lên theo khối có thể tiếp tục, thống kê hạn mức dung lượng và mã hóa dữ liệu tại client.",
      },
      challenges: {
        en: [
          "Enforcing modular scalability without circular dependencies across large enterprise teams.",
          "Managing multi-task large file uploads over unstable networks without data corruption.",
          "Protecting sensitive user assets with seamless client-side security barriers.",
        ],
        vi: [
          "Ngăn chặn triệt để tình trạng phụ thuộc vòng (circular dependencies) khi dự án phình to.",
          "Quản lý việc tải lên đồng thời nhiều tệp tin dung lượng lớn qua kết nối mạng không ổn định.",
          "Xây dựng khu vực bảo mật riêng tư với trải nghiệm người dùng liền mạch.",
        ],
      },
      solutions: {
        en: [
          "Organized codebase following strict Feature-Sliced Design (FSD) architecture across 6 distinct layers enforced via Steiger and ESLint boundaries.",
          "Built encrypted 'Privacy Space' module protected by PIN session management with automatic inactivity lock and isolated security states.",
          "Implemented floating multi-task upload manager (UploadProgressFloat) with chunk concurrency controls and HTTP range requests for resumable transfers.",
          "Authored unit and integration test suites using Vitest, Vue Test Utils, and Zod schemas for validation.",
        ],
        vi: [
          "Tổ chức mã nguồn theo kiến trúc Feature-Sliced Design (FSD) 6 tầng phân lớp rõ ràng, kiểm soát biên giới bằng Steiger và ESLint.",
          "Xây dựng phân vùng 'Không Gian Riêng Tư' bảo vệ bằng mã PIN, tự động khóa khi không hoạt động và cô lập trạng thái.",
          "Thiết kế trình quản lý tải lên đa tác vụ nổi (UploadProgressFloat) hỗ trợ chia khối đồng thời và HTTP range requests.",
          "Viết bộ kiểm thử toàn diện với Vitest, Vue Test Utils và Zod schema đảm bảo không xảy ra hồi quy.",
        ],
      },
      techStack: [
        "Vue 3.5",
        "TypeScript 5.8",
        "Vite 7",
        "Feature-Sliced Design (FSD)",
        "Pinia",
        "TanStack Query v5",
        "Tailwind CSS v4",
        "Reka UI",
        "Vitest",
        "Playwright",
      ],
      architectureHighlights: {
        en: [
          "Strict Feature-Sliced Design (FSD) with Steiger boundary enforcement",
          "Encrypted PIN Privacy Space with automatic inactivity locking",
          "HTTP Range chunked resumable upload engine",
        ],
        vi: [
          "Kiến trúc Feature-Sliced Design 6 tầng chuẩn hóa",
          "Không gian bảo mật mã PIN tự động khóa an toàn",
          "Cơ chế tải lên theo khối hỗ trợ tiếp tục sau khi đứt kết nối",
        ],
      },
    },
    {
      id: "tb-admin",
      title: "TB Admin (Nexsoft Admin)",
      tagline: {
        en: "Enterprise SaaS administration platform managing multi-chain Web3 wallet configurations & storage billing",
        vi: "Cổng quản trị doanh nghiệp quản lý cấu hình ví Web3 đa chuỗi và gói cước lưu trữ",
      },
      category: "enterprise",
      categoryLabel: { en: "Enterprise SaaS", vi: "Quản Trị Doanh Nghiệp" },
      featured: true,
      image: "/images/tb-admin-screen.png",
      imageFit: "cover",
      logo: "/images/tbchat-icon.webp",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Front-End",
      },
      period: "11/2025 - Present",
      clientOrOrg: "Nexsoft Technology",
      teamSize: 7,
      stats: [
        { label: { en: "Sprint Velocity", vi: "Tốc độ bàn giao" }, value: "+25% Speed" },
        { label: { en: "Web3 Integration", vi: "Tích hợp Web3" }, value: "Multi-Chain" },
        { label: { en: "Monorepo Stack", vi: "Kiến trúc hệ thống" }, value: "Nx Monorepo" },
      ],
      description: {
        en: "Enterprise administration platform managing multi-chain Web3 wallet configurations, storage billing tiers, account moderation, and audit workflows across micro-frontends.",
        vi: "Nền tảng quản trị doanh nghiệp vận hành cấu hình ví Web3 đa chuỗi, các gói định giá lưu trữ, kiểm duyệt tài khoản và luồng kiểm toán trên kiến trúc micro-frontends.",
      },
      challenges: {
        en: [
          "Managing disparate token priorities, pagination, and multi-network swap/bridge dependency controls.",
          "Preventing accidental data loss in complex forms during navigation or dirty-state edits.",
          "Unifying cross-application Single Sign-On (SSO) with automated token refresh proxies.",
        ],
        vi: [
          "Quản lý độ ưu tiên token gốc, phân trang linh hoạt và kiểm soát phụ thuộc hoán đổi Swap/Bridge đa mạng.",
          "Ngăn chặn mất dữ liệu biểu mẫu khi người dùng chỉnh sửa cấu hình giá gói cước mà chưa bấm lưu.",
          "Đồng bộ hóa đăng nhập một lần (SSO) xuyên suốt các phân hệ ứng dụng với cơ chế xoay vòng token ngầm.",
        ],
      },
      solutions: {
        en: [
          "Constructed tested, SSR/CSR-compatible design system primitives in Storybook, accelerating sprint velocity by ~25%.",
          "Engineered Web3 Wallet & Token Management: native token priority sorting, pagination via useTokens, and multi-network filtering.",
          "Built Storage Plan & Payment settings featuring promotional pricing, billing cycles, form dirty-state tracking, and discard guards.",
          "Delivered cross-application Single Sign-On (SSO) with token refresh proxies and multi-language support (English, Simplified Chinese) using LinguiJS.",
        ],
        vi: [
          "Xây dựng bộ thư viện design system hoàn chỉnh trong Storybook tương thích SSR/CSR, tăng 25% tốc độ phát triển tính năng.",
          "Thiết kế phân hệ quản lý Token & Ví Web3: sắp xếp ưu tiên token gốc, phân trang useTokens và bộ lọc đa chuỗi.",
          "Xây dựng cấu hình gói cước Storage Plan & Thanh toán với theo dõi trạng thái form dirty-state và cảnh báo hủy thay đổi.",
          "Triển khai SSO đa ứng dụng tự động làm mới token và hỗ trợ đa ngôn ngữ (tiếng Anh, tiếng Trung giản thể) với LinguiJS.",
        ],
      },
      techStack: [
        "Nx Monorepo",
        "Next.js 16",
        "Vite",
        "React Router 7",
        "React 19",
        "TypeScript",
        "TanStack Query",
        "TanStack Table",
        "Zustand",
        "Zod",
        "LinguiJS",
        "Storybook",
        "Vitest",
      ],
      architectureHighlights: {
        en: [
          "Storybook design system accelerating sprint velocity by 25%",
          "Multi-chain Web3 token management with automated swap dependencies",
          "Cross-application SSO with automated token refresh proxies",
        ],
        vi: [
          "Thư viện design system trên Storybook tăng tốc độ sprint 25%",
          "Quản lý token ví Web3 đa mạng với logic phụ thuộc Swap tự động",
          "SSO đa ứng dụng với proxy làm mới phiên tự động",
        ],
      },
    },
    {
      id: "noan-mogu",
      title: "NOAN (Mogu) — Smart Meal Planner & Voice-Guided Assistant",
      tagline: {
        en: "End-to-end culinary platform with on-device Vietnamese voice assistant, deterministic meal engine & NestJS backend",
        vi: "Nền tảng ẩm thực toàn diện với trợ lý giọng nói tiếng Việt on-device, gợi ý thực đơn thông minh & backend NestJS",
      },
      category: "mobile",
      categoryLabel: { en: "AI & Mobile", vi: "AI & Ứng Dụng Di Động" },
      featured: true,
      image: "/images/noan-mascot.png",
      imageFit: "contain",
      logo: "/images/noan-logo.png",
      apkDownload: "mogu-release.apk",
      role: {
        en: "Full-Stack & Mobile Lead",
        vi: "Kỹ Sư Trưởng Full-Stack & Di Động",
      },
      period: "08/2026 - Present",
      clientOrOrg: "Personal Project",
      teamSize: 1,
      stats: [
        { label: { en: "Voice Engine", vi: "Trợ lý giọng nói" }, value: "On-Device vi-VN" },
        { label: { en: "Mobile Build", vi: "Bản cài đặt" }, value: "APK Released" },
        { label: { en: "Queue Processing", vi: "Xử lý hàng đợi" }, value: "BullMQ / Redis" },
      ],
      description: {
        en: "End-to-end nutrition and culinary platform encompassing a React Native mobile app (production APK released), an administrative portal, and a high-performance NestJS microservices backend.",
        vi: "Hệ sinh thái dinh dưỡng và ẩm thực khép kín bao gồm ứng dụng di động React Native (đã phát hành APK sản xuất), cổng thông tin quản trị và backend microservices NestJS hiệu năng cao.",
      },
      challenges: {
        en: [
          "Achieving fast hands-free voice step navigation while cooking without network dependency or high latency.",
          "Generating balanced 7-day nutritional meal schedules adhering to strict allergy and caloric constraints without blocking requests.",
        ],
        vi: [
          "Đạt tốc độ nhận diện lệnh giọng nói tức thì khi đang nấu ăn mà không phụ thuộc hoàn toàn vào mạng hoặc bị trễ.",
          "Tính toán lịch trình ăn uống dinh dưỡng 7 ngày đáp ứng ràng buộc calo và dị ứng khắt khe mà không làm nghẽn luồng xử lý.",
        ],
      },
      solutions: {
        en: [
          "Hands-Free Voice Cooking ('Nấu cùng NOAN'): Integrated on-device Vietnamese Speech-to-Text (expo-speechrecognition with vi-VN models) and cloud/local fallback TTS; engineered real-time voice intent parsing for hands-free step navigation, cooking timers, and ingredient queries.",
          "Deterministic Meal Planning Engine: Designed algorithm enforcing strict health and nutritional constraints (BR-01–BR-05: calorie targets, macro balancing, allergy filters) backed by BullMQ and Redis queues for asynchronous batch schedule generation.",
          "High-Throughput Backend Architecture: Developed NestJS 11 backend over Fastify with PostgreSQL and Prisma ORM; implemented AWS S3 presigned upload workflows, Supabase JWT auth, and structured Pino logging.",
          "Admin Portal & Design System: Created modern management portal with React 19, Vite, and Tailwind CSS for recipe ingestion and dietary analytics.",
        ],
        vi: [
          "Tính năng 'Nấu cùng NOAN': Tích hợp nhận diện giọng nói tiếng Việt on-device (expo-speechrecognition với mô hình vi-VN) và tổng hợp giọng nói TTS dự phòng; phân tích ý định giọng nói thời gian thực để chuyển bước công thức, hẹn giờ và tra cứu nguyên liệu rảnh tay.",
          "Công cụ gợi ý thực đơn: Thiết kế thuật toán thực thi nghiêm ngặt các quy tắc dinh dưỡng (BR-01–BR-05: mục tiêu calo, cân bằng macro, lọc dị ứng) trên hàng đợi BullMQ và Redis bất đồng bộ.",
          "Backend hiệu năng cao: Xây dựng NestJS 11 trên Fastify với PostgreSQL và Prisma ORM; áp dụng quy trình tải tệp lên AWS S3 bằng Presigned URL, xác thực Supabase JWT và log có cấu trúc bằng Pino.",
          "Cổng quản trị: Xây dựng giao diện quản trị hiện đại với React 19, Vite và Tailwind CSS để nhập công thức và phân tích khẩu phần.",
        ],
      },
      techStack: [
        "React Native (Expo 57)",
        "NativeWind 4",
        "Reanimated",
        "NestJS 11",
        "Fastify",
        "Prisma ORM",
        "PostgreSQL (Supabase)",
        "BullMQ",
        "Redis",
        "React 19",
        "Vite",
        "OpenAI API",
        "AWS S3",
      ],
      architectureHighlights: {
        en: [
          "On-device Vietnamese Speech-to-Text for cooking step navigation",
          "Asynchronous batch meal scheduling with BullMQ and Redis",
          "High-throughput NestJS 11 + Fastify + Prisma backend",
        ],
        vi: [
          "Nhận dạng giọng nói tiếng Việt trực tiếp trên thiết bị (on-device STT)",
          "Xử lý lịch trình ăn uống theo đợt bằng hàng đợi BullMQ và Redis",
          "Backend NestJS 11 + Fastify tốc độ cao cùng Prisma ORM",
        ],
      },
    },
    {
      id: "hyflim-streaming",
      title: "HyFlim — Fullstack Movie Streaming Web & Native Mobile App",
      tagline: {
        en: "Adaptive HLS movie streaming platform with hardware-accelerated playback and standalone Android APK",
        vi: "Nền tảng xem phim trực tuyến HLS thích ứng với bộ giải mã phần cứng và ứng dụng Android APK",
      },
      category: "streaming",
      categoryLabel: { en: "Media & Streaming", vi: "Media & Streaming" },
      featured: true,
      image: "/images/hyflim-logo.png",
      imageFit: "contain",
      logo: "/images/hyflim-icon.png",
      apkDownload: "HyFlim.apk",
      role: {
        en: "Creator & Full-Stack Architect",
        vi: "Nhà Sáng Lập & Kiến Trúc Sư Full-Stack",
      },
      period: "2024 - Present",
      clientOrOrg: "Independent Production Release",
      teamSize: 1,
      stats: [
        { label: { en: "Stream Resolution", vi: "Độ phân giải" }, value: "4K / 1080p" },
        { label: { en: "Buffer Latency", vi: "Thời gian đệm video" }, value: "< 0.4s" },
        { label: { en: "Platforms", vi: "Nền tảng hỗ trợ" }, value: "Web & Android APK" },
      ],
      description: {
        en: "Fullstack media entertainment platform featuring Next.js 15 App Router, Supabase real-time watch histories, HLS.js adaptive streaming, and a companion Expo React Native mobile application deployed as standalone APK (HyFlim.apk).",
        vi: "Nền tảng giải trí xem phim trực tuyến toàn diện bao gồm Next.js 15 App Router, đồng bộ lịch sử xem qua Supabase, truyền phát video HLS.js thích ứng và ứng dụng di động React Native Expo đóng gói bản cài APK độc lập.",
      },
      challenges: {
        en: [
          "Eliminating DOM polling loops and battery drain during high-bitrate video playback on mobile.",
          "Synchronizing playback timeline scrubbers and watch history across Web and Mobile with network throttling.",
        ],
        vi: [
          "Loại bỏ các vòng lặp kiểm tra DOM và hiện tượng hao pin khi phát video bitrate cao trên thiết bị di động.",
          "Đồng bộ hóa chính xác thanh kéo thời gian xem và lịch sử phát giữa Web và Mobile ngay cả khi mạng chập chờn.",
        ],
      },
      solutions: {
        en: [
          "Eliminated DOM polling loops, enabled GPU hardware acceleration, and throttled history persistence to Supabase.",
          "Constructed custom overlay controls with synchronized timeline scrubbing and auto-hiding toolbars.",
          "Packaged standalone production Android APK with optimized Hermes JavaScript engine.",
        ],
        vi: [
          "Loại bỏ polling DOM, kích hoạt giải mã phần cứng qua GPU và gom nhóm lưu lịch sử lên Supabase.",
          "Tự thiết kế bảng điều khiển toàn màn hình với thanh trượt đồng bộ và tự động ẩn sau 3 giây.",
          "Đóng gói bản cài đặt Android APK độc lập với engine Hermes tối ưu tốc độ khởi động.",
        ],
      },
      techStack: [
        "Next.js 15",
        "React 19",
        "React Native",
        "Expo",
        "Supabase",
        "HLS.js",
        "Tailwind CSS v4",
        "Zustand",
        "Hermes Engine",
        "Android Studio",
      ],
      architectureHighlights: {
        en: [
          "Adaptive Bitrate (ABR) HLS video delivery",
          "Supabase real-time watch history synchronization",
          "Standalone Android APK packaging with hardware acceleration",
        ],
        vi: [
          "Truyền phát video HLS tự thích ứng băng thông",
          "Đồng bộ lịch sử xem phim thời gian thực với Supabase",
          "Bản cài Android APK độc lập tối ưu tăng tốc phần cứng",
        ],
      },
    },
    {
      id: "xepo-platform",
      title: "XEPO Platform",
      tagline: {
        en: "Platform enabling users to build personal bio pages, integrate social accounts, real-time chat, and sell digital courses",
        vi: "Nền tảng tạo trang bio cá nhân, tích hợp mạng xã hội, chat cộng đồng thời gian thực và bán sản phẩm số",
      },
      category: "enterprise",
      categoryLabel: { en: "Ecosystem & Platform", vi: "Hệ Sinh Thái & Nền Tảng" },
      featured: false,
      image: "/images/xepo-logo.png",
      imageFit: "contain",
      logo: "/images/xepo-logo.png",
      githubUrl: "https://github.com/golivedev-labs/xepo-fe",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Front-End",
      },
      period: "09/2024 - 11/2025",
      clientOrOrg: "GoLiveDev Practical Technology Joint Stock Company",
      teamSize: 60,
      stats: [
        { label: { en: "Team Size", vi: "Quy mô dự án" }, value: "60 members" },
        { label: { en: "Component Library", vi: "Thư viện giao diện" }, value: "Shared System" },
        { label: { en: "Real-time Protocol", vi: "Giao thức real-time" }, value: "WebSocket" },
      ],
      description: {
        en: "Platform enabling users to build personal bio pages, integrate social media accounts, create private communities with real-time chat, and sell digital products or courses.",
        vi: "Nền tảng cho phép người dùng xây dựng trang bio cá nhân, liên kết các tài khoản mạng xã hội, tạo cộng đồng riêng tư có kênh chat thời gian thực và kinh doanh các sản phẩm hoặc khóa học số.",
      },
      challenges: {
        en: [
          "Coordinating UI components and development speed across a massive 60-member team.",
          "Smooth state synchronization across sessions during real-time messaging and notifications.",
          "Rendering high-volume user data without UI lag or memory bloat.",
        ],
        vi: [
          "Đồng bộ hóa linh kiện giao diện và đẩy nhanh tiến độ bàn giao trong đội ngũ đông đảo 60 kỹ sư.",
          "Đồng bộ trạng thái phiên làm việc khi nhận tin nhắn và thông báo thời gian thực.",
          "Tối ưu tốc độ render khi tải lượng lớn dữ liệu người dùng mà không làm đơ giao diện.",
        ],
      },
      solutions: {
        en: [
          "Architected and built a reusable component library for dashboards and profile pages, reducing development time across the team.",
          "Implemented real-time messaging and notification systems using WebSocket, ensuring smooth state synchronization across sessions.",
          "Optimized rendering performance for high-volume user data, improving page load speed and UI responsiveness.",
        ],
        vi: [
          "Kiến trúc và xây dựng thư viện component tái sử dụng cho các trang quản trị và hồ sơ, giảm thiểu thời gian code cho toàn đội ngũ.",
          "Triển khai hệ thống thông báo và nhắn tin thời gian thực bằng WebSocket, đảm bảo đồng bộ trạng thái trơn tru giữa các phiên.",
          "Tối ưu hóa hiệu năng render dữ liệu khối lượng lớn, nâng cao tốc độ tải trang và độ phản hồi của UI.",
        ],
      },
      techStack: [
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "Tailwind CSS",
        "Nuxt UI",
        "NestJS",
        "MongoDB",
        "Docker",
        "WebSocket",
      ],
      architectureHighlights: {
        en: [
          "Reusable component library cutting team feature delivery time",
          "WebSocket real-time state synchronization engine",
          "Containerized development environment with Docker",
        ],
        vi: [
          "Thư viện component dùng chung rút ngắn thời gian phát triển",
          "Đồng bộ trạng thái thời gian thực qua WebSocket",
          "Môi trường phát triển đóng gói bằng Docker",
        ],
      },
    },
    {
      id: "talio-platform",
      title: "TALIO — Online CV Builder",
      tagline: {
        en: "Platform helping users build and share online CVs, portfolios, and career profiles with dynamic form builder & instant PDF",
        vi: "Nền tảng tạo và chia sẻ hồ sơ xin việc, portfolio trực tuyến với trình tạo biểu mẫu kéo thả & xuất PDF tức thì",
      },
      category: "realtime_ai",
      categoryLabel: { en: "CV Builder & SaaS", vi: "Trình Tạo CV Trực Tuyến" },
      featured: false,
      image: "/images/talio-logo.png",
      imageFit: "contain",
      logo: "/images/talio-logo.png",
      githubUrl: "https://github.com/golivedev-labs/talio-old",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Front-End",
      },
      period: "09/2024 - 11/2025",
      clientOrOrg: "GoLiveDev Practical Technology Joint Stock Company",
      teamSize: 30,
      stats: [
        { label: { en: "Team Size", vi: "Quy mô nhóm" }, value: "30 members" },
        { label: { en: "CV Templates", vi: "Mẫu hồ sơ" }, value: "5+ Templates" },
        { label: { en: "PDF Export", vi: "Xuất file PDF" }, value: "Headless 1-Click" },
      ],
      description: {
        en: "A website similar to TopCV, helping users build and share online CVs, portfolios, and career profiles. Created responsive and printable CV templates using Tailwind CSS.",
        vi: "Nền tảng tương tự TopCV, giúp người dùng xây dựng và chia sẻ hồ sơ xin việc trực tuyến, portfolio và hồ sơ nghề nghiệp. Thiết kế các mẫu CV đáp ứng và tối ưu hóa chuẩn in bằng Tailwind CSS.",
      },
      challenges: {
        en: [
          "Allowing users to customize, reorder, and preview arbitrary CV sections in real time without lag.",
          "Exporting pixel-perfect print-ready PDFs directly on the client side without expensive server round-trips.",
        ],
        vi: [
          "Cho phép người dùng tùy biến, kéo thả sắp xếp lại và xem trước các phần của CV trong thời gian thực mượt mà.",
          "Xuất file PDF chuẩn in ấn trực tiếp trên trình duyệt mà không cần gửi yêu cầu xử lý nặng nề lên máy chủ.",
        ],
      },
      solutions: {
        en: [
          "Designed and implemented 5+ responsive, print-ready CV templates with Tailwind CSS, supporting both screen and PDF rendering.",
          "Built a fully dynamic drag-and-drop form builder allowing users to customize, reorder, and preview CV sections in real time.",
          "Integrated client-side PDF export using a headless rendering approach, enabling one-click CV download without server round-trips.",
          "Worked closely with UI/UX designers in weekly review cycles to ensure pixel-perfect implementation across devices.",
        ],
        vi: [
          "Thiết kế và lập trình 5+ mẫu CV thích ứng, chuẩn in ấn với Tailwind CSS, hỗ trợ cả hiển thị màn hình lẫn kết xuất PDF.",
          "Xây dựng trình tạo biểu mẫu kéo thả linh hoạt cho phép người dùng tùy chỉnh và xem trước các mục CV tức thì.",
          "Tích hợp xuất PDF client-side theo cơ chế render không giao diện (headless), cho phép tải CV 1-chạm mà không cần tải qua server.",
          "Phối hợp chặt chẽ với đội ngũ UI/UX trong các buổi đánh giá hàng tuần để đảm bảo độ chuẩn xác đến từng pixel.",
        ],
      },
      techStack: [
        "Nuxt 3",
        "Vue 3",
        "TypeScript",
        "Pinia",
        "Tailwind CSS",
        "Nuxt UI",
        "MongoDB",
        "Docker",
      ],
      architectureHighlights: {
        en: [
          "Dynamic drag-and-drop CV section reordering",
          "Headless client-side PDF compilation pipeline",
          "Print-ready responsive CSS layouts for A4 papers",
        ],
        vi: [
          "Cơ chế kéo thả sắp xếp lại các phần tử CV linh hoạt",
          "Quy trình xuất PDF trực tiếp trên client không tốn tài nguyên server",
          "Bố cục CSS chuẩn hóa khổ giấy in A4",
        ],
      },
    },
  ],
  experiences: [
    {
      id: "exp-nexsoft",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Lập Trình Front-End",
      },
      company: "Nexsoft Technology",
      location: "Vietnam",
      period: {
        en: "11/2025 - Present",
        vi: "11/2025 - Hiện tại",
      },
      type: {
        en: "Full-Time Enterprise",
        vi: "Toàn Thời Gian Doanh Nghiệp",
      },
      description: {
        en: "Key Front-End Developer across three flagship enterprise products: TBChat Web (Official Chat Web), TB Cloud Drive Web, and TB Admin (Nexsoft Admin).",
        vi: "Kỹ sư Front-End nòng cốt phụ trách 3 sản phẩm chủ lực: TBChat Web (Official Chat Web), TB Cloud Drive Web và TB Admin (Nexsoft Admin).",
      },
      achievements: {
        en: [
          "Architected real-time WebSocket communication layer with intelligent heartbeat detection, timeout recovery, and automatic reconnection for TBChat Web.",
          "Eliminated message duplication and layout jumping during concurrent media uploads using content hashing and optimistic UI rendering.",
          "Organized TB Cloud Drive codebase following strict Feature-Sliced Design (FSD) architecture across 6 distinct layers with Steiger boundaries.",
          "Built encrypted 'Privacy Space' module with PIN session management and automatic inactivity locking.",
          "Constructed tested, SSR/CSR-compatible design system primitives in Storybook for TB Admin, accelerating sprint velocity by ~25%.",
          "Engineered Web3 Wallet & Token Management: native token priority sorting, pagination, multi-network filtering, and Swap/Bridge dependency controls.",
        ],
        vi: [
          "Kiến trúc tầng truyền thông WebSocket thời gian thực với cơ chế phát hiện heartbeat thông minh, khôi phục timeout và tự động kết nối lại cho TBChat Web.",
          "Triệt tiêu trùng lặp tin nhắn và giật nhảy layout khi tải media đồng thời bằng hàm băm nội dung và render giao diện lạc quan.",
          "Tổ chức mã nguồn TB Cloud Drive theo chuẩn Feature-Sliced Design (FSD) 6 tầng phân lớp rõ ràng, kiểm soát chặt bằng Steiger.",
          "Xây dựng phân vùng bảo mật 'Không Gian Riêng Tư' bảo vệ bằng mã PIN tự động khóa an toàn khi không hoạt động.",
          "Thiết kế thư viện design system trên Storybook cho TB Admin tương thích SSR/CSR, tăng tốc độ hoàn thành sprint thêm 25%.",
          "Lập trình phân hệ Ví Web3 & Quản lý Token: sắp xếp ưu tiên token gốc, phân trang linh hoạt và kiểm soát logic Swap/Bridge đa mạng.",
        ],
      },
      skills: [
        "Nuxt 3 (SSR)",
        "Vue 3.5",
        "React 19",
        "Next.js 16",
        "TypeScript 5.8",
        "Feature-Sliced Design (FSD)",
        "Nx Monorepo",
        "WebSockets",
        "TanStack Query v5",
        "TanStack Table",
        "Storybook",
        "Zod",
        "Pinia",
        "Zustand",
        "LinguiJS",
      ],
      projectsIncluded: ["TBChat Web", "TB Cloud Drive Web", "TB Admin"],
    },
    {
      id: "exp-personal",
      role: {
        en: "Creator & Full-Stack Mobile Architect",
        vi: "Nhà Sáng Lập & Kiến Trúc Sư Full-Stack",
      },
      company: "Personal Projects (NOAN & HyFlim)",
      location: "Ho Chi Minh City, Vietnam",
      period: {
        en: "08/2026 - Present (NOAN) & 2024 - Present (HyFlim)",
        vi: "08/2026 - Hiện tại (NOAN) & 2024 - Hiện tại (HyFlim)",
      },
      type: {
        en: "Independent Products",
        vi: "Dự Án Sản Phẩm Độc Lập",
      },
      description: {
        en: "Built and launched end-to-end consumer platforms: NOAN (AI Smart Meal Planner & Voice-Guided Assistant with APK release) and HyFlim (Adaptive HLS movie streaming platform with standalone APK release).",
        vi: "Trực tiếp kiến trúc và phát hành 2 sản phẩm toàn diện: NOAN (Ứng dụng dinh dưỡng AI hỗ trợ trợ lý giọng nói tiếng Việt kèm bản cài APK) và HyFlim (Nền tảng xem phim trực tuyến HLS thích ứng kèm bản cài APK độc lập).",
      },
      achievements: {
        en: [
          "Hands-Free Voice Cooking ('Nấu cùng NOAN'): Integrated on-device Vietnamese Speech-to-Text (expo-speechrecognition with vi-VN models) for real-time cooking timer, step navigation, and ingredient queries.",
          "Designed deterministic nutritional meal planning engine enforcing BR-01–BR-05 calorie targets and allergy filters backed by BullMQ & Redis queues.",
          "Engineered high-throughput NestJS 11 backend over Fastify with PostgreSQL, Prisma ORM, AWS S3 presigned uploads, and Supabase JWT auth.",
          "Built HyFlim adaptive HLS streaming engine with GPU hardware acceleration, watch history sync across web and mobile, and production APK release.",
        ],
        vi: [
          "Tích hợp tính năng 'Nấu cùng NOAN' với nhận dạng giọng nói tiếng Việt on-device (expo-speechrecognition) giúp điều hướng công thức và hẹn giờ rảnh tay.",
          "Thiết kế thuật toán gợi ý thực đơn dinh dưỡng chuẩn hóa (BR-01–BR-05) vận hành trên hàng đợi bất đồng bộ BullMQ và Redis.",
          "Xây dựng backend NestJS 11 trên nền Fastify siêu tốc với PostgreSQL, Prisma ORM, tải tệp AWS S3 presigned URL và Supabase JWT.",
          "Phát triển trình phát phim HLS thích ứng HyFlim với bộ giải mã phần cứng GPU, đồng bộ lịch sử xem và phát hành bản cài đặt APK.",
        ],
      },
      skills: [
        "React Native (Expo 57)",
        "NativeWind 4",
        "Reanimated",
        "NestJS 11",
        "Fastify",
        "Prisma ORM",
        "PostgreSQL",
        "BullMQ",
        "Redis",
        "Next.js 15",
        "HLS.js",
        "Supabase",
        "OpenAI API",
        "AWS S3",
      ],
      projectsIncluded: ["NOAN (Mogu)", "HyFlim Streaming"],
    },
    {
      id: "exp-golivedev",
      role: {
        en: "Front-End Developer",
        vi: "Kỹ Sư Lập Trình Front-End",
      },
      company: "GoLiveDev Practical Technology Joint Stock Company",
      location: "Vietnam",
      period: {
        en: "09/2024 - 11/2025",
        vi: "09/2024 - 11/2025",
      },
      type: {
        en: "Core Team Member",
        vi: "Thành Viên Đội Ngũ Nòng Cốt",
      },
      description: {
        en: "Developed XEPO Platform (Personal bio pages, real-time communities, digital product stores with 60 team members) and TALIO (Online CV Builder with 30 team members).",
        vi: "Phát triển nền tảng XEPO (Trang bio cá nhân, kênh chat cộng đồng thời gian thực, bán khóa học trong đội ngũ 60 thành viên) và TALIO (Trình tạo CV trực tuyến trong đội ngũ 30 thành viên).",
      },
      achievements: {
        en: [
          "Architected and built a reusable component library for dashboards and profile pages, reducing feature development time across the team.",
          "Implemented real-time messaging and notification systems using WebSocket, ensuring smooth state synchronization across sessions.",
          "Designed and implemented 5+ responsive, print-ready CV templates with Tailwind CSS supporting both screen and PDF rendering.",
          "Built a fully dynamic drag-and-drop form builder allowing users to customize, reorder, and preview CV sections in real time.",
          "Integrated client-side PDF export using a headless rendering approach, enabling one-click CV download without server round-trips.",
        ],
        vi: [
          "Kiến trúc và xây dựng thư viện component tái sử dụng cho dashboard và profile, rút ngắn thời gian phát triển cho toàn đội ngũ.",
          "Triển khai hệ thống nhắn tin và thông báo thời gian thực bằng WebSocket, đảm bảo đồng bộ trạng thái trơn tru giữa các phiên.",
          "Thiết kế và lập trình 5+ mẫu CV thích ứng, chuẩn in ấn với Tailwind CSS hỗ trợ cả màn hình lẫn PDF.",
          "Xây dựng trình tạo biểu mẫu kéo thả linh hoạt cho phép tùy chỉnh và xem trước các mục CV tức thì.",
          "Tích hợp xuất PDF client-side theo cơ chế render headless, cho phép tải CV 1-chạm mà không cần qua server.",
        ],
      },
      skills: [
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "Tailwind CSS",
        "Pinia",
        "Nuxt UI",
        "NestJS",
        "MongoDB",
        "Docker",
        "WebSockets",
      ],
      projectsIncluded: ["XEPO Platform", "TALIO CV Builder"],
    },
    {
      id: "exp-nccplus",
      role: {
        en: "Back-End Developer",
        vi: "Kỹ Sư Lập Trình Back-End",
      },
      company: "NCCPLUS Vietnam Joint Stock Company",
      location: "Vietnam",
      period: {
        en: "05/2023 - 11/2023",
        vi: "05/2023 - 11/2023",
      },
      type: {
        en: "Project Contributor",
        vi: "Kỹ Sư Dự Án",
      },
      description: {
        en: "Back-end development and maintenance for an outsourced real estate platform built on WordPress, managing update requests through GitHub.",
        vi: "Phát triển và bảo trì hệ thống backend cho dự án bất động sản trên nền tảng WordPress, tiếp nhận và xử lý yêu cầu qua GitHub.",
      },
      achievements: {
        en: [
          "Responsible for back-end development, investigating root causes for client-reported monthly issues and proposing robust technical solutions.",
          "Implemented feature updates and bug fixes, authored PHPUnit test cases, and coordinated with testers for quality verification.",
        ],
        vi: [
          "Chịu trách nhiệm phát triển back-end, điều tra nguyên nhân gốc rễ các vấn đề kỹ thuật khách hàng báo cáo hàng tháng và đề xuất giải pháp tối ưu.",
          "Thực hiện viết mã tính năng, sửa lỗi, viết mã kiểm thử PHPUnit và phối hợp với kiểm thử viên đảm bảo chất lượng trước khi bàn giao.",
        ],
      },
      skills: [
        "PHP",
        "WordPress",
        "MySQL",
        "PHPUnit",
        "REST API",
        "GitHub",
      ],
    },
  ],
  skillCategories: [
    {
      title: {
        en: "Front-End Architecture",
        vi: "Kiến Trúc Front-End",
      },
      description: {
        en: "Modern high-performance architectures, state management, and component design systems",
        vi: "Kiến trúc web hiện đại hiệu năng cao, quản lý trạng thái và hệ thống thiết kế component",
      },
      skills: [
        { name: "Vue 3 & Nuxt 3 (SSR)", level: 96, iconName: "Layers", tag: "Expert" },
        { name: "React 19 & Next.js 16 (App Router)", level: 96, iconName: "Flame", tag: "Expert" },
        { name: "TypeScript & JavaScript", level: 98, iconName: "Code2", tag: "Master" },
        { name: "Tailwind CSS v4", level: 98, iconName: "Palette", tag: "Master" },
        { name: "Feature-Sliced Design (FSD)", level: 94, iconName: "Boxes", tag: "Advanced" },
        { name: "TanStack Suite (Query v5 / Table v8)", level: 95, iconName: "Table", tag: "Expert" },
        { name: "Pinia & Zustand", level: 95, iconName: "Cpu", tag: "Expert" },
        { name: "Reka UI / Shadcn UI / Storybook", level: 94, iconName: "Component", tag: "Expert" },
      ],
    },
    {
      title: {
        en: "Mobile Development",
        vi: "Phát Triển Di Động",
      },
      description: {
        en: "Cross-platform mobile apps with hardware APIs, on-device AI, and production APK packaging",
        vi: "Ứng dụng di động đa nền tảng với API phần cứng, AI on-device và đóng gói APK sản xuất",
      },
      skills: [
        { name: "React Native (Expo 57)", level: 94, iconName: "Smartphone", tag: "Expert" },
        { name: "NativeWind 4", level: 95, iconName: "Wind", tag: "Expert" },
        { name: "Reanimated", level: 92, iconName: "Activity", tag: "Advanced" },
        { name: "On-device Speech Recognition (STT/TTS vi-VN)", level: 90, iconName: "Mic", tag: "Advanced" },
        { name: "Android APK Packaging & Hermes", level: 92, iconName: "Package", tag: "Advanced" },
        { name: "Capacitor Mobile Shell", level: 88, iconName: "Boxes", tag: "Skilled" },
      ],
    },
    {
      title: {
        en: "Back-End & Realtime",
        vi: "Back-End & Thời Gian Thực",
      },
      description: {
        en: "High-concurrency microservices, realtime sockets, queues, and cloud integrations",
        vi: "Microservices chịu tải cao, socket thời gian thực, hàng đợi và tích hợp đám mây",
      },
      skills: [
        { name: "Node.js & NestJS 11 (Fastify/Express)", level: 92, iconName: "Server", tag: "Advanced" },
        { name: "Prisma ORM", level: 94, iconName: "FileCode", tag: "Expert" },
        { name: "BullMQ & Redis Queues", level: 90, iconName: "RefreshCw", tag: "Advanced" },
        { name: "WebSockets & WebRTC P2P", level: 92, iconName: "Radio", tag: "Advanced" },
        { name: "AWS S3 Presigned Workflows", level: 90, iconName: "Cloud", tag: "Advanced" },
        { name: "PHP & WordPress", level: 85, iconName: "FileText", tag: "Skilled" },
      ],
    },
    {
      title: {
        en: "Database, Tools & Soft Skills",
        vi: "Cơ Sở Dữ Liệu, Công Cụ & Kỹ Năng Mềm",
      },
      description: {
        en: "Relational/NoSQL databases, testing suites, monorepos, and technical leadership",
        vi: "Cơ sở dữ liệu quan hệ/NoSQL, bộ kiểm thử, monorepo và năng lực dẫn dắt kỹ thuật",
      },
      skills: [
        { name: "PostgreSQL & Supabase", level: 94, iconName: "Database", tag: "Expert" },
        { name: "MySQL & MongoDB", level: 90, iconName: "Server", tag: "Advanced" },
        { name: "Nx Monorepo & Vite 7", level: 94, iconName: "FolderGit2", tag: "Expert" },
        { name: "Vitest, Playwright & PHPUnit", level: 92, iconName: "CheckCircle2", tag: "Advanced" },
        { name: "System Architecture & Problem Solving", level: 95, iconName: "Gauge", tag: "Master" },
        { name: "Code Review & Mentoring", level: 92, iconName: "Users", tag: "Advanced" },
      ],
    },
  ],
};
