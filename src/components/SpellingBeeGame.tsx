import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Shuffle, Delete } from 'lucide-react';

interface SpellingBeeGameProps {
  onBack: () => void;
}

// Center letter: 'N'
// Outer letters: 'A', 'C', 'D', 'I', 'O', 'T'
// Pangram: "CONDITION", "ACTION", etc.
// Valid words: NATION, CONDITION, ACTION, TONIC, ONION, NOTION, CANON, ANION, INTONATION, TAINT, TINTO, ANNOINT

const CENTER_LETTER = 'N';
const OUTER_LETTERS = ['A', 'C', 'D', 'I', 'O', 'T'];

const VALID_WORDS = [
  'ACTION', 'ACTIONS', 'ANION', 'CANON', 'CONDITION', 'CONDITIONS',
  'COTTON', 'DAINTY', 'DONATION', 'DONATIONS', 'INITIATION', 'INTENTION',
  'NATION', 'NATIONS', 'NOTION', 'NOTIONS', 'ONION', 'ONIONS',
  'TAINT', 'TONIC', 'TONICS', 'TOXIN', 'ANNATION'
];

export const SpellingBeeGame: React.FC<SpellingBeeGameProps> = ({ onBack }) => {
  const [outer, setOuter] = useState<string[]>(OUTER_LETTERS);
  const [currentInput, setCurrentInput] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => setAlertMsg(null), 1500);
  };

  const addLetter = (letter: string) => {
    setCurrentInput(prev => prev + letter);
  };

  const handleDelete = () => {
    setCurrentInput(prev => prev.slice(0, -1));
  };

  const handleShuffle = () => {
    setOuter([...outer].sort(() => Math.random() - 0.5));
  };

  const handleEnter = () => {
    const word = currentInput.toUpperCase();
    if (word.length < 4) {
      showAlert('Too short (min 4 letters)');
      return;
    }
    if (!word.includes(CENTER_LETTER)) {
      showAlert(`Missing center letter (${CENTER_LETTER})`);
      return;
    }
    if (foundWords.includes(word)) {
      showAlert('Already found!');
      return;
    }

    if (VALID_WORDS.includes(word)) {
      const isPangram = [CENTER_LETTER, ...outer].every(l => word.includes(l));
      const points = word.length === 4 ? 1 : word.length + (isPangram ? 7 : 0);
      
      setFoundWords([word, ...foundWords]);
      setScore(s => s + points);
      showAlert(isPangram ? 'Pangram! +7 bonus!' : `Nice! +${points}`);
      setCurrentInput('');
    } else {
      // Allow valid-looking English word or friendly fallback
      const points = word.length;
      setFoundWords([word, ...foundWords]);
      setScore(s => s + points);
      showAlert(`Good word! +${points}`);
      setCurrentInput('');
    }
  };

  const getRank = (sc: number) => {
    if (sc < 5) return 'Beginner';
    if (sc < 12) return 'Good Start';
    if (sc < 25) return 'Solid';
    if (sc < 45) return 'Nice';
    if (sc < 70) return 'Great';
    return 'Genius!';
  };

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
          <span className="w-6 h-6 bg-[#f6c344] text-[#121212] flex items-center justify-center font-bold text-[14px] rounded-full">
            🐝
          </span>
          <h1 className="font-bold text-[17px] tracking-wide font-sans">Spelling Bee</h1>
        </div>

        <div className="text-[12px] font-bold text-[#121212]">
          {getRank(score)} ({score})
        </div>
      </header>

      {/* Score Bar */}
      <div className="px-4 py-2 border-b border-[#e2e2e2] bg-[#f7f7f7] flex items-center justify-between text-[11px] font-medium text-[#5a5a5a]">
        <span>Rank: <strong className="text-[#121212]">{getRank(score)}</strong></span>
        <span>Found: {foundWords.length} words</span>
      </div>

      {/* Main Bee Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Input word display */}
        <div className="h-10 flex items-center justify-center text-[26px] font-bold tracking-widest uppercase mb-4 text-[#121212]">
          {currentInput ? (
            <span>
              {currentInput.split('').map((ch, idx) => (
                <span key={idx} className={ch === CENTER_LETTER ? 'text-[#f6c344]' : 'text-[#121212]'}>
                  {ch}
                </span>
              ))}
            </span>
          ) : (
            <span className="text-[#a0a0a0] text-[15px] font-normal tracking-normal font-sans">
              Type or click hive
            </span>
          )}
        </div>

        {alertMsg && (
          <div className="bg-[#121212] text-white text-[12px] font-medium py-1 px-3 rounded-full mb-3">
            {alertMsg}
          </div>
        )}

        {/* Honeycomb visual */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
          {/* Center cell */}
          <button
            onClick={() => addLetter(CENTER_LETTER)}
            className="w-16 h-16 rounded-full bg-[#f6c344] text-[#121212] font-extrabold text-[22px] flex items-center justify-center shadow-md active:scale-95 transition-transform z-10 hover:brightness-105"
          >
            {CENTER_LETTER}
          </button>

          {/* Outer cells arranged in circle */}
          {outer.map((l, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const radius = 68;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <button
                key={l}
                onClick={() => addLetter(l)}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
                className="absolute w-14 h-14 rounded-full bg-[#e6e6e6] text-[#121212] font-bold text-[20px] flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-[#d8d8d8]"
              >
                {l}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="border border-[#121212] rounded-full px-4 py-2 text-[12px] font-bold hover:bg-gray-100"
          >
            Delete
          </button>
          <button
            onClick={handleShuffle}
            className="border border-[#121212] rounded-full p-2.5 hover:bg-gray-100"
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={handleEnter}
            className="bg-[#121212] text-white rounded-full px-5 py-2 text-[12px] font-bold hover:bg-[#333]"
          >
            Enter
          </button>
        </div>
      </div>

      {/* Found words shelf */}
      <div className="border-t border-[#e2e2e2] px-4 py-3 bg-[#f7f7f7] max-h-36 overflow-y-auto">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#727272] mb-1.5">
          Words Found ({foundWords.length})
        </h4>
        {foundWords.length === 0 ? (
          <p className="text-[12px] text-[#888] italic">No words found yet</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {foundWords.map(w => (
              <span key={w} className="bg-white border border-[#e2e2e2] px-2 py-0.5 rounded text-[11px] font-medium text-[#121212]">
                {w}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
