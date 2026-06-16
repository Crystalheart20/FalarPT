/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  projectFolderStructure, routeLibrary, componentLibrary, 
  i18nImplementationExample, apiLayerExample, 
  stateZustandExample, formZodExample, offlinePwaStrategy, 
  performanceStrategyList, securityStrategyList 
} from '../frontendArchitectureData';
import { 
  Layers, ChevronRight, FolderTree, Compass, LayoutGrid, CheckSquare, 
  BookOpen, Code2, Globe2, Wifi, Zap, Lock, Copy, Check, Info, FileCode, Users
} from 'lucide-react';

export default function FrontendArchitecture() {
  const [activeSpecSection, setActiveSpecSection] = useState<'folders' | 'routing' | 'components' | 'state' | 'forms' | 'i18n' | 'offline'>('folders');
  const [componentCategoryFilter, setComponentCategoryFilter] = useState<'All' | 'Layout' | 'Learning' | 'Gamification' | 'AI'>('All');
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  const filteredComponents = componentCategoryFilter === 'All'
    ? componentLibrary
    : componentLibrary.filter(c => c.category === componentCategoryFilter);

  return (
    <div className="space-y-8 animate-fadeIn" id="frontend-arch-root">
      
      {/* Prime Header intro banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white space-y-5" id="frontend-arch-banner">
        <div className="flex flex-wrap items-center gap-2" id="fe-badge-row">
          <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Principal Frontend Architect Spec
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Next.js 15 Standalone Bundle
          </span>
        </div>

        <div className="space-y-3" id="fe-headline-block">
          <h2 className="text-xl lg:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-400" />
            European Portuguese Learning Hub Frontend System Architecture
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl font-medium">
            Next-generation learning stack micro-engineered for Duolingo-grade engagement and Spotify-grade audio responsiveness. Configured entirely on Next.js 15 App router structure, optimized with PWA service worker caching layers, Zustand global states, robust TanStack Query server queries, and fully typed TypeScript endpoints.
          </p>
        </div>

        {/* Technical Stack Metrics Card Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800" id="fe-metrics-grid">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Meta-Framework API</span>
            <p className="font-mono text-base font-bold text-white">Next.js 15 (App Router)</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Local State Store</span>
            <p className="font-mono text-base font-bold text-indigo-300">Zustand 5.0 + IDB</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Data Invalidation</span>
            <p className="font-mono text-base font-bold text-emerald-300">TanStack Query v5</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Offline Interception</span>
            <p className="font-mono text-base font-bold text-amber-300">PWA Service Worker</p>
          </div>
        </div>
      </div>

      {/* Interactive spec navigation hubs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2" id="fe-tab-navs">
        {[
          { id: 'folders', label: '1. Project Treemap', icon: FolderTree },
          { id: 'routing', label: '2. Routing Matrix', icon: Compass },
          { id: 'components', label: '3. Web Component Library', icon: LayoutGrid },
          { id: 'state', label: '4. Zustand Stores', icon: Code2 },
          { id: 'forms', label: '5. Zod Form Rules', icon: CheckSquare },
          { id: 'i18n', label: '6. Global Locales (i18n)', icon: Globe2 },
          { id: 'offline', label: '7. Offline PWA Specs', icon: Wifi },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSpecSection(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSpecSection === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'bg-white hover:bg-slate-100/80 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active specs renderer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="fe-interactive-body">
        
        {/* Main interactive segment (8 columns) */}
        <div className="lg:col-span-8 space-y-6" id="fe-main-segment">
          
          {/* FOLDER STRUCTURE TREEMAP */}
          {activeSpecSection === 'folders' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="folder-spec-container">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Production Directory Layout</h3>
                  <p className="text-[11px] text-slate-500">Modular design cleanly isolating shared components, local state domains, and routes.</p>
                </div>
                <button
                  onClick={() => handleCopyText(projectFolderStructure, 'folder-tree')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLabel === 'folder-tree' ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Tree</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy tree</>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="font-mono text-xs text-indigo-900 bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100 max-h-[500px] overflow-y-auto scrollbar-thin select-all">
                  {projectFolderStructure}
                </pre>
              </div>
            </div>
          )}

          {/* NEXT.JS ROUTING SPEC MATRIX */}
          {activeSpecSection === 'routing' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="routing-spec-container">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Unified Routing Specs & Middleware Controls</h3>
                <p className="text-[11px] text-slate-500">How paths are secured, cached, and rendered within our edge-native framework.</p>
              </div>

              <div className="overflow-x-auto" id="routing-table-host">
                <table className="w-full text-xs text-left text-slate-500 border-collapse">
                  <thead className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-550 bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 font-extrabold">Route Path</th>
                      <th className="px-4 py-3 font-extrabold">Access Type</th>
                      <th className="px-4 py-3 font-extrabold">Functional Mandate</th>
                      <th className="px-4 py-3 font-extrabold">Caching Protocol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routeLibrary.map((route, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/40">
                        <td className="px-4 py-3 font-mono text-indigo-700 font-bold whitespace-nowrap">{route.path}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            route.type === 'Public' 
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                              : route.type === 'Protected'
                              ? 'bg-indigo-50 border border-indigo-250 text-indigo-800'
                              : 'bg-rose-50 border border-rose-220 text-rose-800'
                          }`}>
                            {route.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 leading-normal">{route.purpose}</td>
                        <td className="px-4 py-3 text-slate-500 italic font-mono text-[10px]">{route.caching}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADVANCED COMPONENT ARCHITECTURE SPEC SHEET */}
          {activeSpecSection === 'components' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5" id="components-spec-container">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Component Architecture Matrix</h3>
                  <p className="text-[11px] text-slate-500">Atomic structure spec including client-states, props definitions, and native accessibility targets.</p>
                </div>

                {/* Sub filter bar */}
                <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200/65 p-1 rounded-xl">
                  {['All', 'Layout', 'Learning', 'Gamification', 'AI'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setComponentCategoryFilter(cat as any)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                        componentCategoryFilter === cat
                          ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specs rendering block */}
              <div className="grid grid-cols-1 gap-4" id="component-spec-grid">
                {filteredComponents.map((comp, idx) => (
                  <div key={idx} className="border border-slate-150/70 rounded-2xl p-4 bg-slate-50/20 hover:border-indigo-200 transition-colors space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[9px] bg-indigo-50 border border-indigo-150 text-indigo-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {comp.category} Module
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-900 mt-1">{comp.name}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 italic font-medium">{comp.purpose}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">Props Interface (TS)</span>
                        <pre className="font-mono text-[10px] bg-slate-950 text-slate-200 p-2.5 rounded-xl block overflow-x-auto leading-relaxed">
                          {comp.props}
                        </pre>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase">Component Local States</span>
                        <pre className="font-mono text-[10px] bg-slate-950 text-slate-200 p-2.5 rounded-xl block overflow-x-auto leading-relaxed">
                          {comp.state}
                        </pre>
                      </div>
                    </div>

                    <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-xl p-3 flex gap-2 items-start mt-2">
                      <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="text-[11px] text-slate-600 font-medium">
                        <strong className="text-indigo-850 block mb-0.5">Accessibility Requirement (a11y)</strong>
                        {comp.accessibility}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATE ZUSTAND BLUEPRINTS */}
          {activeSpecSection === 'state' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="zustand-spec-container">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Zustand Client State Manager Engine</h3>
                  <p className="text-[11px] text-slate-500">Reactive learning-store layout configured with standard IndexedDB local storage offline fallback.</p>
                </div>
                <button
                  onClick={() => handleCopyText(stateZustandExample, 'zustand')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLabel === 'zustand' ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Code</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Code</>
                  )}
                </button>
              </div>

              <pre className="font-mono text-[10px] md:text-[11px] bg-slate-950 text-emerald-350 p-4 rounded-xl block overflow-x-auto leading-relaxed select-all">
                {stateZustandExample}
              </pre>
            </div>
          )}

          {/* DYNAMIC FORMS & ZOD RULES */}
          {activeSpecSection === 'forms' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="zod-spec-container">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Goal Setter Validation & Hooks Form Blueprint</h3>
                  <p className="text-[11px] text-slate-500">Safely restricting input boundaries, verifying CEFR tags, and handling async form feedback.</p>
                </div>
                <button
                  onClick={() => handleCopyText(formZodExample, 'zod-form')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLabel === 'zod-form' ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Form</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Snippet</>
                  )}
                </button>
              </div>

              <pre className="font-mono text-[10px] md:text-[11px] bg-slate-950 text-emerald-350 p-4 rounded-xl block overflow-x-auto leading-relaxed select-all">
                {formZodExample}
              </pre>
            </div>
          )}

          {/* MULTI-LANGUAGE Locales */}
          {activeSpecSection === 'i18n' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="i18n-spec-container">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">I18n Next-Intl Setup & Schema</h3>
                  <p className="text-[11px] text-slate-500">Dynamic routing parameters mapping target dictionaries asynchronously during server side compilations.</p>
                </div>
                <button
                  onClick={() => handleCopyText(i18nImplementationExample, 'i18n')}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedLabel === 'i18n' ? (
                    <><Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Setup</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy Setup</>
                  )}
                </button>
              </div>

              <pre className="font-mono text-[10px] md:text-[11px] bg-slate-950 text-emerald-350 p-4 rounded-xl block overflow-x-auto leading-relaxed select-all">
                {i18nImplementationExample}
              </pre>
            </div>
          )}

          {/* PWA & OFFLINE COOPERATIVE SYNC */}
          {activeSpecSection === 'offline' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4" id="offline-spec-container">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Offline Progressive Web App Sync Blueprint</h3>
                <p className="text-[11px] text-slate-500">Coordinating offline media storage, service workers cache hooks, and IndexedDB sync events.</p>
              </div>

              <div className="space-y-3 select-all">
                <pre className="font-mono text-xs bg-slate-950 text-emerald-300 p-5 rounded-2xl leading-normal border border-slate-800 whitespace-pre-wrap">
                  {offlinePwaStrategy}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Side panels (4 columns) - Universal checklists, bundle strategies, metrics */}
        <div className="lg:col-span-4 space-y-6" id="fe-side-panels">
          
          {/* API QUERY INTEGRATION LAYER RULES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3" id="api-side-panel">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-500" />
              API Fetch & TanStack Query Layer
            </h4>
            <div className="text-[11px] text-slate-600 leading-normal space-y-2">
              <p>
                Our query system relies on **Axios intercepters** to append credentials and coordinates secure requests:
              </p>
              <pre className="text-[9px] bg-slate-950 text-slate-200 p-3 rounded-lg overflow-x-auto font-mono max-h-56">
                {apiLayerExample}
              </pre>
            </div>
          </div>

          {/* WEB PERFORMANCE CORE TARGETS */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900/95 border border-slate-800 text-white rounded-2xl p-4 space-y-3" id="perf-side-panel">
            <h4 className="text-xs font-black uppercase tracking-wider text-indigo-350 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-100" />
              Lighthouse 95+ Bundle Optimization Checklist
            </h4>
            <ul className="text-[11px] text-slate-300 space-y-2.5">
              {performanceStrategyList.map((item, id) => (
                <li key={id} className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECURITY HEADERS PROTOCOL */}
          <div className="bg-rose-50/50 border border-rose-220 text-rose-900 rounded-2xl p-4 space-y-3" id="security-side-panel">
            <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-rose-500" />
              Frontend Defensive Security Guidelines
            </h4>
            <ul className="text-[11px] text-rose-850 space-y-2.5">
               {securityStrategyList.map((item, id) => (
                 <li key={id} className="flex gap-2 items-start">
                   <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                   <span>{item}</span>
                 </li>
               ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
