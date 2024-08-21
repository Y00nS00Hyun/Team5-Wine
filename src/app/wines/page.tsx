'use client';
import React, { useState, useEffect } from 'react';
import './page.scss';
//커스텀훅
//이미지
import rightIcon from '@/assets/icon/right.svg';
import Image from 'next/image';
//프롭스
import { wineListType, WineDetailType } from '@/types/WineProps';
//컴포넌트
import Button from '@/components/button/Button';
import Cardmonthly from '@/components/cardmonthly/CardMonthly';
import { ModalFilterver } from '@/components/modal/modalfilterver/ModalFilterver'; //ModalFilter를 복사하여 open과 close를 제거하고 새롭게 컴퍼넌트 만듦
import SearchBar from '@/components/searchbarcomponent/SearchBar';
//캐러셀
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
//API
import { wineListAPI, bestWine } from '@/api/Wine';

const WineListPage: React.FC = () => {
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await bestWine();
        setWines(response);
        const Response = await wineListAPI(5);
        if(Response) {
          setWineList(Response.list);
        }

        console.log(Response);
      } catch (error) {
        console.error('Error fetching wine details:', error);
      }
    };
    fetchWines();
  }, []);

  const [wines, setWines] = useState<wineListType[]>([]);
  const [wineList, setWineList] = useState<WineDetailType[]>([]);

  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div className="arrow-next" onClick={onClick}>
        <Image src={rightIcon} alt="right-icon" width={24} height={24} />
      </div>
    );
  };

  // Slider 설정
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    nextArrow: <NextArrow />,
  };

  const condition1 = 1; //Desktop일 경우(useWindowWidth 커스텀 훅)
  const condition2 = 1; //검색했을 경우(엔터키 눌렀을때)(useSearch 커스텀 훅)

  return (
    <div className="page">
      {/*크게 up-page와 down-page로, CardMonthly 리스트와 CardWine 리스트로 나눔*/}
      <div className="up-page">
        <h2 className="recommend">이번 달 추천 와인</h2>
        <div className="wines">
          <Slider {...settings}>
            {wines.map((wine) => (
              <Cardmonthly key={wine.id} image={wine.image} avgRating={wine.avgRating} name={wine.name} />
            ))}
          </Slider>
        </div>
      </div>
      <div className="down-page">
        {condition1 && (
          <div className="desktop-modal">
            {/* <ModalFilter /> */}
            <ModalFilterver setWines={setWineList} showButton={false} />
            {/*아래 버튼 비활성화되게 수정한 모달 필터  */}
            <Button type="submit" text="와인 등록하기" />
          </div>
        )}
        <div className="search">
          <SearchBar placeholder="와인을 검색해 보세요" />
          {condition2 && (
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
          )}
        </div>
        <div className="card-wines">
        {/*카드와인 무한스크롤 */}
          {/* {wineList.map((list) => (
            <Card key={list.id} image={list.image}
             wineName={list.name} wineDesc={list.region}
              winePrice={list.price} review={list.recentReview || ''}
               avgRating={list.avgRating} reviewCount={list.reviewCount} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default WineListPage;
/*const [wineList, setWineList] = useState<winListType[]>([]);
  const condition1 = useWindowWidth() > 1024;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [wines, setWines] = useState<wine[]>(newWines);
 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  <div className="circle">
          <Image src={rightIcon} alt="right-icon" width={24} height={24} />
        </div>
 */
