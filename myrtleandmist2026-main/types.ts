
export type Theme = 'myrtle' | 'mist';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  affiliateUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface QuickOverviewItem {
  label: string;
  value: string;
}

export interface ThemeSpecificArticleContent {
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text
  quickOverview: QuickOverviewItem[];
}

export interface Article {
  id: string;
  readTime: string;
  image: string;
  category: string; // This maps to CategoryDef.id
  relatedProductIds?: number[];
  myrtle: ThemeSpecificArticleContent;
  mist: ThemeSpecificArticleContent;
}

export interface CategoryDef {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG path
}

export interface PillarSection {
  id: string;
  title: string;
  content: string; // HTML string
  categoryId?: string; // Optional link to category
}

export interface PillarData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categories: CategoryDef[];
  sections: PillarSection[];
}

export interface MoonPhaseInfo {
  name: string;
  myrtleAction: string; // Gardening advice
  mistAction: string; // Spiritual advice
  myrtleDesc: string;
  mistDesc: string;
  recommendedProductId?: number;
}

export interface SuggestedPlant {
  name: string;
  linkPath?: string; // e.g. '/journal/monstera-guide' or '/the-guide#genus-pothos'
}

export interface LightZone {
  minFc: number; // Minimum foot-candles
  label: string;
  description: string;
  plants: SuggestedPlant[];
  recommendedProductId?: number;
}
