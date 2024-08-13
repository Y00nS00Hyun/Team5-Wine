"use client"

import React from 'react';
import './CardMonthly.scss';
import wine_bottle from '@/assets/icon/wine_bottle.svg';
import Stars from '@/components/stars/StarsComponent'

interface CardProps {
    image: string | null;
    avgRating: number;
    name: string;
}

const Cardmonthly: React.FC<CardProps> = ({ image, avgRating, name }) => {
    const stars = Math.round(avgRating);
    return (
        <div className="card">
            <img className="wine-img" src={image !== null ? image : wine_bottle} alt="Wine bottle" />
            <div className="card-content">
                <div className="rating">{avgRating.toFixed(1)}</div>
                <div className="stars-rating">
                    <Stars stars={avgRating} isEvent={false} />
                </div>
                <div className="description">{name}</div>
            </div>
        </div>
    );
};

export default Cardmonthly;
