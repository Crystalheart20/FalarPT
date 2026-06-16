/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import PrdContainer from './components/PrdContainer';
import SandboxContainer from './components/SandboxContainer';
import TechArchitecture from './components/TechArchitecture';
import DatabaseArchitecture from './components/DatabaseArchitecture';
import FrontendArchitecture from './components/FrontendArchitecture';
import UiUxDesignSystem from './components/UiUxDesignSystem';
import AiLearningSystem from './components/AiLearningSystem';
import CurriculumDashboard from './components/CurriculumDashboard';
import { 
  Trophy, BookOpen, Layers, Flame, Award, HelpCircle, 
  Sparkles, CheckCircle2, MessageSquare, Briefcase, Zap, Globe, Star, Database, Cpu, Compass
} from 'lucide-react';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'prd' | 'architecture' | 'database' | 'frontend' | 'uiux' | 'ai' | 'curriculum' | 'sandbox'>('prd');
  const [activeFeatureTab, setActiveFeatureTab] = useState<string>('vocab');
  
  // Gamified States
  const [xpPoints, setXpPoints] = useState<number>(145);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [showXpCelebration, setShowXpCelebration] = useState<boolean>(false);
  const [addedXPAmount, setAddedXPAmount] = useState<number>(0);

  // Active Motivational Quote State
  const [pmQuotes, setPmQuotes] = useState<string>(
    "Duo says: Great job reading the specs! Click the Active Sandbox tab to test out the actual built modules!"
  );

  const handleEarnXp = (amount: number) => {
    setAddedXPAmount(amount);
    setXpPoints((prev) => prev + amount);
    setShowXpCelebration(true);
    
    // Dynamic motivational quotes triggered on XP increments
    const quotes = [
      "Duo (Duolingo Owl) says: Hoot! That's what I'm talking about! Keep that streak blazing hot! 🦉",
      "Clara (Babbel Lead) says: Excellent accuracy. You are grasping the formal address structures beautifully! 📚",
      "Sofia (Busuu Lead) says: Superb peer progress! This is exactly how we certified 10,000+ EU residents! 🤝",
      "Marcos (Memrise Lead) says: You sound like you belong in Porto! Hear those reduced consonant sounds! 🇵🇹"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setPmQuotes(randomQuote);

    setTimeout(() => {
      setShowXpCelebration(false);
    }, 3000);
  };

  // Auto-switch tab shortcut
  const handleShortcutToSandbox = (featureTab: string) => {
    setActiveFeatureTab(featureTab);
    setActiveMainTab('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPmQuotes(`Sofia (Busuu Lead) says: Welcome to the ${featureTab === 'vocab' ? 'Vocabulary SRS card pack' : featureTab === 'grammar' ? 'Grammar lesson unit' : featureTab === 'listening' ? 'Conversational Listening scenario' : featureTab === 'speaking' ? 'Speaking accent tester' : featureTab === 'reading' ? 'Glossary hover stories' : 'AI Writing Evaluator'} sandbox! Good luck!`);
  };

  return (
    <div className="min-h-screen bg-slate-50/35 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900" id="falar-portugues-main-app">
      
      {/* Top Header & Gamified HUD Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 shadow-xs" id="page-nav-header">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between" id="header-container">
          
          {/* Logo Title */}
          <div className="flex items-center gap-2.5" id="header-logo-group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0" id="logo-icon-box">
              <Globe className="w-5.5 h-5.5" id="logo-icon-svg" />
            </div>
            <div>
              <div className="flex items-center gap-1.5" id="logo-badge-row">
                <h1 className="text-md font-bold text-slate-900 tracking-tight" id="logo-headline">FalarPortuguês</h1>
                <span className="text-[9px] px-1.5 py-0.5 roundedbg-indigo-50 font-bold text-indigo-700 bg-indigo-50 uppercase tracking-wider" id="logo-badge">PT-PT</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium" id="logo-subheading">European Portuguese Learning spec & Hub</p>
            </div>
          </div>

          {/* Gamified Stat HUD HUD Displays */}
          <div className="flex items-center gap-6 text-xs font-semibold shrink-0" id="gamified-stats-hud">
            
            {/* Daily Streak */}
            <div className="flex items-center gap-2 bg-rose-50/50 border border-rose-100 px-3 py-1.5 rounded-xl text-rose-700" id="hud-streak-card">
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" id="streak-flame" />
              <div id="streak-text-block">
                <span className="block text-[10px] text-rose-400 font-bold uppercase leading-none" id="streak-label">Daily Streak</span>
                <span className="text-sm font-extrabold" id="streak-days">{streakDays} Days</span>
              </div>
            </div>

            {/* XP Points */}
            <div className="relative flex items-center gap-2 bg-amber-50/60 border border-amber-100 px-3 py-1.5 rounded-xl text-amber-800" id="hud-xp-card">
              <Trophy className="w-4 h-4 text-amber-500 fill-amber-100" id="xp-trophy" />
              <div id="xp-text-block">
                <span className="block text-[10px] text-amber-500 font-bold uppercase leading-none" id="xp-label">Gamified XP</span>
                <span className="text-sm font-extrabold" id="xp-val">{xpPoints} XP</span>
              </div>

              {/* Float XP Reward bubble */}
              {showXpCelebration && (
                <div className="absolute -top-7 right-0 bg-green-550 bg-green-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow-md animate-bounce flex items-center gap-0.5" id="xp-reward-float-bubble">
                  <Star className="w-3.5 h-3.5 fill-white" id="float-star" />
                  +{addedXPAmount} XP!
                </div>
              )}
            </div>

            {/* CEFR Level rating badge */}
            <div className="hidden md:flex items-center gap-2 bg-indigo-50 border border-indigo-150 px-3 py-1.5 rounded-xl text-indigo-700" id="hud-cefr-card">
              <Award className="w-4 h-4 text-indigo-600" id="cefr-badge" />
              <div id="cefr-text-block">
                <span className="block text-[10px] text-indigo-400 font-bold uppercase leading-none" id="cefr-label">CEFR Rank</span>
                <span className="text-sm font-bold" id="cefr-val">{xpPoints >= 250 ? 'Pre-A2 Exp' : 'A1 Novice'}</span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Hero Header Area */}
      <div className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden" id="hero-under-header">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-4" id="hero-container-box">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider" id="hero-epic-badge">
            <Sparkles className="w-3.5 h-3.5 fill-indigo-300" />
            Unified European Portuguese Product System
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-3xl" id="hero-headline">
            Create an experience that respects <span className="text-indigo-400">regional authenticity</span>.
          </h2>
          <p className="text-xs lg:text-sm text-slate-350 max-w-2xl leading-relaxed text-slate-400" id="hero-desc">
            A comprehensive Product Requirements Document (PRD) co-designed by senior executives from <span className="font-semibold text-slate-100">Duolingo</span>, <span className="font-semibold text-slate-100">Babbel</span>, <span className="font-semibold text-slate-105 text-slate-100">Busuu</span>, and <span className="font-semibold text-slate-100">Memrise</span>. Use the selector below to toggle between reading the rigorous strategic specifications or exploring the fully-functional lesson sandboxes.
          </p>
        </div>
        
        {/* Background ambient accents */}
        <div className="absolute top-1/2 left-[75%] -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" id="bg-spotlight" />
      </div>

      {/* Main Container Core */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 space-y-6 w-full" id="falar-portugues-grid-host">
        
        {/* Motivational PM Character Speech Bubble */}
        <div className="bg-white border-l-[4px] border-amber-400 rounded-2xl p-4 flex gap-3 shadow-xs items-center" id="motivational-bubble-card">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold shrink-0 shadow-xs select-none" id="motivation-avatar">
            💡
          </div>
          <p className="text-xs text-slate-600 font-semibold italic leading-relaxed" id="motivational-quote-text">
            {pmQuotes}
          </p>
        </div>

        {/* Global tab navigation controller */}
        <div className="flex border-b border-slate-200" id="global-tabs-dock">
          <button
            id="main-tab-prd-btn"
            onClick={() => {
              setActiveMainTab('prd');
              setPmQuotes("Duo says: Standard blueprints specify exactly *who* we are designing this for and *why* European grammar differs so drastically. Align yourself below.");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'prd' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" id="main-tab-prd-icon" />
            1. PRD Specifications
          </button>

          <button
            id="main-tab-arch-btn"
            onClick={() => {
              setActiveMainTab('architecture');
              setPmQuotes("Marcos (Memrise Lead) says: Read how we scale to 1M+ active users! PostgreSQL DDL syntax, micro-structured caching, and REST endpoints are designed cleanly below!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'architecture' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-500" id="main-tab-arch-icon" />
            2. Technical Architecture
          </button>

          <button
            id="main-tab-db-btn"
            onClick={() => {
              setActiveMainTab('database');
              setPmQuotes("Sophia (Systems Architect) says: Here is our production-ready PostgreSQL 16 database scheme! Check our partitioning, Redis cache TTL limits, and raw tables specs!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'database' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-indigo-500" id="main-tab-db-icon" />
            3. Database Architecture
          </button>

          <button
            id="main-tab-fe-btn"
            onClick={() => {
              setActiveMainTab('frontend');
              setPmQuotes("Clara (Next.js Architect) says: Check out our modular Next.js 15 folder structures, Zustand state models, dynamic forms, and offline client-sync PWA engines!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'frontend' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-500" id="main-tab-fe-icon" />
            4. Frontend Architecture
          </button>

          <button
            id="main-tab-uiux-btn"
            onClick={() => {
              setActiveMainTab('uiux');
              setPmQuotes("Rita (Duolingo Design Director) says: Feel the palette's warmth! Our Lisbon Amber and Monumental Indigo swatches are fully WCAG AA contrast compliant!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'uiux' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500" id="main-tab-uiux-icon" />
            5. UI/UX Design System
          </button>

          <button
            id="main-tab-ai-btn"
            onClick={() => {
              setActiveMainTab('ai');
              setPmQuotes("Dr. Eduardo (Head of Language Science) says: Live phonetic mapping active! Drag Scorer sliders to see standard Lisbon vocal reductions computed!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'ai' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4 text-indigo-500" id="main-tab-ai-icon" />
            6. AI Learning System
          </button>

          <button
            id="main-tab-curriculum-btn"
            onClick={() => {
              setActiveMainTab('curriculum');
              setPmQuotes("Professor Marcos says: A1-C2 syllabus mapping loaded! Filter Lexicon terms or complete custom Syntactic Sandboxes!");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'curriculum' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-500" id="main-tab-curriculum-icon" />
            7. Cognitive Curriculum Map (A1-C2)
          </button>
          
          <button
            id="main-tab-sandbox-btn"
            onClick={() => {
              setActiveMainTab('sandbox');
              setPmQuotes("Clara (Babbel Lead) says: Welcome to the Sandbox! This is an active test bed representing our co-designed software solutions. Select any learning modality below.");
            }}
            className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeMainTab === 'sandbox' 
                ? 'border-indigo-600 text-indigo-700 font-extrabold' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" id="main-tab-sandbox-icon" />
            8. Active Sandbox Playground
          </button>
        </div>

        {/* Workspace Display Area */}
        <div className="py-2" id="workspace-content-host">
          {activeMainTab === 'prd' ? (
            <PrdContainer onGoToSandbox={handleShortcutToSandbox} />
          ) : activeMainTab === 'architecture' ? (
            <TechArchitecture />
          ) : activeMainTab === 'database' ? (
            <DatabaseArchitecture />
          ) : activeMainTab === 'frontend' ? (
            <FrontendArchitecture />
          ) : activeMainTab === 'uiux' ? (
            <UiUxDesignSystem />
          ) : activeMainTab === 'ai' ? (
            <AiLearningSystem />
          ) : activeMainTab === 'curriculum' ? (
            <CurriculumDashboard />
          ) : (
            <SandboxContainer 
              onEarnXp={handleEarnXp} 
              activeFeatureTab={activeFeatureTab} 
              setActiveFeatureTab={setActiveFeatureTab} 
            />
          )}
        </div>

      </main>

      {/* Footer Banner */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-400 mt-12" id="hub-footer">
        <div className="max-w-3xl mx-auto px-4 space-y-3" id="footer-inner">
          <p className="font-semibold text-slate-600" id="footer-header">
            FalarPortuguês Language Hub Specs
          </p>
          <p id="footer-body">
            This workspace prototype is tailored for European Portuguese regional characteristics (PT-PT), addressing constraints defined in the Orthographic Agreement. Designed by a collaborative committee of senior PM managers from Duolingo, Babbel, Busuu, and Memrise, incorporating standard speech synthesis protocols.
          </p>
          <div className="text-[10px] font-mono text-slate-300 pt-1" id="footer-meta">
            AI Studio Build Workspace · Running server instance Port 3000
          </div>
        </div>
      </footer>

    </div>
  );
}
