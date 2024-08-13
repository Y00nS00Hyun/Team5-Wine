import { Aroma, AromaName } from '@/types/Aroma';
import { id } from '@/types/Id';
import { imageProp } from '@/types/Image';
import { nickName } from '@/types/NickName';
import { wine, wineDetailType } from './WineProps';

export interface recentReview {
  user: recentReview;
  updatedAt: string;
  createdAt: string;
  aroma: AromaName[];
  rating: number;
  id: id;
}

export interface reviewDetailType {
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
  user: reviewUser;
  wineId: number;
}

export interface reviewUser {
  id: id;
  nickname: nickName;
  image: imageProp;
}

export interface ReviewListType {
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
  user: reviewUser;
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
