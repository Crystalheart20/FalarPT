/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemPrompt {
  coachName: string;
  role: string;
  focus: string;
  systemPrompt: string;
  exampleUserQuery: string;
  exampleAiResponse: string;
}

export interface ProcessingStep {
  phase: string;
  action: string;
  latencyMs: number;
  mitigationStrategy: string;
}

export interface MetricWeight {
  dimension: string;
  coefficient: number;
  scoringEquation: string;
  descriptionPt: string;
}

export interface SrsInterval {
  grade: number;
  meaning: string;
  intervalMultiplier: number;
  nextIntervalFormula: string;
}

export interface LanguageAdaptation {
  lang: string;
  nativeContrastPoint: string;
  pedagogicalPriority: string;
}

export const aiTutorArchitecture = {
  title: "AI tutor Architecture",
  tagline: "Ultra-low Latency Multi-Agent Conversational Router",
  overview: "Our pipeline transitions incoming websocket audio payloads into immediate phonetic assessment vectors and contextual semantic replies, while maintaining an asynchronous long-term memory lookup with context gating.",
  sessionLifecycle: {
    duration: "Persistent stateless sessions with 15-minute tokenized context memory buffers.",
    contextSize: "16k dynamic sliding viewport (approx. 4 previous lesson cards + memory summaries).",
    caching: "Redis transient session store with warm-loading of long-term lexical vectors."
  },
  memoryStreams: [
    {
      type: "Anisochonous Long-Term Memory (LTM)",
      technology: "Vector Database (pgvector) embedding individual learner lexical gaps.",
      usage: "Injects user's top-3 persistent mistakes (e.g. clashing Tu/Você verbal forms) as system prompt guards before generating new conversational prompts."
    },
    {
      type: "Transient Session context buffer",
      technology: "In-memory circular JSON queue",
      usage: "Tracks the active linguistic thread (e.g. 'Visiting a doctor in Porto' context) and previous phonetic correction records."
    }
  ]
};

export const systemPromptsList: SystemPrompt[] = [
  {
    coachName: "Vocabulário / Vocabulary Coach",
    role: "Linguistic Lexical Strategist (Sophia)",
    focus: "Accelerating lexical retention using European Portuguese structures, strictly differentiating from Brazilian equivalents.",
    systemPrompt: `You are Sophia, the Lexical Coach for European Portuguese. 
Your core instructions:
1. Teach vocabulary using authentic Lisbon/Porto phrasing (e.g., 'autocarro', NOT 'ônibus'; 'comboio', NOT 'trem'; 'casa de banho', NOT 'banheiro').
2. Provide a clean Phonetic Transcription in IPA standard brackets.
3. Construct clear example sentences showcasing real European scenarios (such as buying a pastel de nata or validating a Lisbon Metro card).
4. Do not offer translations in Brazilian Portuguese.
5. Emphasize prepositions (e.g., 'ir a...', 'gostar de...').`,
    exampleUserQuery: "How do I say 'clerk' at a public office like AIMA?",
    exampleAiResponse: "Olá! Under Lisbon standards, you call a clerk an **oficial de atendimento** or **funcionário [fũsjuˈnaɾju]**. We avoid the Brazilian word 'atendente'. To use it in a sentence: 'O funcionário da AIMA validou os meus documentos.' (The AIMA clerk validated my documents)."
  },
  {
    coachName: "Gramática / Grammar Coach",
    role: "Syntactic Analyst (Marcos)",
    focus: "Resolving pronoun placements (proclisis vs enclisis) and the formal/informal 'tu' vs 'você' alignment constraints.",
    systemPrompt: `You are Marcos, the Grammar Architect for PT-PT.
Your core instructions:
1. Explain structural errors using the formal CEFR rules.
2. Differentiate strictly between 'tu' (informal) and 'você' (formal, conjugated in the 3rd person singular).
3. Correct pronoun placements. In European Portuguese, enclisis is the default state ('dá-me o livro'), whereas in negation, proclisis is enforced ('não me dês o livro').
4. Render grammatical breakdowns inside clean structured syntax blocks. Avoid linguistic jargon without clear definitions.`,
    exampleUserQuery: "Why is 'Não dá-me isso' flagged as an error?",
    exampleAiResponse: "Excelente pergunta! In PT-PT, the negation word **'não'** acts as a syntactic magnet that pulls the pronoun *before* the verb (proclisis). Therefore, 'Não dá-me' is incorrect. Under Lisbon standards, you must say: **'Não me dês isso'** (for informal 'tu') or **'Não me dê isso'** (for formal 'você')."
  },
  {
    coachName: "Conversação / Conversation Coach",
    role: "Portuguese Empathy Companion (Rita)",
    focus: "Maintaining engaging roleplay scenarios while calculating live fluency metrics to encourage confident speech production.",
    systemPrompt: `You are Rita, an encouraging Lisbon local guiding conversational scenarios.
Your core instructions:
1. Converse in standard European Portuguese, utilizing colloquial phrases representing modern municipal regions (e.g., 'pois é', 'pá', 'está bem').
2. Ask one simple follow-up question per turn to avoid overwhelming the learner.
3. Provide hints in brackets for difficult terms, translated to English or the native language specified.
4. Scale vocabulary difficulty exactly matching the learner's active CEFR metrics (A1-B2).`,
    exampleUserQuery: "Quero pedir um café e um bolo.",
    exampleAiResponse: "Com certeza, está bem! Sophia responde: 'Olá! Pois é, bem-vindo ao café! O que vai desejar? Queres um **café curto** (espresso shot) ou uma **meia de leite** (coffee with milk)? E para acompanhar, queres um **pastel de nata**?'"
  },
  {
    coachName: "Pronúncia / Pronunciation Coach",
    role: "Phonetic Acoustic Evaluator (Dr. Eduardo)",
    focus: "Corrective feedback focusing on vocalic reductions, dental letters, and the mute 'e' at the end of Lisbon phrases.",
    systemPrompt: `You are Dr. Eduardo, the Phonetic Speech Recognition specialist at FalarPortuguês.
Your core instructions:
1. Pinpoint acoustic deviations in European Portuguese standard pronunciations.
2. Analyze vocalic reductions: unstressed vowels are usually heavily reduced or fully muted (e.g., 'excelente' sounds like [ʃlẽt], 'peixe' is [pɐjʃ]).
3. Differentiate Lisbon's palatalized 's' sound (which sounds like 'sh' [ʃ] at the end of syllables) from Brazilian dental 's' [s].
4. Provide immediate corrective acoustic suggestions with explicit tongue placements.`,
    exampleUserQuery: "My pronounciation of 'Lisboa' was flagged as [liz.bo.a]. Why?",
    exampleAiResponse: "Ah! In PT-PT, the 's' before 'b' is voiced and palatalized as a **'zh' [ʒ]** sound. Pronouncing it as [liz...] is a classic Brazilian or English slip. Try saying **'Lizh-boh-ah' [liʒ.ˈβo.ɐ]**, with very quiet, squeezed dental frictional resistance on the first syllable."
  }
];

export const speechPipeline: ProcessingStep[] = [
  {
    phase: "1. Client Waveform Compression",
    action: "PCM-16bit audio captured via HTML5 MediaRecorder API, compressed into standard WebM/OPUS fragments inside a circular buffer.",
    latencyMs: 40,
    mitigationStrategy: "Dynamic packetizing: Stream audio packets of exactly 150ms blocks to prevent massive payload delivery delay."
  },
  {
    phase: "2. Speech-to-Text Transcription",
    action: "Websocket transfer pushing compressed segments into customized Whisper-large-v3 instances trained exclusively on European Portuguese dialect corpora.",
    latencyMs: 180,
    mitigationStrategy: "Pruned attention filters and cached preceding lexical contexts to bypass initial transformer warmup steps."
  },
  {
    phase: "3. Phonetic Forced Alignment",
    action: "MFA (Montreal Forced Aligner) maps transcription phonemes directly against native reference recordings to segment vowels and consonants on millisecond coordinates.",
    latencyMs: 110,
    mitigationStrategy: "Parallelized acoustic GPU clusters evaluating syllabic splits synchronously."
  },
  {
    phase: "4. Acoustic Feature Extraction",
    action: "Extracting pitch tracks (F0 contours), intensity contours, and formants to analyze the distinct, speech-like reductions in Lisbon accents.",
    latencyMs: 70,
    mitigationStrategy: "Quantized light-weight convolutional networks executing directly in RAM caches."
  },
  {
    phase: "5. Scoring & Context Synthesis",
    action: "Formulas process dimension scales and trigger Gemini-2.5-Flash to synthesize contextual, warm educational replies.",
    latencyMs: 250,
    mitigationStrategy: "Asynchronous parallel synthesis: execute speech evaluation scoring metrics while streaming text answers."
  }
];

export const pronunciationMetrics: MetricWeight[] = [
  {
    dimension: "Acoustic Accuracy",
    coefficient: 0.35,
    scoringEquation: "S_acc = 100 * exp(-α * ∑(Freq_observed - Freq_native)^2)",
    descriptionPt: "Calculates the strict phonetic deviation of Lisbon's deep vowel shifts and reduced vocalic letters (e.g. standard PT-PT palatalized fricatives)."
  },
  {
    dimension: "Fluency & Cadence",
    coefficient: 0.25,
    scoringEquation: "S_flu = 100 * (Duration_speech - Duration_silence) / Total_Duration",
    descriptionPt: "Measures speech progress by tracking pause ratios, minimizing hesitations, and verifying standard European Portuguese word-linking (sandhi)."
  },
  {
    dimension: "Tone Intonation",
    coefficient: 0.15,
    scoringEquation: "S_int = 100 * Pearson_Correlation(Pitch_user, Pitch_native)",
    descriptionPt: "Verifies the pitch curvature (melodic pitch drops) typical of informal and formal interrogative constructions in the Porto/Lisbon axis."
  },
  {
    dimension: "Rhythmic Timing",
    coefficient: 0.15,
    scoringEquation: "S_rhy = 100 * Variance(Duration_syllables_user) / Variance_native",
    descriptionPt: "Analyzes the stress-timed cadence distinct to PT-PT, contrasting sharply with syllable-timed Latin language models."
  },
  {
    dimension: "Decisive Confidence",
    coefficient: 0.10,
    scoringEquation: "S_conf = 100 * (1 - RMSE(Energy_signal_decay))",
    descriptionPt: "Measures decibel intensity consistency, ensuring the user is speaking confidently without volume tapering at word endings."
  }
];

export const srsIntervalRules: SrsInterval[] = [
  {
    grade: 5,
    meaning: "Perfect immediate recall, no hesitation.",
    intervalMultiplier: 2.1,
    nextIntervalFormula: "I(n) = I(n-1) * EF * 1.2"
  },
  {
    grade: 4,
    meaning: "Correct response, but with brief phonetic hesitation.",
    intervalMultiplier: 1.6,
    nextIntervalFormula: "I(n) = I(n-1) * EF"
  },
  {
    grade: 3,
    meaning: "Correct response, but required heavy cognitive stress.",
    intervalMultiplier: 1.2,
    nextIntervalFormula: "I(n) = I(n-1) * 1.2"
  },
  {
    grade: 2,
    meaning: "Incorrect response, but easily recalled when shown the explanation.",
    intervalMultiplier: 0.4,
    nextIntervalFormula: "I(n) = 1 day (Forced immediate drop)"
  },
  {
    grade: 1,
    meaning: "Absolute black-out failure, word card felt completely foreign.",
    intervalMultiplier: 0.1,
    nextIntervalFormula: "I(n) = immediate queue recycle (same lesson loop)"
  }
];

export const adaptiveAlgorithms = {
  dynamicAdjustment: {
    title: "Dynamic CEFR Difficulty Balancer (DDB)",
    logic: "Calculate dynamic rolling score W_roll = 0.6 * Acc_speaking + 0.4 * Acc_grammar. If W_roll > 90% for 3 consecutive modules, trigger immediate progression gate. If W_roll < 65%, dynamically inject scaffolded cards containing grammatical overlays."
  },
  reviewPrioritization: "Weakest-link scheduler: Words or phonetic units with a calculated retention margin below 70% are automatically injected into the first 3 active slots of the daily learning track."
};

export const aiLessonGeneratorWorkflow = {
  workflowSteps: [
    {
      step: "1. Lexical Seed Selection",
      desc: "Retrieve required lexical targets from CEFR standard tables (e.g. Unit 3 Lisbon Transit words)."
    },
    {
      step: "2. Synthetic Draft Generation",
      desc: "Execute Gemini-2.5-Flash to draft text dialogues, reading texts, phonetics IPA scales, and vocabulary matching options."
    },
    {
      step: "3. Grammatical Rule Guardrail",
      desc: "Our automated AST (Abstract Syntax Tree) validator screens the generated PT draft to verify that no Brazilian Portuguese phrasing or clitic structures are present."
    },
    {
      step: "4. Human Linguistic Sign-Off",
      desc: "Senior native linguists review generated content cards before flagging them as live production curriculum nodes."
    }
  ]
};

export const nativeLanguageAdaptations: LanguageAdaptation[] = [
  {
    lang: "English (EN)",
    nativeContrastPoint: "Struggles with closed vowel reductions and nasalization, treating them as diphthongs.",
    pedagogicalPriority: "Enforce deep nasal drill tasks and explain that PT-PT is stress-timed (vowels diminish) rather than syllable-timed like Romance counterparts."
  },
  {
    lang: "Spanish (ES)",
    nativeContrastPoint: "Prone to pronouncing PT-PT words with a Spanish phone, ignoring critical palatalized 's' [ʃ] and phonetic 'z' distinctions.",
    pedagogicalPriority: "Reinforce acoustic exercises highlighting the distinct PT palatal sounds (e.g., 'escola' sounds like 'eh-shkohl-uh' [iʃ.ˈko.lɐ], not [es.ko.la])."
  },
  {
    lang: "French (FR)",
    nativeContrastPoint: "Struggles with dental consonant placements and the specific PT-PT stress rhythm.",
    pedagogicalPriority: "Acoustic practice focus on open/closed vowel distinctions (e.g. 'avó' vs 'avô') and non-nasal final vowels."
  },
  {
    lang: "German (DE)",
    nativeContrastPoint: "Struggles with deep guttural vocal reduction contrasts and pronoun placement flow.",
    pedagogicalPriority: "Interactive lessons highlighting the syntactic magnetism of proclisis during negation."
  },
  {
    lang: "Arabic (AR)",
    nativeContrastPoint: "May struggle with dental friction differences and modern colloquial vowel reductions.",
    pedagogicalPriority: "Focus pronunciation rules on dental-palatal transitions and short final syllable reductions."
  },
  {
    lang: "Chinese (ZH)",
    nativeContrastPoint: "Struggles with complex multi-syllabic stress patterns, final 'l' dark reductions, and pronoun syntax.",
    pedagogicalPriority: "Emphasize phonetic IPA tracking on the dark final l [ɫ] sound (e.g. 'Portugal' ends with a dental dark l, not sound vocalization)."
  }
];

export const aiSafetyGuidelines = [
  "Strict Lexicon Validation: Pre-compiled lists of 4,500 Lisbon-standard terms act as physical limits on generative vocabulary models.",
  "Automatic Hallucination Shield: Explanations must match a warm curated corpus of pre-verified pedagogical rules. If the model attempts to generate a rule outside our database, a fallback explanation card is inserted automatically.",
  "Dialect Contamination Check: Daily telemetry scanning flags words containing Brazilian suffixes (e.g., verbs ending in standard continuous gerund '-ndo' instead of PT-PT infinite '+ a' like 'estou a correr' vs 'estou correndo')."
];
