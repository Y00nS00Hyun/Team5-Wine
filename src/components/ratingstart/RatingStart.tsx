"use client";

import React from 'react';
import './RatingStart.scss';
import Stars from '@/components/stars/StarsComponent';

interface CardProps {
    avgRating: number | null;
    reviewCount: number;
}

const RatingStart: React.FC<CardProps> = ({ avgRating, reviewCount }) => {
    return (
        <div className="start-card">
            <div className="start-rating">{avgRating !== null ? avgRating.toFixed(1) : 0}</div>
            <div className="start-card-content">
                <Stars stars={avgRating !== null ? avgRating : 0} isEvent={false} />
                <span className="start-review">{reviewCount.toLocaleString()}개의 후기</span>
            </div>
        </div>
    );
};

export default RatingStart;
