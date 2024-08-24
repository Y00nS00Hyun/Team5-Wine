'use client';

import React from 'react';
import './RatingBar.scss';

interface RatingBarProps {
  score: 1 | 2 | 3 | 4 | 5;
  avgRatings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  reviewCount: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ score, avgRatings, reviewCount }) => {
  const percentage = reviewCount && (avgRatings[score] / reviewCount) * 100;

  return (
    <div className="container">
      <span className="label">{score}점</span>
      <div className="progressBar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default RatingBar;
