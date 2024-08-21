import imageProp from '@/types/Image';
import { RecentReview, ReviewDetailType } from './ReviewProps';

export interface CardProps {
  image: imageProp;
  wineName: string;
  wineDesc: string;
  winePrice: number;
  childeren?: React.ReactNode;
  review?: RecentReview | string;
  avgRating?: number | null;
  reviewCount?: number;
}
