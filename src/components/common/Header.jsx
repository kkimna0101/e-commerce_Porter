import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // 화살표 아이콘 (혹은 기존 PlusIcon 응용 가능)
import './Header.scss';

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

// ─── 메가메뉴 데이터 ─────────────────────────────────────────────────────
const MENU_ITEMS = [
    { label: 'ALL ITEMS', category: 'All', sub: [] },
    {
        label: 'BRAND',
        category: null,
        isBrand: true,
        sub: [
            { name: 'PORTER', img: '/images/main/mainpotrtxt1.png', filter: { brand: 'PORTER' } },
            { name: 'P.O.T.R.', img: '/images/main/mainpotrtxt1.png', filter: { brand: 'POTR' } },
            {
                name: 'LUGGAGE LABEL',
                img: '/images/main/mainlltxt2.png',
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
                img: '/images/menu/work_briefcase.png',
                filter: { category: 'Work', type: 'Briefcase' },
            },
            {
                name: 'DOCUMENT CASE',
                img: '/images/menu/work_doc.png',
                filter: { category: 'Work', type: 'Document Case' },
            },
            {
                name: 'ORGANIZER',
                img: '/images/menu/work_organizer.png',
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
                img: '/images/menu/daily_shoulder.png',
                filter: { category: 'Daily', type: 'Shoulder bag' },
            },
            {
                name: 'TOTE BAG',
                img: '/images/menu/daily_tote.png',
                filter: { category: 'Daily', type: 'Tote bag' },
            },
            {
                name: 'BACKPACK',
                img: '/images/menu/daily_backpack.png',
                filter: { category: 'Daily', type: 'Backpack' },
            },
            {
                name: 'HELMET BAG',
                img: '/images/menu/daily_helmet.png',
                filter: { category: 'Daily', type: 'Helmet bag' },
            },
            {
                name: 'WAIST BAG',
                img: '/images/menu/daily_waist.png',
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
                img: '/images/menu/travel_duffle.png',
                filter: { category: 'Travel', type: 'Duffle bag' },
            },
            {
                name: 'BACKPACK',
                img: '/images/menu/travel_backpack.png',
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
                img: '/images/menu/small_wallet.png',
                filter: { category: 'Small Goods', type: 'Wallet' },
            },
            {
                name: 'POUCH',
                img: '/images/menu/small_pouch.png',
                filter: { category: 'Small Goods', type: 'Pouch' },
            },
            {
                name: 'ACCESSORY',
                img: '/images/menu/small_acc.png',
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
                img: '/images/menu/other_doll.png',
                filter: { category: 'Other', type: 'Doll' },
            },
            {
                name: 'APPAREL',
                img: '/images/menu/other_apparel.png',
                filter: { category: 'Other', type: 'Apparel' },
            },
        ],
    },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(MENU_ITEMS[3]); // DAILY 기본
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [headerSearch, setHeaderSearch] = useState('');
    const [canScroll, setCanScroll] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const headerRef = useRef(null);
    const menuTimer = useRef(null);

    const isMainPage = location.pathname === '/';
    const isLargeHeader = isMainPage && !isScrolled;
    const scrollRef = useRef(null); // 슬라이드 영역 참조

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

    // ── 메가메뉴 열기/닫기 (헤더 영역 벗어나면 닫힘) ─────────────────────
    const handleHeaderMouseLeave = () => {
        menuTimer.current = setTimeout(() => setMenuOpen(false), 120);
    };
    const handleHeaderMouseEnter = () => {
        clearTimeout(menuTimer.current);
    };

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

    // ── 카드 클릭 → 필터 적용하여 이동 ──────────────────────────────────
    const handleCardClick = (filter) => {
        setMenuOpen(false);
        const params = new URLSearchParams();
        if (filter.category) params.set('category', filter.category);
        if (filter.type) params.set('type', filter.type);
        if (filter.brand) params.set('brand', filter.brand);
        navigate(`/product?${params.toString()}`);
    };

    // ── 1뎁스 카테고리 클릭 ──────────────────────────────────────────────
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

    // ── 화살표 노출 여부 체크 로직 ──
    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            // 전체 콘텐츠 너비가 보여지는 너비보다 클 때만 화살표 표시
            setCanScroll(scrollWidth > clientWidth);
        }
    };

    // 메뉴가 열리거나 마우스가 올라간 아이템이 바뀔 때마다 체크
    useEffect(() => {
        if (menuOpen) {
            // DOM 렌더링 후 타이밍을 맞추기 위해 세션타임아웃 살짝 부여
            const timer = setTimeout(checkScroll, 100);
            window.addEventListener('resize', checkScroll);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [menuOpen, hoveredItem]);

    // 좌우 슬라이드 함수
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 500; // 한 번 클릭 시 이동할 거리
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
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
                                    PRODUCT{' '}
                                    <PlusIcon
                                        size={isScrolled || location.pathname !== '/' ? 13 : 17}
                                    />
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

            {/* ── 메가메뉴 ── */}
            {menuOpen && (
                <div className="mega-menu">
                    <div className="mega-menu__left">
                        {MENU_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className={`mega-menu__item ${hoveredItem?.label === item.label ? 'is-active' : ''}`}
                                onMouseEnter={() => setHoveredItem(item)}
                                onClick={() => {
                                    setMenuOpen(false); /* 이동로직 */
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>

                    <div className="mega-menu__right-container">
                        {/* canScroll이 true일 때만 화살표 버튼 렌더링 */}
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
            )}
        </header>
    );
};

export default Header;
