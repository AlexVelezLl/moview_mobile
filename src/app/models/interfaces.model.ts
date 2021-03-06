export interface Movie {
  id: number;
  name: string;
  producer: string;
  avg_score: number;
  year: number;
  sinopsis: string;
  image_cover: string;
  image_banner: string;
  type: string;
  duration: number;
  platforms: Array<{ logo: string; link: string }>;
  categories: Array<any>;
  isInWatchlist?: boolean;
  rating_numbers?: number;
}

export interface Review {
  id_user?: number;
  name_user?: string;
  image_user?: string;
  score: number;
  date?: string;
  name_movie?: string;
  id_movie: number;
  comment: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface User {
  username: string;
  name: string;
  image: string;
}

export interface Watchlist {
  id: number;
  image_cover: string;
}
