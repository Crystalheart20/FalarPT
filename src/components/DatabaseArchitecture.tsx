/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  dbErdAscii, dbTables, dbCachingStrategy, dbPartitioningStrategy, 
  dbOptimizations, dbBackupStrategy, dbMultiLanguageStrategy, DbTableInfo 
} from '../databaseArchitectureData';
import { 
  Database, Server, ShieldCheck, Layers, Trophy, Cpu, Users, 
  CreditCard, TrendingUp, Key, Zap, Copy, Check, Info, FileCode,
  Table, HardDrive, Globe, RefreshCcw, LayoutGrid
} from 'lucide-react';

export default function DatabaseArchitecture() {
  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('All');
  const [activeTableId, setActiveTableId] = useState<string>(dbTables[0].tableName);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const domains = ['All', 'User', 'Learning', 'Progress', 'AI', 'Community', 'Subscription', 'Analytics'];

  const filteredTables = activeDomainFilter === 'All' 
    ? dbTables 
    : dbTables.filter(t => t.domain === activeDomainFilter);

  // Ensure activeTableId points to a visible table if filter changes
  const displayedTable = filteredTables.find(t => t.tableName === activeTableId) || filteredTables[0] || dbTables[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'User': return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
      case 'Learning': return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'Progress': return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'AI': return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'Community': return <Users className="w-4 h-4 text-rose-500" />;
      case 'Subscription': return <CreditCard className="w-4 h-4 text-cyan-500" />;
      case 'Analytics': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default: return <Database className="w-4 h-4 text-slate-500" />;
    }
  };

  const getDomainBgClass = (domain: string) => {
    switch (domain) {
      case 'User': return 'bg-indigo-50 border-indigo-250 text-indigo-800';
      case 'Learning': return 'bg-emerald-50 border-emerald-250 text-emerald-800';
      case 'Progress': return 'bg-amber-50 border-amber-250 text-amber-800';
      case 'AI': return 'bg-purple-50 border-purple-250 text-purple-800';
      case 'Community': return 'bg-rose-50 border-rose-250 text-rose-800';
      case 'Subscription': return 'bg-cyan-50 border-cyan-250 text-cyan-800';
      case 'Analytics': return 'bg-blue-50 border-blue-250 text-blue-800';
      default: return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  return (
    <div className="space-y-8" id="db-architecture-root">
      
      {/* Principal Intro Header Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white space-y-5" id="db-blueprint-hero">
        <div className="flex flex-wrap items-center gap-2" id="db-intro-badge-row">
          <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Lead Database Systems design
          </span>
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
            Engine Capacity: 10M+ daily events
          </span>
        </div>

        <div className="space-y-3" id="db-headline-wrapper">
          <h2 className="text-xl lg:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" />
            European Portuguese Learning Hub PostgreSQL Blueprint
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-4xl font-medium">
            A comprehensive, production-ready relational database schematics design co-engineered to sustain over 1 million concurrent subscribers. This system supports intensive micro-structured vocabulary metrics, real-time auditory pronunciation drills, adaptive Leitner-box Spaced Repetition (SRS), and Duolingo-inspired daily checks streak tracking.
          </p>
        </div>

        {/* Global Scalability Stats Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800" id="db-matrix">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Storage Architecture</span>
            <p className="font-mono text-base font-bold text-white">PostgreSQL 16</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Cache Ingress Store</span>
            <p className="font-mono text-base font-bold text-indigo-300">Redis Enterprise</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">GDPR Erasure Compliant</span>
            <p className="font-mono text-base font-bold text-emerald-300">Active Soft-Deletes</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Concurrent Read/Write Ratio</span>
            <p className="font-mono text-base font-bold text-amber-300">92% Reads / 8% Writes</p>
          </div>
        </div>
      </div>

      {/* Complete Entity Relationship Diagram Panel */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 lg:p-6 space-y-4" id="db-erd-panel">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3" id="db-erd-header">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest leading-none">
              Unified Entity Relationship Vector Map (ASCII)
            </h3>
          </div>
          <button 
            id="copy-erd-ascii-btn"
            onClick={() => handleCopy(dbErdAscii, 'erd')}
            className="text-[10px] bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-350 hover:text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedText === 'erd' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied ASCII!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy ERD Mapping
              </>
            )}
          </button>
        </div>
        <pre className="font-mono text-[9px] md:text-[10px] text-emerald-300 overflow-x-auto leading-normal bg-slate-900/40 p-4 rounded-xl border border-slate-900/60 scrollbar-thin select-all">
          {dbErdAscii}
        </pre>
      </div>

      {/* Relational Table Spec explorer - Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="db-blueprint-split">
        
        {/* Left column - domain filters and structural table tree */}
        <div className="lg:col-span-4 space-y-4" id="db-blueprint-nav">
          
          {/* Domain Filter selector */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3" id="db-domain-badge-selection">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-indigo-500" />
              Filter by Domain Model
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => {
                    setActiveDomainFilter(dom);
                    // Reset selected active table if current is not in filtered list
                    const matching = dom === 'All' ? dbTables : dbTables.filter(t => t.domain === dom);
                    if (matching.length > 0) {
                      setActiveTableId(matching[0].tableName);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                    activeDomainFilter === dom
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-650 text-slate-600'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Tables selection Tree */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-2 max-h-[480px] overflow-y-auto scrollbar-thin" id="db-tables-list-card">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Database Entity Tables ({filteredTables.length})
            </h4>
            {filteredTables.map((tbl) => (
              <button
                key={tbl.tableName}
                onClick={() => {
                  setActiveTableId(tbl.tableName);
                  setCopiedText(null);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between ${
                  displayedTable.tableName === tbl.tableName 
                    ? 'bg-indigo-50/50 border-indigo-200 text-slate-900 font-bold' 
                    : 'bg-white border-transparent hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="shrink-0">
                    <Table className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h5 className="text-[12px] font-mono font-bold tracking-tight text-slate-800">
                      {tbl.tableName}
                    </h5>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${getDomainBgClass(tbl.domain)}`}>
                  {tbl.domain}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Architect Notes */}
          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl space-y-2">
            <span className="text-[9px] text-amber-700 font-extrabold uppercase tracking-wider block flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Soft Delete Strategy Advice
            </span>
            <p className="text-[11px] text-slate-600 leading-normal font-medium">
              Every table containing user records or private activity is styled with a nullable <code className="font-mono bg-amber-100/30 px-1 py-0.5 rounded text-amber-800">deleted_at</code> timestamp. This supports active GDPR soft-deletion workflows while ensuring database records are safely retained for cumulative analytic assessments.
            </p>
          </div>

        </div>

        {/* Right column - deep inspection of target entity table */}
        <div className="lg:col-span-8 space-y-6" id="db-blueprint-content">
          
          <div className="bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 space-y-6" id="db-focused-table-card">
            
            {/* Table Heading Info */}
            <div className="border-b border-slate-100 pb-5 space-y-2" id="db-focused-header">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getDomainBgClass(displayedTable.domain)}`}>
                  {displayedTable.domain} Domain Model
                </span>
              </div>
              <h3 className="text-xl font-mono font-black text-slate-800 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-500 animate-pulse" />
                CREATE TABLE {displayedTable.tableName}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {displayedTable.purpose}
              </p>
            </div>

            {/* Displaying columns matrix spec table */}
            <div className="space-y-3" id="db-columns-spec">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Column Schema Specification
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-150">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-650 text-slate-500 font-bold">
                      <th className="p-3">Column Name</th>
                      <th className="p-3">Data Type</th>
                      <th className="p-3">Role / Constraint</th>
                      <th className="p-3">Factual Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayedTable.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-3 font-mono font-bold text-slate-800">{col.name}</td>
                        <td className="p-3 font-mono text-indigo-700">{col.type}</td>
                        <td className="p-3">
                          <span className="font-mono text-[10px] bg-slate-150 bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {col.constraints || 'none'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Indexes Specific list */}
            {displayedTable.indexes.length > 0 && (
              <div className="space-y-2" id="db-indexes-spec">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Indexing Optimization Mapped
                </h4>
                <div className="space-y-2">
                  {displayedTable.indexes.map((idxCode, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-150 p-3 rounded-lg font-mono text-[11px] text-slate-700">
                      {idxCode}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relationships list */}
            <div className="space-y-3" id="db-relationships-spec">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                System Schema Relationships Map
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {displayedTable.relationships.map((rel, idx) => (
                  <li key={idx} className="bg-indigo-50/30 border border-indigo-100 p-3 rounded-xl flex gap-2.5 items-start">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0 mt-1.5" />
                    <span className="text-[11px] text-slate-700 font-semibold leading-relaxed">{rel}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive DDL Block split view */}
            <div className="space-y-3 text-white" id="db-ddl-source">
              <div className="flex justify-between items-center" id="copy-sql-row">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  DDL Schema (PostgreSQL)
                </h4>
                <button 
                  onClick={() => handleCopy(displayedTable.sql.trim(), 'sql')}
                  className="text-[10px] bg-slate-850 border border-slate-800 text-slate-350 hover:text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  {copiedText === 'sql' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-450 text-emerald-400" />
                      Copied SQL!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy CREATE Statement
                    </>
                  )}
                </button>
              </div>
              <pre className="font-mono text-[10px] md:text-[11px] text-slate-105 bg-slate-900 leading-relaxed p-4 rounded-xl border border-slate-800 overflow-x-auto select-all scrollbar-thin">
                {displayedTable.sql.trim()}
              </pre>
            </div>

            {/* Dynamic Example Records visualization */}
            <div className="space-y-3 text-white" id="db-example-record">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-amber-400" />
                  Production Example Entry Record (JSONB schema)
                </h4>
                <button 
                  onClick={() => handleCopy(displayedTable.exampleRecord.trim(), 'json')}
                  className="text-[10px] bg-slate-850 border border-slate-800 text-slate-350 hover:text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  {copiedText === 'json' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied JSON!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSON Record
                    </>
                  )}
                </button>
              </div>
              <pre className="font-mono text-[10px] md:text-[11px] text-indigo-300 bg-slate-900 leading-relaxed p-4 rounded-xl border border-slate-800 overflow-x-auto select-all scrollbar-thin">
                {displayedTable.exampleRecord.trim()}
              </pre>
            </div>

          </div>
        </div>

      </div>

      {/* deep tech columns about partitioning, caching, backup recovery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="db-operational-blueprints-grid">
        
        {/* Memory Caching Strategy Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4" id="caching-blueprint-card">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
            Redis In-Memory Caching Architecture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            To satisfy stringent microservice SLA metrics, we offload volatile user records, active streaks states, and game leagues rankings entirely to local Redis clusters:
          </p>
          <pre className="font-mono text-[9px] md:text-[10px] text-slate-200 bg-slate-900 p-4 rounded-2xl border border-slate-800 leading-relaxed overflow-x-auto select-all scrollbar-thin">
            {dbCachingStrategy.trim()}
          </pre>
        </div>

        {/* Database Partitioning Strategy Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4" id="partitioning-blueprint-card">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-indigo-500" />
            PostgreSQL Horizontal Table Partitioning
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            To avoid disk contention and lock decay when tracking millions of active user-generated exercises, high-write tracking tables are split logically in storage:
          </p>
          <pre className="font-mono text-[9px] md:text-[10px] text-slate-200 bg-slate-900 p-4 rounded-2xl border border-slate-800 leading-relaxed overflow-x-auto select-all scrollbar-thin">
            {dbPartitioningStrategy.trim()}
          </pre>
        </div>

        {/* Multi-language Localisation Strategy Panel */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 md:col-span-2" id="multilang-blueprint-card">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500" />
            Glossary Localisation & Translation Strategy
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            FalarPortuguês implements structured regionalization (mapping EU regional vocabulary styles such as Portuguese enclitics) using schema tags and JSONB translation matrices.
          </p>
          <pre className="font-mono text-[10px] text-indigo-105 text-indigo-300 bg-slate-900 p-4 rounded-2xl border border-slate-800 leading-relaxed overflow-x-auto scrollbar-thin">
            {dbMultiLanguageStrategy.trim()}
          </pre>
        </div>

        {/* DB Optimization Recommendations */}
        <div className="bg-indigo-50/20 border border-indigo-100 rounded-3xl p-6 space-y-4" id="db-optimizations-blueprint">
          <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Query Optimization Matrix
          </h3>
          <ul className="space-y-3 text-xs text-slate-700 font-medium">
            {dbOptimizations.map((opt, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="w-2 h-2 bg-indigo-500 rounded-full shrink-0 mt-1.5" />
                <span>{opt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Backup and Disaster Recovery Strategy */}
        <div className="bg-rose-50/20 border border-rose-100 rounded-3xl p-6 space-y-4" id="db-backup-blueprint">
          <h3 className="text-xs font-black text-rose-900 uppercase tracking-widest flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
            Backup & Disaster Recovery Strategy
          </h3>
          <ul className="space-y-3 text-xs text-slate-700 font-medium">
            {dbBackupStrategy.map((drv, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full shrink-0 mt-1.5" />
                <span>{drv}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
