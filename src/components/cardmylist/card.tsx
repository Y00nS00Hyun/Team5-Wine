'use client';

import React, { useEffect } from 'react';
import '@/components/cardmylist/card.scss';
import { useState } from 'react';
import { CardProps } from '@/types/Card';
import CardCommon from '../cardcommon/Cardcommon';
import ModalEdit from '@/components/modal/modaledit/ModalEdit';
import SHDropdown from '../shdropdown/SHDropDown';
import { id } from '@/types/Id';
import { wineDetailType } from '@/types/WineProps';
import { deleteWine, wineDetail } from '@/api/Wine';
import { disableScroll, activateScroll } from '@/components/modal/components/modalscroll/modalScroll';
import ModalDeleteWine from '../modal/modaldelete/winedelete/ModalWineDelete';

interface cardMylistProps extends CardProps {
  wineId: number;
}

const Card: React.FC<cardMylistProps> = ({ image, wineName, wineDesc, winePrice, wineId }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [wineData, setWineData] = useState<wineDetailType>();

  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      const currentScrollY = disableScroll();

      return () => {
        activateScroll(currentScrollY);
      };
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  // const onClickEdit = (wineId: id) => {
  //   setIsModalOpen(true);
  //   toggleDropdown();
  // };

  // const onClickDelete = (wineId: id) => {
  //   deleteWine(wineId);
  //   toggleDropdown();
  // };

  const items = [
    { name: '수정하기', func: onClickEdit },
    { name: '삭제하기', func: onClickDelete },
  ];

  useEffect(() => {
    const fetchWineData = async () => {
      const response = await wineDetail(wineId);
      setWineData(response);
    };

    fetchWineData();
  }, []);

  return (
    <div className="card">
      <CardCommon image={image} wineName={wineName} wineDesc={wineDesc} winePrice={winePrice} />
      <span className="options" onClick={toggleDropdown}>
        {' '}
        ⋮{' '}
      </span>
      <div className="soohyun-dropdown">{dropdown && <SHDropdown items={items} reviewId={wineId} />}</div>
      <ModalEdit isModalOpen={isEditModalOpen} closeModal={handleCloseEditModal} id={wineId} wine={wineData as wineDetailType} showButton={true} />
      <ModalDeleteWine isModalOpen={isDeleteModalOpen} closeModal={handleCloseDeleteModal} wineId={wineId} showButton={true} />
    </div>
  );
};

export default Card;
