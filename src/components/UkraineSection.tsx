import React, { useState } from 'react';
import { Article } from '../types';

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

  const pills = ['Wins for Putin', 'Escalating Assaults', 'Russian Oil Deal'];

  return (
    <section className="border-t-2 border-[#121212] pt-3 pb-4 mb-4" data-purpose="russia-ukraine-section">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#990000]">
          Russia-Ukraine War
        </span>
      </div>

      {/* Quick Topic Pills / Highlights */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#121212] font-sans font-medium mb-3 pb-2 border-b border-[#e2e2e2]">
        {pills.map((pill, idx) => (
          <React.Fragment key={pill}>
            <button
              onClick={() => setActivePill(activePill === pill ? null : pill)}
              className={`hover:underline flex items-center gap-1 cursor-pointer transition-opacity ${
                activePill === pill ? 'font-bold text-[#990000]' : ''
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${activePill === pill ? 'bg-[#990000]' : 'bg-[#121212]'}`}></span>
              <span>{pill}</span>
            </button>
            {idx < pills.length - 1 && <span className="text-[#e2e2e2]">•</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Active Pill Filter Notice */}
      {activePill && (
        <div className="text-[11px] text-[#5a5a5a] bg-[#f7f7f7] p-2 rounded-xs mb-3 flex items-center justify-between">
          <span>Filtering coverage by topic: <strong>{activePill}</strong></span>
          <button
            onClick={() => setActivePill(null)}
            className="text-[10px] text-[#121212] font-bold hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* Headline & Summary */}
      <article className="mb-3">
        <div
          onClick={() => onSelectArticle(leadArticle.id)}
          className="group block cursor-pointer"
        >
          <h2 className="headline-serif text-[21px] font-bold leading-tight mb-1.5 text-[#121212] group-hover:text-[#5a5a5a] transition-colors">
            {leadArticle.title}
          </h2>
          <p className="summary-serif text-[14px] text-[#333333] leading-snug mb-2">
            {leadArticle.summary}
          </p>
          <div className="flex items-center gap-1.5 text-[#727272] text-[11px] font-sans">
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
            className="cursor-pointer group"
          >
            <h3 className="headline-serif text-[15px] font-bold text-[#121212] leading-snug group-hover:underline">
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
            className="cursor-pointer group"
          >
            <h3 className="headline-serif text-[15px] font-bold text-[#121212] leading-snug group-hover:underline">
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
