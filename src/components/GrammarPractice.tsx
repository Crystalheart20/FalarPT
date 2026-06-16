/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { sampleGrammarRules } from '../prdData';
import { GrammarRule } from '../types';
import { ShieldAlert, CheckCircle, Award, HelpCircle, BookOpen, AlertCircle } from 'lucide-react';

interface GrammarPracticeProps {
  onEarnXp: (amount: number) => void;
}

export default function GrammarPractice({ onEarnXp }: GrammarPracticeProps) {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(sampleGrammarRules[0].id);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);

  // Keep track of solved rules to prevent double XP exploit
  const [solvedRuleIds, setSolvedRuleIds] = useState<Set<string>>(new Set());

  const currentRule = sampleGrammarRules.find(r => r.id === selectedRuleId) || sampleGrammarRules[0];

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedOptionIndex === null || quizSubmitted) return;

    const isCorrect = selectedOptionIndex === currentRule.quiz.correctIndex;
    setAnsweredCorrectly(isCorrect);
    setQuizSubmitted(true);

    if (isCorrect && !solvedRuleIds.has(currentRule.id)) {
      const nextSolved = new Set(solvedRuleIds);
      nextSolved.add(currentRule.id);
      setSolvedRuleIds(nextSolved);
      onEarnXp(25); // Award Duolingo-style XP!
    }
  };

  const handleNextLesson = () => {
    const currentIndex = sampleGrammarRules.findIndex(r => r.id === selectedRuleId);
    const nextIndex = (currentIndex + 1) % sampleGrammarRules.length;
    
    // Clear quiz states
    setSelectedOptionIndex(null);
    setQuizSubmitted(false);
    setAnsweredCorrectly(false);
    setSelectedRuleId(sampleGrammarRules[nextIndex].id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="grammar-hub-root">
      
      {/* Sidebar: Lesson Selector */}
      <div className="lg:col-span-4 space-y-4" id="grammar-sidebar">
        {/* PM Rationale */}
        <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 flex gap-3 items-start" id="grammar-pm-rationale-panel">
          <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs" id="grammar-pm-avatar">
            C
          </div>
          <div>
            <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider" id="grammar-pm-brand">
              Babbel-Style Structural Coaching
            </h4>
            <p className="text-xs text-sky-700/90 mt-1 leading-relaxed" id="grammar-explanation-rationale">
              "Expats cannot depend on intuition alone. We present European Portuguese grammatical frameworks in clean, academic, side-by-side modules with Brazilian alternatives." <span className="font-semibold">— Clara Schmidt, PM</span>
            </p>
          </div>
        </div>

        {/* Lesson List */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2.5" id="grammar-lessons-list">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" id="lessons-list-title">
            Grammar Units
          </h3>
          {sampleGrammarRules.map((rule) => (
            <button
              key={rule.id}
              id={`grammar-rule-btn-${rule.id}`}
              onClick={() => {
                setSelectedRuleId(rule.id);
                setSelectedOptionIndex(null);
                setQuizSubmitted(false);
                setAnsweredCorrectly(false);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                selectedRuleId === rule.id 
                  ? 'bg-sky-50/50 border-sky-300 text-sky-900 font-medium' 
                  : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="space-y-0.5" id={`lesson-title-meta-${rule.id}`}>
                <span className="text-[10px] uppercase font-bold text-sky-600 tracking-wider" id={`lesson-diff-${rule.id}`}>
                  {rule.difficulty} Lesson
                </span>
                <p className="text-xs font-semibold" id={`lesson-title-${rule.id}`}>{rule.title.split(':')[0]}</p>
              </div>
              {solvedRuleIds.has(rule.id) && (
                <CheckCircle className="w-4 h-4 text-green-500 fill-green-50 shrink-0" id={`lesson-solved-badge-${rule.id}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lesson Content */}
      <div className="lg:col-span-8 space-y-6" id="grammar-main-content">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-xs space-y-6" id="rule-lesson-card">
          <div className="flex items-start justify-between border-b border-slate-50 pb-4" id="lesson-header">
            <div>
              <span className="px-2.5 py-0.5 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-sky-100" id="rule-diff-badge">
                {currentRule.difficulty}
              </span>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight mt-1.5" id="rule-title-heading">
                {currentRule.title}
              </h2>
            </div>
            {solvedRuleIds.has(currentRule.id) && (
              <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-200 font-bold" id="badge-mastered-xp">
                <CheckCircle className="w-4 h-4" id="check-icon-master" />
                Solved (+25 XP)
              </span>
            )}
          </div>

          {/* Theoretical Concept */}
          <div className="space-y-3" id="lesson-concept-block">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5" id="concept-label">
              <BookOpen className="w-4 h-4 text-sky-500" id="reading-icon" />
              Pedagogical Grammar Concept
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed" id="concept-description">
              {currentRule.description}
            </p>
          </div>

          {/* European vs Brazilian Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="dialect-comparison-grid">
            <div className="bg-sky-50/30 border border-sky-100 rounded-2xl p-4.5 space-y-1.5" id="pt-pt-concept-card">
              <span className="text-[10px] uppercase font-bold text-sky-700 block" id="concept-label-ptpt">Portugal Standard (PT-PT)</span>
              <p className="font-mono text-xs font-semibold text-sky-900" id="concept-val-ptpt">
                {currentRule.europeanConcept}
              </p>
            </div>
            <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-4.5 space-y-1.5" id="pt-br-concept-card">
              <span className="text-[10px] uppercase font-bold text-rose-700 block" id="concept-label-ptbr">Brazilian Shift (PT-BR)</span>
              <p className="font-mono text-xs font-semibold text-rose-950/80" id="concept-val-ptbr">
                {currentRule.brazilianContrast}
              </p>
            </div>
          </div>

          {/* Model Examples */}
          <div className="space-y-3" id="lesson-examples-section">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400" id="examples-label">
              Standard PT-PT Examples
            </h3>
            <div className="space-y-2.5" id="examples-cards">
              {currentRule.examples.map((ex, index) => (
                <div key={index} className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl" id={`example-card-${index}`}>
                  <p className="text-xs font-bold text-slate-800" id={`example-pt-${index}`}>
                    "{ex.pt}"
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5" id={`example-en-${index}`}>
                    {ex.en}
                  </p>
                  <span className="inline-block mt-2 text-[10px] text-indigo-600 bg-indigo-50/60 font-medium px-2 py-0.5 rounded-md" id={`example-context-${index}`}>
                    Context: {ex.context}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Lesson Quiz */}
          <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-100 space-y-4" id="lesson-quiz-panel">
            <div className="flex items-center gap-1.5" id="quiz-header-layout">
              <HelpCircle className="w-4.5 h-4.5 text-indigo-500" id="quiz-badge-icon" />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400" id="quiz-header-label">
                Interactive Concept Check
              </h4>
            </div>

            <p className="text-xs font-bold text-slate-700" id="quiz-question-text">
              {currentRule.quiz.question}
            </p>

            <div className="space-y-2" id="quiz-options-container">
              {currentRule.quiz.options.map((opt, index) => (
                <button
                  key={index}
                  id={`quiz-option-btn-${index}`}
                  onClick={() => handleSelectOption(index)}
                  disabled={quizSubmitted}
                  className={`w-full text-left text-xs p-3.5 rounded-xl border font-semibold transition-all flex items-center justify-between ${
                    quizSubmitted
                      ? index === currentRule.quiz.correctIndex
                        ? 'border-green-300 bg-green-50 text-green-800'
                        : selectedOptionIndex === index
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : 'border-slate-100 bg-white text-slate-400'
                      : selectedOptionIndex === index
                        ? 'border-indigo-400 bg-indigo-50/30 text-indigo-900 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 bg-white hover:bg-slate-100/30 text-slate-700 cursor-pointer'
                  }`}
                >
                  <span id={`quiz-option-text-${index}`}>{opt}</span>
                  {quizSubmitted && index === currentRule.quiz.correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-green-700" id="quiz-badge-correct">Correct Choice</span>
                  )}
                  {quizSubmitted && selectedOptionIndex === index && index !== currentRule.quiz.correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-red-700" id="quiz-badge-incorrect">Your Draft</span>
                  )}
                </button>
              ))}
            </div>

            {/* Submit Actions / Answers explanations */}
            {selectedOptionIndex !== null && !quizSubmitted && (
              <button
                id="submit-quiz-btn"
                onClick={handleSubmitQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer"
              >
                Validate Answer
              </button>
            )}

            {quizSubmitted && (
              <div className={`p-4 rounded-2xl border space-y-2 ${
                answeredCorrectly 
                  ? 'bg-green-50/30 border-green-100 text-green-900' 
                  : 'bg-red-50/30 border-red-100 text-red-900'
              }`} id="quiz-feedback-box">
                <div className="flex items-center gap-1.5" id="feedback-grade-block">
                  {answeredCorrectly ? (
                    <CheckCircle className="w-4.5 h-4.5 text-green-600" id="feedback-icon-success" />
                  ) : (
                    <AlertCircle className="w-4.5 h-4.5 text-red-600" id="feedback-icon-fail" />
                  )}
                  <h5 className="font-bold text-xs" id="feedback-grade-title">
                    {answeredCorrectly ? 'Excellent Job! (+25 XP Earned)' : 'Correction Requested'}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" id="feedback-explanation">
                  <span className="font-semibold text-slate-800" id="explanation-prefix">Tutor's Note:</span> {currentRule.quiz.explanation}
                </p>
                <div className="pt-2" id="feedback-actions">
                  <button
                    id="next-lesson-btn"
                    onClick={handleNextLesson}
                    className="bg-white border border-slate-200 hover:border-slate-300 transition-colors text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Load Next Unit Lesson
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
