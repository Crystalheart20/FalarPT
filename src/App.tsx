/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Trophy, BookOpen, Layers, Flame, Award, HelpCircle, AlertCircle,
  Sparkles, CheckCircle2, MessageSquare, Zap, Globe, Star, 
  Database, Cpu, Compass, Mic, Heart, RefreshCw, Check, ArrowRight, Play, BookText, Swords
} from 'lucide-react';
import { cefrLevels } from './curriculumData';
import { sampleVocabularyList, sampleGrammarRules, sampleDialogues, sampleStories } from './prdData';
import VocabularyPractice from './components/VocabularyPractice';
import GrammarPractice from './components/GrammarPractice';
import ListeningPractice from './components/ListeningPractice';
import SpeakingPractice from './components/SpeakingPractice';
import ReadingPractice from './components/ReadingPractice';
import WritingPractice from './components/WritingPractice';

// Define custom types for our active interactive lessons
interface InteractiveQuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

const customA1QuizQuestions: InteractiveQuizQuestion[] = [
  {
    id: "q1",
    question: "Como se chama o pequeno-almoço típico composto por um expresso em Lisboa?",
    questionEn: "What is the typical Portuguese breakfast consisting of an espresso in Lisbon?",
    options: ["Uma bica e um pastel de nata", "Um cafezinho e pão de queijo", "Um café da manhã completo", "Um chá preto"],
    correctIndex: 0,
    explanation: "Em Lisboa, pede-se 'uma bica' para um café expresso, frequentemente acompanhado pelo delicioso 'pastel de nata'!",
    explanationEn: "In Lisbon, you order 'uma bica' for an espresso coffee, which is classically accompanied by a delicious 'pastel de nata' custard tart!"
  },
  {
    id: "q2",
    question: "Qual frase representa corretamente o presente contínuo em Portugal (PT-PT)?",
    questionEn: "Which sentence correctly represents the simple continuous present in European Portuguese (PT-PT)?",
    options: ["Eu estou comendo uma torrada.", "Eu estou a comer uma torrada.", "Eu sou a comer uma torrada.", "Eu comer torrada."],
    correctIndex: 1,
    explanation: "Em Portugal, usa-se 'estar a + infinitivo' (estou a comer) em vez do gerúndio terminando em '-ndo'.",
    explanationEn: "In Portugal, you use 'estar a + infinitive' (estou a comer) instead of the Brazilian-style gerund ending in '-ndo' (estou comendo)."
  },
  {
    id: "q3",
    question: "Como deve pedir educadamente a conta numa pastelaria portuguesa?",
    questionEn: "How should you politely ask for the bill at a Portuguese pastry shop or café?",
    options: ["A conta, por favor.", "Me dá a conta aí.", "Queria a conta, se faz favor.", "Quero pagar agora."],
    correctIndex: 2,
    explanation: "'Queria... se faz favor' usa o modo imperfeito cortês, sendo extremamente polido e bem recebido em Portugal.",
    explanationEn: "'Queria... se faz favor' uses the polite conditional/imperfect alongside standard courtesy formulas, which is extremely polite and well-received."
  },
  {
    id: "q4",
    question: "Se quiser apanhar o transporte público para Sintra, você procura por um:",
    questionEn: "If you want to catch public transit to Sintra, what would you look for?",
    options: ["Ônibus municipal", "Trem rápido", "Comboio suburbano", "Bonde elétrico"],
    correctIndex: 2,
    explanation: "Em Portugal, 'comboio' significa trem e é o transporte padrão administrado pela CP para Sintra ou Cascais.",
    explanationEn: "In Portugal, 'comboio' means train (distinct from Brazil's 'trem') and is the standard rail system operated by CP for trips to Sintra or Cascais."
  }
];

const cefrTranslations: Record<string, { communicationGoalPt: string; cultureIntegrationPt: string }> = {
  A1: {
    communicationGoalPt: "Compreender e usar expressões familiares cotidianas e frases extremamente simples baseadas nas necessidades básicas imediatas.",
    cultureIntegrationPt: "O Ritual do Café em Lisboa: Pedir 'um café curto' versus 'uma meia de leite'; expressões básicas de cortesia ('Se faz favor', 'Muito obrigado')."
  },
  A2: {
    communicationGoalPt: "Compreender frases estruturadas e expressões frequentes sobre áreas de relevância direta (ex. informações pessoais básicas, compras, geografia local, emprego).",
    cultureIntegrationPt: "A Vida no Bairro em Portugal: Diálogos autênticos ao comprar na mercearia local, padarias tradicionais e farmácia."
  },
  B1: {
    communicationGoalPt: "Compreender os pontos principais de assuntos familiares e de trabalho, escola ou lazer cotidianos. Lidar com a maioria das situações práticas de viagem no país.",
    cultureIntegrationPt: "As Festas Populares: Danças tradicionais, sardinhas assadas de Santo António em Lisboa, São João no Porto, e noções de fado de Coimbra ou Lisboa."
  },
  B2: {
    communicationGoalPt: "Compreender ideias principais de textos complexos sobre temas concretos ou abstratos, incluindo debates técnicos e discussões dinâmicas da sua especialidade.",
    cultureIntegrationPt: "Processos Administrativos de Relocalização: Navegar de forma confiante pelo pedido de NIF, contrato de arrendamento habitacional e portal do SNS."
  },
  C1: {
    communicationGoalPt: "Compreender textos longos e exigentes com alto nível de abstração, reconhecendo sentidos implícitos e sarcasmo. Comunicar fluidamente sem hesitação.",
    cultureIntegrationPt: "Lendas da Literatura Portuguesa: Leituras comentadas do Livro do Desassossego de Fernando Pessoa, sonetos de Camões e impacto da Revolução dos Cravos."
  },
  C2: {
    communicationGoalPt: "Compreender sem esforço tudo o que ouve ou lê. Reconstruir argumentos de forma perfeitamente coerente a partir de várias fontes com síntese e tom crítico.",
    cultureIntegrationPt: "Nuances da Geopolítica Lusófona: História marítima, comércio dos Açores e Madeira, e variantes formais de interações administrativas com a CPLP."
  }
};

export default function App() {
  // Navigation: learn | vocab | dialogues | writing | leagues
  const [activeTab, setActiveTab] = useState<'learn' | 'vocab' | 'dialogues' | 'writing' | 'leagues'>('learn');
  const [selectedCefrId, setSelectedCefrId] = useState<string>('A1');
  
  // Language support mode (Bilingual Mode defaults to true to assist beginners with side-by-side English translations)
  const [bilingualMode, setBilingualMode] = useState<boolean>(true);

  // Gamified States
  const [xpPoints, setXpPoints] = useState<number>(145);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [hearts, setHearts] = useState<number>(5);
  const [showXpCelebration, setShowXpCelebration] = useState<boolean>(false);
  const [addedXPAmount, setAddedXPAmount] = useState<number>(0);
  
  // Active Daily Tip / Assistant Note with bilingual support
  const [tutorTipObj, setTutorTipObj] = useState<{ pt: string; en: string }>({
    pt: "Bem-vindo ao AprenderPortuguês! Escolha um nível do Quadro Europeu de Referência (A1-C2) abaixo e inicie uma lição dinâmica para ganhar XP e avançar na Liga Diamante!",
    en: "Welcome to AprenderPortuguês! Select a CEFR level (A1-C2) below and start a dynamic lesson to earn XP and move up the Diamond League!"
  });

  // Lesson Player State
  const [isLessonActive, setIsLessonActive] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [lessonXpEarned, setLessonXpEarned] = useState<number>(0);

  // List of completed quests
  const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());

  // Earn XP central handler
  const handleEarnXp = (amount: number) => {
    setAddedXPAmount(amount);
    setXpPoints((prev) => prev + amount);
    setShowXpCelebration(true);

    const motivationTips = [
      {
        pt: "Incrível! Excelente precisão de vocabulário da sua parte. 🎉",
        en: "Incredible! Excellent vocabulary accuracy on your part. 🎉"
      },
      {
        pt: "Perfeito! Note como o sotaque de Portugal soa consolidado e musical. 🇵🇹",
        en: "Perfect! Notice how the European Portuguese pronunciation sounds closed and musical. 🇵🇹"
      },
      {
        pt: "Cada ponto de XP o aproxima de um sotaque de Lisboa impecável! 🦉",
        en: "Each XP point gets you closer to an impeccable, native Lisbon accent! 🦉"
      },
      {
        pt: "Bónus de streak ativado! Continua a praticar todos os dias para não perder o ritmo!",
        en: "Streak bonus activated! Keep practicing every day to maintain your momentum!"
      },
      {
        pt: "A sua morada fiscal e o seu senhorio vão ficar orgulhosos do seu português! 😉",
        en: "Your registered tax address and local landlord will be proud of your Portuguese progress! 😉"
      }
    ];
    setTutorTipObj(motivationTips[Math.floor(Math.random() * motivationTips.length)]);

    setTimeout(() => {
      setShowXpCelebration(false);
    }, 3000);
  };

  // Launch Active Lesson Player
  const startLesson = () => {
    setIsLessonActive(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setLessonXpEarned(0);
  };

  // Submit Answer in Active Lesson
  const submitAnswer = () => {
    if (selectedOption === null || quizSubmitted) return;
    
    setQuizSubmitted(true);
    const activeQuestion = customA1QuizQuestions[currentQuestionIndex];
    if (selectedOption === activeQuestion.correctIndex) {
      setLessonXpEarned((prev) => prev + 15);
    } else {
      setHearts((prev) => Math.max(0, prev - 1));
    }
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < customA1QuizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      // Completed full lesson!
      const finalXpReward = lessonXpEarned + 20; // completion bonus
      handleEarnXp(finalXpReward);
      setIsLessonActive(false);
      
      // Complete daily quest automatically
      const nextQuests = new Set(completedQuests);
      nextQuests.add("lesson");
      setCompletedQuests(nextQuests);
    }
  };

  const activeCefrLevel = cefrLevels.find((level) => level.id === selectedCefrId) || cefrLevels[0];

  // Dynamic sorted league standings based on XP
  const mockCompetitors = [
    { name: 'Tiago Costa', xp: 520, avatar: '🎧', tag: 'Lisboa' },
    { name: 'Inês Santos', xp: 480, avatar: '🌸', tag: 'Porto' },
    { name: 'João Fonseca', xp: 410, avatar: '⛵', tag: 'Algarve' },
    { name: 'Cláudia Abreu', xp: 320, avatar: '🍷', tag: 'Braga' },
    { name: 'Você (Você)', xp: xpPoints, avatar: '⭐', tag: 'Campeão', isUser: true },
    { name: 'Manuel Neves', xp: 260, avatar: '☕', tag: 'Coimbra' },
    { name: 'Sofia Silva', xp: 210, avatar: '🚲', tag: 'Cascais' },
    { name: 'Pedro Ferreira', xp: 170, avatar: '🥞', tag: 'Lisboa' },
    { name: 'Ana Oliveira', xp: 110, avatar: '🎨', tag: 'Madeira' },
    { name: 'Rui Martins', xp: 80, avatar: '⚽', tag: 'Porto' }
  ].sort((a,b) => b.xp - a.xp);

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900" id="aprender-pt-app">
      
      {/* Top Navigation & Gamified HUD Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 shadow-xs" id="custom-app-nav">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between" id="hud-nav-container">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" id="app-logo-section" onClick={() => setActiveTab('learn')}>
            <div className="w-10 h-10 rounded-2xl bg-indigo-650 bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-650/20 shrink-0" id="brand-logo-glow">
              <Globe className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5" id="brand-labels-block">
                <span className="text-md font-extrabold text-slate-900 tracking-tight">AprenderPortuguês</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded font-black text-indigo-700 bg-indigo-50 border border-indigo-100 tracking-wider">PT-PT</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sotaque e Cultura de Portugal</p>
            </div>
          </div>

          {/* Gamified Stat HUD HUD Displays */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold shrink-0" id="stats-hud-badges">
            
            {/* Lifes / Hearts Tracker */}
            <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl text-rose-700" id="heart-hud">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{hearts} / 5 Lives</span>
            </div>

            {/* Daily Streak */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl text-amber-800" id="streak-hud">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{streakDays} Dias</span>
            </div>

            {/* XP Points */}
            <div className="relative flex items-center gap-1.5 bg-indigo-50 border border-indigo-150 px-3 py-1.5 rounded-xl text-indigo-700" id="xp-hud">
              <Trophy className="w-4 h-4 text-indigo-600 fill-indigo-100" />
              <span className="font-extrabold">{xpPoints} XP</span>

              {/* Celebration Bubble */}
              {showXpCelebration && (
                <div className="absolute -top-8 right-0 bg-indigo-650 bg-indigo-600 border border-indigo-550 text-white font-black text-[10px] px-2.5 py-1 rounded-full shadow-md animate-bounce flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-white" />
                  +{addedXPAmount} XP!
                </div>
              )}
            </div>

            {/* League Badge */}
            <div className="relative flex items-center gap-1.5 bg-emerald-50 border border-emerald-150 px-3 py-1.5 rounded-xl text-emerald-800" id="league-hud">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="font-extrabold">Liga Diamante</span>
            </div>

            {/* Bilingual Mode Toggle (Translation assistance for beginners) */}
            <button
              onClick={() => setBilingualMode(!bilingualMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                bilingualMode
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-205 border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
              id="bilingual-mode-toggle"
              title={bilingualMode ? "Disable bilingual assistance" : "Enable bilingual assistance"}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{bilingualMode ? "Bilingual: ON" : "Bilingual: OFF"}</span>
            </button>

          </div>

        </div>
      </header>

      {/* Hero Welcome Banner */}
      <div className="bg-slate-900 text-white py-10 lg:py-12 relative overflow-hidden" id="dashboard-masthead">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-3" id="masthead-labels">
          <div className="inline-flex items-center gap-1.5 bg-indigo-550/30 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold px-3 py-1 rounded-full text-[10.5px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-indigo-300" />
            Estrutura Padrão Alinhada ao Quadro Europeu (QEQR / CEFR)
          </div>
          <h2 className="text-2xl lg:text-3.5xl font-black tracking-tight text-white max-w-2xl leading-tight">
            Domine o Português Europeu de forma viciante, simples e bela.
          </h2>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Esqueça as fórmulas de outros continentes. Aprenda o vocabulário autêntico ("telemóvel", "comboio"), a colocação exata de pronomes ("liguei-te") e a redução vocálica de Lisboa ou Porto, avançando pelas ligas competitivas!
          </p>
        </div>
        <div className="absolute top-1/2 left-[80%] -translate-y-1/2 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl -z-10" />
      </div>

      {/* Main Core Workspaces */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full space-y-6" id="dashboard-host-panel">
        
        {/* Dynamic Coach Tips Card */}
        <div className="bg-white border-l-4 border-indigo-500 rounded-2xl p-4 flex gap-3 shadow-xs items-center" id="encouragement-bar">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-lg select-none" id="advisor-emoji">
            🦉
          </div>
          <div id="advisor-content">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">
              {bilingualMode ? "Dica do Seu Tutor Virtual / Virtual Tutor's Dynamic Tip" : "Dica do Seu Tutor Virtual"}
            </span>
            <p className="text-xs text-slate-705 font-bold italic leading-relaxed" id="encouragement-text">
              {tutorTipObj.pt}
            </p>
            {bilingualMode && (
              <p className="text-[10px] text-slate-450 text-slate-500 font-medium italic leading-relaxed mt-0.5" id="encouragement-text-en">
                ({tutorTipObj.en})
              </p>
            )}
          </div>
        </div>

        {/* Global tab Switcher menu */}
        <div className="flex border-b border-slate-200" id="dashboard-tabs-dock">
          {[
            { id: 'learn', label: 'Painel de Aulas', icon: Compass },
            { id: 'vocab', label: 'Vocabulário SRS', icon: BookText },
            { id: 'dialogues', label: 'Escuta & Fala Reais', icon: Mic },
            { id: 'writing', label: 'Oficina de Escrita', icon: MessageSquare },
            { id: 'leagues', label: 'Arena de Ligas', icon: Trophy }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`dashboard-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsLessonActive(false);
                }}
                className={`px-4 sm:px-6 py-3.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                  isTabActive
                    ? 'border-indigo-600 text-indigo-750 font-extrabold text-indigo-700'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isTabActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* App content renderer */}
        <div id="active-tab-panel">
          
          {/* TAB 1: LEARN (AULAS & CURRÍCULO) */}
          {activeTab === 'learn' && (
            <div className="space-y-6" id="learn-tab-view">
              
              {/* CEFR Levels selection bar */}
              <div className="space-y-2" id="cefr-bar-section">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Progresso por Nível do Quadro Europeu</span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" id="cefr-switches">
                  {cefrLevels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedCefrId(lvl.id)}
                      className={`p-3 rounded-xl flex flex-col items-center justify-center border text-center transition-all cursor-pointer relative ${
                        selectedCefrId === lvl.id
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-black tracking-widest">{lvl.id}</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">{lvl.title.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main split for CEFR outline and daily lesson player */}
              {isLessonActive ? (
                /* IN-APP INTERACTIVE LESSON PLAYER (Duolingo style) */
                <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-md p-6 lg:p-8 space-y-6 animate-fade-in" id="lesson-player-workspace">
                  
                  {/* Top lesson player state */}
                  <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-50 pb-3" id="player-header">
                    <span className="font-mono">Pergunta {currentQuestionIndex + 1} de {customA1QuizQuestions.length}</span>
                    <span className="text-indigo-600 bg-indigo-50 font-bold px-2 py-0.5 rounded-full">
                      Poder de XP: +{(currentQuestionIndex + 1) * 15} XP
                    </span>
                  </div>

                  {/* ACTIVE QUESTION */}
                  <div className="space-y-4" id="lesson-active-question-card">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                      {bilingualMode ? "Escolha a Resposta Correta / Choose the Correct Answer" : "Escolha a Resposta Correta"}
                    </span>
                    <h3 className="text-md font-bold text-slate-805 leading-normal pt-1" id="question-text">
                      {customA1QuizQuestions[currentQuestionIndex].question}
                    </h3>
                    {bilingualMode && (
                      <p className="text-xs text-slate-500 italic font-medium -mt-1 leading-normal pb-1">
                        ({customA1QuizQuestions[currentQuestionIndex].questionEn})
                      </p>
                    )}

                    {/* Options Grid */}
                    <div className="space-y-2.5 pt-2" id="question-options">
                      {customA1QuizQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                        const isSelected = selectedOption === oIdx;
                        const isCorrectOption = oIdx === customA1QuizQuestions[currentQuestionIndex].correctIndex;
                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedOption(oIdx)}
                            className={`w-full text-left text-xs p-3.5 rounded-xl border font-semibold transition-all flex justify-between items-center ${
                              quizSubmitted
                                ? isCorrectOption
                                  ? 'bg-green-50 border-green-300 text-green-900'
                                  : isSelected
                                    ? 'bg-red-50 border-red-300 text-red-950'
                                    : 'bg-white border-slate-200 opacity-60'
                                : isSelected
                                  ? 'border-indigo-500 bg-indigo-50/40 text-indigo-900 ring-2 ring-indigo-550/10'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-650 cursor-pointer'
                            }`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrectOption && (
                              <Check className="w-4 h-4 text-green-600 font-bold" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SUBMISSION ACTION */}
                  {!quizSubmitted ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={submitAnswer}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white transition-colors py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
                    >
                      {bilingualMode ? "Verificar Resposta / Verify Answer" : "Verificar Resposta"}
                    </button>
                  ) : (
                    /* FEEDBACK AND NAVIGATION CONTROLS */
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      selectedOption === customA1QuizQuestions[currentQuestionIndex].correctIndex
                        ? 'bg-green-50/50 border-green-100'
                        : 'bg-red-50/50 border-red-100'
                    }`} id="lesson-feedback-alert">
                      <div className="flex items-center gap-2">
                        {selectedOption === customA1QuizQuestions[currentQuestionIndex].correctIndex ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="text-xs font-black text-green-900">
                              {bilingualMode ? "Resposta Correta! / Correct Answer! (+15 XP)" : "Resposta Correta! (+15 XP)"}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-5 h-5 text-rose-600" />
                            <span className="text-xs font-black text-red-800">
                              {bilingualMode ? "Ups! Correção Necessária / Correction Required" : "Ups! Correção Necessária (Perdeu 1 Vida)"}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                        {customA1QuizQuestions[currentQuestionIndex].explanation}
                      </p>
                      {bilingualMode && (
                        <p className="text-[10px] text-slate-500 italic leading-relaxed border-t border-slate-100 pt-1.5 mt-1">
                          ({customA1QuizQuestions[currentQuestionIndex].explanationEn})
                        </p>
                      )}
                      
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-slate-900 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {currentQuestionIndex < customA1QuizQuestions.length - 1 ? (
                          <>
                            {bilingualMode ? "Seguinte / Next" : "Seguinte"}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          bilingualMode ? "Concluir Lição! / Complete Lesson!" : "Concluir Lição!"
                        )}
                      </button>
                    </div>
                  )}

                  {/* Quit active lesson link */}
                  <div className="text-center">
                    <button
                      onClick={() => setIsLessonActive(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-600 underline font-semibold cursor-pointer"
                    >
                      Abandonar Aula Prática
                    </button>
                  </div>

                </div>
              ) : (
                /* OUTLINE CEFR ROADMAP TIMELINE */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="outline-lesson-split">
                  
                  {/* Left block syllabus objectives */}
                  <div className="lg:col-span-5 space-y-4" id="outline-objectives">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                      <span className="text-[9px] uppercase font-bold text-indigo-500 block tracking-wider font-mono">
                        {bilingualMode ? "Metas de Nível de Portugal / Level Objectives" : "Metas de Nível de Portugal"}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                        {bilingualMode ? "Metas e Requisitos Pedagógicos / Pedagogical Milestones" : "Símbolos e Metas Gramaticais"} ({activeCefrLevel.id})
                      </h4>
                      
                      <div className="space-y-2" id="outline-goal-list text">
                        <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                            {bilingualMode ? "Objetivo de Comunicação / Communication Goal" : "Objetivo de Comunicação"}
                          </span>
                          <p className="text-xs text-slate-800 leading-relaxed font-bold">
                            {cefrTranslations[activeCefrLevel.id]?.communicationGoalPt}
                          </p>
                          {bilingualMode && (
                            <p className="text-[11px] text-slate-500 italic mt-1 leading-relaxed border-t border-slate-100/50 pt-1">
                              ({activeCefrLevel.communicationGoal})
                            </p>
                          )}
                        </div>

                        <div className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                            {bilingualMode ? "Foco na Gramática / Grammar Focus" : "Foco na Gramática"}
                          </span>
                          <ul className="text-xs text-slate-650 leading-normal pl-4 list-disc space-y-1 font-semibold">
                            {activeCefrLevel.grammarFocus.map((f, idx) => (
                              <li key={idx}>{f}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-xl space-y-1">
                          <span className="text-[10px] text-amber-700 font-bold block uppercase tracking-wider">
                            {bilingualMode ? "Integração Sócio-Cultural / Socio-Cultural Integration" : "Integração Sócio-Cultural"}
                          </span>
                          <p className="text-[11px] text-slate-800 leading-relaxed font-bold">
                            {cefrTranslations[activeCefrLevel.id]?.cultureIntegrationPt}
                          </p>
                          {bilingualMode && (
                            <p className="text-[10.5px] text-amber-900 font-medium italic mt-1 leading-relaxed border-t border-amber-200/30 pt-1">
                              ({activeCefrLevel.cultureIntegration})
                            </p>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right block: Course Timeline of Modules */}
                  <div className="lg:col-span-7 space-y-4" id="outline-milestones">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                      
                      <div className="flex justify-between items-center border-b border-slate-50 pb-3" id="timeline-head">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-indigo-550 font-mono tracking-wider text-indigo-500">Unidades Disponíveis</span>
                          <h4 className="text-xs font-black text-slate-400 uppercase">Percurso de Aprendizagem ({selectedCefrId})</h4>
                        </div>
                        <span className="text-xs font-bold text-slate-500">{activeCefrLevel.vocabularyTarget} target lemmas</span>
                      </div>

                      {/* Timeline flow */}
                      <div className="space-y-4" id="timeline-blocks">
                        {activeCefrLevel.units.map((unit, uIdx) => (
                          <div key={uIdx} className="relative border-l-2 border-indigo-200 pl-6 pb-2" id={`unit-${uIdx}`}>
                            
                            {/* Dot element badge */}
                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-650 bg-indigo-600 border-2 border-white shadow-xs" />
                            
                            <h3 className="text-xs uppercase tracking-wider font-extrabold text-indigo-900">{unit.unitTitle}</h3>
                            
                            <div className="space-y-3 mt-3" id={`unit-modules-${uIdx}`}>
                              {unit.modules.map((mod, mIdx) => (
                                <div key={mIdx} className="bg-slate-50/60 hover:bg-slate-50 border border-slate-150 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
                                  <div className="space-y-1" id={`mod-desc-${uIdx}-${mIdx}`}>
                                    <h5 className="text-xs font-black text-slate-800 uppercase leading-snug">{mod.moduleTitle}</h5>
                                    
                                    <div className="flex flex-wrap gap-1 md:gap-2 pt-1" id={`mod-list-tags-${uIdx}-${mIdx}`}>
                                      {mod.lessons.map((less, lIdx) => (
                                        <span key={lIdx} className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-500" id={`lesson-badge-${uIdx}-${mIdx}-${lIdx}`}>
                                          {less.split(': ')[1] || less}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {selectedCefrId === "A1" ? (
                                    <button
                                      onClick={startLesson}
                                      className="bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 shrink-0 cursor-pointer shadow-xs"
                                    >
                                      <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                                      Praticar Dia 1
                                    </button>
                                  ) : (
                                    <button
                                      disabled
                                      className="bg-slate-100 border border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-wider py-2.5 px-3.5 rounded-xl shrink-0 cursor-not-allowed"
                                      title="Desbloqueie completando as lições de nível A1!"
                                    >
                                      Bloqueado
                                    </button>
                                  )}

                                </div>
                              ))}
                            </div>

                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: VOCABULARY FLASHCARDS (SERINGA VOCABULÁRIO SRS) */}
          {activeTab === 'vocab' && (
            <div className="space-y-4 animate-fade-in" id="vocab-tab-view">
              <VocabularyPractice onEarnXp={handleEarnXp} bilingualMode={bilingualMode} />
            </div>
          )}

          {/* TAB 3: REAL CONVERSATIONS & LISTENING LAB */}
          {activeTab === 'dialogues' && (
            <div className="space-y-6 animate-fade-in" id="dialogues-tab-view">
              
              {/* Internal Sub-selector for Dialogues or Pronunciation Micro drills */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4" id="convo-intro-banner">
                <div className="flex gap-2.5 items-center" id="convo-intro-grid">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg shadow-inner shrink-0" id="convo-banner-ico">
                    🔊
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Laboratório de Diálogos & Prática de Sotaque</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      European Portuguese tem propriedades fonéticas únicas e "stress-timed" (redução drástica das vogais não tônicas). Escolha entre explorar diálogos completos de Lisboa ou treinar a redução vocálica de frases em voz alta!
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid layout containing either dialogues or speech coaches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="audio-convo-split">
                
                {/* Dialogue card block */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 space-y-4">
                  <div className="border-b border-slate-50 pb-2.5 flex items-center gap-1.5" id="dial-panel-head">
                    <Globe className="w-4.5 h-4.5 text-emerald-500" />
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">1. Diálogos Imersivos em Portugal</h4>
                  </div>
                  <ListeningPractice onEarnXp={handleEarnXp} bilingualMode={bilingualMode} />
                </div>

                {/* Accent micro block */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-5 space-y-4">
                  <div className="border-b border-slate-50 pb-2.5 flex items-center gap-1.5" id="speak-panel-head">
                    <Mic className="w-4.5 h-4.5 text-amber-500" />
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">2. Prática Ativa de Pronúncia</h4>
                  </div>
                  <SpeakingPractice onEarnXp={handleEarnXp} bilingualMode={bilingualMode} />
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: OFICINA DE ESCRITA AI */}
          {activeTab === 'writing' && (
            <div className="space-y-4 animate-fade-in" id="writing-tab-view">
              <WritingPractice onEarnXp={handleEarnXp} bilingualMode={bilingualMode} />
            </div>
          )}

          {/* TAB 5: ARENA DE LIGAS (RANKING & CONQUISTAS) */}
          {activeTab === 'leagues' && (
            <div className="space-y-6 animate-fade-in" id="leagues-tab-view">
              
              {/* Splitting for League standings, Daily quests and badges */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="leagues-grid-layout">
                
                {/* STANDINGS PANEL (Duolingo style - 7 cols) */}
                <div className="lg:col-span-7 space-y-4" id="league-standings-side">
                  <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-6">
                    
                    <div className="border-b border-slate-105 border-slate-100 pb-3 flex justify-between items-center" id="league-panel-header">
                      <div className="space-y-1">
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Competição Ativa</span>
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase">Liga Diamante (Grupo #84)</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono tracking-widest bg-slate-50 border border-slate-100 px-2 py-1 rounded">2d 4h restantes</span>
                    </div>

                    {/* Competitors List */}
                    <div className="space-y-2.5" id="competitors-scroller">
                      {mockCompetitors.map((user, uIdx) => (
                        <div
                          key={uIdx}
                          id={`competitor-${uIdx}`}
                          className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                            user.isUser
                              ? 'bg-amber-50/55 border-amber-300 ring-2 ring-amber-400/10'
                              : 'bg-slate-50/50 border-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3" id={`comp-lbl-group-${uIdx}`}>
                            {/* Rank number badge */}
                            <span className={`w-6 text-xs font-bold font-mono text-center ${
                              uIdx === 0 ? 'text-yellow-500 text-lg' : uIdx === 1 ? 'text-slate-400' : uIdx === 2 ? 'text-amber-600' : 'text-slate-400'
                            }`} id={`comp-idx-${uIdx}`}>
                              {uIdx === 0 ? '🏆' : uIdx + 1}
                            </span>

                            {/* Avatar */}
                            <span className="text-lg bg-white w-8 h-8 rounded-full flex items-center justify-center border border-slate-100 shadow-xs" id={`comp-avatar-${uIdx}`}>{user.avatar}</span>

                            <div id={`comp-name-${uIdx}`}>
                              <span className={`text-xs font-bold ${user.isUser ? 'text-amber-900' : 'text-slate-800'}`} id={`comp-name-lbl-${uIdx}`}>{user.name}</span>
                              <span className="text-[9px] uppercase font-bold text-slate-400 block" id={`comp-tag-lbl-${uIdx}`}>{user.tag}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4" id={`comp-xp-block-${uIdx}`}>
                            <span className={`text-xs font-extrabold font-mono ${user.isUser ? 'text-amber-700' : 'text-slate-700'}`} id={`comp-xp-${uIdx}`}>{user.xp} XP</span>
                            
                            {/* Promo state icons */}
                            {uIdx < 3 ? (
                              <span className="text-[9px] font-black uppercase text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md" id={`comp-promo-${uIdx}`}>Promover</span>
                            ) : uIdx >= 7 ? (
                              <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md" id={`comp-demote-${uIdx}`}>Descer</span>
                            ) : (
                              <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md" id={`comp-safe-${uIdx}`}>Seguro</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* DAILY QUESTS & TROPHIES PANEL (5 cols) */}
                <div className="lg:col-span-5 space-y-6" id="quest-awards-side">
                  
                  {/* Daily Quests Card */}
                  <div className="bg-white rounded-3xl border border-slate-150 p-5 shadow-xs space-y-4">
                    <div className="border-b border-slate-50 pb-2.5 flex items-center justify-between" id="quest-header">
                      <div className="flex items-center gap-2" id="quest-badge-row">
                        <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Missões Diárias</h4>
                      </div>
                      <span className="text-[9px] bg-slate-50 border border-slate-150 rounded text-slate-400 font-bold py-1 px-1.5 uppercase font-mono">Meta Diária</span>
                    </div>

                    <div className="space-y-2.5" id="quests-checklist">
                      {[
                        { id: 'lesson', title: 'Completar 1 Aula de Portugal (A1)', xp: '+25 XP' },
                        { id: 'vocab', title: 'Estudar 1 Cartão de Vocabulário', xp: '+15 XP' },
                        { id: 'dialogue', title: 'Praticar Fala no Lab de Voz', xp: '+20 XP' }
                      ].map((quest) => {
                        const isQuestCompleted = completedQuests.has(quest.id) || (quest.id === 'vocab' && xpPoints > 145);
                        return (
                          <div
                            key={quest.id}
                            onClick={() => {
                              if (!isQuestCompleted) {
                                const nextQuests = new Set(completedQuests);
                                nextQuests.add(quest.id);
                                setCompletedQuests(nextQuests);
                                handleEarnXp(quest.id === 'vocab' ? 15 : 20);
                              }
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isQuestCompleted
                                ? 'bg-green-50/50 border-green-200'
                                : 'bg-white hover:bg-slate-50 border-slate-150'
                            }`}
                            id={`quest-card-${quest.id}`}
                          >
                            <div className="flex items-center gap-2.5" id={`quest-checker-${quest.id}`}>
                              <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                isQuestCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-slate-300'
                              }`} id={`quest-checkbox-${quest.id}`}>
                                {isQuestCompleted && <Check className="w-3.5 h-3.5 font-bold" />}
                              </span>
                              <span className={`text-xs ${isQuestCompleted ? 'line-through text-slate-400 font-medium' : 'text-slate-700 font-semibold'}`} id={`quest-lbl-${quest.id}`}>
                                {quest.title}
                              </span>
                            </div>
                            <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full" id={`quest-xp-${quest.id}`}>{quest.xp}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Achievements Showcase Badges */}
                  <div className="bg-white rounded-3xl border border-slate-150 p-5 shadow-xs space-y-4">
                    <div className="border-b border-slate-50 pb-2.5 flex items-center gap-2" id="achieve-hdr">
                      <Star className="w-5 h-5 text-indigo-550 fill-indigo-100 text-indigo-600" />
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Galeria de Conquistas</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3" id="badges-grid-container">
                      {[
                        { title: 'Vanguardista do NIF', icon: '📎', desc: 'Iniciou práticas de morada fiscal burocrática', unlocked: true },
                        { title: 'Sábio da Pastelaria', icon: '🥮', desc: 'Sabe encomendar bica e pastel de nata com maestria', unlocked: true },
                        { title: 'Herói da Escrita', icon: '✍️', desc: 'Escreveu uma petição ou email ao senhorio', unlocked: xpPoints > 200 },
                        { title: 'Sotaque de Graça', icon: '🎙️', desc: 'Atingiu sotaque consolidado de Lisboa', unlocked: false }
                      ].map((badge, bIdx) => (
                        <div
                          key={bIdx}
                          className={`p-3.5 rounded-2xl border text-center relative overflow-hidden flex flex-col items-center justify-center transition-all ${
                            badge.unlocked
                              ? 'bg-indigo-50/20 border-indigo-150 border-indigo-200'
                              : 'bg-slate-50/50 border-slate-100 opacity-55'
                          }`}
                          id={`badge-block-${bIdx}`}
                        >
                          <span className={`text-3xl pb-1 block filter ${badge.unlocked ? '' : 'grayscale'}`}>{badge.icon}</span>
                          <span className="text-[10px] font-black text-slate-900 block leading-tight">{badge.title}</span>
                          <p className="text-[8px] text-slate-400 mt-0.5 leading-normal">{badge.desc}</p>
                          
                          {badge.unlocked && (
                            <div className="absolute top-1.5 right-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 fill-indigo-50" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* Footer Banner */}
      <footer className="bg-white border-t border-slate-105 border-slate-100 py-8 text-center text-xs text-slate-400 mt-12" id="aprender-pt-footer">
        <div className="max-w-3xl mx-auto px-4 space-y-2" id="footer-inner-host">
          <p className="font-extrabold text-slate-600 text-[11px]" id="footer-copy">
            AprenderPortuguês Pro · European Portuguese Regional Standards
          </p>
          <p className="leading-relaxed" id="footer-rules text">
            Totalmente alinhado às diretrizes oficiais do Acordo Ortográfico de 1990 (PT-PT). Todos os vocábulos e regras gramaticais representam o comportamento linguístico nativo de Lisboa, do Porto, Coimbra e do resto de Portugal.
          </p>
          <div className="text-[9px] font-mono text-slate-300 pt-1" id="footer-terminal-label">
            Versão de Produção 2026 · AI Studio Build Iframe Mode active
          </div>
        </div>
      </footer>

    </div>
  );
}
