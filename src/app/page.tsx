'use client';
import HeaderL from '@/assets/png/lg_01.png';
import HeaderM from '@/assets/png/md_01.png';
import HeaderS from '@/assets/png/sm_01.png';
import wineRecommendedL from '@/assets/png/lg_02.png';
import wineRecommendedS from '@/assets/png/sm_02.png';
import wineDetailsL from '@/assets/png/lg_03.png';
import wineDetailsS from '@/assets/png/sm_03.png';
import wineReviewsL from '@/assets/png/lg_04.png';
import wineReviewsS from '@/assets/png/sm_04.png';
import Image from 'next/image';
import './page.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showHeader, setShowHeader] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [headerImage, setHeaderImage] = useState(HeaderL);
  const [recommendedWineImage, setRecommendedWineImage] = useState(wineRecommendedL);
  const [wineDetailsImage, setWineDetailsImage] = useState(wineDetailsL);
  const [wineReviewsImage, setWineReviewsImage] = useState(wineReviewsL);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setHeaderImage(HeaderS);
        setRecommendedWineImage(wineRecommendedS);
        setWineDetailsImage(wineDetailsS);
        setWineReviewsImage(wineReviewsS);
      } else if (window.innerWidth <= 1024) {
        setHeaderImage(HeaderM);
      } else {
        setHeaderImage(HeaderL);
        setRecommendedWineImage(wineRecommendedL);
        setWineDetailsImage(wineDetailsL);
        setWineReviewsImage(wineReviewsL);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      setShowHeader(true);
    }, 500);
    setTimeout(() => {
      setShowDetail(true);
    }, 1000);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="landing-container">
        <div className={`header ${showHeader ? 'show' : ''}`}>
          <Image src={headerImage} alt="헤더 이미지" />
        </div>

        <div className={`wine-container ${showDetail ? 'show' : ''}`}>
          <div className="section recommended-wines">
            <Image src={recommendedWineImage} alt="추천와인 이미지" />
          </div>

          <div className="section wine-details">
            <Image src={wineDetailsImage} alt="추천상세 이미지" />
          </div>

          <div className="section reviews">
            <Image src={wineReviewsImage} alt="와인리뷰 이미지" />
          </div>
        </div>

        <div className="button-container">
          <div className="button-container">
            <Link href="/wines" className="button-more">
              와인 보러가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
