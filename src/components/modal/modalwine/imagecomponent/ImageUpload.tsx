import React, { useState } from 'react';
import { ImageAPI } from '@/api/Image';
import './ImageUpload.scss';
import photo from '@/assets/icon/photo.svg';
import Image from 'next/image';

function ImageUpload({ onImageUpload }: { onImageUpload: (url: string | null) => void }) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imgUrl = reader.result as string;
        setImage(imgUrl);
        await ImageAPI(imgUrl);
        onImageUpload(imgUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h3 className="image-upload-title">와인 사진</h3>
      <label htmlFor="image-upload" className="image-upload">
        {image ? (
          <div className="uploaded-image">
            <Image src={image} alt="이미지 미리보기" layout="fill" />
          </div>
        ) : (
          <div className="upload-placeholder">
            <Image src={photo} alt="카메라 아이콘" width={30} height={30} />
          </div>
        )}
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </label>
    </>
  );
}

export default ImageUpload;
