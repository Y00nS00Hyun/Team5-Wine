'use client';

import BaseModal from '../modalbase/BaseModal';
import { ModalProps } from '@/types/ModalProps';
import Input from '@/components/inputcomponent/Input';
import ImageUpload from './imagecomponent/ImageUpload';
import { useState } from 'react';
import { ImageAPI } from '@/api/Image';
import { addWineAPI } from '@/api/Wine';
import { imageProp } from '@/types/Image';
import { createWineBody } from '@/types/WineProps';
import { wineTypeName } from '@/types/WineProps';
import './ModalWine.scss';

export default function ModalWine({ isModalOpen, closeModal }: ModalProps) {
  const [wineName, setWineName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState<wineTypeName>('RED');
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleImageUpload = (file: File) => {
    setImageFile(file);
  };

  const handleWineRegistration = async (e: React.FormEvent) => {
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
      await addWineAPI(wineData);
      console.log('와인 등록 성공');
      closeModal();
    } catch (error) {
      console.error('와인 등록 오류:', error);
      alert('와인 등록에 실패했습니다.');
    }
  };

  return (
    <BaseModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="와인 등록"
      closeButton={false}
      footerButtons={[
        <button key="1" onClick={closeModal}>
          취소
        </button>,
        <button key="2" type="submit" onClick={handleWineRegistration}>
          와인 등록하기
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
