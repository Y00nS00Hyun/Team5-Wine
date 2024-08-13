// import { SlideMode } from '@/types/SlideOption';
// import SlideComponent from '../slidecomponent/SlideComponent';
// import '@/components/wineTaste/WineTasteSlide.scss';
// import { useState } from 'react';

// const wineTaste = {
//   lightBold: {
//     title: '바디감',
//     leftOption: '가벼워요',
//     rightOption: '진해요',
//   },
//   smoothTannic: {
//     title: '타닌',
//     leftOption: '부드러워요',
//     rightOption: '떫어요',
//   },
//   drySweet: {
//     title: '당도',
//     leftOption: '드라이해요',
//     rightOption: '달아요',
//   },
//   softAcidic: {
//     title: '산미',
//     leftOption: '안셔요',
//     rightOption: '많이셔요',
//   },
// };

// interface WineTasteSlideProps {
//   tasteValue?: number[];
//   SlideMode: SlideMode;
//   onSlideChange? : (slideValue : number[]) => void;
// }

// export function wineTasteSlide({ tasteValue, SlideMode }: WineTasteSlideProps) {

//   return (
//     <div className="taste-slide-layer">
//       {Object.entries(wineTaste).map(([tasteKey, tasteOptions], index) => (
//         <SlideComponent key={tasteKey} mode={SlideMode} SlideOptionTitle={tasteOptions.title} LeftOption={tasteOptions.leftOption} RightOption={tasteOptions.rightOption} value={tasteValue ? tasteValue[index] : undefined} />
//       ))}
//     </div>
//   );
// }

// export default wineTasteSlide;

import { SlideMode } from '@/types/SlideOption';
import SlideComponent from '../slidecomponent/SlideComponent';
import '@/components/wineTaste/WineTasteSlide.scss';
import { useState } from 'react';

const wineTaste = {
  lightBold: {
    title: '바디감',
    leftOption: '가벼워요',
    rightOption: '진해요',
  },
  smoothTannic: {
    title: '타닌',
    leftOption: '부드러워요',
    rightOption: '떫어요',
  },
  drySweet: {
    title: '당도',
    leftOption: '드라이해요',
    rightOption: '달아요',
  },
  softAcidic: {
    title: '산미',
    leftOption: '안셔요',
    rightOption: '많이셔요',
  },
};

interface WineTasteSlideProps {
  tasteValue?: number[];
  SlideMode: SlideMode;
  onSlideChange?: (slideValue: number[]) => void;
}

export function WineTasteSlide({ tasteValue, SlideMode, onSlideChange }: WineTasteSlideProps) {
  const [localSlideValues, setLocalSlideValues] = useState<number[]>(tasteValue || [0, 0, 0, 0]);

  const handleSliderChange = (index: number, newValue: number) => {
    const updatedValues = [...localSlideValues];
    updatedValues[index] = newValue;
    setLocalSlideValues(updatedValues);
    onSlideChange?.(updatedValues); // 부모 컴포넌트로 값 전달
  };

  return (
    <div className="taste-slide-layer">
      {Object.entries(wineTaste).map(([tasteKey, tasteOptions], index) => (
        <SlideComponent key={tasteKey} mode={SlideMode} SlideOptionTitle={tasteOptions.title} LeftOption={tasteOptions.leftOption} RightOption={tasteOptions.rightOption} value={tasteValue ? tasteValue[index] : undefined} onValueChange={(newValue: number) => handleSliderChange(index, newValue)} />
      ))}
    </div>
  );
}

export default WineTasteSlide;
