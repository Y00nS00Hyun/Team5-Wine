'use client';

import { useEffect, useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { wine } from '@/types/WineProps';
import ModalDeleteWine from '@/components/modal/modaldelete/winedelete/ModalWineDelete';
import { disableScroll, activateScroll } from '@/components/modal/components/modalscroll/modalScroll';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wines, setWines] = useState<wine[]>();
  const [selectedWineId, setSelectedWineId] = useState<number | null>(null);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedWineId(null);
  }

  const openDeleteModal = (id: number) => {
    setIsModalOpen(true);
    setSelectedWineId(id);
  };

  useEffect(() => {
    if (isModalOpen) {
      const currentScrollY = disableScroll();

      return () => {
        activateScroll(currentScrollY);
      };
    }
  }, [isModalOpen]);

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
              <button onClick={() => openDeleteModal(wine.id)}>삭제</button>
              {/* {selectedWineId === wine.id && <ModalDeleteWine isModalOpen={isModalOpen} closeModal={closeModal} id={wine.id} setWines={setWines} wines={wines} />} */}
              {selectedWineId === wine.id && <ModalDeleteWine isModalOpen={isModalOpen} closeModal={closeModal} id={wine.id} />}
            </div>
          ))}
      </div>
    </>
  );
}
