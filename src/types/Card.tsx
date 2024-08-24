import imageProp from '@/types/Image';
import { recentReview } from './ReviewProps';

export interface CardProps {
  image: imageProp;
  wineName: string;
  wineDesc: string;
  winePrice: number;
  childeren?: React.ReactNode;
  review?: recentReview | null;
  avgRating?: number | null;
  reviewCount?: number;
  recentReview?: recentReview | null;
}
