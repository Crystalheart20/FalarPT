/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ArchitectureSection {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  summary: string;
  details: string[];
  dbSchema?: string;
  apiEndpoints?: string[];
  pmInsights: {
    architectNote: string;
    scalabilityFactor: string;
  };
}

export const highLevelDiagram = `
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             NEXT.JS 15 FRONTEND (CLIENT)                         │
│   [Vercel Edge Network / CDN] ─── (Static Cache & Server-Side Rendering)       │
└────────────────────────┬────────────────────────────────┬────────────────────────┘
                         │ (GraphQL / REST - JWT Secured) │
                         ▼                                ▼
┌─────────────────────────────────────────────────────────┴────────────────────────┐
│                        AWS CLOUD / ECS FARGATE PLATFORM                          │
│                                                                                  │
│   ┌───────────────────────────┐  ┌───────────────────────────┐  ┌─────────────┐  │
│   │   k8s / NestJS Backend    │  │     Gemini AI Server      │  │ Analytics   │  │
│   │   (User, Gamification,    │  │   (Interactions Engine &  │  │ Processor   │  │
│   │   Lesson Microservices)   │  │   Pronunciation Parser)   │  │ (Clickhouse)│  │
│   └─────────────┬─────────────┘  └─────────────┬─────────────┘  └──────┬──────┘  │
└─────────────────┼──────────────────────────────┼───────────────────────┼─────────┘
                  │ (Read/Write Replicas)         │                       │
                  ▼                              ▼                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               PERSISTENCE & CACHE                                │
│                                                                                  │
│   ┌───────────────────────────┐  ┌───────────────────────────┐  ┌─────────────┐  │
│   │      PostgreSQL DB        │  │     Redis Enterprise      │  │ AWS S3 Media │  │
│   │     (Aurora ServerlessV2) │  │   (Leaderboard Cluster,   │  │   Bucket    │  │
│   │  Multi-AZ Read Replicas   │  │    Tokens, Active Sessions)│  │ (Audio/Vids)│  │
│   └───────────────────────────┘  └───────────────────────────┘  └─────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────┘
`;

export const architectureSections: ArchitectureSection[] = [
  {
    id: 'auth_user',
    title: '1. Authentication & User Management Systems',
    icon: 'ShieldCheck',
    subtitle: 'Scalable Identity & Session Governance (1M+ Users)',
    summary: 'A secure, stateless OpenID/JWT architecture integrated with standard OAuth social logins, optimized for rapid edge validation and robust user lifecycle tracking.',
    details: [
      'Stateless Dual-Token System: Uses short-lived Access JWTs (15 minutes) and cryptographically signed Refresh Tokens (30 days) stored in secure, HttpOnly, SameSite=Strict cookies to guard against XSS/CSRF.',
      'Edge Token Blacklisting: Vercel Middleware / CloudFront functions intercept incoming requests, querying a global Redis memory instance to check for revoked tokens in <2ms.',
      'OAuth Handshakes: Secure backend proxies handle Google, Apple, and Facebook code exchanges, standardizing profiles to our central user schema.',
      'Database Sharding: High-write user profile and setting tables are partitioned by user_id ranges to prevent index blooms under high registration volume.'
    ],
    dbSchema: `
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    native_lang VARCHAR(10) DEFAULT 'en',
    current_level VARCHAR(5) DEFAULT 'A1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    avatar_url TEXT,
    timezone VARCHAR(50),
    registration_source VARCHAR(20) -- 'email', 'google', 'apple'
);

CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE
);
    `,
    apiEndpoints: [
      'POST /api/v1/auth/signup - Register using credentials (validated via NestJS class-validator).',
      'POST /api/v1/auth/login - Issue dual-token cookie response set with secure sub-attributes.',
      'POST /api/v1/auth/oauth - Handle external security validations (Auth0/OAuth callback).',
      'POST /api/v1/auth/logout - Blacklists raw refresh tokens in Redis cluster immediately.'
    ],
    pmInsights: {
      architectNote: 'By storing JWT secrets in a globally accessible AWS Secrets Manager enclave and checking blacklist states inside memory, we avoid hit rate spikes on the relational database during route transitions.',
      scalabilityFactor: 'Next.js edge middleware caching handles JWT token parsing, keeping the server burden close to zero during steady-state reading.'
    }
  },
  {
    id: 'lessons_course_cms',
    title: '2. Lesson, Course & CMS Architectures',
    icon: 'Layers',
    subtitle: 'Dynamic Content Delivery & Version Controls',
    summary: 'Decoupling educational content creation from active transactional operations, using micro-structured JSON course matrices cached heavily in Redis nodes.',
    details: [
      'Schema-Driven Course Tree: Formulated around a Course -> Level -> Unit -> Lesson -> Active Drill hierarchy, allowing dynamic curriculum updates without executing code deployments.',
      'Graph-Based Lesson Routing: Recommender micro-service computes conditional lesson sequencing based on user progress markers (Prerequisites, Mastery thresholds).',
      'Static CDN Distribution: CMS triggers Webhook listeners to compile active curriculum definitions into Vercel Edge Cache or CloudFront buckets as static CDN payloads.',
      'Zero-Locking Progress Writes: Write-heavy lesson completion records are queued via BullMQ/Redis, shifting heavy relational writes to write-behind batch jobs.'
    ],
    dbSchema: `
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL, -- e.g., 'pt-PT'
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) UNDER DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sequence_order INT NOT NULL,
    cefr_level VARCHAR(5) NOT NULL -- 'A1', 'A2', etc.
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID REFERENCES units(id),
    title VARCHAR(255) NOT NULL,
    lesson_type VARCHAR(20), -- 'vocab', 'grammar', 'dialogue'
    raw_content JSONB NOT NULL -- Holds flashcards, sentences, quizzes structures
);
    `,
    apiEndpoints: [
      'GET /api/v1/courses/:id/outline - Returns whole course tree (highly cached, CloudFront Edge).',
      'GET /api/v1/lessons/:id - Retrieve metadata. Content is pulled from static CDN endpoints.',
      'POST /api/v1/lessons/:id/complete - Logs user score and queues credit attribution asynchronously.'
    ],
    pmInsights: {
      architectNote: 'Educational metadata changes very rarely compared to transactional records. We aggressively store the compiled lesson graphs in CDN memory structures, avoiding standard relational joins on heavy payloads.',
      scalabilityFactor: 'Curriculum JSON payloads are hosted on AWS S3 / CloudFront, scaling effortlessly under extreme reading traffic.'
    }
  },
  {
    id: 'ai_tutor_speaking',
    title: '3. Conversational AI Tutor & Pronunciation Engines',
    icon: 'Cpu',
    subtitle: 'Real-time Phonetic Assessment and Generative Reviews',
    summary: 'A secure, low-latency translation pipeline integrating Gemini-3.5-flash for contextual grammatical corrections, coupled with specialized phonetic scoring models.',
    details: [
      'Server-Authoritative Gemini Enclave: Prompts are generated securely in private server environments using system templates to avoid inject vulnerabilities and keep raw instructions secure.',
      'Vowel Reduction Analysis (STT): We run custom Web Speech engines with fallback to whisper-large-v3, analyzing raw phonetic waveforms to flag Brazilian vs European Portuguese prosody variants.',
      'JSON Output Sanitization: AI models use Structured JSON schemas to prevent generation drift and guarantee high parser compliance.',
      'Rate-Limiting & Cost Caps: Sliding window token rate limits configured per user using Redis Rate Limiter to prevent API abuse and curb computational costs.'
    ],
    dbSchema: `
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scenario_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_exchanges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES ai_conversations(id),
    speaker_role VARCHAR(10) NOT NULL, -- 'user', 'assistant'
    raw_text TEXT NOT NULL,
    phonetic_feedback JSONB, -- Vowel alignment scores, incorrect tones
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    `,
    apiEndpoints: [
      'POST /api/v1/ai/tutor/check-writing - Proxy request to Gemini to evaluate writing grammar.',
      'POST /api/v1/ai/tutor/record-speech - Process streaming audio, compare phonemes via Whisper/Gemini, return similarity metrics.'
    ],
    pmInsights: {
      architectNote: 'Raw audio transfers can cause network exhaustion. We transcode user speech to lightweight Opus formats client-side before sending it to NestJS APIs for analytical parsing.',
      scalabilityFactor: 'Using gemini-3.5-flash allows structured, context-rich analysis in under 800ms, scaling efficiently at high concurrency.'
    }
  },
  {
    id: 'gamification_tracking',
    title: '4. Gamification, Streak & Leaderboard Architectures',
    icon: 'Trophy',
    subtitle: 'High-Concurrency Engagement Engine (Duolingo-Tier)',
    summary: 'Event-driven score aggregation coupled with specialized Redis database structures for sub-second leaderboard ranking updates across millions of global competitors.',
    details: [
      'Redis Sorted Sets (ZADD): All user XP gains are appended directly to Redis Sorted Sets per league tier, delivering immediate global rank reading in O(log(N)) complexity.',
      'Idempotent Event Consumption: Double-spend credits are avoided by routing all accomplishments through Kafka event topics using a unique challenge_event_id.',
      'Daily Streak Evaluator: Executed via high-speed cron controllers, comparing current user check-ins with regional timezone limits before declaring a streak active or broke.',
      'League Sharding: Leaderboard competitors are binned into dynamic shards of 50 users each, making updates fast and keeping users highly engaged.'
    ],
    dbSchema: `
CREATE TABLE user_streaks (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_activity_date DATE NOT NULL,
    freeze_active BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE xp_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount INT NOT NULL,
    source_event VARCHAR(50) NOT NULL, -- 'lesson_complete', 'ai_review_success'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    `,
    apiEndpoints: [
      'GET /api/v1/gamification/leaderboard/:league_id - Read current league array from Redis.',
      'POST /api/v1/gamification/streak/freeze - Commit streak freeze purchase transaction.'
    ],
    pmInsights: {
      architectNote: 'We avoid querying SELECT SUM(amount) from PostgreSQL. The master user_profiles contains a denormalized xp_total index updated incrementally inside a transaction, while Redis holds the active leaderboard shards.',
      scalabilityFactor: 'Redis Sorted Sets comfortably process over 50,000 ranking reads/writes per second with minimal CPU load.'
    }
  },
  {
    id: 'billing_ops_infra',
    title: '5. Technical Operations, Billing & Scaling Blueprints',
    icon: 'Cpu',
    subtitle: 'Enterprise Resilience, Multi-AZ Caching & AWS Blueprint',
    summary: 'Production deployments utilizing multi-region Vercel architectures, AWS ECS container clusters, and robust auto-scaling PostgreSQL clusters.',
    details: [
      'Aurora Serverless V2 Database: Configured with multi-AZ read-replicas, auto-scaling up to 128 ACUs to easily handle sudden traffic spikes (e.g. daily evening review sessions).',
      'Multi-Tier Caching Matrix: 1) Client SWR query hooks. 2) Vercel Edge CDN for static pages. 3) Redis cluster for hot data. 4) Aurora buffer caches.',
      'Kafka / Event Driven Architecture: Transaction milestones, speech requests, and email communications are processed asynchronously using Apache Kafka / AWS MSK queues.',
      'High-Grade SSL/TLS Controls: Advanced SSL handshakes combined with AWS WAF security rules to stop malicious rate attempts and potential SQL inject threats.'
    ],
    dbSchema: `
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100),
    plan_tier VARCHAR(20) DEFAULT 'free', -- 'free', 'premium_monthly', 'premium_annual'
    status VARCHAR(20) NOT NULL, -- 'active', 'canceled', 'past_due'
    current_period_end TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    `,
    apiEndpoints: [
      'POST /api/v1/billing/create-checkout - Initiate Stripe Checkout Redirect Session.',
      'POST /api/v1/billing/webhooks - Highly secure endpoint parsing cryptographical Stripe signatures to process subscription events.'
    ],
    pmInsights: {
      architectNote: 'We strictly defer payment states to Stripe Hooks. Subscription status metadata is duplicated in PostgreSQL databases solely to avoid calling lookup webhooks during user middleware check-ins.',
      scalabilityFactor: 'Container resources auto-scale up by 300% when global latency values exceed 180ms.'
    }
  }
];
