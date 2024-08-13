import React from 'react';
import './PriceSlider.scss';

interface PriceSliderProps {
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}

export default function PriceSlider({ minPrice, setMinPrice, maxPrice, setMaxPrice }: PriceSliderProps) {
  const priceRange = { min: 0, max: 100000 };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxPrice);
    setMinPrice(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minPrice);
    setMaxPrice(value);
  };

  return (
    <div className="slider-container">
      <h3 className="slider-title">PRICE</h3>
      <div className="slider-value">
        <div>₩ {minPrice.toLocaleString()}</div>
        <div>₩ {maxPrice.toLocaleString()}</div>
      </div>
      <div className="slider">
        {/* TODO: https://www.npmjs.com/package/rc-slider 도 고려해볼것 */}
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={minPrice}
          className="input-slider"
          style={{
            '--value': `${((minPrice - priceRange.min) / (maxPrice - priceRange.min)) * 100}%`,
          }}
          onChange={handleMinChange}
        />
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          className="input-slider"
          style={{
            '--value': `${((maxPrice - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
          }}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}
