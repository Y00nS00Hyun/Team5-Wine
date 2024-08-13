import { id } from '@/types/Id';
import { imageProp } from '@/types/Image';
import { ReviewListType, recentReview } from '@/types/ReviewProps';
import { avgratings } from './AvgRatings';

export interface wine {
  id: id;
  name: string;
  region: string;
  image: imageProp;
  price: number;
  avgRating: number;
  type: wineTypeName;
}

export interface wineDetailType {
  id: id;
  name: string;
  region: string;
  image: imageProp;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: recentReview | null;
  userId: id;
  reviews: [ReviewListType];
  avgRatings: avgratings;
}

export interface wineMyListType extends wineDetailType {
  totalCount: number;
  nextCursor: number;
  list: wineDetailType[];
}

export interface winListType {
  id: id;
  name: string;
  region: string;
  image: imageProp;
  avgRating: number;
  reviewCount: number;
  recentReview: recentReview | null;
  userId: id;
}

export interface createWineBody {
  name: string;
  region: string;
  image: imageProp;
  price: number;
  type: wineType | wineTypeName;
}

export type wineTypeName = 'RED' | 'WHITE' | 'SPARKLING';

export interface wineType {
  name: wineTypeName;
  selected?: boolean;
}
