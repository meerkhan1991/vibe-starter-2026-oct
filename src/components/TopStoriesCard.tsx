import React, { useState } from 'react';
import { Article } from '../types';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

interface TopStoriesCardProps {
  leadArticle: Article;
  guilfoyleArticle: Article;
  pressSecArticle: Article;
  onSelectArticle: (articleId: string) => void;
}

export const TopStoriesCard: React.FC<TopStoriesCardProps> = ({
  leadArticle,
  guilfoyleArticle,
  pressSecArticle,
  onSelectArticle
}) => {
  // Option to toggle between exact screenshot placeholder (#ebe7f7 container) vs real photo
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  return (
    <section className="border border-[#121212] p-3.5 pb-4 mb-4 bg-white shadow-2xs" data-purpose="top-stories-card">
      {/* Centered promo label */}
      <div className="text-center mb-3">
        <p className="text-[13px] text-[#121212] font-sans font-normal tracking-tight">
          These top stories are <span className="font-bold">free to read.</span>
        </p>
        <div className="w-14 h-[2px] bg-[#326891] mx-auto mt-2"></div>
      </div>

      {/* Lead Headline */}
      <article>
        <div
          onClick={() => onSelectArticle(leadArticle.id)}
          className="group block cursor-pointer"
        >
          <h1 className="headline-serif text-[27px] sm:text-[29px] font-bold text-[#121212] leading-[1.12] mb-2 tracking-tight group-hover:text-[#5a5a5a] transition-colors">
            {leadArticle.title}
          </h1>
          <p className="summary-serif text-[15px] sm:text-[16px] text-[#333333] mb-2 leading-snug font-normal">
            {leadArticle.summary}
          </p>
          <div className="text-[10px] tracking-wider text-[#727272] font-sans uppercase font-medium mb-3">
            {leadArticle.readTime}
          </div>
        </div>

        {/* Lead Editorial Photo - Exact match with toggle */}
        <figure className="m-0 mb-3 overflow-hidden">
          <div 
            onClick={() => onSelectArticle(leadArticle.id)}
            className="cursor-pointer group relative overflow-hidden bg-[#ebe7f7]"
          >
            {showRealPhoto ? (
              <img
                alt="White House officials leaving the administration"
                className="w-full h-auto min-h-[280px] max-h-[460px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
                src={leadArticle.image}
              />
            ) : (
              <div className="w-full h-[320px] bg-[#ebe7f7] flex items-center justify-center transition-colors group-hover:bg-[#e4e0f2]">
                <img
                  alt="Portrait placeholder"
                  className="w-16 h-16 opacity-70"
                  src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-1.5 text-[10px] text-[#727272] font-sans">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRealPhoto(!showRealPhoto);
              }}
              className="text-[#2b6cb0] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              title="Toggle placeholder or photo"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{showRealPhoto ? 'Mockup Graphic Style' : 'Live Photography Style'}</span>
            </button>
            <figcaption className="text-right">
              {leadArticle.photographer || 'Tierney L. Cross/The New York Times'}
            </figcaption>
          </div>
        </figure>
      </article>

      {/* Sub Story inside Framed Container */}
      <div className="pt-3 border-t border-[#e2e2e2]">
        <article>
          <div
            onClick={() => onSelectArticle(guilfoyleArticle.id)}
            className="group block cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="headline-serif text-[18px] sm:text-[19px] font-bold text-[#121212] leading-snug group-hover:text-[#5a5a5a] transition-colors">
                {guilfoyleArticle.title}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[#727272] text-[11px] font-sans font-medium">
              <svg className="w-3.5 h-3.5 text-[#727272]" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-5 0H8v2h2V9z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span>{guilfoyleArticle.commentCount || 519}</span>
            </div>
          </div>
        </article>
      </div>

      {/* Third Story inside Framed Container */}
      <div className="pt-3 mt-3 border-t border-[#e2e2e2]">
        <article>
          <div
            onClick={() => onSelectArticle(pressSecArticle.id)}
            className="group block cursor-pointer"
          >
            <h2 className="headline-serif text-[18px] sm:text-[19px] font-bold text-[#121212] leading-snug mb-1 group-hover:text-[#5a5a5a] transition-colors">
              {pressSecArticle.title}
            </h2>
            <p className="summary-serif text-[13.5px] sm:text-[14px] text-[#333333] leading-snug mb-2 font-normal">
              {pressSecArticle.summary}
            </p>
            <div className="text-[10px] tracking-wider text-[#727272] font-sans uppercase font-medium">
              {pressSecArticle.readTime}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
