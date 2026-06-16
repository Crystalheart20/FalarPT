/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { prdSections } from '../prdData';
import { PRDSection, PRDComment } from '../types';
import { 
  Users, Briefcase, Layers, Cpu, CheckSquare, MessageSquare, 
  ChevronRight, Award, Plus, Send, Zap, Star, ShieldCheck
} from 'lucide-react';

interface PrdContainerProps {
  onGoToSandbox: (featureTab: string) => void;
}

export default function PrdContainer({ onGoToSandbox }: PrdContainerProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>('executive_summary');
  const [commentsState, setCommentsState] = useState<Record<string, PRDComment[]>>(
    prdSections.reduce((acc, curr) => {
      acc[curr.id] = curr.comments;
      return acc;
    }, {} as Record<string, PRDComment[]>)
  );
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [activePmFilter, setActivePmFilter] = useState<string>('All');

  // Sliders for Mock KPIs
  const [gamificationWeight, setGamificationWeight] = useState<number>(60);
  const [pedagogyWeight, setPedagogyWeight] = useState<number>(75);

  const activeSection = prdSections.find(s => s.id === activeSectionId) || prdSections[0];

  const handleAddComment = (sectionId: string) => {
    if (!newCommentText.trim()) return;
    const authorComment: PRDComment = {
      pm: 'Busuu', // Styled as User Product Director
      author: 'You (Project Director)',
      avatarColor: 'bg-rose-500',
      comment: newCommentText.trim(),
      timestamp: 'Just now'
    };
    setCommentsState({
      ...commentsState,
      [sectionId]: [...commentsState[sectionId], authorComment]
    });
    setNewCommentText('');
  };

  // Get icons by title
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-indigo-600" id="icon-briefcase" />;
      case 'Users': return <Users className="w-5 h-5 text-violet-600" id="icon-users" />;
      case 'Layers': return <Layers className="w-5 h-5 text-amber-600" id="icon-layers" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600" id="icon-cpu" />;
      default: return <Briefcase className="w-5 h-5 text-gray-600" id="icon-default" />;
    }
  };

  // PM Panel information
  const pmProfiles = [
    { name: 'Duo the Owl', company: 'Duolingo', title: 'Senior VP Engagement', color: 'bg-green-500', quote: 'Make it a game with streaks!' },
    { name: 'Clara Schmidt', company: 'Babbel', title: 'Pedagogical Lead', color: 'bg-sky-600', quote: 'Accuracy and context above all.' },
    { name: 'Sofia Morel', company: 'Busuu', title: 'Social Learning VP', color: 'bg-indigo-600', quote: 'Native peer-to-peer feedback.' },
    { name: 'Marcos Silva', company: 'Memrise', title: 'Localization Director', color: 'bg-amber-500', quote: 'Real native pronunciation.' }
  ];

  // Dynamic KPI estimation based on sliders
  const estimatedD1Retention = Math.min(95, Math.round(50 + (gamificationWeight * 0.3) + (pedagogyWeight * 0.15)));
  const estimatedA2Completion = Math.min(85, Math.round(35 + (pedagogyWeight * 0.4) + (gamificationWeight * 0.1)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="prd-explorer-root">
      {/* Sidebar: PM Panel & KPIs */}
      <div className="lg:col-span-4 space-y-6" id="prd-sidebar">
        {/* PM Committee */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm" id="pm-committee-cabinet">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4" id="pm-header-label">
            Active PM Committee
          </h2>
          <div className="space-y-4" id="pm-committee-list">
            {pmProfiles.map((pm) => (
              <div key={pm.name} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors" id={`pm-card-${pm.company.toLowerCase()}`}>
                <div className={`w-10 h-10 rounded-full ${pm.color} flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0`} id={`pm-avatar-${pm.company.toLowerCase()}`}>
                  {pm.name[0]}
                </div>
                <div id={`pm-meta-${pm.company.toLowerCase()}`}>
                  <div className="flex items-center gap-2" id={`pm-meta-header-${pm.company.toLowerCase()}`}>
                    <span className="font-semibold text-slate-800 text-sm" id={`pm-name-${pm.company.toLowerCase()}`}>{pm.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600" id={`pm-company-${pm.company.toLowerCase()}`}>
                      {pm.company}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500" id={`pm-title-${pm.company.toLowerCase()}`}>{pm.title}</p>
                  <p className="text-xs italic text-slate-400 mt-1" id={`pm-quote-${pm.company.toLowerCase()}`}>"{pm.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Project KPI Simulator */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-5" id="kpi-simulator-panel">
          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400" id="kpi-title-label">
              Project KPI Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-1" id="kpi-desc">
              Adjust strategy dials to re-project first-quarter performance outcomes.
            </p>
          </div>

          <div className="space-y-4" id="kpi-sliders">
            <div id="slider-gamification-container">
              <div className="flex justify-between text-xs mb-1" id="slider-gamification-labels">
                <span className="font-medium text-slate-700" id="label-gamification">Gamification Loops (Streaks, XP)</span>
                <span className="text-indigo-600 font-semibold" id="val-gamification">{gamificationWeight}%</span>
              </div>
              <input 
                id="input-gamification-slider"
                type="range" 
                min="20" 
                max="100" 
                value={gamificationWeight}
                onChange={(e) => setGamificationWeight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div id="slider-pedagogy-container">
              <div className="flex justify-between text-xs mb-1" id="slider-pedagogy-labels">
                <span className="font-medium text-slate-700" id="label-pedagogy">Academic Focus (Clitics, CEFR)</span>
                <span className="text-indigo-600 font-semibold" id="val-pedagogy">{pedagogyWeight}%</span>
              </div>
              <input 
                id="input-pedagogy-slider"
                type="range" 
                min="20" 
                max="100" 
                value={pedagogyWeight}
                onChange={(e) => setPedagogyWeight(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50" id="kpi-metrics-grid">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100" id="kpi-retention-card">
              <span className="text-[11px] text-slate-500 font-medium block" id="kpi-retention-label">D1 Retention</span>
              <span className="text-xl font-bold text-slate-800" id="kpi-retention-val">{estimatedD1Retention}%</span>
              <div className="flex items-center gap-1 mt-1" id="kpi-retention-trend">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" id="trend-icon-1" />
                <span className="text-[9px] text-slate-400 font-medium" id="trend-label-1">Engagement driven</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100" id="kpi-ciple-card">
              <span className="text-[11px] text-slate-500 font-medium block" id="kpi-ciple-label">A2 Pass Rate</span>
              <span className="text-xl font-bold text-indigo-600" id="kpi-ciple-val">{estimatedA2Completion}%</span>
              <div className="flex items-center gap-1 mt-1" id="kpi-ciple-trend">
                <Award className="w-3.5 h-3.5 text-indigo-500" id="trend-icon-2" />
                <span className="text-[9px] text-slate-400 font-medium" id="trend-label-2">CEFR aligned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Panel: PRD Sections & Discussion Thread */}
      <div className="lg:col-span-8 space-y-6" id="prd-main-content">
        {/* Section Navigation Tabs */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-2" id="prd-section-tabs">
          {prdSections.map((section) => (
            <button
              key={section.id}
              id={`tab-btn-${section.id}`}
              onClick={() => {
                setActiveSectionId(section.id);
                setNewCommentText('');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeSectionId === section.id 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={activeSectionId === section.id ? 'text-white' : ''} id={`tab-icon-${section.id}`}>
                {getIcon(section.icon)}
              </span>
              <span id={`tab-title-${section.id}`}>{section.id === 'executive_summary' ? '1. Summary' : section.id === 'target_audiences' ? '2. Personas' : section.id === 'feature_framework' ? '3. Pillars' : '4. AI Architecture'}</span>
            </button>
          ))}
        </div>

        {/* Selected Section Detail Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 space-y-6" id="active-prd-section-card">
          <div className="flex items-start justify-between gap-4 border-b border-slate-50 pb-5" id="section-card-header">
            <div id="section-title-block">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1.5" id="section-meta-badge">
                {getIcon(activeSection.icon)}
                <span id="active-section-subtitle">European Portuguese Blueprint Specs</span>
              </div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight" id="active-section-title">
                {activeSection.title}
              </h1>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100 shrink-0" id="prd-rev-badge">
              v1.2 Approved
            </span>
          </div>

          {/* Section Summary */}
          <div className="bg-slate-50 p-4.5 rounded-2xl border-l-[4px] border-indigo-500" id="section-summary-container">
            <h3 className="font-bold text-slate-800 text-sm mb-1" id="summary-headline">Contextual Focus</h3>
            <p className="text-xs text-slate-600 leading-relaxed" id="summary-body-text">
              {activeSection.summary}
            </p>
          </div>

          {/* Specifications list */}
          <div className="space-y-4" id="section-spec-list">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400" id="spec-headline">
              Product Requirements & Specifications
            </h3>
            <div className="space-y-3" id="spec-items-container">
              {activeSection.details.map((detail, index) => (
                <div key={index} className="flex gap-3 items-start bg-slate-50/50 p-4 rounded-xl border border-slate-100" id={`spec-card-${index}`}>
                  <div className="w-5 h-5 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" id={`spec-num-${index}`}>
                    {index + 1}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed" id={`spec-text-${index}`}>
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Sandbox Links if Framework-tab is active */}
          {activeSection.id === 'feature_framework' && (
            <div className="mt-8 bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100/50 space-y-4" id="sandbox-features-shortcut">
              <div>
                <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5" id="sandbox-shortcut-title">
                  <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" id="star-icon" />
                  Experience the Living Blueprint Specs
                </h4>
                <p className="text-xs text-indigo-700/85 mt-1" id="sandbox-shortcut-desc">
                  This PRD includes a fully-functional implementation of each learning engine requested. Click below to load into the active testing sandbox:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="sandbox-shortcut-grid">
                {[
                  { label: 'Vocabulary SRS', tab: 'vocab' },
                  { label: 'Grammar Drills', tab: 'grammar' },
                  { label: 'Listening Dialogue', tab: 'listening' },
                  { label: 'Reading Library', tab: 'reading' },
                  { label: 'AI Writing Studio', tab: 'writing' }
                ].map((item) => (
                  <button
                    key={item.tab}
                    id={`shortcut-btn-${item.tab}`}
                    onClick={() => onGoToSandbox(item.tab)}
                    className="bg-white hover:bg-indigo-600 hover:text-white border border-indigo-100 hover:border-indigo-600 transition-all duration-200 text-indigo-700 px-3 py-2 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1 group shadow-sm cursor-pointer"
                  >
                    <span id={`shortcut-label-${item.tab}`}>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-indigo-400 group-hover:text-white" id={`arrow-${item.tab}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRD PM Alignment Matrix */}
          <div className="pt-6 border-t border-slate-50" id="alignment-matrix-panel">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-400 mb-4" id="alignment-header">
              Senior PM Alignment Perspectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="alignment-grid">
              <div className="p-4 bg-green-50/40 rounded-2xl border border-green-100/50 space-y-1.5" id="alignment-card-duo">
                <span className="text-[10px] uppercase font-bold text-green-700 block" id="alignment-brand-duo">Duolingo Strategy</span>
                <p className="text-xs text-green-900/80 leading-relaxed" id="alignment-insight-duo">
                  {activeSection.pmInsights.gamification}
                </p>
              </div>
              <div className="p-4 bg-sky-50/40 rounded-2xl border border-sky-100/50 space-y-1.5" id="alignment-card-clara">
                <span className="text-[10px] uppercase font-bold text-sky-700 block" id="alignment-brand-clara">Babbel Curriculum</span>
                <p className="text-xs text-sky-900/80 leading-relaxed" id="alignment-insight-clara">
                  {activeSection.pmInsights.pedagogy}
                </p>
              </div>
              <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/50 space-y-1.5" id="alignment-card-sofia">
                <span className="text-[10px] uppercase font-bold text-indigo-700 block" id="alignment-brand-sofia">Busuu Assessment</span>
                <p className="text-xs text-indigo-900/80 leading-relaxed" id="alignment-insight-sofia">
                  {activeSection.pmInsights.community}
                </p>
              </div>
              <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100/50 space-y-1.5" id="alignment-card-marcos">
                <span className="text-[10px] uppercase font-bold text-amber-700 block" id="alignment-brand-marcos">Memrise Immersion</span>
                <p className="text-xs text-amber-900/80 leading-relaxed" id="alignment-insight-marcos">
                  {activeSection.pmInsights.multimedia}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Interactive Comment Thread */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6" id="comments-thread-panel">
          <div className="flex items-center gap-2 mb-6" id="comments-header">
            <MessageSquare className="w-5 h-5 text-slate-500" id="comments-icon" />
            <h3 className="font-bold text-slate-800 text-sm" id="comments-title">
              PRD Review Committee Debate
            </h3>
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold" id="comments-count">
              {commentsState[activeSection.id]?.length || 0}
            </span>
          </div>

          <div className="space-y-4 mb-6 max-h-[380px] overflow-y-auto pr-1" id="comments-container-scroller">
            {commentsState[activeSection.id]?.map((comment, index) => (
              <div key={index} className="flex gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-100" id={`comment-card-${index}`}>
                <div className={`w-9 h-9 rounded-full ${comment.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`} id={`comment-avatar-${index}`}>
                  {comment.author[0]}
                </div>
                <div className="space-y-1 w-full" id={`comment-block-${index}`}>
                  <div className="flex items-center justify-between" id={`comment-meta-${index}`}>
                    <span className="font-semibold text-slate-800 text-xs" id={`comment-author-${index}`}>{comment.author}</span>
                    <span className="text-[10px] text-slate-400 font-mono" id={`comment-time-${index}`}>{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed" id={`comment-body-${index}`}>
                    {comment.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add feedback to Spec */}
          <div className="flex gap-2.5 items-end pt-4 border-t border-slate-50" id="comment-input-area">
            <div className="flex-1" id="input-container">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5" id="input-label">
                Annotate this PRD Section
              </label>
              <textarea
                id="comment-textarea"
                rows={2}
                placeholder="Suggest modifications, request features or note technical constraints..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full text-xs p-3 border border-slate-100 bg-slate-50/50 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors placeholder:text-slate-400 leading-relaxed resize-none"
              />
            </div>
            <button
              id="comment-submit-btn"
              onClick={() => handleAddComment(activeSection.id)}
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white p-3 rounded-xl flex items-center justify-center shadow-xs focus:ring-2 focus:ring-indigo-500/20 cursor-pointer text-xs font-semibold gap-1.5 h-[42px] mb-[1px]"
            >
              <Send className="w-3.5 h-3.5" id="send-vector-icon" />
              <span id="send-label">Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
