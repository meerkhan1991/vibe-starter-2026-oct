import React from 'react';
import { ArrowLeft, Share2, Award, Zap } from 'lucide-react';
import { Article } from '../types';

interface SportsModalProps {
  article: Article;
  onBack: () => void;
}

export const SportsModal: React.FC<SportsModalProps> = ({ article, onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between max-w-md mx-auto border-x border-[#e2e2e2]">
      {/* Top Bar */}
      <header className="border-b border-[#e2e2e2] px-3.5 h-12 flex items-center justify-between sticky top-0 bg-white z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-sans font-medium hover:text-[#5a5a5a]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <span className="font-bold text-[14px] text-[#121212] tracking-wider uppercase font-sans">
          The Athletic
        </span>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
            }
          }}
          className="p-1 text-[#121212]"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Match Header */}
        <div className="bg-[#121212] text-white p-4 rounded-sm mb-4">
          <div className="text-[11px] font-bold text-amber-400 tracking-wider uppercase mb-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            FINAL • NLCS GAME 3 • MIL LEADS 2-1
          </div>

          <div className="grid grid-cols-3 items-center text-center my-3">
            <div>
              <div className="text-[12px] font-bold text-gray-300">LAD (1-2)</div>
              <div className="text-[28px] font-extrabold">1</div>
              <div className="text-[11px] text-gray-400">Dodgers</div>
            </div>

            <div className="text-[12px] font-sans text-gray-400 border-x border-gray-700 py-1">
              VS
            </div>

            <div>
              <div className="text-[12px] font-bold text-amber-300">MIL (2-1)</div>
              <div className="text-[28px] font-extrabold text-amber-400">4</div>
              <div className="text-[11px] text-gray-400">Brewers</div>
            </div>
          </div>

          {/* Linescore table */}
          <div className="overflow-x-auto text-[11px] border-t border-gray-800 pt-2 font-mono">
            <table className="w-full text-center">
              <thead>
                <tr className="text-gray-400">
                  <th className="text-left py-0.5">TEAM</th>
                  <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
                  <th className="font-bold text-white border-l border-gray-800">R</th>
                  <th className="text-gray-400">H</th>
                  <th className="text-gray-400">E</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="text-left font-bold py-1">LAD</td>
                  <td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>
                  <td className="font-bold text-white border-l border-gray-800">1</td><td>5</td><td>1</td>
                </tr>
                <tr>
                  <td className="text-left font-bold py-1 text-amber-400">MIL</td>
                  <td>2</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>X</td>
                  <td className="font-bold text-amber-400 border-l border-gray-800">4</td><td>8</td><td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Title */}
        <h1 className="headline-serif text-[24px] font-bold text-[#121212] mb-1.5 leading-snug">
          {article.title}
        </h1>
        <p className="summary-serif text-[14px] text-[#444] mb-3">
          {article.summary}
        </p>

        <div className="text-[11px] text-[#727272] mb-4">
          {article.byline} • Oct 14, 2026
        </div>

        <figure className="mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-52 object-cover rounded-sm"
          />
          <figcaption className="text-[10px] text-[#727272] text-right pt-1">
            {article.photographer}
          </figcaption>
        </figure>

        {/* Game Story Body */}
        <div className="space-y-3 summary-serif text-[15px] leading-relaxed text-[#222]">
          {article.bodyParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Key Performer highlight */}
        <div className="border border-[#e2e2e2] bg-[#f7f7f7] p-3 rounded-sm mt-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#121212] uppercase mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Player of the Game
          </div>
          <div className="text-[13px] font-bold text-[#121212]">
            Jackson Chourio — OF, Milwaukee
          </div>
          <div className="text-[12px] text-[#5a5a5a] mt-0.5">
            1-for-3, Leadoff HR (430 ft), 2 RBI, 1 Run, 1 BB
          </div>
        </div>
      </div>

      {/* Return button */}
      <div className="p-3.5 border-t border-[#e2e2e2] bg-white">
        <button
          onClick={onBack}
          className="w-full bg-[#121212] text-white py-2.5 rounded-sm font-bold text-[13px] hover:bg-[#333]"
        >
          Return to Front Page
        </button>
      </div>
    </div>
  );
};
