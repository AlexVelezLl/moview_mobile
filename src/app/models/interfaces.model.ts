export interface Movie {
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
