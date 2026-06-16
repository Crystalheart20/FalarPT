/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { sampleDialogues } from '../prdData';
import { AudioDialogue, DialogueLine } from '../types';
import { Headphones, Volume2, EyeOff, Eye, CheckCircle, HelpCircle, Star, Sparkles } from 'lucide-react';

interface ListeningPracticeProps {
  onEarnXp: (amount: number) => void;
}

export default function ListeningPractice({ onEarnXp }: ListeningPracticeProps) {
  const [activeDialogueId, setActiveDialogueId] = useState<string>(sampleDialogues[0].id);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
  const [activeVoiceLineIndex, setActiveVoiceLineIndex] = useState<number | null>(null);

  const [solvedDialogueIds, setSolvedDialogueIds] = useState<Set<string>>(new Set());

  const currentDialogue = sampleDialogues.find(d => d.id === activeDialogueId) || sampleDialogues[0];

  const speakLine = (line: DialogueLine, index: number) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support Speech Synthesis API.');
      return;
    }

    // Cancel anything playing
    window.speechSynthesis.cancel();
    setActiveVoiceLineIndex(index);

    const utterance = new SpeechSynthesisUtterance(line.pt);
    utterance.lang = 'pt-PT'; // Critical: Forcing Portugal speech standards!
    
    // Choose voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang === 'pt-PT' || v.lang === 'pt_PT' || v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    // Adjust rate for beginners if A1, otherwise natural
    utterance.rate = currentDialogue.difficulty.includes('A1') ? 0.8 : 0.95;

    utterance.onend = () => {
      setActiveVoiceLineIndex(null);
    };

    utterance.onerror = () => {
      setActiveVoiceLineIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizIndex(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizIndex === null || quizSubmitted) return;

    const isCorrect = selectedQuizIndex === currentDialogue.quiz.correctIndex;
    setAnsweredCorrectly(isCorrect);
    setQuizSubmitted(true);

    if (isCorrect && !solvedDialogueIds.has(currentDialogue.id)) {
      const nextSolved = new Set(solvedDialogueIds);
      nextSolved.add(currentDialogue.id);
      setSolvedDialogueIds(nextSolved);
      onEarnXp(30); // Award XP points
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="listening-lab-root">
      
      {/* Sidebar: Scenarios list */}
      <div className="lg:col-span-4 space-y-4" id="listening-sidebar">
        
        {/* PM Rationale */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-start" id="listening-ratio-card">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs" id="listening-avatar">
            B
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider" id="listening-pm-brand">
              Busuu & Duolingo Listening Lab
            </h4>
            <p className="text-xs text-emerald-700/90 mt-1 leading-relaxed" id="listening-pm-rationale">
              "We synthesize real-life scenarios like administrative councils and corner cafes. Toggle translations off to simulate real-life street listening." <span className="font-semibold">— Sofia, Busuu PM</span>
            </p>
          </div>
        </div>

        {/* Dialogues */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2.5" id="dialogues-menu-card">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2" id="dialogues-header">
            Authentic Scenarios
          </h3>
          {sampleDialogues.map((dial) => (
            <button
              key={dial.id}
              id={`dial-btn-${dial.id}`}
              onClick={() => {
                setActiveDialogueId(dial.id);
                setSelectedQuizIndex(null);
                setQuizSubmitted(false);
                setAnsweredCorrectly(false);
                setShowTranslations(true);
                window.speechSynthesis.cancel();
              }}
              className={`w-full text-left p-3.5 rounded-xl transition-all border ${
                activeDialogueId === dial.id 
                  ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900 font-medium' 
                  : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-emerald-600 tracking-wider block" id={`dial-diff-${dial.id}`}>
                {dial.difficulty}
              </span>
              <p className="text-xs font-semibold mt-1" id={`dial-title-${dial.id}`}>{dial.title}</p>
            </button>
          ))}
        </div>

        {/* Translation toggles */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3" id="translation-settings-card">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider" id="settings-header">
            Audio Settings
          </h4>
          <button
            id="toggle-translations-btn"
            onClick={() => setShowTranslations(!showTranslations)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-slate-700 text-xs py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            {showTranslations ? (
              <>
                <EyeOff className="w-4 h-4 text-slate-500" id="eyeoff-icon" />
                Hide English Translations
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-slate-500" id="eye-icon" />
                Show English Translations
              </>
            )}
          </button>
          <p className="text-[10px] text-slate-400 leading-normal text-center" id="settings-hint">
            Hiding translations forces you to decode the auditory signals by ear, replicating a local Portugal environment!
          </p>
        </div>
      </div>

      {/* Dialogue Thread */}
      <div className="lg:col-span-8 space-y-6" id="listening-main-content">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-6" id="dialogue-card">
          
          {/* Header */}
          <div className="border-b border-slate-50 pb-4 flex justify-between items-start" id="dialogue-header">
            <div>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-emerald-100" id="dialogue-diff-badge">
                {currentDialogue.difficulty}
              </span>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800 tracking-tight mt-1.5" id="dialogue-title-heading">
                {currentDialogue.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 italic" id="dialogue-scenario">
                Scene: {currentDialogue.scenario}
              </p>
            </div>
            {solvedDialogueIds.has(currentDialogue.id) && (
              <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-200 font-bold shrink-0" id="dialogue-xp-badge">
                <CheckCircle className="w-4 h-4" id="dialogue-check-icon" />
                Solved (+30 XP)
              </span>
            )}
          </div>

          {/* Dialogue Lines Scroller */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1" id="dialogue-transcript-scroller">
            {currentDialogue.lines.map((line, index) => {
              const worksAsSpeaker = line.speaker === 'Cliente' || line.speaker === 'Expatriado';
              return (
                <div 
                  key={index} 
                  id={`dialogue-bubble-${index}`}
                  className={`flex gap-3 max-w-[85%] ${
                    worksAsSpeaker ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-start'
                  }`}
                >
                  {/* Speaker Label Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-xs ${
                    worksAsSpeaker 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-emerald-600 text-white'
                  }`} id={`speaker-avatar-${index}`}>
                    {line.speaker[0]}
                  </div>

                  {/* Speech Bubble */}
                  <div className="space-y-1.5" id={`bubble-wrapper-${index}`}>
                    {/* Speaker name */}
                    <span className="text-[10px] text-slate-400 font-bold block" id={`bubble-speaker-${index}`}>
                      {line.speaker}
                    </span>

                    {/* PT line text */}
                    <div className={`p-4 rounded-2xl border ${
                      worksAsSpeaker 
                        ? 'bg-slate-50 border-slate-100 text-slate-800 rounded-tl-none' 
                        : 'bg-emerald-50/30 border-emerald-100/60 text-slate-800 rounded-tr-none'
                    }`} id={`bubble-text-${index}`}>
                      <div className="flex justify-between items-start gap-4" id={`text-sound-row-${index}`}>
                        <p className={`text-xs font-semibold leading-relaxed ${activeVoiceLineIndex === index ? 'text-indigo-600 bg-indigo-50/50 rounded px-1' : ''}`} id={`line-pt-${index}`}>
                          {line.pt}
                        </p>
                        <button
                          id={`line-audio-btn-${index}`}
                          onClick={() => speakLine(line, index)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            activeVoiceLineIndex === index
                              ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse'
                              : 'bg-white border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/40 cursor-pointer'
                          }`}
                          title="Speak sentence in European Portuguese accent"
                        >
                          <Volume2 className="w-3.5 h-3.5" id={`vol-icon-${index}`} />
                        </button>
                      </div>

                      {/* EN line translation if toggle enabled */}
                      {showTranslations && (
                        <p className="text-[10px] text-slate-500 italic border-t border-slate-200/50 mt-2 pt-2" id={`line-en-${index}`}>
                          {line.en}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dialogue Comprehension quiz */}
          <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-100 space-y-4" id="dialogue-comprehension-quiz">
            <div className="flex items-center gap-1.5" id="dial-quiz-header">
              <Headphones className="w-4.5 h-4.5 text-indigo-500" id="dial-quiz-icon" />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400 animate-pulse" id="dial-quiz-label">
                Dialogue Comprehension Quests
              </h4>
            </div>

            <p className="text-xs font-bold text-slate-700" id="dial-question">
              {currentDialogue.quiz.question}
            </p>

            <div className="space-y-2" id="dial-options">
              {currentDialogue.quiz.options.map((opt, index) => (
                <button
                  key={index}
                  id={`dial-option-btn-${index}`}
                  onClick={() => handleSelectOption(index)}
                  disabled={quizSubmitted}
                  className={`w-full text-left text-xs p-3.5 rounded-xl border font-semibold transition-all flex items-center justify-between ${
                    quizSubmitted
                      ? index === currentDialogue.quiz.correctIndex
                        ? 'border-green-300 bg-green-50 text-green-800'
                        : selectedQuizIndex === index
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : 'border-slate-100 bg-white text-slate-400'
                      : selectedQuizIndex === index
                        ? 'border-indigo-400 bg-indigo-50/30 text-indigo-900 ring-2 ring-indigo-500/10'
                        : 'border-slate-200 bg-white hover:bg-slate-100/30 text-slate-700 cursor-pointer'
                  }`}
                >
                  <span id={`dial-option-text-${index}`}>{opt}</span>
                  {quizSubmitted && index === currentDialogue.quiz.correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-green-700" id="quiz-badge-correct">Verified</span>
                  )}
                  {quizSubmitted && selectedQuizIndex === index && index !== currentDialogue.quiz.correctIndex && (
                    <span className="text-[10px] uppercase font-bold text-red-700" id="quiz-badge-incorrect">Refused Draft</span>
                  )}
                </button>
              ))}
            </div>

            {selectedQuizIndex !== null && !quizSubmitted && (
              <button
                id="submit-dial-quiz-btn"
                onClick={handleSubmitQuiz}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Submit Comprehension Answer
              </button>
            )}

            {quizSubmitted && (
              <div className={`p-4 rounded-2xl border space-y-2 ${
                answeredCorrectly 
                  ? 'bg-green-50/30 border-green-100 text-green-900' 
                  : 'bg-red-50/30 border-red-100 text-red-900'
              }`} id="dial-feedback-box">
                <div className="flex items-center gap-1.5" id="dial-feedback-header">
                  {answeredCorrectly ? (
                    <CheckCircle className="w-4.5 h-4.5 text-green-600" id="diag-success-icon" />
                  ) : (
                    <Volume2 className="w-4.5 h-4.5 text-red-650" id="diag-fail-icon" />
                  )}
                  <h5 className="font-bold text-xs" id="dial-feedback-title">
                    {answeredCorrectly ? 'Comprehensive Pass! (+30 XP)' : 'Comprehension Failed'}
                  </h5>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed" id="dial-feedback-explanation">
                  <span className="font-semibold text-slate-800" id="dial-ex-pfx">Explanation:</span> {currentDialogue.quiz.explanation}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
