import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Volume2, VolumeX, MessageSquare, 
  ThumbsUp, Type, Check, Sparkles, Image as ImageIcon 
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
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [useSvgPlaceholder, setUseSvgPlaceholder] = useState(false);
  
  // Comments
  const [comments, setComments] = useState<CommentItem[]>(
    INITIAL_COMMENTS[article.id] || [
      {
        id: 'c-default-1',
        author: 'Editorial Reader',
        location: 'New York, NY',
        timestamp: '1 hour ago',
        text: 'A very thorough and balanced report. The nuance captured in this piece is why subscriber support matters.',
        likes: 38,
        isNytPick: true
      }
    ]
  );
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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
      const textToRead = `${article.title}. ${article.summary}. ${article.bodyParagraphs[0] || ''}`;
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
      author: newCommentAuthor.trim() || 'Times Subscriber',
      location: 'Reader community',
      timestamp: 'Just now',
      text: newCommentText.trim(),
      likes: 1,
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
    lg: 'text-[19px] leading-[1.75]'
  }[fontSize];

  return (
    <article className="min-h-screen bg-white max-w-md mx-auto border-x border-[#e2e2e2] flex flex-col justify-between">
      {/* Reader Sticky Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-xs border-b border-[#e2e2e2] px-3.5 h-12 flex items-center justify-between z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-sans font-medium hover:text-[#5a5a5a]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="nyt-logo text-[22px] font-normal leading-none select-none">
          The New York Times
        </span>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Font toggle */}
          <button
            onClick={() => {
              if (fontSize === 'sm') setFontSize('base');
              else if (fontSize === 'base') setFontSize('lg');
              else setFontSize('sm');
            }}
            title="Adjust text size"
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleBookmark(article.id)}
            title={isBookmarked ? 'Saved' : 'Save article'}
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#121212] text-[#121212]' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            title="Share article"
            className="p-1 text-[#5a5a5a] hover:text-[#121212]"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Article Body Content */}
      <main className="px-4 pt-4 pb-8 flex-1">
        {/* Section Kicker */}
        {article.kicker && (
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#990000] mb-2 font-sans">
            {article.kicker}
          </div>
        )}

        {/* Headline */}
        <h1 className="headline-serif text-[27px] sm:text-[30px] font-bold text-[#121212] leading-[1.12] tracking-tight mb-2.5">
          {article.title}
        </h1>

        {/* Standfirst / Summary Deck */}
        <p className="summary-serif text-[17px] text-[#333] leading-snug mb-3">
          {article.summary}
        </p>

        {/* Listen Audio Bar */}
        <div className="border-y border-[#e2e2e2] py-2.5 my-3 flex items-center justify-between bg-[#fcfcfc] px-3 rounded-sm">
          <button
            onClick={toggleSpeech}
            className="flex items-center gap-2 text-[12px] font-bold text-[#121212] hover:text-[#2b6cb0]"
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4 text-red-600" />
                <span className="text-red-700">Pause Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#2b6cb0]" />
                <span>Listen to this article ({article.readTime})</span>
              </>
            )}
          </button>

          <span className="text-[10px] text-[#727272] uppercase font-sans font-medium">
            Narrated
          </span>
        </div>

        {/* Byline and Dateline */}
        <div className="text-[11px] font-sans text-[#727272] mb-4 space-y-0.5">
          <div className="font-semibold text-[#121212]">{article.byline}</div>
          <div className="flex items-center justify-between">
            <span>{article.publishedAt}</span>
            <span className="uppercase tracking-wider">{article.readTime}</span>
          </div>
        </div>

        {/* Image / Graphic Display */}
        <figure className="mb-4">
          {useSvgPlaceholder ? (
            <div className="w-full bg-[#f0eff9] flex flex-col items-center justify-center p-12 rounded-sm border border-[#e2e2e2]">
              <img
                src="https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"
                alt="Graphic placeholder"
                className="w-16 h-16 opacity-60"
              />
              <span className="text-[11px] text-[#727272] mt-2 font-sans">
                Mockup graphic view
              </span>
            </div>
          ) : (
            <img
              src={article.image || 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg'}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[460px] rounded-sm"
              loading="eager"
            />
          )}

          <div className="flex items-center justify-between pt-1.5 text-[10px] text-[#727272] font-sans">
            <button
              onClick={() => setUseSvgPlaceholder(!useSvgPlaceholder)}
              className="hover:underline text-[#2b6cb0] flex items-center gap-1"
            >
              <ImageIcon className="w-3 h-3" />
              <span>{useSvgPlaceholder ? 'Show Editorial Photo' : 'Show Mockup Placeholder'}</span>
            </button>
            <span>{article.photographer || 'Tierney L. Cross/The New York Times'}</span>
          </div>
        </figure>

        {/* Key Takeaways Box (if present) */}
        {article.keyTakeaways && (
          <div className="bg-[#f7f7f7] border-l-2 border-[#121212] p-3.5 my-4 rounded-r-sm">
            <h3 className="font-bold text-[12px] uppercase tracking-wider text-[#121212] mb-2 font-sans">
              Key Takeaways
            </h3>
            <ul className="space-y-1.5 text-[13.5px] summary-serif text-[#333]">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#121212] font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs with authentic typography */}
        <div className={`summary-serif text-[#121212] space-y-4 ${fontClasses}`}>
          {article.bodyParagraphs.map((para, idx) => (
            <p key={idx} className={idx === 0 ? 'first-letter:text-[42px] first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none' : ''}>
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="mt-6 pt-4 border-t border-[#e2e2e2]">
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map(t => (
                <span
                  key={t}
                  className="bg-[#f2f2f2] text-[#444] text-[11px] px-2.5 py-1 rounded-full font-sans"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className="mt-8 pt-4 border-t-2 border-[#121212]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#121212]" />
              <h2 className="headline-serif text-[19px] font-bold text-[#121212]">
                Comments ({comments.length + (article.commentCount || 0)})
              </h2>
            </div>
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="border border-[#121212] text-[#121212] px-3 py-1 text-[11px] font-bold rounded-sm hover:bg-[#121212] hover:text-white transition-colors"
            >
              {showCommentBox ? 'Cancel' : 'Write Comment'}
            </button>
          </div>

          {/* New Comment Box */}
          {showCommentBox && (
            <form onSubmit={handleAddComment} className="border border-[#e2e2e2] p-3 rounded-sm bg-[#fafafa] mb-4">
              <input
                type="text"
                placeholder="Your name or pseudonym"
                value={newCommentAuthor}
                onChange={e => setNewCommentAuthor(e.target.value)}
                className="w-full text-[13px] p-2 border border-[#d2d2d2] rounded-sm mb-2 font-sans bg-white"
              />
              <textarea
                placeholder="Share your perspective on this reporting..."
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                rows={3}
                className="w-full text-[13px] p-2 border border-[#d2d2d2] rounded-sm mb-2 font-sans bg-white resize-none"
                required
              />
              <button
                type="submit"
                className="bg-[#121212] text-white px-4 py-1.5 rounded-sm text-[12px] font-bold hover:bg-[#333]"
              >
                Post Comment
              </button>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map(c => (
              <div key={c.id} className="border-b border-[#e2e2e2] pb-3 last:border-b-0">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#121212]">{c.author}</span>
                    <span className="text-[#727272]">• {c.location}</span>
                  </div>
                  <span className="text-[#888]">{c.timestamp}</span>
                </div>

                {c.isNytPick && (
                  <span className="inline-block bg-[#121212] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs mb-1.5">
                    NYT Pick
                  </span>
                )}

                <p className="summary-serif text-[13.5px] text-[#333] leading-snug mb-2">
                  {c.text}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-[#727272]">
                  <button
                    onClick={() => handleLikeComment(c.id)}
                    className="flex items-center gap-1 hover:text-[#121212]"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.likes}</span>
                  </button>
                  <button className="hover:underline">Reply</button>
                  <button className="hover:underline">Share</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Read More / Related Stories */}
        <section className="mt-8 pt-4 border-t-2 border-[#121212]">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#121212] mb-3">
            More From The Front Page
          </h3>
          <div className="space-y-3">
            {Object.values(ARTICLES)
              .filter(a => a.id !== article.id)
              .slice(0, 3)
              .map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.id)}
                  className="cursor-pointer group flex gap-3 border-b border-[#e2e2e2] pb-2.5 last:border-b-0"
                >
                  <div className="flex-1">
                    <h4 className="headline-serif text-[15px] font-bold text-[#121212] group-hover:text-[#5a5a5a] leading-snug">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-[#727272] uppercase font-sans mt-0.5 block">
                      {rel.readTime}
                    </span>
                  </div>
                  {rel.image && (
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-16 h-16 object-cover rounded-xs"
                    />
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Reader Bottom Sticky Bar */}
      <footer className="sticky bottom-0 bg-white border-t border-[#e2e2e2] px-3.5 py-2 flex items-center justify-between text-[12px]">
        <button
          onClick={onBack}
          className="font-bold text-[#121212] hover:underline"
        >
          ← Return to Front Page
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#727272] hover:text-[#121212]"
        >
          Top ↑
        </button>
      </footer>
    </article>
  );
};
