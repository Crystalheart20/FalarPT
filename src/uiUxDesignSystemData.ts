/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorSwatch {
  name: string;
  lightHex: string;
  darkHex: string;
  usage: string;
  contrastRatio: string;
}

export interface FontToken {
  tokenName: string;
  family: string;
  sizeMobile: string;
  sizeDesktop: string;
  lineHeight: string;
  weight: string;
}

export interface WireframeScreen {
  title: string;
  type: 'Public' | 'App';
  layoutDescription: string;
  keyUiElements: string[];
  interactionPattern: string;
}

export const brandIdentity = {
  positioning: "The Premium, Culturally Authentic Language Hub for European Portuguese (PT-PT). Designed to bridge the formal CEFR rules with the actual modern, fast-paced colloquial reality of Lisbon and Porto streets.",
  mission: "Democratize European Portuguese fluency by merging the psychological triggers of Duolingo's gaming core, Babbel's pragmatic clarity, and Spotify's audio responsive elegance.",
  personality: ["Warm & Welcoming", "Analytical & Structured", "Playfully Motivating", "Contemporary European Accent"],
  voiceTone: {
    rule: "Avoid Brazil-Brazilian Portuguese terminology (e.g., maintain 'autocarro' instead of 'ônibus', use formal tu/você alignments strictly as practiced under Lissabon standards).",
    examples: [
      { trigger: "User misses a task", tone: "Empathetic but direct. Sophia says: 'Quase lá! (Almost there!) Remember, in PT-PT, the pronouns usually precede negation.'" },
      { trigger: "Streak extension", tone: "Festive and high energy. 'Espetacular! A fortnight of consecutive learning! Your pronunciation sound is gaining real momentum.'" }
    ]
  }
};

export const colorsList: ColorSwatch[] = [
  {
    name: "Monumental Indigo (Primary)",
    lightHex: "#4F46E5",
    darkHex: "#6366F1",
    usage: "Primary branding key elements, CTA buttons, active progress rings, key learning selections.",
    contrastRatio: "4.8:1 (Passes WCAG AA standard)"
  },
  {
    name: "Lisbon Amber (Accent Highlight)",
    lightHex: "#D97706",
    darkHex: "#F59E0B",
    usage: "Streaks burning indicators, achievements unlock celebratory flares, primary reward crowns.",
    contrastRatio: "5.1:1"
  },
  {
    name: "Tejo Turquoise (Secondary Brand)",
    lightHex: "#0D9488",
    darkHex: "#14B8A6",
    usage: "Grammar lesson headers, verified native peer indicators, interactive audio recorder accents.",
    contrastRatio: "4.5:1"
  },
  {
    name: "Fado Forest (Success Node)",
    lightHex: "#059669",
    darkHex: "#10B981",
    usage: "Correct task review templates, completed unit maps checkblocks, level assessment tags.",
    contrastRatio: "4.9:1"
  },
  {
    name: "Algarve Rose (Error Indicator)",
    lightHex: "#E11D48",
    darkHex: "#F43F5E",
    usage: "Incorrect translation warnings, vital indicators depletion warning state.",
    contrastRatio: "4.6:1"
  },
  {
    name: "Atlantic Slate (Neutral Dark)",
    lightHex: "#1E293B",
    darkHex: "#0F172A",
    usage: "Body texts, subtext categories, dark layout card backdrops, navigation rail lines.",
    contrastRatio: "9.2:1 (AAA Absolute level)"
  },
  {
    name: "Sintra Mist (Neutral Background)",
    lightHex: "#F8FAFC",
    darkHex: "#020617",
    usage: "Default screen presentation color, quiet cards background, silent grid divisions.",
    contrastRatio: "N/A (Base Layer)"
  }
];

export const typographyTokens: FontToken[] = [
  {
    tokenName: "Display Hero (H1)",
    family: "Outfit / Space Grotesk (Tech & Friendly)",
    sizeMobile: "26px",
    sizeDesktop: "38px",
    lineHeight: "1.15",
    weight: "Black (900)"
  },
  {
    tokenName: "Section Name (H2)",
    family: "Outfit",
    sizeMobile: "20px",
    sizeDesktop: "24px",
    lineHeight: "1.25",
    weight: "Extrabold (800)"
  },
  {
    tokenName: "Card Title (H3)",
    family: "Outfit",
    sizeMobile: "16px",
    sizeDesktop: "18px",
    lineHeight: "1.3",
    weight: "Bold (700)"
  },
  {
    tokenName: "Body Prose",
    family: "Inter (Perfect UI Legibility)",
    sizeMobile: "14px",
    sizeDesktop: "15px",
    lineHeight: "1.6",
    weight: "Medium (500) & Regular (400)"
  },
  {
    tokenName: "Audio IPA & Metas",
    family: "JetBrains Mono (Phonetic precise notation)",
    sizeMobile: "11px",
    sizeDesktop: "12px",
    lineHeight: "1.4",
    weight: "Bold (700)"
  }
];

export const spacing4pxUnits = [
  { Token: "space-1", pixels: "4px", usage: "Extremely tight gaps between icons and labels, subtle pill inner buffers." },
  { Token: "space-2", pixels: "8px", usage: "Standard checklist elements padding, small card internal elements." },
  { Token: "space-3", pixels: "12px", usage: "Mobile navigation grid layout items spacing, buttons interior heights." },
  { Token: "space-4", pixels: "16px", usage: "Universally applied mobile page side margins, card external dividers, input gap." },
  { Token: "space-6", pixels: "24px", usage: "Standard desktop margins, gaps between full interactive exercises segments." },
  { Token: "space-8", pixels: "32px", usage: "Hero block top buffers, space separating learning levels in courses overview." }
];

export const userJourneys = [
  {
    stage: "1. Onboarding & Motivation Capture",
    steps: [
      "Landing entry highlighting premium Lisbon standard audio.",
      "Custom assessment objective query (Move to PT, Citizenship, Family ties, Hobby).",
      "CEFR Goal alignment: Casual (5 XP), Serious (20 XP), Insane (50 XP).",
      "Dynamic placement exam check or simple beginner unit entry initiation."
    ],
    experienceTactic: "We present a sliding progressive transition bar without any sign-up prompt. The user remains engaged until completing task #3, where next path requires simple email sync."
  },
  {
    stage: "2. The Daily Learning Ritual Loop",
    steps: [
      "Dynamic welcome banner showcasing active streak flame index and leaderboard bucket.",
      "Primary highlight: 'Recommended next training exercise' single green action trigger button.",
      "Completing exercises (Cloze testing, audio recorders, phonetic matches).",
      "Experience Reward screen showcasing expanding circular XP progress counter with celebratory slide."
    ],
    experienceTactic: "Micro-movements: Card answers pop-up on click-triggered haptics, success alerts trigger instant soft celebratory synth tones directly on audio devices."
  },
  {
    stage: "3. Speaking & AI Persona Interaction Flow",
    steps: [
      "Entry to 'Lisbon AI Cafe' tab - Select Portuguese AI Speaker (Sofia the baker, Marcos the tourist guide).",
      "Click-to-speak voice capture with transparent live level recording graph.",
      "Immediate AI Speech Feedback card overlay (Pronouncing rate percentages, detailed breakdown of Portuguese letter 'S' reductions)."
    ],
    experienceTactic: "Lowers anxiety by highlighting what was correct in Tejo Turquoise, and highlighting errors inalgarve rose with friendly correction overlays."
  }
];

export const screenMockups: WireframeScreen[] = [
  {
    title: "Primary Dashboard Hub",
    type: "App",
    layoutDescription: "Layout splits into persistent 3-column screen mapping on desktop, converting into mobile base stack bar.",
    keyUiElements: ["Left navigation drawer", "Middle linear lesson path containing level completion locks", "Right panel pinning Streaks, global competitive ladder, and vocabulary freeze card counters."],
    interactionPattern: "Fluid scrolling with sticky top HUD counters showing active XP, vital status, and language indicators."
  },
  {
    title: "Distraction-Free Course Map",
    type: "App",
    layoutDescription: "Curved central lesson pathway reminiscent of the classic Duolingo learning track, styled with elevated custom modern icons.",
    keyUiElements: ["Interactive level node bubbles", "Hover tooltips showing lesson syllabus details", "Unit mastery test buttons colored in Fado Forest Green."],
    interactionPattern: "Clicking a bubble expands dynamic modal from bottom showing XP cost and starting lesson trigger."
  },
  {
    title: "Speaking Accent Analyzer Studio",
    type: "App",
    layoutDescription: "Spacious interactive laboratory focusing purely on auditory training with minimal distractions.",
    keyUiElements: ["IPA phonetics dictionary blocks", "Microphone start panel presenting recording waveforms", "Accuracy dials and native peer pronunciations toggle."],
    interactionPattern: "Press and hold microphone triggering live canvas recordings, releasing calculates immediate acoustic accents."
  },
  {
    title: "AIMA & NIF Public Assistance Hub",
    type: "Public",
    layoutDescription: "Helpful informational landing assisting immigrants with bureaucratic Portuguese forms translations.",
    keyUiElements: ["Interactive Portuguese NIF form translation preview", "Expatriate community advice columns", "Premium legal translation pricing details."],
    interactionPattern: "Hovering over individual legal terms inside mock forms translates them instantly into English subtitles."
  }
];

export const accessibilityGuidelines = [
  "Strict Font Sizing Limits: All body texts are forced to inherit minimum 14px size metrics on smartphones.",
  "Contrast Verification checks: Interactive primary states (including Button prompts, checklist grids) enforce a contrast scale higher than 4.5:1.",
  "Reduced Motion Media queries: Tailwind class 'motion-safe' applies to all streak flames and progress widgets to prevent vestal sensory overload.",
  "Aria Landmark boundaries: Screen readers map structured tabs, input headers, and flashcard elements logically via Tab key Indexes."
];
