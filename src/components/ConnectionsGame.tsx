import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Shuffle, Check } from 'lucide-react';

interface ConnectionsGameProps {
  onBack: () => void;
}

interface Category {
  level: number; // 0 = yellow, 1 = green, 2 = blue, 3 = purple
  title: string;
  items: string[];
  colorClass: string;
  badgeBg: string;
}

const CATEGORIES: Category[] = [
  {
    level: 0,
    title: 'NEWSPAPER SECTIONS',
    items: ['SPORTS', 'STYLE', 'OPINION', 'BUSINESS'],
    colorClass: 'bg-[#f9df6d] text-[#121212]',
    badgeBg: '#f9df6d'
  },
  {
    level: 1,
    title: 'THINGS THAT ARE PRINTED',
    items: ['BOOKS', 'STAMPS', 'CURRENCY', 'FLYERS'],
    colorClass: 'bg-[#a0c35a] text-[#121212]',
    badgeBg: '#a0c35a'
  },
  {
    level: 2,
    title: 'PARTS OF A HEADLINE STORY',
    items: ['KICKER', 'SUBTITLE', 'BYLINE', 'DATELINE'],
    colorClass: 'bg-[#b0c4de] text-[#121212]',
    badgeBg: '#b0c4de'
  },
  {
    level: 3,
    title: 'WORDS WITH DOUBLE VOWELS',
    items: ['BEET', 'MOON', 'FLEA', 'ROOF'],
    colorClass: 'bg-[#ba81c5] text-white',
    badgeBg: '#ba81c5'
  }
];

export const ConnectionsGame: React.FC<ConnectionsGameProps> = ({ onBack }) => {
  const allInitialItems = CATEGORIES.flatMap(c => c.items).sort(() => Math.random() - 0.5);
  const [itemsPool, setItemsPool] = useState<string[]>(allInitialItems);
  const [selected, setSelected] = useState<string[]>([]);
  const [completedCategories, setCompletedCategories] = useState<Category[]>([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else if (selected.length < 4) {
      setSelected([...selected, item]);
    }
  };

  const handleShuffle = () => {
    setItemsPool([...itemsPool].sort(() => Math.random() - 0.5));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleSubmit = () => {
    if (selected.length !== 4) return;

    // Check if match
    const matchedCategory = CATEGORIES.find(cat =>
      selected.every(word => cat.items.includes(word))
    );

    if (matchedCategory) {
      setCompletedCategories([...completedCategories, matchedCategory]);
      setItemsPool(itemsPool.filter(i => !matchedCategory.items.includes(i)));
      setSelected([]);
      setBannerMessage('Excellent!');
      setTimeout(() => setBannerMessage(null), 1500);
    } else {
      // Check if one away
      const oneAway = CATEGORIES.some(cat => {
        const matches = selected.filter(word => cat.items.includes(word)).length;
        return matches === 3;
      });

      const nextMistakes = mistakesRemaining - 1;
      setMistakesRemaining(nextMistakes);

      if (oneAway) {
        setBannerMessage('One away...');
      } else {
        setBannerMessage('Incorrect group');
      }
      setTimeout(() => setBannerMessage(null), 1500);
    }
  };

  const handleReset = () => {
    setCompletedCategories([]);
    setMistakesRemaining(4);
    setSelected([]);
    setItemsPool(CATEGORIES.flatMap(c => c.items).sort(() => Math.random() - 0.5));
  };

  const isGameOver = mistakesRemaining <= 0;
  const isWon = completedCategories.length === CATEGORIES.length;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto border-x border-[#e2e2e2]">
      {/* Header */}
      <header className="border-b border-[#e2e2e2] px-3.5 h-12 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-sans font-medium hover:text-[#5a5a5a]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-1.5">
          <span className="w-6 h-6 bg-[#f6c344] text-[#121212] flex items-center justify-center font-bold text-[12px] rounded-sm">
            C
          </span>
          <h1 className="font-bold text-[17px] tracking-wide font-sans">Connections</h1>
        </div>

        <button
          onClick={handleReset}
          title="Reset"
          className="p-1 text-[#5a5a5a] hover:text-[#121212]"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex flex-col justify-start px-3.5 py-4">
        <div className="text-center mb-4">
          <h2 className="text-[14px] font-bold text-[#121212]">Create four groups of four!</h2>
          <p className="text-[12px] text-[#5a5a5a]">Find threads connecting words together.</p>
        </div>

        {bannerMessage && (
          <div className="bg-[#121212] text-white text-center py-2 px-4 rounded text-[13px] font-medium mb-3 animate-fade-in">
            {bannerMessage}
          </div>
        )}

        {/* Solved categories */}
        <div className="space-y-2 mb-3">
          {completedCategories.map(cat => (
            <div
              key={cat.title}
              className={`p-3 rounded-md text-center ${cat.colorClass}`}
            >
              <div className="font-bold text-[13px] tracking-wider uppercase">{cat.title}</div>
              <div className="text-[12px] mt-0.5 tracking-wide">{cat.items.join(', ')}</div>
            </div>
          ))}
        </div>

        {/* Tiles Grid */}
        {!isGameOver && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            {itemsPool.map(item => {
              const isSelected = selected.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleSelect(item)}
                  className={`h-16 rounded-md font-bold text-[11px] sm:text-[12px] flex items-center justify-center p-1 uppercase text-center transition-all ${
                    isSelected
                      ? 'bg-[#5a5a5a] text-white scale-98 shadow-inner'
                      : 'bg-[#efefe6] text-[#121212] hover:bg-[#e2e2d8]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        )}

        {/* Mistakes counter */}
        <div className="flex items-center justify-center gap-2 mb-4 text-[12px] font-medium text-[#5a5a5a]">
          <span>Mistakes remaining:</span>
          <div className="flex gap-1.5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full ${
                  idx < mistakesRemaining ? 'bg-[#5a5a5a]' : 'bg-[#e2e2e2]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center gap-2 mt-auto pb-4">
          <button
            onClick={handleShuffle}
            disabled={isGameOver || isWon}
            className="border border-[#121212] rounded-full px-4 py-2 text-[12px] font-bold text-[#121212] hover:bg-gray-100 disabled:opacity-40"
          >
            Shuffle
          </button>
          <button
            onClick={handleDeselectAll}
            disabled={selected.length === 0}
            className="border border-[#121212] rounded-full px-4 py-2 text-[12px] font-bold text-[#121212] hover:bg-gray-100 disabled:opacity-40"
          >
            Deselect All
          </button>
          <button
            onClick={handleSubmit}
            disabled={selected.length !== 4 || isGameOver || isWon}
            className="bg-[#121212] text-white rounded-full px-5 py-2 text-[12px] font-bold hover:bg-[#333] disabled:opacity-40"
          >
            Submit
          </button>
        </div>

        {/* Win/Loss Modal */}
        {(isWon || isGameOver) && (
          <div className="p-4 bg-[#f7f7f7] border border-[#e2e2e2] rounded-md text-center mt-2">
            <h3 className="headline-serif text-[18px] font-bold mb-1">
              {isWon ? 'Next level genius!' : 'Better luck next time!'}
            </h3>
            <p className="text-[12px] text-[#5a5a5a] mb-3">
              {isWon ? 'You solved all four groups!' : 'You ran out of mistakes.'}
            </p>
            <button
              onClick={handleReset}
              className="bg-[#121212] text-white px-4 py-2 rounded text-[12px] font-bold hover:bg-[#333]"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
