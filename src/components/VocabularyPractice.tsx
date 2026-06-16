/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { sampleVocabularyList } from '../prdData';
import { WordCard } from '../types';
import { Volume2, RefreshCw, Eye, ArrowLeft, ArrowRight, Star, HelpCircle, Check, BookOpen } from 'lucide-react';

interface VocabularyPracticeProps {
  onEarnXp: (amount: number) => void;
}

export default function VocabularyPractice({ onEarnXp }: VocabularyPracticeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [learnedIds, setLearnedIds] = useState<Set<string>>(new Set());

  // Speech helper (forcing European Portuguese Accent)
  const speakPt = (text: string, e: MouseEvent) => {
    e.stopPropagation(); // Don't trigger flashcard flip on sound click
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support Speech Synthesis API.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT'; // Rigorously enforce European Portuguese parameter
    
    // Attempt local identification of pt-PT high fidelity voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === 'pt-PT' || v.lang === 'pt_PT' || v.lang.startsWith('pt'));
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Filter vocabulary
  const filteredList = selectedCategory === 'All' 
    ? sampleVocabularyList 
    : sampleVocabularyList.filter(item => item.category === selectedCategory);

  const currentWord: WordCard = filteredList[currentIndex] || sampleVocabularyList[0];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredList.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
    }, 150);
  };

  const handleMarkAsLearned = (wordId: string, e: MouseEvent) => {
    e.stopPropagation();
    if (learnedIds.has(wordId)) return;
    
    const nextLearned = new Set(learnedIds);
    nextLearned.add(wordId);
    setLearnedIds(nextLearned);
    onEarnXp(15); // Award Duolingo-style XP!
  };

  const categories = ['All', 'Greetings', 'Pastelaria', 'Bureaucracy', 'Daily Life'];

  return (
    <div className="space-y-6" id="vocabulary-engine-root">
      {/* Description */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start" id="vocab-intro">
        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs" id="vocab-pm-avatar">
          M
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider" id="vocab-pm-brand">
            Memrise-Style Spaced Repetition (SRS) Specifications
          </h4>
          <p className="text-xs text-amber-700/90 mt-1 leading-relaxed" id="vocab-pm-rationale">
            "European Portuguese phonetics can be highly opaque. We highlight PT-PT equivalents of Brazilian words to guard against cross-dialect confusion. Click the speaker to hear correct stress-timed consonants." <span className="font-semibold">— Marcos, PM Memrise</span>
          </p>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-50 pb-4" id="vocab-categories-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`cat-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`text-xs px-3.5 py-2 font-semibold rounded-xl transition-all ${
              selectedCategory === cat 
                ? 'bg-amber-500 text-white shadow-xs' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredList.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-medium text-xs" id="vocab-empty-notice">
          No vocabulary matching this category was loaded.
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6" id="vocab-card-carousel-section">
          {/* Confetti & Stats indicator */}
          <div className="flex items-center justify-between px-2" id="flashcard-stats-display">
            <span className="text-xs text-slate-400 font-mono" id="carousel-indexer">
              Word {currentIndex + 1} of {filteredList.length}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full" id="srs-mastery-streak">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" id="star-icon" />
              {learnedIds.size} / {sampleVocabularyList.length} Mastered
            </span>
          </div>

          {/* FLIP CARD */}
          <div 
            id="flashcard-physical-container"
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer select-none perspective-1000 h-[280px]"
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} id="flip-card-inner">
              
              {/* CARD FRONT: Portuguese text */}
              <div className="absolute inset-0 bg-white border-2 border-slate-100 hover:border-amber-300 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all backface-hidden" id="card-front-face">
                <div className="flex items-center justify-between" id="card-front-top-rail">
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" id="card-front-cat-badge">
                    {currentWord.category}
                  </span>
                  
                  <button 
                    id="audio-speaker-front-btn"
                    onClick={(e) => speakPt(currentWord.portuguese, e)}
                    className="w-10 h-10 rounded-full bg-slate-50 hover:bg-amber-100 hover:text-amber-700 text-slate-500 flex items-center justify-center transition-colors group/speaker cursor-pointer"
                    title="Click to hear European Portuguese Pronunciation"
                  >
                    <Volume2 className="w-5 h-5" id="audio-icon-front" />
                  </button>
                </div>

                <div className="text-center space-y-2 mt-4" id="front-center-word-block">
                  <p className="text-3xl font-bold text-slate-800 tracking-tight" id="front-pt-word">
                    {currentWord.portuguese}
                  </p>
                  <p className="text-xs text-slate-400 font-mono tracking-wider italic" id="front-phonetic-spelling">
                    /{currentWord.pronunciation}/
                  </p>
                </div>

                <div className="flex justify-between items-center text-slate-400 border-t border-slate-50 pt-4" id="front-footer-rail">
                  <span className="text-[10px] flex items-center gap-1 font-semibold text-slate-300" id="tap-instruction-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" id="spin-refresh-icon" />
                    Tap Card to Flip
                  </span>
                  <button
                    id="front-complete-action-btn"
                    onClick={(e) => handleMarkAsLearned(currentWord.id, e)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                      learnedIds.has(currentWord.id)
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-slate-100 hover:border-amber-300 hover:bg-amber-50 text-slate-500 hover:text-amber-700'
                    }`}
                  >
                    <Check className="w-3 h-3" id="check-icon-1" />
                    {learnedIds.has(currentWord.id) ? 'Mastered (+15 XP)' : 'Mark Learned'}
                  </button>
                </div>
              </div>

              {/* CARD BACK: English definition and contrasting notes */}
              <div className="absolute inset-0 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-md rotate-y-180 backface-hidden" id="card-back-face">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3" id="card-back-top-rail">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400" id="card-back-cat-badge">
                    English Definition
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono" id="card-back-id">
                    SRS Core Module
                  </span>
                </div>

                <div className="space-y-4 py-2" id="back-center-definition-block">
                  <div className="text-center" id="back-definition-main">
                    <p className="text-2xl font-bold text-slate-100" id="back-en-translation">
                      {currentWord.english}
                    </p>
                  </div>

                  {currentWord.brazilianContrast && (
                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-red-500/10 space-y-0.5" id="brazilian-contrast-container">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-red-400 block" id="contrast-header-label">
                        Brazilian Portuguese Slip
                      </span>
                      <p className="text-xs text-slate-300 font-medium" id="contrast-body">
                        Do not say <span className="line-through text-red-300 font-bold">{currentWord.brazilianContrast}</span> in Portugal.
                      </p>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-300 italic text-center bg-slate-800/20 px-3 py-1.5 rounded-lg border border-slate-800" id="back-usage-notes">
                    {currentWord.notes}
                  </p>
                </div>

                <div className="space-y-1 mt-auto" id="back-footer-examples">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold" id="example-title-label">
                    Usage Example (European PT)
                  </span>
                  <p className="text-[11px] font-medium text-slate-300 leading-snug" id="example-pt-box">
                    "{currentWord.examplePt}"
                  </p>
                  <p className="text-[10px] text-slate-400 leading-snug" id="example-en-box">
                    "{currentWord.exampleEn}"
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center px-4" id="carousel-navigation-dock">
            <button
              id="carousel-prev-btn"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" id="arrow-prev-icon" />
            </button>

            <button
              id="tap-hint-button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-xs font-semibold px-4 py-2 bg-slate-50 hover:bg-slate-100 transition-colors rounded-full text-slate-500 flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-4 h-4 text-slate-400" id="hint-spin-icon" />
              Flip Answer
            </button>

            <button
              id="carousel-next-btn"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" id="arrow-next-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
