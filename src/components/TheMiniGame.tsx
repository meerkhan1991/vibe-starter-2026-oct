import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface TheMiniGameProps {
  onBack: () => void;
}

// 5x5 Mini Crossword
// Grid layout:
// T I M E S
// O M E G A
// P A P E R
// I D L E S
// C O D E X
// Black squares can be added or a clean 5x5 word square!
// Let's use a standard NYT mini word square:
// 1: P A P E R
// 2: A G O N Y
// 3: P O L K A
// 4: E N O C H
// 5: R Y E S S (or a classic NYT Mini with 2-3 black blocks)

const SOLUTION_GRID = [
  ['N', 'E', 'W', 'S', '.'],
  ['O', 'M', 'E', 'G', 'A'],
  ['V', 'O', 'I', 'C', 'E'],
  ['E', 'T', 'G', 'H', 'T'],
  ['.', 'E', 'H', 'E', 'S']
];

// Let's make a crisp, canonical 5x5 puzzle:
// S T A R T
// H O N O R
// A U D I O
// R E L A X
// D A T E S

const PUZZLE = {
  grid: [
    ['S', 'T', 'A', 'R', 'T'],
    ['H', 'O', 'N', 'O', 'R'],
    ['A', 'U', 'D', 'I', 'O'],
    ['R', 'E', 'L', 'A', 'X'],
    ['D', 'S', 'E', 'A', 'T'] // modified slightly or classic
  ],
  clues: {
    across: [
      { num: 1, text: 'Commence or begin', answer: 'START', row: 0, col: 0 },
      { num: 6, text: 'High moral integrity or respect', answer: 'HONOR', row: 1, col: 0 },
      { num: 7, text: 'Sound recording or podcast format', answer: 'AUDIO', row: 2, col: 0 },
      { num: 8, text: 'Unwind after a long news cycle', answer: 'RELAX', row: 3, col: 0 },
      { num: 9, text: 'Front-row spot in Congress', answer: 'SEATS', row: 4, col: 0 }
    ],
    down: [
      { num: 1, text: 'Fragment of broken pottery or glass', answer: 'SHARD', row: 0, col: 0 },
      { num: 2, text: 'Tour or journey in France', answer: 'TOURS', row: 0, col: 1 },
      { num: 3, text: 'A single grain on a beach', answer: 'ANDLE', row: 0, col: 2 },
      { num: 4, text: 'Brazilian music style: ___ Nova', answer: 'BOSSA', row: 0, col: 3 },
      { num: 5, text: 'Formal written agreements', answer: 'TEXTS', row: 0, col: 4 }
    ]
  }
};

// Let's ensure exact 5x5 consistency:
// S H A R P
// H E L L O
// A L O N E
// R O B O T
// P E N C E

const MINI_SOLUTION = [
  ['S', 'H', 'A', 'R', 'P'],
  ['H', 'E', 'L', 'L', 'O'],
  ['A', 'L', 'O', 'N', 'E'],
  ['R', 'O', 'B', 'O', 'T'],
  ['P', 'E', 'N', 'C', 'E']
];

const MINI_CLUES = {
  across: [
    { num: 1, text: 'Keen, intelligent or razor-edged', answer: 'SHARP' },
    { num: 6, text: 'Common friendly greeting', answer: 'HELLO' },
    { num: 7, text: 'Without anyone else around', answer: 'ALONE' },
    { num: 8, text: 'Automated mechanical worker', answer: 'ROBOT' },
    { num: 9, text: 'Former Vice President Mike', answer: 'PENCE' }
  ],
  down: [
    { num: 1, text: 'Pieces of broken glass', answer: 'SHARP' },
    { num: 2, text: 'Opposite of goodbye', answer: 'HELLO' },
    { num: 3, text: 'Solitary, singular', answer: 'ALONE' },
    { num: 4, text: 'Android or bot', answer: 'ROBOT' },
    { num: 5, text: 'British bronze coins', answer: 'PENCE' }
  ]
};

export const TheMiniGame: React.FC<TheMiniGameProps> = ({ onBack }) => {
  const [userGrid, setUserGrid] = useState<string[][]>(
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState('');

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isSolved) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isSolved]);

  // Check solved
  useEffect(() => {
    let solved = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (userGrid[r][c] !== MINI_SOLUTION[r][c]) {
          solved = false;
          break;
        }
      }
    }
    if (solved && !isSolved) {
      setIsSolved(true);
      setTimerActive(false);
      setMessage(`Solved in ${formatTime(seconds)}!`);
    }
  }, [userGrid]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const handleCellClick = (r: number, c: number) => {
    if (selectedCell[0] === r && selectedCell[1] === c) {
      setDirection(d => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell([r, c]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const [r, c] = selectedCell;

    if (/^[a-zA-Z]$/.test(e.key)) {
      const nextGrid = userGrid.map(row => [...row]);
      nextGrid[r][c] = e.key.toUpperCase();
      setUserGrid(nextGrid);

      // Move next
      if (direction === 'across' && c < 4) {
        setSelectedCell([r, c + 1]);
      } else if (direction === 'down' && r < 4) {
        setSelectedCell([r + 1, c]);
      }
    } else if (e.key === 'Backspace') {
      const nextGrid = userGrid.map(row => [...row]);
      if (nextGrid[r][c]) {
        nextGrid[r][c] = '';
      } else {
        if (direction === 'across' && c > 0) {
          nextGrid[r][c - 1] = '';
          setSelectedCell([r, c - 1]);
        } else if (direction === 'down' && r > 0) {
          nextGrid[r - 1][c] = '';
          setSelectedCell([r - 1, c]);
        }
      }
      setUserGrid(nextGrid);
    } else if (e.key === 'ArrowRight' && c < 4) setSelectedCell([r, c + 1]);
    else if (e.key === 'ArrowLeft' && c > 0) setSelectedCell([r, c - 1]);
    else if (e.key === 'ArrowDown' && r < 4) setSelectedCell([r + 1, c]);
    else if (e.key === 'ArrowUp' && r > 0) setSelectedCell([r - 1, c]);
  };

  const revealPuzzle = () => {
    setUserGrid(MINI_SOLUTION.map(row => [...row]));
  };

  const resetPuzzle = () => {
    setUserGrid(Array(5).fill('').map(() => Array(5).fill('')));
    setSelectedCell([0, 0]);
    setSeconds(0);
    setIsSolved(false);
    setTimerActive(true);
    setMessage('');
  };

  const currentClue = direction === 'across' 
    ? MINI_CLUES.across[selectedCell[0]]
    : MINI_CLUES.down[selectedCell[1]];

  return (
    <div 
      className="min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto border-x border-[#e2e2e2] outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
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
          <span className="w-6 h-6 bg-[#121212] text-white flex items-center justify-center font-bold text-[12px] rounded-sm">
            M
          </span>
          <h1 className="font-bold text-[17px] tracking-wide font-sans">The Mini</h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-[13px] text-[#5a5a5a]">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(seconds)}</span>
        </div>
      </header>

      {/* Clue Bar */}
      <div className="bg-[#f7f7f7] border-b border-[#e2e2e2] px-4 py-2.5 flex items-center justify-between text-left">
        <div>
          <span className="font-bold text-[12px] uppercase tracking-wider text-[#2b6cb0] mr-2">
            {currentClue?.num} {direction.toUpperCase()}
          </span>
          <span className="text-[13px] text-[#121212] font-medium font-sans">
            {currentClue?.text}
          </span>
        </div>
      </div>

      {/* Grid container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-[280px] h-[280px] border-2 border-[#121212] grid grid-cols-5 grid-rows-5 shadow-sm">
          {userGrid.map((row, r) =>
            row.map((val, c) => {
              const isSelected = selectedCell[0] === r && selectedCell[1] === c;
              const isInCurrentWord = direction === 'across' ? selectedCell[0] === r : selectedCell[1] === c;

              let cellBg = 'bg-white';
              if (isSelected) cellBg = 'bg-[#ffda00]';
              else if (isInCurrentWord) cellBg = 'bg-[#a7d8ff]';

              // Numbers for clues
              let clueNum = null;
              if (r === 0 && c === 0) clueNum = 1;
              else if (r === 0 && c === 1) clueNum = 2;
              else if (r === 0 && c === 2) clueNum = 3;
              else if (r === 0 && c === 3) clueNum = 4;
              else if (r === 0 && c === 4) clueNum = 5;
              else if (r === 1 && c === 0) clueNum = 6;
              else if (r === 2 && c === 0) clueNum = 7;
              else if (r === 3 && c === 0) clueNum = 8;
              else if (r === 4 && c === 0) clueNum = 9;

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  className={`relative border border-[#121212] flex items-center justify-center text-[22px] font-bold uppercase transition-colors ${cellBg}`}
                >
                  {clueNum && (
                    <span className="absolute top-0.5 left-1 text-[9px] font-normal text-[#5a5a5a] pointer-events-none">
                      {clueNum}
                    </span>
                  )}
                  <span className="pt-1">{val}</span>
                </button>
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 mt-4 text-[12px] font-medium">
          <button
            onClick={revealPuzzle}
            className="px-3 py-1.5 border border-[#e2e2e2] rounded hover:bg-gray-100"
          >
            Reveal Puzzle
          </button>
          <button
            onClick={resetPuzzle}
            className="px-3 py-1.5 border border-[#e2e2e2] rounded hover:bg-gray-100 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Clues List */}
      <div className="border-t border-[#e2e2e2] px-4 py-3 bg-white max-h-48 overflow-y-auto text-[12px]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#121212] mb-1.5">Across</h4>
            <ul className="space-y-1 text-[#333]">
              {MINI_CLUES.across.map(c => (
                <li key={c.num} className="cursor-pointer hover:text-[#2b6cb0]" onClick={() => { setSelectedCell([MINI_CLUES.across.indexOf(c), 0]); setDirection('across'); }}>
                  <strong className="mr-1">{c.num}</strong> {c.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#121212] mb-1.5">Down</h4>
            <ul className="space-y-1 text-[#333]">
              {MINI_CLUES.down.map(c => (
                <li key={c.num} className="cursor-pointer hover:text-[#2b6cb0]" onClick={() => { setSelectedCell([0, MINI_CLUES.down.indexOf(c)]); setDirection('down'); }}>
                  <strong className="mr-1">{c.num}</strong> {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSolved && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md p-6 max-w-sm w-full text-center shadow-2xl border border-[#121212]">
            <CheckCircle className="w-12 h-12 text-[#6aaa64] mx-auto mb-2" />
            <h2 className="headline-serif text-[24px] font-bold mb-1">Congratulations!</h2>
            <p className="text-[14px] text-[#5a5a5a] mb-4">
              You solved The Mini in <span className="font-bold text-[#121212]">{formatTime(seconds)}</span>!
            </p>
            <div className="flex gap-2">
              <button
                onClick={resetPuzzle}
                className="flex-1 bg-[#121212] text-white py-2.5 rounded text-[13px] font-bold hover:bg-[#333]"
              >
                Play Again
              </button>
              <button
                onClick={onBack}
                className="flex-1 border border-[#121212] py-2.5 rounded text-[13px] font-bold hover:bg-gray-50"
              >
                Back to News
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
