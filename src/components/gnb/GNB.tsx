'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운과 아이콘을 감싸는 div를 참조

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname(); // 현재 페이지 경로를 가져옴
  const isRoot = pathname === '/';

  const items = [
    { name: '마이페이지', path: '/myprofile' },
    { name: '로그아웃', path: '/' },
  ];

  // useEffect로 전역 클릭 이벤트 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 드롭다운 외부를 클릭하면 닫히게 설정
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="gnb">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="logo" />
      </Link>
      {userData ? (
        <div className="gnb-right" ref={dropdownRef}>
          <Image src={userData.image ? userData.image : defaultprofile} alt="User" className="user-image" width={20} height={20} onClick={toggleDropdown} />
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
              href="/signup"
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
