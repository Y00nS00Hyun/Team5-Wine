import BaseModal from '../modalbase/BaseModal';
import '@/components/modal/modalfilter/ModalFilter.scss';
import PriceSlider from '../modalfilter/slidercomponent/PriceSlider';
import Rating from '../modalfilter/ratingcomponent/Rating';
import WineTypes from '../modalfilter/typescomponent/WineTypes';
import { useState } from 'react';
import { wineListAPI } from '@/api/Wine';
import { ModalFilterProps } from '@/types/ModalProps';

const INITIAL_MIN_PRICE = 0;
const INITIAL_MAX_PRICE = 100000;
//푸터버튼 안보일 수 있게 프롭스 추가했습니다.
export function ModalFilterver({ setWines = () => {}, showButton }: ModalFilterProps) {
  const [selectedWineType, setSelectedWineType] = useState('');
  const [minPrice, setMinPrice] = useState(INITIAL_MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(INITIAL_MAX_PRICE);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const limit = 5;

  const applyFilters = async () => {
    const rating = selectedRating === null ? null : selectedRating;

    const response = await wineListAPI(limit, cursor, minPrice, maxPrice, rating);
    if (response) {
      setWines(response.list);
      if (response.nextCursor) {
        setCursor(response.nextCursor);
      }
    }
  };

  const resetFilters = () => {
    setSelectedWineType('');
    setMinPrice(INITIAL_MIN_PRICE);
    setMaxPrice(INITIAL_MAX_PRICE);
    setSelectedRating(null);
    setCursor(null);
  };

  return (
    <BaseModal
      isOpen={false}
      onClose={() => {}}
      title="필터"
      closeButton={true}
      footerButtons={
        showButton
          ? [
              <button key="1" onClick={resetFilters}>
                초기화
              </button>,
              <button key="2" onClick={applyFilters}>
                필터 적용하기
              </button>,
            ]
          : null
      }
    >
      <WineTypes selectedWineType={selectedWineType} setSelectedWineType={setSelectedWineType} />
      <PriceSlider minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
      <Rating selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
    </BaseModal>
  );
}
//푸터버튼 안보일 수 있게 프롭스 추가했습니다.
