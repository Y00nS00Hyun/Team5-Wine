import BaseModal from '../modalbase/BaseModal';
import { ModalProps } from '@/types/ModalProps';
import Image from 'next/image';
import wineIcon from '@/assets/icon/wineIcon.svg';
import Input from '@/components/inputcomponent/Input';
import '@/components/modal/modalreview/ModalReview.scss';
import WineTasteSlide from '@/components/wineTaste/WineTasteSlide';
import { AromaTag } from '@/components/aromatag/AromaTag';
import { responseReviewBody } from '@/types/ReviewProps';
import { useState, useCallback } from 'react';
import { createAromaList } from '@/utils/aromautils';
import { AromaName } from '@/types/Aroma';
import { SlideMode } from '@/types/SlideOption';
import Stars from '@/components/stars/StarsComponent';
import { addReviewsAPI, editReviewsAPI } from '@/api/Review';

interface ModalReviewProps extends ModalProps {
  wineName: string;
  wineId: number;
  ReviewData?: responseReviewBody;
}

export function ModalReview({ isModalOpen, closeModal, wineName, wineId, ReviewData }: ModalReviewProps) {
  const [rating, setRating] = useState(ReviewData?.rating || 0);
  const [slideValue, setSlideValue] = useState<number[]>(
    ReviewData ? [ReviewData.lightBold, ReviewData.smoothTannic, ReviewData.drySweet, ReviewData.softAcidic] : [0, 0, 0, 0]
  );
  const [selectedAromas, setSelectedAromas] = useState<AromaName[]>(ReviewData?.aroma || []);
  const [reviewContent, setReviewContent] = useState(ReviewData?.content || '');
  const aromaList = createAromaList(ReviewData?.aroma || []);

  const handleRatingChange = useCallback((newRating: number) => {
    setRating(newRating);
  }, []);

  const handleSlideValueChange = useCallback((newSlideValue: number[]) => {
    setSlideValue(newSlideValue);
  }, []);

  const handleAromaChange = useCallback((newAromas: AromaName[]) => {
    setSelectedAromas(newAromas);
  }, []);

  const postReview = useCallback(() => {
    if (slideValue && reviewContent) {
      addReviewsAPI({
        rating,
        lightBold: slideValue[0],
        smoothTannic: slideValue[1],
        drySweet: slideValue[2],
        softAcidic: slideValue[3],
        aroma: selectedAromas,
        content: reviewContent,
        wineId,
      });
    }
    closeModal();
  }, [rating, slideValue, reviewContent, selectedAromas, wineId, closeModal]);

  const patchReview = useCallback(() => {
    if (ReviewData?.id && slideValue && reviewContent) {
      editReviewsAPI(
        {
          rating,
          lightBold: slideValue[0],
          smoothTannic: slideValue[1],
          drySweet: slideValue[2],
          softAcidic: slideValue[3],
          aroma: selectedAromas,
          content: reviewContent,
        },
        ReviewData.id
      );
    }
    closeModal();
  }, [rating, slideValue, reviewContent, selectedAromas, ReviewData?.id, closeModal]);

  return (
    <div className="modal-layer">
      <BaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={ReviewData ? '수정하기' : '리뷰 등록'}
        closeButton={true}
        footerButtons={[
          <button key="1" onClick={ReviewData ? patchReview : postReview}>
            {ReviewData ? '수정하기' : '리뷰 남기기'}
          </button>,
        ]}
      >
        {ReviewData ? (
          <div className="review-content">
            <div className="review-title">
              <div className="a">
                <div className="b">
                  <Image src={wineIcon} alt="와인아이콘" className="wine-icon" />
                  <div className="name-and-star">
                    <p>{wineName}</p>
                    <Stars stars={ReviewData.rating} isEvent={true} onRatingChange={handleRatingChange} />
                  </div>
                </div>
                <div className="input-width">
                  <Input type="email" defaultValue={ReviewData.content} inputname="" onChange={(e) => setReviewContent(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="wine-taste">
              <p className="taste-title">와인의 맛은 어땠나요?</p>
              <WineTasteSlide
                SlideMode={ReviewData ? SlideMode.CREATE : SlideMode.EDIT}
                tasteValue={slideValue} // 슬라이더 값을 전달
                onSlideChange={handleSlideValueChange} // 슬라이더 값 변경 콜백
              />
            </div>
            <div className="wine-aroma">
              <p className="wine-aroma-title">기억에 남는 향이 있나요?</p>
              <AromaTag option="edit" list={aromaList} onChange={handleAromaChange} />
            </div>
          </div>
        ) : (
          <div className="review-content">
            <div className="review-title">
              <div className="a">
                <div className="b">
                  <Image src={wineIcon} alt="와인아이콘" className="wine-icon" />
                  <div className="name-and-star">
                    <p>{wineName}</p>
                    <Stars stars={0} isEvent={true} onRatingChange={handleRatingChange} />
                  </div>
                </div>
                <Input type="email" placeholder="후기를 작성해 주세요" inputname="" onChange={(e) => setReviewContent(e.target.value)} />
              </div>
            </div>
            <div className="wine-taste">
              <p className="taste-title">와인의 맛은 어땠나요?</p>
              <WineTasteSlide SlideMode={ReviewData ? SlideMode.CREATE : SlideMode.EDIT} onSlideChange={handleSlideValueChange} />
            </div>
            <div className="wine-aroma">
              <p className="wine-aroma-title">기억에 남는 향이 있나요?</p>
              <AromaTag option="edit" list={aromaList} onChange={handleAromaChange} />
            </div>
          </div>
        )}
      </BaseModal>
    </div>
  );
}
