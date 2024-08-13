'use client';
import React from 'react';
//import Image from 'next/image';
import Card from '@/components/cardwine/Card';

export default function Cardpage() {
  const wineprice = 64990;
  const review = 'Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice long velvety finish.';
  return (
    <>
      <Card image="예시.png" wineName="Sentinel Carbernet Sauvignon 2016" wineDesc="Western Cape, South Africa" winePrice={wineprice} review={review} />
    </>
  );
}
