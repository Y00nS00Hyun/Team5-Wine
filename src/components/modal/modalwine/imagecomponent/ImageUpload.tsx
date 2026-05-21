import React, { useState } from 'react';
import './ImageUpload.scss';
import photo from '@/assets/icon/photo.svg';
import Image from 'next/image';
import imageProp from '@/types/Image';
import { ImageAPI } from '@/api/Image';

function ImageUpload({ onImageUpload, wineImage }: { onImageUpload: (file: imageProp) => void; wineImage?: string | null }) {
  const [userImage, setUserImage] = useState<imageProp>();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imgForm = new FormData();
    imgForm.append('image', file);

    try {
      const fileUrl = await ImageAPI(imgForm);
      setUserImage(fileUrl.url);
      onImageUpload(fileUrl.url);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  return (
    <>
      <h3 className="image-upload-title">와인 사진</h3>
      <label htmlFor="image-upload" className="image-upload">
        {userImage ? (
          <div className="uploaded-image">
            <Image src={userImage} fill alt="이미지 미리보기" />
          </div>
        ) : (
          <div className="upload-placeholder">
            <Image src={ wineImage ? wineImage : photo} alt="카메라 아이콘" width={30} height={30} />
          </div>
        )}
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </label>
    </>
  );
}

export default ImageUpload;
