import imageProp from '@/types/Image';
<<<<<<< HEAD
import { recentReview } from './ReviewProps';
=======
import { recentReview, reviewDetailType } from './ReviewProps';
>>>>>>> 78b8854da01b18a14029bb66d6abbfb49e7546d0

export interface CardProps {
  image: imageProp;
  wineName: string;
  wineDesc: string;
  winePrice: number;
  childeren?: React.ReactNode;
<<<<<<< HEAD
  review?: recentReview | null;
=======
  review?: recentReview | string;
>>>>>>> 78b8854da01b18a14029bb66d6abbfb49e7546d0
  avgRating?: number | null;
  reviewCount?: number;
  recentReview?: recentReview | null;
}
