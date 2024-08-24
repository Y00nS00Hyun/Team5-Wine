'use client';

import BaseModal from '@/components/modal/modalbase/BaseModal';
import { deleteWine } from '@/api/Wine';
import { ModalWineDeleteProps } from '@/types/ModalProps';
import './ModalWineDelete.scss';

export default function ModalDeleteWine({ isModalOpen, closeModal, wineId }: ModalWineDeleteProps) {
  const handleDeleteWine = async () => {
    try {
      await deleteWine(wineId);
      // setWines(wines.filter((wine) => wine.id !== id));
      alert('와인이 삭제되었습니다.');
      closeModal();
    } catch (error) {
      console.error('와인 삭제 오류:', error);
      alert('와인 삭제에 실패했습니다.');
    }
  };

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title=""
      closeButton={false}
      footerButtons={[
        <button key="1" onClick={closeModal}>
          취소
        </button>,
        <button key="2" onClick={handleDeleteWine}>
          삭제하기
        </button>,
      ]}
    >
      <p>정말 삭제하시겠습니까?</p>
    </BaseModal>
  );
}
