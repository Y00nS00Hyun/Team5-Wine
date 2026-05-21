'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/inputcomponent/Input';
import Button from '@/components/button/Button';
import Cardmy from '@/components/cardmy/CardMy';
import Card from '@/components/cardmylist/card';
import defaultprofile from '@/assets/icon/defaultprofile.webp';
import { useSession } from 'next-auth/react';
import { ImageAPI } from '@/api/Image';
import { editmyDataAPI, myReviewsAPI, myWineAPI } from '@/api/User';
import { ReviewListType } from '@/types/ReviewProps';
import { wineDetailType } from '@/types/WineProps';
import '@/components/slidecomponent/SlideComponent.scss';
import '@/app/myprofile/page.scss';

function MyProfile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inputNickName, setInputName] = useState<string>('');
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  const [totalWineCount, setTotalWineCount] = useState<number>(0);

  const [myReviews, setMyReviews] = useState<ReviewListType[]>([]);
  const [myWines, setMyWines] = useState<wineDetailType[]>([]);
  const [nowMenu, setNowMenu] = useState<'wine' | 'review'>('review');

  const { data: session } = useSession();
  const userdata = session?.user.user.user;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const token = session?.user.user.accessToken as string | undefined;
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await ImageAPI(formData);
      setSelectedImage(response.url);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleMenu = () => {
    setNowMenu((prev) => (prev === 'review' ? 'wine' : 'review'));
  };

  const changeNickName = async () => {
    if (!userdata) return;
    try {
      await editmyDataAPI({
        image: selectedImage || userdata.image,
        nickname: inputNickName || userdata.nickname,
      });
    } catch (error) {
      console.error('프로필 수정 실패:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewResponse, wineResponse] = await Promise.all([myReviewsAPI(), myWineAPI()]);
        setMyReviews(reviewResponse.list);
        setTotalReviewCount(reviewResponse.totalCount);
        setMyWines(wineResponse.list);
        setTotalWineCount(wineResponse.totalCount);
      } catch (error) {
        console.error('마이페이지 데이터 로딩 실패:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="myprofile-layer">
      <div className="user-profile-data">
        <div className="user-data">
          <div className="user-image-layer">
            <label className="user-image-edit" htmlFor="user-image-input">
              {userdata?.image ? (
                <Image
                  src={selectedImage ? selectedImage : userdata.image}
                  className="user-image"
                  alt="유저프로필"
                  width={164}
                  height={164}
                />
              ) : (
                <Image src={defaultprofile} className="user-image" width={164} height={164} alt="유저프로필" />
              )}
              <input
                id="user-image-input"
                type="file"
                className="user-image-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            <div className="user-data-layer">
              <p className="user-nickname">{userdata?.nickname}</p>
              <p className="user-email">{userdata?.email}</p>
            </div>
          </div>
          <div className="user-edit">
            <div className="edit-input">
              <Input
                inputname="닉네임"
                placeholder={userdata?.nickname}
                defaultValue=""
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
            <div className="edit-button-layer">
              <Button text="변경하기" onClick={changeNickName} />
            </div>
          </div>
        </div>
      </div>
      <div className="my-content">
        <div className="content-layer">
          <div className="content-menu">
            <p className={`content-menu-title ${nowMenu === 'review' ? '' : 'unactive'}`} onClick={handleMenu}>
              내가 쓴 후기
            </p>
            <p className={`content-menu-title ${nowMenu === 'wine' ? '' : 'unactive'}`} onClick={handleMenu}>
              내가 등록한 와인
            </p>
          </div>
          <p className="total-count">{`총 ${nowMenu === 'review' ? totalReviewCount : totalWineCount}개`}</p>
        </div>
        <div className="content">
          {nowMenu === 'review' ? (
            myReviews.length > 0 ? (
              <div className="content-item">
                {myReviews.map((review) => (
                  <Cardmy key={review.id} {...review} />
                ))}
              </div>
            ) : (
              <div>
                <p>등록된게 없습니다.</p>
              </div>
            )
          ) : myWines.length > 0 ? (
            <div className="content-item">
              {myWines.map((wine) => (
                <Card
                  key={wine.id}
                  image={wine.image}
                  wineName={wine.name}
                  wineDesc={wine.region}
                  winePrice={wine.price}
                  wineId={wine.id}
                />
              ))}
            </div>
          ) : (
            <div>
              <p>등록된게 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
