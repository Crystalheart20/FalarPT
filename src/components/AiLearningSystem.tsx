/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  aiTutorArchitecture, systemPromptsList, speechPipeline, 
  pronunciationMetrics, srsIntervalRules, adaptiveAlgorithms, 
  aiLessonGeneratorWorkflow, nativeLanguageAdaptations, aiSafetyGuidelines 
} from '../aiLearningSystemData';
import { 
  Cpu, Sparkles, MessageSquare, Mic, Volume2, ShieldAlert, 
  Sliders, Play, RotateCcw, Copy, Check, Info, ArrowRight, 
  CheckCircle2, AlertTriangle, Calendar, Activity, Heart, Globe, RefreshCw 
} from 'lucide-react';

export default function AiLearningSystem() {
  // Navigation tabs within the AI Learning system
  const [activeTab, setActiveTab] = useState<'architecture' | 'prompts' | 'speech' | 'adaptive' | 'safety' | 'international' | 'analytics'>('architecture');
  
  // Interactive Prompt Coach Tab states
  const [activeCoachIndex, setActiveCoachIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Pronunciation Simulator states
  const [selectedPhrase, setSelectedPhrase] = useState<string>("Boa tarde, queria pedir um café curto.");
  const [accuracyVal, setAccuracyVal] = useState<number>(88);
  const [fluencyVal, setFluencyVal] = useState<number>(82);
  const [intonationVal, setIntonationVal] = useState<number>(75);
  const [rhythmVal, setRhythmVal] = useState<number>(85);
  const [confidenceVal, setConfidenceVal] = useState<number>(90);

  // Interactive SRS Calculator states
  const [currentInterval, setCurrentInterval] = useState<number>(4);
  const [easinessFactor, setEasinessFactor] = useState<number>(2.5);
  const [selectedGrade, setSelectedGrade] = useState<number>(4);

  // Internationalization selector states
  const [selectedNativeLang, setSelectedNativeLang] = useState<string>("English (EN)");

  // Helper copied trigger
  const handleCopyPrompt = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Calculations for Pronunciation Score
  const calculateCompositeScore = () => {
    const accWeight = 0.35;
    const fluWeight = 0.25;
    const intWeight = 0.15;
    const rhyWeight = 0.15;
    const confWeight = 0.10;

    const weightedScore = (
      accuracyVal * accWeight +
      fluencyVal * fluWeight +
      intonationVal * intWeight +
      rhythmVal * rhyWeight +
      confidenceVal * confWeight
    );
    return Math.round(weightedScore);
  };

  const compositeScore = calculateCompositeScore();

  const getPronunciationFeedback = (score: number) => {
    if (score >= 90) return {
      tier: "S-Tier (Native Lisbon Standard)",
      advice: "Espetacular! Perfect stress-timed vowel reduction on final syllables. The palatalized [ʃ] 's' is highly authentic.",
      color: "text-emerald-500 bg-emerald-50 border-emerald-100"
    };
    if (score >= 80) return {
      tier: "A-Tier (Advanced Conversational)",
      advice: "Muito bem! Minor Brazilian or English vocalic traces. Keep final 'e' more muted and focus on shortening unstressed syllables.",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    };
    if (score >= 70) return {
      tier: "B-Tier (Intermediate Intelligible)",
      advice: "Bom trabalho! Accent feels a bit flat. Remember PT-PT pitch declines steeply at phrase endings. Ensure 'Lisboa' sounds like [liʒ.ˈβo.ɐ].",
      color: "text-amber-600 bg-amber-50 border-amber-100"
    };
    return {
      tier: "C-Tier (Beginner Accent)",
      advice: "Precisa de prática. Avoid pronouncing final vowels loudly. Try to read the IPA transcriptions and mimic Dr. Eduardo's dental friction hints.",
      color: "text-rose-600 bg-rose-50 border-rose-100"
    };
  };

  const feedbackObj = getPronunciationFeedback(compositeScore);

  // Calculations for SRS Calculator
  const getSrsCalculation = () => {
    // SM-2 modified approximation
    let newEF = easinessFactor + (0.1 - (5 - selectedGrade) * (0.08 + (5 - selectedGrade) * 0.02));
    if (newEF < 1.3) newEF = 1.3;

    let newInterval = 1;
    if (selectedGrade >= 3) {
      if (currentInterval === 1) newInterval = 4;
      else if (currentInterval === 4) newInterval = 7;
      else newInterval = Math.round(currentInterval * newEF);
    } else {
      newInterval = 1; // reset on error grade
    }

    return {
      nextEF: parseFloat(newEF.toFixed(2)),
      nextIntervalDays: newInterval,
      priorityLevel: selectedGrade <= 2 ? "CRITICAL REVIEW" : selectedGrade === 3 ? "MEDIUM PRIORITY" : "SECURED RETENTION"
    };
  };

  const srsCalc = getSrsCalculation();

  return (
    <div className="space-y-8 animate-fadeIn" id="ai-learning-system-root">
      
      {/* Visual Identity Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-950 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden" id="ai-hdr-card">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-wrap items-center gap-2 mb-3" id="ai-badge-row">
          <span className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            AI Cognitive Architect Core
          </span>
          <span className="bg-teal-500/20 border border-teal-400/30 text-teal-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Beyond Duolingo Max Specifications
          </span>
          <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            100% European Portuguese Dialect Focus
          </span>
        </div>

        <div className="space-y-4 max-w-4xl" id="ai-main-title">
          <h2 className="text-xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-indigo-400 fill-indigo-400/20" />
            AI-Powered Computational Learning System
          </h2>
          <p className="text-xs text-slate-350 leading-relaxed font-normal text-slate-300">
            Co-designed by native phoneticians, computational linguists, and cognitive engineers. This modular engine integrates advanced multi-agent system prompts, state-of-the-art speech processing pipelines, rhythm-calculating intonation formulas, and custom European PT-PT syntactic guardrails to deliver a complete production-grade educational architecture.
          </p>
        </div>

        {/* AI Metrics Status HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80" id="ai-stats-hud">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Whisper Model</span>
            <p className="text-xs font-black text-indigo-300">Whisper-v3 (PT-PT Fine-tuned)</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Average Latency</span>
            <p className="text-xs font-black text-emerald-300">~650ms E2E Audio Pipeline</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Alignment Standard</span>
            <p className="text-xs font-black text-amber-300">MFA Phoneme Segmentation</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Safety Shields</span>
            <p className="text-xs font-black text-rose-300">Continuous Gerund Rejector</p>
          </div>
        </div>
      </div>

      {/* Main Nav tabs targeting sectors */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 bg-slate-50/50 p-1.5 rounded-2xl" id="ai-learning-tabs">
        {[
          { id: 'architecture', label: '1. Tutor & Session Architecture', icon: Cpu },
          { id: 'prompts', label: '2. Prompt Engineering System', icon: Sparkles },
          { id: 'speech', label: '3. Acoustic Speech Pipeline', icon: Mic },
          { id: 'adaptive', label: '4. Adaptive & Spaced Spacing', icon: Sliders },
          { id: 'safety', label: '5. Safety & Dialect Quality', icon: ShieldAlert },
          { id: 'international', label: '6. Accent Adaptation (L1)', icon: Globe },
          { id: 'analytics', label: '7. Computational Analytics', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100/90 text-slate-600 border border-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="ai-main-grid-container">
        
        {/* Dynamic Spec Screen Component (8 columns) */}
        <div className="lg:col-span-8 space-y-6" id="ai-tutor-main-canvas">

          {/* 1. TUTOR & SESSION ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="tutor-arch-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Multi-Agent Cognitive Routing Schema</h3>
                <p className="text-xs text-slate-500 font-medium">Session memory, warm loading lifecycles, and asynchronous pgvector retrieval structures.</p>
              </div>

              <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">System Core Engine: {aiTutorArchitecture.tagline}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {aiTutorArchitecture.overview}
                </p>
              </div>

              {/* Memory strategy listing */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">Gated Memory Hierarchy Streams</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiTutorArchitecture.memoryStreams.map((m, key) => (
                    <div key={key} className="p-4 border border-slate-150 rounded-2xl bg-white space-y-2 hover:border-slate-300 transition-all">
                      <span className="text-[10px] bg-slate-900 text-slate-100 px-2.5 py-0.5 rounded font-mono font-bold tracking-wide w-fit block">{m.type}</span>
                      <h4 className="text-xs font-black text-slate-800 uppercase">Tech stack: {m.technology}</h4>
                      <p className="text-xs text-slate-600 leading-normal font-medium">{m.usage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Diagram representing conversational memory states */}
              <div className="border border-slate-150 rounded-2xl p-4 bg-slate-950 text-slate-200 space-y-3 text-xs" id="conv-diagram-svg">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Runtime Memory Routing Pipeline</span>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[10px] text-center">
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-indigo-400 font-bold">
                    [1] User Audio Input
                    <span className="block text-[8px] text-slate-500 mt-1 font-normal">Streaming PCM-16</span>
                  </div>
                  <div className="text-slate-650 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 font-bold">
                    [2] pgvector LTM Pull
                    <span className="block text-[8px] text-slate-500 mt-1 font-normal">Past Lexical Gaps</span>
                  </div>
                  <div className="text-slate-650 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-teal-400 font-bold">
                    [3] Sliding 16k Window
                    <span className="block text-[8px] text-slate-500 mt-1 font-normal">Active Scenario Buffer</span>
                  </div>
                  <div className="text-slate-650 font-bold">➔</div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-bold">
                    [4] Synthesizer Out
                    <span className="block text-[8px] text-slate-500 mt-1 font-normal">Accented Reply Stream</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[9px] text-slate-400">
                  <div><strong>Session Active TTL:</strong> 15 minutes (Redis state refresh)</div>
                  <div><strong>Sliding Viewport:</strong> 4 lessons context window</div>
                  <div><strong>Memory Summary:</strong> pgvector lexical decay model</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROMPT ENGINEERING SYSTEM */}
          {activeTab === 'prompts' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="prompts-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Production System Prompts & Coaches</h3>
                <p className="text-xs text-slate-500 font-medium font-sans">Dynamic specialized tutors configured to analyze acoustics, lexical differences, and formal pronoun syntaxes.</p>
              </div>

              {/* Coach horizontal slider selection buttons */}
              <div className="flex gap-1 overflow-x-auto pb-1" id="coaches-selectors">
                {systemPromptsList.map((coach, key) => (
                  <button
                    key={key}
                    onClick={() => setActiveCoachIndex(key)}
                    className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                      activeCoachIndex === key 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    ✦ {coach.coachName.split(" / ")[0]}
                  </button>
                ))}
              </div>

              {/* Selected Coach System Prompt display specifications */}
              <div className="border border-slate-150 p-4 rounded-2xl space-y-4 bg-slate-50/20" id="selected-coach-card">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Agent Persona Roles</span>
                    <h4 className="text-xs font-extrabold text-slate-900">{systemPromptsList[activeCoachIndex].coachName}</h4>
                    <p className="text-[11px] text-slate-500 italic mt-0.5 font-medium">{systemPromptsList[activeCoachIndex].role}</p>
                  </div>

                  <span className="text-[10px] bg-slate-950 text-emerald-400 font-mono font-bold px-2 py-1 rounded">
                    Focus: {systemPromptsList[activeCoachIndex].focus.split(" ")[0]} Area
                  </span>
                </div>

                {/* System Prompt container */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified System Instructions Block</span>
                    <button 
                      onClick={() => handleCopyPrompt(systemPromptsList[activeCoachIndex].systemPrompt, `pmp-${activeCoachIndex}`)}
                      className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1 rounded-xl flex items-center gap-1.5 font-bold cursor-pointer transition-all"
                    >
                      {copiedKey === `pmp-${activeCoachIndex}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === `pmp-${activeCoachIndex}` ? "Copied!" : "Copy Prompt Specs"}
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-950 text-emerald-350 text-[10px] font-mono leading-relaxed rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap select-all max-h-56">
                    {systemPromptsList[activeCoachIndex].systemPrompt}
                  </pre>
                </div>

                {/* Simulated Conversational Turn */}
                <div className="space-y-2 pt-2 border-t border-slate-100" id="live-coaching-simulation">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Conversational Turn Simulation</span>
                  
                  {/* User Query bubble */}
                  <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                      <span>👤 Learner (A1 Dialect)</span>
                      <span>Target Input: English vs PT-PT</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      "{systemPromptsList[activeCoachIndex].exampleUserQuery}"
                    </p>
                  </div>

                  {/* AI Response bubble */}
                  <div className="p-3 bg-indigo-50/40 border border-indigo-150 rounded-xl space-y-1">
                    <span className="text-[10px] text-indigo-700 font-bold block">🤖 Coach Sophia / Eduardo System Output</span>
                    <p className="text-xs text-slate-700 leading-normal font-semibold italic">
                      {systemPromptsList[activeCoachIndex].exampleAiResponse}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. ACOUSTIC SPEECH PIPELINE */}
          {activeTab === 'speech' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="speech-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Acoustic Speech-To-Text Practice Pipeline</h3>
                <p className="text-xs text-slate-500 font-medium">PCM compression levels, Whisper-large-v3 attention matrices, and forced-alignment latency mitigation.</p>
              </div>

              {/* Dynamic Pipeline Interactive Scroller */}
              <div className="space-y-3" id="pipeline-stages">
                {speechPipeline.map((step, idx) => (
                  <div key={idx} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/45 hover:border-slate-300 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-1.5">
                      <h4 className="text-xs font-black text-slate-900 uppercase">{step.phase}</h4>
                      <div className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                        Latency Budget: {step.latencyMs}ms
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      <strong>Method:</strong> {step.action}
                    </p>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-150 text-[11px] leading-snug font-sans text-slate-650 italic">
                      <strong className="text-indigo-850 block font-bold uppercase text-[9px] mb-0.5">Optimized Mitigation Strategy:</strong>
                      {step.mitigationStrategy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ADAPTIVE & SPACED SPACING */}
          {activeTab === 'adaptive' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="spacing-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Cognitive Spaced Repetition (SRS) Rules</h3>
                <p className="text-xs text-slate-500 font-medium">Algorithmic easiness factor adaptation, scheduling equations, and progressive difficulty balancing.</p>
              </div>

              {/* Interactive SRS Spiker / Calculator widget */}
              <div className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-5 space-y-4" id="srs-interactive-calculator">
                <div className="flex items-center gap-1.5 border-b border-indigo-100 pb-2">
                  <Sliders className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-tight">Interactive Cognitive Multiplier Simulator</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Tweak the interval and cognitive response grade indicators below. See the instant SuperMemo-2 mathematical recalculation of the next learning node interval automatically.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs font-semibold">
                  {/* Prior Interval input slider */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase block">Current Interval (Days): {currentInterval}d</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      value={currentInterval} 
                      onChange={(e) => setCurrentInterval(parseInt(e.target.value))}
                      className="w-full text-indigo-600 accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                      <span>1d</span>
                      <span>30d</span>
                    </div>
                  </div>

                  {/* Previous Easiness Factor (EF) slider */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase block">Easiness Factor (EF - Core): {easinessFactor}</label>
                    <input 
                      type="range" 
                      min="1.3" 
                      max="3.0" 
                      step="0.1"
                      value={easinessFactor} 
                      onChange={(e) => setEasinessFactor(parseFloat(e.target.value))}
                      className="w-full text-indigo-600 accent-indigo-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5">
                      <span>1.3 (Hard)</span>
                      <span>3.0 (Easy)</span>
                    </div>
                  </div>

                  {/* Grade Score selector buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Recall Evaluation Grade</span>
                    <div className="flex gap-1" id="srs-grade-buttons">
                      {[1, 2, 3, 4, 5].map((grade) => (
                        <button
                          key={grade}
                          onClick={() => setSelectedGrade(grade)}
                          className={`w-8 h-8 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            selectedGrade === grade 
                              ? 'bg-slate-900 text-white shadow-xs' 
                              : 'bg-white hover:bg-slate-100 text-slate-705 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono mt-1 block">
                      {selectedGrade === 5 ? "Immediate response!" : selectedGrade === 4 ? "Small hesitation" : selectedGrade === 3 ? "Heavy stress recall" : "Incorrect / Blank State"}
                    </div>
                  </div>
                </div>

                {/* Instant Calculation output metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 mt-2 border-t border-indigo-150 text-center font-mono">
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-bold">Recommended Next Interval</span>
                    <p className="text-md font-black text-indigo-750 text-indigo-800 mt-0.5">{srsCalc.nextIntervalDays} Days</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-bold">Recalculated Easiness (EF)</span>
                    <p className="text-md font-black text-indigo-750 text-indigo-800 mt-0.5">{srsCalc.nextEF}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-bold">Operational Status</span>
                    <p className={`text-xs font-black mt-1.5 ${selectedGrade <= 2 ? 'text-rose-650' : selectedGrade === 3 ? 'text-amber-653 text-amber-600' : 'text-emerald-650 text-emerald-600'}`}>
                      {srsCalc.priorityLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic lesson generator specifications */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-black text-slate-800 uppercase block">Dynamic Balanced Adaptation & Lesson Generator Workflows</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-150 p-4 rounded-2xl bg-white space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase">1. Difficulty Adjustment Algorithm</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      {adaptiveAlgorithms.dynamicAdjustment.logic}
                    </p>
                  </div>

                  <div className="border border-slate-150 p-4 rounded-2xl bg-white space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase">2. Lesson Generator AST Workflows</h4>
                    <div className="space-y-1">
                      {aiLessonGeneratorWorkflow.workflowSteps.map((ws, i) => (
                        <div key={i} className="text-xs p-1.5 bg-slate-50 rounded-lg border border-slate-150 flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-slate-205 text-slate-700 font-mono text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5 bg-slate-150">{i + 1}</span>
                          <p className="text-slate-650 font-medium"><strong>{ws.step.split(". ")[1]}:</strong> {ws.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. SAFETY & DIALECT QUALITY */}
          {activeTab === 'safety' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="safety-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">AI Guardrails & Linguistic Consistency</h3>
                <p className="text-xs text-slate-500 font-medium">Rejector rules preventing Brazilian Portuguese dialect contamination during text synthesis.</p>
              </div>

              {/* Safety metrics guidelines */}
              <div className="grid grid-cols-1 gap-3.5" id="safety-warnings">
                {aiSafetyGuidelines.map((guideline, gridX) => (
                  <div key={gridX} className="flex gap-3 items-start p-3 bg-rose-50/25 border border-rose-150 rounded-2xl">
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div className="text-xs leading-normal font-sans font-medium">
                      <strong className="text-rose-950 block mb-0.5">Consistency Guardrail #{gridX + 1}</strong>
                      <p className="text-slate-650">{guideline}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Validation workflow diagram */}
              <div className="border border-slate-150 rounded-2xl p-4 bg-slate-950 text-slate-250 text-xs font-mono space-y-3">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Continuous Integration AST Guardrail Scan</span>
                
                <div className="space-y-2 leading-relaxed">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                    <span>A. Scan Sentence for gerund terms ('comendo', 'correndo')</span>
                    <span className="text-rose-400 font-bold">REJECTED ➔ RE-ROUTE TO INFINITIVE</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                    <span>B. Verify clitic pronoun placement ('não me dá' vs 'não dá-me')</span>
                    <span className="text-emerald-450 text-emerald-400 font-bold">PASSED (Proclisis matched)</span>
                  </div>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                    <span>C. Match terminology against 4,500 Lisbon-standard static lexicons</span>
                    <span className="text-emerald-450 text-emerald-400 font-bold">PASSED (Mundial vs Global check)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. ACCENT ADAPTATION (L1) */}
          {activeTab === 'international' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="intl-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Accent Contrastive Diagnostics (L1)</h3>
                <p className="text-xs text-slate-500 font-medium font-sans">How European Portuguese explanations and pronunciation scores dynamically adapt based on the user's native language.</p>
              </div>

              {/* Dynamic selector selector */}
              <div className="flex flex-wrap gap-1.5" id="native-lang-grid">
                {nativeLanguageAdaptations.map((a, keyX) => (
                  <button
                    key={keyX}
                    onClick={() => setSelectedNativeLang(a.lang)}
                    className={`px-3.5 py-2' py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      selectedNativeLang === a.lang 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {a.lang}
                  </button>
                ))}
              </div>

              {/* Selected Adaptation specifications */}
              {(() => {
                const adaptationObj = nativeLanguageAdaptations.find(a => a.lang === selectedNativeLang) || nativeLanguageAdaptations[0];
                return (
                  <div className="p-4 border border-indigo-150 rounded-2xl bg-indigo-50/20 space-y-3 text-xs leading-normal font-sans font-semibold">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                      <Globe className="w-4 h-4 text-indigo-700" />
                      <h4 className="text-xs font-black text-indigo-900 uppercase tracking-tight">Adaptation Strategy: {adaptationObj.lang} Profile</h4>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">L1 Contrastive Pronunciation Hurdles:</span>
                        <p className="text-slate-700 mt-0.5">{adaptationObj.nativeContrastPoint}</p>
                      </div>

                      <div className="pt-2 border-t border-indigo-100/50">
                        <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">Linguistic Priority / Pedagogical Strategy:</span>
                        <p className="text-indigo-900 font-bold mt-0.5">{adaptationObj.pedagogicalPriority}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 7. COMPUTATIONAL ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="analytics-module">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Acoustic & Semantic Learning Analytics</h3>
                <p className="text-xs text-slate-500 font-medium">Tracking pronunciation profiles, grammar accuracy counts, and vocabulary retention levels under the CEFR curve.</p>
              </div>

              {/* Performance checklist or data blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-center">
                  <span className="text-[8px] text-slate-400 uppercase font-black">Pronoun Placement Success</span>
                  <p className="text-md font-black text-indigo-800 mt-0.5">84.2%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-center">
                  <span className="text-[8px] text-slate-400 uppercase font-black">Vocalic Reduction Matching</span>
                  <p className="text-md font-black text-indigo-800 mt-0.5">72.1%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-center">
                  <span className="text-[8px] text-slate-400 uppercase font-black">Active Active SRS Heap</span>
                  <p className="text-md font-black text-indigo-800 mt-0.5">4,210 cards</p>
                </div>
              </div>

              {/* Dynamic Analytics Graph representation */}
              <div className="border border-slate-150 rounded-2xl p-4 bg-slate-950 text-slate-200 space-y-3" id="analytics-chart-mock">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Weekly Lexical Retention & Accent Accuracy Curves</span>
                
                {/* Horizontal progress graphs simulating live charts */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                      <span>Lexical Recall Rate (CEFR Targets)</span>
                      <span className="text-emerald-400">92% Average</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                      <span>Acoustic Accent Intonation alignment</span>
                      <span className="text-indigo-400">81% Standard</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '81%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                      <span>Muted Unstressed Vowels Reduction</span>
                      <span className="text-amber-400">68% Mapped</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Interactive Pronunciation Dial Simulator (4 columns) */}
        <div className="lg:col-span-4 space-y-6" id="ai-pronunciation-side-panel">
          
          {/* Pronunciation Practice Scorer */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-4" id="practice-scorer-panel">
            <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block border-b border-slate-800 pb-2">
              European PT Accent Scorer Core
            </h4>
            
            <p className="text-xs text-slate-400 leading-normal font-sans font-medium">
              Acoustic analysis calculates standard Portuguese consonant shifts and vocalic reductions dynamically. Select a phrase and adjust the dimensions below to see the composition results:
            </p>

            {/* Phrase selector buttons */}
            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-400 font-bold uppercase block font-mono">Select Practice Sentence:</span>
              <select 
                value={selectedPhrase}
                onChange={(e) => setSelectedPhrase(e.target.value)}
                className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl p-2 text-xs font-semibold cursor-pointer outline-none focus:border-indigo-500"
              >
                <option value="Boa tarde, queria pedir um café curto.">Boa tarde, queria café curto.</option>
                <option value="O autocarro passa perto da paragem em Lisboa.">O autocarro passa por Lisboa.</option>
                <option value="A funcionária da AIMA validou os documentos.">A funcionária validou os documentos.</option>
              </select>
            </div>

            {/* Simulated sliders block */}
            <div className="space-y-3 pt-2 font-semibold">
              
              {/* Slider Accuracy */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Acoustic Accuracy</span>
                  <span className="text-indigo-400">{accuracyVal}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={accuracyVal} 
                  onChange={(e) => setAccuracyVal(parseInt(e.target.value))}
                  className="w-full text-indigo-600 accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Slider Fluency */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Fluency & Cadence</span>
                  <span className="text-teal-400">{fluencyVal}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={fluencyVal} 
                  onChange={(e) => setFluencyVal(parseInt(e.target.value))}
                  className="w-full text-teal-600 accent-teal-400 cursor-pointer"
                />
              </div>

              {/* Slider Intonation */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Pitch Intonation</span>
                  <span className="text-amber-400">{intonationVal}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={intonationVal} 
                  onChange={(e) => setIntonationVal(parseInt(e.target.value))}
                  className="w-full text-amber-600 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Slider Rhythm */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-slate-400 uppercase">Rhythmic Timing</span>
                  <span className="text-emerald-400">{rhythmVal}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={rhythmVal} 
                  onChange={(e) => setRhythmVal(parseInt(e.target.value))}
                  className="w-full text-emerald-600 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Scoring Result Badge */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-2 mt-4 text-center">
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-slate-500 font-mono uppercase font-bold">Composite European PT Score</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-mono px-1.5 py-0.5 rounded border border-indigo-500/15">MFA Balanced</span>
              </div>
              
              <div className="py-1">
                <span className="text-3xl font-black text-white">{compositeScore}%</span>
                <span className="block text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{feedbackObj.tier}</span>
              </div>

              <p className="text-[10px] text-slate-400 leading-normal italic text-left pt-1 px-1 border-t border-slate-900 font-medium">
                <strong>Eduardo Says:</strong> {feedbackObj.advice}
              </p>
            </div>
          </div>

          {/* Coefficient details card */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3" id="formulas-coefficients-matrix">
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Info className="w-4 h-4 text-indigo-650" />
              Linguistic Formula Weights
            </h4>

            <div className="space-y-3 font-mono text-[9px] text-slate-550 text-slate-600">
              {pronunciationMetrics.map((p, idxPt) => (
                <div key={idxPt} className="border-b border-slate-100 last:border-0 pb-2 last:pb-0">
                  <div className="flex justify-between font-bold text-slate-805">
                    <span>{p.dimension}</span>
                    <span className="text-indigo-700">W: {p.coefficient * 100}%</span>
                  </div>
                  <code className="text-slate-450 block italic text-[8px] my-1 font-semibold">{p.scoringEquation}</code>
                  <p className="font-sans text-[10px] leading-tight font-medium text-slate-500">{p.descriptionPt}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
