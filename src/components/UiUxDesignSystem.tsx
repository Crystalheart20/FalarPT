/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  brandIdentity, colorsList, typographyTokens, 
  spacing4pxUnits, userJourneys, screenMockups, accessibilityGuidelines 
} from '../uiUxDesignSystemData';
import { 
  Sparkles, Palette, Type, AlignLeft, Compass, Layout, 
  Eye, Laptop, Smartphone, Copy, Check, Flame, Trophy, Globe, Mic, CheckCircle2, Heart 
} from 'lucide-react';

export default function UiUxDesignSystem() {
  const [activeSubsection, setActiveSubsection] = useState<'brand' | 'colors' | 'typography' | 'spacing' | 'components' | 'flows' | 'wireframes' | 'a11y'>('brand');
  const [deviceMockup, setDeviceMockup] = useState<'desktop' | 'mobile'>('desktop');
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Reusable mini helper
  const handleCopyValue = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setIsCopied(key);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="uiux-system-design-root">
      
      {/* Visual Identity Hero Header Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 border border-indigo-950 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden" id="uiux-hero-badge">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl -z-10" />

        <div className="flex flex-wrap items-center gap-2 mb-3" id="uiux-badge-row">
          <span className="bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Creative Director Design System
          </span>
          <span className="bg-teal-500/20 border border-teal-400/30 text-teal-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Duolingo, Babbel & Spotify Inspired
          </span>
          <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            FalarPortuguês Brand Spec
          </span>
        </div>

        <div className="space-y-4 max-w-4xl" id="uiux-headline-zone">
          <h2 className="text-xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-400 fill-indigo-400/30 animate-pulse" />
            European Portuguese Design System & Mood Board
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            A premium, highly engaging visual environment crafted to inspire micro-habits of structured daily training. Melding high-contrast light aesthetics with a bold, gamified Portuguese layout scheme to deliver a world-class educational tool.
          </p>
        </div>

        {/* Brand Core Pillars Mini HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80" id="uiux-pillars-hud">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Visual Tone</span>
            <p className="text-xs font-black text-indigo-300">Intelligent, Fresh, Warm</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Compliance</span>
            <p className="text-xs font-black text-emerald-300">WCAG AA Standard</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Layout Concept</span>
            <p className="text-xs font-black text-amber-300">Mobile-first Stack</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Alignment</span>
            <p className="text-xs font-black text-rose-300">European Dialect focus</p>
          </div>
        </div>
      </div>

      {/* Tabs list to toggle between design sectors */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 bg-slate-50/50 p-1.5 rounded-2xl" id="uiux-sector-toggles">
        {[
          { id: 'brand', label: '1. Brand Persona', icon: Heart },
          { id: 'colors', label: '2. Colors Palette', icon: Palette },
          { id: 'typography', label: '3. Fonts & Typography', icon: Type },
          { id: 'spacing', label: '4. 4px Spacing', icon: AlignLeft },
          { id: 'components', label: '5. Dynamic Atoms', icon: Layout },
          { id: 'flows', label: '6. UX Flows', icon: Compass },
          { id: 'wireframes', label: '7. Wireframe Blueprints', icon: Smartphone },
          { id: 'a11y', label: '8. Accessibility a11y', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubsection(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeSubsection === tab.id
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

      {/* Main interactive visualization block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="uiux-matrix-body">
        
        {/* Dynamic spec layout content (8 cols) */}
        <div className="lg:col-span-8 space-y-6" id="uiux-main-area">

          {/* 1. BRAND PERSONA */}
          {activeSubsection === 'brand' && (
            <div className="bg-white rounded-2xl border border-slate-250/70 p-5 space-y-5" id="brand-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Premium Language Brand Identity</h3>
                <p className="text-xs text-slate-500 font-medium">How the FalarPortuguês service behaves, speaks, and guides students towards fluent mastery.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="brand-details-grid">
                <div className="bg-indigo-50/40 p-4 border border-indigo-100 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-indigo-900 uppercase">Strategic Placement</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {brandIdentity.positioning}
                  </p>
                </div>
                <div className="bg-emerald-50/40 p-4 border border-emerald-100 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black text-emerald-900 uppercase">Core Mission Statement</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {brandIdentity.mission}
                  </p>
                </div>
              </div>

              {/* Brand traits list */}
              <div className="space-y-3" id="brand-traits-zone">
                <h4 className="text-xs font-black text-slate-800 uppercase">Visual Personality Anchors</h4>
                <div className="flex flex-wrap gap-2">
                  {brandIdentity.personality.map((trait, idx) => (
                    <span key={idx} className="bg-slate-105 border border-slate-200 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-bold">
                      ✦ {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tone Rules */}
              <div className="border border-slate-200/80 rounded-2xl bg-slate-50/50 p-4 space-y-3" id="brand-tone-zone">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-700" />
                  <h4 className="text-xs font-black text-slate-800 uppercase">European Portuguese (PT-PT) Voicings & Accent Tones</h4>
                </div>
                <p className="text-xs text-slate-600 leading-normal italic font-medium bg-white p-3 rounded-xl border border-slate-100">
                  {brandIdentity.voiceTone.rule}
                </p>

                <div className="space-y-2" id="tone-scenarios">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Context Scenario Mockups</span>
                  {brandIdentity.voiceTone.examples.map((example, i) => (
                    <div key={i} className="text-xs p-3 bg-white rounded-xl border border-slate-150 flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <span className="font-extrabold text-indigo-700 whitespace-nowrap bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded text-[10px]">{example.trigger}</span>
                      <span className="text-slate-600 tracking-tight text-right italic font-medium">{example.tone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. COLORS PALETTE */}
          {activeSubsection === 'colors' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5" id="colors-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Dynamic Design Color Swatches</h3>
                <p className="text-xs text-slate-500 font-medium">Verified Tailwind classes and HEX code indices matching dark mode variant transitions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="colors-swatches-grid">
                {colorsList.map((swatch, idx) => (
                  <div key={idx} className="border border-slate-150 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-350 transition-all bg-white shadow-xs">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-extrabold text-slate-900">{swatch.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{swatch.usage}</p>
                      </div>

                      {/* Display visual swatches circles */}
                      <div className="flex gap-1 shrink-0">
                        <div 
                          style={{ backgroundColor: swatch.lightHex }}
                          className="w-7 h-7 rounded-full border border-slate-200/80 shadow-xs relative group cursor-pointer"
                          title="Light Theme"
                        />
                        <div 
                          style={{ backgroundColor: swatch.darkHex }}
                          className="w-7 h-7 rounded-full border border-slate-800 shadow-xs relative group cursor-pointer"
                          title="Dark Theme"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[10px] font-mono">
                      <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-150 relative">
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Light HEX</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-slate-800 font-bold">{swatch.lightHex}</span>
                          <button 
                            onClick={() => handleCopyValue(swatch.lightHex, `swatch-l-${idx}`)}
                            className="p-0.5 hover:bg-slate-200 rounded cursor-pointer"
                          >
                            {isCopied === `swatch-l-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-slate-300 relative">
                        <span className="text-slate-500 block text-[9px] font-bold uppercase">Dark HEX</span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-emerald-350 font-bold">{swatch.darkHex}</span>
                          <button 
                            onClick={() => handleCopyValue(swatch.darkHex, `swatch-d-${idx}`)}
                            className="p-0.5 hover:bg-slate-850 rounded cursor-pointer"
                          >
                            {isCopied === `swatch-d-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-500" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 px-1 py-0.5 bg-slate-50 rounded-md">
                      <span>Contrast Rating:</span>
                      <span className="text-indigo-700">{swatch.contrastRatio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. FONTS & TYPOGRAPHY */}
          {activeSubsection === 'typography' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5" id="typo-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Typography Alignment Tokens</h3>
                <p className="text-xs text-slate-500 font-medium">Paired Google font assets implementing clear readability across viewport scales.</p>
              </div>

              <div className="space-y-4" id="typography-tokens-list">
                {typographyTokens.map((token, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-2xl bg-slate-50/30 hover:bg-slate-50/70 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Token ID</span>
                        <h4 className="text-xs font-black text-slate-800">{token.tokenName}</h4>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-lg p-1">
                        Font Family: {token.family}
                      </div>
                    </div>

                    {/* Live Preview block sizing text */}
                    <div className="py-2 select-all">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Live Representation Preview:</p>
                      <div className="p-3 bg-white rounded-xl border border-slate-150">
                        {token.tokenName.includes("Display") ? (
                          <span className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                            Aprenda Português de Portugal com eficácia!
                          </span>
                        ) : token.tokenName.includes("Section") ? (
                          <span className="text-sm md:text-lg font-extrabold text-slate-950 tracking-wide">
                            Unidade 3: Conversas no café de Lisboa
                          </span>
                        ) : token.tokenName.includes("Card") ? (
                          <span className="text-xs md:text-sm font-bold text-slate-900">
                            Estudo de Vocabulário: O autocarro
                          </span>
                        ) : token.tokenName.includes("Body") ? (
                          <span className="text-xs text-slate-600 leading-normal block">
                            Tu queres encomendar um pastel de nata com um café curto? In modern European Portuguese dialogue phrasing, the formal address shifts smoothly depending on geographic regions.
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-emerald-800 block">
                            ipa: /peɾ.su.ˈnal/ ➔ [ˈpɛɾ.su.naɫ] • CEFR-A1
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px] text-slate-500">
                      <div>
                        <span className="block text-[8px] uppercase text-slate-400 font-bold">Size Mobile</span>
                        <span className="font-bold text-slate-700">{token.sizeMobile}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase text-slate-400 font-bold">Size Desktop</span>
                        <span className="font-bold text-slate-700">{token.sizeDesktop}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase text-slate-400 font-bold">Line Height</span>
                        <span className="font-bold text-slate-700">{token.lineHeight}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase text-slate-400 font-bold">Font Weight</span>
                        <span className="font-bold text-slate-700">{token.weight}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. 4PX SPACING */}
          {activeSubsection === 'spacing' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5" id="spacing-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">The 4px Spacing Grid System</h3>
                <p className="text-xs text-slate-500 font-medium">A modular layout framework to construct spacing, margins, padding, and gutter alignment.</p>
              </div>

              <div className="space-y-3" id="spacing-token-piles">
                {spacing4pxUnits.map((unit, key) => (
                  <div key={key} className="flex flex-col md:flex-row md:items-center justify-between p-3.5 bg-slate-50/40 border border-slate-150 rounded-2xl gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded text-center shrink-0">
                        {unit.Token}
                      </div>
                      <div className="font-mono text-xs text-slate-800 font-black shrink-0 w-12">
                        {unit.pixels}
                      </div>
                      <p className="text-xs text-slate-600 leading-normal font-medium">
                        {unit.usage}
                      </p>
                    </div>

                    {/* Mini dynamic CSS representation bar */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400 shrink-0">
                      <span>Tailwind:</span>
                      <code className="bg-slate-900 text-slate-200 px-2 py-0.5 rounded-md font-bold">
                        {unit.Token.includes("space-1") ? "p-1" : unit.Token.includes("space-2") ? "p-2" : unit.Token.includes("space-3") ? "p-3" : unit.Token.includes("space-4") ? "p-4" : unit.Token.includes("space-6") ? "p-6" : "p-8"}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ATOMIC COMPONENT STATES */}
          {activeSubsection === 'components' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="atoms-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">High-Fidelity Reusable Atoms & States</h3>
                <p className="text-xs text-slate-500 font-medium">Standardizing active, pressed, invalid, and disabled interactions for our UI widgets.</p>
              </div>

              {/* State Sandbox Item #1: Interactive CTA button */}
              <div className="space-y-3 border border-slate-150 p-4 rounded-2xl" id="custom-buttons-sandbox">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1. The Primary Button (Monumental Indigo CTA)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
                  <div className="space-y-1.5 text-center">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">A. Default</span>
                    <button className="w-full bg-indigo-600 text-white text-xs px-2.5 py-2 rounded-xl font-bold border border-indigo-700/85 shadow-xs">
                      Continuar ➔
                    </button>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">B. Hover Accent</span>
                    <button className="w-full bg-indigo-700 text-white text-xs px-2.5 py-2 rounded-xl font-bold border border-indigo-805/85 shadow-md">
                      Continuar ➔
                    </button>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">C. Active / Pressed</span>
                    <button className="w-full bg-indigo-800 text-indigo-100 text-xs px-2.5 py-2 rounded-xl font-bold border border-indigo-900 scale-98 shadow-inner">
                      Continuar ➔
                    </button>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase">D. Locked / Disabled</span>
                    <button disabled className="w-full bg-slate-150 text-slate-400 text-xs px-2.5 py-2 rounded-xl font-bold border border-slate-205 cursor-not-allowed">
                      Bloqueado
                    </button>
                  </div>
                </div>
              </div>

              {/* State Sandbox Item #2: Active Multi-Choice learning cards */}
              <div className="space-y-3 border border-slate-150 p-4 rounded-2xl" id="custom-cards-sandbox">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">2. Single-Choice Learning Cards (Translation Option)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 border border-slate-200 hover:border-indigo-200 rounded-xl cursor-all bg-white relative space-y-1.5 text-left">
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-slate-400 bg-slate-50 border border-slate-150 px-1 py-0.5 rounded">Option K</span>
                    <span className="font-mono text-[10px] text-indigo-700 font-black block">01</span>
                    <p className="text-xs font-bold text-slate-800 leading-tight">o autocarro</p>
                    <span className="text-[9px] text-slate-400 block font-medium">Means 'the bus'</span>
                  </div>

                  <div className="p-3.5 border-2 border-indigo-650 bg-indigo-50/40 rounded-xl cursor-all relative space-y-1.5 text-left shadow-xs">
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-indigo-700 bg-indigo-100 border border-indigo-200 px-1 py-0.5 rounded font-bold">Selected</span>
                    <span className="font-mono text-[10px] text-indigo-700 font-black block">02</span>
                    <p className="text-xs font-bold text-indigo-900 leading-tight">o comboio</p>
                    <span className="text-[9px] text-indigo-550 block font-medium">Means 'the train'</span>
                  </div>

                  <div className="p-3.5 border border-slate-250 bg-slate-50/50 rounded-xl opacity-50 relative space-y-1.5 text-left cursor-not-allowed select-none">
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-slate-400 bg-slate-150 border border-slate-200 px-1 py-0.5 rounded">Locked</span>
                    <span className="font-mono text-[10px] text-slate-400 font-black block">03</span>
                    <p className="text-xs font-bold text-slate-400 leading-tight">a bicicleta</p>
                    <span className="text-[9px] text-slate-400 block font-medium">Requires Unit 4</span>
                  </div>
                </div>
              </div>

              {/* State Sandbox Item #3: Audio Voice record indicator */}
              <div className="space-y-3 border border-slate-150 p-4 rounded-2xl" id="accent-mic-sandbox">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">3. Speaking Micro-interaction Panel (Lisbon Native accent)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="p-4 bg-slate-50/50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-black text-slate-800 uppercase text-[10px]">A. Press to record</p>
                      <span className="text-[11px] text-slate-500 font-semibold leading-none">Pressing registers audio</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shrink-0 cursor-pointer">
                      <Mic className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-2xl flex items-center justify-between gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-indigo-500/5 animate-pulse -z-10" />
                    <div className="space-y-1">
                      <p className="font-black text-indigo-900 uppercase text-[10px]">B. Analyzing Accents</p>
                      <span className="text-[11px] text-emerald-700 font-black flex items-center gap-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Stream Active: 86% Native match
                      </span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shrink-0 animate-ping shadow-lg shadow-rose-500/20">
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. UX JOURNEYS */}
          {activeSubsection === 'flows' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="flows-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Gamified UX Journey Flows</h3>
                <p className="text-xs text-slate-500 font-medium font-sans">Mapping steps and strategic retention psychological tactics across critical routes.</p>
              </div>

              <div className="space-y-4" id="experience-journeys">
                {userJourneys.map((flow, num) => (
                  <div key={num} className="border border-slate-150 rounded-2xl p-4 bg-indigo-50/10 hover:border-indigo-300 transition-colors space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <Compass className="w-4 h-4 text-indigo-700" />
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{flow.stage}</h4>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Operational Action Steps</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                        {flow.steps.map((step, key) => (
                          <div key={key} className="p-2.5 bg-white border border-slate-150 rounded-xl flex items-start gap-2 text-slate-650">
                            <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{key + 1}</span>
                            <span className="leading-tight">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-105 border border-slate-200 rounded-xl p-3 text-xs leading-normal font-sans">
                      <strong className="text-indigo-800 block mb-0.5 uppercase text-[9px] tracking-wide">💡 Duolingo-Grade Engagement Tactic</strong>
                      <p className="text-slate-600 font-medium italic">
                        {flow.experienceTactic}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. WIREFRAME BLUEPRINTS */}
          {activeSubsection === 'wireframes' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="wireframes-module-view">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Hinged Wireframe Schematics</h3>
                  <p className="text-xs text-slate-500 font-medium">How the screen hierarchy behaves in mobile vs desktop viewport structures.</p>
                </div>

                {/* Simulated device toggles */}
                <div className="flex bg-slate-100 border border-slate-200 rounded-xl p-1 shrink-0">
                  <button 
                    onClick={() => setDeviceMockup('desktop')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      deviceMockup === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" /> Desktop 1080p
                  </button>
                  <button 
                    onClick={() => setDeviceMockup('mobile')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      deviceMockup === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Mobile-first Stack
                  </button>
                </div>
              </div>

              {/* Wireframe blueprints listing */}
              <div className="grid grid-cols-1 gap-4 select-all" id="mockups-wireframes-list">
                {screenMockups.map((mockup, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/25 relative overflow-hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Screen Template</span>
                        <h4 className="text-xs font-black text-slate-900">{mockup.title}</h4>
                      </div>
                      <span className="text-[9px] bg-slate-900 text-slate-200 px-2 py-0.5 rounded font-mono font-bold tracking-wider">{mockup.type} Page</span>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-150 rounded-xl leading-normal text-xs text-slate-650 font-medium font-sans">
                      <span className="block font-bold text-slate-800 text-[10px] uppercase mb-1">Layout Architecture Structure ({deviceMockup === 'desktop' ? 'Horizontal Rail Grid' : 'Vertical Stack Grid'}):</span>
                      {mockup.layoutDescription}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Primary Render Coordinates</span>
                      <div className="flex flex-wrap gap-1.5">
                        {mockup.keyUiElements.map((el, i) => (
                          <span key={i} className="bg-indigo-50/60 border border-indigo-150 text-indigo-850 font-sans text-[10px] px-2.5 py-1 rounded-lg font-medium">
                            📁 {el}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 text-slate-355 text-[10px] font-mono leading-relaxed p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider mb-1">Interactive Script Bind:</span>
                      {mockup.interactionPattern}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. WCAG ACCESSIBILITY ACCORDION */}
          {activeSubsection === 'a11y' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6" id="a11y-module-view">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">WCAG AA Standard Compliance Guidelines</h3>
                <p className="text-xs text-slate-500 font-medium">Strict requirements to maintain accessible UI assets for our dynamic European student cohort.</p>
              </div>

              <div className="space-y-3" id="a11y-checker-list">
                {accessibilityGuidelines.map((g, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-emerald-50/20 border border-emerald-150/60 rounded-2xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="text-xs leading-normal font-sans font-medium">
                      <strong className="text-emerald-950 block mb-0.5">Accessibility Directive #{i + 1}</strong>
                      <p className="text-slate-650">{g}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Side summary panel (4 cols) - Design Specs & Mock HUD indicators */}
        <div className="lg:col-span-4 space-y-6" id="uiux-side-segment">
          
          {/* Creative Director Inspiration Note */}
          <div className="bg-white border border-slate-250 p-4 rounded-2xl space-y-3.5 shadow-xs" id="director-note-card">
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              Creative Director Note
            </h4>
            <p className="text-xs text-slate-600 leading-normal font-medium italic">
              "We avoid general grey placeholders entirely. Every mockup, swatch, and alignment map must directly validate European Portuguese CEFR targets. Think Sintra Mist borders paired with Monumental Indigo buttons. Keep it accessible, keep it highly readable, and keep the user's attention anchored on the next micro-learning module."
            </p>
          </div>

          {/* Dynamic Mock Interactive UX Widget Widget */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-4" id="mock-ux-tracker-card">
            <h4 className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block border-b border-slate-800 pb-2">
              Live HUD Mockup Tracker (Responsive UI Grid)
            </h4>

            {/* Daily Streak Fire indicator visualization */}
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800" id="hud-mock-row-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/15 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Streak count</span>
                  <span className="text-xs font-bold text-white">14 Days Completed</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
            </div>

            {/* User score ledger indicator */}
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800" id="hud-mock-row-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 font-bold uppercase">Reward ledger</span>
                  <span className="text-xs font-bold text-white">145 XP Earned Today</span>
                </div>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Level 3</span>
            </div>

            {/* Accent voice analyze visual record status */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2" id="hud-mock-row-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-400 font-bold uppercase">Lisbon Pronunciation Match</span>
                <span className="text-[9px] text-rose-400 font-mono font-bold">Unidade A1</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full" style={{ width: '86%' }} />
              </div>
              <p className="text-[10px] text-slate-300 italic font-medium leading-tight">
                "tu queres café curto" ➔ IPA Match 86%. Focus on dental consonant reductions.
              </p>
            </div>
          </div>

          {/* Micro interaction patterns Checklist rules */}
          <div className="bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl p-4 space-y-4" id="interaction-micro-checklist">
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-indigo-600" /> Micro-interaction Patterns
            </h4>
            
            <div className="text-xs font-medium space-y-2 text-slate-600 leading-normal">
              <div className="p-2.5 bg-white border border-slate-150 rounded-xl">
                <strong className="text-indigo-850 block mb-0.5 font-bold uppercase text-[9px]">A. Instant Haptic Haptic Feedback</strong>
                Selecting answer cards scales the block dynamically by <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">scale: 0.98</code> in TanStack structures.
              </div>

              <div className="p-2.5 bg-white border border-slate-150 rounded-xl">
                <strong className="text-indigo-850 block mb-0.5 font-bold uppercase text-[9px]">B. Stream Audio Player fade-ins</strong>
                Acoustic samples utilize WebAudio nodes, fading volume elements gracefully from <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">0.0 to 1.0</code> under 120 milliseconds.
              </div>

              <div className="p-2.5 bg-white border border-slate-150 rounded-xl">
                <strong className="text-indigo-850 block mb-0.5 font-bold uppercase text-[9px]">C. Streak Unlocks celebratory flash</strong>
                Streak freeze alerts slide in via Framer Motion offsets, overlaying soft visual sintra sparks.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
