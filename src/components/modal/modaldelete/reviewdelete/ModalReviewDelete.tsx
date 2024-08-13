'use client';

import BaseModal from '@/components/modal/modalbase/BaseModal';
import { deleteReviewsAPI } from '@/api/Review';
import { ModalWineDeleteProps } from '@/types/ModalProps';
import './ModalReviewDelete.scss';

export default function ModalDeleteReview({ isModalOpen, closeModal, id }: ModalWineDeleteProps) {
  const handleDeleteReview = async () => {
    try {
      await deleteReviewsAPI(id);
      // setWines(wines.filter((wine) => wine.id !== id));
      alert('리뷰가 삭제되었습니다.');
      closeModal();
    } catch (error) {
      console.error('리뷰 삭제 오류:', error);
      alert('리뷰 삭제에 실패했습니다.');
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
        <button key="2" onClick={handleDeleteReview}>
          삭제하기
        </button>,
      ]}
    >
      <p>정말 삭제하시겠습니까?</p>
    </BaseModal>
  );
}
