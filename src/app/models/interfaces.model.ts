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
  platforms: Array<{ id: number; link: string }>;
  categories: Array<any>;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}
