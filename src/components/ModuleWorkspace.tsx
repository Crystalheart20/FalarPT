import { useState, useEffect } from 'react';
import { 
  X, BookOpen, Volume2, Award, Check, AlertCircle, ArrowRight,
  Sparkles, Trophy, Heart, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { ModuleLessonContent, ModuleExercise } from '../data/moduleLessons';

interface ModuleWorkspaceProps {
  moduleLesson: ModuleLessonContent;
  onClose: () => void;
  onComplete: (xpEarned: number) => void;
  bilingualMode: boolean;
  onEarnXp: (xp: number) => void;
}

export default function ModuleWorkspace({
  moduleLesson,
  onClose,
  onComplete,
  bilingualMode,
  onEarnXp
}: ModuleWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'lecture' | 'audio' | 'practice'>('lecture');
  
  // Exercise States
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  
  // Audio state
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const activeQuestion: ModuleExercise | undefined = moduleLesson.exercises[currentIdx];

  // TTS browser speech simulator for PT-PT
  const playAudioSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingPhrase(text);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT'; // European Portuguese accent standard!
      utterance.rate = 0.8; // slightly slower for educational comprehensibility
      utterance.onend = () => {
        setPlayingPhrase(null);
      };
      utterance.onerror = () => {
        setPlayingPhrase(null);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      // Small visual simulation if SpeechSynthesis not supported
      setPlayingPhrase(text);
      setTimeout(() => setPlayingPhrase(null), 1200);
    }
  };

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    
    if (activeQuestion) {
      if (selectedOption === activeQuestion.correctIndex) {
        setEarnedXp(prev => prev + 15);
      } else {
        setHearts(prev => Math.max(0, prev - 1));
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < moduleLesson.exercises.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Completed full set
      const completedReward = 25; // Bonus completion XP
      onEarnXp(earnedXp + completedReward);
      setIsQuizFinished(true);
      onComplete(earnedXp + completedReward);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setEarnedXp(0);
    setHearts(3);
    setIsQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6" id="module-workspace-modal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        
        {/* Top Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 px-5 py-4 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900">
              European Portuguese • {moduleLesson.moduleKey.split('_')[0]} Curriculum
            </span>
            <h2 className="text-sm md:text-md font-black text-slate-900 dark:text-white uppercase leading-tight">
              {moduleLesson.moduleTitle}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-350 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold cursor-pointer"
            title="Sair do Módulo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 md:p-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('lecture')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'lecture'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📘 Lição & Teoria</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'audio'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>🔊 Estudo Prático de Voz</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>✍️ Exercícios do Módulo</span>
          </button>
        </div>

        {/* Content Pane */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 bg-slate-50/30 dark:bg-slate-950 font-sans">
          
          {/* TAB 1: LECTURE & THEORY */}
          {activeTab === 'lecture' && (
            <div className="space-y-6 animate-fade-in" id="lecture-workspace-pane">
              
              {/* Overview Box */}
              <div className="bg-indigo-50 dark:bg-indigo-950/40 border-l-4 border-indigo-600 p-4 rounded-r-2xl space-y-1">
                <span className="text-[9px] uppercase font-bold text-indigo-700 dark:text-indigo-400">Resumo da Lição</span>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
                  {moduleLesson.lecture.overview}
                </p>
                {bilingualMode && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                    ({moduleLesson.lecture.overviewEn})
                  </p>
                )}
              </div>

              {/* Lecture Material Points */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-1">
                  Gramática & Conceitos Fundamentais
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleLesson.lecture.points.map((pt, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 space-y-2 shadow-xs transition-transform hover:scale-[1.01]">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <h5 className="text-xs font-black uppercase text-slate-800 dark:text-slate-100 leading-snug">
                          {pt.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                        {pt.body}
                      </p>
                      {bilingualMode && (
                        <div className="border-t border-slate-50 dark:border-slate-800 pt-1.5 mt-1">
                          <h6 className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">English Outline: {pt.titleEn}</h6>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed">
                            {pt.bodyEn}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vocabulary Table (Rich Widget) */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-1">
                  Dicionário do Módulo (Essential Vocab)
                </h4>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 overflow-hidden shadow-xs">
                  <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
                    {moduleLesson.vocabulary.map((voc, idx) => (
                      <div key={idx} className="p-3 flex flex-wrap sm:flex-nowrap justify-between gap-3 text-xs items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/45 transition-all">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-md border border-indigo-50 dark:border-indigo-900 text-[11px]">
                            {voc.word}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] sm:ml-3">
                            — {voc.translation}
                          </span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-950 px-3 py-1 rounded-lg border border-slate-150 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                          <span className="text-slate-400 uppercase font-bold text-[9px] mr-1.5">Contexto:</span>
                          "{voc.usage}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cultural Insight Bubble */}
              <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg shadow-inner shrink-0 leading-none">
                  💡
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-amber-805 uppercase tracking-wider">
                    Dica de Integração Cultural de Portugal
                  </h4>
                  <p className="text-xs text-slate-800 dark:text-slate-250 leading-relaxed font-semibold">
                    {moduleLesson.lecture.culturalInsight}
                  </p>
                  {bilingualMode && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      ({moduleLesson.lecture.culturalInsightEn})
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom guide prompt to proceed to practice */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('audio')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Avançar para Estudo Prático de Voz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: SPEECH LAB AUDIO DRILLS */}
          {activeTab === 'audio' && (
            <div className="space-y-6 animate-fade-in" id="audio-drills-pane">
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Volume2 className="w-5 h-5" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                    Laboratório de Sotaque & Redução Vocálica de Lisboa
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  O sotaque de Portugal Continental é predominantemente "stress-timed" (sílabas átonas desaparecem de forma veloz!).
                  Clique em cada reprodutor abaixo para escutar a pronúncia nativa sintetizada em português europeu impecável e tente imitar as inflexões!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {moduleLesson.audioDrills.map((drill, idx) => {
                  const isCurrentPlaying = playingPhrase === drill.phrase;
                  return (
                    <div 
                      key={idx}
                      className={`bg-white dark:bg-slate-900 border ${
                        isCurrentPlaying 
                          ? 'border-indigo-500 ring-1 ring-indigo-500/20' 
                          : 'border-slate-150 dark:border-slate-800'
                      } p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-3xs transition-all`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-905 dark:text-white leading-normal">
                            {drill.phrase}
                          </span>
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 font-mono px-1.5 py-0.5 rounded">
                            {drill.ipa}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[11px] text-slate-500 font-semibold">
                            Trad: <span className="italic">{drill.translation}</span>
                          </p>
                          <p className="text-[10px] text-slate-450 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
                            <strong className="text-indigo-650 text-indigo-400 font-mono uppercase text-[9px] mr-1">Dica Fonética:</strong> 
                            {drill.tip}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => playAudioSpeech(drill.phrase)}
                        className={`self-start md:self-center w-12 h-12 rounded-full shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                          isCurrentPlaying
                            ? 'bg-indigo-600 text-white animate-pulse'
                            : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900'
                        }`}
                        title="Ouvir Estúdio de Áudio"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Proceed Prompt */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('practice')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Começar Exercícios de Prática</span>
                  <Award className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: MODULE SPECIFIC INTERACTIVE PRACTICAL EXERCISES */}
          {activeTab === 'practice' && (
            <div className="space-y-6 animate-fade-in" id="practical-exercise-pane">
              
              {isQuizFinished ? (
                /* Celebration finished screen */
                <div className="text-center py-6 px-4 space-y-6 max-w-md mx-auto" id="celebration-screen">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-600 animate-bounce shadow-md">
                    <Trophy className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-md font-black uppercase text-slate-905 dark:text-white">
                      Módulo Praticado com Sucesso!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Que prestação fantástica! Comprovou os conhecimentos no sotaque europeu e subiu na Tabela da Liga Diamante.
                    </p>
                  </div>

                  {/* Rewards Breakdown Cards */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 p-4 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[11px] text-slate-500 font-bold">Respostas Acertadas</span>
                      <span className="text-xs text-green-700 font-black">{moduleLesson.exercises.length} de {moduleLesson.exercises.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[11px] text-slate-500 font-bold">XP de Exercício</span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-black">+{earnedXp} XP</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-[11px] text-slate-500 font-bold">Bónus de Conclusão</span>
                      <span className="text-xs text-teal-600 font-black">+25 XP</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-indigo-50/40 dark:bg-indigo-950/20 px-2 rounded-lg mt-1 border border-indigo-100 dark:border-indigo-900/50">
                      <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-black">Ganho Total de XP</span>
                      <span className="text-xs text-indigo-750 dark:text-indigo-300 font-black">+{earnedXp + 25} XP</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={restartQuiz}
                      className="flex-1 bg-slate-105 border border-slate-205 hover:bg-slate-150 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
                    >
                      Repetir Prática
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                    >
                      Concluir e Fechar
                    </button>
                  </div>
                </div>
              ) : hearts <= 0 ? (
                /* Out of lives prompt */
                <div className="text-center py-8 space-y-5 max-w-sm mx-auto" id="out-of-lives-screen">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-rose-600 border border-red-200">
                    <Heart className="w-8 h-8 fill-red-500 text-red-500 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black uppercase text-slate-900 dark:text-red-550 text-red-500">
                      Língua Cansada! (0 Vidas Restantes)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      Oops! Errou algumas perguntas cruciais sobre as directrizes de European Portuguese. Recomenda-se dar uma leitura rápida no tab de teoria antes de tentar o desafio prático de novo!
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('lecture')}
                      className="flex-1 bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      Estudar Notas de Aula
                    </button>
                    <button
                      onClick={restartQuiz}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                    >
                      Tentar do Início
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic module exercise player */
                <div className="max-w-xl mx-auto space-y-6" id="active-quiz-flow">
                  
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-3xs">
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
                        <span>Pergunta {currentIdx + 1} de {moduleLesson.exercises.length}</span>
                        <span className="text-green-600">Pontuação de XP: +{earnedXp}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${((currentIdx + 1) / moduleLesson.exercises.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Hearts bar display */}
                    <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/20 px-2.5 py-1 rounded-xl border border-rose-100 dark:border-rose-900 shrink-0">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span className="text-xs font-black text-rose-900 dark:text-rose-400">{hearts}</span>
                    </div>
                  </div>

                  {/* Active Question container */}
                  {activeQuestion && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-800 p-5 md:p-6 shadow-xs space-y-5">
                      
                      <div className="space-y-2">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-650 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 px-2.5 py-1 rounded-md inline-block">
                          {bilingualMode ? "Responda à questão / Solve the quiz" : "Responda à questão"}
                        </span>
                        
                        <h3 className="text-xs md:text-sm font-black text-slate-805 dark:text-white leading-normal pt-1">
                          {activeQuestion.question}
                        </h3>

                        {bilingualMode && (
                          <div className="text-[10px] text-slate-500 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-xl font-medium mt-1">
                            ({activeQuestion.questionEn})
                          </div>
                        )}
                      </div>

                      {/* Options stack */}
                      <div className="space-y-2 pt-2">
                        {activeQuestion.options.map((opt, oIdx) => {
                          const isSelected = selectedOption === oIdx;
                          const isCorrectChoice = oIdx === activeQuestion.correctIndex;
                          
                          let btnClass = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer";
                          if (isSubmitted) {
                            if (isCorrectChoice) {
                              btnClass = "bg-green-500/10 border-green-500 dark:border-green-600 text-green-905 dark:text-green-300 font-bold";
                            } else if (isSelected) {
                              btnClass = "bg-red-500/10 border-red-500 dark:border-red-600 text-red-950 dark:text-red-350";
                            } else {
                              btnClass = "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-50 cursor-not-allowed";
                            }
                          } else if (isSelected) {
                            btnClass = "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/10";
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isSubmitted}
                              onClick={() => handleSelectOption(oIdx)}
                              className={`w-full text-left text-xs p-3.5 rounded-xl border transition-all flex justify-between items-center text-[11px] ${btnClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full border border-slate-250 dark:border-slate-750 flex items-center justify-center text-[9px] font-mono text-slate-400 font-bold">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span className="font-semibold leading-relaxed">{opt}</span>
                              </div>
                              {isSubmitted && isCorrectChoice && (
                                <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* submission button */}
                      {!isSubmitted ? (
                        <button
                          disabled={selectedOption === null}
                          onClick={handleSubmitAnswer}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-500 text-white transition-all py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                        >
                          {bilingualMode ? "Validar Resposta / Validate Answer" : "Validar Resposta"}
                        </button>
                      ) : (
                        /* feedback explanation alert */
                        <div className={`p-4 rounded-2xl border space-y-3 animate-fade-in ${
                          selectedOption === activeQuestion.correctIndex
                            ? 'bg-green-50/50 dark:bg-green-950/20 border-green-150 dark:border-green-900'
                            : 'bg-red-50/50 dark:bg-red-950/20 border-red-150 dark:border-red-900'
                        }`}>
                          <div className="flex items-center gap-2">
                            {selectedOption === activeQuestion.correctIndex ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="text-xs font-black text-green-900 dark:text-green-400">
                                  {bilingualMode ? "Resposta Correta! / Correct (+15 XP)" : "Resposta Correta! (+15 XP)"}
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-5 h-5 text-rose-600" />
                                <span className="text-xs font-black text-red-800 dark:text-red-400">
                                  {bilingualMode ? "Não foi desta! / Correction Required" : "Oops! Resposta Incorrecta (-1 Vida)"}
                                </span>
                              </>
                            )}
                          </div>
                          
                          <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-2 text-[11px] leading-relaxed">
                            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest font-mono">Dica de mestre:</span>
                            <p className="text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                              {activeQuestion.explanation}
                            </p>
                            {bilingualMode && (
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                                ({activeQuestion.explanationEn})
                              </p>
                            )}
                          </div>

                          <button
                            onClick={handleNextQuestion}
                            className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
                          >
                            {currentIdx < moduleLesson.exercises.length - 1 ? (
                              <>
                                {bilingualMode ? "Próxima Questão / Next Question" : "Próxima Questão"}
                                <ArrowRight className="w-4 h-4" />
                              </>
                            ) : (
                              bilingualMode ? "Finalizar Módulo / Complete Module" : "Ver Resultados Finais"
                            )}
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                  {/* Back tip link to study notes */}
                  <div className="text-center">
                    <button
                      onClick={() => setActiveTab('lecture')}
                      className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350 underline font-semibold cursor-pointer"
                    >
                      Deseja reler as notas da aula prática? Clique aqui
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer info bar */}
        <div className="bg-slate-50 dark:bg-slate-950 px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-center flex justify-between items-center text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <span>Estúdio de Aprendizagem European Portuguese (PT-PT)</span>
          <span>AprenderPortuguês Pro™</span>
        </div>

      </div>
    </div>
  );
}
