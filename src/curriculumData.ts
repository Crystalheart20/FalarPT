/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CefrLevel {
  id: string; // "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  title: string;
  subTitle: string;
  vocabularyTarget: number;
  grammarFocus: string[];
  communicationGoal: string;
  listeningObjective: string;
  speakingObjective: string;
  readingObjective: string;
  writingObjective: string;
  cultureIntegration: string;
  units: {
    unitTitle: string;
    modules: {
      moduleTitle: string;
      lessons: string[];
    }[];
  }[];
}

export const cefrLevels: CefrLevel[] = [
  {
    id: "A1",
    title: "A1 Beginner",
    subTitle: "Iniciação (Breakthrough)",
    vocabularyTarget: 1500,
    grammarFocus: [
      "Articles (Definite and Indefinite gender locks)",
      "Subject Pronouns (Tu vs Você paradigm)",
      "Present Indicative of regular verbs (-AR, -ER, -IR)",
      "Essential irregular verbs: Ser, Estar, Ter, Ir"
    ],
    communicationGoal: "Understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.",
    listeningObjective: "Understand slow, carefully articulated speech about basic personal info and concrete immediate surroundings.",
    speakingObjective: "Introduce self and others, ask and answer simple questions about personal details, order food at standard cafés.",
    readingObjective: "Read short, simple texts (such as street signs, posters, catalogs, simple brochures) word by word.",
    writingObjective: "Write very short simple messages, postcards, or complete registration surveys with personal details.",
    cultureIntegration: "The Lisbon Café Ritual: Ordering 'um café curto' vs 'uma meia de leite'; basic polite social formulas ('Se faz favor', 'Muito obrigado').",
    units: [
      {
        unitTitle: "Unit 1: Primeiros Passos (First Steps)",
        modules: [
          {
            moduleTitle: "Module 1: Greetings & Saying Hello",
            lessons: ["Lesson 1: Say 'Olá' and 'Bom Dia'", "Lesson 2: Tu vs Você distinction", "Lesson 3: Asking 'Como estás?'"]
          },
          {
            moduleTitle: "Module 2: Introductions",
            lessons: ["Lesson 1: 'Chamo-me...' (Introducing yourself)", "Lesson 2: Stating national origin", "Lesson 3: Exchanging phone numbers"]
          }
        ]
      },
      {
        unitTitle: "Unit 2: No Café de Lisboa",
        modules: [
          {
            moduleTitle: "Module 1: Food & Ordering",
            lessons: ["Lesson 1: Pastel de Nata & Café terms", "Lesson 2: 'Queria...' (Polite conditional)", "Lesson 3: Asking for the bill ('A conta, por favor')"]
          }
        ]
      }
    ]
  },
  {
    id: "A2",
    title: "A2 Elementary",
    subTitle: "Caminho (Waystage)",
    vocabularyTarget: 2500,
    grammarFocus: [
      "Pretérito Perfeito Simples (Completed past actions)",
      "Reflexive verbs & pronoun contraction (dar-me, chamar-me)",
      "Comparisons of equality and superiority",
      "Prepositions of place (em, para, a, por contractions)"
    ],
    communicationGoal: "Understand sentences and frequently used expressions related to areas of most immediate relevance.",
    listeningObjective: "Understand clear colloquial phrases in slow standard recordings regarding family details, local geography, and employment.",
    speakingObjective: "Describe in simple terms aspects of background, immediate environment, and matters in areas of immediate need.",
    readingObjective: "Locate specific, predictable information in daily items like advertisements, menus, timetables, and short personal letters.",
    writingObjective: "Write simple notes and short personal emails expressing direct gratitude or asking immediate questions.",
    cultureIntegration: "Portuguese Neighborhood Life: Interactive dialogue about local grocery shopping ('na mercearia'), bakeries, and municipal public safety.",
    units: [
      {
        unitTitle: "Unit 3: Rotinas & Compras",
        modules: [
          {
            moduleTitle: "Module 1: Talking About the Past",
            lessons: ["Lesson 1: Pretérito Perfeito of regular verbs", "Lesson 2: What I did yesterday in Porto", "Lesson 3: Irregular past forms (Fui, Tive, Estive)"]
          },
          {
            moduleTitle: "Module 2: Shopping & Directions",
            lessons: ["Lesson 1: Grocery list ('a mercearia')", "Lesson 2: Asking 'Onde fica o Correio?'", "Lesson 3: Metric measurements (quilos, gramas)"]
          }
        ]
      }
    ]
  },
  {
    id: "B1",
    title: "B1 Intermediate",
    subTitle: "Limiar (Threshold)",
    vocabularyTarget: 4000,
    grammarFocus: [
      "Pretérito Imperfeito (Ongoing past habits / storytelling)",
      "Futuro do Indicativo (Regular vs Irregular forms)",
      "Conditional structures ('gostaria', 'faria')",
      "Pronoun Placement Rules: Proclisis (negation magnets) vs Enclisis (default)"
    ],
    communicationGoal: "Understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.",
    listeningObjective: "Follow uncomplicated technical presentations or general thematic radio podcasts in standard PT-PT accents.",
    speakingObjective: "Enter unprepared into conversations on familiar topics; connect phrases to tell stories, explain dreams, or argue temporary plans.",
    readingObjective: "Read straightforward factual texts on subjects related to fields of personal or professional interest with satisfactory level of comprehension.",
    writingObjective: "Write simple connected texts on topics which are familiar or of personal interest with reasonable syntactic cohesion.",
    cultureIntegration: "Traditional Festivities: Understanding the St. Anthony festival ('Santos Populares') in Lisbon and historical Fado structures.",
    units: [
      {
        unitTitle: "Unit 4: O Meu Quotidiano (Daily Experiences)",
        modules: [
          {
            moduleTitle: "Module 1: Storytelling in the Past",
            lessons: ["Lesson 1: Imperfeito vs Perfeito contrast", "Lesson 2: 'Antigamente...' (My childhood habits)", "Lesson 3: Describing old Portuguese houses"]
          },
          {
            moduleTitle: "Module 2: Professional Routines",
            lessons: ["Lesson 1: Office vocabulary ('escritório')", "Lesson 2: Scheduling a Zoom meeting", "Lesson 3: Emails using formal preambles ('Caro Senhor')"]
          }
        ]
      }
    ]
  },
  {
    id: "B2",
    title: "B2 Upper Intermediate",
    subTitle: "Vantagem (Vantage)",
    vocabularyTarget: 5500,
    grammarFocus: [
      "Present Subjunctive (Conjuntivo - doubts, wishes, emotion triggers)",
      "Imperfect Subjunctive ('Se eu pudesse...')",
      "Personal Infinitive (Infinitivo Pessoal - distinct to Portuguese syntax)",
      "Compound past tenses (Pretérito Mais-que-perfeito Composto)"
    ],
    communicationGoal: "Understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.",
    listeningObjective: "Understand standard live lectures, standard news bulletin broadcasts, and complex native arguments at normal pace.",
    speakingObjective: "Deliver clear, detailed descriptions on a wide range of subjects; explain a viewpoint on a topical issue giving the advantages and disadvantages.",
    readingObjective: "Read contemporary articles, reports, and literary prose texts where writers adopt particular stances or points of view.",
    writingObjective: "Write clear, detailed texts, reports, or analytical reviews on subjects related to fields of interest, synthesis of disparate arguments.",
    cultureIntegration: "Current Affairs & Relocation Logistics: Adapting to the NIF application bureaucracy, rental contracts ('arrendamento'), and public healthcare ('SNS' portal).",
    units: [
      {
        unitTitle: "Unit 5: Cidadania & Burocracia",
        modules: [
          {
            moduleTitle: "Module 1: Expressing Desires & Doubts",
            lessons: ["Lesson 1: Triggering the Conjuntivo ('Espero que...')", "Lesson 2: Doubt triggers ('Duvido que...')", "Lesson 3: Present Conjuntivo conjugations"]
          },
          {
            moduleTitle: "Module 2: Dynamic Hypotheses",
            lessons: ["Lesson 1: Imperfect Conjuntivo with Conditional", "Lesson 2: 'Se eu tivesse tempo...'", "Lesson 3: The powerful Personal Infinitive rules"]
          }
        ]
      }
    ]
  },
  {
    id: "C1",
    title: "C1 Advanced",
    subTitle: "Autonomia (Effective Operational Proficiency)",
    vocabularyTarget: 7500,
    grammarFocus: [
      "Future Subjunctive syntax ('Quando tu fores...')",
      "Gerund vs Infinitive constructions under European rules ('estar a + infinitive')",
      "Double participial adjectives (aceite vs aceitado)",
      "Advanced complex sentence coordination and passive voice variations"
    ],
    communicationGoal: "Understand a wide range of demanding, longer texts, and recognize implicit meaning. Express ideas fluently and spontaneously without much obvious searching for expressions.",
    listeningObjective: "Process complex fast television debates, colloquial dialect variations from Alentejo or Azores, and implicit irony filters.",
    speakingObjective: "Present clear well-structured descriptions of complex topics; formulate thoughts precisely and link contributions to standard peers.",
    readingObjective: "Understand long complex technical and literary texts, appreciating socio-stylistic differences in tone and register.",
    writingObjective: "Write clear, well-structured exposition texts on complex subjects, expressing key points with a highly controlled layout.",
    cultureIntegration: "Portuguese Literary Legends: Exploring works of Fernando Pessoa, Luís de Camões, and the socio-historical impacts of the Carnation Revolution.",
    units: [
      {
        unitTitle: "Unit 6: Literatura & Sociedade",
        modules: [
          {
            moduleTitle: "Module 1: Future Conditions",
            lessons: ["Lesson 1: Future Subjunctive triggers", "Lesson 2: 'Quando vieres a Portugal...'", "Lesson 3: Contractual legal prose analysis"]
          },
          {
            moduleTitle: "Module 2: Sophisticated Nuance",
            lessons: ["Lesson 1: Dual participle selections", "Lesson 2: Advanced passive structures", "Lesson 3: Idiomatic regionalisms of Porto"]
          }
        ]
      }
    ]
  },
  {
    id: "C2",
    title: "C2 Mastery",
    subTitle: "Maestria (Mastery)",
    vocabularyTarget: 10000,
    grammarFocus: [
      "Archaisms, stylistic inversion, and literary syntax patterns",
      "Exceptional clitic configurations (mesoclisis: 'dar-te-ei')",
      "Absolute superlative absolute models",
      "Extreme administrative structures and legislative terminology frameworks"
    ],
    communicationGoal: "Understand with ease virtually everything heard or read. Summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.",
    listeningObjective: "Follow all fast-paced native discussions, whispery theatrical plays, rapid overlapping speech, and complex audio archives.",
    speakingObjective: "Argue fine shades of meaning with precision; deliver smooth presentations or complex political debates at near-native ease.",
    readingObjective: "Understand and interpret virtually all forms of written language, including abstract, structurally complex, or colloquial texts.",
    writingObjective: "Write smooth, flowing, and highly sophisticated administrative reports, critical reviews ofCamões essays or complex legislative reviews.",
    cultureIntegration: "The Complete Lusophone Matrix: Strategic political nuances, maritime history, and regional variations (Azores, Madeira, interaction with formal PALOP structures).",
    units: [
      {
        unitTitle: "Unit 7: A Lusofonia Global",
        modules: [
          {
            moduleTitle: "Module 1: Mesoclisis Mastery",
            lessons: ["Lesson 1: Mesoclisis rules ('comprar-lhe-ei')", "Lesson 2: Sophisticated business letters", "Lesson 3: Archaisms in official documents"]
          },
          {
            moduleTitle: "Module 2: Critical Discursive Output",
            lessons: ["Lesson 1: Presenting complex economic arguments", "Lesson 2: Expressing deep political irony", "Lesson 3: Camões lyrical analysis"]
          }
        ]
      }
    ]
  }
];

export const vocabularyRoadmap = {
  overallTarget: "10,000+ Active Lemmatized European Portuguese Words",
  frequencyPrioritization: [
    { rank: "Group 1: 1 - 500", focus: "Grammar particles, structural verbs, basic nouns of place and home.", standardA1: "95% Coverage" },
    { rank: "Group 2: 501 - 2000", focus: "Intermediate situational vocabulary (transit, bureaucracy, café menu items).", standardA1: "40%, A2: 85% Coverage" },
    { rank: "Group 3: 2001 - 5000", focus: "Professional, legal vocabulary, administrative terms like NIF, AIMA documents.", standardA1: "0%, B2: 80% Coverage" },
    { rank: "Group 4: 5001 - 10000+", focus: "Highly academic, literary adjectives, rare idioms, and archaisms.", standardA1: "0%, C2: 95% Coverage" }
  ],
  categories: [
    { name: "Socio-Bureaucracy (NIF/AIMA)", keyTerms: ["oficial de atendimento", "título de residência", "representante fiscal", "agendamento"] },
    { name: "Portuguese Transit (CEFR Roads)", keyTerms: ["autocarro", "comboio", "paragem", "bilheteira", "validar"] },
    { name: "Gastronomy & Café (Lisbon Axis)", keyTerms: ["pastel de nata", "bica / café curto", "meia de leite", "pequeno-almoço", "fatura"] },
    { name: "Relocation & Home", keyTerms: ["arrendamento", "senhorio", "caução", "recibo de renda", "freguesia"] }
  ]
};

export const assessmentStandards = {
  gradingScale: {
    excellent: "90% - 100% (Aprovado com Distinção - Certified)",
    good: "75% - 89% (Aprovado com Mérito)",
    pass: "55% - 74% (Aprovado)",
    fail: "0% - 54% (Reprovado - Requires Module Retake)"
  },
  examStructure: [
    { type: "Placement Exam (Diagnóstico)", duration: "25 minutes", focus: "Iterative syntax checking to slot the user into A1-B2 automatically." },
    { type: "Speaking Assessment (Acoustic)", duration: "10 minutes", focus: "MFA phoneme checking with Voice recorder. Scoring accuracy & fluency." },
    { type: "Listening & Cloze Tasks", duration: "15 minutes", focus: "Radio broadcast comprehension and quick transcription gaps." }
  ]
};

export const graduationRequirements = [
  { level: "A1 Milestone", badgeName: "Lisboeta Iniciação", criteria: "Complete Unit 1 & 2 + 1,500 active vocab nodes + placement oral test (>60% accuracy)." },
  { level: "A2 Milestone", badgeName: "Navegador Trânsito", criteria: "Complete Unit 3 + 2,500 vocab nodes + verified grocery list auditory challenge." },
  { level: "B1 Milestone", badgeName: "Cronista de Fado", criteria: "Complete Unit 4 + pronoun placement test + past narrative verbal test." },
  { level: "B2 Milestone", badgeName: "Cidadão SNS", criteria: "Complete Unit 5 + Personal Infinitive master test + mock SNS portal dialogue." },
  { level: "C1 Milestone", badgeName: "Pessoa Literário", criteria: "Complete Unit 6 + Future Subjunctive exam + double participles audit." },
  { level: "C2 Milestone", badgeName: "Embaixador Camões", criteria: "Complete Unit 7 + Mesoclisis dissertation + live peer review chat (Acoustic >90%)." }
];

export const aiGenerationStandards = {
  astRules: [
    "Verify zero usage of continuous gerund suffixes (e.g. Reject 'estou fazendo', Rewrite to 'estou a fazer').",
    "Prune Brazilian spellings automatically (e.g. Reject 'projeto', 'feto', 'diretor'; Inject standard silent-consonant omissions or preservation matching PT-PT like 'projecto' depending on target spelling model).",
    "Filter typical Brazilian vocabulary (e.g. Replace 'ônibus' with 'autocarro', 'trem' with 'comboio', 'banheiro' with 'casa de banho')."
  ],
  promptModifiers: [
    "Inject the user's L1 diagnostic profile into the prompt context to guide explanations toward native contrast points.",
    "Force the model to return phonetic pronunciations using standard IPA formatting inside brackets.",
    "Validate generated multiple-choice answers for absolute logical cohesion, ensuring exactly one native PT-PT option is mathematically correct."
  ]
};
