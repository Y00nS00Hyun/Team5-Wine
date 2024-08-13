'use client';

import '@/components/slidecomponent/SlideComponent.scss';
import { SildeOptionProps, SlideMode } from '@/types/SlideOption';
import { useState } from 'react';

interface SlideComponentProps extends SildeOptionProps {
  onValueChange: (value: number) => void;
}

function SlideComponent(props: SlideComponentProps) {
  const [siledValue, setSiledValue] = useState(props.value || 0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setSiledValue(newValue);
    props.onValueChange(newValue); // 슬라이더 값 변경 시 부모로 값 전달
  };

  return (
    <div className="slidebar-layer">
      <p className="option-title">{props.SlideOptionTitle}</p>
      <p className="option-left">{props.LeftOption}</p>
      <input type="range" onChange={handleSliderChange} min="0" max="10" className="slider" value={siledValue} disabled={props.mode === SlideMode.VIEW} />
      <p className="option-right">{props.RightOption}</p>
    </div>
  );
}

export default SlideComponent;
