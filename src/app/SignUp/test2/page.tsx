'use client';

import { useEffect, useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { wineDetailType } from '@/types/WineProps';
import ModalDeleteReview from '@/components/modal/modaldelete/reviewdelete/ModalReviewDelete';
import ModalWine from '@/components/modal/modalwine/ModalWine';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wines, setWines] = useState<wineDetailType[]>([]);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedReviewId(null);
  }

  const openDeleteModal = (reviewId: number) => {
    setIsModalOpen(true);
    setSelectedReviewId(reviewId);
  };

  useEffect(() => {
    async function fetchWine() {
      try {
        const res = await wineListAPI(30);
        setWines(res.list);
      } catch (e) {
        console.error('Error fetching wine detail:', e);
      }
    }
    fetchWine();
  }, [selectedReviewId]);

  return (
    <>
      <div>
        {wines.map((wine) => (
          <div key={wine.id}>
            <h4>{wine.name}</h4>
            <p>가격: ₩{wine.price.toLocaleString()}</p>
            <p>등급: {wine.avgRating}</p>
            <p>아이디: {wine.id}</p>
            {wine.recentReview ? (
              <div>
                <h5>최근 리뷰</h5>
                <p>id: {wine.recentReview.id}</p>
                <p>리뷰어: {wine.recentReview.user.nickname}</p>
                <p>리뷰 내용: {wine.recentReview.content}</p>
                <p>별점: {wine.recentReview.rating}</p>
                <p>아로마: {wine.recentReview.aroma.join(', ')}</p>
                <p>리뷰 작성일: {new Date(wine.recentReview.createdAt).toLocaleString()}</p>
                <button onClick={() => openDeleteModal(wine.recentReview.id)}>리뷰 삭제</button>
              </div>
            ) : (
              <p>최근 리뷰가 없습니다.</p>
            )}
            <button onClick={() => openDeleteModal(wine.id)}>와인 삭제</button>
            {isModalOpen && <ModalDeleteReview isModalOpen={isModalOpen} closeModal={closeModal} id={selectedReviewId as number} />}
          </div>
        ))}
      </div>
    </>
  );
}
