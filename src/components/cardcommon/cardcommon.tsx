import React from 'react';
import { CardProps } from '@/types/Card';

function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

const CardCommon: React.FC<CardProps> = ({ image, wineName, wineDesc, winePrice }) => {
  console.log(image);
  return (
    <>
      <img src={image ? image : ''} alt="Card-image" className="card-image" />
      <div className="wine">
        <div className="wine-name">{wineName}</div>
        <div className="wine-desc">{wineDesc}</div>
        <div className="wine-price">{formatCurrency(winePrice)}</div>
      </div>
    </>
  );
};

export default CardCommon;
