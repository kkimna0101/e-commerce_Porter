import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Header.scss';

gsap.registerPlugin();

const PlusIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8.5 0V17M0 8.5H17" stroke="#000000" strokeWidth="2" />
    </svg>
);

const MENU_ITEMS = [
    {
        label: 'ALL ITEMS',
        category: 'All',
        sub: [
            {
                name: 'Lewis Leathers x PORTER',
                img: '/images/product/49.png',
                filter: { series: 'Lewis Leathers x PORTER' },
            },
            {
                name: 'Sandy Liang x PORTER',
                img: '/images/product/61.png',
                filter: { series: 'Sandy Liang x PORTER' },
            },
            {
                name: 'POTR SCOPE',
                img: '/images/product/111.png',
                filter: { series: 'POTR SCOPE' },
            },
            {
                name: 'HYKE x PORTER',
                img: '/images/product/35.png',
                filter: { series: 'HYKE x PORTER' },
            },
            { name: 'POTR RIDE', img: '/images/product/101.png', filter: { series: 'POTR RIDE' } },
        ],
    },
    {
        label: 'BRAND',
        category: null,
        isBrand: true,
        sub: [
            { name: 'PORTER', img: '/images/porterlogo.png', filter: { brand: 'PORTER' } },
            { name: 'P.O.T.R.', img: '/images/potr_logo_bl.svg', filter: { brand: 'POTR' } },
            {
                name: 'LUGGAGE LABEL',
                img: '/images/luggagelabellogo_b.png',
                filter: { brand: 'LUGGAGE LABEL' },
            },
        ],
    },
    {
        label: 'WORK',
        category: 'Work',
        sub: [
            {
                name: 'BRIEFCASE',
                img: '/images/product/111.png',
                filter: { category: 'Work', type: 'Briefcase' },
            },
            {
                name: 'DOCUMENT CASE',
                img: '/images/product/140.png',
                filter: { category: 'Work', type: 'Document Case' },
            },
            {
                name: 'ORGANIZER',
                img: '/images/product/75.png',
                filter: { category: 'Work', type: 'Pouch' },
            },
        ],
    },
    {
        label: 'DAILY',
        category: 'Daily',
        sub: [
            {
                name: 'SHOULDER BAG',
                img: '/images/product/1.png',
                filter: { category: 'Daily', type: 'Shoulder bag' },
            },
            {
                name: 'TOTE BAG',
                img: '/images/product/18.png',
                filter: { category: 'Daily', type: 'Tote bag' },
            },
            {
                name: 'BACKPACK',
                img: '/images/product/50.png',
                filter: { category: 'Daily', type: 'Backpack' },
            },
            {
                name: 'HELMET BAG',
                img: '/images/product/56.png',
                filter: { category: 'Daily', type: 'Helmet bag' },
            },
            {
                name: 'WAIST BAG',
                img: '/images/product/102.png',
                filter: { category: 'Daily', type: 'Waist bag' },
            },
        ],
    },
    {
        label: 'TRAVEL',
        category: 'Travel',
        sub: [
            {
                name: 'DUFFLE BAG',
                img: '/images/product/81.png',
                filter: { category: 'Travel', type: 'Duffle bag' },
            },
            {
                name: 'BACKPACK',
                img: '/images/product/123.png',
                filter: { category: 'Travel', type: 'Backpack' },
            },
        ],
    },
    {
        label: 'SMALL GOODS',
        category: 'Small Goods',
        sub: [
            {
                name: 'WALLET',
                img: '/images/product/3.png',
                filter: { category: 'Small Goods', type: 'Wallet' },
            },
            {
                name: 'POUCH',
                img: '/images/product/51.png',
                filter: { category: 'Small Goods', type: 'Pouch' },
            },
            {
                name: 'ACCESSORY',
                img: '/images/product/41.png',
                filter: { category: 'Small Goods', type: 'Accessory' },
            },
        ],
    },
    {
        label: 'OTHER',
        category: 'Other',
        sub: [
            {
                name: 'DOLL',
                img: '/images/product/27.png',
                filter: { category: 'Other', type: 'Doll' },
            },
            {
                name: 'APPAREL',
                img: '/images/product/42.png',
                filter: { category: 'Other', type: 'Apparel' },
            },
        ],
    },
];

const MENU_HEIGHT = 320; // 메가메뉴 고정 높이

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(MENU_ITEMS[3]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [headerSearch, setHeaderSearch] = useState('');
    const [canScroll, setCanScroll] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const scrollRef = useRef(null);
    const menuTimer = useRef(null);
    const tlRef = useRef(null);

    const isMainPage = location.pathname === '/';
    const isLargeHeader = isMainPage && !isScrolled;

    // ── 스크롤 감지 ───────────────────────────────────────────────────────
    useEffect(() => {
        if (!isMainPage) return;
        const handleScroll = () => {
            const hero = document.querySelector('.hero');
            const threshold = hero ? hero.offsetHeight : 0;
            setIsScrolled(window.scrollY >= threshold);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMainPage]);

    useEffect(() => {
        if (!isMainPage) setIsScrolled(false);
    }, [isMainPage]);

    // ── 바깥 클릭 시 검색 닫기 ───────────────────────────────────────────
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ── GSAP 메가메뉴 애니메이션 ─────────────────────────────────────────
    useGSAP(
        () => {
            if (!menuRef.current) return;

            const menu = menuRef.current;
            const items = menu.querySelectorAll('.mega-menu__item');
            const cards = menu.querySelectorAll('.mega-menu__card');

            if (menuOpen) {
                // 열림 애니메이션
                gsap.killTweensOf([menu, items, cards]);

                gsap.set(menu, { display: 'flex', height: 0, opacity: 1 });

                tlRef.current = gsap.timeline();

                // 1. 패널 높이 펼치기
                tlRef.current.to(menu, {
                    height: MENU_HEIGHT,
                    duration: 0.35,
                    ease: 'power2.out',
                });

                // 2. 1뎁스 아이템 stagger
                tlRef.current.fromTo(
                    items,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' },
                    '-=0.15'
                );

                // 3. 카드 stagger
                tlRef.current.fromTo(
                    cards,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, duration: 0.25, stagger: 0.06, ease: 'power2.out' },
                    '-=0.2'
                );
            } else {
                // 닫힘 애니메이션
                if (tlRef.current) tlRef.current.kill();

                gsap.to(menu, {
                    height: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => gsap.set(menu, { display: 'none' }),
                });
            }
        },
        { dependencies: [menuOpen], scope: headerRef }
    );

    // 호버 아이템 바뀔 때 카드만 재애니메이션
    useGSAP(
        () => {
            if (!menuRef.current || !menuOpen) return;
            const cards = menuRef.current.querySelectorAll('.mega-menu__card');
            gsap.fromTo(
                cards,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' }
            );
        },
        { dependencies: [hoveredItem], scope: headerRef }
    );

    // ── 메가메뉴 열기/닫기 ───────────────────────────────────────────────
    const handleHeaderMouseLeave = () => {
        menuTimer.current = setTimeout(() => setMenuOpen(false), 100);
    };
    const handleHeaderMouseEnter = () => clearTimeout(menuTimer.current);

    // ── 검색 ─────────────────────────────────────────────────────────────
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setIsSearchOpen(false);
        navigate(
            headerSearch.trim()
                ? `/product?q=${encodeURIComponent(headerSearch.trim())}`
                : '/product'
        );
        setHeaderSearch('');
    };

    // ── 카드 클릭 ────────────────────────────────────────────────────────
    const handleCardClick = (filter) => {
        setMenuOpen(false);
        const params = new URLSearchParams();
        if (filter.category) params.set('category', filter.category);
        if (filter.type) params.set('type', filter.type);
        if (filter.brand) params.set('brand', filter.brand);
        navigate(`/product?${params.toString()}`);
    };

    const handleCategoryClick = (item) => {
        setMenuOpen(false);
        if (item.category) {
            navigate(
                item.category === 'All'
                    ? '/product'
                    : `/product?category=${encodeURIComponent(item.category)}`
            );
        }
    };

    // ── 카드 스크롤 화살표 ───────────────────────────────────────────────
    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            setCanScroll(scrollWidth > clientWidth);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            const t = setTimeout(checkScroll, 150);
            window.addEventListener('resize', checkScroll);
            return () => {
                clearTimeout(t);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [menuOpen, hoveredItem]);

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
        }
    };

    return (
        <header
            ref={headerRef}
            className={`header ${isLargeHeader ? 'large-header' : 'small-header'} ${menuOpen ? 'menu-open' : ''}`}
            onMouseLeave={handleHeaderMouseLeave}
            onMouseEnter={handleHeaderMouseEnter}
        >
            {/* ── 헤더 바 ── */}
            <div className="header__bar">
                <Link to="/" className="logo-area">
                    <img src="/images/porterlogo.png" alt="PORTER 로고" className="logo-img" />
                </Link>

                <div className="content-area">
                    {isLargeHeader && (
                        <p className="top-text">
                            YOSHIDA,
                            <br />
                            POTER
                            <br />
                            STAND
                            <br />
                            YOSHIDA&
                            <br />
                            COMPANY
                        </p>
                    )}

                    <nav className="bottom-nav">
                        <ul className="menu-group-1">
                            <li
                                className={`has-icon ${menuOpen ? 'is-active' : ''}`}
                                onMouseEnter={() => {
                                    setMenuOpen(true);
                                    setHoveredItem(MENU_ITEMS[3]);
                                }}
                            >
                                <Link to="/product">
                                    PRODUCT <PlusIcon size={isLargeHeader ? 17 : 13} />
                                </Link>
                            </li>
                            <li>
                                <Link to="/collab">COLLABORATION</Link>
                            </li>
                            <li>
                                <Link to="/about">ABOUT</Link>
                            </li>
                            <li>
                                <Link to="/offline">OFFLINE</Link>
                            </li>
                        </ul>
                        <ul className="menu-group-2">
                            <li className="header-search-item" ref={searchRef}>
                                <span
                                    className="search-toggle-btn"
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                >
                                    SEARCH
                                </span>
                                {isSearchOpen && (
                                    <form
                                        className="header-search-form"
                                        onSubmit={handleSearchSubmit}
                                    >
                                        <input
                                            type="text"
                                            placeholder="SEARCH"
                                            value={headerSearch}
                                            onChange={(e) => setHeaderSearch(e.target.value)}
                                            autoFocus
                                        />
                                        <button type="submit">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <path d="m21 21-4.35-4.35" />
                                            </svg>
                                        </button>
                                    </form>
                                )}
                            </li>
                            <li>
                                <Link to="/login">MYPAGE</Link>
                            </li>
                            <li className="has-icon">
                                <Link to="/cart">
                                    CART <PlusIcon size={isLargeHeader ? 17 : 13} />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* ── 메가메뉴: 항상 DOM에 존재, GSAP으로 display/height 제어 ── */}
            <div className="mega-menu" ref={menuRef} style={{ display: 'none', height: 0 }}>
                {/* 좌측 1뎁스 */}
                <div className="mega-menu__left">
                    {MENU_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className={`mega-menu__item ${hoveredItem?.label === item.label ? 'is-active' : ''}`}
                            onMouseEnter={() => setHoveredItem(item)}
                            onClick={() => handleCategoryClick(item)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* 우측 카드 */}
                <div className="mega-menu__right-container">
                    {canScroll && (
                        <>
                            <button className="nav-btn prev" onClick={() => scroll('left')}>
                                <ChevronLeft size={24} />
                            </button>
                            <button className="nav-btn next" onClick={() => scroll('right')}>
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                    <div className="mega-menu__right" ref={scrollRef}>
                        {hoveredItem?.sub?.map((card) => (
                            <div
                                key={card.name}
                                className="mega-menu__card"
                                onClick={() => handleCardClick(card.filter)}
                            >
                                <div className="mega-menu__card-img">
                                    <img src={card.img} alt={card.name} />
                                </div>
                                <span className="mega-menu__card-name">{card.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
