import { AromaName } from '@/types/Aroma';
import { id } from '@/types/Id';
import { imageProp } from '@/types/Image';
import { nickName } from '@/types/NickName';
import { wine } from './WineProps';

export interface RecentReview {
  user: ReviewUser;
  updatedAt: string;
  createdAt: string;
  aroma: AromaName[];
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  region: string;
  reviewCount: number;
  type: string;
  id: id;
  content: string;
}

export interface ReviewDetailType {
  id: id;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: AromaName[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  wineId: number;
}

export interface ReviewUser {
  id: id;
  nickname: nickName;
  image: imageProp;
}

export interface ReviewListType {
  id: id;
  rating: number;
  lightBold: number;
  smoothTannic: number;

  /**
   * 1: 달다, 2: 산미하다, 3: 부드럽다, 4: 텁텁하다
   *
   * @type {number}
   * @memberof ReviewListType
   * @example
   * 1: 달다
   */
  drySweet: number;
  softAcidic: number;
  aroma: AromaName[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  wine: wine;
}

export interface createReviewBody {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: AromaName[];
  content: string;
  wineId: number;
}

export interface responseReviewBody {
  id: id;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: AromaName[];
  content: string;
  wineId: number;
  teamId: string;
}

export interface editReview {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: AromaName[];
  content: string;
}
