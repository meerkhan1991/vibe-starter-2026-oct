import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Share2, HelpCircle, Trophy } from 'lucide-react';

interface WordleGameProps {
  onBack: () => void;
}

const TARGET_WORDS = ['TIMES', 'TRUTH', 'PRESS', 'MEDIA', 'VOICE', 'STORY', 'DAILY'];
const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export const WordleGame: React.FC<WordleGameProps> = ({ onBack }) => {
  const [targetWordIndex, setTargetWordIndex] = useState(0);
  const targetWord = TARGET_WORDS[targetWordIndex];
  
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shakeRow, setShakeRow] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') {
        submitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => (prev + e.key.toUpperCase()).slice(0, WORD_LENGTH));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, guesses]);

  const submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setShakeRow(true);
      setTimeout(() => setShakeRow(false), 500);
      return;
    }

    const nextGuesses = [...guesses, currentGuess];
    setGuesses(nextGuesses);
    setCurrentGuess('');

    if (currentGuess === targetWord) {
      setGameStatus('won');
      setShowStats(true);
    } else if (nextGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
      setShowStats(true);
    }
  };

  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'playing') return;
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => (prev + key).slice(0, WORD_LENGTH));
    }
  };

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (targetWord[index] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyStatus = (key: string) => {
    let status = '';
    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === key) {
          if (targetWord[i] === key) return 'correct';
          if (targetWord.includes(key)) status = 'present';
          else if (!status) status = 'absent';
        }
      }
    }
    return status;
  };

  const resetGame = () => {
    setTargetWordIndex(prev => (prev + 1) % TARGET_WORDS.length);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setShowStats(false);
  };

  const getShareText = () => {
    let result = `NYT Wordle ${guesses.length}/${MAX_GUESSES}\n\n`;
    guesses.forEach(g => {
      for (let i = 0; i < WORD_LENGTH; i++) {
        if (g[i] === targetWord[i]) result += '🟩';
        else if (targetWord.includes(g[i])) result += '🟨';
        else result += '⬛';
      }
      result += '\n';
    });
    return result;
  };

  const copyResults = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

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
          <span className="w-6 h-6 bg-[#6aaa64] text-white flex items-center justify-center font-bold text-[12px] rounded-sm">
            W
          </span>
          <h1 className="font-bold text-[17px] tracking-wide font-sans">Wordle</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetGame}
            title="Reset Game"
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            <Trophy className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Wordle Grid */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 px-2">
        <div className="grid grid-rows-6 gap-1.5 w-full max-w-[300px]">
          {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const guessWord = guesses[rowIndex] || (isCurrentRow ? currentGuess.padEnd(WORD_LENGTH, ' ') : '     ');

            return (
              <div
                key={rowIndex}
                className={`grid grid-cols-5 gap-1.5 ${
                  isCurrentRow && shakeRow ? 'animate-bounce' : ''
                }`}
              >
                {Array.from({ length: WORD_LENGTH }).map((__, colIndex) => {
                  const letter = guessWord[colIndex]?.trim() || '';
                  const hasGuessed = rowIndex < guesses.length;
                  let bg = 'border-2 border-[#d3d6da] text-[#121212] bg-white';

                  if (hasGuessed) {
                    const status = getLetterStatus(letter, colIndex, guesses[rowIndex]);
                    if (status === 'correct') bg = 'bg-[#6aaa64] text-white border-[#6aaa64]';
                    else if (status === 'present') bg = 'bg-[#c9b458] text-white border-[#c9b458]';
                    else bg = 'bg-[#787c7e] text-white border-[#787c7e]';
                  } else if (letter) {
                    bg = 'border-2 border-[#878a8c] text-[#121212]';
                  }

                  return (
                    <div
                      key={colIndex}
                      className={`h-12 flex items-center justify-center font-bold text-[22px] uppercase select-none rounded-[2px] transition-all duration-200 ${bg}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard */}
      <div className="px-2 pb-6 max-w-md mx-auto w-full">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 my-1">
            {row.map(k => {
              const status = getKeyStatus(k);
              let btnClass = 'bg-[#d3d6da] text-[#121212] hover:bg-[#bbb]';
              if (status === 'correct') btnClass = 'bg-[#6aaa64] text-white';
              else if (status === 'present') btnClass = 'bg-[#c9b458] text-white';
              else if (status === 'absent') btnClass = 'bg-[#787c7e] text-white';

              const isWide = k === 'ENTER' || k === 'DEL';

              return (
                <button
                  key={k}
                  onClick={() => handleKeyClick(k)}
                  className={`h-11 rounded font-bold text-[12px] flex items-center justify-center transition-colors active:scale-95 ${
                    isWide ? 'px-2.5 text-[10px]' : 'flex-1 max-w-[34px]'
                  } ${btnClass}`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md p-6 max-w-sm w-full text-center shadow-2xl border border-[#121212]">
            <h2 className="headline-serif text-[22px] font-bold mb-2">
              {gameStatus === 'won' ? 'Splendid!' : gameStatus === 'lost' ? 'Nice Try!' : 'Statistics'}
            </h2>
            <p className="summary-serif text-[14px] text-[#5a5a5a] mb-4">
              {gameStatus === 'won'
                ? `You solved today's puzzle in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!`
                : gameStatus === 'lost'
                ? `The word was: ${targetWord}`
                : 'Current game in progress'}
            </p>

            <div className="flex justify-center gap-4 my-4 border-y border-[#e2e2e2] py-3 text-center">
              <div>
                <div className="text-[24px] font-bold">{guesses.length}</div>
                <div className="text-[10px] text-[#727272] uppercase font-sans">Played</div>
              </div>
              <div>
                <div className="text-[24px] font-bold">{gameStatus === 'won' ? '100%' : '0%'}</div>
                <div className="text-[10px] text-[#727272] uppercase font-sans">Win %</div>
              </div>
              <div>
                <div className="text-[24px] font-bold">{gameStatus === 'won' ? '1' : '0'}</div>
                <div className="text-[10px] text-[#727272] uppercase font-sans">Streak</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={copyResults}
                className="flex-1 bg-[#6aaa64] text-white py-2.5 px-3 rounded text-[13px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#599154]"
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Copied to Clipboard!' : 'Share Score'}
              </button>
              <button
                onClick={resetGame}
                className="bg-[#121212] text-white py-2.5 px-3 rounded text-[13px] font-bold hover:bg-[#333]"
              >
                New Word
              </button>
            </div>
            
            <button
              onClick={() => setShowStats(false)}
              className="mt-3 text-[12px] text-[#5a5a5a] hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
