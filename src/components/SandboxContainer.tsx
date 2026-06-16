/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import VocabularyPractice from './VocabularyPractice';
import GrammarPractice from './GrammarPractice';
import ListeningPractice from './ListeningPractice';
import ReadingPractice from './ReadingPractice';
import WritingPractice from './WritingPractice';
import SpeakingPractice from './SpeakingPractice';
import { 
  Trophy, BookOpen, Layers, Volume2, Headphones, Edit2, Play, Award, HelpCircle, GraduationCap, Mic
} from 'lucide-react';

interface SandboxContainerProps {
  onEarnXp: (amount: number) => void;
  activeFeatureTab: string;
  setActiveFeatureTab: (tab: string) => void;
}

export default function SandboxContainer({ onEarnXp, activeFeatureTab, setActiveFeatureTab }: SandboxContainerProps) {
  
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'vocab': return 'Vocabulary SRS';
      case 'grammar': return 'Grammar Drills';
      case 'listening': return 'Listening Dialogue';
      case 'speaking': return 'Speaking Accent';
      case 'reading': return 'Reading Library';
      case 'writing': return 'AI Writing Studio';
      default: return 'Vocabulary';
    }
  };

  return (
    <div className="space-y-6" id="learning-sandbox-panel">
      
      {/* Tab Selectors */}
      <div className="bg-white p-2 text-slate-800 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-1.5" id="sandbox-tabs-dock">
        {[
          { id: 'vocab', label: 'Vocabulary', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'grammar', label: 'Grammar', icon: <Layers className="w-4 h-4" /> },
          { id: 'listening', label: 'Listening', icon: <Headphones className="w-4 h-4" /> },
          { id: 'speaking', label: 'Speaking', icon: <Mic className="w-4 h-4" /> },
          { id: 'reading', label: 'Reading', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'writing', label: 'Writing (AI)', icon: <Edit2 className="w-4 h-4 text-indigo-600" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`sandbox-tab-btn-${tab.id}`}
            onClick={() => setActiveFeatureTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeFeatureTab === tab.id 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100/50'
            }`}
          >
            <span id={`sandbox-tab-icon-${tab.id}`}>{tab.icon}</span>
            <span id={`sandbox-tab-text-${tab.id}`}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Render selected training modules */}
      <div className="bg-slate-50/50 rounded-2xl" id="active-sandbox-module-host">
        {activeFeatureTab === 'vocab' && (
          <VocabularyPractice onEarnXp={onEarnXp} />
        )}
        {activeFeatureTab === 'grammar' && (
          <GrammarPractice onEarnXp={onEarnXp} />
        )}
        {activeFeatureTab === 'listening' && (
          <ListeningPractice onEarnXp={onEarnXp} />
        )}
        {activeFeatureTab === 'speaking' && (
          <SpeakingPractice onEarnXp={onEarnXp} />
        )}
        {activeFeatureTab === 'reading' && (
          <ReadingPractice onEarnXp={onEarnXp} />
        )}
        {activeFeatureTab === 'writing' && (
          <WritingPractice onEarnXp={onEarnXp} />
        )}
      </div>

    </div>
  );
}
