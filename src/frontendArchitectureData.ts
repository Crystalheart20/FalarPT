/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComponentSpec {
  name: string;
  category: 'Layout' | 'Learning' | 'Gamification' | 'AI';
  purpose: string;
  props: string;
  state: string;
  accessibility: string;
}

export interface RouteSpec {
  path: string;
  type: 'Public' | 'Protected' | 'Admin';
  purpose: string;
  caching: string;
}

export const projectFolderStructure = `
falar-portugues-frontend/
├── .env.example                # Dynamic env specifications (API nodes, OAuth ids, Stripe keys)
├── next.config.ts              # Custom Next.js 15 routing, standalone building & PWA SW settings
├── package.json                # React 19, Next 15, TanStack Query 5, Zustand 5, Framer Motion
├── tailwind.config.ts          # Core styling, custom typography, spacing ratios, design colors
│
├── public/
│   ├── manifest.json           # Progressive Web App configuration file
│   ├── service-worker.js       # Background offline precaching, dynamic intercepting, and background syncs
│   └── locales/                # Static i18n dictionary scopes
│       ├── en/                 # English dictionary strings (common.json, courses.json, errors.json)
│       ├── pt-PT/              # Portuguese localization strings
│       └── [fr|es|de|ar]/      # Multi-language translations support scopes
│
└── src/
    ├── app/                    # Next.js 15 App Router directory (Layout-first system)
    │   ├── layout.tsx          # Master HTML root structure, next-intl providers, state hydration
    │   ├── page.tsx            # Highly-interactive root welcome dashboard (landing spec)
    │   ├── pricing/            # Tier packages catalog layout (Stripe subscriptions trigger routes)
    │   ├── login/              # Standard authentication page (NextAuth credentials/SSO client forms)
    │   │   └── page.tsx
    │   ├── dashboard/          # Student main learning path overview and progress graphs
    │   │   ├── page.tsx
    │   │   └── layout.tsx      # Persistent Sidebar and header controls layout binding
    │   ├── courses/            # Catalog grid highlighting available regional tongue lessons
    │   │   ├── page.tsx
    │   │   └── [slug]/         # Specific course units overview paths (eg. /courses/en-to-pt)
    │   ├── lesson/             # Standalone distraction-free lesson wizard (Duolingo style carousel)
    │   │   └── [id]/           # Lesson runtime loader, exercises renderer
    │   ├── ai-tutor/           # Dynamic AI Chat interface & real-time speaking accent analyzer
    │   │   └── page.tsx
    │   ├── community/          # Forums and regional expatriate interactive meetups posts
    │   │   ├── page.tsx
    │   │   └── discussion/     # Specific forum thread channels
    │   └── settings/           # User configuration options
    │
    ├── components/             # Reusable UI component modules shared across routes
    │   ├── ui/                 # Atomic ShadCN primitives (Button, Card, Badge, Slider, Input)
    │   ├── layout/             # Universal Layout boundaries (Navbar, Sidebar, Footer, Header)
    │   └── common/             # Micro interactive widgets (AudioPlayer, AccentGauge, AudioRecorder)
    │
    ├── features/               # Cohesive domain capabilities containing state-and-hook pairs
    │   ├── learning/           # Lesson controls, Cloze tasks, Flashcard cards (useLearning.ts)
    │   ├── gamification/       # Streak freeze checkers, XP records loaders, dynamic ladders (useStreaks.ts)
    │   └── ai-conversations/   # Audio wave analyzers, Speech records converters, Chat streams
    │
    ├── hooks/                  # Global shared React hooks (usePwaSync, useDebounce, useWindowSize)
    ├── lib/                    # External services initializers (Stripe SDK client, NextAuth configuration)
    ├── services/               # API call handlers containing typed Axios/Fetch request promises
    ├── store/                  # Client-side state engines (Zustand auth, learning progress, notifications)
    └── types/                  # Shareable TypeScript interfaces, custom union types, and enums
`;

export const routeLibrary: RouteSpec[] = [
  {
    path: '/',
    type: 'Public',
    purpose: 'Hero landing page showcasing the regional European Portuguese focus, custom illustrations, pricing structure preview, and SSO buttons.',
    caching: 'Static site generation (SSG) with revalidation every 2 hours.'
  },
  {
    path: '/pricing',
    type: 'Public',
    purpose: 'Details Subscription plans (Starter, Fluency Pack, VIP Cohort) with direct hooks to secure Stripe Billing page structures.',
    caching: 'Static rendering (SSG) with instant edge caching on CDN.'
  },
  {
    path: '/login',
    type: 'Public',
    purpose: 'User sign-on panel containing NextAuth connectors, credential input fields with standard password eye toggles.',
    caching: 'Dynamic route, bypasses caching layers entirely (SSR).'
  },
  {
    path: '/dashboard',
    type: 'Protected',
    purpose: 'Central dashboard showing daily streak counters, learning progress, recommend next lessons, and leaderboard placement.',
    caching: 'Dynamic client-side rendering (CSR) with SWR/TanStack Query caching on API segments.'
  },
  {
    path: '/courses',
    type: 'Protected',
    purpose: 'Displays all available courses matching natural language settings (e.g. English Speakers, German Speakers).',
    caching: 'Incremental Static Regeneration (ISR) with revalidate every 5 minutes.'
  },
  {
    path: '/course/[slug]',
    type: 'Protected',
    purpose: 'A detailed course map layout highlighting nested Units, Lessons modules, and level assessment gate exams.',
    caching: 'ISR with slug parameters, cached on CDN routes.'
  },
  {
    path: '/lesson/[id]',
    type: 'Protected',
    purpose: 'Isolated, focused full-screen lesson runtime carousel containing speech exercises, vocab drills, and score reports.',
    caching: 'Dynamic server route (SSR), assets fetched client-side (no static shell).'
  },
  {
    path: '/ai-tutor',
    type: 'Protected',
    purpose: 'Interactive live chat and speech interaction module letting clients talk with specialized AI Lisbon/Porto personas.',
    caching: 'Bypasses CDN caching, relies on secure realtime WebSockets / Server-Sent Events.'
  },
  {
    path: '/community',
    type: 'Protected',
    purpose: 'Discussion threads list showcasing localized migration tips, administrative forms assistance (AIMA, NIF), and study groups.',
    caching: 'Hybrid (SSR) fetching discussions list, with realtime updates on client channels.'
  },
  {
    path: '/settings',
    type: 'Protected',
    purpose: 'Account information form letting students toggle dark mode, edit speaker speeds, and select profile metadata.',
    caching: 'CSR (Client side rendered) completely, data persisted on users table.'
  }
];

export const componentLibrary: ComponentSpec[] = [
  {
    name: 'Navbar & Mobile Navigation',
    category: 'Layout',
    purpose: 'Navigation container exhibiting active routes, user avatars, notifications counts. Translates into a touchable bottom rail on mobile devices.',
    props: '{\n  activeUserId?: string;\n  currentTheme: "light" | "dark" | "system";\n}',
    state: '{\n  isMobileMenuOpen: boolean;\n  hasUnreadNotifications: boolean;\n}',
    accessibility: 'ARIA role="navigation", uses FocusTrap for open drawers, touch target dimensions strictly minimum 48px.'
  },
  {
    name: 'LessonCard',
    category: 'Learning',
    purpose: 'Renders individual Lesson boxes, displaying status labels (Locked, Active, Finished), score ratings, and XP values.',
    props: '{\n  id: string;\n  title: string;\n  type: "vocab" | "grammar" | "speaking" | "listening";\n  xpReward: number;\n  status: "locked" | "inprogress" | "completed";\n  onSelect: (id: string) => void;\n}',
    state: '{\n  isHovered: boolean;\n  isEntering: boolean;\n}',
    accessibility: 'Keyboard actionable via Tab key index, TabIndex="0", ARIA checked state mappings.'
  },
  {
    name: 'SpeakingRecorder',
    category: 'Learning',
    purpose: 'Handles microphone permission requests, coordinates streaming with MediaRecorder APIs, and displays interactive speech wave designs.',
    props: '{\n  phraseToSpeak: string;\n  phonemesExpected: string[];\n  onComplete: (audioBlob: Blob) => void;\n  isDisabled?: boolean;\n}',
    state: '{\n  isRecording: boolean;\n  currentDecibelRating: number;\n  audioChunks: Blob[];\n  errorMsg: string | null;\n}',
    accessibility: "Explicit ARIA labels: aria-label='Click to start speaking', indicators for recording states: aria-live='assertive'."
  },
  {
    name: 'StreakTracker',
    category: 'Gamification',
    purpose: "Indicates user's daily consecutive days streak, styled with an intense burning flame look and streak freeze counts.",
    props: '{\n  currentStreak: number;\n  longestStreak: number;\n  hasStreakFreeze: boolean;\n  isStreakTodayCompleted: boolean;\n}',
    state: '{\n  triggerScaleAnimation: boolean;\n}',
    accessibility: 'Semantic layout, with screenreader label: "14 consecutive days streak. Today completed: Yes."'
  },
  {
    name: 'ChatWindow & MessageBubble',
    category: 'AI',
    purpose: 'Displays conversational elements with a tutor assistant. Highlights student errors inline with custom corrections.',
    props: '{\n  chatId: string;\n  persona: { name: string; avatarUrl: string; slug: string };\n  messages: Array<{ role: "user" | "assistant"; text: string; corrections?: Array<{ error: string; correct: string }> }>;\n  onSendMessage: (msg: string) => void;\n}',
    state: '{\n  typedValue: string;\n  isTypingIndicatorVisible: boolean;\n  isRecordingSpeaking: boolean;\n}',
    accessibility: 'ARIA role="log" on messages container, auto scroll focus management when additional chat bubbles arrive.'
  }
];

export const i18nImplementationExample = `
// config/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Read localized request headers or path slug parameter
  const requestHeaders = headers();
  const locale = requestHeaders.get('x-next-intl-locale') || 'en';
  
  return {
    messages: (await import(\`../../public/locales/\${locale}/common.json\`)).default,
    timeZone: 'Europe/Lisbon'
  };
});

// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
`;

export const apiLayerExample = `
// src/services/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.falarportugues.pt/v1',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Configure client cookies and NextAuth token injection middleware intercepts
apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const session = await fetch('/api/auth/session').then(res => res.json());
    if (session?.accessToken) {
      config.headers.Authorization = \`Bearer \${session.accessToken}\`;
    }
  }
  return config;
});

// src/hooks/queries/useLearningQueries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const queryKeys = {
  courseProgress: (userId: string) => ['user', userId, 'course-progress'] as const,
  lessonAttempt: (lessonId: string) => ['lesson', lessonId, 'attempt'] as const,
};

export function useFetchCourseProgress(userId: string) {
  return useQuery({
    queryKey: queryKeys.courseProgress(userId),
    queryFn: async () => {
      const response = await apiClient.get(\`/users/\${userId}/progress\`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    gcTime: 1000 * 60 * 30,    // Cache garbage collected after 30 mins
  });
}

export function useSaveLessonProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, lessonId, score, xpGained }: { userId: string, lessonId: string, score: number, xpGained: number }) => {
      const response = await apiClient.post('/lessons/progress', { userId, lessonId, score, xpGained });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate queries to trigger re-fetches for up-to-date scores
      queryClient.invalidateQueries({ queryKey: queryKeys.courseProgress(variables.userId) });
    },
  });
}
`;

export const stateZustandExample = `
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LearningState {
  activeCourseId: string | null;
  activeUnitId: string | null;
  lastCompletedLessonId: string | null;
  downloadedLessonIds: string[];
  offlineMode: boolean;
  
  // Actions
  setActiveCourse: (courseId: string) => void;
  setOfflineMode: (enabled: boolean) => void;
  saveCompletedLesson: (lessonId: string) => void;
  downloadLessonForOffline: (lessonId: string) => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      activeCourseId: null,
      activeUnitId: null,
      lastCompletedLessonId: null,
      downloadedLessonIds: [],
      offlineMode: false,

      setActiveCourse: (courseId) => set({ activeCourseId: courseId }),
      setOfflineMode: (enabled) => set({ offlineMode: enabled }),
      saveCompletedLesson: (lessonId) => set({ lastCompletedLessonId: lessonId }),
      
      downloadLessonForOffline: (lessonId) => {
        const current = get().downloadedLessonIds;
        if (!current.includes(lessonId)) {
          set({ downloadedLessonIds: [...current, lessonId] });
        }
      }
    }),
    {
      name: 'falarportugues-learning-store',
      storage: createJSONStorage(() => localStorage), // Persist on IndexedDB/LocalStorage for offline recovery
    }
  )
);
`;

export const formZodExample = `
// src/components/forms/GoalSettingForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const goalSettingSchema = z.object({
  dailyXpGoal: z.coerce.number().min(5, {
    message: "A daily goal must be at least 5 XP (Casual mode)."
  }).max(200, {
    message: "We recommend a maximum daily limit of 200 XP to avoid exhaustion."
  }),
  proficiencyLevel: z.enum(['A1', 'A2', 'B1', 'B2'], {
    errorMap: () => ({ message: "Please select a valid Euro CEFR alignment." })
  }),
  enableAudioPlayback: z.boolean().default(true),
});

type GoalFormValues = z.infer<typeof goalSettingSchema>;

export default function GoalSettingForm({ onSubmitSuccess }: { onSubmitSuccess: (values: GoalFormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSettingSchema),
    defaultValues: {
      dailyXpGoal: 20,
      proficiencyLevel: 'A1',
      enableAudioPlayback: true
    }
  });

  const onSubmit = async (data: GoalFormValues) => {
    try {
      // API request simulation
      await fetch('/api/user/preferences', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      onSubmitSuccess(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase">Daily Goal (points/day)</label>
        <input 
          type="number" 
          role="textbox"
          {...register('dailyXpGoal')} 
          className="mt-1 w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
        />
        {errors.dailyXpGoal && (
          <p className="text-xs text-rose-500 font-bold mt-1">{errors.dailyXpGoal.message}</p>
        )}
      </div>

      <button 
        type="submit" 
        role="button"
        disabled={isSubmitting}
        className="w-full bg-indigo-650 text-white p-3 rounded-xl font-bold hover:bg-indigo-750 transition-colors cursor-pointer"
      >
        {isSubmitting ? 'Updating Preferences...' : 'Save Goals'}
      </button>
    </form>
  );
}
`;

export const offlinePwaStrategy = `
Service Worker Caching and Sync Strategy:
------------------------------------------
1. Precaching Core Assets:
   - On SW activation, precache structural files: index.html, static assets/locale files, css styles, and icon packages.
2. Intercepting Requests (Cache-First):
   - For vocabulary lesson templates, grammar rule files, and audio assets:
     Serve from Cache. If cache misses, fetch from server network and store in Cache for subsequent launches.
3. Offline Progress Logging (IndexedDB & Background Sync):
   - When user finishes a lesson while offline, write lesson-progress payload directly to localized IndexedDB store.
   - Register a Workbox Background Sync task:
     \`\`\`js
     const bgSyncPlugin = new BackgroundSyncPlugin('progressSyncQueue', {
       maxRetentionTime: 24 * 60, // Retry syncing updates over 24 hours
     });
     \`\`\`
   - When device regains active internet, the background sync event fires automatically, posting localized database progress up to Next.js POST /api/lessons/progress.
`;

export const performanceStrategyList = [
  'Lighthouse Core Web Vitals target: p90 LCP < 1.2s, FID < 15ms, CLS < 0.05.',
  'Route-based Code Splitting: Under Next.js, every page inside the App router is automatically split into distinct static bundle sizes.',
  'Acoustic Wave asset optimization: Dynamic audio waveforms are generated using Lightweight Canvas wrappers instead of high-latency heavy WebAudio components.',
  'Next.js Image component optimization: Automatically sets correct sizes scaling, converting images dynamically into modern WebP sizes, caching on the Cloudflare edge layers.',
  'Pre-allocated dynamic component imports: Non-critical interactive modals are chunked via next/dynamic with { ssr: false } wrappers.'
];

export const securityStrategyList = [
  'CSRF Prevention tokens: Outlined via automated NextAuth secure cookie mechanisms matching JWT structures.',
  'Input Sanitization: All Markdown user comment feeds are sanitized via DOMPurify wrappers prior to active screen execution.',
  'Content Security Policies (CSP): Restricts script-src queries strictly to trust nodes (Amazon S3 buckets, Gemini AI end nodes, NextAuth, Stripe APIs).',
  'Strict HTTPS Protocols: Active transport layer settings, HSTS policy configurations, cookie attributes locked inside Secure; HttpOnly parameters.'
];
