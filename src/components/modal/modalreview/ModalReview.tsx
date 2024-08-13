import BaseModal from '../modalbase/BaseModal';
import { ModalProps } from '@/types/ModalProps';
import Image from 'next/image';
import wineIcon from '@/assets/icon/wineIcon.svg';
import Input from '@/components/inputComponent/Input';
import '@/components/modal/modalreview/ModalReview.scss';
import WineTasteSlide from '@/components/wineTaste/WineTasteSlide';
import { AromaTag } from '@/components/aromatag/AromaTag';
import { responseReviewBody } from '@/types/ReviewProps';
import { useState, useCallback, useEffect } from 'react';
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
  const [slideValue, setSlideValue] = useState<number[]>(ReviewData ? [ReviewData.lightBold, ReviewData.smoothTannic, ReviewData.drySweet, ReviewData.softAcidic] : [0, 0, 0, 0]);
  const [selectedAromas, setSelectedAromas] = useState<AromaName[]>(ReviewData?.aroma || []);
  const [reviewContent, setReviewContent] = useState(ReviewData?.content || '');
  const [aromas, setAromas] = useState<AromaName[]>(ReviewData?.aroma || []);
  const aromaList = createAromaList(aromas);

  // console.log(ReviewData);

  // useEffect(() => {
  //   // console.log('rating' + ReviewData?.rating);
  //   setRating(ReviewData?.rating || 0);
  //   setReviewContent(ReviewData?.content || '');
  //   setSlideValue(ReviewData ? [ReviewData.lightBold, ReviewData.smoothTannic, ReviewData.drySweet, ReviewData.softAcidic] : [0, 0, 0, 0]);
  //   setSelectedAromas(ReviewData?.aroma || []);
  //   const aromatest: AromaName[] = ReviewData?.aroma || [];
  //   const aromaList = createAromaList(aromatest);
  // }, [ReviewData]);

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
    console.log('리뷰등록실행');
    console.log(rating, slideValue, selectedAromas, reviewContent, wineId);
    if (slideValue && reviewContent) {
      const requestBody = {
        rating: rating,
        lightBold: slideValue[0],
        smoothTannic: slideValue[1],
        drySweet: slideValue[2],
        softAcidic: slideValue[3],
        aroma: selectedAromas,
        content: reviewContent,
        wineId: wineId,
      };
      addReviewsAPI(requestBody);
    }
    closeModal();
  }, [rating, slideValue, reviewContent, selectedAromas, wineId]);

  const patchReview = useCallback(() => {
    console.log('리뷰수정실행');

    if (ReviewData?.id && slideValue && reviewContent) {
      const requestBody = {
        rating: rating,
        lightBold: slideValue[0],
        smoothTannic: slideValue[1],
        drySweet: slideValue[2],
        softAcidic: slideValue[3],
        aroma: selectedAromas,
        content: reviewContent,
      };
      editReviewsAPI(requestBody, ReviewData.id);
    }
    closeModal();
  }, [rating, slideValue, reviewContent, selectedAromas]);

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
              {/* <p>와인이름과 별점 후기용</p> */}
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
              <WineTasteSlide SlideMode={ReviewData ? SlideMode.CREATE : SlideMode.EDIT} tasteValue={[ReviewData.lightBold, ReviewData.smoothTannic, ReviewData.drySweet, ReviewData.softAcidic]} />
            </div>
            <div className="wine-aroma">
              <p className="wine-aroma-title">기억에 남는 향이 있나요?</p>
              <AromaTag option="edit" list={aromaList} onChange={handleAromaChange} />
            </div>
          </div>
        ) : (
          <div className="review-content">
            <div className="review-title">
              {/* <p>와인이름과 별점 후기용</p> */}
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
