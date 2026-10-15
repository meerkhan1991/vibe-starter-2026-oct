import React, { useState } from 'react';
import { Article } from '../types';
import { ChevronRight, BarChart3 } from 'lucide-react';

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
  const [selectedPreview, setSelectedPreview] = useState<'Senate' | 'House' | 'Governor' | 'Approval'>('Senate');

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

  const quickStats = {
    Senate: { title: 'Texas Senate', dem: 'Talarico (D) 48%', rep: 'Republican (R) 46%', lead: 'D +2' },
    House: { title: 'Generic Ballot', dem: 'Democrats 47.4%', rep: 'Republicans 46.1%', lead: 'D +1.3' },
    Governor: { title: 'NC Governor', dem: 'Stein (D) 51%', rep: 'Robinson (R) 42%', lead: 'D +9' },
    Approval: { title: 'Job Approval', dem: 'Approve 42.1%', rep: 'Disapprove 53.4%', lead: '-11.3%' }
  };

  return (
    <section className="border-t-2 border-[#121212] pt-3 pb-4 mb-4 bg-white" data-purpose="midterms-tracker">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#121212] font-sans">
          Election Dispatches
        </span>
        <button
          onClick={() => onOpenPolls(selectedPreview)}
          className="text-[10px] text-[#2b6cb0] hover:underline flex items-center gap-0.5 font-sans font-semibold cursor-pointer"
        >
          <BarChart3 className="w-3 h-3" />
          <span>Full Tracker</span>
        </button>
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
        <h2 className="headline-serif text-[20px] sm:text-[22px] font-bold leading-tight mb-2 text-[#121212]">
          <div
            onClick={() => onSelectArticle(leadArticle.id)}
            className="hover:underline cursor-pointer transition-colors"
          >
            {leadArticle.title}
          </div>
        </h2>

        {/* Bulleted dispatches */}
        <ul className="space-y-2 mt-2.5 text-[13.5px] sm:text-[14px] summary-serif text-[#121212] pl-3 border-l-2 border-[#e2e2e2]">
          {dispatches.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => onSelectArticle(leadArticle.id)}
                className="hover:underline cursor-pointer text-[#121212] leading-snug"
              >
                {item.text}
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* Polls Widget Quick Links with interactive mini-preview */}
      <div className="mt-4 pt-3 border-t border-[#e2e2e2]">
        <div className="grid grid-cols-4 gap-1 text-center font-sans mb-2">
          {(['Senate', 'House', 'Governor', 'Approval'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setSelectedPreview(tab);
                onOpenPolls(tab);
              }}
              className={`py-1.5 px-1 rounded-xs text-[10px] font-bold transition-colors cursor-pointer border ${
                selectedPreview === tab
                  ? 'bg-[#121212] text-white border-[#121212]'
                  : 'bg-gray-50 border-[#e2e2e2] text-[#121212] hover:bg-gray-200'
              }`}
            >
              {tab} ›
            </button>
          ))}
        </div>

        {/* Mini poll banner */}
        <div 
          onClick={() => onOpenPolls(selectedPreview)}
          className="bg-[#fafafa] border border-[#e2e2e2] p-2 rounded-xs flex items-center justify-between text-[11px] font-sans cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#121212]">{quickStats[selectedPreview].title}:</span>
            <span className="text-[#2b6cb0] font-medium">{quickStats[selectedPreview].dem}</span>
            <span className="text-[#888]">vs</span>
            <span className="text-red-700 font-medium">{quickStats[selectedPreview].rep}</span>
          </div>
          <span className="font-bold text-[10px] bg-white border border-[#e2e2e2] px-1.5 py-0.5 rounded-xs">
            {quickStats[selectedPreview].lead}
          </span>
        </div>
      </div>
    </section>
  );
};
