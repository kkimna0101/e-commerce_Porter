import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import ProductItem from '../../components/ProductItem';
import FilterPanel from '../../components/Filterpanel';
import { BiSortAlt2 } from 'react-icons/bi';
import { PiSlidersHorizontal } from 'react-icons/pi';
import {
    MdChevronLeft,
    MdChevronRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import './ProductList.scss';

const CATEGORIES = ['All', 'Work', 'Daily', 'Travel', 'Small Goods', 'Other'];

const SORT_OPTIONS = [
    { value: 'recommend', label: '추천순' },
    { value: 'newest', label: '신상품순' },
    { value: 'price_asc', label: '낮은 가격순' },
    { value: 'price_desc', label: '높은 가격순' },
    { value: 'name_asc', label: '이름순' },
];

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const typeParam = searchParams.get('type') || '';
    const brandParam = searchParams.get('brand') || '';
    const categoryParam = searchParams.get('category') || '';
    const [localSearch, setLocalSearch] = useState(searchQuery);

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    const { products, filteredProducts, fetchProducts, setFilters } = useStore();
    const [activeCategory, setActiveCategory] = useState('All');

    const [sortOpen, setSortOpen] = useState(false);
    const [activeSort, setActiveSort] = useState(SORT_OPTIONS[0]);
    const sortRef = useRef(null);

    const [filterOpen, setFilterOpen] = useState(false);

    // ── 품절 제외 필터 ────────────────────────────────────────────────────
    const [excludeSoldOut, setExcludeSoldOut] = useState(false);

    // ── 정렬 적용 ─────────────────────────────────────────────────────────
    const sortedProducts = useMemo(() => {
        let arr = [...filteredProducts];

        // 품절 제외
        if (excludeSoldOut) {
            arr = arr.filter((p) => p.stock > 0);
        }

        switch (activeSort.value) {
            case 'newest':
                return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'price_asc':
                return arr.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return arr.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return arr.sort((a, b) => a.name.localeCompare(b.name));
            case 'recommend':
            default:
                return arr;
        }
    }, [filteredProducts, activeSort, excludeSoldOut]);

    // ── 페이지네이션 ──────────────────────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const pagedProducts = sortedProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // 필터/정렬 바뀌면 1페이지로 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [sortedProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        // URL에 category 파라미터가 있으면 탭도 동기화
        if (categoryParam && categoryParam !== activeCategory) {
            setActiveCategory(categoryParam);
        }

        setFilters({
            category: categoryParam || activeCategory,
            name: searchQuery,
            types: typeParam ? [typeParam] : [],
            brands: brandParam ? [brandParam] : [],
        });
    }, [activeCategory, setFilters, products, searchQuery, typeParam, brandParam, categoryParam]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sortRef.current && !sortRef.current.contains(e.target)) {
                setSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
    };

    const handleSortSelect = (option) => {
        setActiveSort(option);
        setSortOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // ── 페이지 번호 배열 생성 (최대 5개 노출) ─────────────────────────────
    const getPageNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const half = 2;
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const getPageTitle = () => {
        if (searchQuery) return 'SEARCH';
        return 'PRODUCT';
    };

    return (
        <div className="product-list-page">
            <div className="product-list-page__header">
                <h2 className="page-title">{getPageTitle()}</h2>

                {!searchQuery && (
                    <div className="category-tabs">
                        {CATEGORIES.map((cat, idx) => (
                            <React.Fragment key={cat}>
                                <button
                                    className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick(cat)}
                                >
                                    {cat}
                                </button>
                                {idx < CATEGORIES.length - 1 && (
                                    <span className="category-divider">|</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {searchQuery && <p className="search-keyword">"{searchQuery}"</p>}
            </div>

            <div className="product-list-page__toolbar">
                <div className="sort-wrap" ref={sortRef}>
                    <button
                        className={`toolbar-btn sort-btn ${sortOpen ? 'open' : ''}`}
                        onClick={() => setSortOpen((prev) => !prev)}
                    >
                        <BiSortAlt2 className="btn-icon" /> {activeSort.label}
                    </button>
                    {sortOpen && (
                        <ul className="sort-dropdown">
                            {SORT_OPTIONS.map((option) => (
                                <li
                                    key={option.value}
                                    className={`sort-option ${activeSort.value === option.value ? 'active' : ''}`}
                                    onClick={() => handleSortSelect(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 우측 버튼 그룹 */}
                <div className="toolbar-right">
                    {/* 품절 제외 */}
                    <button
                        className={`toolbar-btn soldout-filter-btn ${excludeSoldOut ? 'active' : ''}`}
                        onClick={() => setExcludeSoldOut((prev) => !prev)}
                    >
                        <span className="soldout-checkbox">
                            {excludeSoldOut && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path
                                        d="M1 4L3.5 6.5L9 1"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </span>
                        품절 제외
                    </button>

                    <button className="toolbar-btn filter-btn" onClick={() => setFilterOpen(true)}>
                        <PiSlidersHorizontal className="btn-icon" /> FILTER
                    </button>
                </div>
            </div>

            <div className="product-list-page__content">
                {pagedProducts.length > 0 ? (
                    <div className="product-grid">
                        {pagedProducts.map((item) => (
                            <ProductItem key={item.id} product={item} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>조건에 맞는 상품이 존재하지 않습니다.</p>
                    </div>
                )}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination__btn pagination__first"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        aria-label="첫 페이지"
                    >
                        <MdKeyboardDoubleArrowLeft size={18} />
                    </button>
                    <button
                        className="pagination__btn pagination__prev"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-label="이전 페이지"
                    >
                        <MdChevronLeft size={18} />
                    </button>

                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            className={`pagination__btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="pagination__btn pagination__next"
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="다음 페이지"
                    >
                        <MdChevronRight size={18} />
                    </button>
                    <button
                        className="pagination__btn pagination__last"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="마지막 페이지"
                    >
                        <MdKeyboardDoubleArrowRight size={18} />
                    </button>
                </div>
            )}

            <FilterPanel
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
                onApply={(advFilters) => setFilters((prev) => ({ ...prev, ...advFilters }))}
            />
        </div>
    );
};

export default ProductList;
