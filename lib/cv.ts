/**
 * Single source of truth for all site content, keyed by locale.
 *
 * - Language-independent data (contact details, URLs, tech names, section ids)
 *   is defined once in the "shared" block below.
 * - Every user-visible string lives in `content[locale]`. Both locales are
 *   typed as `Content`, so a missing translation is a compile error.
 *
 * Inline markup used in text fields (rendered by components/RichText):
 *   **text**  -> <strong>
 *   *text*    -> <em>
 */

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/* ───────────────────────── Types ───────────────────────── */

export type SectionId =
  | "about"
  | "highlights"
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "contact";

export type NavLink = { label: string; href: `#${SectionId}` };

export type Stat = { value: string; label: string };

export type CodeTokenKind = "plain" | "kw" | "fn" | "str" | "cm";
export type CodeToken = { kind: CodeTokenKind; text: string };
export type CodeLine = { indent: number; tokens: CodeToken[] };

export type Highlight = {
  featured?: boolean;
  badge: string;
  title: string;
  description: string;
  tech: readonly string[];
  company: string;
  period?: string;
  code?: CodeLine[];
};

export type Project = {
  title: string;
  summary: string;
  tech: readonly string[];
  /** Path under /public (e.g. "/projects/bolao-copa.png"). Placeholder is shown while unset. */
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  tech: readonly string[];
  bullets: string[];
};

export type EducationItem = {
  course: string;
  institution: string;
  period: string;
};

export type Language = { name: string; level: string };

export type SkillGroup = { title: string; items: readonly string[] };

export type SectionHeading = {
  id: SectionId;
  label: string;
  /** Each entry is one line of the h2. */
  title: string[];
};

export type HeroAction = {
  label: string;
  href: string;
  variant: "primary" | "ghost";
  external: boolean;
};

export type ContactLink = {
  kind: "email" | "linkedin" | "github";
  label: string;
  href: string;
};

export type Content = {
  locale: {
    /** Value for <html lang>. */
    htmlLang: string;
    /** Open Graph locale. */
    ogLocale: string;
    /** URL path this locale is served at. */
    path: string;
  };
  /** Link to the other locale, written in the target language. */
  languageSwitch: {
    label: string;
    ariaLabel: string;
    href: string;
    hrefLang: string;
  };
  ui: {
    skipToContent: string;
    navLabel: string;
    themeToggleLabel: string;
    themeToggleTitle: string;
    stackLabel: string;
    techLabel: string;
    imagePlaceholder: string;
    repoLabel: string;
    liveLabel: string;
  };
  profile: {
    name: string;
    shortName: string;
    logo: string;
    role: string;
    location: {
      city: string;
      state: string;
      stateCode: string;
      country: string;
      countryCode: string;
    };
    email: string;
    linkedin: { label: string; url: string };
    github: { label: string; url: string };
    cvPath: string;
  };
  seo: { title: string; description: string };
  nav: NavLink[];
  hero: {
    tag: string;
    /** Each entry is one line of the h1. */
    title: string[];
    sub: string;
    actions: HeroAction[];
    stack: readonly string[];
  };
  about: {
    heading: SectionHeading;
    paragraphs: string[];
    stats: Stat[];
  };
  highlights: { heading: SectionHeading; items: Highlight[] };
  projects: { heading: SectionHeading; items: Project[] };
  experience: { heading: SectionHeading; items: ExperienceItem[] };
  education: {
    heading: SectionHeading;
    items: EducationItem[];
    languagesTitle: string;
    languages: Language[];
  };
  skills: { heading: SectionHeading; groups: SkillGroup[] };
  contact: { heading: SectionHeading; sub: string; links: ContactLink[] };
  footer: { text: string };
};

/* ─────────────── Shared (language-independent) ─────────────── */

const EMAIL = "danielluan.dev@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/danluan";
const GITHUB_URL = "https://github.com/danluan";
/** The only résumé available is the Portuguese one. */
const CV_PATH = "/cv-daniel-luan-pt.pdf";

const PATHS: Record<Locale, string> = { en: "/", pt: "/pt" };
const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };

const identity = {
  name: "Daniel Luan Lourenço de Lima",
  shortName: "Daniel Luan",
  logo: "daniel.luan",
  email: EMAIL,
  linkedin: { label: "LinkedIn", url: LINKEDIN_URL },
  github: { label: "GitHub", url: GITHUB_URL },
  cvPath: CV_PATH,
};

const place = {
  city: "Parnamirim",
  state: "Rio Grande do Norte",
  stateCode: "RN",
  countryCode: "BR",
};

const COMPANY = {
  gertec: "IMD/UFRN – GERTEC",
  cda: "CDA Distribuidora",
  ifrnCvt: "IFRN – Centro Vocacional Tecnológico Espacial",
};

const INSTITUTION = {
  ufrn: "Universidade Federal do Rio Grande do Norte (UFRN)",
  ifrn: "Instituto Federal do Rio Grande do Norte (IFRN)",
};

const HERO_STACK = [
  "Node.js",
  "TypeScript",
  "React",
  "Angular",
  "Java",
  "Spring Boot",
  "Kotlin",
  "AWS",
  "Docker",
] as const;

const HIGHLIGHT_TECH = {
  remoteAccess: ["Node.js", "Express", "Kotlin", "AWS Lambda", "AWS Chime", "Redis"],
  videoSharing: ["Kotlin", "Samsung Knox", "JNI"],
  apn: ["Express", "Angular", "AWS IoT Core"],
  fleet: ["Java", "Spring Boot", "React", "Oracle Database"],
  reports: ["Python", "PL/SQL", "Oracle Database", "Oracle APEX"],
} as const;

/** Language-independent project data. Add `image` here once the screenshots exist. */
const PROJECT_BASE = {
  myneServer: {
    title: "MYneServer",
    tech: ["NestJS", "TypeORM", "PostgreSQL", "Docker", "Next.js"],
  },
  serviceLink: {
    title: "ServiceLink",
    tech: ["Java", "Spring Boot", "Next.js", "TypeScript", "Gemini"],
    repoUrl: `${GITHUB_URL}/serviceLink`,
  },
  seuJob: {
    title: "seuJOB",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Eureka", "Python", "Gemini"],
    repoUrl: `${GITHUB_URL}/seuJobAPI`,
  },
  bolaoCopa: {
    title: "Bolão Copa 2026",
    tech: ["Next.js", "TypeScript", "libSQL / Turso", "Vercel"],
    repoUrl: `${GITHUB_URL}/bolao-copa`,
    liveUrl: "https://bolao-copa-rn.vercel.app",
  },
} satisfies Record<string, Omit<Project, "summary">>;

const EXPERIENCE_TECH = {
  gertec: ["Node.js", "Express", "Kotlin", "AWS Lambda", "AWS Chime"],
  cdaDeveloper: [
    "Java",
    "Spring Boot",
    "React",
    "Flutter",
    "Python",
    "PL/SQL",
    "Oracle Database",
  ],
  cdaIntern: ["Python", "Oracle APEX", "JavaScript"],
  ifrn: ["ESP32-CAM", "Arduino", "Zigbee", "HTML", "CSS", "JavaScript"],
} as const;

/** Group titles and item names are the same in both locales. */
const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "Java",
      "Spring Boot",
      "Kotlin",
      "Python",
      "MySQL",
      "PostgreSQL",
      "Oracle Database",
      "PL/SQL",
      "Redis",
    ],
  },
  {
    title: "Frontend",
    items: ["React.js", "Angular 8/15+", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "DevOps / Cloud",
    items: [
      "AWS",
      "GCP",
      "Digital Ocean",
      "OCI",
      "Git",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
];

const CONTACT_LINKS: ContactLink[] = [
  { kind: "email", label: EMAIL, href: `mailto:${EMAIL}` },
  { kind: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { kind: "github", label: "GitHub", href: GITHUB_URL },
];

const FOOTER_TEXT = `${identity.shortName} · ${place.city}, ${place.stateCode}`;

const t = (kind: CodeTokenKind, text: string): CodeToken => ({ kind, text });

/**
 * Purely decorative sketch for the featured card: not real code, identifiers
 * or metrics. Only the comment line is localized.
 */
const sessionSketch = (comment: string): CodeLine[] => [
  { indent: 0, tokens: [t("cm", `// ${comment}`)] },
  {
    indent: 0,
    tokens: [
      t("kw", "async function"),
      t("plain", " "),
      t("fn", "joinSession"),
      t("plain", "(terminal) {"),
    ],
  },
  {
    indent: 1,
    tokens: [
      t("kw", "let"),
      t("plain", " session = "),
      t("kw", "await"),
      t("plain", " "),
      t("str", "cache"),
      t("plain", "."),
      t("fn", "get"),
      t("plain", "(terminal);"),
    ],
  },
  { indent: 1, tokens: [t("kw", "if"), t("plain", " (!session) {")] },
  {
    indent: 2,
    tokens: [
      t("plain", "session = "),
      t("kw", "await"),
      t("plain", " "),
      t("fn", "createSession"),
      t("plain", "(terminal);"),
    ],
  },
  {
    indent: 2,
    tokens: [
      t("kw", "await"),
      t("plain", " "),
      t("str", "cache"),
      t("plain", "."),
      t("fn", "set"),
      t("plain", "(terminal, session);"),
    ],
  },
  { indent: 1, tokens: [t("plain", "}")] },
  {
    indent: 1,
    tokens: [
      t("kw", "return"),
      t("plain", " "),
      t("fn", "connect"),
      t("plain", "(session);"),
    ],
  },
  { indent: 0, tokens: [t("plain", "}")] },
];

/* ───────────────────────── English ───────────────────────── */

const en: Content = {
  locale: { htmlLang: HTML_LANG.en, ogLocale: "en_US", path: PATHS.en },
  languageSwitch: {
    label: "PT",
    ariaLabel: "Ver em português",
    href: PATHS.pt,
    hrefLang: HTML_LANG.pt,
  },
  ui: {
    skipToContent: "Skip to content",
    navLabel: "Sections",
    themeToggleLabel: "Switch between light and dark theme",
    themeToggleTitle: "Toggle theme",
    stackLabel: "Main technologies",
    techLabel: "Technologies",
    imagePlaceholder: "Image coming soon",
    repoLabel: "View on GitHub →",
    liveLabel: "Open app ↗",
  },
  profile: {
    ...identity,
    role: "Full Stack Developer",
    location: { ...place, country: "Brazil" },
  },
  seo: {
    title: "Daniel Luan — Full Stack Developer",
    description:
      "Portfolio of Daniel Luan, a full stack developer in Parnamirim, RN, Brazil. Node.js, Java and Spring Boot on the backend, React and Angular on the frontend, and AWS in the cloud.",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Highlights", href: "#highlights" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    tag: "Full Stack Developer · Parnamirim, RN · Brazil",
    title: ["Daniel Luan Lourenço"],
    sub: "**Full Stack Developer** at IMD/UFRN – GERTEC. I work with Node.js, Java and Spring Boot on the backend, React and Angular on the frontend, and AWS in the cloud, with a focus on performance, stability and user experience.",
    actions: [
      { label: "See experience", href: "#experience", variant: "primary", external: false },
      { label: "Get in touch", href: `mailto:${EMAIL}`, variant: "ghost", external: false },
      { label: "Résumé (PT) ↗", href: CV_PATH, variant: "ghost", external: true },
    ],
    stack: HERO_STACK,
  },
  about: {
    heading: {
      id: "about",
      label: "About",
      title: ["Full stack by training,", "*engineer* by practice."],
    },
    paragraphs: [
      "I'm a full stack developer in Parnamirim/RN and have been working professionally in web development since 2022. Today I work at **IMD/UFRN – GERTEC** on remote access to payment terminals, aiming for performance, stability and a good experience for the people who use it.",
      "Before that, at **CDA Distribuidora**, I maintained and evolved a corporate platform for commercial agreements and fleet control integrated with the ERP, automating processes with Spring Boot, React, Python and Oracle.",
      "I hold a bachelor's degree in **Information Technology from UFRN** and am studying **Software Engineering** at the same university. I like building reusable components and encouraging good engineering practices on the team.",
    ],
    stats: [
      { value: "3+", label: "Years of professional experience" },
      { value: "3", label: "Clouds day to day: AWS, GCP and OCI" },
      { value: "2", label: "Degrees at UFRN: IT and Software Engineering" },
      { value: "'25", label: "B.Sc. in IT from UFRN" },
    ],
  },
  highlights: {
    heading: { id: "highlights", label: "Highlights", title: ["What I've *built*."] },
    items: [
      {
        featured: true,
        badge: "Real time · Cloud",
        title: "Simultaneous remote access to payment terminals",
        description:
          "Simultaneous remote access to payment terminals, with a Redis cache system that manages multiple sessions at the same time with low latency and high platform responsiveness.",
        tech: HIGHLIGHT_TECH.remoteAccess,
        company: COMPANY.gertec,
        period: "2024 – present",
        code: sessionSketch("illustrative: remote access session"),
      },
      {
        badge: "Android · Native",
        title: "Native video sharing on Samsung devices",
        description:
          "Native video sharing solution using the Knox library and JNI, with performance and streaming quality far superior to traditional methods.",
        tech: HIGHLIGHT_TECH.videoSharing,
        company: COMPANY.gertec,
      },
      {
        badge: "IoT · Full stack",
        title: "Terminal APN management",
        description:
          "System for managing terminal APNs, integrated with the Gertec Box installed on the devices.",
        tech: HIGHLIGHT_TECH.apn,
        company: COMPANY.gertec,
      },
      {
        badge: "ERP · Operations",
        title: "Vehicle entry and exit control",
        description:
          "Fleet control module with a pre-clearance flow and driver-vehicle linking via QR Code, integrated with the ERP.",
        tech: HIGHLIGHT_TECH.fleet,
        company: COMPANY.cda,
      },
      {
        badge: "Data · Automation",
        title: "Reports and analyses from the ERP",
        description:
          "Product, inventory, sales and billing reports modeled straight from the ERP database, with automated report generation and e-mail monitoring.",
        tech: HIGHLIGHT_TECH.reports,
        company: COMPANY.cda,
      },
    ],
  },
  projects: {
    heading: { id: "projects", label: "Projects", title: ["Beyond the *day job*."] },
    items: [
      {
        ...PROJECT_BASE.myneServer,
        summary:
          "Web app for creating and managing your own Minecraft servers. A NestJS API provisions each server as a Docker container, with JWT authentication and per-server properties, behind a Next.js frontend. Work in progress.",
      },
      {
        ...PROJECT_BASE.serviceLink,
        summary:
          "Platform that connects clients to service providers, with scheduling, reviews and an LLM assistant that answers common questions and helps put quotes together. Built by a team of three for a university course.",
      },
      {
        ...PROJECT_BASE.seuJob,
        summary:
          "A fictional job board built three ways: a Spring Boot REST API with JWT authentication, a microservices version with service discovery and a gateway, and JOBinho, a Telegram bot that reviews résumés with Gemini.",
      },
      {
        ...PROJECT_BASE.bolaoCopa,
        summary:
          "World Cup 2026 prediction pool: public ranking, live scores pulled from ESPN's public scoreboard, and an admin panel to manage participants and predictions.",
      },
    ],
  },
  experience: {
    heading: { id: "experience", label: "Experience", title: ["Where I've *worked*."] },
    items: [
      {
        role: "Full Stack Web Developer",
        company: COMPANY.gertec,
        period: "Nov 2024 – Present",
        tech: EXPERIENCE_TECH.gertec,
        bullets: [
          "Worked on **remote access to payment terminals**, focusing on improving performance, stability and user experience.",
          "Worked on the development of **simultaneous remote access** using **Node.js, Express, Kotlin, AWS Lambda and AWS Chime**. A Redis cache system makes it possible to manage multiple simultaneous sessions with low latency and high platform responsiveness.",
          "Implemented native video sharing solutions on Samsung devices using the **Knox library and JNI**, drastically improving streaming performance and quality compared with traditional methods.",
          "Developed a system for managing terminal APNs using **Express, Angular and AWS IoT Core**, integrating it with the Gertec Box installed on the terminals.",
          "Built **reusable components** and contributed to standardizing development, encouraging code reuse and good engineering practices.",
        ],
      },
      {
        role: "Full Stack Web Developer",
        company: COMPANY.cda,
        period: "Jan 2023 – Nov 2024",
        tech: EXPERIENCE_TECH.cdaDeveloper,
        bullets: [
          "Worked on the **maintenance and evolution** of a corporate platform for commercial agreements and fleet control, focusing on process automation and UX improvements.",
          "Developed features with **Spring Boot** and **React** for ERP-integrated systems, supporting internal operations and business rules.",
          "Developed a **vehicle entry and exit control** module, including a pre-clearance flow with driver-vehicle linking via **QR Code**.",
          "Created product and inventory reports and analyses from the ERP database, modeling queries in **Python**, **PL/SQL** and **Oracle Database** for better readability and operational support.",
        ],
      },
      {
        role: "IT Intern",
        company: COMPANY.cda,
        period: "Dec 2022 – Jan 2023",
        tech: EXPERIENCE_TECH.cdaIntern,
        bullets: [
          "Developed **Python automations** to generate sales, billing and trend reports based on ERP-integrated data.",
          "Took part in developing small applications with **Oracle APEX** and **JavaScript** to monitor the receipt and expiration of goods by e-mail.",
        ],
      },
      {
        role: "Outreach Project Fellow",
        company: COMPANY.ifrnCvt,
        period: "Oct 2019 – Mar 2021",
        tech: EXPERIENCE_TECH.ifrn,
        bullets: [
          "Took part in research on **NanoSat monitoring** using **ESP32-CAM**.",
          "Organized workshops on assembling an **educational CubeSat** with **Arduino Mega**, sensors and real-time communication via **Zigbee**.",
          "Developed educational games with **HTML**, **CSS** and **JavaScript** for 6th to 9th grade students.",
          "Gave seminars and presentations on aerospace technologies, communication networks and embedded systems.",
        ],
      },
    ],
  },
  education: {
    heading: { id: "education", label: "Education", title: ["Where I've *studied*."] },
    items: [
      {
        course: "Software Engineering",
        institution: INSTITUTION.ufrn,
        period: "Aug 2025 – Present",
      },
      {
        course: "B.Sc. in Information Technology",
        institution: INSTITUTION.ufrn,
        period: "Jul 2021 – Jun 2025",
      },
      {
        course: "Technical High School Diploma in Mechatronics",
        institution: INSTITUTION.ifrn,
        period: "Mar 2017 – Feb 2021",
      },
    ],
    languagesTitle: "Languages",
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Advanced" },
    ],
  },
  skills: {
    heading: { id: "skills", label: "Skills", title: ["What I *work with*."] },
    groups: SKILL_GROUPS,
  },
  contact: {
    heading: {
      id: "contact",
      label: "Contact",
      title: ["Let's build something *together*."],
    },
    sub: "If you have a project, a job opening or just want to talk about software development, send me a message.",
    links: CONTACT_LINKS,
  },
  footer: { text: FOOTER_TEXT },
};

/* ──────────────────────── Português ──────────────────────── */

const pt: Content = {
  locale: { htmlLang: HTML_LANG.pt, ogLocale: "pt_BR", path: PATHS.pt },
  languageSwitch: {
    label: "EN",
    ariaLabel: "View in English",
    href: PATHS.en,
    hrefLang: HTML_LANG.en,
  },
  ui: {
    skipToContent: "Pular para o conteúdo",
    navLabel: "Seções",
    themeToggleLabel: "Alternar entre tema claro e escuro",
    themeToggleTitle: "Alternar tema",
    stackLabel: "Principais tecnologias",
    techLabel: "Tecnologias",
    imagePlaceholder: "Imagem em breve",
    repoLabel: "Ver no GitHub →",
    liveLabel: "Abrir app ↗",
  },
  profile: {
    ...identity,
    role: "Desenvolvedor Fullstack",
    location: { ...place, country: "Brasil" },
  },
  seo: {
    title: "Daniel Luan — Desenvolvedor Fullstack",
    description:
      "Portfólio de Daniel Luan, desenvolvedor fullstack em Parnamirim/RN. Node.js, Java e Spring Boot no backend, React e Angular no frontend e AWS na nuvem.",
  },
  nav: [
    { label: "Sobre", href: "#about" },
    { label: "Destaques", href: "#highlights" },
    { label: "Projetos", href: "#projects" },
    { label: "Experiência", href: "#experience" },
    { label: "Formação", href: "#education" },
    { label: "Competências", href: "#skills" },
    { label: "Contato", href: "#contact" },
  ],
  hero: {
    tag: "Desenvolvedor Fullstack · Parnamirim, RN · Brasil",
    title: ["Daniel Luan Lourenço"],
    sub: "**Desenvolvedor Fullstack** no IMD/UFRN – GERTEC. Trabalho com Node.js, Java e Spring Boot no backend, React e Angular no frontend e AWS na nuvem, com foco em performance, estabilidade e experiência do usuário.",
    actions: [
      { label: "Ver experiência", href: "#experience", variant: "primary", external: false },
      { label: "Fale comigo", href: `mailto:${EMAIL}`, variant: "ghost", external: false },
      { label: "Currículo ↗", href: CV_PATH, variant: "ghost", external: true },
    ],
    stack: HERO_STACK,
  },
  about: {
    heading: {
      id: "about",
      label: "Sobre",
      title: ["Fullstack por formação,", "*engenheiro* por prática."],
    },
    paragraphs: [
      "Sou desenvolvedor fullstack em Parnamirim/RN e atuo profissionalmente com desenvolvimento web desde 2022. Hoje trabalho no **IMD/UFRN – GERTEC** com acesso remoto de terminais de pagamento, buscando performance, estabilidade e uma boa experiência para quem usa.",
      "Antes disso, na **CDA Distribuidora**, mantive e evoluí uma plataforma corporativa de acordos comerciais e controle de frota integrada ao ERP, automatizando processos com Spring Boot, React, Python e Oracle.",
      "Sou bacharel em **Tecnologia da Informação pela UFRN** e curso **Engenharia de Software** na mesma universidade. Gosto de construir componentes reutilizáveis e de incentivar boas práticas de engenharia no time.",
    ],
    stats: [
      { value: "3+", label: "Anos de experiência profissional" },
      { value: "3", label: "Nuvens no dia a dia: AWS, GCP e OCI" },
      { value: "2", label: "Formações na UFRN: BTI e Eng. de Software" },
      { value: "'25", label: "Bacharel em TI pela UFRN" },
    ],
  },
  highlights: {
    heading: { id: "highlights", label: "Destaques", title: ["O que eu já *construí*."] },
    items: [
      {
        featured: true,
        badge: "Tempo real · Cloud",
        title: "Acesso remoto simultâneo de terminais de pagamento",
        description:
          "Acesso remoto simultâneo a terminais de pagamento, com um sistema de cache em Redis que gerencia múltiplas sessões ao mesmo tempo com baixa latência e alta responsividade da plataforma.",
        tech: HIGHLIGHT_TECH.remoteAccess,
        company: COMPANY.gertec,
        period: "2024 – atual",
        code: sessionSketch("ilustrativo: sessão de acesso remoto"),
      },
      {
        badge: "Android · Nativo",
        title: "Compartilhamento de vídeo nativo em dispositivos Samsung",
        description:
          "Solução nativa de compartilhamento de vídeo usando a lib Knox e JNI, com performance e qualidade de transmissão muito superiores aos meios tradicionais.",
        tech: HIGHLIGHT_TECH.videoSharing,
        company: COMPANY.gertec,
      },
      {
        badge: "IoT · Fullstack",
        title: "Gerenciamento de APNs de terminais",
        description:
          "Sistema para gerenciar APNs de terminais, integrado ao Gertec Box instalado nos dispositivos.",
        tech: HIGHLIGHT_TECH.apn,
        company: COMPANY.gertec,
      },
      {
        badge: "ERP · Operações",
        title: "Controle de entrada e saída de veículos",
        description:
          "Módulo de controle de frota com fluxo de pré-liberação e vínculo motorista-veículo via QR Code, integrado ao ERP.",
        tech: HIGHLIGHT_TECH.fleet,
        company: COMPANY.cda,
      },
      {
        badge: "Dados · Automação",
        title: "Relatórios e análises a partir do ERP",
        description:
          "Relatórios de produtos, estoque, vendas e faturamento modelados direto do banco do ERP, com automações de emissão e monitoramento por e-mail.",
        tech: HIGHLIGHT_TECH.reports,
        company: COMPANY.cda,
      },
    ],
  },
  projects: {
    heading: { id: "projects", label: "Projetos", title: ["Além do *trabalho*."] },
    items: [
      {
        ...PROJECT_BASE.myneServer,
        summary:
          "Webapp para criar e gerenciar seus próprios servidores de Minecraft. Uma API em NestJS provisiona cada servidor como um container Docker, com autenticação JWT e propriedades por servidor, por trás de um frontend em Next.js. Em desenvolvimento.",
      },
      {
        ...PROJECT_BASE.serviceLink,
        summary:
          "Plataforma que conecta clientes a prestadores de serviço, com agendamentos, avaliações e um assistente com LLM que responde dúvidas frequentes e ajuda a montar orçamentos. Feito em um time de três para uma disciplina da universidade.",
      },
      {
        ...PROJECT_BASE.seuJob,
        summary:
          "Um portal de vagas fictício construído de três formas: uma API REST em Spring Boot com autenticação JWT, uma versão em microsserviços com descoberta de serviços e gateway, e o JOBinho, um bot de Telegram que analisa currículos com Gemini.",
      },
      {
        ...PROJECT_BASE.bolaoCopa,
        summary:
          "Bolão da Copa do Mundo 2026: ranking público, placar ao vivo a partir do scoreboard público da ESPN e painel administrativo para gerenciar participantes e palpites.",
      },
    ],
  },
  experience: {
    heading: {
      id: "experience",
      label: "Experiência",
      title: ["Onde eu já *trabalhei*."],
    },
    items: [
      {
        role: "Desenvolvedor Web Full Stack",
        company: COMPANY.gertec,
        period: "Nov/2024 – Atual",
        tech: EXPERIENCE_TECH.gertec,
        bullets: [
          "Atuei no **acesso remoto de terminais de pagamento**, com foco em melhoria de performance, estabilidade e experiência do usuário.",
          "Trabalhei no desenvolvimento do **acesso remoto simultâneo** utilizando **Node.js, Express, Kotlin, AWS Lambda e AWS Chime**. Através de um sistema de cache no Redis, é possível gerenciar múltiplos acessos simultâneos com baixa latência e alta responsividade da plataforma.",
          "Implementei soluções nativas de compartilhamento de vídeo em dispositivos Samsung usando a **lib Knox e JNI**, melhorando drasticamente a performance e qualidade da transmissão comparada com meios tradicionais.",
          "Desenvolvi um sistema para gerenciar APNs de terminais usando **Express, Angular e AWS IoT Core**, fazendo uma integração com o Gertec Box instalado nos terminais.",
          "Construí **componentes reutilizáveis** e contribuí para a padronização do desenvolvimento, incentivando reuso de código e boas práticas de engenharia.",
        ],
      },
      {
        role: "Desenvolvedor Web Full Stack",
        company: COMPANY.cda,
        period: "Jan/2023 – Nov/2024",
        tech: EXPERIENCE_TECH.cdaDeveloper,
        bullets: [
          "Atuei na **manutenção e evolução** de plataforma corporativa de acordos comerciais e controle de frota, com foco em automação de processos e melhoria de UX.",
          "Desenvolvi funcionalidades com **Spring Boot** e **React** para sistemas integrados ao ERP, apoiando operações internas e regras de negócio.",
          "Desenvolvi um módulo de **controle de entrada e saída de veículos**, incluindo fluxo de pré-liberação com vínculo motorista-veículo via **QR Code**.",
          "Criei relatórios e análises de produtos e estoque a partir do banco do ERP, modelando consultas em **Python**, **PL/SQL** e **Oracle Database** para maior legibilidade e apoio operacional.",
        ],
      },
      {
        role: "Estagiário de TI",
        company: COMPANY.cda,
        period: "Dez/2022 – Jan/2023",
        tech: EXPERIENCE_TECH.cdaIntern,
        bullets: [
          "Desenvolvi **automações em Python** para emissão de relatórios de vendas, faturamento e tendências com base em dados integrados ao ERP.",
          "Participei do desenvolvimento de pequenas aplicações com **Oracle APEX** e **JavaScript** para monitoramento de recebimento e vencimento de mercadorias por e-mail.",
        ],
      },
      {
        role: "Bolsista de Projeto de Extensão",
        company: COMPANY.ifrnCvt,
        period: "Out/2019 – Mar/2021",
        tech: EXPERIENCE_TECH.ifrn,
        bullets: [
          "Participei de pesquisas voltadas ao **monitoramento de NanoSats** com uso de **ESP32-CAM**.",
          "Organizei workshops para montagem de **CubeSat educacional** com **Arduino Mega**, sensores e comunicação em tempo real via **Zigbee**.",
          "Desenvolvi jogos educacionais com **HTML**, **CSS** e **JavaScript** para alunos do 6º ao 9º ano.",
          "Realizei seminários e apresentações sobre tecnologias aeroespaciais, redes de comunicação e sistemas embarcados.",
        ],
      },
    ],
  },
  education: {
    heading: { id: "education", label: "Formação", title: ["Onde eu *estudei*."] },
    items: [
      {
        course: "Engenharia de Software",
        institution: INSTITUTION.ufrn,
        period: "Ago/2025 – Atual",
      },
      {
        course: "Bacharelado em Tecnologia da Informação",
        institution: INSTITUTION.ufrn,
        period: "Jul/2021 – Jun/2025",
      },
      {
        course: "Ensino Médio Técnico em Mecatrônica",
        institution: INSTITUTION.ifrn,
        period: "Mar/2017 – Fev/2021",
      },
    ],
    languagesTitle: "Idiomas",
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Avançado" },
    ],
  },
  skills: {
    heading: {
      id: "skills",
      label: "Competências",
      title: ["Com o que eu *trabalho*."],
    },
    groups: SKILL_GROUPS,
  },
  contact: {
    heading: {
      id: "contact",
      label: "Contato",
      title: ["Vamos construir algo *juntos*."],
    },
    sub: "Se você tem um projeto, uma vaga ou só quer trocar uma ideia sobre desenvolvimento, me manda uma mensagem.",
    links: CONTACT_LINKS,
  },
  footer: { text: FOOTER_TEXT },
};

export const content: Record<Locale, Content> = { en, pt };
