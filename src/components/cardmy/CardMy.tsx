'use client';

import React from 'react';
import './CardMy.scss';
import { useState } from 'react';
import { deleteReviewsAPI } from '@/api/Review';
import SHDropdown from '../shdropdown/SHDropDown';
import { ModalReview } from '../modal/modalreview/ModalReview';
import { ReviewListType } from '@/types/ReviewProps';
import { id } from '@/types/Id';

// interface ReviewCardProps extends responseReviewBody{

// }

const Cardmy: React.FC<ReviewListType> = (prop) => {
  const stars = Math.round(prop.rating);
  const formattedDate = new Date(prop.createdAt).toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환

  const menuRef = React.useRef<HTMLSpanElement>(null);

  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const reviewData = {
    id: prop.id,
    rating: prop.rating,
    lightBold: prop.lightBold,
    smoothTannic: prop.smoothTannic,
    drySweet: prop.drySweet,
    softAcidic: prop.softAcidic,
    aroma: prop.aroma,
    content: prop.content,
    wineId: prop.wine.id,
    teamId: '7-5',
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    console.log(menuRef.current);
    setDropdown(!dropdown);
  };

  const onClickEdit = () => {
    console.log(' 수정하기');
    setIsModalOpen(true);
    toggleDropdown();
  };

  const onClickDelete = async () => {
    console.log(' 삭제하기');
    try {
      await deleteReviewsAPI(prop.id);
      console.log(' 삭제 성공');
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

  return (
    <div className="review-card">
      <div
        className="review-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="rating-container">
          <span className="rating">★ {prop.rating.toFixed(1)}</span>
          <span className="time">{formattedDate}</span>
        </div>
        <span ref={menuRef} className="options" onClick={toggleDropdown}>
          ⋮
        </span>
      </div>
      <div className="review-body">
        <h3 className="title">{prop.wine.name}</h3>
        <p className="description">{prop.content}</p>
      </div>

      <div
        className="soohyun-dropdown"
        style={{
          top: (menuRef.current?.offsetTop || 0) + 16 + 'px',
        }}
      >
        {dropdown && <SHDropdown items={items} reviewId={prop.id} />}
      </div>
      <ModalReview isModalOpen={isModalOpen} closeModal={handleCloseModal} wineName={prop.wine.name} wineId={prop.wine.id} ReviewData={reviewData} />
    </div>
  );
};

export default Cardmy;
