import React from 'react';
import { Article } from '../types';

interface ElectionSectionProps {
  leadArticle: Article;
  onSelectArticle: (articleId: string) => void;
  onOpenPolls: (tab: 'Senate' | 'House' | 'Governor' | 'Approval') => void;
}

export const ElectionSection: React.FC<ElectionSectionProps> = ({
  leadArticle,
  onSelectArticle,
  onOpenPolls
}) => {
  const dispatches = [
    {
      id: 'ossoff-dispatch',
      text: 'Jon Ossoff says he’s not running for president, but history says he can change his mind.'
    },
    {
      id: 'ad-spend-dispatch',
      text: 'The breathtaking cost of the midterms: $10 billion and counting on ads.'
    },
    {
      id: 'maryland-gas-dispatch',
      text: 'A Maryland lawmaker blamed Democrats for high gas prices. Laughter ensued.'
    }
  ];

  return (
    <section className="border-t-2 border-[#121212] pt-3 pb-4 mb-4" data-purpose="midterms-tracker">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#121212]">
          Election Dispatches
        </span>
      </div>

      {/* Fast links bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 text-[11px] whitespace-nowrap no-scrollbar font-sans font-medium text-[#5a5a5a] border-b border-[#e2e2e2]">
        <button onClick={() => onOpenPolls('Senate')} className="text-[#121212] font-bold hover:underline cursor-pointer">
          Tracking Early Vote
        </button>
        <span className="text-[#e2e2e2]">•</span>
        <button onClick={() => onOpenPolls('House')} className="hover:underline cursor-pointer">
          Race for Congress
        </button>
        <span className="text-[#e2e2e2]">•</span>
        <button onClick={() => onOpenPolls('Governor')} className="hover:underline cursor-pointer">
          When to Vote
        </button>
        <span className="text-[#e2e2e2]">•</span>
        <button onClick={() => onOpenPolls('Approval')} className="hover:underline cursor-pointer">
          Latest Polls
        </button>
      </div>

      <article className="mt-3">
        <h2 className="headline-serif text-[20px] font-bold leading-tight mb-2 text-[#121212]">
          <div
            onClick={() => onSelectArticle(leadArticle.id)}
            className="hover:underline cursor-pointer"
          >
            {leadArticle.title}
          </div>
        </h2>

        {/* Bulleted dispatches */}
        <ul className="space-y-2 mt-2.5 text-[13.5px] summary-serif text-[#121212] pl-3 border-l-2 border-[#e2e2e2]">
          {dispatches.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => onSelectArticle(leadArticle.id)}
                className="hover:underline cursor-pointer text-[#121212]"
              >
                {item.text}
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* Polls Widget Quick Links */}
      <div className="mt-4 pt-3 border-t border-[#e2e2e2] grid grid-cols-4 gap-1 text-center font-sans">
        <button
          onClick={() => onOpenPolls('Senate')}
          className="bg-gray-50 border border-[#e2e2e2] py-1.5 px-1 rounded-xs text-[10px] font-bold text-[#121212] hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Senate ›
        </button>
        <button
          onClick={() => onOpenPolls('House')}
          className="bg-gray-50 border border-[#e2e2e2] py-1.5 px-1 rounded-xs text-[10px] font-bold text-[#121212] hover:bg-gray-200 transition-colors cursor-pointer"
        >
          House ›
        </button>
        <button
          onClick={() => onOpenPolls('Governor')}
          className="bg-gray-50 border border-[#e2e2e2] py-1.5 px-1 rounded-xs text-[10px] font-bold text-[#121212] hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Governor ›
        </button>
        <button
          onClick={() => onOpenPolls('Approval')}
          className="bg-gray-50 border border-[#e2e2e2] py-1.5 px-1 rounded-xs text-[10px] font-bold text-[#121212] hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Approval ›
        </button>
      </div>
    </section>
  );
};
