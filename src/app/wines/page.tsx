'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './page.scss';

import rightIcon from '@/assets/icon/right.svg';

import Card from '@/components/cardwine/Card';
import Button from '@/components/button/Button';
import Cardmonthly from '@/components/cardmonthly/CardMonthly';
import { ModalFilterver } from '@/components/modal/modalfilterver/ModalFilterver';
import SearchBar from '@/components/searchbarcomponent/SearchBar';

import { wineListType, wineDetailType } from '@/types/WineProps';

import { wineListAPI, bestWine } from '@/api/Wine';

type FilterKey = 'ranking' | 'minPrice' | 'maxPrice';

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="arrow-next" onClick={onClick}>
    <Image src={rightIcon} alt="right-icon" width={24} height={24} />
  </div>
);

const sliderSettings = {
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  fade: false,
  nextArrow: <NextArrow />,
};

const WineListPage: React.FC = () => {
  const [wines, setWines] = useState<wineListType[]>([]);
  const [wineList, setWineList] = useState<wineDetailType[]>([]);
  const [nowFilter, setNowFilter] = useState<Record<FilterKey, boolean>>({
    ranking: true,
    minPrice: false,
    maxPrice: false,
  });

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const [bestResponse, listResponse] = await Promise.all([bestWine(), wineListAPI(5)]);
        setWines(bestResponse ?? []);
        if (listResponse) setWineList(listResponse.list);
      } catch (error) {
        console.error('Error fetching wine details:', error);
      }
    };
    fetchWines();
  }, []);

  const handleFilter = (filter: FilterKey) => {
    setNowFilter({ ranking: false, minPrice: false, maxPrice: false, [filter]: true });
  };

  return (
    <div className="page">
      <div className="up-page">
        <h2 className="recommend">이번 달 추천 와인</h2>
        <div className="wines">
          <Slider {...sliderSettings}>
            {wines.map((wine) => (
              <Cardmonthly key={wine.id} image={wine.image} avgRating={wine.avgRating} name={wine.name} />
            ))}
          </Slider>
        </div>
      </div>
      <div className="down-page">
        <div className="desktop-modal">
          <ModalFilterver setWines={setWineList} showButton={false} />
          <Button type="submit" text="와인 등록하기" />
        </div>
        <div className="search">
          <SearchBar placeholder="와인을 검색해 보세요" />
          <div className="wine-filter">
            <p className={`wine-filter-by ${nowFilter.ranking ? '' : 'unactive'}`} onClick={() => handleFilter('ranking')}>
              추천순
            </p>
            <p className={`wine-filter-by ${nowFilter.maxPrice ? '' : 'unactive'}`} onClick={() => handleFilter('maxPrice')}>
              높은가격순
            </p>
            <p className={`wine-filter-by ${nowFilter.minPrice ? '' : 'unactive'}`} onClick={() => handleFilter('minPrice')}>
              낮은가격순
            </p>
          </div>
        </div>
        <div className="card-wines">
          {wineList.map((list) => (
            <Card
              key={list.id}
              image={list.image}
              wineName={list.name}
              wineDesc={list.region}
              winePrice={list.price}
              review={list.recentReview || ''}
              avgRating={list.avgRating}
              reviewCount={list.reviewCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WineListPage;
