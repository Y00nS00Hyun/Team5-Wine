'use client';

import React from 'react';
import './Card.scss';

interface CardProps {
  image: string;
  avgRating: number;
  name: string;
  size: 'L' | 'S';
}

const Cardmonthly: React.FC<CardProps> = ({ image, avgRating, name, size }) => {
  const stars = Math.round(avgRating);
  return (
    <div className={`card card-${size}`}>
      <img src={image} alt="Wine bottle" className="card-image" />
      <div className="card-content">
        <div className="rating">{avgRating.toFixed(1)}</div>
        <div className="stars">
          <span>{'★'.repeat(stars)}</span>
          <span className="empty-stars">{'★'.repeat(5 - stars)}</span>
        </div>
        <div className="description">{name}</div>
      </div>
    </div>
  );
};

export default Cardmonthly;
