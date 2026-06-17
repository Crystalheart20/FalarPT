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
  bilingualMode?: boolean;
}

export default function VocabularyPractice({ onEarnXp, bilingualMode = true }: VocabularyPracticeProps) {
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
      <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex gap-3 items-start animate-fade-in" id="vocab-intro">
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs text-sm font-bold" id="vocab-pm-avatar">
          🇵🇹
        </div>
        <div>
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider" id="vocab-pm-brand">
            {bilingualMode ? "Treino de Vocabulário Autêntico / Authentic Vocabulary flashcards" : "Treino de Vocabulário Autêntico (Spaced Repetition)"}
          </h4>
          <p className="text-xs text-amber-950 mt-1 leading-relaxed font-semibold animate-fade-in" id="vocab-pm-rationale">
            {bilingualMode ? (
              <>
                Aprenda as palavras exatas usadas em Portugal. Destacamos as diferenças em relação ao Português do Brasil para evitar equívocos sociais ou burocráticos. Clique no ícone de som para ouvir a pronúncia em Português Europeu (pt-PT).
                <span className="block mt-2.5 text-slate-800 text-[11.5px] border-t border-amber-300/60 pt-2 font-bold not-italic">
                  Learn the exact words used in Portugal. We highlight crucial differences from Brazilian Portuguese to prevent social or bureaucratic mistakes. Click the speaker icon to hear the native European Portuguese (pt-PT) audio.
                </span>
              </>
            ) : (
              "Aprenda as palavras exatas usadas em Portugal. Destacamos as diferenças em relação ao Português do Brasil para evitar equívocos sociais ou burocráticos. Clique no ícone de som para ouvir a pronúncia correta em Português Europeu (pt-PT). Welcome to authentic Portuguese!"
            )}
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
        <div className="text-center py-12 text-slate-800 font-extrabold text-xs bg-slate-100 rounded-xl border border-slate-200 inline-block w-full" id="vocab-empty-notice">
          {bilingualMode ? "Nenhum vocabulário correspondente foi carregado. / No matching vocabulary loaded." : "No vocabulary matching this category was loaded."}
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6" id="vocab-card-carousel-section">
          {/* Confetti & Stats indicator */}
          <div className="flex items-center justify-between px-2" id="flashcard-stats-display">
            <span className="text-xs text-slate-800 font-black font-mono" id="carousel-indexer">
              {bilingualMode ? `Palavra ${currentIndex + 1} de ${filteredList.length} / Word ${currentIndex + 1} of ${filteredList.length}` : `Word ${currentIndex + 1} of ${filteredList.length}`}
            </span>
            <span className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full" id="srs-mastery-streak">
              <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" id="star-icon" />
              {learnedIds.size} / {sampleVocabularyList.length} {bilingualMode ? "Dominado(s) / Mastered" : "Mastered"}
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
                    title={bilingualMode ? "Clique para ouvir a pronúncia correta / Click to hear European Portuguese Pronunciation" : "Click to hear European Portuguese Pronunciation"}
                  >
                    <Volume2 className="w-5 h-5" id="audio-icon-front" />
                  </button>
                </div>

                <div className="text-center space-y-2.5 mt-4" id="front-center-word-block">
                  <p className="text-3.5xl font-black text-slate-900 tracking-tight" id="front-pt-word">
                    {currentWord.portuguese}
                  </p>
                  <div className="inline-block bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl shadow-2xs">
                    <p className="text-xs text-slate-800 font-black font-mono tracking-wider italic" id="front-phonetic-spelling">
                      /{currentWord.pronunciation}/
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-slate-700 border-t border-slate-150 pt-4" id="front-footer-rail">
                  <span className="text-[11px] flex items-center gap-1-5 font-bold text-slate-700" id="tap-instruction-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-indigo-650" id="spin-refresh-icon" />
                    {bilingualMode ? "Toque para virar / Tap to Flip" : "Tap Card to Flip"}
                  </span>
                  <button
                    id="front-complete-action-btn"
                    onClick={(e) => handleMarkAsLearned(currentWord.id, e)}
                    className={`text-[11px] font-black px-3 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                      learnedIds.has(currentWord.id)
                        ? 'border-green-300 bg-green-100 text-green-900'
                        : 'border-slate-300 hover:border-amber-400 hover:bg-amber-50 text-slate-800 hover:text-amber-900 bg-slate-50'
                    }`}
                  >
                    <Check className="w-3 h-3" id="check-icon-1" />
                    {learnedIds.has(currentWord.id) 
                      ? bilingualMode ? 'Dominado / Mastered (+15 XP)' : 'Mastered (+15 XP)'
                      : bilingualMode ? 'Marcar como Aprendido / Mark Learned' : 'Mark Learned'}
                  </button>
                </div>
              </div>

              {/* CARD BACK: English definition and contrasting notes */}
              <div className="absolute inset-0 bg-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between shadow-md rotate-y-180 backface-hidden" id="card-back-face">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3" id="card-back-top-rail">
                  <span className="text-[10px] uppercase font-black tracking-widest text-amber-400" id="card-back-cat-badge">
                    {bilingualMode ? "Tradução de Apoio / English Definition" : "English Definition"}
                  </span>
                  <span className="text-[10px] text-slate-300 font-extrabold font-mono" id="card-back-id">
                    SRS Core Module
                  </span>
                </div>

                <div className="space-y-4 py-2" id="back-center-definition-block">
                  <div className="text-center" id="back-definition-main">
                    <p className="text-2.5xl font-black text-white" id="back-en-translation">
                      {currentWord.english}
                    </p>
                  </div>

                  {currentWord.brazilianContrast && (
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-red-500/30 space-y-1 shadow-xs" id="brazilian-contrast-container">
                      <span className="text-[10px] uppercase font-black tracking-wider text-red-400 block" id="contrast-header-label">
                        {bilingualMode ? "Alerta de Desvio Brasileiro / Brazilian PT Slip" : "Brazilian Portuguese Slip"}
                      </span>
                      <p className="text-xs text-white font-bold leading-normal" id="contrast-body">
                        {bilingualMode ? (
                          <>
                            Não diga <span className="line-through text-red-300 font-black">{currentWord.brazilianContrast}</span> em Portugal (termo brasileiro).
                          </>
                        ) : (
                          <>
                            Do not say <span className="line-through text-red-300 font-black">{currentWord.brazilianContrast}</span> in Portugal.
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  <p className="text-[11.5px] text-white font-semibold italic text-center bg-slate-850 p-2.5 rounded-lg border border-slate-700" id="back-usage-notes">
                    {currentWord.notes}
                  </p>
                </div>

                <div className="space-y-1.5 mt-auto bg-slate-850/40 p-2.5 rounded-xl border border-slate-800" id="back-footer-examples">
                  <span className="text-[9.5px] uppercase tracking-wider text-amber-450 text-amber-450 font-black block" id="example-title-label">
                    {bilingualMode ? "Frase de Exemplo em Portugal / Usage Example (PT)" : "Usage Example (European PT)"}
                  </span>
                  <p className="text-[11.5px] font-black text-white leading-snug" id="example-pt-box">
                    "{currentWord.examplePt}"
                  </p>
                  <p className="text-[11px] text-slate-200 font-bold leading-snug italic" id="example-en-box">
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
              className="text-xs font-black px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors rounded-full text-slate-800 flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-4 h-4 text-slate-700" id="hint-spin-icon" />
              {bilingualMode ? "Virar Cartão / Flip card" : "Flip Answer"}
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
