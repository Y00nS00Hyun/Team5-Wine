'use client';

import Input from '@/components/inputcomponent/Input';
import '@/components/slidecomponent/SlideComponent.scss';
import { useEffect, useState, useMemo } from 'react';
import '@/app/myprofile/page.scss';
import Button from '@/components/button/Button';
import Image from 'next/image';
import Cardmy from '@/components/cardmy/CardMy';
import defaultprofile from '@/assets/icon/defaultprofile.webp';
import { ImageAPI } from '@/api/Image';
import { ReviewListType } from '@/types/ReviewProps';
import { useSession } from 'next-auth/react';
import { editmyDataAPI, myReviewsAPI, myWineAPI } from '@/api/User';
import { wineDetailType } from '@/types/WineProps';
import Card from '@/components/cardmylist/card';

function MyProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inputNickName, setInputName] = useState<string>("");
  const [totalReviewCount, setTotalReviewCount] = useState<number>(0);
  const [totalWineCount, setTotalWineCount] = useState<number>(0);

  const [myReviews, setMyReviews] = useState<ReviewListType[]>([]);
  const [myWines, setMyWines] = useState<wineDetailType[]>([]);
  const [nowMenu, setNowMenu] = useState<'wine' | 'review'>('review');

  const { data: session } = useSession();
  const userdata = session?.user.user.user; // 세션에서 사용자 데이터 가져오기

  // console.log(userdata);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // console.log('파일선택옴');
    const token = session?.user.user.accessToken as string;
    if (file && token) {
      const formData = new FormData();
      formData.append('image', file);
      // console.log('파일url받음');
      try {
        const response = await ImageAPI(formData);
        setSelectedImage(response.url);
        // console.log('셋완료');
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  const handleMenu = () => {
    if (nowMenu === 'review') {
      setNowMenu('wine');
    } else {
      setNowMenu('review');
    }
  };

function changeNickName() {
  if(session?.user.user.user.image) {
    const reqbody = {
      image : selectedImage || userdata.image,
      nickname : inputNickName || userdata.nickname,
    }
    return async() => {
      console.log("프로필수정");
      try {
        await editmyDataAPI(reqbody);
      }
      catch (error) {
        console.log(error);
      }
  }
}
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResoponse = await myReviewsAPI();
        const wineResopose = await myWineAPI();
        // console.log(wineResopose);
        setMyReviews(reviewResoponse.list);
        setTotalReviewCount(reviewResoponse.totalCount);
        setMyWines(wineResopose.list);
        setTotalWineCount(wineResopose.totalCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="myprofile-layer">
      {/* 전체 데이터 */}
      <div className="user-profile-data">
        {/* 사용자 프로필 및 닉네임 수정 창 */}
        <div className="user-data">
          <div className="user-image-layer">
            <label className="user-image-edit" htmlFor="user-image-input">
              {
                userdata?.image ? (
                  <Image src={selectedImage ? selectedImage : userdata.image} 
                  className="user-image" alt="유저프로필" width={164} height={164}  />
                ) :
                (
                  <Image src={defaultprofile} className="user-image"  width={164} height={164} 
                  alt="유저프로필" />
                )
              }
              <input id="user-image-input" type="file" className="user-image-input" 
              accept='image/*' onChange={handleFileChange} style={{display: "none"}} />
            </label>
            <div className="user-data-layer">
              <p className="user-nickname">{userdata?.nickname}</p>
              <p className="user-email">{userdata?.email}</p>
            </div>
          </div>
          <div className="user-edit">
            <div className="edit-input">
              <Input inputname="닉네임" placeholder={userdata?.nickname} defaultValue="" 
              onChange={(e) => setInputName(e.target.value)} />
            </div>
            <div className="edit-button-layer">
              <Button text="변경하기" onClick={changeNickName()} />
            </div>
          </div>
        </div>
      </div>
      <div className="my-content">
        {/* 사용자 작성 후기와 와인 보여줄창 */}
        <div className="content-layer">
          {/* 내가 쓴 후기, 내가 등록한 와인 */}
          <div className="content-menu">
            <p className={`content-menu-title ${nowMenu === 'review' ? '' : 'unactive'}`} 
            onClick={handleMenu}>
              내가 쓴 후기
            </p>
            <p className={`content-menu-title ${nowMenu === 'wine' ? '' : 'unactive'}`} 
            onClick={handleMenu}>
              내가 등록한 와인
            </p>
          </div>
          <p className="total-count">{`총 ${(nowMenu === "review" ? totalReviewCount : 
            totalWineCount)}개`}</p>
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
          ) : myReviews.length > 0 ? (
            <div className="content-item">
              {myWines.map((wine) => (
                <Card key={wine.id} image={wine.image} wineName={wine.name} wineDesc={wine.region} winePrice={wine.price} wineId={wine.id} />
              ))}
            </div>
          ) : (
            <div>
              <p>등록된게 없습니다.</p>
            </div>
          )}

          {/* 리뷰목록, 와인목록 */}
          {/* 반복문을 통해 유저 아이디를 통해 가지고온 데이터 */}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
