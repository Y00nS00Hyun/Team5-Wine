'use client';

import Link from 'next/link';
import { id } from '@/types/Id'
import '../dropdown/DropDown.scss';

interface SHDropdownProps {
  items: { name: string; func: (reviewId: id) => void }[];
  reviewId: id;
}


const SHDropdown: React.FC<SHDropdownProps> = ({ items, reviewId }) => {

  return (
    <div className="dropdown-wrapper">
      <ul className="dropdown">
        {items.map((item, index) => (
          <li key={index} className="dropdown-item">
            <div onClick={() => item.func(reviewId)}>{item.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SHDropdown;
