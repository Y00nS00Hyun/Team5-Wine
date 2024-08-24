'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/carddetail/Card';
import './page.scss';
import Image from 'next/image';
import { bestWine, wineDetail } from '@/api/Wine';
import { wineDetailType } from '@/types/WineProps';
import noreview from '@/assets/icon/noreview.svg';
import RatingAll from '@/components/ratingall/RatingAll';
import CardReview from '@/components/cardreview/CardReview';
import { ModalReview } from '@/components/modal/modalreview/ModalReview';
import { disableScroll, activateScroll } from '@/components/modal/components/modalscroll/modalScroll';

interface PageProps {
  params: { id: string };
}

const App: React.FC<PageProps> = ({ params }) => {
  const id = parseInt(params.id, 10);
  const [detail, setDetail] = useState<wineDetailType | null>(null);
  const [score, setScore] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isChanged, setIsChanged] = React.useState(false);

  useEffect(() => {
    if (isModalOpen) {
      const currentScrollY = disableScroll();

      return () => {
        activateScroll(currentScrollY);
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchWineDetail = async () => {
      try {
        const response = await wineDetail(id);

        setDetail(response);
        // console.log(response);
      } catch (error) {
        console.error('Error fetching wine details:', error);
      }
    };
    fetchWineDetail();
  }, [id, isModalOpen, isChanged]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIsChanged = () => {
    setIsChanged(!isChanged);
  };

  return (
    <div className="wine-page">
      {detail && (
        <div className="wine-content">
          <div className="wine-card">
            {' '}
            <Card image={detail.image} wineName={detail.name} wineDesc={detail.region} winePrice={detail.price} />
          </div>
          <div className="wine-position">
            <div className="a">
              <div className="rating-section">
                <RatingAll score={score} avgRating={detail.avgRating} avgRatings={detail.avgRatings} reviewCount={detail.reviewCount} handleOpenModal={handleOpenModal} />{' '}
              </div>

              <div className="review-title-sh">리뷰 목록</div>
              <div>
                {' '}
                {detail.reviewCount > 0 ? (
                  detail.reviews.map((review) => <CardReview key={review.id} reviewId={review.id} handleIsChanged={handleIsChanged} wineName={detail.name} />)
                ) : (
                  <div className="no-reviews">
                    <Image src={noreview} alt="Wine bottle" />
                    <span className="no-reviews-explain">작성된 리뷰가 없어요</span>
                  </div>
                )}
              </div>

              <div className="modal-review">
                <ModalReview isModalOpen={isModalOpen} closeModal={handleOpenModal} wineName={detail.name} wineId={id} showButton={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
