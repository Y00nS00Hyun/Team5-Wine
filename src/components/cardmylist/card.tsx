'use client';

import React, { useEffect } from 'react';
import '@/components/cardmylist/card.scss';
import { useState } from 'react';
import { CardProps } from '@/types/Card';
import CardCommon from '../cardcommon/Cardcommon';
import ModalEdit from '@/components/modal/modaledit/ModalEdit';
import SHDropdown from '../shdropdown/SHDropDown';
import { id } from '@/types/Id';
import { WineDetailType } from '@/types/WineProps';
import { deleteWine, wineDetail } from '@/api/Wine';

interface cardMylistProps extends CardProps {
  wineId: number;
}

const Card: React.FC<cardMylistProps> = ({ image, wineName, wineDesc, winePrice, wineId }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [wineData, setWineData] = useState<WineDetailType>();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const onClickEdit = (wineId: id) => {
    setIsModalOpen(true);
    toggleDropdown();
  };

  const onClickDelete = (wineId: id) => {
    deleteWine(wineId);
    toggleDropdown();
  };

  const items = [
    { name: '수정하기', func: onClickEdit },
    { name: '삭제하기', func: onClickDelete },
  ];

  useEffect(() => {
    const fetchWineData = async() => {
      const response = await wineDetail(wineId);
      setWineData(response);
    }

    fetchWineData();
  }, [])

  return (
    <div className="card">
      <CardCommon image={image} wineName={wineName} wineDesc={wineDesc} winePrice={winePrice} />
      <span className="options" onClick={toggleDropdown}>
        {' '}
        ⋮{' '}
      </span>
      <div className="soohyun-dropdown">{dropdown && <SHDropdown items={items} reviewId={wineId} />}</div>
      <ModalEdit isModalOpen={isModalOpen} closeModal={handleCloseModal} id={wineId} wine={wineData as WineDetailType} showButton={true}/>
    </div>
  );
};

export default Card;
