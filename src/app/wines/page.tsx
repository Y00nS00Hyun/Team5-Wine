'use client';
import React, { useState, useEffect } from 'react';
import './page.scss';
import { ModalFilter } from '@/components/modal/modalfilter/ModalFilter';
import Input from '@/components/inputcomponent/Input';
import SearchBar from '@/components/searchbarcomponent/SearchBar';
import useWindowWidth from '@/hook/useWindowWidth';
import Button from '@/components/button/Button';
import cardwine from '@/components/cardwine/Card';
import rightIcon from '@/assets/icon/right.svg';
import filterButton from '@/assets/icon/filter_button.svg';
import Image from 'next/image';
import cardmonthly from '@/components/cardmonthly/CardMonthly';
import { wineListAPI, wineDetail, bestWine } from '@/api/Wine';
import { winListType, wineDetailType } from '@/types/WineProps';

const WineListPage: React.FC = () => {
  /*const [wineList, setWineList] = useState<winListType[]>([]);
  const condition1 = useWindowWidth() > 1024;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [wines, setWines] = useState<wine[]>(newWines);
 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 */
  const [nowFilter, setNowFilter] = useState({
    ranking: true,
    minPrice: false,
    maxPrice: false,
  });

  const handleFilter = (filter: 'ranking' | 'minPrice' | 'maxPrice') => {
    setNowFilter({
      ranking: false,
      minPrice: false,
      maxPrice: false,
      [filter]: true,
    });
  };

  const condition1 = 1; //Desktop일 경우(useWindowWidth 커스텀 훅)
  const condition2 = 1; //검색했을 경우(엔터키 눌렀을때)(useSearch 커스텀 훅)

  return (
    <div className="page">
      {/*크게 up-page와 down-page로, CardMonthly 리스트와 CardWine 리스트로 나눔*/}
      <div className="up-page">
        <div className="recommend">이번 달 추천 와인</div>
        <div className="wines">{/*베스트와인 10개 캐러셀로 */}</div>
        <div className="circle">
          <Image src={rightIcon} alt="right-icon" width={24} height={24} />
        </div>
      </div>
      <div className="desktop-down-page">
        {/*desktop일경우만 모달필터가 항상 활성화 되어 있음 */}
        {condition1 && (
          <div className="modal">
            {/* <ModalFilter /> */}
            {/*아래 버튼 비활성화되게 수정한 모달 필터  */}
            <Button type="submit" text="와인 등록하기" />
          </div>
        )}
        <div className="down-page">
          <div className="search">
            <SearchBar placeholder="와인을 검색해 보세요" />
            {condition2 && (
              <div className="wine-filter">
                <p className={`wine-filter-by ${nowFilter.ranking ? '' : 'unactive'}`} onClick={() => handleFilter('ranking')}>
                  추천순
                </p>
                <p className={`wine-filter-by ${nowFilter.maxPrice ? '' : 'unactive'}`} onClick={() => handleFilter('maxPrice')}>
                  추천순
                </p>
                <p className={`wine-filter-by ${nowFilter.minPrice ? '' : 'unactive'}`} onClick={() => handleFilter('minPrice')}>
                  추천순
                </p>
              </div>
            )}
          </div>
          <div className="card-wines"></div>
          {/*카드와인 무한스크롤 */}
        </div>
      </div>
    </div>
  );
};

export default WineListPage;
/*
<ModalFilter isModalOpen closeModal={closeModal} showButton={false} setWines={newWines} />
      <div className='페이지하단'>
        <div className='인풋'>
          {!condition1&&(<img className='필터버튼'/>)}
          <SearchBar placeholder=''/>
        </div>
        <div className='카드와인들'></div>
      </div>

      {condition1 && (
              <div className="filter-box">
                <Image src={filterButton} alt="filter-button" width={26} height={26} />
              </div>
            )}
*/
