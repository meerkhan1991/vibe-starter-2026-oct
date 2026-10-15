import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Volume2, VolumeX, MessageSquare, 
  ThumbsUp, Type, Check, Sparkles, Image as ImageIcon, Sun, Moon, Coffee
} from 'lucide-react';
import { Article, CommentItem } from '../types';
import { ARTICLES, INITIAL_COMMENTS } from '../data/nytData';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [useSvgPlaceholder, setUseSvgPlaceholder] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Comments
  const [comments, setComments] = useState<CommentItem[]>(
    INITIAL_COMMENTS[article.id] || [
      {
        id: 'c-default-1',
        author: 'Sarah Jenkins',
        location: 'Philadelphia, PA',
        timestamp: '2 hours ago',
        text: 'The loss of institutional knowledge across these key advisory committees is what worries me most. When senior civil servants and advisors leave all at once, continuity suffers.',
        likes: 142,
        isNytPick: true
      },
      {
        id: 'c-default-2',
        author: 'David R.',
        location: 'Austin, TX',
        timestamp: '3 hours ago',
        text: 'Every administration undergoes restructuring midway through. While the reporting highlights notable names, cabinet turnover is hardly unprecedented in presidential history.',
        likes: 67
      }
    ]
  );
  const [commentFilter, setCommentFilter] = useState<'all' | 'picks'>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = `${article.title}. ${article.summary}. ${article.bodyParagraphs.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `user-${Date.now()}`,
      author: newCommentAuthor.trim() || 'Times Reader',
      location: 'Subscriber Community',
      timestamp: 'Just now',
      text: newCommentText.trim(),
      likes: 1,
      isNytPick: false
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setShowCommentBox(false);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  // Font size classes
  const fontClasses = {
    sm: 'text-[15px] leading-relaxed',
    base: 'text-[17px] leading-[1.65]',
    lg: 'text-[19px] leading-[1.75]',
    xl: 'text-[21px] leading-[1.8]'
  }[fontSize];

  // Theme styles
  const themeClasses = {
    light: 'bg-white text-[#121212]',
    sepia: 'bg-[#fbf0d9] text-[#2c221e]',
    dark: 'bg-[#121212] text-[#e0e0e0]'
  }[readerTheme];

  const borderClass = readerTheme === 'dark' ? 'border-neutral-800' : 'border-[#e2e2e2]';
  const subtextClass = readerTheme === 'dark' ? 'text-neutral-400' : 'text-[#727272]';

  const displayedComments = commentFilter === 'picks'
    ? comments.filter(c => c.isNytPick)
    : comments;

  return (
    <article className={`min-h-screen ${themeClasses} max-w-2xl mx-auto border-x ${borderClass} flex flex-col justify-between transition-colors duration-200`}>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div 
          className="h-full bg-[#121212] dark:bg-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Sticky Header */}
      <header className={`sticky top-0 ${readerTheme === 'dark' ? 'bg-[#121212]/95 border-neutral-800' : readerTheme === 'sepia' ? 'bg-[#fbf0d9]/95 border-[#e8dcc4]' : 'bg-white/95 border-[#e2e2e2]'} backdrop-blur-xs border-b px-3.5 h-12 flex items-center justify-between z-30 transition-colors`}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-sans font-medium hover:opacity-70 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <span className="nyt-logo text-[22px] font-normal leading-none select-none">
          The New York Times
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {/* Reader Theme Switcher */}
          <button
            onClick={() => {
              if (readerTheme === 'light') setReaderTheme('sepia');
              else if (readerTheme === 'sepia') setReaderTheme('dark');
              else setReaderTheme('light');
            }}
            title="Toggle theme (Light / Sepia / Dark)"
            className="p-1 hover:opacity-70 cursor-pointer"
          >
            {readerTheme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
            {readerTheme === 'sepia' && <Coffee className="w-4 h-4 text-amber-800" />}
            {readerTheme === 'dark' && <Moon className="w-4 h-4 text-indigo-300" />}
          </button>

          {/* Font size toggle */}
          <button
            onClick={() => {
              if (fontSize === 'sm') setFontSize('base');
              else if (fontSize === 'base') setFontSize('lg');
              else if (fontSize === 'lg') setFontSize('xl');
              else setFontSize('sm');
            }}
            title="Adjust text size"
            className="p-1 hover:opacity-70 cursor-pointer"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            title={isBookmarked ? 'Saved to Reading List' : 'Save article'}
            className="p-1 hover:opacity-70 cursor-pointer"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="Share article"
            className="p-1 hover:opacity-70 cursor-pointer"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Article Body Content */}
      <main className="px-4 sm:px-6 pt-5 pb-8 flex-1">
        {/* Section Kicker */}
        {article.kicker && (
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#990000] mb-2 font-sans">
            {article.kicker}
          </div>
        )}

        {/* Headline */}
        <h1 className="headline-serif text-[28px] sm:text-[34px] font-bold leading-[1.12] tracking-tight mb-3">
          {article.title}
        </h1>

        {/* Standfirst / Summary Deck */}
        <p className="summary-serif text-[17px] sm:text-[19px] leading-snug mb-4 opacity-90">
          {article.summary}
        </p>

        {/* Listen Audio Bar with animated waveform */}
        <div className={`border-y ${borderClass} py-3 my-3 flex items-center justify-between ${readerTheme === 'dark' ? 'bg-neutral-900' : readerTheme === 'sepia' ? 'bg-[#f5e7c8]' : 'bg-[#fafafa]'} px-3.5 rounded-xs transition-colors`}>
          <button
            onClick={toggleSpeech}
            className="flex items-center gap-2.5 text-[12px] font-bold hover:text-[#2b6cb0] cursor-pointer"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4 text-red-600 animate-pulse" />
                <span className="text-red-600">Pause Audio Narration</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#2b6cb0]" />
                <span>Listen to this article ({article.readTime})</span>
              </>
            )}

            {/* Audio Wave Bars */}
            {isPlayingAudio && (
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-3 bg-red-600 animate-bounce" />
                <span className="w-0.5 h-2 bg-red-600 animate-bounce delay-75" />
                <span className="w-0.5 h-3.5 bg-red-600 animate-bounce delay-150" />
                <span className="w-0.5 h-1.5 bg-red-600 animate-bounce delay-100" />
              </div>
            )}
          </button>

          <span className={`text-[10px] ${subtextClass} uppercase font-sans font-medium tracking-wider`}>
            Narrated
          </span>
        </div>

        {/* Byline and Dateline */}
        <div className={`text-[11px] font-sans ${subtextClass} mb-4 space-y-0.5`}>
          <div className="font-semibold text-current text-[12px]">{article.byline}</div>
          <div className="flex items-center justify-between">
            <span>{article.publishedAt}</span>
            <span className="uppercase tracking-wider">{article.readTime}</span>
          </div>
        </div>

        {/* Image / Graphic Display with toggle */}
        <figure className="mb-5">
          {useSvgPlaceholder ? (
            <div className="w-full bg-[#f0eff9] flex flex-col items-center justify-center p-12 rounded-xs border border-[#e2e2e2]">
              <img
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                alt="Graphic placeholder"
                className="w-16 h-16 opacity-60"
              />
              <span className="text-[11px] text-[#727272] mt-2 font-sans font-medium">
                Graphic Placeholder View
              </span>
            </div>
          ) : (
            <img
              src={article.image || 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg'}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[480px] rounded-xs shadow-xs"
              loading="eager"
            />
          )}

          <div className={`flex items-center justify-between pt-1.5 text-[10px] ${subtextClass} font-sans`}>
            <button
              onClick={() => setUseSvgPlaceholder(!useSvgPlaceholder)}
              className="hover:underline text-[#2b6cb0] flex items-center gap-1 cursor-pointer font-medium"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{useSvgPlaceholder ? 'Switch to Editorial Photo' : 'Switch to Graphic Placeholder'}</span>
            </button>
            <figcaption className="text-right">
              {article.photographer || 'Tierney L. Cross/The New York Times'}
            </figcaption>
          </div>
        </figure>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className={`${readerTheme === 'dark' ? 'bg-neutral-900 border-neutral-600' : readerTheme === 'sepia' ? 'bg-[#f5e7c8] border-[#a18262]' : 'bg-[#f7f7f7] border-[#121212]'} border-l-2 p-4 my-5 rounded-r-xs`}>
            <h3 className="font-bold text-[11px] uppercase tracking-wider mb-2 font-sans">
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-[14px] summary-serif">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs with classic NYT Drop Cap */}
        <div className={`summary-serif space-y-5 ${fontClasses}`}>
          {article.bodyParagraphs.map((para, idx) => (
            <p 
              key={idx} 
              className={idx === 0 ? 'first-letter:text-[46px] first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none' : ''}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className={`mt-6 pt-4 border-t ${borderClass}`}>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map(t => (
                <span
                  key={t}
                  className={`${readerTheme === 'dark' ? 'bg-neutral-800 text-neutral-300' : 'bg-[#f2f2f2] text-[#444]'} text-[11px] px-2.5 py-1 rounded-full font-sans`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className={`mt-8 pt-5 border-t-2 ${borderClass}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h2 className="headline-serif text-[20px] font-bold">
                Comments ({comments.length + (article.commentCount || 0)})
              </h2>
            </div>
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="border border-current px-3 py-1 text-[11px] font-bold rounded-xs hover:bg-current hover:text-white transition-colors cursor-pointer"
            >
              {showCommentBox ? 'Cancel' : 'Write a Comment'}
            </button>
          </div>

          {/* Filter Pills: All vs Reader Picks */}
          <div className="flex gap-2 mb-4 text-[11px] font-sans font-semibold">
            <button
              onClick={() => setCommentFilter('all')}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                commentFilter === 'all'
                  ? 'bg-current text-white'
                  : 'bg-transparent text-current border border-current/30'
              }`}
            >
              All Comments ({comments.length})
            </button>
            <button
              onClick={() => setCommentFilter('picks')}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                commentFilter === 'picks'
                  ? 'bg-current text-white'
                  : 'bg-transparent text-current border border-current/30'
              }`}
            >
              NYT Picks ({comments.filter(c => c.isNytPick).length})
            </button>
          </div>

          {/* New Comment Box */}
          {showCommentBox && (
            <form onSubmit={handleAddComment} className={`border ${borderClass} p-3.5 rounded-xs ${readerTheme === 'dark' ? 'bg-neutral-900' : 'bg-[#fafafa]'} mb-5`}>
              <input
                type="text"
                placeholder="Your name or pseudonym (e.g., Jonathan W., Chicago)"
                value={newCommentAuthor}
                onChange={e => setNewCommentAuthor(e.target.value)}
                className={`w-full text-[13px] p-2 border ${borderClass} rounded-xs mb-2 font-sans bg-transparent outline-none`}
              />
              <textarea
                placeholder="Share your perspective on this reporting..."
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                rows={3}
                className={`w-full text-[13px] p-2 border ${borderClass} rounded-xs mb-2 font-sans bg-transparent resize-none outline-none`}
                required
              />
              <button
                type="submit"
                className="bg-[#121212] text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-xs text-[12px] font-bold cursor-pointer hover:opacity-80"
              >
                Post Comment
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {displayedComments.map(c => (
              <div key={c.id} className={`border-b ${borderClass} pb-3.5 last:border-b-0`}>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-current">{c.author}</span>
                    <span className={subtextClass}>• {c.location}</span>
                  </div>
                  <span className={subtextClass}>{c.timestamp}</span>
                </div>

                {c.isNytPick && (
                  <span className="inline-block bg-[#121212] text-white dark:bg-amber-400 dark:text-black text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs mb-1.5">
                    NYT Pick
                  </span>
                )}

                <p className="summary-serif text-[14px] leading-snug mb-2 opacity-90">
                  {c.text}
                </p>

                <div className={`flex items-center gap-4 text-[11px] ${subtextClass}`}>
                  <button
                    onClick={() => handleLikeComment(c.id)}
                    className="flex items-center gap-1 hover:text-current cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.likes}</span>
                  </button>
                  <button className="hover:underline cursor-pointer">Reply</button>
                  <button className="hover:underline cursor-pointer">Share</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Read More Section */}
        <section className={`mt-8 pt-5 border-t-2 ${borderClass}`}>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3">
            More From Today's Front Page
          </h3>
          <div className="space-y-3">
            {Object.values(ARTICLES)
              .filter(a => a.id !== article.id)
              .slice(0, 3)
              .map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.id)}
                  className={`cursor-pointer group flex gap-3 border-b ${borderClass} pb-3 last:border-b-0`}
                >
                  <div className="flex-1">
                    <h4 className="headline-serif text-[16px] font-bold group-hover:text-[#2b6cb0] leading-snug">
                      {rel.title}
                    </h4>
                    <span className={`text-[10px] ${subtextClass} uppercase font-sans mt-0.5 block`}>
                      {rel.readTime}
                    </span>
                  </div>
                  {rel.image && (
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-16 h-16 object-cover rounded-xs shrink-0"
                    />
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Reader Bottom Sticky Bar */}
      <footer className={`sticky bottom-0 ${readerTheme === 'dark' ? 'bg-[#121212]/95 border-neutral-800' : 'bg-white/95 border-[#e2e2e2]'} border-t px-4 py-2.5 flex items-center justify-between text-[12px] z-30`}>
        <button
          onClick={onBack}
          className="font-bold hover:underline cursor-pointer"
        >
          ← Return to Front Page
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${subtextClass} hover:text-current cursor-pointer`}
        >
          Top ↑
        </button>
      </footer>
    </article>
  );
};
