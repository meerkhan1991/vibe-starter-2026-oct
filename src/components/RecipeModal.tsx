import React, { useState } from 'react';
import { ArrowLeft, Clock, Users, Star, Bookmark, Share2, CheckSquare, Square } from 'lucide-react';
import { Article } from '../types';

interface RecipeModalProps {
  article: Article;
  onBack: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ article, onBack }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const ingredients = [
    '1 lb ground meat (beef, pork, turkey, lamb or plant-based mince)',
    '1/2 cup panko bread crumbs (or fresh coarse bread crumbs)',
    '1/3 cup whole milk or whole-milk ricotta',
    '1/2 cup grated Parmigiano-Reggiano or Pecorino',
    '1 large egg, lightly beaten',
    '2 cloves garlic, finely minced or grated',
    '1 tbsp finely chopped fresh parsley or oregano',
    '1 1/4 tsp kosher salt',
    '1/2 tsp freshly cracked black pepper',
    '2 tbsp extra-virgin olive oil for baking'
  ];

  const steps = [
    'In a large bowl, combine the breadcrumbs and milk (or ricotta). Let sit for 5 minutes until moist and paste-like (this panade keeps the meatballs juicy).',
    'Add the ground meat, Parmigiano, egg, garlic, parsley, salt, and pepper. Gently mix with clean hands until just combined — do not overwork.',
    'Preheat oven to 425°F (220°C). Line a rimmed baking sheet with parchment paper and brush with olive oil.',
    'Shape meat into 16 golf-ball-sized portions (about 1 1/2 inches) and arrange spaced evenly on the baking sheet.',
    'Roast until browned on top and cooked through, about 15 to 18 minutes (internal temp 165°F). Serve in warm marinara sauce or over polenta.'
  ];

  const toggleCheck = (idx: number) => {
    if (checkedIngredients.includes(idx)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== idx));
    } else {
      setCheckedIngredients([...checkedIngredients, idx]);
    }
  };

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

        <span className="font-bold text-[14px] text-[#d0021b] tracking-wider uppercase font-sans">
          NYT Cooking
        </span>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className="p-1 text-[#121212] hover:text-[#d0021b]"
          title="Save Recipe"
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-[#d0021b] text-[#d0021b]' : ''}`} />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Title & Info */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#d0021b]">
          EASY WEEKNIGHT DINNER
        </span>
        <h1 className="headline-serif text-[28px] font-bold text-[#121212] mt-1 mb-2 leading-tight">
          {article.title}
        </h1>
        <p className="summary-serif text-[15px] text-[#333] mb-3 leading-relaxed">
          {article.summary}
        </p>

        <div className="text-[12px] text-[#727272] mb-3">
          {article.byline}
        </div>

        {/* Hero Photo */}
        <figure className="mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-56 object-cover rounded-sm"
          />
          <figcaption className="text-[10px] text-[#727272] text-right pt-1">
            {article.photographer}
          </figcaption>
        </figure>

        {/* Metrics Bar */}
        <div className="grid grid-cols-3 border-y border-[#e2e2e2] py-3 my-4 text-center text-[12px]">
          <div>
            <div className="text-[10px] text-[#727272] uppercase font-bold">Total Time</div>
            <div className="font-bold text-[#121212] mt-0.5">35 mins</div>
          </div>
          <div className="border-x border-[#e2e2e2]">
            <div className="text-[10px] text-[#727272] uppercase font-bold">Yield</div>
            <div className="font-bold text-[#121212] mt-0.5">4 servings (16 pcs)</div>
          </div>
          <div>
            <div className="text-[10px] text-[#727272] uppercase font-bold">Rating</div>
            <div className="font-bold text-[#121212] mt-0.5 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[#f6c344] text-[#f6c344]" />
              <span>4.9 (2.4k)</span>
            </div>
          </div>
        </div>

        {/* Ingredients Checklist */}
        <div className="mb-6">
          <h2 className="headline-serif text-[20px] font-bold text-[#121212] mb-3">
            Ingredients
          </h2>
          <div className="space-y-2">
            {ingredients.map((ing, i) => {
              const checked = checkedIngredients.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className="w-full flex items-start gap-2.5 text-left text-[14px] leading-snug p-1 rounded hover:bg-gray-50 transition-colors"
                >
                  <span className="mt-0.5 text-[#5a5a5a]">
                    {checked ? (
                      <CheckSquare className="w-4 h-4 text-[#d0021b]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </span>
                  <span className={checked ? 'line-through text-[#888]' : 'text-[#121212]'}>
                    {ing}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preparation Steps */}
        <div className="mb-6">
          <h2 className="headline-serif text-[20px] font-bold text-[#121212] mb-3">
            Preparation
          </h2>
          <ol className="space-y-4">
            {steps.map((st, i) => (
              <li key={i} className="text-[14px] summary-serif leading-relaxed text-[#222]">
                <strong className="font-sans text-[12px] uppercase text-[#121212] block mb-1">
                  Step {i + 1}
                </strong>
                {st}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Back CTA */}
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
