import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Flame } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/nytData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
  onSelectGame: (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectGame
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allArticles = Object.values(ARTICLES);
  const filteredArticles = query.trim()
    ? allArticles.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.section.toLowerCase().includes(query.toLowerCase()) ||
        a.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const trendingTopics = [
    'Trump Administration',
    'Ukraine Satellite',
    'Texas Senate Polls',
    'Midterm Elections',
    'Wordle Daily Word',
    'NYT Cooking Meatballs'
  ];

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4 animate-fade-in backdrop-blur-xs">
      <div className="bg-white max-w-lg w-full rounded-sm border border-[#121212] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#e2e2e2] flex items-center gap-3 bg-[#fafafa]">
          <Search className="w-5 h-5 text-[#727272]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search news, opinions, puzzles, recipes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[15px] font-sans text-[#121212] outline-none placeholder:text-[#888]"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded border border-gray-300">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-[#727272] hover:text-[#121212]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto p-4 flex-1">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#727272] mb-2 font-sans">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Trending Topics Today</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setQuery(topic)}
                      className="bg-[#f2f2f2] hover:bg-[#e4e4e4] text-[#121212] text-[12px] font-sans px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#e2e2e2]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#727272] mb-2 font-sans">
                  Quick Puzzles
                </div>
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <button
                    onClick={() => { onSelectGame('wordle'); onClose(); }}
                    className="p-2 border border-[#e2e2e2] rounded hover:border-[#121212] text-left flex items-center justify-between"
                  >
                    <span className="font-bold">Play Wordle</span>
                    <span className="w-4 h-4 bg-[#15803d] text-white flex items-center justify-center font-bold text-[9px] rounded-xs">W</span>
                  </button>
                  <button
                    onClick={() => { onSelectGame('mini'); onClose(); }}
                    className="p-2 border border-[#e2e2e2] rounded hover:border-[#121212] text-left flex items-center justify-between"
                  >
                    <span className="font-bold">Play The Mini</span>
                    <span className="w-4 h-4 bg-[#121212] text-white flex items-center justify-center font-bold text-[9px] rounded-xs">M</span>
                  </button>
                </div>
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="space-y-3">
              <div className="text-[11px] text-[#727272] uppercase font-bold tracking-wider mb-2">
                Found {filteredArticles.length} {filteredArticles.length === 1 ? 'Result' : 'Results'}
              </div>
              {filteredArticles.map(art => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art.id);
                    onClose();
                  }}
                  className="group p-2.5 rounded-sm hover:bg-[#f7f7f7] cursor-pointer border-b border-[#f0f0f0] last:border-b-0 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[11px] text-[#727272] mb-1">
                    <span className="font-bold uppercase text-[#990000]">{art.section}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="headline-serif text-[16px] font-bold text-[#121212] group-hover:text-[#2b6cb0] leading-snug">
                    {art.title}
                  </h4>
                  <p className="summary-serif text-[13px] text-[#555] line-clamp-2 mt-1">
                    {art.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#727272]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-[14px] font-medium text-[#121212]">No articles found for "{query}"</p>
              <p className="text-[12px] mt-1">Try searching for keywords like "Trump", "Ukraine", "Senate", or "Wordle".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
