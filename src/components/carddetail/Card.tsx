'use client';

import React from 'react';
import './Card.scss';
import { CardProps } from '@/types/Card';
import CardCommon from '../cardcommon/Cardcommon';

const Card: React.FC<CardProps> = ({ image, wineName, wineDesc, winePrice }) => {
  return (
    <div className="card">
      <CardCommon image={image} wineName={wineName} wineDesc={wineDesc} winePrice={winePrice} />
    </div>
  );
};

export default Card;
