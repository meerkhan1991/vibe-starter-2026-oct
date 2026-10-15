export interface Article {
  id: string;
  section: string;
  kicker?: string;
  title: string;
  summary: string;
  readTime: string;
  publishedAt: string;
  byline: string;
  photographer?: string;
  image?: string;
  commentCount?: number;
  bodyParagraphs: string[];
  keyTakeaways?: string[];
  tags?: string[];
  sourceUrl?: string;
}

export type ViewScreen = 
  | 'front-page' 
  | 'article' 
  | 'game-wordle' 
  | 'game-mini' 
  | 'game-connections' 
  | 'game-spelling-bee'
  | 'polls-tracker'
  | 'recipe'
  | 'sports-match';

export interface CommentItem {
  id: string;
  author: string;
  location: string;
  timestamp: string;
  text: string;
  likes: number;
  isNytPick?: boolean;
}
