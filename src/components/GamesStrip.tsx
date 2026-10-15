import React from 'react';

interface GamesStripProps {
  onSelectGame: (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => void;
}

export const GamesStrip: React.FC<GamesStripProps> = ({ onSelectGame }) => {
  return (
    <div className="mb-5">
      <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#121212] mb-3">
        Games &amp; Puzzles
      </h3>

      {/* Interactive Games 4-Box Mobile Strip */}
      <div className="grid grid-cols-2 gap-2">
        {/* Wordle */}
        <button
          onClick={() => onSelectGame('wordle')}
          className="border border-[#e2e2e2] p-2.5 rounded-xs flex items-center justify-between hover:border-[#121212] transition-colors text-left bg-white cursor-pointer group shadow-2xs"
        >
          <div>
            <div className="font-bold text-[13px] text-[#121212] group-hover:text-black">
              Wordle
            </div>
            <div className="text-[11px] text-[#727272]">Daily 5-letter word</div>
          </div>
          <span className="w-5 h-5 bg-[#15803d] text-white flex items-center justify-center font-bold text-[10px] rounded-xs shrink-0">
            W
          </span>
        </button>

        {/* Connections */}
        <button
          onClick={() => onSelectGame('connections')}
          className="border border-[#e2e2e2] p-2.5 rounded-xs flex items-center justify-between hover:border-[#121212] transition-colors text-left bg-white cursor-pointer group shadow-2xs"
        >
          <div>
            <div className="font-bold text-[13px] text-[#121212] group-hover:text-black">
              Connections
            </div>
            <div className="text-[11px] text-[#727272]">Group the threads</div>
          </div>
          <span className="w-5 h-5 bg-[#f6c344] text-[#121212] flex items-center justify-center font-bold text-[10px] rounded-xs shrink-0">
            C
          </span>
        </button>

        {/* Spelling Bee */}
        <button
          onClick={() => onSelectGame('spelling-bee')}
          className="border border-[#e2e2e2] p-2.5 rounded-xs flex items-center justify-between hover:border-[#121212] transition-colors text-left bg-white cursor-pointer group shadow-2xs"
        >
          <div>
            <div className="font-bold text-[13px] text-[#121212] group-hover:text-black">
              Spelling Bee
            </div>
            <div className="text-[11px] text-[#727272]">Make words</div>
          </div>
          <span className="w-5 h-5 bg-amber-400 text-[#121212] flex items-center justify-center font-bold text-[10px] rounded-full shrink-0">
            🐝
          </span>
        </button>

        {/* The Mini */}
        <button
          onClick={() => onSelectGame('mini')}
          className="border border-[#e2e2e2] p-2.5 rounded-xs flex items-center justify-between hover:border-[#121212] transition-colors text-left bg-white cursor-pointer group shadow-2xs"
        >
          <div>
            <div className="font-bold text-[13px] text-[#121212] group-hover:text-black">
              The Mini
            </div>
            <div className="text-[11px] text-[#727272]">Bite-sized crossword</div>
          </div>
          <span className="w-5 h-5 bg-[#121212] text-white flex items-center justify-center font-bold text-[10px] rounded-xs shrink-0">
            M
          </span>
        </button>
      </div>
    </div>
  );
};
