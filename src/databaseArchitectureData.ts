/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DbTableColumn {
  name: string;
  type: string;
  description: string;
  constraints?: string;
}

export interface DbTableInfo {
  tableName: string;
  domain: 'User' | 'Learning' | 'Progress' | 'AI' | 'Community' | 'Subscription' | 'Analytics';
  purpose: string;
  columns: DbTableColumn[];
  relationships: string[];
  indexes: string[];
  sql: string;
  exampleRecord: string;
}

export const dbErdAscii = `
     ========================================================================================
                                     DATABASE SCHEMATICS ERD
     ========================================================================================

  ┌────────────────────────┐                             ┌────────────────────────┐
  │         users          │◄───────────────────────────┤        profiles        │
  │ (PK, Status, Enums)    │◄──────────┐                 │ (PK, Bio, AvatarURL)   │
  └───────────┬────────────┘           │                 └────────────────────────┘
              │                        │
              │ 1:Many                 │ 1:1             ┌────────────────────────┐
              ▼                        ├────────────────┤      preferences       │
  ┌────────────────────────┐           │                 │ (PK, TargetDailyXP)    │
  │       streaks          │           │                 └────────────────────────┘
  │ (PK, Current, Peak)    │           │
  └────────────────────────┘           │ 1:1             ┌────────────────────────┐
                                       └────────────────┤        settings        │
  ┌────────────────────────┐                             │ (PK, Theme, SFX)       │
  │        courses         │◄──────────┐                 └────────────────────────┘
  │ (PK, LangPairs, Active)│           │
  └───────────┬────────────┘           │ 1:Many
              │                        │
              │ 1:Many                 │                 ┌────────────────────────┐
              ▼                        └────────────────┤     course_progress    │
  ┌────────────────────────┐                             │ (PK, CompletedCount)   │
  │         units          │◄──────────┐                 └────────────────────────┘
  │ (PK, Level, Order)     │           │
  └───────────┬────────────┘           │ 1:Many
              │                        │
              │ 1:Many                 └────────────────┤     lesson_progress    │
              ▼                                          │ (PK, ScorePercentage)  │
  ┌────────────────────────┐                             └────────────────────────┘
  │        lessons         │◄──────────────────────────┐
  │ (PK, UnitID, LessonType)│                           │
  └───────────┬────────────┘                           │ 1:Many
              │                                        ▼
              │ 1:Many                       ┌───────────────────┐
              ▼                              │     exercises    │
  ┌────────────────────────┐                 │ (PK, ExerciseType)│
  │     vocab / grammar    │                 └───────────────────┘
  │ (PK, LocalWords, CEFR) │
  └────────────────────────┘                 ┌───────────────────┐
                                             │    achievements   │
  ┌────────────────────────┐                 │ (PK, BadgeName)   │
  │    ai_conversations    │                 └─────────┬─────────┘
  │ (PK, Scenario, UserID) │◄──────────┐               │ 1:Many
  └───────────┬────────────┘           │               ▼
              │                        │     ┌───────────────────┐
              │ 1:Many                 │     │ user_achievements │
              ▼                        │     │ (PK, UnlockedAt)  │
  ┌────────────────────────┐           │     └───────────────────┘
  │    tutor_sessions      │           │
  │ (PK, ActiveTokens)     │           │
  └───────────┬────────────┘           │ 1:Many
              │                        │
              │ 1:Many                 │             ┌───────────────────┐
              ▼                        └─────────────┤   xp_history      │
  ┌────────────────────────┐                         │ (PK, XPQuantity)  │
  │  pronunciation_scores  │                         └───────────────────┘
  │ (PK, PhoneticDiverge)  │
  └────────────────────────┘

     ────────────────────────────────────────────────────────────────────────────────────────
                                 COMPLEMENTARY SATELLITE DOMAINS
     ────────────────────────────────────────────────────────────────────────────────────────

    [Subscription System]               [Community Forum System]            [High-Speed Event Log]
   ┌───────────────────────┐           ┌───────────────────────┐           ┌───────────────────────┐
   │         plans         │           │        forums         │           │      user_events      │
   │ (PK, PriceID, Tier)   │           │ (PK, Slug, Title)     │           │ (PK, DevicePlatform)  │
   └───────────┬───────────┘           └───────────┬───────────┘           └───────────┬───────────┘
               │ 1:Many                            │ 1:Many                            │ Partitioned
               ▼                                   ▼                                   ▼
   ┌───────────────────────┐           ┌───────────────────────┐           ┌───────────────────────┐
   │     subscriptions     │           │      discussions      │           │   learning_metrics    │
   │ (PK, StripeID, Status)│           │ (PK, ForumID, UserID) │           │ (PK, SkillVelocity)   │
   └───────────┬───────────┘           └───────────┬───────────┘           └───────────────────────┘
               │ 1:Many                            │ 1:Many
               ▼                                   ▼
   ┌───────────────────────┐           ┌───────────────────────┐           ┌───────────────────────┐
   │       payments        │           │       comments        │           │   engagement_metrics  │
   │ (PK, RefundState, Fee)│           │ (PK, ParentCommentID) │           │ (PK, SessionSeconds)  │
   └───────────────────────┘           └───────────────────────┘           └───────────────────────┘
`;

export const dbTables: DbTableInfo[] = [
  // USER DOMAIN
  {
    tableName: 'users',
    domain: 'User',
    purpose: 'Core identity user representation containing unique cryptographical password states, session details, operational locks, and deletion metadata.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Primary key uniquely identifying each registered customer.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'email', type: 'VARCHAR(255)', description: 'Unique email address, leveraged for authentications and credentials mappings.', constraints: 'UNIQUE, NOT NULL' },
      { name: 'password_hash', type: 'VARCHAR(255)', description: 'One-way cryptographically salted password hash (Argon2id/bcrypt algorithm format). Can be null if using external SSO.' },
      { name: 'status', type: 'VARCHAR(20)', description: 'Account lifecycle states: active, suspended, pending_sso, inactive.', constraints: "DEFAULT 'active'" },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Record initialization audit marker.', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Dynamic record modification audit marker.', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'deleted_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Target date used for GDPR-compliant user soft-del routines.', constraints: 'NULL' }
    ],
    relationships: [
      '1:1 with profiles (cascaded delete)',
      '1:1 with preferences (cascaded delete)',
      '1:1 with settings (cascaded delete)',
      '1:Many with xp_history (has foreign key link)',
      '1:Many with user_achievements'
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;',
      'CREATE INDEX idx_users_status ON users(status);'
    ],
    sql: `
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending_sso', 'inactive');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) DEFAULT NULL,
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- Indexing for instantaneous profile match with soft delete coverage
CREATE UNIQUE INDEX idx_users_active_email ON users(email) WHERE (deleted_at IS NULL);
CREATE INDEX idx_users_registration_date ON users(created_at DESC);
`,
    exampleRecord: `{
  "id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "email": "antonio.gomes@portugalnet.pt",
  "password_hash": "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$eHh4eHh4eHh4eHh4eG1vb2Q",
  "status": "active",
  "created_at": "2026-06-16T12:00:00Z",
  "updated_at": "2026-06-16T12:00:00Z",
  "deleted_at": null
}`
  },
  {
    tableName: 'profiles',
    domain: 'User',
    purpose: 'Stores non-sensory demographic metadata, user nicknames, localized display names, and external profile image reference strings.',
    columns: [
      { name: 'user_id', type: 'UUID', description: 'Foreign key establishing direct 1:1 ownership with users record.', constraints: 'PRIMARY KEY, REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'display_name', type: 'VARCHAR(100)', description: 'Public facing alias or chosen user display moniker.', constraints: 'NOT NULL' },
      { name: 'first_name', type: 'VARCHAR(100)', description: "User's recognized biological first name.", constraints: 'NULL' },
      { name: 'avatar_url', type: 'TEXT', description: 'URL string directed at AWS S3 bucket assets or external social host.', constraints: 'NULL' },
      { name: 'native_language', type: 'VARCHAR(10)', description: "User's primary native vocabulary tongue (ISO code system).", constraints: "DEFAULT 'en'" },
      { name: 'timezone', type: 'VARCHAR(50)', description: 'Target user timezone configured for accurate streak lock assessments.', constraints: "DEFAULT 'UTC'" },
      { name: 'bio', type: 'VARCHAR(250)', description: 'Optional short background summary displaying on public leaderboards.' }
    ],
    relationships: [
      '1:1 with users table (primary owner)'
    ],
    indexes: [
      'CREATE INDEX idx_profiles_display_name ON profiles(display_name);'
    ],
    sql: `
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) DEFAULT NULL,
    avatar_url TEXT DEFAULT NULL,
    native_language VARCHAR(10) NOT NULL DEFAULT 'en',
    timezone VARCHAR(50) NOT NULL DEFAULT 'Europe/Lisbon',
    bio VARCHAR(250) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profiles_timezone ON profiles(timezone);
`,
    exampleRecord: `{
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "display_name": "TonyPorto",
  "first_name": "António",
  "avatar_url": "https://s3.eu-west-1.amazonaws.com/falarportugues-media/avatars/tony.jpg",
  "native_language": "en",
  "timezone": "Europe/Lisbon",
  "bio": "Excited remote worker relocated to Porto. Let\'s practice Portuguese!"
}`
  },
  {
    tableName: 'preferences',
    domain: 'User',
    purpose: 'Keeps track of structural learning trajectories, chosen weekly milestones, and active daily XP commitment thresholds.',
    columns: [
      { name: 'user_id', type: 'UUID', description: 'Referenced user ID.', constraints: 'PRIMARY KEY, REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'daily_xp_goal', type: 'INT', description: 'Target XP tier chosen by user (e.g. 10=Easy, 20=Med, 50=Strict).', constraints: 'DEFAULT 20' },
      { name: 'target_level', type: 'VARCHAR(5)', description: 'The personal proficiency scale targeted: A1, A2, B1, B2.', constraints: "DEFAULT 'A1'" },
      { name: 'weekly_email_reminders', type: 'BOOLEAN', description: 'Marketing notifications trigger preference.', constraints: 'DEFAULT TRUE' },
      { name: 'last_notified_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Tracks the last timestamp an engagement push was sent.' }
    ],
    relationships: [
      '1:1 with users table'
    ],
    indexes: [],
    sql: `
CREATE TABLE preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    daily_xp_goal INT NOT NULL DEFAULT 20,
    target_level VARCHAR(5) NOT NULL DEFAULT 'A1',
    weekly_email_reminders BOOLEAN NOT NULL DEFAULT TRUE,
    last_notified_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "daily_xp_goal": 30,
  "target_level": "B1",
  "weekly_email_reminders": true,
  "last_notified_at": "2026-06-15T18:30:00Z"
}`
  },
  {
    tableName: 'settings',
    domain: 'User',
    purpose: 'Client preferences such as active UI themes, sounds preferences, audio volume ratios, and translation helpers toggle states.',
    columns: [
      { name: 'user_id', type: 'UUID', description: 'Linked master User account.', constraints: 'PRIMARY KEY, REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'theme', type: 'VARCHAR(20)', description: "Interface visual mode option: 'light', 'dark', 'system'.", constraints: "DEFAULT 'system'" },
      { name: 'sound_sfx_enabled', type: 'BOOLEAN', description: 'Toggle control specifically for ding/buzz interaction sounds.', constraints: 'DEFAULT TRUE' },
      { name: 'voice_playback_rate', type: 'NUMERIC(3,2)', description: 'TTS pitch rate factor, allowing slow playback rate for beginners (e.g. 0.82).', constraints: 'DEFAULT 1.00' },
      { name: 'show_inline_translations', type: 'BOOLEAN', description: 'Toggle option to automatically outline Portuguese translations under panels.', constraints: 'DEFAULT TRUE' }
    ],
    relationships: [
      '1:1 with users table'
    ],
    indexes: [],
    sql: `
CREATE TABLE settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) NOT NULL DEFAULT 'system',
    sound_sfx_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    voice_playback_rate NUMERIC(3,2) NOT NULL DEFAULT 1.00,
    show_inline_translations BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "theme": "dark",
  "sound_sfx_enabled": true,
  "voice_playback_rate": 0.85,
  "show_inline_translations": false
}`
  },

  // LEARNING DOMAIN
  {
    tableName: 'courses',
    domain: 'Learning',
    purpose: 'Core course representation establishing the target regional tongue pairings, language levels available, and execution state.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Course uniquely assigned identifier.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'source_language', type: 'VARCHAR(10)', description: 'Base instruction language (e.g. "en" for English).', constraints: 'NOT NULL' },
      { name: 'target_language', type: 'VARCHAR(10)', description: 'Specific target target dialect (e.g. "pt-PT" for European Portugal).', constraints: 'NOT NULL' },
      { name: 'is_active', type: 'BOOLEAN', description: 'Control flag indicating whether course is available for general users.', constraints: 'DEFAULT TRUE' },
      { name: 'cefr_band_max', type: 'VARCHAR(5)', description: 'The absolute level capacity maximum, standard values: A1, A2, B1, B2.', constraints: "DEFAULT 'B2'" }
    ],
    relationships: [
      '1:Many with units (cascade deletes)',
      '1:Many with course_progress (associated users tracking links)'
    ],
    indexes: [
      'CREATE UNIQUE INDEX idx_courses_lang_pairs ON courses(source_language, target_language);'
    ],
    sql: `
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    cefr_band_max VARCHAR(5) NOT NULL DEFAULT 'B2',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_courses_lang_pairs ON courses(source_language, target_language);
`,
    exampleRecord: `{
  "id": "c301a2cf-cca3-47da-99a3-5c2921a9efc9",
  "source_language": "en",
  "target_language": "pt-PT",
  "is_active": true,
  "cefr_band_max": "B2"
}`
  },
  {
    tableName: 'units',
    domain: 'Learning',
    purpose: 'Represents a core curriculum bracket or block, clustering together related thematic lessons.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique unit identification PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'course_id', type: 'UUID', description: 'Belonging Course relationship key.', constraints: 'REFERENCES courses(id) ON DELETE CASCADE' },
      { name: 'title', type: 'VARCHAR(255)', description: 'Descriptive title of curriculum topic (e.g. Informal Greetings).', constraints: 'NOT NULL' },
      { name: 'sequence_order', type: 'INT', description: 'Curriculum map execution position index, critical for path tracking.', constraints: 'NOT NULL' },
      { name: 'cefr_level', type: 'VARCHAR(5)', description: "The unit target capacity standard label: 'A1', 'A2', 'B1', 'B2'.", constraints: 'NOT NULL' }
    ],
    relationships: [
      'Foreign key course_id points to courses (cascade on delete)',
      '1:Many with lessons'
    ],
    indexes: [
      'CREATE INDEX idx_units_course_order ON units(course_id, sequence_order);'
    ],
    sql: `
CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sequence_order INT NOT NULL,
    cefr_level VARCHAR(5) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_units_lookup ON units(course_id, cefr_level);
`,
    exampleRecord: `{
  "id": "e005aa22-4a0a-4da2-8802-bd921a99f1c3",
  "course_id": "c301a2cf-cca3-47da-99a3-5c2921a9efc9",
  "title": "Pedir Cafés e Lanches no Porto (Corner Cafe Essentials)",
  "sequence_order": 4,
  "cefr_level": "A1"
}`
  },
  {
    tableName: 'lessons',
    domain: 'Learning',
    purpose: 'Specific standalone instruction units that are loaded sequentially inside a path block.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Lesson unique PK identifier.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'unit_id', type: 'UUID', description: 'The parent Unit relation.', constraints: 'REFERENCES units(id) ON DELETE CASCADE' },
      { name: 'title', type: 'VARCHAR(255)', description: 'Lesson unit user heading.', constraints: 'NOT NULL' },
      { name: 'type', type: 'VARCHAR(20)', description: "Lesson curriculum discipline category: 'vocab', 'grammar', 'speaking', 'listening'.", constraints: 'NOT NULL' },
      { name: 'xp_reward', type: 'INT', description: 'Core base XP value awarded upon comprehensive lesson success.', constraints: 'DEFAULT 20' },
      { name: 'sequence_order', type: 'INT', description: 'Step index of the lesson inside the unit map.', constraints: 'NOT NULL' }
    ],
    relationships: [
      'Belongs to units table (unit_id FK link)',
      '1:Many with exercises'
    ],
    indexes: [
      'CREATE INDEX idx_lessons_unit_order ON lessons(unit_id, sequence_order);'
    ],
    sql: `
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'vocab', 'grammar', 'dialogue', 'story'
    xp_reward INT NOT NULL DEFAULT 20,
    sequence_order INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_unit_listing ON lessons(unit_id, sequence_order);
`,
    exampleRecord: `{
  "id": "99aa88bc-3cfc-48c1-b001-e00f91a9f1a2",
  "unit_id": "e005aa22-4a0a-4da2-8802-bd921a99f1c3",
  "title": "A bica, o bolo-rei e a pastelaria",
  "type": "vocab",
  "xp_reward": 20,
  "sequence_order": 1
}`
  },
  {
    tableName: 'exercises',
    domain: 'Learning',
    purpose: 'Low-level structural drill templates, representing single questions, translations, gaps-completions, or drag components.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Exercise primary identification.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'lesson_id', type: 'UUID', description: 'Associated host lesson.', constraints: 'REFERENCES lessons(id) ON DELETE CASCADE' },
      { name: 'type', type: 'VARCHAR(30)', description: "Question format: 'multiple_choice', 'speech_reduct', 'write_essay', 'cloze_gap'.", constraints: 'NOT NULL' },
      { name: 'sequence_order', type: 'INT', description: 'Index position representing rendering order within the lesson carousel.', constraints: 'NOT NULL' },
      { name: 'instructions_pt', type: 'TEXT', description: 'Primary question statements structured in Portuguese.', constraints: 'NOT NULL' },
      { name: 'content_payload', type: 'JSONB', description: 'Highly dynamic configuration data structure holding question answers, target option lists, and phonetic maps.', constraints: 'NOT NULL' }
    ],
    relationships: [
      'Foreign key lesson_id references lessons (cascade delete)'
    ],
    indexes: [
      'CREATE INDEX idx_exercises_lookup ON exercises(lesson_id, sequence_order);'
    ],
    sql: `
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL, -- 'multiple_choice', 'phoneme_match', 'essay'
    sequence_order INT NOT NULL,
    instructions_pt TEXT NOT NULL,
    content_payload JSONB NOT NULL, -- Key storage containing answers and options arrays
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
`,
    exampleRecord: `{
  "id": "d009cc33-a3df-49aa-00b8-1ec233a1e2cf",
  "lesson_id": "99aa88bc-3cfc-48c1-b001-e00f91a9f1a2",
  "type": "multiple_choice",
  "sequence_order": 3,
  "instructions_pt": "Selecione o termo correto usado para pedir café expresso em Lisboa:",
  "content_payload": {
    "options": ["Um cafezinho", "Uma bica", "Um cimbalino", "Um carioca"],
    "correct_index": 1,
    "explanation": "Em Lisboa, o termo coloquial é \\"uma bica\\", enquanto no Porto é \\"um cimbalino\\"."
  }
}`
  },
  {
    tableName: 'quizzes',
    domain: 'Learning',
    purpose: 'Strategic examination and assessment milestones used to unlocked specific course gates or issue certificates.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Quiz primary identifier.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'unit_id', type: 'UUID', description: 'Optional unit relationship used for level-end test evaluations.', constraints: 'REFERENCES units(id) ON DELETE SET NULL' },
      { name: 'title', type: 'VARCHAR(255)', description: 'Quiz exam topic title.', constraints: 'NOT NULL' },
      { name: 'passing_score', type: 'INT', description: 'Percentage minimum score essential to clear the checkpoint (e.g. 80).', constraints: 'DEFAULT 80' },
      { name: 'time_limit_secs', type: 'INT', description: 'Strict timing limit parameter. Can be null if unlimited.' }
    ],
    relationships: [
      'Linked with units or general course structures'
    ],
    indexes: [],
    sql: `
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    passing_score INT NOT NULL DEFAULT 80,
    time_limit_secs INT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "aa123bcf-cf82-44df-9921-22a4bbbbcc33",
  "unit_id": "e005aa22-4a0a-4da2-8802-bd921a99f1c3",
  "title": "A1 Level Gate: Practical Social Exchanges",
  "passing_score": 85,
  "time_limit_secs": 1200
}`
  },
  {
    tableName: 'vocabulary',
    domain: 'Learning',
    purpose: 'Central localized vocabulary glossary storage containing Portuguese terms, phonetic helpers, grammar genders, and standard translations.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Glossary unique key descriptor PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'word_pt', type: 'VARCHAR(100)', description: 'The official Portuguese word or term.', constraints: 'NOT NULL' },
      { name: 'translation_en', type: 'VARCHAR(255)', description: 'Representative English standard translations.', constraints: 'NOT NULL' },
      { name: 'part_of_speech', type: 'VARCHAR(20)', description: 'Syntactic role of term: noun, verb, adjective, phrase, adverb.', constraints: 'NOT NULL' },
      { name: 'gender', type: 'VARCHAR(5)', description: "Grammatical gender classification: 'm', 'f', 'n' (neuter).", constraints: 'NULL' },
      { name: 'plural_form', type: 'VARCHAR(100)', description: 'Plural form variants containing Portugal phoneme adjustments.' }
    ],
    relationships: [],
    indexes: [
      'CREATE INDEX idx_vocab_lookup_word ON vocabulary(word_pt);'
    ],
    sql: `
CREATE TABLE vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    word_pt VARCHAR(100) NOT NULL,
    translation_en VARCHAR(255) NOT NULL,
    part_of_speech VARCHAR(20) NOT NULL, 
    gender VARCHAR(5) DEFAULT NULL, -- 'm', 'f'
    plural_form VARCHAR(100) DEFAULT NULL,
    audio_path_pt TEXT DEFAULT NULL -- Path pointing to perfect PT-PT speaker file
);

CREATE INDEX idx_vocab_pt ON vocabulary(word_pt);
`,
    exampleRecord: `{
  "id": "77bb66ef-cfa4-46aa-ab91-c11f92a9ee43",
  "word_pt": "pastel de nata",
  "translation_en": "traditional Portuguese custard tart",
  "part_of_speech": "noun",
  "gender": "m",
  "plural_form": "pastéis de nata"
}`
  },
  {
    tableName: 'grammar',
    domain: 'Learning',
    purpose: 'Explicit grammatical conjugation maps, focusing heavily on regional Portugal syntax configurations such as indirect object clitics.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Grammar identifier primary key.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'topic_tag', type: 'VARCHAR(50)', description: "Linguistic code, e.g. 'indirect_clitics', 'gerund_reduct', 'ortho_90'.", constraints: 'UNIQUE' },
      { name: 'title', type: 'VARCHAR(255)', description: 'Thematic title explaining linguistic phenomenon.', constraints: 'NOT NULL' },
      { name: 'conceptual_rules', type: 'TEXT', description: 'Explanatory text highlighting the structural differences from Brazilian syntax.', constraints: 'NOT NULL' },
      { name: 'conjugation_matrix', type: 'JSONB', description: 'Complex tabular data matching grammatical tenses and enclisis/proclisis configurations.' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE grammar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_tag VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    conceptual_rules TEXT NOT NULL,
    conjugation_matrix JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "33bb77ff-dd22-4411-ab21-77f98fb9ee99",
  "topic_tag": "enclisis_placement",
  "title": "Euro-PT Pronoun Enclisis Standard",
  "conceptual_rules": "Unlike Brazilian Portuguese, European Portuguese favors placing pronouns after the verb, joined with a hyphen, except in negative constructs.",
  "conjugation_matrix": {
    "affirmative": "Diga-me (Tell me)",
    "negative": "Não me diga (Don\'t tell me)",
    "person_forms": {
      "eu": "escrevo-lhe",
      "tu": "escreves-lhe",
      "ele_ela": "escreve-lhe"
    }
  }
}`
  },

  // PROGRESS DOMAIN
  {
    tableName: 'lesson_progress',
    domain: 'Progress',
    purpose: 'High-frequency transaction tables keeping tabs on specific lesson attempts, accuracy ratings, and XP results.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Progress transaction primary key.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Learner owner ID.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'lesson_id', type: 'UUID', description: 'The attempted lesson tracker.', constraints: 'REFERENCES lessons(id) ON DELETE CASCADE' },
      { name: 'score_percentage', type: 'INT', description: 'Proportion of correct steps achieved.', constraints: 'NOT NULL' },
      { name: 'completed_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Completion date marker.', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'xp_earned', type: 'INT', description: 'Total points credited towards user ledger.', constraints: 'NOT NULL' }
    ],
    relationships: [
      'Linked user_id, referencing users',
      'Linked lesson_id, referencing lessons'
    ],
    indexes: [
      'CREATE UNIQUE INDEX uq_user_lesson ON lesson_progress(user_id, lesson_id);',
      'CREATE INDEX idx_lesson_prog_dates ON lesson_progress(completed_at DESC);'
    ],
    sql: `
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    score_percentage INT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    xp_earned INT NOT NULL,
    CONSTRAINT chk_score_range CHECK (score_percentage BETWEEN 0 AND 100)
);

CREATE UNIQUE INDEX idx_user_lesson_uniqueness ON lesson_progress(user_id, lesson_id);
`,
    exampleRecord: `{
  "id": "e2e212f4-cf00-4781-ab22-229efbc3df9a",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "lesson_id": "99aa88bc-3cfc-48c1-b001-e00f91a9f1a2",
  "score_percentage": 95,
  "completed_at": "2026-06-16T12:15:00Z",
  "xp_earned": 20
}`
  },
  {
    tableName: 'course_progress',
    domain: 'Progress',
    purpose: 'Aggregates learning path achievements, tracking active levels, course completion statuses, and overall mastery velocity calculations.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Aggregate progress ID.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Target learner id identifier.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'course_id', type: 'UUID', description: 'The registered course.', constraints: 'REFERENCES courses(id) ON DELETE CASCADE' },
      { name: 'current_unit_id', type: 'UUID', description: "Tracks active position on course roadmap.", constraints: 'REFERENCES units(id)' },
      { name: 'lessons_completed_count', type: 'INT', description: 'Total number of course lessons completed to date.', constraints: 'DEFAULT 0' },
      { name: 'is_certified', type: 'BOOLEAN', description: 'Indicates user has completed level exit requirements and unlocked certification.', constraints: 'DEFAULT FALSE' }
    ],
    relationships: [],
    indexes: [
      'CREATE UNIQUE INDEX uq_user_course ON course_progress(user_id, course_id);'
    ],
    sql: `
CREATE TABLE course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    current_unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
    lessons_completed_count INT NOT NULL DEFAULT 0,
    is_certified BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_user_course_progress ON course_progress(user_id, course_id);
`,
    exampleRecord: `{
  "id": "f0a88b11-cf22-4a00-ab61-9921bc34df9a",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "course_id": "c301a2cf-cca3-47da-99a3-5c2921a9efc9",
  "current_unit_id": "e005aa22-4a0a-4da2-8802-bd921a99f1c3",
  "lessons_completed_count": 8,
  "is_certified": false
}`
  },
  {
    tableName: 'streaks',
    domain: 'Progress',
    purpose: 'Core engagement and retention state table. Implements Duolingo-style streak buffers, streak freeze parameters, and peak records.',
    columns: [
      { name: 'user_id', type: 'UUID', description: 'Linked unique user key.', constraints: 'PRIMARY KEY, REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'current_streak_days', type: 'INT', description: 'Active day streak count.', constraints: 'DEFAULT 0' },
      { name: 'longest_streak_days', type: 'INT', description: 'Historical maximum peak day streak achieved.', constraints: 'DEFAULT 0' },
      { name: 'last_active_date', type: 'DATE', description: 'Reference calendar day corresponding to the last XP activity.', constraints: 'NOT NULL' },
      { name: 'freeze_items_count', type: 'INT', description: 'Number of active streak freeze items purchased.', constraints: 'DEFAULT 0' }
    ],
    relationships: [],
    indexes: [
      'CREATE INDEX idx_streaks_ranking ON streaks(current_streak_days DESC);'
    ],
    sql: `
CREATE TABLE streaks (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_streak_days INT NOT NULL DEFAULT 0,
    longest_streak_days INT NOT NULL DEFAULT 0,
    last_active_date DATE NOT NULL,
    freeze_items_count INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_streaks_high_score ON streaks(current_streak_days DESC);
`,
    exampleRecord: `{
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "current_streak_days": 14,
  "longest_streak_days": 42,
  "last_active_date": "2026-06-15",
  "freeze_items_count": 2
}`
  },
  {
    tableName: 'achievements',
    domain: 'Progress',
    purpose: 'Static badge templates defining achievements, description details, and target unlocks bounds.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Badge definition unique key PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'badge_name', type: 'VARCHAR(100)', description: 'Recognizable badge handle (e.g. "Accent_Master").', constraints: 'UNIQUE, NOT NULL' },
      { name: 'badge_description', type: 'VARCHAR(255)', description: 'Short badge descriptive rules explaining constraints.', constraints: 'NOT NULL' },
      { name: 'target_xp_threshold', type: 'INT', description: 'Milestone criteria of XP required to automatically trigger badge unlock.' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_name VARCHAR(100) UNIQUE NOT NULL,
    badge_description VARCHAR(255) NOT NULL,
    target_xp_threshold INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "e0c8de12-fff3-4da0-99c1-aa54bcdebb33",
  "badge_name": "Lisbon_Coffee_Connoisseur",
  "badge_description": "Perfect five consecutive listening quizzes matching cafe orders in Lisbon.",
  "target_xp_threshold": 150
}`
  },
  {
    tableName: 'xp_history',
    domain: 'Progress',
    purpose: 'Detailed transaction ledger logging all XP actions. This allows historical charts generation and prevents double allocation bugs.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unified transaction ID PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Target user key identifier.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'xp_gained', type: 'INT', description: 'Amount of points credited (or debited).', constraints: 'NOT NULL' },
      { name: 'achievement_type', type: 'VARCHAR(50)', description: "Source of XP: 'lesson_complete', 'writing_prompt', 'srs_card_review'.", constraints: 'NOT NULL' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Transaction action date.', constraints: 'DEFAULT CURRENT_TIMESTAMP' }
    ],
    relationships: [],
    indexes: [
      'CREATE INDEX idx_xp_history_aggregate ON xp_history(user_id, created_at DESC);'
    ],
    sql: `
CREATE TABLE xp_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    xp_gained INT NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_xp_time ON xp_history(user_id, created_at DESC);
`,
    exampleRecord: `{
  "id": "8bbbb99c-3fff-47df-bb11-44aa01f99c22",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "xp_gained": 30,
  "achievement_type": "srs_card_review",
  "created_at": "2026-06-16T12:20:00Z"
}`
  },

  // AI DOMAIN
  {
    tableName: 'conversations',
    domain: 'AI',
    purpose: 'Core host session tracking real-time dynamic Gemini-driven learning dialogues with Portuguese cultural personas context.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique conversation ID PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'User participant ID.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'persona_slug', type: 'VARCHAR(50)', description: "Thematic persona slug (e.g. 'sr-silva-landlord', 'cafe-manager').", constraints: 'NOT NULL' },
      { name: 'current_sentiment', type: 'VARCHAR(20)', description: 'Maintained character sentiment indicators: positive, neutral, frustrated.', constraints: "DEFAULT 'neutral'" }
    ],
    relationships: [
      '1:Many points to tutor_sessions (message loops details)'
    ],
    indexes: [],
    sql: `
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    persona_slug VARCHAR(50) NOT NULL,
    current_sentiment VARCHAR(20) NOT NULL DEFAULT 'neutral',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "cb0decf1-88df-4da1-a9e9-11ccddcf0a03",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "persona_slug": "sr-silva-landlord",
  "current_sentiment": "positive"
}`
  },
  {
    tableName: 'tutor_sessions',
    domain: 'AI',
    purpose: 'Linguistic message logs capturing prompt directions, student inputs, AI responses, and grammatical correction metadata details.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Message unique PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'conversation_id', type: 'UUID', description: 'Parent conversation reference.', constraints: 'REFERENCES conversations(id) ON DELETE CASCADE' },
      { name: 'speaker_role', type: 'VARCHAR(15)', description: "Message source: 'user', 'assistant', 'system'.", constraints: 'NOT NULL' },
      { name: 'message_text', type: 'TEXT', description: 'Raw message content.', constraints: 'NOT NULL' },
      { name: 'corrections_json', type: 'JSONB', description: 'Specific syntax shifts, spelling tweaks, or clitics advices.' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE tutor_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    speaker_role VARCHAR(15) NOT NULL,
    message_text TEXT NOT NULL,
    corrections_json JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "123aa4cf-cca3-4aa2-99c5-0a12e34df4bc",
  "conversation_id": "cb0decf1-88df-4da1-a9e9-11ccddcf0a03",
  "speaker_role": "user",
  "message_text": "Escrevo para você para confirmar de que mandei a renda.",
  "corrections_json": {
    "score": 75,
    "shifts": [
      {
        "incorrect": "para você",
        "correct": "lhe",
        "explanation": "No português administrativo de Portugal (PT-PT), prefere-se o uso do pronome de terceira pessoa indireto 'lhe' de forma enclítica ou proclítica, evitando o uso repetido do pronome brasileiro 'você'."
      }
    ]
  }
}`
  },
  {
    tableName: 'pronunciation_scores',
    domain: 'AI',
    purpose: 'Captures advanced real-time acoustic speech evaluation, logging word completeness, stress metrics, and vowel reduction performance values.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Score transaction PK identifier.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Core participant user reference identifier.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'overall_score', type: 'NUMERIC(5,2)', description: 'Cumulative precision match percent (e.g. 91.20).', constraints: 'NOT NULL' },
      { name: 'vowel_reduction_score', type: 'NUMERIC(5,2)', description: 'Target alignment metrics evaluating unstressed vowel reduction. High metric indicates correct EU phonetic reduction.', constraints: 'NOT NULL' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE pronunciation_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_score NUMERIC(5,2) NOT NULL,
    vowel_reduction_score NUMERIC(5,2) NOT NULL,
    phoneme_divergence_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "ad668bcf-bbd3-4881-88a1-cfde776fba92",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "overall_score": 88.50,
  "vowel_reduction_score": 92.00,
  "phoneme_divergence_data": {
    "word_failures": ["pastel"],
    "phoneme_differences": [
      {
        "expected": "pash-tel",
        "provided": "pass-tel",
        "severity": "medium",
        "remedy": "Turn the 's' into a 'sh' sound preceding the voiceless consonant 't'."
      }
    ]
  }
}`
  },
  {
    tableName: 'speech_records',
    domain: 'AI',
    purpose: 'Houses S3 location strings directing to students recorded speaking efforts, allowing user playback and trainer review operations.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Primary key database identifier.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Account key representing student record.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 's3_key_path', type: 'TEXT', description: 'Highly secure AWS S3 target pointer key to audio sample asset.', constraints: 'NOT NULL' },
      { name: 'audio_format', type: 'VARCHAR(15)', description: "Audio compression standard: codec audio/opus format, webm.", constraints: "DEFAULT 'opus'" }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE speech_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    s3_key_path TEXT NOT NULL,
    audio_format VARCHAR(15) NOT NULL DEFAULT 'opus',
    duration_seconds NUMERIC(4,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "7aa99ccf-cc33-4df4-a901-b22efbc34df9",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "s3_key_path": "prod-falarportugues-recordings/f8bbcc00/speech_1_20260616.opus",
  "audio_format": "opus",
  "duration_seconds": 4.52
}`
  },

  // COMMUNITY DOMAIN
  {
    tableName: 'forums',
    domain: 'Community',
    purpose: 'Contains localized discussion category divisions supporting expatriate meetups, administrative help threads, and regional language advice boards.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Primary key PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'title', type: 'VARCHAR(150)', description: 'Board section title name.', constraints: 'UNIQUE, NOT NULL' },
      { name: 'slug', type: 'VARCHAR(150)', description: "Segment identifier slug tailored for routing paths (e.g. 'sef-help-lima').", constraints: 'UNIQUE, NOT NULL' },
      { name: 'is_moderated', type: 'BOOLEAN', description: 'Denotes strict moderation active levels.', constraints: 'DEFAULT TRUE' }
    ],
    relationships: [
      '1:Many points to discussions'
    ],
    indexes: [],
    sql: `
CREATE TABLE forums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL UNIQUE,
    slug VARCHAR(150) NOT NULL UNIQUE,
    is_moderated BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "f00ea2cf-df22-4a00-ab12-ccdefbc39a11",
  "title": "SEF / AIMA Administrative Residency Advice",
  "slug": "anima-residency-advice",
  "is_moderated": true
}`
  },
  {
    tableName: 'discussions',
    domain: 'Community',
    purpose: 'Specific conversational threads posted by expatriates seeking local insights or vocabulary validations.',
    columns: [
      { name: 'id', type: 'UUID', description: 'PK discussion key.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'forum_id', type: 'UUID', description: 'The parent forum board PK.', constraints: 'REFERENCES forums(id) ON DELETE CASCADE' },
      { name: 'user_id', type: 'UUID', description: 'Linked Author user identification key.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'title', type: 'VARCHAR(250)', description: 'The theme of the topic post.', constraints: 'NOT NULL' },
      { name: 'body', type: 'TEXT', description: 'Content text describing discussion query.', constraints: 'NOT NULL' },
      { name: 'view_count', type: 'INT', description: 'Analytical count reflecting visitor clicks.', constraints: 'DEFAULT 0' }
    ],
    relationships: [
      '1:Many references comments'
    ],
    indexes: [
      'CREATE INDEX idx_discussions_fts ON discussions USING gin(to_tsvector(\'english\', title || \' \' || body));'
    ],
    sql: `
CREATE TABLE discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forum_id UUID NOT NULL REFERENCES forums(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(250) NOT NULL,
    body TEXT NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Full text indexing for quick community queries
CREATE INDEX idx_discussions_search ON discussions USING GIN (to_tsvector('portuguese', title || ' ' || body));
`,
    exampleRecord: `{
  "id": "e009cf11-dd41-477d-9a99-ee2c34bc1a11",
  "forum_id": "f00ea2cf-df22-4a00-ab12-ccdefbc39a11",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "title": "Confused about NIF registration and landlord receipts (Recibos Verdes)",
  "body": "Hi guys, our landlord Sr. Silva issued me a Green Receipt (Recibo Verde) through Finanças, but the NIF registration has some mismatched character layouts. Anyone experienced this in Lisbon?",
  "view_count": 142
}`
  },
  {
    tableName: 'comments',
    domain: 'Community',
    purpose: 'Individual response comments submitted by community members or localized language mentors.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Single comment identifier PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'discussion_id', type: 'UUID', description: 'Linked master discussion thread.', constraints: 'REFERENCES discussions(id) ON DELETE CASCADE' },
      { name: 'user_id', type: 'UUID', description: 'Linked Author responder user ID.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'parent_comment_id', type: 'UUID', description: 'Nullable reference pointing to parent response, enabling comment nesting architectures.', constraints: 'REFERENCES comments(id) ON DELETE CASCADE' },
      { name: 'comment_text', type: 'TEXT', description: 'Content of reply statement.', constraints: 'NOT NULL' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discussion_id UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_discussion ON comments(discussion_id);
`,
    exampleRecord: `{
  "id": "ab0011cc-cc31-4df1-bd92-993d0cf3dfa0",
  "discussion_id": "e009cf11-dd41-477d-9a99-ee2c34bc1a11",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "parent_comment_id": null,
  "comment_text": "Exmo. Senhor, you just need to update your address online in the portal"
}`
  },
  {
    tableName: 'groups',
    domain: 'Community',
    purpose: 'Study groups and clusters of learners pursuing common milestones together.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique study group ID PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'group_name', type: 'VARCHAR(100)', description: 'Display name of study circle.', constraints: 'UNIQUE, NOT NULL' },
      { name: 'group_description', type: 'VARCHAR(250)', description: 'Target curriculum focus of study group.', constraints: 'NOT NULL' },
      { name: 'max_members', type: 'INT', description: 'Maximum membership tier limit factor (e.g. 50).', constraints: 'DEFAULT 50' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name VARCHAR(100) NOT NULL UNIQUE,
    group_description VARCHAR(250) NOT NULL,
    max_members INT NOT NULL DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "8bbbb00d-cca3-477d-ab21-22e34fa99ef3",
  "group_name": "Porto Expat A2 Challengers",
  "group_description": "A focused cohort of expats based in Porto practicing street-level public exchanges weekly.",
  "max_members": 30
}`
  },

  // SUBSCRIPTION DOMAIN
  {
    tableName: 'plans',
    domain: 'Subscription',
    purpose: 'Standard price parameters and plan definitions, defining features, pricing models, and payment terms.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Plan template identifier PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'stripe_price_id', type: 'VARCHAR(100)', description: 'Stripe webhook sync API key for payment gateway alignment.', constraints: 'UNIQUE, NOT NULL' },
      { name: 'tier_code', type: 'VARCHAR(20)', description: "Pricing tier: 'free', 'premium_monthly', 'premium_annual'.", constraints: 'NOT NULL' },
      { name: 'amount_cents', type: 'INT', description: 'Cost of subscription in lowest currency unit (e.g. 1499 for $14.99).', constraints: 'NOT NULL' },
      { name: 'currency_code', type: 'VARCHAR(3)', description: 'Three-letter currency symbol tag.', constraints: "DEFAULT 'EUR'" }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_price_id VARCHAR(100) UNIQUE NOT NULL,
    tier_code VARCHAR(20) NOT NULL,
    amount_cents INT NOT NULL,
    currency_code VARCHAR(3) NOT NULL DEFAULT 'EUR',
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);
`,
    exampleRecord: `{
  "id": "1a0ea2bc-99df-4a61-ab22-bbdc99cfbb33",
  "stripe_price_id": "price_1MstPtLksR6C58L3gH6uB",
  "tier_code": "premium_monthly",
  "amount_cents": 1299,
  "currency_code": "EUR",
  "is_active": true
}`
  },
  {
    tableName: 'subscriptions',
    domain: 'Subscription',
    purpose: 'Stores active subscriber states, Stripe integration keys, plan codes, and billing lifecycle markers.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Unique subscription ID PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'user_id', type: 'UUID', description: 'Stripe customer user identifier.', constraints: 'REFERENCES users(id) ON DELETE CASCADE' },
      { name: 'plan_id', type: 'UUID', description: 'Referenced active plan PK.', constraints: 'REFERENCES plans(id)' },
      { name: 'stripe_subscription_id', type: 'VARCHAR(100)', description: 'Stripe transaction sync ID coordinate.', constraints: 'UNIQUE, NULL' },
      { name: 'status', type: 'VARCHAR(20)', description: "Stripe subscription state: 'active', 'canceled', 'past_due', 'incomplete'.", constraints: 'NOT NULL' },
      { name: 'current_period_end', type: 'TIMESTAMP WITH TIME ZONE', description: 'The absolute timestamp marking next billing attempt.', constraints: 'NOT NULL' }
    ],
    relationships: [],
    indexes: [
      'CREATE INDEX idx_subs_user_status ON subscriptions(user_id, status);'
    ],
    sql: `
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    stripe_subscription_id VARCHAR(100) UNIQUE,
    status VARCHAR(20) NOT NULL, 
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_lookup ON subscriptions(user_id, status);
`,
    exampleRecord: `{
  "id": "33ffcc22-aab9-48df-bc21-229efbc3df9a",
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "plan_id": "1a0ea2bc-99df-4a61-ab22-bbdc99cfbb33",
  "stripe_subscription_id": "sub_1NdfBBLksR6C58L3xp9",
  "status": "active",
  "current_period_end": "2026-07-16T12:00:00Z"
}`
  },
  {
    tableName: 'payments',
    domain: 'Subscription',
    purpose: 'Captures billing logs, payment gateways callbacks, processing charges, and net transaction fees values.',
    columns: [
      { name: 'id', type: 'UUID', description: 'Core payment log PK.', constraints: 'PRIMARY KEY, DEFAULT gen_random_uuid()' },
      { name: 'stripe_charge_id', type: 'VARCHAR(100)', description: 'Mapped Stripe charge payment reference.', constraints: 'UNIQUE, NOT NULL' },
      { name: 'subscription_id', type: 'UUID', description: 'Linked active user subscription PK.', constraints: 'REFERENCES subscriptions(id)' },
      { name: 'amount_cents', type: 'INT', description: 'Gross charge quantity captured.', constraints: 'NOT NULL' },
      { name: 'stripe_fee_cents', type: 'INT', description: 'Stripe processing percentage transactional fees cut.', constraints: 'NOT NULL' },
      { name: 'payment_status', type: 'VARCHAR(15)', description: "Financial execution result: 'succeeded', 'failed', 'refunded'.", constraints: 'NOT NULL' }
    ],
    relationships: [],
    indexes: [],
    sql: `
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_charge_id VARCHAR(100) UNIQUE NOT NULL,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    amount_cents INT NOT NULL,
    stripe_fee_cents INT NOT NULL,
    payment_status VARCHAR(15) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    exampleRecord: `{
  "id": "bb0033fa-cc31-4df2-bd32-0925afbc39ab",
  "stripe_charge_id": "ch_3MtKffLksR6C58L3g8",
  "subscription_id": "33ffcc22-aab9-48df-bc21-229efbc3df9a",
  "amount_cents": 1299,
  "stripe_fee_cents": 68,
  "payment_status": "succeeded"
}`
  },

  // ANALYTICS DOMAIN (PARTITIONED IN PRODUCTION)
  {
    tableName: 'user_events',
    domain: 'Analytics',
    purpose: 'High-speed metrics database logging click components, session switches, app crashes, and browser metadata.',
    columns: [
      { name: 'id', type: 'BIGSERIAL', description: 'Auto-incrementing serial integer PK.', constraints: 'PRIMARY KEY' },
      { name: 'user_id', type: 'UUID', description: 'User index code identifier.', constraints: 'REFERENCES users(id)' },
      { name: 'event_type', type: 'VARCHAR(50)', description: "Click metric: 'btn_click', 'audio_listen_fail', 'nav_tab_change'.", constraints: 'NOT NULL' },
      { name: 'device_platform', type: 'VARCHAR(15)', description: "User agent platform: 'android', 'ios', 'chrome_extension', 'browser'.", constraints: 'NOT NULL' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Event time.', constraints: 'DEFAULT CURRENT_TIMESTAMP' }
    ],
    relationships: [],
    indexes: [
      'CREATE INDEX idx_user_events_range ON user_events(created_at DESC);'
    ],
    sql: `
-- Implemented via Hash/Time Range Partitioning on AWS Aurora cluster
CREATE TABLE user_events (
    id BIGSERIAL,
    user_id UUID,
    event_type VARCHAR(50) NOT NULL,
    device_platform VARCHAR(15) NOT NULL,
    metadata JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (created_at);
`,
    exampleRecord: `{
  "id": 884029219,
  "user_id": "e2ba34cf-b2f5-46aa-bdbe-1122a6bbbbcc",
  "event_type": "audio_listen_fail",
  "device_platform": "browser",
  "metadata": {
    "browser_agent": "Mozilla/5.0 Chrome/120.0.0",
    "voice_selected": "pt-PT-standard",
    "network_latency": "142ms"
  },
  "created_at": "2026-06-16T12:25:00.123Z"
}`
  }
];

export const dbCachingStrategy = `
========================================================================================
                              REDIS CACHING TOPOLOGY & STRATEGY
========================================================================================

1. Distributed Token Blocker (Access Token Revocations):
   - Scope: Guarding REST paths against blacklisted access JWTs.
   - Operations: Check JWT blacklists inside memory nodes in <1.5ms.
   - TTL Policy: Expire records instantly after token validity (15 mins maximum).

2. SRS Spaced Repetition Session Vectors:
   - Scope: Instantaneous memory load of SRS Flashcards for busy learners.
   - Operations: Cache compiled student card configurations (Leitner boxes) as dynamic hashes.
   - TTL Policy: Expire after 2 hours of inactivity. Saves intensive Aurora database queries.

3. Duolingo-style Leaderboard Brackets (Redis Sorted Sets):
   - Key layout: "leagues:A1_gold:shard_004"
   - Structure: Sorted Sets (ZADD / ZINCRBY).
   - High Speed reading: Direct O(log(N)) fetching of highest 100 gamers.

4. Daily Checked-in Streaks Memory Blocks:
   - Target layout: "user:streaks:<user_id>"
   - Purpose: Mitigates lock exhaustion during user login flows.
`;

export const dbPartitioningStrategy = `
========================================================================================
                         POSTGRES TABLE PARTITIONING BLUEPRINT
========================================================================================

To sustain over 1 million concurrent users and tens of millions of daily actions, FalarPortuguês DB
engine implements horizontal table partitioning in PostgreSQL:

1. Time Range Partitioning (Analytics event logs):
   - Mapped tables: "user_events", "learning_metrics", "engagement_metrics"
   - Strategy: Partitioned monthly based on the "created_at" column value.
   - Benefit: Facilitates fast index scanning and allows historical data purging using basic "DROP PARTITION" commands.

2. Hash Partitioning (Transformed progress transactions):
   - Mapped tables: "xp_history", "lesson_progress"
   - Strategy: Partitioned hash by the "user_id" column, splitting data into 16 distinct sub-nodes.
   - Benefit: Distributes disk operations and CPU calculations evenly across RDS database volumes during high usage.
`;

export const dbOptimizations = [
  'Aurora Serverless V2 autoscaling between 2 and 128 dynamic ACUs (Aurora Capacity Units) to protect budgets.',
  'Read-Replica Connection Mappings: Direct heavy analytic reporting tools exclusively to read-only replica endpoint ports.',
  'Materialized Views for League stats: Refreshed every 10 minutes via cron queues, avoiding real-time score summation overheads.',
  'PgBouncer Integration: Pooling server sessions down to <200 active slots, mitigating RAM consumption issues.',
  'Auto-Vacuum Adjustments: Configured at 10% threshold scales on progress tables to keep index performance levels pristine.'
];

export const dbBackupStrategy = [
  'Automated Point-In-Time Restoration (PITR): Maintains WAL (Write-Ahead-Logs) directly on highly reliable AWS S3, enabling fine precision restorations (down to single seconds).',
  'Multi-Region DB Failovers: Hot standby read replicas distributed across secondary Europe regions (e.g. Ireland / Frankfurt), achieving automated promotions under 20 seconds.',
  'Disaster Drills: Bi-weekly automated restoration simulation cycles verifying system database integrity states.',
  'S3 Glacier Vault lock rules to ensure extreme resilience against ransomware attempts.'
];

export const dbMultiLanguageStrategy = `
========================================================================================
                     MULTI-LANGUAGE CONTENT LOCALIZATION SCHEMA
========================================================================================

FalarPortuguês implements a clean schema to deliver high-performance course pathways matching diverse global learners:

1. Course Schema Hierarchy:
   Allows setting any base study tongue pairing dynamically (e.g. French -> Portuguese). Every unit and instruction lesson maps to the master course identifier, routing translated instruction statements via the "instructions_pt" column and localized JSON payloads.

2. Content translation structures:
   Under units and exercise configurations, content is stored using key-value JSON parameters mapping target translations (e.g. {"en_US": "good morning", "fr_FR": "bonjour"}). By using the Postgres JSONB datatype, we search translated structures at high speed.
`;
