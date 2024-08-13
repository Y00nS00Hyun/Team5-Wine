import React from 'react';
import closeIcon from '@/assets/icon/close.svg';
import Image from 'next/image';
import './BaseModal.scss';
import { BaseModalProps } from '@/types/BaseModalProps';

function BaseModal({ isOpen, onClose, title, closeButton, children, footerButtons }: BaseModalProps) {
  if (!isOpen) return null;

  const footerButtonsArray = React.Children.toArray(footerButtons);
  const footerClass = footerButtonsArray.length === 1 ? 'full-width' : '';

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="title">{title}</h2>
          {closeButton && (
            <button className="close-button" onClick={onClose}>
              <Image src={closeIcon} alt="닫기 아이콘"></Image>
            </button>
          )}
        </div>
        <div className="modal-content">{children}</div>
        <div className={`modal-footer ${footerClass}`}>{footerButtons}</div>
      </div>
    </div>
  );
}

export default BaseModal;
