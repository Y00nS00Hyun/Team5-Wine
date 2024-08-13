'use client';

import React, { useEffect, useState } from 'react';
import './GNB.scss';
import Logo from '@/assets/icon/logo_wine.svg';
import Image from 'next/image';
import Link from 'next/link';
import { user } from '@/types/UserProps';
import Dropdown from '../dropdown/DropDown';
import defaultprofile from '@/assets/icon/defaultprofile.webp';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const GNB: React.FC = () => {
  const session = useSession();
  const userData = session.data?.user.user;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const pathname = usePathname(); // 현재 페이지 경로를 가져옴
  const isRoot = pathname === '/';

  const items = [
    { name: '마이페이지', path: '/myprofile' },
    { name: '로그아웃', path: '/' },
  ];

  return (
    <nav className="gnb">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="logo" />
      </Link>
      {userData ? (
        <div className="gnb-right">
          <Image src={userData.image ? userData.image : defaultprofile} alt="User" className="user-image" onClick={toggleDropdown} />
          {isOpen && ( // isOpen이 true일 때만 드롭다운을 렌더링
            <div className="dropdown-container" onClick={toggleDropdown}>
              <Dropdown items={items} />
            </div>
          )}
        </div>
      ) : (
        <div className="gnb-right">
          <Link
            href="/login"
            className="gnb-login"
            style={{
              color: 'white',
            }}
          >
            로그인
          </Link>
          {isRoot && (
            <Link
              href="/SignUp"
              className="gnb-login"
              style={{
                color: 'white',
              }}
            >
              회원가입
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default GNB;
