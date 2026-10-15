import React from 'react';
import { Article } from '../types';

interface LifestyleSectionProps {
  recipeArticle: Article;
  sportsArticle: Article;
  onOpenRecipe: () => void;
  onOpenSports: () => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({
  recipeArticle,
  sportsArticle,
  onOpenRecipe,
  onOpenSports
}) => {
  return (
    <div className="border-t border-[#e2e2e2] pt-3 grid grid-cols-2 gap-3 text-left">
      {/* NYT Cooking */}
      <div
        onClick={onOpenRecipe}
        className="cursor-pointer group"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#d0021b] font-sans">
          NYT Cooking
        </span>
        <h4 className="headline-serif text-[14px] font-bold text-[#121212] mt-0.5 leading-snug group-hover:underline">
          Meatballs With Any Meat
        </h4>
        <p className="text-[11px] text-[#727272] mt-0.5">Easy weeknight dinner</p>
      </div>

      {/* The Athletic */}
      <div
        onClick={onOpenSports}
        className="border-l border-[#e2e2e2] pl-3 cursor-pointer group"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#121212] font-sans">
          The Athletic
        </span>
        <h4 className="headline-serif text-[14px] font-bold text-[#121212] mt-0.5 leading-snug group-hover:underline">
          Brewers Lead Dodgers in Game 3
        </h4>
        <p className="text-[11px] text-[#727272] mt-0.5">Chourio hits leadoff HR</p>
      </div>
    </div>
  );
};
