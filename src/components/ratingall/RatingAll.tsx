'use client';

import React, { useEffect, useState } from 'react';
import './RatingAll.scss';
import { id } from '@/types/Id'
import { wineDetail } from '@/api/Wine';
import { wineDetailType } from '@/types/WineProps';
import Button from '@/components/button/Button';
import RatingBar from '@/components/ratingbar/ratingBar';
import RatingStart from '@/components/ratingstart/RatingStart';

interface RatingAllProps {
    score: 1 | 2 | 3 | 4 | 5;
    avgRating: number;
    avgRatings: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    reviewCount: number;
    handleOpenModal: () => void;
}

const RatingAll: React.FC<RatingAllProps> = ({ score, avgRating, avgRatings, reviewCount, handleOpenModal }) => {

    return (
        <>
            <div className='allContainer'>
                <div className='allSubContainer'>
                    <div className='allStartContainer'>
                        <RatingStart avgRating={avgRating} reviewCount={reviewCount} />
                    </div>
                    <div className='allButton'>
                        <Button text={'리뷰 남기기'} onClick={handleOpenModal} />
                    </div>
                </div>
                <div className='allRatingBars'>
                    <RatingBar score={5} avgRatings={avgRatings} reviewCount={reviewCount} />
                    <RatingBar score={4} avgRatings={avgRatings} reviewCount={reviewCount} />
                    <RatingBar score={3} avgRatings={avgRatings} reviewCount={reviewCount} />
                    <RatingBar score={2} avgRatings={avgRatings} reviewCount={reviewCount} />
                    <RatingBar score={1} avgRatings={avgRatings} reviewCount={reviewCount} />
                </div>
            </div >
        </>
    );
};

export default RatingAll;
