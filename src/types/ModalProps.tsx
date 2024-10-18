import { wine, wineDetailType, wineTypeName } from './WineProps';

export interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  showButton: boolean;
}
//푸터버튼 안보일 수 있게 프롭스 추가했습니다.
export interface ModalFilterProps extends ModalProps {
  setWines?: React.Dispatch<React.SetStateAction<wine[]>>;
}

export interface ModalWineEditProps extends ModalProps {
  id: number;
  wine: wineDetailType | null;
}

export interface ModalWineDeleteProps extends ModalProps {
  wineId: number;
  // setWines: React.Dispatch<React.SetStateAction<wine[] | undefined>>;
  // wines: wine[];
}

export interface ModalReviewDeleteProps extends ModalProps {
  reviewId: number;
  // setReviews: React.Dispatch<React.SetStateAction<wine[] | undefined>>;
  // reviews: wine[];
}
