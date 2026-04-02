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

const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

const ArrowLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
);

const MENU_ITEMS = [
    {
        label: 'ALL ITEMS',
        category: 'All',
        sub: [
            { name: 'Lewis Leathers x PORTER', img: '/images/product/49.png', filter: { series: 'Lewis Leathers x PORTER' } },
            { name: 'Sandy Liang x PORTER', img: '/images/product/61.png', filter: { series: 'Sandy Liang x PORTER' } },
            { name: 'POTR SCOPE', img: '/images/product/111.png', filter: { series: 'POTR SCOPE' } },
            { name: 'HYKE x PORTER', img: '/images/product/35.png', filter: { series: 'HYKE x PORTER' } },
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
            { name: 'LUGGAGE LABEL', img: '/images/luggagelabellogo_b.png', filter: { brand: 'LUGGAGE LABEL' } },
        ],
    },
    {
        label: 'WORK',
        category: 'Work',
        sub: [
            { name: 'BRIEFCASE', img: '/images/product/111.png', filter: { category: 'Work', type: 'Briefcase' } },
            { name: 'DOCUMENT CASE', img: '/images/product/140.png', filter: { category: 'Work', type: 'Document Case' } },
            { name: 'ORGANIZER', img: '/images/product/75.png', filter: { category: 'Work', type: 'Pouch' } },
        ],
    },
    {
        label: 'DAILY',
        category: 'Daily',
        sub: [
            { name: 'SHOULDER BAG', img: '/images/product/1.png', filter: { category: 'Daily', type: 'Shoulder bag' } },
            { name: 'TOTE BAG', img: '/images/product/18.png', filter: { category: 'Daily', type: 'Tote bag' } },
            { name: 'BACKPACK', img: '/images/product/50.png', filter: { category: 'Daily', type: 'Backpack' } },
            { name: 'HELMET BAG', img: '/images/product/56.png', filter: { category: 'Daily', type: 'Helmet bag' } },
            { name: 'WAIST BAG', img: '/images/product/102.png', filter: { category: 'Daily', type: 'Waist bag' } },
        ],
    },
    {
        label: 'TRAVEL',
        category: 'Travel',
        sub: [
            { name: 'DUFFLE BAG', img: '/images/product/81.png', filter: { category: 'Travel', type: 'Duffle bag' } },
            { name: 'BACKPACK', img: '/images/product/123.png', filter: { category: 'Travel', type: 'Backpack' } },
        ],
    },
    {
        label: 'SMALL GOODS',
        category: 'Small Goods',
        sub: [
            { name: 'WALLET', img: '/images/product/3.png', filter: { category: 'Small Goods', type: 'Wallet' } },
            { name: 'POUCH', img: '/images/product/51.png', filter: { category: 'Small Goods', type: 'Pouch' } },
            { name: 'ACCESSORY', img: '/images/product/41.png', filter: { category: 'Small Goods', type: 'Accessory' } },
        ],
    },
    {
        label: 'OTHER',
        category: 'Other',
        sub: [
            { name: 'DOLL', img: '/images/product/27.png', filter: { category: 'Other', type: 'Doll' } },
            { name: 'APPAREL', img: '/images/product/42.png', filter: { category: 'Other', type: 'Apparel' } },
        ],
    },
];

const MENU_HEIGHT = 320;

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(MENU_ITEMS[3]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [headerSearch, setHeaderSearch] = useState('');
    const [canScroll, setCanScroll] = useState(false);

    // ── 모바일 메뉴 상태 ─────────────────────────────────────────────────
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    // step: 'main' | 'product' | 'subcategory'
    const [mobileStep, setMobileStep] = useState('main');
    const [mobileCategory, setMobileCategory] = useState(null); // 선택된 MENU_ITEM
    const [isMobileView, setIsMobileView] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const scrollRef = useRef(null);
    const menuTimer = useRef(null);
    const tlRef = useRef(null);

    const isMainPage = location.pathname === '/';
    const isLargeHeader = isMainPage && !isScrolled && !isMobileView;

    // ── 뷰포트 감지 ──────────────────────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => setIsMobileView(window.innerWidth <= 1023);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ── 모바일 메뉴 열릴 때 body 스크롤 잠금 ───────────────────────────
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    // ── 모바일 메뉴 닫힐 때 step 초기화 ─────────────────────────────────
    useEffect(() => {
        if (!mobileMenuOpen) {
            setTimeout(() => {
                setMobileStep('main');
                setMobileCategory(null);
            }, 300);
        }
    }, [mobileMenuOpen]);

    // ── 라우트 변경 시 메뉴 닫기 ─────────────────────────────────────────
    useEffect(() => {
        setMobileMenuOpen(false);
        setMenuOpen(false);
    }, [location.pathname]);

    // ── 스크롤 감지 (hysteresis: 확장→축소 임계값에 버퍼 추가) ──────────
    useEffect(() => {
        if (!isMainPage) return;
        const BUFFER = 120; // 헤더 높이 변화(160→60 = 100px)보다 크게 설정
        const handleScroll = () => {
            const hero = document.querySelector('.hero');
            const threshold = hero ? hero.offsetHeight : 0;
            const scrollY = window.scrollY;
            setIsScrolled((prev) => {
                if (!prev && scrollY >= threshold) return true;       // 커→작: 즉시
                if (prev && scrollY < threshold - BUFFER) return false; // 작→커: 버퍼 후
                return prev;
            });
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

    // ── GSAP 메가메뉴 애니메이션 (데스크톱) ─────────────────────────────
    useGSAP(
        () => {
            if (!menuRef.current || isMobileView) return;

            const menu = menuRef.current;
            const items = menu.querySelectorAll('.mega-menu__item');
            const cards = menu.querySelectorAll('.mega-menu__card');

            if (menuOpen) {
                gsap.killTweensOf([menu, items, cards]);
                gsap.set(menu, { display: 'flex', height: 0, opacity: 1 });
                tlRef.current = gsap.timeline();
                tlRef.current.to(menu, { height: MENU_HEIGHT, duration: 0.35, ease: 'power2.out' });
                tlRef.current.fromTo(items, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, '-=0.15');
                tlRef.current.fromTo(cards, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.06, ease: 'power2.out' }, '-=0.2');
            } else {
                if (tlRef.current) tlRef.current.kill();
                gsap.to(menu, {
                    height: 0, opacity: 0, duration: 0.25, ease: 'power2.in',
                    onComplete: () => gsap.set(menu, { display: 'none' }),
                });
            }
        },
        { dependencies: [menuOpen, isMobileView], scope: headerRef }
    );

    useGSAP(
        () => {
            if (!menuRef.current || !menuOpen || isMobileView) return;
            const cards = menuRef.current.querySelectorAll('.mega-menu__card');
            gsap.fromTo(cards, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' });
        },
        { dependencies: [hoveredItem], scope: headerRef }
    );

    // ── 메가메뉴 열기/닫기 ───────────────────────────────────────────────
    const handleHeaderMouseLeave = () => {
        if (!isMobileView) menuTimer.current = setTimeout(() => setMenuOpen(false), 100);
    };
    const handleHeaderMouseEnter = () => {
        if (!isMobileView) clearTimeout(menuTimer.current);
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

    // ── 카드 클릭 ────────────────────────────────────────────────────────
    const handleCardClick = (filter) => {
        setMenuOpen(false);
        setMobileMenuOpen(false);
        const params = new URLSearchParams();
        if (filter.category) params.set('category', filter.category);
        if (filter.type) params.set('type', filter.type);
        if (filter.brand) params.set('brand', filter.brand);
        navigate(`/product?${params.toString()}`);
    };

    const handleCategoryClick = (item) => {
        setMenuOpen(false);
        if (item.category) {
            navigate(item.category === 'All' ? '/product' : `/product?category=${encodeURIComponent(item.category)}`);
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
            return () => { clearTimeout(t); window.removeEventListener('resize', checkScroll); };
        }
    }, [menuOpen, hoveredItem]);

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir === 'left' ? -500 : 500, behavior: 'smooth' });
        }
    };

    // ── 모바일 메뉴 핸들러 ───────────────────────────────────────────────
    const handleMobileProductClick = () => {
        setMobileStep('product');
    };

    const handleMobileCategoryClick = (item) => {
        setMobileCategory(item);
        setMobileStep('subcategory');
    };

    const handleMobileBack = () => {
        if (mobileStep === 'subcategory') setMobileStep('product');
        else if (mobileStep === 'product') setMobileStep('main');
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

                {/* 데스크톱 네비게이션 */}
                {!isMobileView && (
                    <div className="content-area">
                        {isLargeHeader && (
                            <p className="top-text">
                                YOSHIDA,<br />POTER<br />STAND<br />YOSHIDA&<br />COMPANY
                            </p>
                        )}
                        <nav className="bottom-nav">
                            <ul className="menu-group-1">
                                <li
                                    className={`has-icon ${menuOpen ? 'is-active' : ''}`}
                                    onMouseEnter={() => { setMenuOpen(true); setHoveredItem(MENU_ITEMS[3]); }}
                                >
                                    <Link to="/product">
                                        PRODUCT <PlusIcon size={isLargeHeader ? 17 : 13} />
                                    </Link>
                                </li>
                                <li><Link to="/collab">COLLABORATION</Link></li>
                                <li><Link to="/about">ABOUT</Link></li>
                                <li><Link to="/offline">OFFLINE</Link></li>
                            </ul>
                            <ul className="menu-group-2">
                                <li className="header-search-item" ref={searchRef}>
                                    <span className="search-toggle-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                        SEARCH
                                    </span>
                                    {isSearchOpen && (
                                        <form className="header-search-form" onSubmit={handleSearchSubmit}>
                                            <input
                                                type="text"
                                                placeholder="SEARCH"
                                                value={headerSearch}
                                                onChange={(e) => setHeaderSearch(e.target.value)}
                                                autoFocus
                                            />
                                            <button type="submit">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="11" cy="11" r="8" />
                                                    <path d="m21 21-4.35-4.35" />
                                                </svg>
                                            </button>
                                        </form>
                                    )}
                                </li>
                                <li><Link to="/login">MYPAGE</Link></li>
                                <li className="has-icon">
                                    <Link to="/cart">CART <PlusIcon size={isLargeHeader ? 17 : 13} /></Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}

                {/* 모바일/태블릿 우측 액션 */}
                {isMobileView && (
                    <div className="mobile-actions">
                        <button
                            className={`mobile-menu-btn ${mobileMenuOpen ? 'is-active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
                        </button>
                        <Link to="/login" className="mobile-action-link">MYPAGE</Link>
                        <Link to="/cart" className="mobile-action-link mobile-action-link--icon">
                            CART <PlusIcon size={13} />
                        </Link>
                    </div>
                )}
            </div>

            {/* ── 데스크톱 메가메뉴 ── */}
            {!isMobileView && (
                <div className="mega-menu" ref={menuRef} style={{ display: 'none', height: 0 }}>
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
                    <div className="mega-menu__right-container">
                        {canScroll && (
                            <>
                                <button className="nav-btn prev" onClick={() => scroll('left')}><ChevronLeft size={24} /></button>
                                <button className="nav-btn next" onClick={() => scroll('right')}><ChevronRight size={24} /></button>
                            </>
                        )}
                        <div className="mega-menu__right" ref={scrollRef}>
                            {hoveredItem?.sub?.map((card) => (
                                <div key={card.name} className="mega-menu__card" onClick={() => handleCardClick(card.filter)}>
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

            {/* ── 모바일 풀스크린 메뉴 ── */}
            {isMobileView && (
                <div className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
                    {/* Step 1: 메인 메뉴 */}
                    <div className={`mobile-menu__panel ${mobileStep === 'main' ? 'is-current' : mobileStep !== 'main' ? 'is-prev' : ''}`}>
                        <nav className="mobile-menu__nav">
                            <ul className="mobile-menu__list mobile-menu__list--primary">
                                <li className="mobile-menu__item mobile-menu__item--product" onClick={handleMobileProductClick}>
                                    <span>PRODUCT</span>
                                    <ArrowRight />
                                </li>
                                <li className="mobile-menu__item">
                                    <Link to="/collab">COLLABORATION</Link>
                                </li>
                                <li className="mobile-menu__item">
                                    <Link to="/about">ABOUT</Link>
                                </li>
                                <li className="mobile-menu__item">
                                    <Link to="/offline">OFFLINE</Link>
                                </li>
                            </ul>
                            <ul className="mobile-menu__list mobile-menu__list--secondary">
                                <li className="mobile-menu__item mobile-menu__item--sm">
                                    <Link to="/product?q=">SEARCH</Link>
                                </li>
                                <li className="mobile-menu__item mobile-menu__item--sm">
                                    <Link to="/login">MYPAGE</Link>
                                </li>
                                <li className="mobile-menu__item mobile-menu__item--sm">
                                    <Link to="/cart">CART</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Step 2: Product 카테고리 */}
                    <div className={`mobile-menu__panel ${mobileStep === 'product' ? 'is-current' : mobileStep === 'subcategory' ? 'is-prev' : ''}`}>
                        <button className="mobile-menu__back" onClick={handleMobileBack}>
                            <ArrowLeft /> MENU
                        </button>
                        <ul className="mobile-menu__list mobile-menu__list--category">
                            {MENU_ITEMS.map((item) => (
                                <li
                                    key={item.label}
                                    className="mobile-menu__item mobile-menu__item--category"
                                    onClick={() => handleMobileCategoryClick(item)}
                                >
                                    <span>{item.label}</span>
                                    <ArrowRight />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Step 3: 서브카테고리 카드 */}
                    <div className={`mobile-menu__panel ${mobileStep === 'subcategory' ? 'is-current' : ''}`}>
                        <button className="mobile-menu__back" onClick={handleMobileBack}>
                            <ArrowLeft /> PRODUCT
                        </button>
                        {mobileCategory && (
                            <>
                                <div className="mobile-menu__breadcrumb">
                                    PRODUCT / {mobileCategory.label}
                                </div>
                                <div className="mobile-menu__cards">
                                    {mobileCategory.sub?.map((card) => (
                                        <div
                                            key={card.name}
                                            className="mobile-menu__card"
                                            onClick={() => handleCardClick(card.filter)}
                                        >
                                            <div className="mobile-menu__card-img">
                                                <img src={card.img} alt={card.name} />
                                            </div>
                                            <span className="mobile-menu__card-name">{card.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;