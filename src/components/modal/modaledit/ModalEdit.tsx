'use client';

import BaseModal from '../modalbase/BaseModal';
import { ModalWineEditProps } from '@/types/ModalProps';
import Input from '@/components/inputComponent/Input';
import ImageUpload from '@/components/modal/modalwine/imagecomponent/ImageUpload';
import { useEffect, useState } from 'react';
import { ImageAPI } from '@/api/Image';
import { editWine } from '@/api/Wine';
import { imageProp } from '@/types/Image';
import { createWineBody } from '@/types/WineProps';
import { wineTypeName } from '@/types/WineProps';
import './ModalEdit.scss';
import { set } from 'react-hook-form';

export default function ModalEdit({ isModalOpen, closeModal, id, wine }: ModalWineEditProps) {
  const [wineName, setWineName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState<wineTypeName>('RED');
  const [imageFile, setImageFile] = useState<imageProp>(null);

  useEffect(() => {
    if (wine) {
      setWineName(wine.name);
      setPrice(wine.price.toString());
      setRegion(wine.region);
      setType(wine.type);
      setImageFile(wine.image);
    }
  }, [wine]);

  const handleWineNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWineName(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as wineTypeName);
  };

  const handleImageUpload = (file: imageProp) => {
    setImageFile(file);
  };

  const handleWineEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wineName || !price || !region || !imageFile) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    let imageUrl: imageProp = null;

    try {
      const { url } = await ImageAPI(formData);
      imageUrl = url;
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드에 실패했습니다.');
      return;
    }

    const wineData: createWineBody = {
      name: wineName,
      region: region,
      image: imageUrl,
      price: parseFloat(price),
      type: type,
    };

    console.log(wineData);

    try {
      await editWine(wineData, id);
      console.log('와인 정보 수정 성공');
      closeModal();
    } catch (error) {
      console.error('와인 수정 오류:', error);
      alert('와인 정보 수정에 실패했습니다.');
    }
  };

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="내가 등록한 와인"
      closeButton={false}
      footerButtons={[
        <button key="1" onClick={closeModal}>
          취소
        </button>,
        <button key="2" type="submit" onClick={handleWineEdit}>
          수정하기
        </button>,
      ]}
    >
      <form>
        <Input type="text" placeholder="와인 이름 입력" inputname="와인 이름" defaultValue={wineName} onBlur={handleWineNameChange} />
        <Input type="text" placeholder="가격 입력" inputname="가격" defaultValue={price} onBlur={handlePriceChange} />
        <Input type="text" placeholder="원산지 입력" inputname="원산지" defaultValue={region} onBlur={handleRegionChange} />

        <label htmlFor="wine-type">타입</label>
        <select className="wine-type" id="wine-type" value={type} onChange={handleTypeChange}>
          <option value="RED">RED</option>
          <option value="WHITE">WHITE</option>
          <option value="SPARKLING">SPARKLING</option>
        </select>

        <ImageUpload onImageUpload={handleImageUpload} />
      </form>
    </BaseModal>
  );
}
