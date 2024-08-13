import { AromaProps } from '@/types/Aroma';
import '@/components/aromatag/AromaTag.scss';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { AromaName } from '@/types/Aroma';

interface AromaTagProps {
  list?: AromaProps[];
  option: 'view' | 'edit';
  onChange?: (selectedTags: AromaName[]) => void;
}

export function AromaTag({ list = [], option, onChange }: AromaTagProps) {
  const initialSelectedTags = useMemo(() => {
    return list.reduce((acc, aroma) => {
      acc[aroma.name.eng] = aroma.selected;
      return acc;
    }, {} as Record<string, boolean>);
  }, [list]);

  // 로컬 상태에서 태그 선택 상태 관리
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);

  // selectedTags가 변경될 때만 onChange 호출
  const handleTagChange = useCallback(() => {
    if (onChange) {
      onChange(Object.keys(selectedTags).filter((key) => selectedTags[key]) as AromaName[]);
    }
  }, [selectedTags, onChange]);

  useEffect(() => {
    handleTagChange();
  }, [selectedTags, handleTagChange]);

  const handleTagClick = useCallback((engName: string) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [engName]: !prevSelectedTags[engName],
    }));
  }, []);

  // option에 따른 태그 렌더링을 useMemo로 최적화
  const renderContent = useMemo(() => {
    if (option === 'edit') {
      return list.map((aroma) => (
        <p key={aroma.name.eng} className={`aroma-tag ${selectedTags[aroma.name.eng] ? 'on' : 'off'}`} onClick={() => handleTagClick(aroma.name.eng)}>
          {aroma.name.kor}
        </p>
      ));
    } else if (option === 'view') {
      return list
        .filter((aroma) => aroma.selected)
        .map((aroma) => (
          <p key={aroma.name.eng} className="aroma-tag off">
            {aroma.name.kor}
          </p>
        ));
    }
    return null;
  }, [list, option, selectedTags, handleTagClick]);

  return <div className="aroma-tag-layer">{renderContent}</div>;
}

export default AromaTag;
