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
  platforms: Array<{ logo: string; link: string }>;
  categories: Array<any>;
}

export interface Review {
  name_user: string;
  image_user: string;
  score: number;
  date: string;
  name_movie: string;
  id_movie: number;
  comment: string;
}
