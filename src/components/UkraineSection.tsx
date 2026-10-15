import React, { useState } from 'react';
import { Article } from '../types';
import { Radio, Satellite, AlertTriangle } from 'lucide-react';

interface UkraineSectionProps {
  leadArticle: Article;
  dieselArticle: Article;
  intelArticle: Article;
  onSelectArticle: (articleId: string) => void;
}

export const UkraineSection: React.FC<UkraineSectionProps> = ({
  leadArticle,
  dieselArticle,
  intelArticle,
  onSelectArticle
}) => {
  const [activePill, setActivePill] = useState<string | null>(null);
  const [showIntelMap, setShowIntelMap] = useState(false);

  const pills = ['Wins for Putin', 'Escalating Assaults', 'Russian Oil Deal'];

  return (
    <section className="border-t-2 border-[#121212] pt-3 pb-4 mb-4 bg-white" data-purpose="russia-ukraine-section">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#990000] font-sans">
            Russia-Ukraine War
          </span>
          <span className="flex items-center gap-1 text-[9px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-tight animate-pulse">
            Live Updates
          </span>
        </div>

        <button
          onClick={() => setShowIntelMap(!showIntelMap)}
          className="text-[10px] text-[#2b6cb0] hover:underline flex items-center gap-1 font-sans cursor-pointer"
        >
          <Satellite className="w-3 h-3" />
          <span>{showIntelMap ? 'Hide Map' : 'Satellite Brief'}</span>
        </button>
      </div>

      {/* Quick Topic Pills / Highlights */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#121212] font-sans font-medium mb-3 pb-2 border-b border-[#e2e2e2]">
        {pills.map((pill, idx) => (
          <React.Fragment key={pill}>
            <button
              onClick={() => setActivePill(activePill === pill ? null : pill)}
              className={`hover:underline flex items-center gap-1 cursor-pointer transition-colors ${
                activePill === pill ? 'font-bold text-[#990000] underline' : ''
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${activePill === pill ? 'bg-[#990000]' : 'bg-[#121212]'}`}></span>
              <span>{pill}</span>
            </button>
            {idx < pills.length - 1 && <span className="text-[#e2e2e2]">•</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Satellite Briefing Mini Overlay */}
      {showIntelMap && (
        <div className="mb-3 bg-neutral-900 text-white p-3 rounded-xs text-[11px] font-mono border border-neutral-700 animate-fade-in">
          <div className="flex items-center justify-between text-amber-400 mb-1.5 font-bold">
            <span className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-500 animate-ping" />
              ORBITAL SATELLITE TELEMETRY - KYIV CORRIDOR
            </span>
            <span>FREQ 14.2 GHz</span>
          </div>
          <p className="text-neutral-300 font-sans text-[12px] mb-2">
            Downlink capacity curtailed ~45% in eastern districts following grid strikes. Pentagon-subsidized terminal links undergoing rerouting.
          </p>
          <div className="flex justify-between text-[10px] text-neutral-400 border-t border-neutral-800 pt-1">
            <span>Grid Blackout: 600k Kyiv Citizens</span>
            <span className="text-emerald-400">Auxiliary Gen: ACTIVE</span>
          </div>
        </div>
      )}

      {/* Headline & Summary */}
      <article className="mb-3">
        <div
          onClick={() => onSelectArticle(leadArticle.id)}
          className="group block cursor-pointer"
        >
          <h2 className="headline-serif text-[21px] sm:text-[23px] font-bold leading-tight mb-1.5 text-[#121212] group-hover:text-[#5a5a5a] transition-colors">
            {leadArticle.title}
          </h2>
          <p className="summary-serif text-[14px] sm:text-[15px] text-[#333333] leading-snug mb-2 font-normal">
            {leadArticle.summary}
          </p>
          <div className="flex items-center gap-1.5 text-[#727272] text-[11px] font-sans font-medium">
            <svg className="w-3.5 h-3.5 text-[#727272]" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-5 0H8v2h2V9z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span>{leadArticle.commentCount ? `${(leadArticle.commentCount / 1000).toFixed(1)}k` : '1.1k'}</span>
          </div>
        </div>
      </article>

      {/* Secondary War Stories */}
      <div className="grid grid-cols-1 gap-2.5 pt-2 border-t border-[#e2e2e2]">
        <article className="flex justify-between items-baseline gap-2">
          <div
            onClick={() => onSelectArticle(dieselArticle.id)}
            className="cursor-pointer group flex-1"
          >
            <h3 className="headline-serif text-[15px] sm:text-[16px] font-bold text-[#121212] leading-snug group-hover:underline">
              {dieselArticle.title}
            </h3>
            <span className="block text-[10px] text-[#727272] uppercase font-sans mt-0.5">
              {dieselArticle.readTime}
            </span>
          </div>
        </article>

        <article className="flex justify-between items-baseline gap-2 pt-2 border-t border-dashed border-[#e2e2e2]">
          <div
            onClick={() => onSelectArticle(intelArticle.id)}
            className="cursor-pointer group flex-1"
          >
            <h3 className="headline-serif text-[15px] sm:text-[16px] font-bold text-[#121212] leading-snug group-hover:underline">
              {intelArticle.title}
            </h3>
            <span className="block text-[10px] text-[#727272] uppercase font-sans mt-0.5">
              {intelArticle.readTime}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};
