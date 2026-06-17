/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { sampleWritingChallenges } from '../prdData';
import { WritingChallenge } from '../types';
import { Sparkles, Edit3, Send, CheckCircle2, ChevronRight, Award, AlertCircle, HelpCircle, FileText, Loader2, Smile } from 'lucide-react';

interface WritingPracticeProps {
  onEarnXp: (amount: number) => void;
  bilingualMode?: boolean;
}

interface EvaluationResult {
  score: number;
  grade: string;
  corrections: Array<{
    incorrect: string;
    correct: string;
    explanation: string;
  }>;
  generalFeedback: string;
  politeRewrite: string;
}

export default function WritingPractice({ onEarnXp, bilingualMode = true }: WritingPracticeProps) {
  const [challenges] = useState<WritingChallenge[]>(sampleWritingChallenges);
  const [activeChallengeId, setActiveChallengeId] = useState<string>(sampleWritingChallenges[0].id);
  const [userText, setUserText] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [showReference, setShowReference] = useState<boolean>(false);
  const [simulatedMode, setSimulatedMode] = useState<boolean>(false);

  const [loadingStepText, setLoadingStepText] = useState<string>('');

  const currentChallenge = challenges.find(c => c.id === activeChallengeId) || challenges[0];

  const handleSelectChallenge = (id: string) => {
    setActiveChallengeId(id);
    setUserText('');
    setEvalResult(null);
    setErrorNotice(null);
    setShowReference(false);
    setSimulatedMode(false);
  };

  // Set up random loading screen prompts
  const triggerLoadingSteps = () => {
    const steps = [
      'Scanning text blocks under the 1990 Orthographic Agreement...',
      'Isolating Brazilian-origin gerund and pronoun proclisis offsets...',
      'Assessing structural politeness register for PT-PT official standards...',
      'Formulating pedagogical explanations for identified syntax outliers...'
    ];
    let stepIdx = 0;
    setLoadingStepText(steps[0]);
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStepText(steps[stepIdx]);
      } else {
        clearInterval(interval);
      }
    }, 1800);
    return interval;
  };

  const handleEvaluateText = async () => {
    if (!userText.trim()) return;
    setLoading(true);
    setErrorNotice(null);
    setEvalResult(null);

    const stepInterval = triggerLoadingSteps();

    try {
      const response = await fetch('/api/check-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeTitle: currentChallenge.title,
          userText: userText,
          prompt: currentChallenge.prompt
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server-side API evaluation issue.');
      }

      const result = await response.json();
      setEvalResult(result);
      
      // Award Duolingo engagement XP!
      if (result.score >= 80) {
        onEarnXp(50); // Hard task reward
      } else {
        onEarnXp(20); // Basic feedback submission reward
      }

    } catch (e: any) {
      console.warn('Real Gemini API failed, launching fallback simulation mode:', e);
      setSimulatedMode(true);
      triggerFallbackSimulation();
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  // Mock-up fallback simulation in case API is unavailable or limits reached
  const triggerFallbackSimulation = () => {
    let mockResult: EvaluationResult;
    
    const containsGerund = userText.toLowerCase().includes('ando') || userText.toLowerCase().includes('endo') || userText.toLowerCase().includes('indo');
    const containsVoce = userText.toLowerCase().includes('você') || userText.toLowerCase().includes('voce');
    const containsMeDa = userText.toLowerCase().includes('me dá') || userText.toLowerCase().includes('me da') || userText.toLowerCase().includes('te amo');

    const score = containsGerund || containsVoce || containsMeDa ? 78 : 95;
    const grade = score > 90 ? 'B1' : 'A2';

    const mockCorrections = [];

    if (containsGerund) {
      mockCorrections.push({
        incorrect: 'ando/endo gerund triggers',
        correct: 'estar a + infinitive (e.g. estou a escrever)',
        explanation: 'In Portugal, continuous actions are formulated using "estar a + infinitive". Brazilian gerund triggers sound unnatural locally.'
      });
    }

    if (containsVoce) {
      mockCorrections.push({
        incorrect: 'Direct "Você" address',
        correct: '3rd person singular verb form or o senhor/a senhora',
        explanation: '"Você" can sound overly blunt or demanding in Portugal. Omit the pronoun and conjugate the verb in the third person directly, or use Sr./Sra.'
      });
    }

    if (containsMeDa) {
      mockCorrections.push({
        incorrect: 'me dá / proclisis',
        correct: 'dê-me / enclisis placement',
        explanation: 'European Portuguese defaults to placing auxiliary pronouns AFTER the verb (enclisis) joined with a hyphen, unless negative triggers precede it.'
      });
    }

    if (mockCorrections.length === 0) {
      mockResult = {
        score: 95,
        grade: 'B1',
        corrections: [],
        generalFeedback: 'Superb draft! You avoided Brazilian style gerund traps, structural pronouns are placed perfectly. The text represents classical European Portuguese orthography.',
        politeRewrite: userText
      };
    } else {
      mockResult = {
        score: score,
        grade: grade,
        corrections: mockCorrections,
        generalFeedback: 'Solid attempt at this scenario! You used appropriate nouns. However, several Brazilian syntactic conventions slipped into your draft. We corrected these to standard European habits.',
        politeRewrite: currentChallenge.referenceExample
      };
    }

    setEvalResult(mockResult);
    onEarnXp(20);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="writing-studio-root">
      
      {/* Sidebar: Writing Challenges Menu */}
      <div className="lg:col-span-4 space-y-4" id="writing-sidebar">
        
        {/* AI Writing Guide Introduction */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex gap-3 items-start animate-fade-in" id="writing-pm-ratio">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0 shadow-xs text-sm" id="writing-pm-avatar">
            ✏️
          </div>
          <div>
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider" id="writing-pm-brand">
              {bilingualMode ? "Oficina de Escrita Prática / AI Writing Studio" : "Oficina de Escrita Prática (Tutor IA)"}
            </h4>
            <p className="text-xs text-indigo-950 mt-1 leading-relaxed font-semibold" id="writing-pm-rationale">
              {bilingualMode ? (
                <>
                  Escreva pequenos textos práticos para o quotidiano em Portugal (como mensagens para senhorio ou atestados). O nosso motor de inteligência artificial analisa a sua sintaxe!
                  <span className="block mt-2 text-slate-850 text-[11.5px] border-t border-indigo-300 pt-2 font-bold not-italic">
                    Draft real-world European Portuguese correspondence (e.g., messages to landlords). Our AI checks spelling, pronouns, and polite formal syntax.
                  </span>
                </>
              ) : (
                "Escreva pequenos textos práticos para o quotidiano em Portugal (como mensagens para senhorio ou atestados). O nosso motor de inteligência artificial analisa a sua sintaxe de acordo com o Acordo Ortográfico de 1990!"
              )}
            </p>
          </div>
        </div>

        {/* Challenges list */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-2xs" id="challenges-card">
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2" id="challenges-header">
            {bilingualMode ? "Tarefas de Escrita / Active Assignments" : "Active Writing Assignments"}
          </h3>
          {challenges.map((c) => (
            <button
              key={c.id}
              id={`challenge-btn-${c.id}`}
              onClick={() => handleSelectChallenge(c.id)}
              className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                activeChallengeId === c.id 
                  ? 'bg-indigo-50/50 border-indigo-300 text-indigo-900 font-medium' 
                  : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-indigo-600 tracking-wider block" id={`ch-diff-${c.id}`}>
                {c.difficulty} Assignment
              </span>
              <p className="text-xs font-semibold mt-1" id={`ch-title-${c.id}`}>{c.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Evaluation Panel */}
      <div className="lg:col-span-8 space-y-6" id="writing-main-content">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-xs space-y-6 animate-fade-in" id="writing-assignment-card">
          
          {/* Header */}
          <div className="border-b border-slate-50 pb-4" id="writing-header">
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-indigo-100" id="ch-diff-badge">
              {currentChallenge.difficulty} Task
            </span>
            <h2 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight mt-1.5" id="ch-title-heading">
              {currentChallenge.title}
            </h2>
            <div className="text-xs text-slate-900 mt-2.5 leading-relaxed bg-slate-100 p-3.5 rounded-xl border-2 border-slate-200 font-extrabold" id="ch-scenario">
              <span className="font-black text-slate-950 block text-[11px] mb-1 uppercase tracking-wider">
                {bilingualMode ? "A Situação Narrativa / Scenario Narrative:" : "Scenario Narrative:"}
              </span>
              {currentChallenge.scenario}
            </div>
          </div>

          {/* User Writing Prompt */}
          <div className="space-y-2 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 shadow-3xs" id="writing-prompt-text-block">
            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-wider animate-pulse" id="prompt-label">
              {bilingualMode ? "Diretiva da Tarefa / Assignment Directive" : "Assignment Directive"}
            </h4>
            <p className="text-xs text-indigo-950 font-black leading-relaxed" id="ch-prompt-directive">
              {currentChallenge.prompt}
            </p>
          </div>

          {/* Word assist box */}
          <div className="space-y-2 bg-slate-100 p-3.5 rounded-xl border border-slate-200 shadow-3xs" id="vocabulary-aid-box">
            <span className="text-[10.5px] uppercase font-black text-indigo-900 tracking-wider block" id="vocab-aid-label">
              {bilingualMode ? "Recomendações de Vocabulário Útil / Recommended Vocabulary" : "In-Context Vocabulary Recommendations"}
            </span>
            <div className="flex flex-wrap gap-1.5" id="vocab-recommendation-chips">
              {currentChallenge.helpfulWords.map((word, idx) => (
                <span
                  key={idx}
                  className="bg-white text-slate-900 text-[11.5px] font-black px-2.5 py-1 rounded-lg border-2 border-slate-250 border-slate-200 flex items-center gap-1 cursor-default hover:bg-indigo-100 hover:text-indigo-950 transition-colors shadow-3xs"
                  id={`vocab-chip-${idx}`}
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" id={`vocab-chip-icon-${idx}`} />
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Draft Input */}
          <div className="space-y-2.5 pt-2" id="draft-submission-block">
            <div className="flex justify-between items-center" id="draft-labels-row">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5" id="draft-label">
                <Edit3 className="w-4 h-4 text-indigo-700 font-black" id="edit-draft-icon" />
                {bilingualMode ? "Submeter Rascunho em Português / Your Draft" : "Submit Your Portuguese Draft"}
              </label>
              <button
                id="toggle-ref-btn"
                onClick={() => setShowReference(!showReference)}
                className="text-xs text-indigo-800 hover:text-indigo-950 font-black underline transition-colors cursor-pointer bg-slate-100 px-3 py-1 rounded-lg border border-slate-250 shadow-3xs"
              >
                {showReference 
                  ? bilingualMode ? "Ocultar Referência / Hide Outline" : "Close Reference"
                  : bilingualMode ? "Revelar Modelo Nativo / Load Model Outline" : "Load Model Outline"}
              </button>
            </div>

            {showReference && (
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-1" id="reference-card">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block" id="ref-label-header">
                  {bilingualMode ? "Modelo Escrito Recomendado / Recommended Native Reference" : "Model Native Draft"}
                </span>
                <p className="font-mono text-xs text-indigo-900 leading-relaxed whitespace-pre-wrap" id="ref-text">
                  {currentChallenge.referenceExample}
                </p>
              </div>
            )}

            <textarea
              id="draft-textarea"
              rows={5}
              placeholder="Exmo. Senhor Silva, escrevo para..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="w-full text-xs p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white shadow-xs leading-relaxed placeholder:text-slate-400"
            />

            <div className="flex justify-end pt-1" id="draft-actions-dock">
              <button
                id="evaluate-submission-btn"
                onClick={handleEvaluateText}
                disabled={loading || !userText.trim()}
                className={`bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 text-white disabled:text-slate-400 text-xs py-2.5 px-6 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors cursor-pointer`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" id="spin-loader" />
                    {bilingualMode ? "Gabaritando Sintaxe... / Analyzing..." : "Analyzing Syntax..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" id="sparkles-action" />
                    {bilingualMode ? "Avaliar Texto com IA / Submit for AI Evaluation" : "Submit for AI Evaluation"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading Screen Status update */}
          {loading && (
            <div className="bg-slate-100 border-2 border-slate-350 p-5 rounded-2xl flex flex-col items-center justify-center space-y-3" id="loading-screen-dialog">
              <Loader2 className="w-7 h-7 text-indigo-800 animate-spin" id="loading-spinner" />
              <div className="text-center" id="loading-messages">
                <p className="text-xs font-black text-slate-950" id="loading-main-label">AI Tutor Analysis Active</p>
                <p className="text-[11px] text-slate-900 mt-1 font-mono font-bold animate-pulse" id="loading-status-logs">
                  {loadingStepText}
                </p>
              </div>
            </div>
          )}

          {/* AI EVALUATION OUTPUT */}
          {evalResult && (
            <div className="border-t-2 border-slate-50 pt-6 space-y-6 animate-fade-in" id="ai-evaluation-results">
              
              {simulatedMode && (
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center gap-2" id="offline-mode-notice">
                  <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" id="alert-icon-warning" />
                  <span className="text-[11px] text-amber-800 font-semibold" id="offline-label">
                    Server Key Pending Verification. Active local fallback simulator triggered.
                  </span>
                </div>
              )}

              {/* Score & CEFR Grade block */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="score-block-grid">
                
                <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-5 text-center flex flex-col justify-center items-center space-y-1" id="overall-score-card">
                  <span className="text-[10px] uppercase font-black text-slate-750 tracking-wider" id="overall-score-title">
                    {bilingualMode ? "Pontuação de Precisão / Accuracy Score" : "Accuracy Score"}
                  </span>
                  <p className={`text-4xl font-extrabold tracking-tight ${evalResult.score >= 80 ? 'text-green-700' : 'text-amber-600'}`} id="overall-score-val">
                    {evalResult.score}/100
                  </p>
                  <span className="text-[11px] text-slate-800 font-extrabold" id="score-xp-reward">
                    {evalResult.score >= 80 ? '+50 XP Multiplier' : '+20 XP Participation'}
                  </span>
                </div>

                <div className="bg-slate-100 border-2 border-slate-200 rounded-2xl p-5 text-center flex flex-col justify-center items-center space-y-1" id="cefr-grade-card">
                  <span className="text-[10px] uppercase font-black text-slate-750 tracking-wider" id="overall-grade-title">
                    {bilingualMode ? "Nível Demonstrado / Demonstrated CEFR" : "Demonstrated CEFR"}
                  </span>
                  <span className="text-3xl font-black text-indigo-900" id="overall-grade-val">
                    {evalResult.grade}
                  </span>
                  <span className="text-[11px] text-slate-800 font-extrabold" id="grade-label">
                    Pre-Intermediate
                  </span>
                </div>

                <div className="bg-indigo-100/50 border-2 border-indigo-200 rounded-2xl p-5 flex flex-col justify-center space-y-1" id="ai-verdict-card">
                  <span className="text-[10px] uppercase font-black text-indigo-950 tracking-wider" id="tutor-label-header">
                    {bilingualMode ? "Parecer do Tutor IA / AI Evaluation" : "AI Tutor Evaluation"}
                  </span>
                  <p className="text-xs text-slate-900 font-bold leading-relaxed line-clamp-3" id="feedback-desc">
                    "{evalResult.generalFeedback}"
                  </p>
                </div>
              </div>

              {/* Specific grammar corrections */}
              {evalResult.corrections.length > 0 && (
                <div className="space-y-3.5" id="grammar-corrections-section">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5" id="corrections-header">
                    <AlertCircle className="w-4 h-4 text-amber-600" id="alert-icon-info" />
                    {bilingualMode ? "Relatório de Correções Linguísticas / Corrections & Rules" : "Linguistic Corrections & Orthography Rules"}
                  </h4>

                  <div className="space-y-3" id="corrections-items-scroller">
                    {evalResult.corrections.map((corr, idx) => (
                      <div key={idx} className="bg-slate-105 bg-slate-100 border-2 border-slate-200 p-4.5 rounded-2xl space-y-2.5" id={`correction-item-${idx}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id={`correction-comparison-grid-${idx}`}>
                           <div className="space-y-1" id={`incorrect-block-${idx}`}>
                            <span className="text-[9px] uppercase font-bold text-red-650" id={`incorrect-lbl-${idx}`}>
                              {bilingualMode ? "O Seu Rascunho / Your Submission" : "Your Submission"}
                            </span>
                            <p className="text-xs font-mono font-bold text-red-950 bg-red-100/40 rounded px-2 py-1 line-through border border-red-200" id={`incorrect-text-${idx}`}>
                              {corr.incorrect}
                            </p>
                          </div>
                          <div className="space-y-1" id={`correct-block-${idx}`}>
                            <span className="text-[9px] uppercase font-bold text-green-800" id={`correct-lbl-${idx}`}>
                              {bilingualMode ? "Hábito de Portugal (Padrão) / European Portuguese Standard" : "Portugal Habit (Standard)"}
                            </span>
                            <p className="text-xs font-mono font-bold text-green-950 bg-green-100/40 rounded px-2 py-1 border border-green-200" id={`correct-text-${idx}`}>
                              {corr.correct}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-900 font-extrabold leading-relaxed pt-1.5 border-t border-slate-200" id={`explanation-text-${idx}`}>
                          <span className="font-black text-slate-950 bg-slate-200 px-1 py-0.5 rounded" id={`exp-pfx-${idx}`}>
                            {bilingualMode ? "Explicação da Regra / Rule Description:" : "Rule explanation:"}
                          </span> {corr.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* POLITE REWRITE */}
              <div className="bg-indigo-955 bg-slate-900 text-slate-100 p-5 rounded-2xl border-2 border-slate-800 space-y-3" id="polite-rewrite-card">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5" id="rewrite-header">
                  <CheckCircle2 className="w-5 h-5 text-emerald-405 text-emerald-400" id="emerald-check-icon" />
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-amber-400" id="rewrite-title">
                    {bilingualMode ? "Proposta de Reescrita Polida / Polite Native Rewrite" : "Perfect European Portuguese Form (Polite Rewrite)"}
                  </h4>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800" id="rewrite-box">
                  <p className="font-mono text-xs text-slate-100 leading-relaxed whitespace-pre-wrap pt-pt-font font-bold" id="rewrite-text">
                    {evalResult.politeRewrite}
                  </p>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal font-semibold font-sans" id="rewrite-disclaimer">
                  {bilingualMode 
                    ? "Esta reescrita respeita estritamente o protocolo social e a etiqueta corporativa tradicional portuguesa corrente em Lisboa ou Porto."
                    : "This rewrite conforms to standard administrative etiquette in Portugal. It incorporates the correct 1990 Orthographic structures and preserves a highly respectful spacing tone."}
                </p>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
