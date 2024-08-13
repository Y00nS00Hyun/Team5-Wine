import imageProp from '@/types/Image';

export interface CardProps {
  image: imageProp;
  wineName: string;
  wineDesc: string;
  winePrice: number;
  childeren?: React.ReactNode;
  review?: string;
}
