import React from 'react';
import './CardDetail';
import imageProp from '@/types/Image';
import './Soohyun.scss';

interface Props {
  size: 'S' | 'Group63' | 'L';
  image: imageProp; //imageProp 여야함
  wineName: string;
  wineDesc: string;
  winePrice: number; //number 여야함
}

const Card: React.FC<Props> = ({ size, image, wineName, wineDesc, winePrice }) => {
  return (
    <div className="card" data-size={size}>
      <img src={image !== null ? image : ''} alt="Card Image" className="cardImage" data-size={size} />
      {/*imageProp 으로 바꿔서 null 체크를 해줘야함*/}
      <div className="wine">
        <div className="wineName" data-size={size}>
          {wineName}
        </div>
        <div className="wineDesc" data-size={size}>
          {wineDesc}
        </div>
      </div>
      <p className="winePrice" data-size={size}>
        {winePrice}
      </p>
    </div>
  );
};

export default Card;
