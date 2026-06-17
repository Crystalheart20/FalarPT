export interface LecturePoint {
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
}

export interface AudioDrill {
  phrase: string;
  ipa: string;
  translation: string;
  tip: string;
}

export interface VocabularyTerm {
  word: string;
  translation: string;
  usage: string;
}

export interface ModuleExercise {
  question: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

export interface ModuleLessonContent {
  moduleKey: string; // "A1_U1_M1", etc.
  moduleTitle: string;
  lecture: {
    overview: string;
    overviewEn: string;
    points: LecturePoint[];
    culturalInsight: string;
    culturalInsightEn: string;
  };
  audioDrills: AudioDrill[];
  vocabulary: VocabularyTerm[];
  exercises: ModuleExercise[];
}

export const moduleLessonsData: Record<string, ModuleLessonContent> = {
  "A1_U1_M1": {
    moduleKey: "A1_U1_M1",
    moduleTitle: "Greetings & Saying Hello",
    lecture: {
      overview: "Aprenda a saudar as pessoas corretamente a qualquer hora do dia ou da noite em Portugal, respeitando as normas sociais de Lisboa.",
      overviewEn: "Learn to greet people correctly at any time of day or night in Portugal, respecting Lisbon's authentic social standards.",
      points: [
        {
          title: "Períodos do Dia & Saudações",
          titleEn: "Times of Day & Greetings",
          body: "Diz-se 'Bom dia' até ao almoço (cerca das 13h), 'Boa tarde' até ao anoitecer/jantar (por volta das 20h) e 'Boa noite' a partir de então ou ao deitar.",
          bodyEn: "We say 'Bom dia' (Good morning) until lunch (around 1 PM), 'Boa tarde' (Good afternoon) until dusk or dinner (around 8 PM), and 'Boa noite' (Good evening/night) from then on or when going to bed."
        },
        {
          title: "A Diferença entre Tu e Você",
          titleEn: "The Difference between Tu and Você (PT-PT Standard)",
          body: "Em Portugal, o pronome 'tu' é usado estritamente com amigos, familiares ou pessoas mais jovens. Para o tratamento formal/respeitoso, evitamos pronunciar a palavra 'você' porque pode parecer rude; em vez disso, omitimos o pronome e usamos a terceira pessoa do singular diretamente (ex: 'Como está?' em vez de 'Como você está?').",
          bodyEn: "In Portugal, the pronoun 'tu' is strictly reserved for friends, family, or younger people. For polite/formal situations, we actually avoid saying the word 'você' out loud as it can sound friction-prone and blunt. Instead, we omit the pronoun and use the 3rd person singular verb directly (e.g., 'Como está?' instead of 'Como você está?')."
        }
      ],
      culturalInsight: "Nas pastelarias de Lisboa, iniciar com um educado 'Bom dia, se faz favor' faz toda a diferença no atendimento!",
      culturalInsightEn: "In Lisbon's traditional pastry shops, starting with a polite 'Bom dia, se faz favor' makes all the difference in service!"
    },
    audioDrills: [
      {
        phrase: "Olá, bom dia! Como está?",
        ipa: "[ɔˈla βõ ˈdiɐ ˈkomu ʃˈta]",
        translation: "Hello, good morning! How are you? (Polite)",
        tip: "Note the reduced sound of 'Como' which sounds like 'ko-mu' and 'está' which drops the initial 'e' sounding like 'sh-tah'."
      },
      {
        phrase: "Olá, como estás?",
        ipa: "[ɔˈla ˈkomu ʃˈtaʃ]",
        translation: "Hi, how are you? (Informal)",
        tip: "The informal greeting ends with a clear 'sh' sound in 'estás'."
      }
    ],
    vocabulary: [
      { word: "Olá", translation: "Hello / Hi", usage: "Olá, tudo bem?" },
      { word: "Bom dia", translation: "Good morning", usage: "Bom dia, queria um café." },
      { word: "Boa tarde", translation: "Good afternoon", usage: "Boa tarde, senhor Silva." },
      { word: "Boa noite", translation: "Good evening / Good night", usage: "Boa noite, até amanhã!" }
    ],
    exercises: [
      {
        question: "Como saúda alguém polidamente às 15:00h da tarde em Portugal sem usar explicitamente o pronome 'você'?",
        questionEn: "How do you politely greet someone at 3 PM in Portugal without explicitly uttering the pronoun 'você'?",
        options: ["Bom dia! Como estás?", "Boa tarde! Como está?", "Boa tarde! Como você está?", "Olá! Tudo bem contigo?"],
        correctIndex: 1,
        explanation: "Pelas 15h diz-se 'Boa tarde'. Omitir o pronome 'você' e conjugar na 3ª pessoa ('Como está?') é a norma mais polida em Portugal.",
        explanationEn: "At 3 PM we say 'Boa tarde'. Omitting the pronoun 'você' and conjugating in the 3rd person ('Como está?') is the standard polite form in Portugal."
      },
      {
        question: "Qual pronome é de uso exclusivo para familiares próximos, amigos ou crianças?",
        questionEn: "Which pronoun is exclusively used for close family, direct friends, or children?",
        options: ["O senhor", "Você", "Tu", "A senhora"],
        correctIndex: 2,
        explanation: "O pronome 'tu' destina-se a contextos completamente informais ou pessoas com forte intimidade.",
        explanationEn: "The pronoun 'tu' is intended for informal contexts or people with whom you share close intimacy."
      },
      {
        question: "Até que horas é socialmente correto desejar 'Bom dia' em Lisboa?",
        questionEn: "Until what time is it socially appropriate to say 'Bom dia' (Good morning) in Lisbon?",
        options: ["Até ao almoço (cerca das 13h)", "Até às 18h", "Até às 10h da manhã", "Até às 15h"],
        correctIndex: 0,
        explanation: "Em Portugal, o almoço delimita o fim do período matutino, ocorrendo por de volta das 13h.",
        explanationEn: "In Portugal, lunch (around 1 PM) transitions the day from morning ('Bom dia') to afternoon ('Boa tarde')."
      }
    ]
  },
  "A1_U1_M2": {
    moduleKey: "A1_U1_M2",
    moduleTitle: "Introductions",
    lecture: {
      overview: "Aprenda a dizer o seu nome usando a conjugação reflexiva correta em português europeu e a referir a sua nacionalidade.",
      overviewEn: "Learn to state your name using the correct European Portuguese reflexive verb ordering and declare your nationality.",
      points: [
        {
          title: "Colocação do Pronome: Enclise (Hífen)",
          titleEn: "Pronoun Placement: Enclisis (Hyphenation)",
          body: "Em Portugal, a menos que haja uma palavra atratora (como uma negação), os pronomes reflexivos ligam-se após o verbo com um hífen. Por isso, dizemos 'Chamo-me...' e nunca iniciamos uma frase com o pronome 'Me chamo' (que é típico do Brasil).",
          bodyEn: "In Portugal, unless attracted by negative or modifying words, reflexive pronouns are attached after the verb with a hyphen. Thus, we say 'Chamo-me...' and never start a sentence with 'Me chamo' (which is the Brazilian norm)."
        },
        {
          title: "Origens e Género das Nacionalidades",
          titleEn: "Origins & Gender of Nationalities",
          body: "Para indicar o seu país de origem, usa-se 'Sou de...'. Para os adjetivos de nacionalidade, preste atenção ao género: 'inglês' (masculino) torna-se 'inglesa' (feminino); 'americano' torna-se 'americana'.",
          bodyEn: "To declare your origin, use 'Sou de [Country]'. For nationality adjectives, keep grammatical gender in mind: 'inglês' (masc.) becomes 'inglesa' (fem.); 'americano' becomes 'americana'."
        }
      ],
      culturalInsight: "Os portugueses apreciam bastante quando os estrangeiros dizem corretamente 'Sou de...' em vez de apenas falarem em inglês.",
      culturalInsightEn: "Portuguese people highly appreciate it when foreigners can introduce themselves with 'Sou de...' instead of defaulting to English."
    },
    audioDrills: [
      {
        phrase: "Chamo-me Robert. Sou de Inglaterra.",
        ipa: "[ˈʃamu mɨ ˈrɔβɛrt | ˈso dɨ ˌĩglɐˈtɛrɐ]",
        translation: "My name is Robert. I am from England.",
        tip: "Pronounce the 'e' in 'Chamo-me' as a mute, neutral vowel sound typical of standard Lisbon speech."
      },
      {
        phrase: "Como te chamas?",
        ipa: "[ˈkomu tɨ ˈʃɐmɐʃ]",
        translation: "What is your name? (Informal)",
        tip: "The letters 'as' in 'chamas' end with a quiet 'sh' sound."
      }
    ],
    vocabulary: [
      { word: "Chamo-me", translation: "My name is (I call myself)", usage: "Chamo-me Maria." },
      { word: "Como se chama?", translation: "What is your name? (Formal)", usage: "Como se chama o senhor?" },
      { word: "De onde é?", translation: "Where are you from?", usage: "Olá, de onde é?" },
      { word: "Sou", translation: "I am (permanent)", usage: "Sou canadiano e vivo em Cascais." }
    ],
    exercises: [
      {
        question: "Em Portugal, qual é a forma correta e nativa de dizer 'My name is Robert'?",
        questionEn: "In Portugal, what is the correct and native way of saying 'My name is Robert'?",
        options: ["Me chamo Robert.", "Chamo-me Robert.", "Eu chamo Robert.", "Robert sou eu."],
        correctIndex: 1,
        explanation: "No português de Portugal (PT-PT), a regra padrão dita o pronome após o verbo: 'Chamo-me'. Iniciar frase com o pronome reflexo ('Me chamo') é típico do Brasil.",
        explanationEn: "In European Portuguese, the object pronoun goes after the verb: 'Chamo-me'. Starting a sentence with a reflexive pronoun ('Me chamo') is characteristic of Brazilian Portuguese."
      },
      {
        question: "Se uma mulher é de Londres, como ela deve introduzir-se?",
        questionEn: "If a woman is from London, how should she introduce herself?",
        options: ["Sou inglês.", "Sou inglesa e de Londres.", "Eu chamo-me inglês.", "Sou de inglesa."],
        correctIndex: 1,
        explanation: "O adjetivo feminino para quem nasceu na Inglaterra é 'inglesa'. 'Sou inglesa' concorda em género e expressa a nacionalidade de forma autêntica.",
        explanationEn: "The feminine adjective for England is 'inglesa'. 'Sou inglesa' agrees in gender and correctly states nationality."
      }
    ]
  },
  "A1_U2_M1": {
    moduleKey: "A1_U2_M1",
    moduleTitle: "Food & Ordering",
    lecture: {
      overview: "Descubra o riquíssimo léxico das pastelarias de Lisboa. Aprenda a pedir o seu expresso e o seu pastel de nata de forma extremamente polida.",
      overviewEn: "Discover the rich vocabulary of Lisbon's pastry shops. Learn to order your espresso and custard tart with extreme politeness.",
      points: [
        {
          title: "O Código de Café de Lisboa",
          titleEn: "The Lisbon Coffee Code",
          body: "Em Lisboa, um café expresso é denominado 'uma bica'. Se pretender um café expresso com um pouco de leite, é 'um garoto'. Já 'uma meia de leite' corresponde a metade café e metade leite copioso, enquanto 'um galão' consiste num copo alto com muito leite e apenas um jorro de café expresso escuro.",
          bodyEn: "In Lisbon, a single espresso is called 'uma bica'. If you want an espresso stained with a drip of milk, order 'um garoto'. A 'meia de leite' is half coffee, half hot milk in a porcelain cup, while 'um galão' is a tall hot glass filled mostly with milk and a splash of dark espresso."
        },
        {
          title: "O Imperfeito de Cortesia: Queria",
          titleEn: "The Polite Imperfect: Queria",
          body: "Nas interações comerciais em Portugal, evite usar 'Quero' (I want) porque pode soar autoritário e rude. Em vez disso, os portugueses usam o Imperfeito de Cortesia: 'Queria...', que equivale ao condicional 'Eu gostaria' (I would like). Complete sempre com 'se faz favor' ou 'por favor'.",
          bodyEn: "In commercial interactions in Portugal, avoid saying 'Quero' (I want) as it can sound highly demanding. Instead, native speakers use the polite imperfect: 'Queria...', which serves as a polite conditional proxy 'I would like'. Always end with 'se faz favor'."
        }
      ],
      culturalInsight: "O Pastel de Nata polvilha-se tradicionalmente com canela em pó. O empregado perguntará: 'Com canela?'",
      culturalInsightEn: "The Pastel de Nata is traditionally sprinkled with powdered cinnamon. The waiter will ask: 'Com canela?' (With cinnamon?)"
    },
    audioDrills: [
      {
        phrase: "Queria uma bica e um pastel de nata, se faz favor.",
        ipa: "[ˈkiɾiɐ ˈunɐ ˈβikɐ i ũ pɐʃˈtɛɫ dɨ ˈnatɐ sɨ fɐʃ fɐˈβoɾ]",
        translation: "I would like an espresso and a custard tart, please.",
        tip: "Notice the dark 'l' in 'pastel' which has a velarized sound, unlike the vowel-like Brazilian pronunciation."
      },
      {
        phrase: "A conta, por favor.",
        ipa: "[ɐ ˈkõtɐ puɾ fɐˈβoɾ]",
        translation: "The bill, please.",
        tip: "Say 'por favor' or 'se faz favor' to catch the waiter's attention politely."
      }
    ],
    vocabulary: [
      { word: "Bica", translation: "Espresso (Lisbon regionalism)", usage: "Queria uma bica bem quente." },
      { word: "Pastel de nata", translation: "Portuguese Custard Tart", usage: "O pastel de nata daqui é ótimo." },
      { word: "Se faz favor", translation: "If you please / Please", usage: "Traga-me água, se faz favor." },
      { word: "A conta", translation: "The bill / invoice", usage: "A conta, se faz favor." }
    ],
    exercises: [
      {
        question: "Como deve pedir educadamente dois pastéis de nata ao empregado de mesa?",
        questionEn: "How should you politely order two custard tarts from the waiter?",
        options: ["Quero dois pastéis de nata agora.", "Queria dois pastéis de nata, se faz favor.", "Me dá dois pastéis de nata.", "Dá-me dois pastéis e cala-te."],
        correctIndex: 1,
        explanation: "'Queria... se faz favor' utiliza o imperfeito cortês, fundamental na etiqueta social de Portugal.",
        explanationEn: "'Queria... se faz favor' utilizes the polite imperfect, which is essential to social etiquette in Portugal."
      },
      {
        question: "Se pedir um 'galão' numa pastelaria lisboeta, estará a encomendar o quê?",
        questionEn: "If you order a 'galão' in a Lisbon café, what will you be getting?",
        options: ["Um jarro grande de vinho tinto.", "Um copo alto de leite quente com café.", "Uma chavena de espesso forte.", "Uma garrafa de água com gás."],
        correctIndex: 1,
        explanation: "O 'galão' é uma bebida típica servida num copo alto de vidro contendo muito leite quente e café.",
        explanationEn: "A 'galão' is a typical hot drink served in a tall glass containing mostly hot milk mixed with espresso."
      }
    ]
  },
  "A2_U3_M1": {
    moduleKey: "A2_U3_M1",
    moduleTitle: "Talking About the Past",
    lecture: {
      overview: "Domine o Pretérito Perfeito Simples para narrar ações concluídas no passado em Portugal.",
      overviewEn: "Master the Past Definite (Pretérito Perfeito Simples) to narrate fully completed actions in Portugal's past tense.",
      points: [
        {
          title: "Terminações dos Verbos Regulares",
          titleEn: "Regular Verb Endings",
          body: "No passado, as terminações variam de acordo com o grupo do verbo. Para os verbos em -AR (ex. falar): 'falei', 'falaste' (importante terminação sem 's' intermédio!), 'falou', 'falámos' (com acento agudo representando aberto em Portugal, ao contrário do português brasileiro).",
          bodyEn: "In the past, endings depend on the verb group. For -AR verbs (e.g., falar): 'falei', 'falaste' (note the strict PT-PT ending for 'tu'!), 'falou', 'falámos' (the 'nós' form has a distinct acute accent signifying an open vowel in Portugal, unlike Brazil's closed vowel 'falamos')."
        },
        {
          title: "Os Irregulares de Alta Frequência",
          titleEn: "High-Frequency Irregulars",
          body: "Os verbos 'Ir' (to go) e 'Ser' (to be) partilham a mesma forma no passado: 'fui, foste, foi, fomos, foram'. O verbo 'Ter' torna-se 'tive, tiveste, teve, tivemos, tiveram' e 'Estar' torna-se 'estive, estiveste, esteve, estivemos, estiveram'.",
          bodyEn: "The verbs 'Ir' (to go) and 'Ser' (to be) share the exact same forms in the past: 'fui, foste, foi, fomos, foram'. The verb 'Ter' becomes 'tive, tiveste...', and 'Estar' becomes 'estive, estiveste...'."
        }
      ],
      culturalInsight: "No Porto, é comum ouvir o pretérito perfeito com as suas inflexões muito vincadas durante as conversas nos cafés históricos.",
      culturalInsightEn: "In Porto, you'll often hear the past definite with crisp, distinct inflections spoken in daily coffee shop chats."
    },
    audioDrills: [
      {
        phrase: "Ontem fui ao supermercado em Lisboa.",
        ipa: "[ˈõtɐ̃i ˈfui au supɛɾmɨɾˈkaðu ˌĩ lɨʒˈβoɐ]",
        translation: "Yesterday I went to the supermarket in Lisbon.",
        tip: "Notice that 'fui' shares the spelling of 'I went' and 'I was'. Here, the context indicates motion (ir)."
      },
      {
        phrase: "Onde estiveste no sábado passado?",
        ipa: "[ˈõdɨ ʃtiˈβɛʃtɨ nu ˈsaβɐðu pɐˈsaðu]",
        translation: "Where were you last Saturday?",
        tip: "The word ends in 'este', pronounced 'es-teh'. Pronounce the 's' as a whispery 'sh' sound."
      }
    ],
    vocabulary: [
      { word: "Ontem", translation: "Yesterday", usage: "Ontem comprei pão na padaria." },
      { word: "Fui", translation: "I went / I was", usage: "Fui a Sintra de comboio." },
      { word: "Tive", translation: "I had", usage: "Tive muita pressa hoje de manhã." },
      { word: "Estive", translation: "I was (temporary state)", usage: "Estive em casa do senhor Manuel." }
    ],
    exercises: [
      {
        question: "Como conjuga corretamente na forma 'tu' o verbo 'comprar' no passado?",
        questionEn: "How do you correctly conjugate the verb 'comprar' in the past for the 'tu' form?",
        options: ["Compraste", "Comprastes", "Comprou", "Compraste-te"],
        correctIndex: 0,
        explanation: "No português padrão de Portugal, a terminação para 'tu' no pretérito perfeito simples é '-aste' (compraste). Evite adicionar um '-s' desnecessário no final ('comprastes' é gramaticalmente incorreto).",
        explanationEn: "In standard European Portuguese, the past ending for 'tu' is '-aste' (compraste). Adding a terminal '-s' ('comprastes') is incorrect."
      },
      {
        question: "Preencha a lacuna: 'Nós _________ ontem a Cascais passear.'",
        questionEn: "Fill in the gap: 'Nós _________ ontem a Cascais passear.'",
        options: ["fomos", "fomos-nos", "fui", "foram"],
        correctIndex: 0,
        explanation: "'Nós fomos' é a forma de passado do verbo 'ir', perfeitamente adequada para descrever uma viagem concluída.",
        explanationEn: "'Nós fomos' is the past form of the verb 'ir' (to go) for 'we', which fits perfectly to describe a completed past trip."
      }
    ]
  },
  "A2_U3_M2": {
    moduleKey: "A2_U3_M2",
    moduleTitle: "Shopping & Directions",
    lecture: {
      overview: "Saiba como orientar-se nas ruas de Lisboa e fazer compras tradicionais na mercearia do bairro.",
      overviewEn: "Learn how to navigate Lisbon's streets and make traditional purchases at neighborhood grocery stores.",
      points: [
        {
          title: "Contracções de Preposições cruciais",
          titleEn: "Crucial Preposition Contractions",
          body: "Para dar direções, combinamos preposições e determinantes: 'a + o' = 'ao', 'a + a' = 'à'. Por exemplo, 'Vire à esquerda' ou 'Siga até ao cruzamento'.",
          bodyEn: "To give directions, we combine prepositions with articles: 'a + o' = 'ao' (to the), 'a + a' = 'à' (to the fem.). For example, 'Vire à esquerda' (Turn left) or 'Siga até ao cruzamento' (Continue to the intersection)."
        },
        {
          title: "Unidades na Mercearia",
          titleEn: "Units of Measurement in Groceries",
          body: "Em Portugal, pede-se comida por 'quilos' (kg) ou 'gramas' (g). Relembre-se de que grama é masculino quando se refere a peso: diz-se 'duzentos gramas' e não 'duzentas gramas'.",
          bodyEn: "In Portugal, you order weight-based food by 'quilos' or 'gramas'. Remember that 'grama' is masculine when referring to weight: say 'duzentos gramas' (masc.) and never 'duzentas gramas' (fem.)."
        }
      ],
      culturalInsight: "Nas mercearias tradicionais de Lisboa, cumprimentar o serralheiro ou merceeiro com 'Boa tarde, o senhor tem...' é a chave para o melhor produto fresco.",
      culturalInsightEn: "In Lisbon's classic small groceries, addressing the merchant with 'Boa tarde, o senhor tem...' is the key to securing the freshest items."
    },
    audioDrills: [
      {
        phrase: "Onde fica o Correio, se faz favor?",
        ipa: "[ˈõdɨ ˈfikɐ u kuˈʁɐiu sɨ fɐʃ fɐˈβoɾ]",
        translation: "Where is the Post Office, please?",
        tip: "Notice that 'fica' translates literally as 'remains' but is the standard way to ask where static buildings are located."
      },
      {
        phrase: "Queria duzentos gramas de queijo da Serra.",
        ipa: "[ˈkiɾiɐ ðuˈzẽtuʒ ˈɣɾɐmɐʒ dɨ ˈkɐiʒu ðɐ ˈsɛʁɐ]",
        translation: "I would like two hundred grams of Serra cheese.",
        tip: "Ensure 'duzentos' is masculine to match 'gramas' perfectly."
      }
    ],
    vocabulary: [
      { word: "Fica", translation: "Is located / stays", usage: "A paragem do autocarro fica ali." },
      { word: "Vire à esquerda", translation: "Turn left", usage: "No fim da rua, vire à esquerda." },
      { word: "Grama", translation: "Gram (weight - masculine)", usage: "Queria trezentos gramas de presunto." },
      { word: "Mercearia", translation: "Local grocery store", usage: "Vou comprar maçãs à mercearia." }
    ],
    exercises: [
      {
        question: "Como se pede meio quilo de carne em gramas de forma gramaticalmente correta?",
        questionEn: "How do you request half a kilo of meat in grams in a grammatically correct way?",
        options: ["Queria quinhentas gramas...", "Queria quinhentos gramas...", "Queria meio gramas...", "Quero quinhento de grama..."],
        correctIndex: 1,
        explanation: "Em português, a unidade de medida peso 'grama' é masculina. Portanto, diz-se 'quinhentos gramas' e nunca 'quinhentas'.",
        explanationEn: "In Portuguese, the weight unit 'grama' is grammatically masculine. Thus, you must say 'quinhentos gramas', using the masculine form."
      },
      {
        question: "Qual das seguintes frases indica corretamente para mudar de direção para a direita?",
        questionEn: "Which of the following phrases correctly indicates to change direction to the right?",
        options: ["Vire à direita.", "Vire na direito.", "Vai ao direita.", "Siga na direita."],
        correctIndex: 0,
        explanation: "'Vire à direita' é a contração standard da preposição 'a' com o artigo 'a' direcionando para o lado direito.",
        explanationEn: "'Vire à direita' is the standard contraction of preposition 'a' and article 'a' directing toward the right-hand side."
      }
    ]
  },
  "B1_U4_M1": {
    moduleKey: "B1_U4_M1",
    moduleTitle: "Storytelling in the Past",
    lecture: {
      overview: "Entenda o contraste entre as descrições durativas e os episódios pontuais no passado de Portugal.",
      overviewEn: "Understand the deep contrast between continuous durative descriptions and punctual events in Portuguese past tenses.",
      points: [
        {
          title: "O Imperfeito como Tela de Fundo",
          titleEn: "The Imperfect (Pretérito Imperfeito) as Background Canvas",
          body: "Usamos o Pretérito Imperfeito para pintar o cenário: hábitos de infância ('eu ia'), estados contínuos ('fazia sol') ou ações em progresso que foram interrompidas ('eu lia quando ele chegou').",
          bodyEn: "We use the Imperfect tense to paint the background scenery: childhood habits ('eu ia'), continuous states ('fazia sol'), or actions in progress that were interrupted ('eu lia quando ele chegou')."
        },
        {
          title: "O Contraste com o Pretérito Perfeito",
          titleEn: "Contrast with the Past Definite",
          body: "Enquanto o Imperfeito desenha o cenário, o Pretérito Perfeito Simples introduz o evento interruptor súbito de ação concluída: 'Nós jantávamos (imperfeito) quando o telefone tocou (perfeito).'",
          bodyEn: "While the Imperfect paints the background, the Past Definite (Perfeito Simples) introduces the sudden, completed interrupting action: 'Nós jantávamos (We were dining) quando o telefone tocou (when the phone rang).'"
        }
      ],
      culturalInsight: "Quando se contam lendas de Fado ou histórias medievais em Alfama, a transição entre imperfeito e perfeito cria toda a atmosfera dramática.",
      culturalInsightEn: "When telling stories of folklore or tales in Lisbon's Alfama district, alternating between imperfect and perfect tenses builds dramatic suspense."
    },
    audioDrills: [
      {
        phrase: "Antigamente, eu vivia numa casa muito antiga em Coimbra.",
        ipa: "[ɐ̃ˌtiɣɐˈmẽtɨ ˈeu βiˈβiɐ ˈunɐ ˈkazɐ ˈmũitu ɐ̃ˈtiɣɐ ĩ ˈkwĩbɾɐ]",
        translation: "In the old days, I used to live in a very old house in Coimbra.",
        tip: "Note how the ending '-ia' of 'vivia' denotes habitual, continuous past duration."
      }
    ],
    vocabulary: [
      { word: "Antigamente", translation: "In the old days / Formerly", usage: "Antigamente não havia tantos carros." },
      { word: "Costumava", translation: "Used to / Accustomed to", usage: "Eu costumava dar passeios perto do rio." },
      { word: "Entretanto", translation: "In the meantime / Meanwhile", usage: "Ia a chover, entretanto parou." },
      { word: "Quando era miúdo", translation: "When I was a kid", usage: "Quando era miúdo, gostava de comer gelado." }
    ],
    exercises: [
      {
        question: "Preencha a frase: 'Ontem, enquanto eu ________ (ler) um livro, o carteiro bateu à porta.'",
        questionEn: "Fill in the sentence: 'Yesterday, while I ________ (read) a book, the mailman knocked on the door.'",
        options: ["lia", "li", "leio", "lendo"],
        correctIndex: 0,
        explanation: "A ação durativa de ler que estava em progresso exige o pretérito imperfeito do indicativo: 'lia'.",
        explanationEn: "The continuous action of reading that was in progress requires the imperfect tense: 'lia' (was reading)."
      }
    ]
  },
  "B1_U4_M2": {
    moduleKey: "B1_U4_M2",
    moduleTitle: "Professional Routines",
    lecture: {
      overview: "Descubra as regras formais de correspondência de negócios e a colocação rigorosa dos pronomes em Portugal.",
      overviewEn: "Discover the formal rules of Portuguese business correspondence and strict pronoun placement laws.",
      points: [
        {
          title: "Próclise com Ímanes Negativos",
          titleEn: "Proclisis Under Negative Attractors",
          body: "Por defeito em Portugal colocamos o pronome após o verbo ('Dou-te'). No entanto, palavras de negação ('não', 'nunca', 'jamais') atuam como ímanes que puxam o pronome para antes do verbo: 'Não te dou' e nunca 'Não dou-te'.",
          bodyEn: "By default in European Portuguese, the object pronoun goes after the verb ('Dou-te'). However, negative words ('não', 'nunca') act as strong attractors that pull the pronoun before the verb: 'Não te dou' (never 'Não dou-te')."
        },
        {
          title: "Saudações Profissionais",
          titleEn: "Professional Greetings",
          body: "Nas mensagens profissionais portuguesas, iniciamos com 'Caro Senhor' ou 'Estimado Cliente', seguidos de fórmulas elegantes como 'Com os meus melhores cumprimentos' no encerramento.",
          bodyEn: "In Portuguese formal emails, we begin with 'Caro Senhor' (Dear Sir) or 'Estimado Cliente' (Esteemed Client), ending with elegant phrases like 'Com os meus melhores cumprimentos' (With my best regards)."
        }
      ],
      culturalInsight: "Em Portugal, o título profissional (como 'Doutor' ou 'Engenheiro') é amplamente utilizado em comunicações corporativas por respeito.",
      culturalInsightEn: "In Portugal, professional titles (like 'Doutor' or 'Engenheiro') are routinely utilized in official corporate emails as a sign of respect."
    },
    audioDrills: [
      {
        phrase: "Não lhe posso enviar a fatura hoje.",
        ipa: "[ˈnɐ̃u ʎɨ ˈpɔsu ẽˈvjaɾ ɐ fɐˈtuɾɐ ˈoʒɨ]",
        translation: "I cannot send you the invoice today.",
        tip: "Because of 'Não', the pronoun 'lhe' is placed before the verb 'posso'."
      }
    ],
    vocabulary: [
      { word: "Fatura", translation: "Invoice / Bill", usage: "Envio a fatura em anexo, se faz favor." },
      { word: "Cumprimentos", translation: "Regards / Greetings", usage: "Melhores cumprimentos, João Silva." },
      { word: "Anexo", translation: "Attachment", usage: "O documento solicitado segue em anexo." },
      { word: "Prezado / Caro", translation: "Dear (formal)", usage: "Caro Senhor Director, escrevo para..." }
    ],
    exercises: [
      {
        question: "Qual frase corporativa obedece à colocação correta de pronome em Portugal devido ao ímane negativo 'Não'?",
        questionEn: "Which corporate sentence obeys the correct pronoun placement in Portugal due to the negative attractor 'Não'?",
        options: ["Não enviei-lhe a fatura ontem.", "Não lhe enviei a fatura ontem.", "Não enviar-lhe-ei ontem.", "Fatura não enviei-lhe."],
        correctIndex: 1,
        explanation: "O advérbio de negação 'Não' atrai obrigatoriamente o pronome próclise para antes do verbo conjugado: 'Não lhe enviei'.",
        explanationEn: "The negative adverb 'Não' attracts the object pronoun to precede the conjugated verb: 'Não lhe enviei'."
      }
    ]
  },
  "B2_U5_M1": {
    moduleKey: "B2_U5_M1",
    moduleTitle: "Expressing Desires & Doubts",
    lecture: {
      overview: "Domine o Presente do Conjuntivo (Subjuntivo) para formular desejos bem-educados e expressar incertezas gramaticais de imigração.",
      overviewEn: "Master the Present Subjunctive (Conjuntivo) to state polite desires and express grammatical uncertainty regarding migration.",
      points: [
        {
          title: "Gatilhos Universais do Conjuntivo",
          titleEn: "Universal Subjunctive Triggers",
          body: "Sempre que expressamos desejos, dúvidas ou incertezas, o verbo da oração secundária tem de ficar no presente do conjuntivo. Gatilhos típicos: 'Espero que...', 'Duvido que...', 'É crucial que...'.",
          bodyEn: "Whenever we express desires, doubts, or hope, the secondary verb must go into the Present Subjunctive. Common triggers include: 'Espero que...' (I hope that), 'Duvido que...' (I doubt that), 'É crucial que...' (It is crucial that)."
        },
        {
          title: "Paradigmas de Conjugação",
          titleEn: "Conjugation Paradigms",
          body: "A vogal temática altera-se para sinalizar o de conjuntivo: verbos em -AR mudam para '-e' (ex: cantar -> cante) e verbos em -ER/-IR mudam para '-a' (ex: comer -> coma).",
          bodyEn: "The theme vowel flips to flag the subjunctive mood: -AR verbs swap to ending in '-e' (e.g., cantar -> cante), while -ER/-IR verbs switch to ending in '-a' (e.g., comer -> coma)."
        }
      ],
      culturalInsight: "Ao submeter processos na agência pública local (AIMA), é muito comum ouvir: 'Esperamos que o seu processo corra bem.'",
      culturalInsightEn: "When submitting administrative visa files at local offices (AIMA), you'll often hear: 'Esperamos que o seu processo corra bem.' (We hope your process goes well.)"
    },
    audioDrills: [
      {
        phrase: "Espero que consigas fazer o agendamento.",
        ipa: "[ʃˈpɛɾu kɨ kõˈsiɣɐʃ fɐˈzeɾ u ɐʒẽdɐˈmẽtu]",
        translation: "I hope you can book the appointment.",
        tip: "The verb 'conseguires' changes to 'consigas' under the subjunctive trigger 'Espero que'."
      }
    ],
    vocabulary: [
      { word: "Agendamento", translation: "Appointment booking", usage: "Consegui um agendamento na AIMA para as 10h." },
      { word: "Espero que", translation: "I hope that", usage: "Espero que tenhas uma excelente viagem." },
      { word: "Duvido que", translation: "I doubt that", usage: "Duvido que o comboio chegue a tempo." },
      { word: "Corra bem", translation: "Goes well / Runs smoothly", usage: "Tomara que tudo corra bem no exame!" }
    ],
    exercises: [
      {
        question: "Como conjuga o verbo 'fazer' após o gatilho formal 'É recomendável que o senhor ________'?",
        questionEn: "How do you conjugate the verb 'fazer' after the polite trigger 'É recomendável que o senhor ________'?",
        options: ["faça", "faz", "fará", "fizesse"],
        correctIndex: 0,
        explanation: "'É recomendável que' exige o Presente do Conjuntivo. O verbo irregular 'fazer' na 3ª pessoa do singular fica 'faça'.",
        explanationEn: "'É recomendável que' triggers the Present Subjunctive. The irregular verb 'fazer' in the polite 3rd person singular becomes 'faça'."
      }
    ]
  },
  "B2_U5_M2": {
    moduleKey: "B2_U5_M2",
    moduleTitle: "Dynamic Hypotheses",
    lecture: {
      overview: "Descubra como construir frases condicionais polidas e decifrar o Infinitivo Pessoal - uma joia gramatical exclusiva do português.",
      overviewEn: "Discover how to construct polite hypothetical conditional clauses and crack the Personal Infinitive - a unique grammatical jewel.",
      points: [
        {
          title: "Condicionais Hipotéticas no Passado",
          titleEn: "Past Hypothetical Conditional Clauses",
          body: "A combinação clássica para hipóteses improváveis associa o Imperfeito do Conjuntivo ao Condicional Simples: 'Se eu tivesse (conjuntivo) tempo, viajaria (condicional) a Braga.'",
          bodyEn: "The classic pairing for unlikely hypotheses links the Imperfect Subjunctive with the Simple Conditional: 'Se eu tivesse (If I had - subjunctive) tempo, viajaria (I would travel - conditional) a Braga.'"
        },
        {
          title: "O Famoso Infinitivo Pessoal",
          titleEn: "The Famous Personal Infinitive",
          body: "Ao contrário de quase todas as línguas europeias, o português pode flexionar o infinitivo para assinalar claramente o sujeito da ação. Exemplo: 'Fiz este bolo para vocês comerem.' (comer-en).",
          bodyEn: "Unlike almost all other European languages, Portuguese can conjugate its infinitive form to clearly credit the subject performing the action. For instance: 'Fiz este bolo para vocês comerem' (I made this cake for you to eat)."
        }
      ],
      culturalInsight: "No quotidiano português, o Infinitivo Pessoal é usado constantemente para simplificar construções que exigiriam conjuntivos longos.",
      culturalInsightEn: "In local daily life, the Personal Infinitive is loaded constantly to bypass verbose double-conjunction subjunctive loops."
    },
    audioDrills: [
      {
        phrase: "Se eu pudesse, comprava um apartamento no Chiado.",
        ipa: "[sɨ ˈeu puˈðɛsɨ kõˈpɾaβɐ ũ ɐpɐɾtɐˈmẽtu nu ˈʃjaðu]",
        translation: "If I could, I would buy an apartment in Chiado.",
        tip: "Note that in conversational PT-PT, the Imperfeito 'comprava' is commonly used as a proxy for the formal conditional 'compraria'."
      }
    ],
    vocabulary: [
      { word: "Se eu pudesse", translation: "If I could", usage: "Se eu pudesse, ajudava-te na pintura." },
      { word: "Pessoas", translation: "People / subjects", usage: "Isto é excelente para nós lermos." },
      { word: "Tivesse", translation: "Had (Imperfect Subjunctive)", usage: "Se eu tivesse dinheiro, investia em Portugal." },
      { word: "Se fores", translation: "If you go (Future Subjunctive)", usage: "Trás leite se fores à mercearia." }
    ],
    exercises: [
      {
        question: "Qual das frases a seguir possui o Infinitivo Pessoal devidamente flexionado para a segunda pessoa do plural (vocês)?",
        questionEn: "Which of the following sentences has the Personal Infinitive correctly conjugated for the second person plural (vocês)?",
        options: ["É melhor vocês partirem já.", "É melhor vocês partir já.", "É melhor vocês partissem já.", "É melhor vocês partiam já."],
        correctIndex: 0,
        explanation: "O infinitivo flexionado para a pessoa 'vocês' leva a desinência '-em', resultando em 'partirem'.",
        explanationEn: "The inflected infinitive for 'vocês' adds the ending '-em', which results in 'partirem'."
      }
    ]
  },
  "C1_U6_M1": {
    moduleKey: "C1_U6_M1",
    moduleTitle: "Future Conditions",
    lecture: {
      overview: "Inicie o estudo avançado com o Futuro do Conjuntivo, dominando os cenários eventuais futuros em Portugal.",
      overviewEn: "Launch advanced study with the Future Subjunctive, mastering eventual future scenarios in daily Portugal interaction.",
      points: [
        {
          title: "O Uso do Futuro do Conjuntivo",
          titleEn: "The Use of the Future Subjunctive",
          body: "Usado para exprimir condições futuras prováveis ou factos dependentes do tempo futuro. É comumente desencadeado por conjunções temporais ou condicionais: 'quando', 'se', 'assim que', 'enquanto'.",
          bodyEn: "Used to express probable future conditions or events dependent upon future timelines. It is classically triggered by temporal or conditional conjunctions: 'quando' (when), 'se' (if), 'assim que' (as soon as), 'enquanto' (while)."
        },
        {
          title: "Formação Regular e Irregular",
          titleEn: "Regular & Irregular Forms",
          body: "Geralmente tem as mesmas formas do infinitivo pessoal para verbos regulares. No entanto, verbos irregulares derivam do pretérito perfeito: 'fizer' (fazer), 'vier' (vir), 'puder' (poder), 'for' (ser/ir).",
          bodyEn: "For regular verbs, it generally mirrors the personal infinitive spelling. However, irregular verbs derive their stems from the past perfect: 'fizer' (from fazer), 'vier' (from vir), 'puder' (from poder), 'for' (from ser/ir)."
        }
      ],
      culturalInsight: "Um provérbio clássico português diz: 'Faz o bem, não olhes a quem, e colherás os louros quando fores velhinho.'",
      culturalInsightEn: "A classic Portuguese proverb says: 'Do good without looking to whom, and you'll reap the rewards when you grow old.'"
    },
    audioDrills: [
      {
        phrase: "Quando fores a Braga, avisa-me com antecedência.",
        ipa: "[ˈkʷɐ̃du ˈfoɾɨʃ ɐ ˈβɾaɣɐ ɐˈβizɐ mɨ kũ ɐ̃tɨsɨˈðẽsiɐ]",
        translation: "When you go to Braga, let me know in advance.",
        tip: "Notice that 'fores' is the Future Subjunctive form of 'ir'."
      }
    ],
    vocabulary: [
      { word: "Assim que", translation: "As soon as", usage: "Assim que chegares à estação, compra o bilhete." },
      { word: "Quiseres", translation: "If you want / wish", usage: "Faz como quiseres, a decisão é tua." },
      { word: "Fores", translation: "When you are / go", usage: "Quando fores grande, compreenderás." },
      { word: "Puderes", translation: "When you can / are able", usage: "Liga-me assim que puderes." }
    ],
    exercises: [
      {
        question: "Selecione a frase que utiliza corretamente o Futuro do Conjuntivo de forma nativa e natural:",
        questionEn: "Select the sentence that correctly employs the Future Subjunctive in a native, natural way:",
        options: ["Se eu poderei, faço o agendamento.", "Se eu puder, farei o agendamento amanhã.", "Se eu posso, farei o trabalho.", "Quando eu vou à paragem, apanho o autocarro."],
        correctIndex: 1,
        explanation: "Na frase condicional sob incerteza futura ('Se eu puder...'), o verbo 'poder' deve estar obrigatoriamente no Futuro do Conjuntivo ('puder').",
        explanationEn: "In a conditional clause carrying future uncertainty ('Se eu puder...'), the verb 'poder' must be in the Future Subjunctive mood ('puder')."
      }
    ]
  },
  "C1_U6_M2": {
    moduleKey: "C1_U6_M2",
    moduleTitle: "Sophisticated Nuance",
    lecture: {
      overview: "Aprofunde o seu registo académico analisando particípios passados duplos e construções de voz passiva sofisticadas.",
      overviewEn: "Deepen your academic register by analyzing double past participles and sophisticated passive voice constructions.",
      points: [
        {
          title: "Os Particípios Duplos: Curto vs Longo",
          titleEn: "Double Participles: Short vs Long Forms",
          body: "Muitos verbos em Portugal possuem dois particípios: o regular longo (ex: 'aceitado') e o irregular curto (ex: 'aceite'). Regra geral de ouro: use a forma regular longa com os auxiliares 'ter' ou 'haver', e a forma curta com os auxiliares 'ser' ou 'estar'.",
          bodyEn: "Many verbs in Portugal feature two active participles: the regular long form (e.g., 'aceitado') and the irregular short form (e.g., 'aceite'). General rule of thumb: use the long regular form with auxiliary verbs 'ter/haver', and the short irregular form with 'ser/estar'."
        }
      ],
      culturalInsight: "Documentos oficiais do Estado e relatórios jurídicos portugueses prezam pelo absoluto rigor do uso correto do particípio irregular curto.",
      culturalInsightEn: "Official government archives and legal documents in Portugal place supreme emphasis on utilizing correct short irregular participles."
    },
    audioDrills: [
      {
        phrase: "O contrato foi assinado e aceito pelo senhorio.",
        ipa: "[u kõˈtɾatu ˈfui ɐsiˈnaðu i ɐˈsɐitu ˈpɛlu sɨˈɲoɾju]",
        translation: "The contract was signed and accepted by the landlord.",
        tip: "Because the auxiliary is 'foi' (ser), the short irregular form 'aceite' (or 'aceito') is strictly preferred."
      }
    ],
    vocabulary: [
      { word: "Aceite / Aceito", translation: "Accepted (short passive form)", usage: "A proposta está aceite por todos." },
      { word: "Entregue", translation: "Delivered", usage: "A encomenda já foi entregue na morada." },
      { word: "Impresso", translation: "Printed", usage: "O requerimento está impresso em papel timbrado." },
      { word: "Suspenso", translation: "Suspended", usage: "O voo para Faro foi suspenso devido ao nevoeiro." }
    ],
    exercises: [
      {
        question: "Trabalhando com o auxiliar 'Tem', qual particípio está correto?",
        questionEn: "Working with the auxiliary verb 'Tem', which participle is correct?",
        options: ["O diretor tem aceite todas as emendas.", "O diretor tem aceitado todas as emendas.", "O diretor é aceitado todas as emendas.", "O diretor tem aceitos as emendas."],
        correctIndex: 1,
        explanation: "Com os verbos auxiliares 'ter' ou 'haver', devemos empregar estritamente a forma de particípio regular longa ('aceitado').",
        explanationEn: "With auxiliary verbs 'ter' or 'haver', we must employ the regular long participle form ('aceitado')."
      }
    ]
  },
  "C2_U7_M1": {
    moduleKey: "C2_U7_M1",
    moduleTitle: "Mesoclisis Mastery",
    lecture: {
      overview: "Descubra a extraordinária mesóclise literária e jurídica portuguesa, onde o pronome é fundido no miolo do próprio verbo.",
      overviewEn: "Discover extraordinary Portuguese literary and legal mesoclisis, wherein the object pronoun is fused directly inside the middle of the verb.",
      points: [
        {
          title: "A Mecânica de Fusão Mesoclítica",
          titleEn: "The Mechanics of Mesoclitic Fusion",
          body: "A mesóclise ocorre quando o verbo está no Futuro ou no Condicional e não há palavras atratoras de próclise. O verbo divide-se no radical do infinitivo, aloja o pronome com hífen e anexa a terminação do tempo verbal no fim. Exemplo: 'comprar' + 'ei' + 'te' = 'comprar-te-ei'.",
          bodyEn: "Mesoclisis occurs when a verb is conjugated in the Future or Conditional tense and there are no negative/proclisis attractors. The verb splits at the infinitive radical, houses the pronoun with a hyphen, and appends the standard tense ending at the very end (e.g., 'comprar-te-ei' - I will buy you)."
        }
      ],
      culturalInsight: "Embora rara no registo de conversação coloquial simples, a mesóclise é um elemento vital nos canais literários refinados e nas sessões solenes do Parlamento português.",
      culturalInsightEn: "Though rare in colloquial chat rooms, mesoclisis remains a pivotal, vital element in high literature and debates in Portugal's Parliament."
    },
    audioDrills: [
      {
        phrase: "Dar-lhe-ei o relatório amanhã de manhã.",
        ipa: "[ˈdaɾ ʎɨ ˈɐi u ʁɨlɐˈtɔɾju ɐmɐˈɲɐ̃ ðɨ mɐˈɲɐ̃]",
        translation: "I will give him the report tomorrow morning.",
        tip: "Notice that 'Dar-lhe-ei' split the future tense 'Darei' (Dar + ei) to sandwich 'lhe' right in the middle."
      }
    ],
    vocabulary: [
      { word: "Dar-lhe-ia", translation: "I would give him", usage: "Se eu pudesse, dar-lhe-ia todo o apoio." },
      { word: "Fazer-se-á", translation: "It will be done", usage: "A escritura oficial fazer-se-á na sexta-feira." },
      { word: "Dir-vos-emos", translation: "We will tell you (plural)", usage: "Dir-vos-emos toda a verdade sobre o NIF." },
      { word: "Enviar-lhe-ei", translation: "I will send you (formal)", usage: "Enviar-lhe-ei os documentos assinados." }
    ],
    exercises: [
      {
        question: "Transforme a frase 'Eu darei o presente a ti' utilizando as regras eruditas de mesóclise portuguesa:",
        questionEn: "Transform the sentence 'Eu darei o presente a ti' using elegant, scholarly Portuguese mesoclisis rules:",
        options: ["Dar-te-ei o presente.", "Darei-te o presente.", "Te darei o presente.", "Dar-ei-te o presente."],
        correctIndex: 0,
        explanation: "Sob ausência de atratores, o futuro do indicativo exige mesóclise: 'dar' + 'te' + 'ei' = 'Dar-te-ei'. A opção 'Darei-te' é um erro clítico grave no português europeu.",
        explanationEn: "In the absence of attractors, future indicative verbs require mesoclisis: 'dar' + 'te' + 'ei' = 'Dar-te-ei'. Saying 'Darei-te' is highly ungrammatical."
      }
    ]
  },
  "C2_U7_M2": {
    moduleKey: "C2_U7_M2",
    moduleTitle: "Critical Discursive Output",
    lecture: {
      overview: "Alcance o topo absoluto da proficiência refinando discursos políticos, lógicas diplomáticas e sonetos de Camões.",
      overviewEn: "Reach the absolute pinnacle of legal proficiency refining diplomatic lines and analysis of complex lyrical work.",
      points: [
        {
          title: "Sintaxe Erudita e Inversão",
          titleEn: "Scholarly Syntax & Inversions",
          body: "Neste patamar, o utilizador domina a inversão estilística lírica e as nuances do Direito Constitucional de Portugal, integrando vocabulário polissilábico de precisão.",
          bodyEn: "At this tier, the user masters lyrical stylistic inversions, constitutional legal registers, and sophisticated polysyllabic precision terms."
        }
      ],
      culturalInsight: "Recitar os Versos Clássicos dos Lusíadas respeitando a métrica e a fonética setecentista original portuguesa é o derradeiro pilar da maestria cultural.",
      culturalInsightEn: "Reciting classical stanzas of 'Os Lusíadas' respecting historical 16th-century meter and phonetics is the ultimate cultural milestone."
    },
    audioDrills: [
      {
        phrase: "As armas e os barões assinalados...",
        ipa: "[ɐz ˈaɾmɐz i uz βɐˈɾõjʃ ɐsinɐˈlaðuʃ]",
        translation: "The arms and the heroes signalized...",
        tip: "Opening verse of 'Os Lusíadas' by Luís de Camões, the cornerstone of Portuguese epic poetry."
      }
    ],
    vocabulary: [
      { word: "Assinalado", translation: "Distinguished / Renowned", usage: "O escritor obteve um prémio assinalado." },
      { word: "Outrossim", translation: "Likewise / Furthermore", usage: "Outrossim, adverte-se que o prazo terminou." },
      { word: "Inobstante", translation: "Notwithstanding", usage: "Inobstante o parecer negativo, prosseguiram." },
      { word: "Erudito", translation: "Scholarly / Erudite", usage: "Fez um discurso extremamente erudito." }
    ],
    exercises: [
      {
        question: "Qual conjunção antiga e extremadamente erudita equivale a 'além disso' ou 'igualmente'?",
        questionEn: "Which ancient and highly scholarly conjunction is equivalent to 'moreover' or 'likewise'?",
        options: ["Outrossim", "Contudo", "Inobstante", "Todavia"],
        correctIndex: 0,
        explanation: "'Outrossim' é uma conjunção conectiva de alto registo literário e jurídico que significa 'da mesma forma' ou 'além disso'.",
        explanationEn: "'Outrossim' is a high-level connective conjunction used in legal and literary registers meaning 'likewise' or 'moreover'."
      }
    ]
  }
};
