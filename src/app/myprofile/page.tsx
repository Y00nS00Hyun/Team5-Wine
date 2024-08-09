'use client';

import SlideComponent from '@/components/slidecomponent/SlideComponent';
import { SildeOptionProps } from '@/types/SlideOption';
import '@/components/slidecomponent/SlideComponent.scss';
import { signUpAPI, signInAPI, refreshToken } from '@/api/Auth';
import { useEffect, useState } from 'react';
import { signUpRequestBody, signInRequestBody, signResponse } from '@/types/AuthProps';
import { ModalReview } from '@/components/modal/modalreview/ModalReview';

function MyProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //api 테스트용
  const testoption: SildeOptionProps = {
    SlideOptionTitle: 'test옵션타이틀',
    LeftOption: 'test레프트옵션',
    RightOption: 'test라이트옵션',
    value: 70,
  };

  const testoption2: SildeOptionProps = {
    SlideOptionTitle: 'test옵션타이틀',
    LeftOption: 'test레프트옵션',
    RightOption: 'test라이트옵션',
  };

  const test: signUpRequestBody = {
    image: null,
    email: 'test4@test4.com',
    nickname: 'test4',
    password: '12345678',
    passwordConfirmation: '12345678',
  };

  const test2: signInRequestBody = {
    email: 'gwangho@gwangho.com',
    password: '12345678',
  };

  const refreshtest: object = {
    refreshToken: 'fdasfdsa',
  };

  useEffect(() => {
    async function tt() {
      // await signUpAPI(test);
      //    const test:signResponse = await signInAPI(test2);
      // await refreshToken(refreshtest);
    }
    tt();
  }, []);
  //

  const [myValue, setMyValue] = useState<string>('test');

  return (
    <div>
      <input defaultValue={myValue} contentEditable />
      <input defaultValue={myValue} />
      <SlideComponent {...testoption} />
      <SlideComponent {...testoption2} />
      <button onClick={openModal}>test</button>
      <ModalReview isModalOpen={isModalOpen} closeModal={closeModal} wineName="test와인" />
    </div>
  );
}

export default MyProfile;
