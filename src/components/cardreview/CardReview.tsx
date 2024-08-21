'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import './CardReview.scss';
import Image from 'next/image';
import { AromaTag } from '@/components/aromatag/AromaTag';
import { Aroma, AromaName } from '@/types/Aroma';
import { ReviewDetailType } from '@/types/ReviewProps';
import { createAromaList } from '@/utils/aromautils';
import { SlideMode } from '@/types/SlideOption';
import { id } from '@/types/Id';
import WineTasteSlide from '@/components/wineTaste/WineTasteSlide';
import { searchReviewsAPI, deleteReviewsAPI } from '@/api/Review';
import defaultprofile from '@/assets/icon/defaultprofile.webp';
import SHDropdown from '@/components/shdropdown/SHDropDown';
import { ModalReview } from '@/components/modal/modalreview/ModalReview';
import { responseReviewBody } from '@/types/ReviewProps';
import { useSession } from 'next-auth/react';
import { wineListAPI } from '@/api/Wine';

interface ReviewProps {
  wineName: string;
  reviewId: id;
  handleIsChanged: () => void;
}

function convertReviewListToResponseBody(review: ReviewDetailType, wineId: number): responseReviewBody {
  return {
    id: review.id,
    rating: review.rating,
    lightBold: review.lightBold,
    smoothTannic: review.smoothTannic,
    drySweet: review.drySweet,
    softAcidic: review.softAcidic,
    aroma: review.aroma,
    content: review.content,
    wineId: wineId,
    teamId: '7-5',
  };
}

const CardReview: React.FC<ReviewProps> = ({ reviewId, handleIsChanged, wineName }) => {
  const [detail, setDetail] = useState<ReviewDetailType>();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const session = useSession();
  const userData = session.data?.user.user;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const onClickEdit = (reviewId: id) => {
    console.log(reviewId + ' 수정하기');
    handleIsChanged();
    wineListAPI(5);
    setIsModalOpen(true);
    toggleDropdown();
  };

  const onClickDelete = async (reviewId: id) => {
    console.log(reviewId + ' 삭제하기');
    try {
      await deleteReviewsAPI(reviewId);
      console.log(reviewId + ' 삭제 성공');
      handleIsChanged();
      setDetail(undefined);
      toggleDropdown();
    } catch (error) {
      console.error('리뷰 삭제 중 오류 발생', error);
      alert('리뷰 삭제 중 문제가 발생했습니다.');
    }
  };

  const items = [
    { name: '수정하기', func: onClickEdit },
    { name: '삭제하기', func: onClickDelete },
  ];

  useEffect(() => {
    const fetchWineDetail = async () => {
      try {
        const response = await searchReviewsAPI(reviewId);
        setDetail(response);
      } catch (error) {
        console.error('Error fetching wine details:', error);
      }
    };
    fetchWineDetail();
  }, [reviewId, isModalOpen]);

  return (
    <>
      {detail && (
        <div className="soohyun-card">
          <div className="soohyun-header">
            <div className="soohyun-profile">
              {detail.user.image ? <img src={detail.user.image} className="soohyun-image" /> : <Image src={defaultprofile} alt="와인아이콘" className="soohyun-image" />}
              <span className="soohyun-nickname-date">
                <span className="soohyun-nickname">{detail.user.nickname}</span>
                <span className="soohyun-date">{new Date(detail.createdAt).toISOString().split('T')[0]}</span>
              </span>
            </div>
            <div>
              {userData && userData.user.id === detail.user.id && (
                <span className="options" onClick={toggleDropdown}>
                  {' '}
                  ⋮{' '}
                </span>
              )}
            </div>
          </div>
          <div className="soohyun-aroma">
            <AromaTag option="view" list={createAromaList(detail.aroma)} />
          </div>
          <div className="soohyun-content">{detail.content}</div>
          <div className="soohyun-taste">
            <WineTasteSlide tasteValue={[detail.lightBold, detail.smoothTannic, detail.drySweet, detail.softAcidic]} SlideMode={SlideMode.VIEW} />
          </div>
          <div className="soohyun-dropdown">{dropdown && <SHDropdown items={items} reviewId={reviewId} />}</div>
          <ModalReview isModalOpen={isModalOpen} closeModal={handleCloseModal} wineName={wineName} wineId={detail?.wineId} ReviewData={convertReviewListToResponseBody(detail, detail?.wineId)} showButton={true} />
        </div>
      )}
    </>
  );
};

export default CardReview;
