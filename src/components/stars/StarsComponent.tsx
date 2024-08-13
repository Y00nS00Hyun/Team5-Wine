'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import './Stars.scss';
import star_empty from '@/assets/icon/star_empty.svg';
import star_filled from '@/assets/icon/star_filled.svg';

interface StarsProps {
  stars: number;
  isEvent?: boolean;
  onRatingChange?: (rating: number) => void;
}

// isEvent가 true인 경우: 클릭 별로 star 조정 가능
const Stars: React.FC<StarsProps> = ({ stars, isEvent = false, onRatingChange }) => {
  const [rating, setRating] = useState(stars);

  // useMemo를 사용하여 별 컴포넌트의 렌더링을 최적화
  const starElements = useMemo(() => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : 'empty'}`} onClick={() => handleStarClick(index)}>
        <Image src={index < rating ? star_filled : star_empty} alt="star" />
      </span>
    ));
  }, [rating]);

  const handleStarClick = (index: number) => {
    if (isEvent) {
      const newRating = index + 1;
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating); // 콜백 호출
      }
    }
  };

  return <div className="stars">{starElements}</div>;
};

export default Stars;
