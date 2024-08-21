'use client';

import { useEffect, useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { WineDetailType } from '@/types/WineProps';
import ModalDeleteReview from '@/components/modal/modaldelete/reviewdelete/ModalReviewDelete';
import ModalWine from '@/components/modal/modalwine/ModalWine';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wines, setWines] = useState<WineDetailType[]>([]);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>열기</button>
      <ModalWine isModalOpen={isModalOpen} closeModal={closeModal} showButton={true} />
    </>
  );
}
