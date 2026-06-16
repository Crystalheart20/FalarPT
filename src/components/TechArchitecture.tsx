/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { architectureSections, highLevelDiagram, ArchitectureSection } from '../architectureData';
import { 
  ShieldCheck, Layers, Cpu, Trophy, Database, Server, Key, Flame, Zap, 
  HelpCircle, Copy, Check, DollarSign, Cloud, Compass
} from 'lucide-react';

export default function TechArchitecture() {
  const [activeSectionId, setActiveSectionId] = useState<string>(architectureSections[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeSection = architectureSections.find(s => s.id === activeSectionId) || architectureSections[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case 'auth_user':
        return <ShieldCheck className="w-5 h-5 text-indigo-500" />;
      case 'lessons_course_cms':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'ai_tutor_speaking':
        return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'gamification_tracking':
        return <Trophy className="w-5 h-5 text-rose-500" />;
      case 'billing_ops_infra':
        return <Cloud className="w-5 h-5 text-blue-500" />;
      default:
        return <Server className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8" id="tech-architecture-root">
      
      {/* Intro Stats Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white space-y-6" id="architecture-hero">
        <div className="flex flex-wrap items-center gap-2" id="hero-badge-row">
          <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Principal Architect Specs
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Scale: 1,000,000+ Concurrent
          </span>
        </div>

        <div className="space-y-3" id="hero-intro-text">
          <h2 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-400" id="compass" />
            Core Enterprise System Architecture
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl font-medium">
            This technical blueprint outlines the distributed system topology, persistent storage engines, and edge-caching patterns co-designed for the European Portuguese learning hub. Our design emphasizes low-latency real-time voice analysis, Duolingo-style streak compliance, and high availability hosting configurations.
          </p>
        </div>

        {/* Global Scalability Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800" id="scaling-matrix-grid">
          <div className="space-y-1" id="stat-latency">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Global p95 Latency</span>
            <p className="font-mono text-lg font-bold text-indigo-300">&lt; 150ms</p>
          </div>
          <div className="space-y-1" id="stat-reads">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Edge Hit Optimization</span>
            <p className="font-mono text-lg font-bold text-emerald-300">92% Cache Hit</p>
          </div>
          <div className="space-y-1" id="stat-ai">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Speech Processing Loop</span>
            <p className="font-mono text-lg font-bold text-amber-300">&lt; 850ms</p>
          </div>
          <div className="space-y-1" id="stat-uptime">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Target SLAs</span>
            <p className="font-mono text-lg font-bold text-rose-300">99.99% Availability</p>
          </div>
        </div>
      </div>

      {/* High-Level Architecture Abstract Text Diagram */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 lg:p-6 space-y-4" id="high-level-diagram-card">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3" id="diagram-header">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" id="zap-icon" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest leading-none">
              High-Level Topology Vector Map
            </h3>
          </div>
          <button 
            id="copy-diagram-btn"
            onClick={() => handleCopy(highLevelDiagram, 'diagram')}
            className="text-[10px] bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-350 hover:text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedText === 'diagram' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied ASCII!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Topology ASCII
              </>
            )}
          </button>
        </div>
        <pre className="font-mono text-[9px] md:text-[10px] text-indigo-300 overflow-x-auto leading-normal bg-slate-900/40 p-4 rounded-xl border border-slate-900/60 scrollbar-thin select-all">
          {highLevelDiagram}
        </pre>
      </div>

      {/* Main Structural Breakdown Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="architecture-split-scaffold">
        
        {/* Sidebar: Navigation lists */}
        <div className="lg:col-span-4 space-y-4" id="architecture-sidebar">
          
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2" id="modules-selection-card">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5" id="nav-header">
              Architecture Sub-domains
            </h4>
            {architectureSections.map((sec) => (
              <button
                key={sec.id}
                id={`arch-btn-${sec.id}`}
                onClick={() => {
                  setActiveSectionId(sec.id);
                  setCopiedText(null);
                }}
                className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-3 ${
                  activeSectionId === sec.id 
                    ? 'bg-indigo-50/50 border-indigo-200 text-slate-900 font-medium' 
                    : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="shrink-0 mt-0.5" id={`arch-icon-${sec.id}`}>
                  {getSectionIcon(sec.id)}
                </div>
                <div>
                  <h5 className="text-xs font-bold tracking-tight text-slate-800" id={`arch-title-${sec.id}`}>
                    {sec.title}
                  </h5>
                  <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px]" id={`arch-sub-${sec.id}`}>
                    {sec.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* PM Operations Advice box */}
          <div className="bg-indigo-50/40 border border-indigo-100 p-4 rounded-2xl space-y-2" id="co-designary-credit">
            <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider block">Scale Audit Summary</span>
            <p className="text-xs text-slate-600 leading-normal font-medium">
              "To maintain our budget constraints under 1 million active learners, we utilize edge cache networks to process static translation cards, saving precious computing enclaves for custom speech synthesis analyses."
            </p>
            <span className="block text-[10px] text-slate-400 italic">
              — Sofia Morel, Senior VP of Systems and Delivery
            </span>
          </div>

        </div>

        {/* Content Container Area */}
        <div className="lg:col-span-8 space-y-6" id="architecture-main-content">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 space-y-6" id="selected-module-card">
            
            {/* Header section */}
            <div className="border-b border-slate-100 pb-5 space-y-1.5" id="selected-module-header">
              <span className="bg-slate-100 text-slate-600 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" id="category-tag">
                System Schema
              </span>
              <h2 className="text-lg lg:text-xl font-black tracking-tight text-slate-800" id="category-title">
                {activeSection.title}
              </h2>
              <p className="text-xs text-slate-500 font-medium italic" id="category-subtitle">
                {activeSection.subtitle}
              </p>
            </div>

            {/* Core Summary Paragraph */}
            <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-slate-50 p-4 rounded-xl border border-slate-150" id="category-summary">
              {activeSection.summary}
            </p>

            {/* In-depth bullet points */}
            <div className="space-y-3" id="category-details-list">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider" id="milestones-heading">
                Operational Implementation Details
              </h4>
              <ul className="space-y-2.5" id="details-scroller">
                {activeSection.details.map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-600 leading-relaxed flex gap-2.5 items-start" id={`detail-item-${idx}`}>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-1.5" id={`bullet-${idx}`} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Database schema layout */}
            {activeSection.dbSchema && (
              <div className="space-y-3" id="category-database-block">
                <div className="flex justify-between items-center" id="db-header-row">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5" id="db-heading">
                    <Database className="w-4 h-4 text-indigo-500" />
                    DDL Schema Architecture (PostgreSQL)
                  </h4>
                  <button 
                    id="copy-schema-btn"
                    onClick={() => handleCopy(activeSection.dbSchema || '', 'schema')}
                    className="text-[10px] text-indigo-650 hover:text-indigo-850 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText === 'schema' ? 'Copied Code!' : 'Copy SQL Schema'}
                  </button>
                </div>
                <pre className="font-mono text-[10px] text-slate-200 bg-slate-900 leading-relaxed p-4 rounded-2xl border border-slate-800 overflow-x-auto select-all scrollbar-thin">
                  {activeSection.dbSchema.trim()}
                </pre>
              </div>
            )}

            {/* API Endpoints */}
            {activeSection.apiEndpoints && (
              <div className="space-y-3" id="category-api-block">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5" id="api-heading">
                  <Server className="w-4 h-4 text-emerald-500" />
                  REST API Endpoints Specification
                </h4>
                <div className="space-y-2" id="endpoints-list">
                  {activeSection.apiEndpoints.map((ep, idx) => {
                    const [method, path] = ep.split(' - ');
                    const isPostOrPut = method.startsWith('POST') || method.startsWith('PUT') || method.startsWith('DELETE');
                    return (
                      <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl space-y-1.5" id={`api-item-${idx}`}>
                        <div className="flex items-center gap-2" id={`api-method-row-${idx}`}>
                          <span className={`font-mono text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            isPostOrPut ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`} id={`badge-method-${idx}`}>
                            {method}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-505 text-slate-600 leading-relaxed font-semibold italic" id={`desc-ep-${idx}`}>
                          {path}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PM Insights */}
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-150 grid grid-cols-1 md:grid-cols-2 gap-4" id="category-insights-matrix">
              <div className="space-y-1" id="architect-box">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1" id="arch-lbl">
                  <Key className="w-3.5 h-3.5 text-indigo-500" />
                  Security Isolation Advice
                </span>
                <p className="text-[11px] text-slate-600 leading-normal" id="arch-val">
                  {activeSection.pmInsights.architectNote}
                </p>
              </div>
              <div className="space-y-1" id="scale-box">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1" id="scale-lbl">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  1M user scaling dynamic
                </span>
                <p className="text-[11px] text-slate-600 leading-normal" id="scale-val">
                  {activeSection.pmInsights.scalabilityFactor}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
