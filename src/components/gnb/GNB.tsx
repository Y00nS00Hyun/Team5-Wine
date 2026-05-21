'use client';

import React, { useEffect, useState, useRef } from 'react';
import './GNB.scss';
import Logo from '@/assets/icon/logo_wine.svg';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '../dropdown/DropDown';
import defaultprofile from '@/assets/icon/defaultprofile.webp';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const DROPDOWN_ITEMS = [
  { name: '마이페이지', path: '/myprofile' },
  { name: '로그아웃', path: '/' },
];

const GNB: React.FC = () => {
  const { data: session } = useSession();
  const userData = session?.user.user.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();
  const isRoot = pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="gnb">
      <Link href="/">
        <Image src={Logo} alt="Logo" className="logo" />
      </Link>
      {userData ? (
        <div className="gnb-right" ref={dropdownRef}>
          <Image
            src={userData.image ? userData.image : defaultprofile}
            alt="User"
            className="user-image"
            width={20}
            height={20}
            onClick={toggleDropdown}
          />
          {isOpen && (
            <div className="dropdown-container" onClick={toggleDropdown}>
              <Dropdown items={DROPDOWN_ITEMS} />
            </div>
          )}
        </div>
      ) : (
        <div className="gnb-right">
          <Link href="/login" className="gnb-login">
            로그인
          </Link>
          {isRoot && (
            <Link href="/signup" className="gnb-login">
              회원가입
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default GNB;
