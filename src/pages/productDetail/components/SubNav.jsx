import React, { useState } from 'react';
import './SubNav.scss';

const NAV_ITEMS = [
    { id: 'product-detail', label: '제품 상세' },
    { id: 'detail-scale', label: '디테일 & 스케일' },
    { id: 'guide', label: '가이드' },
    { id: 'community', label: '커뮤니티' },
    { id: 'related', label: '관련상품' },
];

const SubNav = () => {
    const [activeId, setActiveId] = useState(null);

    const handleClick = (id) => {
        setActiveId(id);
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="sub-nav">
            <ul className="sub-nav__list">
                {NAV_ITEMS.map((item) => (
                    <li
                        key={item.id}
                        className={`sub-nav__item ${activeId === item.id ? 'active' : ''}`}
                        onClick={() => handleClick(item.id)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNav;