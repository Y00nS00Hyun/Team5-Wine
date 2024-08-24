'use client';

import React, { useEffect } from 'react';
import './CardMy.scss';
import { useState } from 'react';
import { deleteReviewsAPI } from '@/api/Review';
import SHDropdown from '../shdropdown/SHDropDown';
import { ModalReview } from '../modal/modalreview/ModalReview';
import { ReviewListType } from '@/types/ReviewProps';
import { id } from '@/types/Id';
import { disableScroll, activateScroll } from '@/components/modal/components/modalscroll/modalScroll';
import ModalDeleteReview from '../modal/modaldelete/reviewdelete/ModalReviewDelete';

const Cardmy: React.FC<ReviewListType> = (prop) => {
  const stars = Math.round(prop.rating);
  const formattedDate = new Date(prop.createdAt).toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환

  const [dropdown, setDropdown] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      const currentScrollY = disableScroll();

      return () => {
        activateScroll(currentScrollY);
      };
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

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

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const onClickEdit = () => {
    console.log(' 수정하기');
    setIsEditModalOpen(true);
    toggleDropdown();
  };

  const onClickDelete = () => {
    console.log(' 삭제하기');
    setIsDeleteModalOpen(true);
    toggleDropdown();
  };

  // const onClickDelete = async () => {
  //   console.log(' 삭제하기');
  //   try {
  //     await deleteReviewsAPI(prop.id);
  //     console.log(' 삭제 성공');
  //     toggleDropdown();
  //   } catch (error) {
  //     console.error('리뷰 삭제 중 오류 발생', error);
  //     alert('리뷰 삭제 중 문제가 발생했습니다.');
  //   }
  // };

  const items = [
    { name: '수정하기', func: onClickEdit },
    { name: '삭제하기', func: onClickDelete },
  ];

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="rating-container">
          <span className="rating">★ {prop.rating.toFixed(1)}</span>
          <span className="time">{formattedDate}</span>
        </div>
        <span className="options" onClick={toggleDropdown}>
          {' '}
          ⋮{' '}
        </span>
      </div>
      <div className="review-body">
        <h3 className="title">{prop.wine.name}</h3>
        <p className="description">{prop.content}</p>
      </div>

      <div className="soohyun-dropdown">{dropdown && <SHDropdown items={items} reviewId={prop.id} />}</div>
      <ModalReview isModalOpen={isEditModalOpen} closeModal={handleCloseEditModal} wineName={prop.wine.name} wineId={prop.wine.id} ReviewData={reviewData} showButton={true} />
      <ModalDeleteReview isModalOpen={isDeleteModalOpen} closeModal={handleCloseDeleteModal} reviewId={prop.id} showButton={true} />
    </div>
  );
};

export default Cardmy;
