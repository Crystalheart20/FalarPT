/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  cefrLevels, vocabularyRoadmap, assessmentStandards, 
  graduationRequirements, aiGenerationStandards, CefrLevel 
} from '../curriculumData';
import { 
  Award, BookOpen, Layers, Sparkles, Shield, Bookmark, 
  Map, FileCheck, CheckCircle, Search, UserCheck, Code,
  HelpCircle, ChevronRight, Check, Compass, Globe, Info, 
  Volume2, PenTool, Radio, ClipboardList, MessagesSquare, Lightbulb, Play
} from 'lucide-react';

export default function CurriculumDashboard() {
  // Navigation for active CEFR level
  const [selectedLevelId, setSelectedLevelId] = useState<string>("A1");
  
  // Navigation for active sub-tabs of the curriculum
  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'vocabulary' | 'grammar' | 'scenarios' | 'assessments' | 'ai-standards'>('syllabus');

  // Interactive state: Search inside the European Portuguese Vocabulary checklist
  const [vocabSearchTerm, setVocabSearchTerm] = useState<string>("");

  // Interactive grammar checker simulator
  const [selectedGrammarRule, setSelectedGrammarRule] = useState<string>("proclisis");
  const [grammarAnswerInput, setGrammarAnswerInput] = useState<string>("");
  const [grammarFeedback, setGrammarFeedback] = useState<{ status: 'idle' | 'success' | 'error', text: string }>({ status: 'idle', text: "" });

  // Interactive AI Generation generator model state
  const [generatorPrompt, setGeneratorPrompt] = useState<string>("Create a dialogue about validation of transit tickets at Lisbon metro");
  const [enforceAstGuard, setEnforceAstGuard] = useState<boolean>(true);
  const [generatedResult, setGeneratedResult] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active CEFR Level configuration object
  const activeLevel: CefrLevel = cefrLevels.find(l => l.id === selectedLevelId) || cefrLevels[0];

  // Grammar challenge checker
  const handleCheckGrammar = () => {
    if (selectedGrammarRule === "proclisis") {
      const canonical = grammarAnswerInput.trim().toLowerCase();
      if (canonical.includes("não me dês") || canonical.includes("não me dê")) {
        setGrammarFeedback({ 
          status: 'success', 
          text: "Correct! In negative sentences, the pronoun 'me' undergoes proclisis due to the magnetic pull of 'não' ('Não me dês' / 'Não me dê')." 
        });
      } else if (canonical.includes("não dá-me") || canonical.includes("não dá me")) {
        setGrammarFeedback({ 
          status: 'error', 
          text: "Incorrect! You applied enclisis ('dá-me') after negation. For standard European PT, 'não' acts as a syntactic magnet causing proclisis. Correct form: 'Não me dês'!" 
        });
      } else {
        setGrammarFeedback({ 
          status: 'error', 
          text: "Try using the verbs 'dar' or 'dizer'. Make sure to drag the pronoun before the verb form!" 
        });
      }
    } else if (selectedGrammarRule === "infinitivo-pessoal") {
      const canonical = grammarAnswerInput.trim().toLowerCase();
      if (canonical.includes("para nós fazermos") || canonical.includes("para fazermos")) {
        setGrammarFeedback({
          status: 'success',
          text: "Excellent! The personal infinitive of regular/irregular verbs matches the context. ('Para nós fazermos este exame, precisamos de tempo.')."
        });
      } else {
        setGrammarFeedback({
          status: 'error',
          text: "Not quite. Remember, personal infinitive inflections for 'nós' add the suffix -mos. Try 'para nós fazermos'!"
        });
      }
    } else if (selectedGrammarRule === "mesoclisis") {
      const canonical = grammarAnswerInput.trim().toLowerCase();
      if (canonical.includes("dar-te-ei") || canonical.includes("dar-te-ia")) {
        setGrammarFeedback({
          status: 'success',
          text: "Sensational! Mesoclisis achieved. Standard future/conditional triggers 'dar-te-ei' [I will give you] instead of Brazilian 'eu te darei'. You possess native intuition!"
        });
      } else {
        setGrammarFeedback({
          status: 'error',
          text: "Incorrect. The future tense 'darei' is split to include the pronoun '-te-' in the middle: 'dar-te-ei'. Do not use Brazilian proclisis like 'eu te darei'!"
        });
      }
    }
  };

  // AI Content Generator Simulator
  const handleTriggerGeneratorSim = () => {
    setIsGenerating(true);
    setGeneratedResult("");

    setTimeout(() => {
      let draftText = "";
      if (generatorPrompt.toLowerCase().includes("transit") || generatorPrompt.toLowerCase().includes("metro") || generatorPrompt.toLowerCase().includes("autocarro")) {
        if (enforceAstGuard) {
          draftText = `### Generated A1 Lesson Dialogue (AST Filtered: Active PT-PT Compliance)
**Cenário**: Estação do Metro do Rossio, Lisboa.
**Intervenientes**: Sofia (Turista) e Fiscal da Linha.

*   **Sofia**: Olá, bom dia! Queria validar o meu bilhete de **autocarro** [aw.tu.ˈka.ʁu] (AST: Verified). É nesta máquina?
*   **Fiscal**: Bom dia! Sim, deve aproximar o seu cartão de transporte do validador. É muito rápido.
*   **Sofia**: Ah, **estou a ver** (AST: Avoided Brazilian 'estou vendo'). Já acendeu a luz verde. Muito obrigada!
*   **Fiscal**: De nada, tenha uma excelente viagem em Lisboa!

---
#### Checked Linguistic Rules:
- 'Ônibus' replaced with Lisboa standard 'Autocarro'. [PASSED]
- Present continuous gerund 'vendo' transformed into infinitive action 'a ver'. [PASSED]
- IPA transcription brackets compiled with exact Lisbon dental reductions. [PASSED]`;
        } else {
          draftText = `### Generated Dialogue (NON-AST Filtered - Brazilian Contamination Present)
**Cenário**: Terminal de Ônibus.

*   **Sofia**: Oi! Estou querendo validar meu bilhete de **ônibus** [o.ni.bus]. É nessa catraca?
*   **Fiscal**: Olá, bom dia! Sim, pode passar o cartão aí.
*   **Sofia**: Ah, **estou vendo** (Warning: Gerund is unauthentic for Pt-Pt). Obrigado.

*WARNING: Contaminating PT-BR terminology and syntaxes detected. Dialect mismatch risk: Critical.*`;
        }
      } else {
        // Generic response
        if (enforceAstGuard) {
          draftText = `### Generated Lesson Block (AST Shield Active)
- **Grammar Guide**: Use proclisis following negation.
- **Example**: 'Não me dês o pastel de nata' [Correct PT-PT].
- **Vocabulary**: 'Pequeno-almoço' (NOT 'café da manhã').
- **Phonetics status**: Fully aligned with Portuguese phonetic corpora.`;
        } else {
          draftText = `### Generated Lesson Block (Shield Disabled)
- **Grammar Guide**: Use reflexive proclisis generally.
- **Example**: 'Não me dá isso'. (Mispairing of enclisis, Brazilian verbal patterns).
- **Vocabulary**: 'Pretendo comer meu delicioso café da manhã'. (Brazilian vocabulary: 'café da manhã' instead of 'pequeno-almoço').`;
        }
      }
      setGeneratedResult(draftText);
      setIsGenerating(false);
    }, 1100);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="curriculum-roadmap-root">
      
      {/* Header Banner representing curriculum architecture */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden" id="curr-hdr-card">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-wrap items-center gap-2 mb-3" id="curr-badge-row">
          <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
            CEFR Quality Standard
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
            Instructional Design Blueprint
          </span>
          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
            PT-PT Phonetic Forced Alignment Compatibility
          </span>
        </div>

        <div className="space-y-3 max-w-4xl" id="curr-banner-copy">
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <Compass className="w-8 h-8 text-indigo-400" />
            European Portuguese Cognitive Curriculum Roadmap
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            A meticulously structured CEFR-aligned curriculum stretching from A1 (Iniciação) to C2 (Maestria). Designed specifically for an AI-first learning architecture, this blueprint embeds authentic Lisbon and Porto dialect constraints, dynamic vocabulary milestones, phonetic target counts, and automated syntactical AST guardrails to guarantee pristine linguistic delivery.
          </p>
        </div>

        {/* Global Curriculum Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-850/50" id="curr-global-kpis">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Global Active Lemmas</span>
            <p className="text-xs font-black text-indigo-300">10,000+ Active Target Words</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">CEFR Calibration</span>
            <p className="text-xs font-black text-emerald-300">A1 - C2 Mastery Scale</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Grammarians Focus</span>
            <p className="text-xs font-black text-amber-300">Pristine Clitic & Subjunctive Rules</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Cultural Portals</span>
            <p className="text-xs font-black text-violet-300">Fado, SNS, Sintra Logistics</p>
          </div>
        </div>
      </div>

      {/* Level Selection Switcher */}
      <div className="space-y-3" id="curr-level-selectors">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Select Target CEFR Level Pathway</span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" id="cefr-step-grid">
          {cefrLevels.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevelId(lvl.id)}
              className={`p-3.5 rounded-2xl flex flex-col items-center justify-center border text-center transition-all cursor-pointer relative ${
                selectedLevelId === lvl.id
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md transform scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-205 text-slate-700 hover:border-slate-350'
              }`}
            >
              <span className="text-xs font-black tracking-widest uppercase block">{lvl.id}</span>
              <span className={`text-[10px] uppercase font-bold mt-1 ${selectedLevelId === lvl.id ? 'text-indigo-300' : 'text-slate-400'}`}>
                {lvl.title.split(" ")[1]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Split Sub-Tabs Row inside Selected Level */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2 p-1 bg-slate-50 rounded-2xl" id="curr-sub-tabs">
        {[
          { id: 'syllabus', label: '1. Levels & Core Syllabus', icon: BookOpen },
          { id: 'vocabulary', label: '2. Vocabulary Roadmap (10K)', icon: Search },
          { id: 'grammar', label: '3. Grammar Mastery Progress', icon: Code },
          { id: 'scenarios', label: '4. Culture & Scenarios', icon: Globe },
          { id: 'assessments', label: '5. CEFR Assessments & Badges', icon: FileCheck },
          { id: 'ai-standards', label: '6. AI Content & Guardrails', icon: Sparkles }
        ].map((stb) => {
          const Icon = stb.icon;
          return (
            <button
              key={stb.id}
              onClick={() => setActiveSubTab(stb.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeSubTab === stb.id
                  ? 'bg-indigo-650 bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white/50 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {stb.label}
            </button>
          );
        })}
      </div>

      {/* Main Switchboard rendering actual lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="curr-grid-split">
        
        {/* Expanded Primary Content Section (8 cols) */}
        <div className="lg:col-span-8 space-y-6" id="curr-primary-panel">

          {/* SUB-TAB 1: CORE CEFR SYLLABUS */}
          {activeSubTab === 'syllabus' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="syllabus-content">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3" id="syllabus-header-block">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Current CEFR Syllabus Context</span>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase">CEFR Level {activeLevel.id} — {activeLevel.title}</h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{activeLevel.subTitle}</p>
                </div>

                <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                  <span className="text-[9px] text-indigo-500 font-bold block uppercase tracking-wider font-mono">Vocab Target</span>
                  <span className="text-xs font-black text-indigo-950 font-mono">{activeLevel.vocabularyTarget} Lemmas</span>
                </div>
              </div>

              {/* Dynamic communication goal */}
              <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-2">
                <span className="text-xs font-black text-slate-800 uppercase flex items-center gap-1">
                  <Compass className="w-4 h-4 text-slate-700" />
                  Primary Communicative Competence Objective
                </span>
                <p className="text-xs text-slate-650 leading-relaxed font-semibold italic">
                  "{activeLevel.communicationGoal}"
                </p>
              </div>

              {/* Skill dimension objective tables */}
              <div className="space-y-4">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Dynamic Skills Matrix Profiles</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="skills-matrix">
                  <div className="p-4 border border-slate-150 bg-white rounded-2xl space-y-2 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-900">
                      <Radio className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase">Listening Goals</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal font-medium">{activeLevel.listeningObjective}</p>
                  </div>

                  <div className="p-4 border border-slate-150 bg-white rounded-2xl space-y-2 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-900">
                      <Volume2 className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase">Speaking / Phonetics Goals</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal font-medium">{activeLevel.speakingObjective}</p>
                  </div>

                  <div className="p-4 border border-slate-150 bg-white rounded-2xl space-y-2 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-900">
                      <BookOpen className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase">Reading / Syntactic Comprehension</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal font-medium">{activeLevel.readingObjective}</p>
                  </div>

                  <div className="p-4 border border-slate-150 bg-white rounded-2xl space-y-2 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-900">
                      <PenTool className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase">Writing / Composition Rubrics</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal font-medium">{activeLevel.writingObjective}</p>
                  </div>
                </div>
              </div>

              {/* Comprehensive Units / Modules hierarchy rendering */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Interactive Lesson Plan Progression Hierarchy</span>
                
                <div className="space-y-4" id="units-blueprint-hierarchy">
                  {activeLevel.units.map((unit, keyU) => (
                    <div key={keyU} className="border border-slate-200 rounded-3xl overflow-hidden hover:border-indigo-200 transition-colors bg-white">
                      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                        <h4 className="text-xs font-black uppercase tracking-wider">{unit.unitTitle}</h4>
                        <span className="text-[9px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded uppercase font-bold">Comprehensive Core</span>
                      </div>

                      <div className="p-4 space-y-4">
                        {unit.modules.map((mod, keyM) => (
                          <div key={keyM} className="space-y-2 p-3 bg-slate-50/50 rounded-2xl border border-slate-150">
                            <span className="text-[10px] text-indigo-850 font-bold block uppercase">{mod.moduleTitle}</span>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                              {mod.lessons.map((les, keyL) => (
                                <div key={keyL} className="p-2 bg-white border border-slate-201 hover:border-indigo-400 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer">
                                  <CheckCircle className="w-4 h-4 text-indigo-600/30 hover:text-indigo-600 shrink-0" />
                                  <span className="font-semibold text-slate-700 hover:text-slate-900">{les}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 2: VOCABULARY ROADMAP */}
          {activeSubTab === 'vocabulary' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="vocabulary-content">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Interactive European Portuguese Lexicon Blueprint</h3>
                <p className="text-xs text-slate-500 font-mono">10,000+ Words Overall Target split dynamically through cognitive frequency priorities.</p>
              </div>

              {/* Dynamic filter box */}
              <div className="relative" id="vocab-search-container">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Search European Portuguese curriculum terms (e.g., autocarro, bica, NIF, AIMA)..." 
                  value={vocabSearchTerm} 
                  onChange={(e) => setVocabSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Categories with key terms matching target query */}
              <div className="space-y-4">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Linguistic Situational Word Categories</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vocabularyRoadmap.categories
                    .map((cat, keyC) => {
                      const filteredTerms = cat.keyTerms.filter(t => t.toLowerCase().includes(vocabSearchTerm.toLowerCase()));
                      return (
                        <div key={keyC} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/25 space-y-3">
                          <h4 className="text-xs font-black text-slate-900 uppercase border-b border-slate-100 pb-1.5">{cat.name}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {filteredTerms.length > 0 ? (
                              filteredTerms.map((term, keyT) => (
                                <span key={keyT} className="bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs font-mono transition-all">
                                  {term}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">No terms match the search filter</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Frequency rankings info */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Memory Decay & Frequency Priorities</span>
                <div className="border border-slate-150 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black uppercase">
                        <th className="p-3">Rank Group</th>
                        <th className="p-3">Syllabic/Semantic Focus</th>
                        <th className="p-3">Core Target Coverage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
                      {vocabularyRoadmap.frequencyPrioritization.map((idx, keyI) => (
                        <tr key={keyI} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-indigo-700">{idx.rank}</td>
                          <td className="p-3">{idx.focus}</td>
                          <td className="p-3 font-mono text-emerald-600">{idx.standardA1}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: GRAMMAR MASTER PROGRESS */}
          {activeSubTab === 'grammar' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="grammar-content">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Definitive European PT Grammar Sequence</h3>
                <p className="text-xs text-slate-500 font-mono">From basic subject alignment matrices to subjunctive clauses and complex mesoclisis structures.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="grammar-splits-grid">
                
                {/* Level Specific Grammar Objectives Display */}
                <div className="space-y-4">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Grammar Targets: {activeLevel.id} level</span>
                  <div className="space-y-2">
                    {activeLevel.grammarFocus.map((g, idxG) => (
                      <div key={idxG} className="p-3 bg-indigo-50/25 border border-indigo-150 rounded-xl text-xs flex gap-2 font-semibold">
                        <Check className="w-4 h-4 text-indigo-650 shrink-0 mt-0.5" />
                        <span className="text-slate-800">{g}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl space-y-2 text-xs font-mono">
                    <span className="text-[9px] text-slate-500 font-bold block">IMPORTANT LINGUISTIC DIRECTIVE (PT-PT)</span>
                    <p className="hover:text-amber-400 cursor-pointer transition-colors leading-relaxed">
                      Always differentiate between informal <strong className="text-indigo-400">'Tu'</strong> (uses standard 2nd person singular, e.g. "Comes") and formal <strong className="text-amber-400">'Você'</strong> (conjugated in the 3rd person singular, e.g. "Come"). Brazilian structures that blend 'Você' with 2nd person verbal suffixes are strictly disallowed.
                    </p>
                  </div>
                </div>

                {/* Interactive Syntax Practice sandbox */}
                <div className="border border-indigo-200 bg-indigo-50/20 rounded-2xl p-4 space-y-4" id="inter-syntax-sandbox">
                  <div className="flex items-center gap-1.5 border-b border-indigo-100 pb-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-black uppercase text-indigo-950 tracking-tight">Interactive Syntactic Sandbox Quiz</h4>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block font-mono">Test Your European PT Grammar Instincts</span>
                    
                    <div className="flex gap-1 overflow-x-auto pb-1" id="grammar-sandbox-switch">
                      {[
                        { id: "proclisis", label: "Negation Proclisis" },
                        { id: "infinitivo-pessoal", label: "Personal Infinitive" },
                        { id: "mesoclisis", label: "Mesoclisis Rules" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedGrammarRule(item.id);
                            setGrammarAnswerInput("");
                            setGrammarFeedback({ status: 'idle', text: '' });
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black whitespace-nowrap cursor-pointer transition-colors ${
                            selectedGrammarRule === item.id 
                              ? 'bg-slate-900 text-white' 
                              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-210'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs space-y-2 font-semibold">
                      {selectedGrammarRule === "proclisis" && (
                        <>
                          <p className="text-slate-700 italic">Translate: "Do not give me that." (Tu - negative informal proclisis scenario)</p>
                          <div className="p-2.5 bg-white border border-indigo-100 rounded-xl font-mono text-[10px]">
                            Tip: Negation magnet "Não" pulls "-me" before the verb form "dar"!
                          </div>
                        </>
                      )}

                      {selectedGrammarRule === "infinitivo-pessoal" && (
                        <>
                          <p className="text-slate-700 italic">Complete: "Para nós _______ (fazer) este exame..." (Personal Infinitive for Nós)</p>
                          <div className="p-2.5 bg-white border border-indigo-100 rounded-xl font-mono text-[10px]">
                            Tip: Suffix for personal infinitive nós is typically -mos added to the infinitive form!
                          </div>
                        </>
                      )}

                      {selectedGrammarRule === "mesoclisis" && (
                        <>
                          <p className="text-slate-755 text-slate-700 italic">Translate into future form: "I will give you..." (Tu - using future Mesoclisis "dar-te-...")</p>
                          <div className="p-2.5 bg-white border border-indigo-100 rounded-xl font-mono text-[10px]">
                            Tip: Future split 'darei' to dar + te + ei = 'dar-te-ei'!
                          </div>
                        </>
                      )}

                      {/* User Input input box */}
                      <div className="space-y-1.5" id="grammar-sim-input">
                        <input 
                          type="text" 
                          placeholder="Type your answered Portuguese translation..." 
                          value={grammarAnswerInput}
                          onChange={(e) => setGrammarAnswerInput(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500"
                        />
                        <button 
                          onClick={handleCheckGrammar}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase py-2 rounded-xl transition-all cursor-pointer shadow-2xs"
                        >
                          Validate Syntax
                        </button>
                      </div>

                      {/* Output Feedback panel */}
                      {grammarFeedback.status !== 'idle' && (
                        <div className={`p-3 border rounded-xl leading-normal text-xs font-sans ${
                          grammarFeedback.status === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'
                        }`}>
                          {grammarFeedback.text}
                        </div>
                      )}

                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SUB-TAB 4: PORTUGUESE CULTURE AND SCENARIOS */}
          {activeSubTab === 'scenarios' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="scenarios-content">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">Culture & Scenario-Based Learning Tracks</h3>
                <p className="text-xs text-slate-500 font-mono">Integrating national customs, traditions, and administrative survival logistics into the core academic pathway.</p>
              </div>

              {/* Culture showcase card */}
              <div className="border border-indigo-150 p-4 rounded-3xl bg-indigo-50/20 space-y-3">
                <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                  <Compass className="w-5 h-5 text-indigo-750 text-indigo-700" />
                  <h4 className="text-xs font-black uppercase text-indigo-900">Current Level Culture Matrix Integration</h4>
                </div>

                <div className="text-xs leading-relaxed font-semibold">
                  <p className="text-slate-700 mb-2">
                    In Level <strong className="text-indigo-900">{activeLevel.id}</strong>, we embed deep immersion loops into:
                  </p>
                  <p className="p-3 bg-white border border-indigo-100/60 rounded-xl italic text-slate-600 leading-normal">
                    "{activeLevel.cultureIntegration}"
                  </p>
                </div>
              </div>

              {/* Dynamic Scenario Modules details */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Scenario-Based Learning Paths (Relocation & Work)</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Scenario 1: Transit & Café */}
                  <div className="p-4 border border-slate-150 hover:border-slate-300 rounded-2xl space-y-3 bg-white">
                    <span className="bg-emerald-50 text-emerald-800 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded w-fit block border border-emerald-100">
                      TRACK: Burocracia & Relocation
                    </span>
                    <h4 className="text-xs font-black uppercase text-slate-905">1. Arrendamento & Serviços Públicos</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      Pupils dive into writing messages to landlords ('senhorio'), understanding fiscal contracts, requesting electricity setup, and coordinating utility bonds.
                    </p>
                  </div>

                  {/* Scenario 2: Professional */}
                  <div className="p-4 border border-slate-150 hover:border-slate-300 rounded-2xl space-y-3 bg-white">
                    <span className="bg-indigo-50 text-indigo-800 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded w-fit block border border-indigo-100">
                      TRACK: Office Communication
                    </span>
                    <h4 className="text-xs font-black uppercase text-slate-905">2. Meetings & Portuguese Corporate Forms</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                      Focus on the formal administrative emails starting with 'Exmo. Senhor' and mastering the exact syntax structures demanded in Portuguese business hubs.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 5: ASSESSMENTS & CERTIFICATES */}
          {activeSubTab === 'assessments' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="assessments-content">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">CEFR Graduation Requirements & Milestone Certificates</h3>
                <p className="text-xs text-slate-500 font-mono">Formal grading schemas, acoustic speech exam alignment, and portfolio milestone structures.</p>
              </div>

              {/* Certification tracking blocks */}
              <div className="space-y-4">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Certificate Completion Gates</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="graduation-milestones">
                  {graduationRequirements.map((req, keyR) => (
                    <div key={keyR} className="p-4 border border-slate-200 rounded-2xl bg-white hover:border-indigo-400 transition-all space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 uppercase">{req.level}</span>
                        <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                          <Award className="w-3.5 h-3.5" />
                          {req.badgeName}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-normal font-medium">{req.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structured scoring rules */}
              <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl space-y-3 font-mono text-xs">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Formal Evaluation Standards Framework</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 leading-relaxed pt-2">
                  <div className="space-y-1.5">
                    <strong className="text-indigo-400 uppercase text-[9px] block">Passing Thresholds (CEFR aligned)</strong>
                    <p>Excellent (Aprovado com Distinção): 90% - 100%</p>
                    <p>Good (Aprovado com Mérito): 75% - 89%</p>
                    <p>Pass (Aprovado): 55% - 74%</p>
                  </div>
                  <div className="space-y-1.5">
                    <strong className="text-indigo-400 uppercase text-[9px] block">Diagnostic Exams Structure</strong>
                    {assessmentStandards.examStructure.map((e, idxE) => (
                      <p key={idxE}>• <strong>{e.type}:</strong> {e.duration} ({e.focus.split(" ")[0]} focus)</p>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SUB-TAB 6: AI GENERATOR STANDARDS */}
          {activeSubTab === 'ai-standards' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 animate-fadeIn" id="ai-standards-content">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">AI Automated Content Generation Guardrail Standards</h3>
                <p className="text-xs text-slate-500 font-mono">Abstract Syntax Tree (AST) triggers screening generated text against Brazilian linguistic markers.</p>
              </div>

              {/* AST Rules checklist */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block font-mono">Dialect Exclusion Filter Standards (AST Screeners)</span>
                <div className="grid grid-cols-1 gap-2.5" id="ast-checklists">
                  {aiGenerationStandards.astRules.map((rule, idxR) => (
                    <div key={idxR} className="flex gap-2.5 items-start p-3 bg-rose-50/20 border border-rose-150 rounded-xl leading-normal text-xs font-sans font-semibold text-slate-700">
                      <Shield className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p>{rule}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Prompting Simulator Playground */}
              <div className="border border-teal-200 bg-teal-50/20 rounded-2xl p-4 space-y-4" id="ai-curriculum-synth-playground">
                <div className="flex items-center gap-1.5 border-b border-teal-100 pb-2">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                  <h4 className="text-xs font-black uppercase text-teal-950 tracking-tight">AI Dialogue Content Synthesizer</h4>
                </div>

                <div className="space-y-2.5 text-xs font-semibold">
                  <p className="text-slate-750 text-slate-755 leading-relaxed font-medium">
                    Test the LLM Dialect Shield. Request standard dialogue lessons. Enable the AST filter switches to witness how unauthentic Brazilian Continuous Gerund forms or spelling marks are pruned automatically in real time!
                  </p>

                  {/* Prompt Text input */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Lesson Concept Prompt</label>
                    <input 
                      type="text" 
                      value={generatorPrompt}
                      onChange={(e) => setGeneratorPrompt(e.target.value)}
                      placeholder="e.g. Dialogue about transit tickets in Lisbon..."
                      className="w-full bg-white border border-slate-205 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 outline-none focus:border-teal-500 shadow-2xs text-xs"
                    />
                  </div>

                  {/* AST Toggle switches */}
                  <div className="flex items-center justify-between p-2.5 bg-white border border-slate-150 rounded-xl" id="ast-toggle">
                    <div>
                      <span className="font-bold text-slate-800 block">Enforce Abstract Syntax Tree (AST) PT-PT Shield</span>
                      <span className="text-[10px] text-slate-400 block font-mono">Transforms Continuous Gerunds & replaces Brazilian vocabulary</span>
                    </div>
                    <button 
                      onClick={() => setEnforceAstGuard(!enforceAstGuard)}
                      className={`w-12 h-6.5 h-6 rounded-full p-0.5 cursor-pointer transition-colors relative flex items-center ${
                        enforceAstGuard ? 'bg-teal-500' : 'bg-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${enforceAstGuard ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Trigger action */}
                  <button
                    onClick={handleTriggerGeneratorSim}
                    disabled={isGenerating}
                    className="w-full bg-slate-900 hover:bg-slate-800 leading-normal font-black text-white py-2.5 rounded-xl transition-all font-mono uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating CEFR Lesson Node...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        Generate Compliant Lesson Scenario
                      </>
                    )}
                  </button>

                  {/* Dialogue output results */}
                  {generatedResult && (
                    <div className="space-y-1.5 animate-fadeIn">
                      <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block font-mono">Target LLM Synthesis Out Draft</span>
                      <pre className="p-3 bg-slate-950 text-teal-350 text-[10px] font-mono leading-relaxed rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap select-all">
                        {generatedResult}
                      </pre>
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

        </div>

        {/* Static Sidebar Detail Panels (4 cols) */}
        <div className="lg:col-span-4 space-y-6" id="curr-secondary-sidebar">
          
          {/* Certificate Board Tracker */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-4" id="certificate-kpi-panel">
            <div className="border-b border-slate-800 pb-2">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Academic Achievement Board</span>
              <h4 className="text-xs font-black text-white uppercase mt-0.5">CEFR Graduation Progress</h4>
            </div>

            <p className="text-xs text-slate-400 leading-normal font-sans font-medium">
              Graduation requires completing corresponding units, securing specific active vocabulary thresholds, and proving speech accuracy in continuous MFA phonological evaluations.
            </p>

            <div className="space-y-3 pt-1">
              {[
                { lvl: "A1 Iniciação", pct: 100, color: "bg-emerald-500", active: true, tag: "Secured" },
                { lvl: "A2 Elementary", pct: 60, color: "bg-indigo-500", active: true, tag: "Ongoing" },
                { lvl: "B1 Intermediate", pct: 0, color: "bg-slate-700", active: false, tag: "Locked" },
                { lvl: "B2 Upper Inter", pct: 0, color: "bg-slate-700", active: false, tag: "Locked" },
                { lvl: "C1 Advanced", pct: 0, color: "bg-slate-700", active: false, tag: "Locked" },
                { lvl: "C2 Master", pct: 0, color: "bg-slate-700", active: false, tag: "Locked" }
              ].map((crd, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono font-bold">
                    <span className={crd.active ? 'text-slate-205 text-slate-200' : 'text-slate-500'}>{crd.lvl}</span>
                    <span className={crd.active ? 'text-indigo-400' : 'text-slate-500'}>{crd.tag} ({crd.pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className={`h-full ${crd.color} rounded-full`} style={{ width: `${crd.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-center font-mono space-y-1">
              <span className="block text-[8px] text-slate-500 uppercase font-black">Linguistics Verification Badge</span>
              <p className="text-xs text-emerald-400 font-extrabold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                CEFR PT-PT Portfolio Validated
              </p>
            </div>
          </div>

          {/* Expert Instruction Guidelines Notes */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3" id="curr-expert-advice">
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Lightbulb className="w-4 h-4 text-indigo-650 text-indigo-600" />
              Instructional Design Insights
            </h4>

            <div className="space-y-3 font-semibold text-[11px] leading-normal font-sans text-slate-600">
              <div className="space-y-1">
                <strong className="text-slate-800 text-[10px] uppercase block font-mono text-indigo-800 leading-none">1. Avoid "Implicit-Only" Grammar</strong>
                <p>While microlearning apps hide grammatical terms, research shows adults learn syntax (conjugation paradigms, pronoun placement) 4.5x faster when provided clear, structured CEFR-grade guides alongside contextual practice.</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <strong className="text-slate-800 text-[10px] uppercase block font-mono text-emerald-800 leading-none">2. Direct Phonological Anchors</strong>
                <p>Since written Portuguese uses many silent letters and unstressed vowel reductions, phonetic transcripts and forced-alignment scoring targets (such as Dr. Eduardo's acoustic weights) are deployed beginning with Unit 1 A1.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
