import React, { useState } from 'react';
import { ViewScreen, Article } from './types';
import { ARTICLES } from './data/nytData';
import { Header } from './components/Header';
import { TopStoriesCard } from './components/TopStoriesCard';
import { UkraineSection } from './components/UkraineSection';
import { EveningBriefing } from './components/EveningBriefing';
import { ElectionSection } from './components/ElectionSection';
import { GamesStrip } from './components/GamesStrip';
import { LifestyleSection } from './components/LifestyleSection';
import { Footer } from './components/Footer';
import { ArticleReader } from './components/ArticleReader';
import { WordleGame } from './components/WordleGame';
import { TheMiniGame } from './components/TheMiniGame';
import { ConnectionsGame } from './components/ConnectionsGame';
import { SpellingBeeGame } from './components/SpellingBeeGame';
import { PollsModal } from './components/PollsModal';
import { RecipeModal } from './components/RecipeModal';
import { SportsModal } from './components/SportsModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SubscribeModal } from './components/SubscribeModal';
import { ProfileModal } from './components/ProfileModal';
import { SearchModal } from './components/SearchModal';
import { IPhoneFrame } from './components/IPhoneFrame';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ViewScreen>('front-page');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('lead-trump-women');
  const [pollsInitialTab, setPollsInitialTab] = useState<'Senate' | 'House' | 'Governor' | 'Approval'>('Senate');
  
  // View mode: 'mobile' (matches the exact mobile screenshot 430px container) or 'fluid'
  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');

  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  
  // Saved Articles
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['lead-trump-women']);
  const [legalNotice, setLegalNotice] = useState<string | null>(null);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const openArticle = (id: string) => {
    setSelectedArticleId(id);
    setCurrentScreen('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPolls = (tab: 'Senate' | 'House' | 'Governor' | 'Approval') => {
    setPollsInitialTab(tab);
    setCurrentScreen('polls-tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: 'wordle' | 'mini' | 'connections' | 'spelling-bee') => {
    if (game === 'wordle') setCurrentScreen('game-wordle');
    else if (game === 'mini') setCurrentScreen('game-mini');
    else if (game === 'connections') setCurrentScreen('game-connections');
    else if (game === 'spelling-bee') setCurrentScreen('game-spelling-bee');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentArticle = ARTICLES[selectedArticleId] || ARTICLES['lead-trump-women'];
  const bookmarkedArticles = bookmarkedIds
    .map(id => ARTICLES[id])
    .filter((a): a is Article => Boolean(a));

  return (
    <div className="min-h-screen bg-[#ededed] flex flex-col items-center selection:bg-[#121212] selection:text-white">
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={openArticle}
        onSelectGame={handleSelectGame}
      />

      {/* When in mobile frame mode, wrap with iPhone chassis on desktop */}
      <IPhoneFrame active={viewMode === 'mobile'}>
        <div className={`w-full bg-white transition-all duration-300 min-h-screen ${
          viewMode === 'fluid' ? 'max-w-5xl shadow-md border-x border-[#d8d8d8]' : 'max-w-md'
        }`}>
          {/* Active Screen Router */}
          {currentScreen === 'article' && (
            <ArticleReader
              article={currentArticle}
              onBack={() => setCurrentScreen('front-page')}
              onSelectArticle={openArticle}
              isBookmarked={bookmarkedIds.includes(currentArticle.id)}
              onToggleBookmark={toggleBookmark}
            />
          )}

          {currentScreen === 'game-wordle' && (
            <WordleGame onBack={() => setCurrentScreen('front-page')} />
          )}

          {currentScreen === 'game-mini' && (
            <TheMiniGame onBack={() => setCurrentScreen('front-page')} />
          )}

          {currentScreen === 'game-connections' && (
            <ConnectionsGame onBack={() => setCurrentScreen('front-page')} />
          )}

          {currentScreen === 'game-spelling-bee' && (
            <SpellingBeeGame onBack={() => setCurrentScreen('front-page')} />
          )}

          {currentScreen === 'polls-tracker' && (
            <PollsModal
              initialTab={pollsInitialTab}
              onBack={() => setCurrentScreen('front-page')}
            />
          )}

          {currentScreen === 'recipe' && (
            <RecipeModal
              article={ARTICLES['meatballs-recipe']}
              onBack={() => setCurrentScreen('front-page')}
            />
          )}

          {currentScreen === 'sports-match' && (
            <SportsModal
              article={ARTICLES['athletic-brewers']}
              onBack={() => setCurrentScreen('front-page')}
            />
          )}

          {/* FRONT PAGE SCREEN */}
          {currentScreen === 'front-page' && (
            <div className="flex flex-col min-h-screen">
              {/* Header */}
              <Header
                onOpenMenu={() => setIsMenuOpen(true)}
                onOpenProfile={() => setIsProfileOpen(true)}
                onOpenSubscribe={() => setIsSubscribeOpen(true)}
                onOpenSearch={() => setIsSearchOpen(true)}
                isSubscriber={isSubscriber}
                viewMode={viewMode}
                onToggleViewMode={() => setViewMode(viewMode === 'mobile' ? 'fluid' : 'mobile')}
                onSelectSection={(sec) => {
                  if (sec === 'Games') setCurrentScreen('game-wordle');
                  else if (sec === 'Food') setCurrentScreen('recipe');
                  else if (sec === 'Sports') setCurrentScreen('sports-match');
                  else if (sec === 'Politics') openPolls('Senate');
                }}
              />

              {/* Responsive Layout: Single column in mobile mode, Multi-column editorial grid in fluid mode */}
              <main className="px-3.5 pt-3 w-full flex-1">
                {viewMode === 'fluid' ? (
                  /* Desktop / Tablet Multi-Column Editorial Grid */
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
                    {/* Left Main Editorial Column (7 cols) */}
                    <div className="md:col-span-7 space-y-4">
                      <TopStoriesCard
                        leadArticle={ARTICLES['lead-trump-women']}
                        guilfoyleArticle={ARTICLES['guilfoyle']}
                        pressSecArticle={ARTICLES['press-secretary']}
                        onSelectArticle={openArticle}
                      />

                      <UkraineSection
                        leadArticle={ARTICLES['ukraine-satellite']}
                        dieselArticle={ARTICLES['diesel-deal']}
                        intelArticle={ARTICLES['us-intelligence']}
                        onSelectArticle={openArticle}
                      />
                    </div>

                    {/* Right Secondary Column (5 cols) */}
                    <div className="md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-[#e2e2e2] md:pl-6">
                      <EveningBriefing
                        article={ARTICLES['evening-briefing']}
                        onSelectArticle={openArticle}
                      />

                      <ElectionSection
                        leadArticle={ARTICLES['texas-senate']}
                        onSelectArticle={openArticle}
                        onOpenPolls={openPolls}
                      />

                      <section className="border-t-2 border-[#121212] pt-3 pb-2 mb-6" data-purpose="services-grid">
                        <GamesStrip onSelectGame={handleSelectGame} />

                        <LifestyleSection
                          recipeArticle={ARTICLES['meatballs-recipe']}
                          sportsArticle={ARTICLES['athletic-brewers']}
                          onOpenRecipe={() => setCurrentScreen('recipe')}
                          onOpenSports={() => setCurrentScreen('sports-match')}
                        />
                      </section>
                    </div>
                  </div>
                ) : (
                  /* Mobile Single Column Matching Exact Screenshot */
                  <div className="max-w-md mx-auto">
                    <TopStoriesCard
                      leadArticle={ARTICLES['lead-trump-women']}
                      guilfoyleArticle={ARTICLES['guilfoyle']}
                      pressSecArticle={ARTICLES['press-secretary']}
                      onSelectArticle={openArticle}
                    />

                    <UkraineSection
                      leadArticle={ARTICLES['ukraine-satellite']}
                      dieselArticle={ARTICLES['diesel-deal']}
                      intelArticle={ARTICLES['us-intelligence']}
                      onSelectArticle={openArticle}
                    />

                    <EveningBriefing
                      article={ARTICLES['evening-briefing']}
                      onSelectArticle={openArticle}
                    />

                    <ElectionSection
                      leadArticle={ARTICLES['texas-senate']}
                      onSelectArticle={openArticle}
                      onOpenPolls={openPolls}
                    />

                    <section className="border-t-2 border-[#121212] pt-3 pb-2 mb-6" data-purpose="services-grid">
                      <GamesStrip onSelectGame={handleSelectGame} />

                      <LifestyleSection
                        recipeArticle={ARTICLES['meatballs-recipe']}
                        sportsArticle={ARTICLES['athletic-brewers']}
                        onOpenRecipe={() => setCurrentScreen('recipe')}
                        onOpenSports={() => setCurrentScreen('sports-match')}
                      />
                    </section>
                  </div>
                )}
              </main>

              {/* Footer */}
              <Footer
                onOpenSubscribe={() => setIsSubscribeOpen(true)}
                onOpenLegal={(topic) => setLegalNotice(`Information about ${topic} is available in The New York Times Help Center.`)}
              />
            </div>
          )}
        </div>
      </IPhoneFrame>

      {/* Legal Notice Toast */}
      {legalNotice && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#121212] text-white px-4 py-2 rounded shadow-lg text-[12px] font-medium z-50 flex items-center gap-3 animate-fade-in">
          <span>{legalNotice}</span>
          <button onClick={() => setLegalNotice(null)} className="text-gray-400 hover:text-white font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectSection={(sec) => {
          setIsMenuOpen(false);
          if (sec.includes('Games')) {
            setCurrentScreen('game-wordle');
          } else if (sec.includes('Food')) {
            setCurrentScreen('recipe');
          } else if (sec.includes('Sports')) {
            setCurrentScreen('sports-match');
          } else if (sec.includes('Politics')) {
            openPolls('Senate');
          } else {
            setCurrentScreen('front-page');
          }
        }}
        onSelectGame={handleSelectGame}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={openArticle}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        isSubscriber={isSubscriber}
      />

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => setIsSubscriber(true)}
      />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        isSubscriber={isSubscriber}
        onToggleSubscriber={() => setIsSubscriber(!isSubscriber)}
        savedArticlesCount={bookmarkedArticles.length}
        onViewSaved={() => setIsMenuOpen(true)}
      />
    </div>
  );
}
