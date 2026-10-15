import React from 'react';
import { Article } from '../types';

interface EveningBriefingProps {
  article: Article;
  onSelectArticle: (articleId: string) => void;
}

export const EveningBriefing: React.FC<EveningBriefingProps> = ({
  article,
  onSelectArticle
}) => {
  return (
    <section className="bg-[#f7f7f7] border border-[#e2e2e2] p-3.5 mb-4" data-purpose="the-evening-briefing">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#5a5a5a] font-sans">
          The Evening
        </span>
      </div>
      <div
        onClick={() => onSelectArticle(article.id)}
        className="group block cursor-pointer"
      >
        <h3 className="headline-serif text-[19px] font-bold text-[#121212] leading-snug mb-1 group-hover:text-[#5a5a5a] transition-colors">
          {article.title}
        </h3>
        <p className="summary-serif text-[13.5px] text-[#333333] leading-snug mb-2">
          {article.summary}
        </p>
        <div className="text-[10px] tracking-wider text-[#727272] font-sans uppercase font-medium">
          {article.readTime}
        </div>
      </div>
    </section>
  );
};
