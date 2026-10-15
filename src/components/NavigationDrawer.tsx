import React, { useState } from 'react';
import { X, Search, Bookmark, Newspaper, Sparkles, ChevronRight, Gamepad2 } from 'lucide-react';
import { Article } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: string) => void;
  onSelectGame: (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (articleId: string) => void;
  onOpenSubscribe: () => void;
  isSubscriber: boolean;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onSelectGame,
  bookmarkedArticles,
  onSelectArticle,
  onOpenSubscribe,
  isSubscriber
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'sections' | 'saved'>('sections');

  if (!isOpen) return null;

  const sections = [
    'Home', 'World', 'U.S. Politics', 'New York', 'Business & Economy',
    'Tech', 'Science', 'Health', 'Sports', 'Arts & Culture',
    'Books', 'Style & Fashion', 'Food & Cooking', 'Travel',
    'Magazine', 'Opinion', 'Audio', 'Games & Puzzles'
  ];

  const filteredSections = sections.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex animate-fade-in">
      <div className="w-[85%] max-w-xs bg-white h-full flex flex-col border-r border-[#121212] shadow-2xl">
        {/* Drawer Header */}
        <div className="p-3.5 border-b border-[#e2e2e2] flex items-center justify-between">
          <span className="nyt-logo text-[22px]">The New York Times</span>
          <button
            onClick={onClose}
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-[#e2e2e2]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-[#727272]" />
            <input
              type="text"
              placeholder="Search news, topics, writers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-[12px] bg-[#f7f7f7] border border-[#e2e2e2] rounded-xs font-sans focus:outline-none focus:border-[#121212]"
            />
          </div>
        </div>

        {/* Tab Switcher: Sections vs Saved */}
        <div className="grid grid-cols-2 border-b border-[#e2e2e2] text-[11px] font-bold text-center">
          <button
            onClick={() => setActiveTab('sections')}
            className={`py-2 border-b-2 transition-colors ${
              activeTab === 'sections'
                ? 'border-[#121212] text-[#121212]'
                : 'border-transparent text-[#727272]'
            }`}
          >
            Sections
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-2 border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-[#121212] text-[#121212]'
                : 'border-transparent text-[#727272]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({bookmarkedArticles.length})</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === 'sections' ? (
            <div className="space-y-1">
              {/* Quick Games Shortcut */}
              <div className="mb-3 pb-2 border-b border-[#e2e2e2]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-1.5 px-2">
                  Daily Puzzles
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => { onSelectGame('wordle'); onClose(); }}
                    className="p-1.5 border border-[#e2e2e2] rounded flex items-center gap-2 hover:bg-gray-50 text-left"
                  >
                    <span className="w-4 h-4 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[9px] rounded-xs">W</span>
                    <span className="text-[12px] font-bold text-[#121212]">Wordle</span>
                  </button>
                  <button
                    onClick={() => { onSelectGame('mini'); onClose(); }}
                    className="p-1.5 border border-[#e2e2e2] rounded flex items-center gap-2 hover:bg-gray-50 text-left"
                  >
                    <span className="w-4 h-4 bg-[#121212] text-white flex items-center justify-center font-bold text-[9px] rounded-xs">M</span>
                    <span className="text-[12px] font-bold text-[#121212]">The Mini</span>
                  </button>
                  <button
                    onClick={() => { onSelectGame('connections'); onClose(); }}
                    className="p-1.5 border border-[#e2e2e2] rounded flex items-center gap-2 hover:bg-gray-50 text-left"
                  >
                    <span className="w-4 h-4 bg-[#f6c344] text-[#121212] flex items-center justify-center font-bold text-[9px] rounded-xs">C</span>
                    <span className="text-[12px] font-bold text-[#121212]">Connections</span>
                  </button>
                  <button
                    onClick={() => { onSelectGame('spelling-bee'); onClose(); }}
                    className="p-1.5 border border-[#e2e2e2] rounded flex items-center gap-2 hover:bg-gray-50 text-left"
                  >
                    <span className="text-[12px]">🐝</span>
                    <span className="text-[12px] font-bold text-[#121212]">Spelling Bee</span>
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#727272] mb-1 px-2">
                All Sections
              </div>
              {filteredSections.map(s => (
                <button
                  key={s}
                  onClick={() => {
                    onSelectSection(s);
                    onClose();
                  }}
                  className="w-full text-left px-2 py-2 text-[14px] font-medium text-[#121212] hover:bg-gray-100 rounded flex items-center justify-between"
                >
                  <span>{s}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              ))}
            </div>
          ) : (
            <div>
              {bookmarkedArticles.length === 0 ? (
                <div className="text-center py-8 text-[#727272]">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-[13px] font-medium">No saved articles yet.</p>
                  <p className="text-[11px] mt-1">Tap the bookmark icon on any article to save it for later.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {bookmarkedArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onSelectArticle(art.id);
                        onClose();
                      }}
                      className="p-2 border border-[#e2e2e2] rounded-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <h4 className="headline-serif text-[14px] font-bold leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-[#727272]">
                        <span>{art.section}</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Bottom */}
        <div className="p-3 border-t border-[#e2e2e2] bg-[#fbfbfb]">
          {!isSubscriber ? (
            <button
              onClick={() => {
                onOpenSubscribe();
                onClose();
              }}
              className="w-full bg-[#121212] text-white py-2 rounded-xs text-[12px] font-bold hover:bg-[#333]"
            >
              Subscribe for $1/week
            </button>
          ) : (
            <div className="text-[12px] text-center font-bold text-emerald-700 flex items-center justify-center gap-1.5 py-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>All-Access Member</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
