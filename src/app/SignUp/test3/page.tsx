'use client';

import { useEffect, useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { wine } from '@/types/WineProps';
import ModalDeleteWine from '@/components/modal/modaldelete/winedelete/ModalWineDelete';
import ModalEdit from '@/components/modal/modaledit/ModalEdit';
import ModalWine from '@/components/modal/modalwine/ModalWine';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wines, setWines] = useState<wine[]>();
  const [selectedWineId, setSelectedWineId] = useState<number | null>(null);
  const [selectedWine, setSelectedWine] = useState<wine | null>(null);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedWineId(null);
  }

  const openEditModal = (wine: wine) => {
    try {
      setSelectedWine(wine);
      setIsModalOpen(true);
    } catch (error) {
      console.error('와인 정보를 가져오는 데 오류가 발생했습니다:', error);
    }
  };
  useEffect(() => {
    async function fetchWine() {
      try {
        const res = await wineListAPI(30);
        setWines(res.list);
        console.log(res.list);
      } catch (e) {
        console.error('Error fetching wine detail:', e);
      }
    }
    fetchWine();
  }, [selectedWineId]);

  return (
    <>
      <div>
        {wines &&
          wines.map((wine) => (
            <div key={wine.id}>
              <h4>{wine.name}</h4>
              <p>가격: ₩{wine.price.toLocaleString()}</p>
              <p>등급: {wine.avgRating}</p>
              <p>아이디: {wine.id}</p>
              <button onClick={() => openEditModal(wine)}>수정하기</button>
            </div>
          ))}

        {/* {selectedWineId && <ModalEdit isModalOpen={isModalOpen} closeModal={closeModal} id={selectedWineId} showButton={true} />} */}
        <ModalEdit isModalOpen={isModalOpen} closeModal={closeModal} showButton={true} id={selectedWineId as number} wine={selectedWine} />
      </div>
    </>
  );
}
