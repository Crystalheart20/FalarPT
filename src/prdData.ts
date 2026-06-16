/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRDSection, WordCard, GrammarRule, AudioDialogue, ReadingStory, WritingChallenge } from './types';

export const prdSections: PRDSection[] = [
  {
    id: 'executive_summary',
    title: '1. Executive Summary & Strategy',
    icon: 'Briefcase',
    summary: 'The strategic rationale and product vision for a premier European Portuguese (PT-PT) learning platform, addressing a historic underserving in the global language-learning market.',
    details: [
      'Market Opportunity: Most major vocabulary Apps group Portuguese together, defaulting to Brazilian Portuguese (PT-BR). Learners who move to Portugal, however, face major social and administrative friction due to critical differences in phonetics, vocabulary, grammar, and pronoun usage.',
      'Core Mission: To create a comprehensive, hyper-practical European Portuguese acquisition tool tailored for expats, tourists, remote workers, and students, combining gamified engagement with deep structural tutoring.',
      'Collaboration Objective: Blending Duolingo’s habit-forming gamification, Babbel’s systematic dialogues, Busuu’s professional feedback loop, and Memrise’s real-world immersive video-soundscapes.'
    ],
    comments: [
      {
        pm: 'Duolingo',
        author: 'Duo the Owl (Duolingo Senior VP of Engagement)',
        avatarColor: 'bg-green-500',
        comment: 'We need to make sure the habit loop is simple. Let’s integrate daily streaks, XP gains, Lisbon-themed badges (like the "Pastel de Nata Devourer" or "Tuk-Tuk Driver"), and lighthearted, digestible 3-minute lessons! People are busy, especially expats and remote workers setting up their new lives.',
        timestamp: '9:15 AM'
      },
      {
        pm: 'Babbel',
        author: 'Clara Schmidt (Babbel Head of Pedagogical Methodology)',
        avatarColor: 'bg-sky-600',
        comment: 'While gamification is fun, European Portuguese is highly inflected and phonetic reduction is a massive barrier. If you teach them Brazilian formulas, Portuguese servers will reply to them in English! We must teach the difference between Tu and Você on Day 1, and make sure grammar tips are clear, academic, yet highly applied.',
        timestamp: '10:04 AM'
      },
      {
        pm: 'Busuu',
        author: 'Sofia Morel (Busuu VP of Product & Social Learning)',
        avatarColor: 'bg-indigo-600',
        comment: 'Expats need official validation for residence visas! We should align our curriculum directly to the CIPLE (A2) exam schema. Let’s also establish an interactive portal where users submit writing tasks and receive real-time corrections from native speakers (or high-accuracy backend AI).',
        timestamp: '11:12 AM'
      },
      {
        pm: 'Memrise',
        author: 'Marcos Silva (Memrise Director of Localized Content)',
        avatarColor: 'bg-amber-500',
        comment: 'Do not use computer-generated Brazilian voices! PT-PT is a stress-timed language, sounding almost Slavic in its consonant clusters. If users do not hear real Lisbon and Porto locals ordering under their breath in busy pastelarias, they will remain completely lost when they arrive.',
        timestamp: '11:45 AM'
      }
    ],
    pmInsights: {
      gamification: 'Short, engaging learning streaks to combat the startup friction of expat relocation.',
      pedagogy: 'Strict focus on Pt-Pt vowel reduction and correct regional pronoun utilization.',
      community: 'Interactive feedback regarding localized phrasing and etiquette.',
      multimedia: 'Phonetic comparison tools mirroring authentic regional pronunciation.'
    }
  },
  {
    id: 'target_audiences',
    title: '2. Target Audience & Persona Profiles',
    icon: 'Users',
    summary: 'A granular analysis of our six target segments, specifying their immediate motivations and custom platform learning path parameters.',
    details: [
      'Complete Beginners: Require immediate confidence builders. Focused on basics like greetings, numbers, and core survival verbs (ser/estar, ter, ir).',
      'Expats Relocating to Portugal: High-stakes motivation. Needs administrative vocabulary: NIF, Freguesia, NISS, SNS health registration, apartment renting. Needs A2/CIPLE certification practice for permanent residency.',
      'Tourists: Short-term utility. Quick checklists on ordering food (Bica, Pastel de Nata, imperial), simple shopping phrases, emergency services, and basic courtesy.',
      'Remote Workers: Needs co-working etiquette, cafe culture, greeting colleagues, and communicating about internet connection, workspace rental, and zoom meetings.',
      'Students: Focused on academic vocabulary, formal writing (emails to professors), public transit discount cards, and cost-efficient cultural integration.',
      'Intermediate Learners: Moving beyond basic vocabulary into complex tenses (Conjuntivo/Subjunctive, Pretérito Mais-que-Perfeito) and quick idiomatic conversations.'
    ],
    comments: [
      {
        pm: 'Babbel',
        author: 'Clara Schmidt (Babbel Head of Pedagogical Methodology)',
        avatarColor: 'bg-sky-600',
        comment: 'Expats are our primary high-lifetime-value cohort. An apartment lease contract contains deep legal jargon. A student needs formal pronouns, while a remote worker needs informal. The app must let users select their specific focus path on onboarding!',
        timestamp: '1:20 PM'
      },
      {
        pm: 'Duolingo',
        author: 'Duo the Owl (Duolingo Senior VP of Engagement)',
        avatarColor: 'bg-green-500',
        comment: 'Hoot! Let’s create specific "Adventure Tracks" like "The Golden Visa Quest" or "Lisbon Co-working Crawl" where characters guide you through active, gamified missions on the virtual map.',
        timestamp: '1:54 PM'
      }
    ],
    pmInsights: {
      gamification: 'Milestone rewards for registering at the Freguesia/AIMA on the virtual path.',
      pedagogy: 'Direct structural differences between formal (o senhor/a senhora) and informal (tu) address styles.',
      community: 'Forums for expats to share real experiences with Portuguese bureaucracy and lease negotiations.',
      multimedia: 'High-quality templates for writing rental interest emails and cover letters.'
    }
  },
  {
    id: 'feature_framework',
    title: '3. Feature Framework (The 6 Pillars)',
    icon: 'Layers',
    summary: 'Detailing specifications for the six core learning capabilities requested: Vocabulary, Grammar, Speaking, Listening, Reading, and Writing.',
    details: [
      'Pillar 1: Vocabulary Engine. Flashcards leveraging Spaced Repetition (SRS). Immediate highlight of PT-PT vs. PT-BR differences (e.g., Telemóvel vs. Celular, Comboio vs. Trem, Casa de banho vs. Banheiro).',
      'Pillar 2: Grammar Hub. Concrete interactive units dealing with: clitic pronoun placement (Amo-te vs Te amo), gerund forms (Estou a comer vs Estou comendo), and Preterite vs Imperfect distinctions.',
      'Pillar 3: Speaking Practice. Direct sound analysis of stressful closed vowels. Simulates native Portuguese accent parameters, giving feedback using voice patterns.',
      'Pillar 4: Listening Lab. Dynamic audio snippets based on real situations. Explores everyday stress-timed speech patterns of European Portuguese.',
      'Pillar 5: Reading Library. Short stories, news articles, and municipal forms with touch-to-translate dictionary lookups and comprehension exercises.',
      'Pillar 6: Writing Studio. Guided functional writing prompts (answering an ad, writing to a Freguesia). Backed by AI parsing of spelling, accent rules, and polite register compliance.'
    ],
    comments: [
      {
        pm: 'Memrise',
        author: 'Marcos Silva (Memrise Director of Localized Content)',
        avatarColor: 'bg-amber-500',
        comment: 'The contrast from PT-BR vocabulary is the single most requested feature from users shifting from other apps. If an expat goes to a Porto bakery and asks for any baked good using BR terms, they might be met with total bewilderment! We need a dedicated "PT-PT vs PT-BR Contrast" badge.',
        timestamp: '3:05 PM'
      },
      {
        pm: 'Busuu',
        author: 'Sofia Morel (Busuu VP of Product & Social Learning)',
        avatarColor: 'bg-indigo-600',
        comment: 'Our Writing Studio must employ deep contextual AI. Simply saying "Incorrect" is demoralizing. The AI should explain *why* the contraction (e.g. em + este = neste) is required in European Portuguese, and recommend warmer, polite greetings such as "Com os meus melhores cumprimentos" for official emails.',
        timestamp: '3:40 PM'
      }
    ],
    pmInsights: {
      gamification: 'Quizzes that subtract heavy hearts for Brazilian grammar defaults used incorrectly inside Portuguese context.',
      pedagogy: 'Structured curriculum addressing "Tu" verb conjugations which are active in Portugal but largely unused in Brazil.',
      community: 'Shared writing boards where high-advanced users peer-review beginner emails.',
      multimedia: 'Adjustable audio speeds (0.8x, 1x) to help foreigners catch reduced vowels and liaison/linking sounds.'
    }
  },
  {
    id: 'technical_architecture',
    title: '4. Technical Architecture & AI Integration',
    icon: 'Cpu',
    summary: 'A detailed breakdown of the technological stack, detailing the Gemini API integration model for generative writing evaluations and speech coaching.',
    details: [
      'API Core: Node.js Express server acting as a secure proxy to the Gemini API key, ensuring keys are hidden from the browser.',
      'AI Engine: Utilizing "gemini-3.5-flash" for high-speed, cost-efficient, structured JSON analysis of writing worksheets and grammar explanations.',
      'Structured JSON Responses: The model returns detailed JSON with structural scores, explicit grammatical explanations, error location, and professional Pt-Pt re-writes.',
      'Web-Synthesis Speech Integration: Standardized Speech Synthesis configured carefully to target "pt-PT" language voices. Includes local backup fallback.'
    ],
    comments: [
      {
        pm: 'Babbel',
        author: 'Clara Schmidt (Babbel Head of Pedagogical Methodology)',
        avatarColor: 'bg-sky-600',
        comment: 'Ensuring absolute accuracy is vital. Gemini-3.5-flash must be fed robust system instructions. Its feedback must be strictly configured inpt-PT orthography (taking the 1990 Orthographic Agreement rules into account, which is standard in official Portuguese correspondence!).',
        timestamp: '4:50 PM'
      },
      {
        pm: 'Duolingo',
        author: 'Duo the Owl (Duolingo Senior VP of Engagement)',
        avatarColor: 'bg-green-500',
        comment: 'Hoot! We should also send the JSON output directly to our custom gamification controller to distribute xp_points and trigger celebration animations if the writing is flawless!',
        timestamp: '5:15 PM'
      }
    ],
    pmInsights: {
      gamification: 'Dynamic XP boost multiplier triggered on high grammatical accuracy.',
      pedagogy: 'Direct reference to standard European Portuguese orthography dictionary standards.',
      community: 'Privacy-first processing allowing users to test personal email drafts safely.',
      multimedia: 'Generating dynamic model sentences based on specific user errors.'
    }
  }
];

export const sampleVocabularyList: WordCard[] = [
  {
    id: 'vocab_1',
    portuguese: 'Telemóvel',
    english: 'Mobile phone',
    pronunciation: 'teh-leh-mó-vel',
    category: 'Daily Life',
    notes: 'Used exclusively in Portugal. Using the Brazilian "celular" will turn heads in Lisbon.',
    examplePt: 'Esqueci-me do meu telemóvel em casa.',
    exampleEn: 'I forgot my mobile phone at home.',
    brazilianContrast: 'Celular'
  },
  {
    id: 'vocab_2',
    portuguese: 'Autocarro',
    english: 'Bus',
    pronunciation: 'ow-toh-cá-roo',
    category: 'Greetings',
    notes: 'In Portugal you catch the autocarro. In Brazil, you catch the ônibus.',
    examplePt: 'O autocarro para Sintra party de vinte em vinte minutos.',
    exampleEn: 'The bus to Sintra leaves every twenty minutes.',
    brazilianContrast: 'Ônibus'
  },
  {
    id: 'vocab_3',
    portuguese: 'Pastel de Nata',
    english: 'Custard tart',
    pronunciation: 'pash-tel d& na-ta',
    category: 'Pastelaria',
    notes: 'Portugal’s iconic pastry. Order it with "uma bica" (an espresso in Lisbon).',
    examplePt: 'Quero um pastel de nata e uma bica, por favor.',
    exampleEn: 'I would like a custard tart and an espresso, please.',
    brazilianContrast: 'Pastel de Belém (specific brand)'
  },
  {
    id: 'vocab_4',
    portuguese: 'Freguesia',
    english: 'Parish / Civil Parish council',
    pronunciation: 'freh-gheh-zee-ah',
    category: 'Bureaucracy',
    notes: 'Crucial government subdivision. You need to register here to prove your address (Atestado de Residência).',
    examplePt: 'Tenho de ir à Junta de Freguesia pedir o atestado.',
    exampleEn: 'I have to go to the civil parish council to request the residency certificate.',
    brazilianContrast: 'Bairro / Subprefeitura'
  },
  {
    id: 'vocab_5',
    portuguese: 'Casa de Banho',
    english: 'Bathroom / Toilet',
    pronunciation: 'cá-zah d& bá-nyoo',
    category: 'Daily Life',
    notes: 'Literally "bathing house". Brazilian Portuguese uses "banheiro".',
    examplePt: 'Onde fica a casa de banho, por favor?',
    exampleEn: 'Where is the bathroom, please?',
    brazilianContrast: 'Banheiro'
  },
  {
    id: 'vocab_6',
    portuguese: 'Bica',
    english: 'Espresso coffee',
    pronunciation: 'bee-cah',
    category: 'Pastelaria',
    notes: 'Used in Lisbon. Legend says it stands for "Beba Isto Com Açúcar" (Drink This With Sugar). In Porto, you ask for "um café".',
    examplePt: 'Queria uma bica curta, se faz favor.',
    exampleEn: 'I would like a short espresso, please.',
    brazilianContrast: 'Cafezinho'
  },
  {
    id: 'vocab_7',
    portuguese: 'Comboio',
    english: 'Train',
    pronunciation: 'cõ-bóy-oo',
    category: 'Daily Life',
    notes: 'Portugal uses comboio for trains. Brazil uses trem.',
    examplePt: 'Vou apanhar o comboio das nove para Cascais.',
    exampleEn: 'I am going to catch the nine o\'clock train to Cascais.',
    brazilianContrast: 'Trem'
  },
  {
    id: 'vocab_8',
    portuguese: 'Propina',
    english: 'Tuition fee',
    pronunciation: 'proo-pee-nah',
    category: 'Bureaucracy',
    notes: 'In Portugal, "propina" means university tuition. In Brazil and Spanish, it means a bribe or a tip!',
    examplePt: 'O estudante universitário deve pagar a propina anualmente.',
    exampleEn: 'The university student must pay the tuition fee annually.',
    brazilianContrast: 'Mensalidade escolar'
  }
];

export const sampleGrammarRules: GrammarRule[] = [
  {
    id: 'grammar_1',
    title: 'The Gerund Alternative: "A + Infinitive"',
    difficulty: 'A1',
    description: 'In Portugal, continuous actions are expressed using "estar a + infinitive" instead of the gerund ending in "-ndo".',
    europeanConcept: 'estar a + infinitive (e.g., Estou a falar)',
    brazilianContrast: 'estar + gerund (e.g., Estou falando)',
    examples: [
      {
        pt: 'Estou a comer um pastel de nata.',
        en: 'I am eating a custard tart.',
        context: 'Standard European Portuguese. Sounds highly native.'
      },
      {
        pt: 'O que estás a fazer?',
        en: 'What are you doing?',
        context: 'Informal singular "tu" Continuous statement.'
      }
    ],
    quiz: {
      question: 'How do you say "He is studying Portuguese" in standard European Portuguese?',
      options: [
        'Ele está estudando português.',
        'Ele está a estudar português.',
        'Ele é estudando português.',
        'Ele está estudar português.'
      ],
      correctIndex: 1,
      explanation: 'European Portuguese uses "estar a + infinitive" (está a estudar) to represent continuous actions.'
    }
  },
  {
    id: 'grammar_2',
    title: 'Formal Address: Tu vs. Você / O Senhor',
    difficulty: 'A2',
    description: 'In Portugal, standard singular "Você" can sometimes sound overly direct or rude. Instead, locals conjugated verbs in the 3rd person singular and omit the pronoun or use the receiver\'s name, or "o senhor / a senhora". "Tu" is strictly for friends, family, and peers.',
    europeanConcept: 'Tu (informal, conjugated in 2nd person) or 3rd person (formal, omitting "Você" or using "O senhor / A senhora")',
    brazilianContrast: 'Você (used universally for both formal and informal in most parts of Brazil)',
    examples: [
      {
        pt: 'Queres tomar um café comigo? (Tu)',
        en: 'Do you want to have a coffee with me? (Informal to a friend)',
        context: 'Notice the "-es" verb ending conjugate for Tu, pronoun omitted.'
      },
      {
        pt: 'A senhora deseja ver a ementa? (Formal)',
        en: 'Would you like to see the menu? (Formal to a woman)',
        context: 'Addresses client respectfully by avoiding the direct pronoun "Você".'
      }
    ],
    quiz: {
      question: 'You are addressing your new landlord, Sr. Costa. Which is the most appropriate way to ask "Do you have the contract?"',
      options: [
        'Tens o contrato, Sr. Costa?',
        'Você tem o contrato, Sr. Costa?',
        'O Sr. Costa tem o contrato?',
        'Tu tens o contrato?'
      ],
      correctIndex: 2,
      explanation: '"O Sr. Costa tem..." is the standard polite formulation in Portugal, avoiding the informal "Tu" and avoiding the sometimes impolite direct "Você".'
    }
  },
  {
    id: 'grammar_3',
    title: 'Clitic Pronoun Placement: Enclisis default',
    difficulty: 'B1',
    description: 'In European Portuguese, pronouns are default placed AFTER the verb, hyphenated (Enclisis), unless triggered by negative words, relatives, or conjunctions. Brazil defaults to placing pronouns BEFORE the verb (Proclisis).',
    europeanConcept: 'Dá-me (Give me) or Amo-te (I love you)',
    brazilianContrast: 'Me dá (Give me) or Te amo (I love you)',
    examples: [
      {
        pt: 'Liguei-lhe ontem à noite.',
        en: 'I called him/her yesterday evening.',
        context: 'Pronoun "lhe" goes after the verb with a hyphen.'
      },
      {
        pt: 'Não me disseram a verdade.',
        en: 'They did not tell me the truth.',
        context: 'Negative "Não" triggers Proclisis, pulling "me" before the verb.'
      }
    ],
    quiz: {
      question: 'Which is correct in Portugal when saying: "Tell me if you need help."',
      options: [
        'Me diga se precisas de ajuda.',
        'Diga-me se precisa de ajuda.',
        'Diga me se tens de ajuda.',
        'Me dizes se precisas ajuda.'
      ],
      correctIndex: 1,
      explanation: '"Diga-me..." is the correct enclitic pronoun placement (verb-pronoun) which is standard in Portugal for positive main clauses and polite forms.'
    }
  }
];

export const sampleDialogues: AudioDialogue[] = [
  {
    id: 'dial_1',
    title: 'Na Pastelaria (Ordering Coffee & Pastry)',
    scenario: 'You walk into a local Lisbon bakery in the morning to buy breakfast.',
    difficulty: 'A1 - Beginner',
    audience: 'Tourists & Beginners',
    lines: [
      { speaker: 'Empregado', pt: 'Bom dia! O que vai desejar?', en: 'Good morning! What would you like?' },
      { speaker: 'Cliente', pt: 'Bom dia. Queria uma bica e um pastel de nata, por favor.', en: 'Good morning. I would like an espresso and a custard tart, please.' },
      { speaker: 'Empregado', pt: 'Com certeza. Deseja o pastel de nata aquecido e com canela?', en: 'Certainly. Do you want the custard tart heated with cinnamon?' },
      { speaker: 'Cliente', pt: 'Sim, aquecido e com canela, por favor.', en: 'Yes, heated and with cinnamon, please.' },
      { speaker: 'Empregado', pt: 'Com certeza. São um euro e setenta cêntimos, por favor.', en: 'Certainly. That is one euro and seventy cents, please.' },
      { speaker: 'Cliente', pt: 'Aqui tem. Muito obrigado!', en: 'Here you go. Thank you very much!' },
      { speaker: 'Empregado', pt: 'Obrigado eu! Bom dia.', en: 'Thank you! Have a good day.' }
    ],
    quiz: {
      question: 'What polite conditional verb form does the customer use to ask for breakfast instead of "quero" (I want)?',
      options: [
        'Gostava',
        'Queria',
        'Quero',
        'Desejava'
      ],
      correctIndex: 1,
      explanation: '"Queria" is the highly polite imperfect indicative used in Portugal to request things, equivalent to "I would like".'
    }
  },
  {
    id: 'dial_2',
    title: 'Ir à Junta de Freguesia ( bureaucratic residency card)',
    scenario: 'An expat needs to request an address validation (Atestado de Residência) from their neighborhood parish council.',
    difficulty: 'A2 - Pre-Intermediate',
    audience: 'Expats & Remote Workers',
    lines: [
      { speaker: 'Funcionário', pt: 'Bom dia, faça favor. Em que posso ajudar?', en: 'Good morning, please step forward. How can I help you?' },
      { speaker: 'Expatriado', pt: 'Bom dia. Queria solicitar um atestado de residência, por favor.', en: 'Good morning. I would like to request a residency certificate, please.' },
      { speaker: 'Funcionário', pt: 'Com certeza. Já está recenseado nesta freguesia?', en: 'Certainly. Are you already registered to vote/registered in this parish?' },
      { speaker: 'Expatriado', pt: 'Sim, já mudei a morada fiscal no Portal das Finanças.', en: 'Yes, I have already changed my tax address on the Finance Portal.' },
      { speaker: 'Funcionário', pt: 'Ótimo. Preciso do seu documento de identificação, contrato de arrendamento e o seu NIF.', en: 'Great. I need your ID document, lease agreement, and your NIF.' },
      { speaker: 'Expatriado', pt: 'Tenho tudo aqui comigo neste dossier.', en: 'I have everything here with me in this folder.' },
      { speaker: 'Funcionário', pt: 'Excelente. Vou digitalizar e preencher o requerimento. Fica pronto daqui a três dias úteis.', en: 'Excellent. I will scan them and fill in the application. It will be ready in three business days.' }
    ],
    quiz: {
      question: 'What is a "morada fiscal"?',
      options: [
        'A maritime address',
        'A fiscal/tax register address',
        'A health registration number',
        'A temporary rental agreement'
      ],
      correctIndex: 1,
      explanation: 'In Portugal, "morada fiscal" represents your registered official tax/fiscal address logged with the Autoridade Tributária.'
    }
  }
];

export const sampleStories: ReadingStory[] = [
  {
    id: 'story_1',
    title: 'O Primeiro Dia em Lisboa (The First Day in Lisbon)',
    difficulty: 'A2/B1',
    summary: 'Follow Sarah, a remote worker from London, on her very first morning navigating Lisbon’s hills, pastries, and transportation.',
    paragraphs: [
      {
        textPt: 'Sarah acordou cedo com a luz intensa de Lisboa. Da janela do seu novo apartamento em Alfama, ela conseguia ver o rio Tejo brilhando sob o sol da manhã. O ar cheirava a maresia e a pão fresco cozido na padaria ao lado.',
        textEn: 'Sarah woke up early with the intense light of Lisbon. From the window of her new apartment in Alfama, she could see the Tagus river shining under the morning sun. The air smelled of sea breeze and fresh bread baked at the bakery next door.',
        vocabNotes: {
          'acordou': 'woke up (Preterite of acordar)',
          'luz': 'light',
          'morada': 'address / residence',
          'maresia': 'sea spray sound / sea breeze smell'
        }
      },
      {
        textPt: 'Ela saiu para tomar o pequeno-almoço. Em Portugal, o pequeno-almoço é uma refeição simples: normalmente uma bica acompanhada de uma torrada com muita manteiga. No caminho, ela cumprimentou o vizinho, o senhor António, dizendo "Bom dia!". Ele respondeu sorridente: "Bom dia, seja bem-vinda ao bairro!".',
        textEn: 'She went out to have breakfast. In Portugal, breakfast is a simple meal: normally an espresso accompanied by toast with lots of butter. On the way, she greeted her neighbor, Mr. António, saying "Good morning!". He smiled and replied: "Good morning, welcome to the neighborhood!".',
        vocabNotes: {
          'pequeno-almoço': 'breakfast (Portugal term! Brazil uses café da manhã)',
          'torrada': 'toast',
          'manteiga': 'butter',
          'bairro': 'neighborhood'
        }
      },
      {
        textPt: 'Depois do café, Sarah decidiu apanhar o famoso elétrico vinte e oito para subir a colina até à Graça. Ela comprou um bilhete pré-comprado com o seu cartão Navegante. Estava a aprender que navegar pela burocracia e pelo quotidiano de Portugal exigia paciência, mas a simpatia das pessoas compensava tudo.',
        textEn: 'After coffee, Sarah decided to catch the famous tram 28 to go up the hill to Graça. She bought a pre-purchased ticket with her Navegante card. She was learning that navigating the bureaucracy and daily life in Portugal required patience, but the warmth of the people made up for everything.',
        vocabNotes: {
          'apanhar': 'to catch / grab (e.g. catch a bus/tram. Note: in Brazil this means to get beaten up!)',
          'elétrico': 'tram (Portugal term! Brazil uses bonde)',
          'bilhete': 'ticket',
          'quotidiano': 'daily life'
        }
      }
    ],
    questions: [
      {
        question: 'What is the term for "breakfast" used in the Portuguese text?',
        options: [
          'Café da manhã',
          'Pequeno-almoço',
          'Lanche da manhã',
          'Almoço'
        ],
        correctIndex: 1,
        explanation: 'In Portugal, "pequeno-almoço" is used for breakfast, whereas "café da manhã" is Brazilian Portuguese.'
      },
      {
        question: 'What does "apanhar" mean in the phrase "apanhar o elétrico"?',
        options: [
          'To run away from the tram',
          'To clean the tram',
          'To catch/take the tram',
          'To buy the tram'
        ],
        correctIndex: 2,
        explanation: 'In Portugal, "apanhar" is the standard verb used to mean catching regular public transport.'
      }
    ]
  }
];

export const sampleWritingChallenges: WritingChallenge[] = [
  {
    id: 'write_1',
    title: 'Inquiring About an Apartment Renting',
    difficulty: 'A2 - Pre-Intermediate',
    prompt: 'Write a short, polite email to a prospective landlord (Sr. Silva) expressing interest in visiting a one-bedroom apartment (T1) in Lisbon.',
    scenario: 'You saw a listing on Idealista for a T1 in Campo de Ourique. You need to ask when it is available for visits, and introduce yourself as a quiet, professional remote worker.',
    helpfulWords: [
      'Gostaria de (I would like to)',
      'Visitar o apartamento (to visit the apartment)',
      'Trabalhador remoto (remote worker)',
      'T1 (one-bedroom apartment)',
      'Disponibilidade (availability)',
      'Com os melhores cumprimentos (with best regards)'
    ],
    referenceExample: `Exmo. Senhor Silva,

Escrevo-lhe sobre o anúncio do apartamento T1 em Campo de Ourique. Gostaria de saber se tem disponibilidade para uma visita. Sou trabalhador remoto, sossegado e tenho referências.

Com os meus melhores cumprimentos,
[O seu nome]`
  },
  {
    id: 'write_2',
    title: 'Greeting a Landlord / Neighbor',
    difficulty: 'A1 - Beginner',
    prompt: 'Write a brief message welcoming a new neighbor or writing to a landlord confirming you have sent the monthly rent bank transfer (transferência bancária).',
    scenario: 'You are letting Sr. Santos know that the rent for this month is paid, thanking him for fixing the tap.',
    helpfulWords: [
      'Confirmar (to confirm)',
      'Transferência bancária (bank transfer)',
      'Renda (rent)',
      'Agradecer (to thank)',
      'Torneira (tap)',
      'Abraço (warm hug - intermediate)',
      'Cumprimentos (regards)'
    ],
    referenceExample: `Caro Senhor Santos,

Envio esta mensagem para confirmar que fiz a transferência bancária da renda deste mês. Aproveito também para agradecer por ter arranjado a torneira.

Melhores cumprimentos,
[O seu nome]`
  }
];
