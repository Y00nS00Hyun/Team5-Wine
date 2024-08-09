'use client';

import '@/components/slidecomponent/SlideComponent.scss';
import { SildeOptionProps } from '@/types/SlideOption';
import { useMemo, useState } from 'react';

function SlideComponent(props: SildeOptionProps) {
  const [siledValue, setSiledValue] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSiledValue(Number(event.target.value));
  };

  return (
    <div className="slidebar-layer">
      <p className="option-title">{props.SlideOptionTitle}</p>
      <p className="option">{props.LeftOption}</p>
      <input type="range" onChange={handleSliderChange} min="0" max="100" className="slider" defaultValue={props.value !== undefined ? props.value : siledValue} disabled={props.value !== undefined} />
      <p className="option">{props.RightOption}</p>
    </div>
  );
}

export default SlideComponent;
