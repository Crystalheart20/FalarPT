/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { sampleStories } from '../prdData';
import { ReadingStory } from '../types';
import { BookOpen, HelpCircle, CheckCircle, Info, Sparkles, MessageCircle } from 'lucide-react';

interface ReadingPracticeProps {
  onEarnXp: (amount: number) => void;
}

export default function ReadingPractice({ onEarnXp }: ReadingPracticeProps) {
  const [activeStoryId, setActiveStoryId] = useState<string>(sampleStories[0].id);
  const [hoveredVocab, setHoveredVocab] = useState<{ word: string; definition: string } | null>(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);

  const [solvedStoryIds, setSolvedStoryIds] = useState<Set<string>>(new Set());

  const currentStory = sampleStories.find(s => s.id === activeStoryId) || sampleStories[0];

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizIndex(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizIndex === null || quizSubmitted) return;

    const isCorrect = selectedQuizIndex === currentStory.questions[0].correctIndex;
    setAnsweredCorrectly(isCorrect);
    setQuizSubmitted(true);

    if (isCorrect && !solvedStoryIds.has(currentStory.id)) {
      const nextSolved = new Set(solvedStoryIds);
      nextSolved.add(currentStory.id);
      setSolvedStoryIds(nextSolved);
      onEarnXp(30); // Award Duolingo-style XP!
    }
  };

  // Function to wrap hoverable words
  const renderInteractiveText = (text: string, vocabNotes: Record<string, string>) => {
    // Basic word tokenizer (splitting by whitespace and punctuation, keeping punctuation separated)
    const words = text.split(/(\s+)/);
    
    return words.map((chunk, idx) => {
      // Strip punctuation to match key
      const cleanWord = chunk.toLowerCase().replace(/[.,!?;:()"]/g, '');
      
      // Check if this keyword is present in our vocabulary notes
      const matchedKey = Object.keys(vocabNotes).find(k => k.toLowerCase() === cleanWord);

      if (matchedKey) {
        return (
          <span
            key={idx}
            className="underline decoration-indigo-400 decoration-2 underline-offset-4 font-semibold text-indigo-900 cursor-help bg-indigo-50/40 hover:bg-indigo-100/60 rounded px-1 transition-colors relative"
            onMouseEnter={() => setHoveredVocab({ word: matchedKey, definition: vocabNotes[matchedKey] })}
            onMouseLeave={() => setHoveredVocab(null)}
            id={`interactive-word-${idx}`}
          >
            {chunk}
          </span>
        );
      }

      return <span key={idx} id={`simple-word-${idx}`}>{chunk}</span>;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="reading-library-root">
      
      {/* Left Column: Story List & Tooltip Helper */}
      <div className="lg:col-span-4 space-y-4" id="reading-sidebar">
        
        {/* PM Rationale */}
        <div className="bg-violet-50/50 border border-violet-100 rounded-2xl p-4 flex gap-3 items-start" id="reading-intro-panel">
          <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm" id="reading-pm-avatar">
            S
          </div>
          <div>
            <h4 className="text-xs font-bold text-violet-800 uppercase tracking-wider" id="reading-pm-brand">
              Busuu Interactive Reading
            </h4>
            <p className="text-xs text-violet-700/90 mt-1 leading-relaxed" id="reading-pm-rationale">
              "We present long-form stories containing local Portuguese slang and cultural insights. Hover on underlined words to trigger instantaneous vocabulary lookups." <span className="font-semibold">— Sofia Morel, VP</span>
            </p>
          </div>
        </div>

        {/* Story Selector List */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2.5" id="stories-menu-card">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" id="stories-header">
            Reading Library Catalog
          </h3>
          {sampleStories.map((story) => (
            <button
              key={story.id}
              id={`story-btn-${story.id}`}
              onClick={() => {
                setActiveStoryId(story.id);
                setSelectedQuizIndex(null);
                setQuizSubmitted(false);
                setAnsweredCorrectly(false);
                setHoveredVocab(null);
              }}
              className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                activeStoryId === story.id 
                  ? 'bg-violet-50/50 border-violet-300 text-violet-900 font-medium' 
                  : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-violet-600 tracking-wider block" id={`story-diff-${story.id}`}>
                {story.difficulty} Story
              </span>
              <p className="text-xs font-semibold mt-1" id={`story-title-${story.id}`}>{story.title}</p>
            </button>
          ))}
        </div>

        {/* Instant Dictionary Tooltip Widget */}
        <div className="bg-slate-950 text-slate-100 rounded-2xl p-5 border border-slate-850 shadow-md space-y-3" id="dictionary-tooltip-widget">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5" id="dict-header">
            <Info className="w-4 h-4 text-amber-400" id="dict-info-icon" />
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400" id="dict-title">
              Instant Reader Glossary
            </h4>
          </div>
          {hoveredVocab ? (
            <div className="space-y-1" id="dict-content-loaded">
              <span className="font-mono text-xs font-bold text-amber-300" id="dict-pt-word">
                {hoveredVocab.word}
              </span>
              <p className="text-xs text-slate-300 leading-normal" id="dict-definition">
                {hoveredVocab.definition}
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-500 leading-normal italic" id="dict-empty-notes">
              Hover over colored words inside the story text to see instant English explanations, gender markers, and conjugation details here.
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Active Story details */}
      <div className="lg:col-span-8 space-y-6" id="reading-main-content">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-xs space-y-6" id="story-display-card">
          
          {/* Header */}
          <div className="border-b border-slate-50 pb-4 flex justify-between items-start" id="story-header">
            <div>
              <span className="bg-violet-50 text-violet-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-violet-100" id="story-diff-badge">
                {currentStory.difficulty}
              </span>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight mt-1.5" id="story-title-heading">
                {currentStory.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1" id="story-summary-note">
                {currentStory.summary}
              </p>
            </div>
            {solvedStoryIds.has(currentStory.id) && (
              <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-200 font-bold shrink-0" id="story-xp-badge">
                <CheckCircle className="w-4 h-4" id="story-check-icon" />
                Solved (+30 XP)
              </span>
            )}
          </div>

          {/* Interactive Paragraph Blocks */}
          <div className="space-y-6" id="story-text-container">
            {currentStory.paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="space-y-2 bg-slate-50/30 p-4.5 rounded-2xl border border-slate-100" id={`para-card-${pIdx}`}>
                <div className="text-slate-800 text-xs leading-relaxed space-x-1" id={`para-pt-${pIdx}`}>
                  {renderInteractiveText(para.textPt, para.vocabNotes)}
                </div>
                
                {/* Secondary English help */}
                <details className="group border-t border-slate-100 pt-3" id={`para-details-${pIdx}`}>
                  <summary className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-wider cursor-pointer list-none flex items-center gap-1" id={`para-summary-${pIdx}`}>
                    <Sparkles className="w-3.5 h-3.5" id="sparkles-icon" />
                    Reveal Paragraph Translation
                  </summary>
                  <p className="text-[11px] text-slate-500 italic mt-2 leading-relaxed" id={`para-en-${pIdx}`}>
                    {para.textEn}
                  </p>
                </details>
              </div>
            ))}
          </div>

          {/* Story Comprehension Quiz */}
          <div className="bg-slate-50/85 p-5 rounded-3xl border border-slate-100 space-y-4" id="story-comprehension-quiz">
            <div className="flex items-center gap-1.5" id="story-quiz-header">
              <HelpCircle className="w-4.5 h-4.5 text-indigo-505" id="story-quiz-icon" />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400" id="story-quiz-label">
                Story Comprehension check
              </h4>
            </div>

            <p className="text-xs font-bold text-slate-700" id="story-question text">
              {currentStory.questions[0].question}
            </p>

            <div className="space-y-2" id="story-options">
              {currentStory.questions[0].options.map((opt, index) => (
                <button
                  key={index}
                  id={`story-option-btn-${index}`}
                  onClick={() => handleSelectOption(index)}
                  disabled={quizSubmitted}
                  className={`w-full text-left text-xs p-3.5 rounded-xl border font-semibold transition-all flex items-center justify-between ${
                    quizSubmitted
                      ? index === currentStory.questions[0].correctIndex
                        ? 'border-green-300 bg-green-50 text-green-800'
                        : selectedQuizIndex === index
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : 'border-slate-100 bg-white text-slate-400'
                      : selectedQuizIndex === index
                        ? 'border-indigo-400 bg-indigo-50/30 text-indigo-900 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 bg-white hover:bg-slate-100/30 text-slate-700 cursor-pointer'
                  }`}
                >
                  <span id={`story-option-text-${index}`}>{opt}</span>
                  {quizSubmitted && index === currentStory.questions[0].correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-green-700" id="quiz-correct-text">Resolved</span>
                  )}
                  {quizSubmitted && selectedQuizIndex === index && index !== currentStory.questions[0].correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-red-700" id="quiz-incorrect-text">Mistake</span>
                  )}
                </button>
              ))}
            </div>

            {selectedQuizIndex !== null && !quizSubmitted && (
              <button
                id="submit-story-quiz-btn"
                onClick={handleSubmitQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Submit Comprehension Quiz
              </button>
            )}

            {quizSubmitted && (
              <div className={`p-4 rounded-2xl border space-y-2 ${
                answeredCorrectly 
                  ? 'bg-green-50/30 border-green-100 text-green-900' 
                  : 'bg-red-50/30 border-red-100 text-red-900'
              }`} id="story-feedback-box">
                <div className="flex items-center gap-1.5" id="story-feedback-header">
                  {answeredCorrectly ? (
                    <CheckCircle className="w-4.5 h-4.5 text-green-600" id="story-success" />
                  ) : (
                    <MessageCircle className="w-4.5 h-4.5 text-red-650" id="story-fail" />
                  )}
                  <h5 className="font-bold text-xs" id="story-feedback-title">
                    {answeredCorrectly ? 'Excellent Comprehension! (+30 XP)' : 'Comprehension Failed'}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" id="story-explanation">
                  <span className="font-semibold text-slate-800" id="story-exp-pfx">Explanation:</span> {currentStory.questions[0].explanation}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
