import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Search } from 'lucide-react';
import './FilterPanel.scss';

// ─── 정적 데이터 (productData.js의 실제 필드값에 맞게 매핑) ───────────────────

const BRANDS = [
    { id: 'porter', label: 'PORTER', value: 'PORTER' },
    { id: 'potr', label: 'POTR', value: 'POTR' },
    { id: 'luggage_label', label: 'LUGGAGE LABEL', value: 'LUGGAGE LABEL' },
];

// children 값 = data.type 의 실제 string
const TYPE_TREE = [
    {
        id: 'briefcase',
        label: '브리프케이스',
        children: ['Briefcase', 'Overnight Briefcase', '3Way Briefcase', 'Document Case'],
    },
    { id: 'laptop', label: '노트북 가방', children: ['Laptop Bag', 'Document Case'] },
    { id: 'shoulder', label: '숄더백', children: ['Shoulder Bag', 'Cross Bag'] },
    { id: 'backpack', label: '백팩', children: ['Backpack', 'Rucksack'] },
    { id: 'tote', label: '토트백', children: ['Tote Bag'] },
    { id: 'waist', label: '웨이스트백', children: ['Waist Bag', 'Belt Bag'] },
    { id: 'clutch', label: '클러치', children: ['Clutch'] },
    { id: 'handbag', label: '핸드백', children: ['Handbag'] },
    { id: 'duffle', label: '더플백', children: ['Duffle Bag', 'Boston Bag'] },
    { id: 'helmet', label: '헬멧백', children: ['Helmet Bag'] },
    { id: 'pouch', label: '파우치', children: null }, // leaf: type === 'Pouch'
    { id: 'wallet', label: '지갑', children: null }, // leaf: type === 'Wallet'
    { id: 'accessory', label: '액세서리', children: null },
    { id: 'clothing', label: '의류', children: null },
    { id: 'shoes', label: '신발', children: null },
    { id: 'misc', label: '잡화', children: null },
];

// leaf type 의 data.type 매핑
const TYPE_LEAF_VALUE = {
    pouch: 'Pouch',
    wallet: 'Wallet',
    accessory: 'Accessory',
    clothing: 'Clothing',
    shoes: 'Shoes',
    misc: 'Misc',
};

const SERIES_GROUPS = [
    {
        id: 'porter_s',
        label: 'PORTER',
        children: ['TANKER', 'HEAT', 'BEAT', 'SMOKY', 'FLEX', 'CURRENT', 'FORCE'],
    },
    {
        id: 'tanker_s',
        label: 'TANKER',
        children: ['TANKER 2WAY', 'TANKER RUCKSACK', 'TANKER SHOULDER', 'TANKER ENVELOPE'],
    },
    {
        id: 'potr_s',
        label: 'POTR',
        children: ['POTR SCOPE', 'POTR BASIC', 'HOBONICHI TECHO x POTR'],
    },
    { id: 'luggage_s', label: 'LUGGAGE', children: ['LUGGAGE LABEL', 'LUGGAGE ACCESSORIES'] },
];

// color.value = data.color[] 의 실제 string
const COLORS = [
    { id: 'white', label: '화이트', value: 'White', hex: '#ffffff', border: true },
    { id: 'black', label: '블랙', value: 'Black', hex: '#000000' },
    { id: 'gray', label: '그레이', value: 'Gray', hex: '#888888' },
    { id: 'navy', label: '네이비', value: 'Navy', hex: '#1a2550' },
    { id: 'red', label: '레드', value: 'Red', hex: '#e41c1c' },
    { id: 'pink', label: '핑크', value: 'Pink', hex: '#f4a7b9' },
    { id: 'green', label: '그린', value: 'Green', hex: '#1a8c1a' },
    { id: 'blue', label: '블루', value: 'Blue', hex: '#1c3ee4' },
    { id: 'purple', label: '퍼플', value: 'Purple', hex: '#7b1ae4' },
    { id: 'yellow', label: '옐로우', value: 'Yellow', hex: '#f0d800' },
    { id: 'orange', label: '오렌지', value: 'Orange', hex: '#f07800' },
    { id: 'brown', label: '브라운', value: 'Brown', hex: '#7b4f1a' },
    { id: 'beige', label: '베이지', value: 'Beige', hex: '#d4b896' },
    { id: 'khaki', label: '카키', value: 'Khaki', hex: '#5d675b' },
    { id: 'olive', label: '올리브', value: 'Olive', hex: '#6b6b2a' },
];

// id = data.sizeCategory, children = data.capacity 값
const SIZE_TREE = [
    { id: 'Mini', label: '미니', children: ['ALL', '0 - 10 L'] },
    { id: 'Small', label: '스몰', children: ['ALL', '11 inch', '11 - 15 L'] },
    { id: 'Medium', label: '미디엄', children: ['ALL', '13 inch', '16 - 20 L'] },
    { id: 'Large', label: '라지', children: ['ALL', '15 inch', '21 L 이상'] },
];

const PRICE_MIN = 0;
const PRICE_MAX = 3590000;

// ─── 헬퍼 ────────────────────────────────────────────────────────────────────

const AccordionHeader = ({ title, isOpen, onToggle }) => (
    <button className={`accordion-header ${isOpen ? 'open' : ''}`} onClick={onToggle}>
        <span className="accordion-title">{title}</span>
        {isOpen ? (
            <ChevronUp size={16} strokeWidth={1.5} />
        ) : (
            <ChevronDown size={16} strokeWidth={1.5} />
        )}
    </button>
);

const initBrands = () => BRANDS.reduce((acc, b) => ({ ...acc, [b.id]: true }), {});

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

const FilterPanel = ({ isOpen, onClose, onApply }) => {
    const [openSections, setOpenSections] = useState({});
    const [selectedBrands, setSelectedBrands] = useState(initBrands);
    const [expandedTypes, setExpandedTypes] = useState({});
    const [selectedTypes, setSelectedTypes] = useState({});
    const [seriesSearch, setSeriesSearch] = useState('');
    const [expandedSeries, setExpandedSeries] = useState({});
    const [selectedSeries, setSelectedSeries] = useState({});
    const [showMoreSeries, setShowMoreSeries] = useState(false);
    const [selectedColors, setSelectedColors] = useState({});
    const [expandedSizes, setExpandedSizes] = useState({});
    const [selectedSizes, setSelectedSizes] = useState({});
    const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleSection = (key) => setOpenSections((p) => ({ ...p, [key]: !p[key] }));

    // ── 적용 ──────────────────────────────────────────────────────────────────
    const handleApply = () => {
        // 브랜드: true 인 것만 value 추출 (전체 선택이면 빈 배열 = 필터 없음)
        const brands = BRANDS.filter((b) => selectedBrands[b.id]).map((b) => b.value);
        const allBrands = brands.length === BRANDS.length;

        // 타입: 선택된 type string 모음
        const types = new Set();
        Object.entries(selectedTypes).forEach(([key, checked]) => {
            if (!checked) return;
            // leaf 노드 (parent_child 형태)
            const underIdx = key.indexOf('_');
            if (underIdx === -1) {
                // leaf id
                if (TYPE_LEAF_VALUE[key]) types.add(TYPE_LEAF_VALUE[key]);
            } else {
                const child = key.slice(underIdx + 1);
                types.add(child);
            }
        });

        // 시리즈: 선택된 시리즈 string 모음
        const series = new Set();
        Object.entries(selectedSeries).forEach(([key, checked]) => {
            if (!checked) return;
            const underIdx = key.indexOf('_');
            if (underIdx !== -1) {
                series.add(key.slice(underIdx + 1));
            }
        });

        // 컬러: 선택된 color value
        const colors = COLORS.filter((c) => selectedColors[c.id]).map((c) => c.value);

        // 사이즈: { sizeCategories: Set, capacities: Set }
        const sizeCategories = new Set();
        const capacities = new Set();
        Object.entries(selectedSizes).forEach(([key, checked]) => {
            if (!checked) return;
            const parts = key.split('_');
            const cat = parts[0];
            const cap = parts.slice(1).join('_');
            sizeCategories.add(cat);
            if (cap && cap !== 'ALL') capacities.add(cap);
        });

        onApply?.({
            brands: allBrands ? [] : brands,
            types: [...types],
            series: [...series],
            colors,
            sizeCategories: [...sizeCategories],
            capacities: [...capacities],
            priceRange,
        });
        onClose();
    };

    // ── 초기화 ────────────────────────────────────────────────────────────────
    const handleReset = () => {
        setSelectedBrands(initBrands());
        setExpandedTypes({});
        setSelectedTypes({});
        setSeriesSearch('');
        setExpandedSeries({});
        setSelectedSeries({});
        setSelectedColors({});
        setExpandedSizes({});
        setSelectedSizes({});
        setPriceRange([PRICE_MIN, PRICE_MAX]);
        setOpenSections({});
        onApply?.({
            brands: [],
            types: [],
            series: [],
            colors: [],
            sizeCategories: [],
            capacities: [],
            priceRange: [PRICE_MIN, PRICE_MAX],
        });
    };

    // ── 시리즈 필터링 ─────────────────────────────────────────────────────────
    const visibleGroups = showMoreSeries ? SERIES_GROUPS : SERIES_GROUPS.slice(0, 4);
    const filteredGroups = seriesSearch
        ? SERIES_GROUPS.map((g) => ({
              ...g,
              children: g.children.filter((c) =>
                  c.toLowerCase().includes(seriesSearch.toLowerCase())
              ),
          })).filter((g) => g.children.length > 0)
        : visibleGroups;

    // ── PRICE 슬라이더 ────────────────────────────────────────────────────────
    const handlePriceSlider = (e, idx) => {
        const val = Number(e.target.value);
        setPriceRange((prev) => {
            const next = [...prev];
            next[idx] = val;
            if (idx === 0 && val > next[1]) next[1] = val;
            if (idx === 1 && val < next[0]) next[0] = val;
            return next;
        });
    };

    return (
        <>
            <div className={`filter-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose} />
            <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
                <button className="filter-panel__close" onClick={onClose}>
                    <X size={18} strokeWidth={1.5} />
                </button>

                <div className="filter-panel__body">
                    {/* ── BRAND ──────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="BRAND"
                            isOpen={openSections.brand}
                            onToggle={() => toggleSection('brand')}
                        />
                        <div className="fp-divider" />
                        {openSections.brand && (
                            <div className="fp-brand-list">
                                {BRANDS.map((brand) => (
                                    <label key={brand.id} className="fp-brand-item">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedBrands[brand.id]}
                                            onChange={() =>
                                                setSelectedBrands((p) => ({
                                                    ...p,
                                                    [brand.id]: !p[brand.id],
                                                }))
                                            }
                                        />
                                        <div
                                            className={`fp-brand-box ${selectedBrands[brand.id] ? 'checked' : ''}`}
                                        >
                                            <span className="fp-brand-logo">{brand.label}</span>
                                        </div>
                                        <span className="fp-brand-name">{brand.label}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── TYPE ───────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="TYPE"
                            isOpen={openSections.type}
                            onToggle={() => toggleSection('type')}
                        />
                        <div className="fp-divider" />
                        {openSections.type && (
                            <div className="fp-tree">
                                {TYPE_TREE.map((item) => (
                                    <div key={item.id} className="fp-tree-group">
                                        {item.children !== null && item.children.length > 0 ? (
                                            <>
                                                <button
                                                    className="fp-tree-parent"
                                                    onClick={() =>
                                                        setExpandedTypes((p) => ({
                                                            ...p,
                                                            [item.id]: !p[item.id],
                                                        }))
                                                    }
                                                >
                                                    <span>{item.label}</span>
                                                    <span className="fp-tree-toggle">
                                                        {expandedTypes[item.id] ? '−' : '+'}
                                                    </span>
                                                </button>
                                                {expandedTypes[item.id] && (
                                                    <div className="fp-tree-children">
                                                        {item.children.map((child) => (
                                                            <label
                                                                key={child}
                                                                className="fp-checkbox-row"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        !!selectedTypes[
                                                                            `${item.id}_${child}`
                                                                        ]
                                                                    }
                                                                    onChange={() =>
                                                                        setSelectedTypes((p) => ({
                                                                            ...p,
                                                                            [`${item.id}_${child}`]:
                                                                                !p[
                                                                                    `${item.id}_${child}`
                                                                                ],
                                                                        }))
                                                                    }
                                                                />
                                                                <span>{child}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <label className="fp-checkbox-row fp-tree-leaf">
                                                <input
                                                    type="checkbox"
                                                    checked={!!selectedTypes[item.id]}
                                                    onChange={() =>
                                                        setSelectedTypes((p) => ({
                                                            ...p,
                                                            [item.id]: !p[item.id],
                                                        }))
                                                    }
                                                />
                                                <span>{item.label}</span>
                                            </label>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── SERIES ─────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="SERIES"
                            isOpen={openSections.series}
                            onToggle={() => toggleSection('series')}
                        />
                        <div className="fp-divider" />
                        {openSections.series && (
                            <div className="fp-series">
                                <div className="fp-search-wrap">
                                    <input
                                        type="text"
                                        className="fp-search-input"
                                        placeholder="시리즈명을 입력해보세요"
                                        value={seriesSearch}
                                        onChange={(e) => setSeriesSearch(e.target.value)}
                                    />
                                    <Search size={14} className="fp-search-icon" />
                                </div>
                                <div className="fp-tree">
                                    {filteredGroups.map((group) => (
                                        <div key={group.id} className="fp-tree-group">
                                            <button
                                                className="fp-tree-parent"
                                                onClick={() =>
                                                    setExpandedSeries((p) => ({
                                                        ...p,
                                                        [group.id]: !p[group.id],
                                                    }))
                                                }
                                            >
                                                <span>{group.label}</span>
                                                <span className="fp-tree-toggle">
                                                    {expandedSeries[group.id] ? '−' : '+'}
                                                </span>
                                            </button>
                                            {expandedSeries[group.id] && (
                                                <div className="fp-tree-children">
                                                    {group.children.map((child) => (
                                                        <label
                                                            key={child}
                                                            className="fp-checkbox-row"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    !!selectedSeries[
                                                                        `${group.id}_${child}`
                                                                    ]
                                                                }
                                                                onChange={() =>
                                                                    setSelectedSeries((p) => ({
                                                                        ...p,
                                                                        [`${group.id}_${child}`]:
                                                                            !p[
                                                                                `${group.id}_${child}`
                                                                            ],
                                                                    }))
                                                                }
                                                            />
                                                            <span>{child}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {!seriesSearch && SERIES_GROUPS.length > 4 && (
                                    <button
                                        className="fp-more-btn"
                                        onClick={() => setShowMoreSeries((p) => !p)}
                                    >
                                        {showMoreSeries ? '접기 ∧' : '더보기 ∨'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── COLOR ──────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="COLOR"
                            isOpen={openSections.color}
                            onToggle={() => toggleSection('color')}
                        />
                        <div className="fp-divider" />
                        {openSections.color && (
                            <div className="fp-color-grid">
                                {COLORS.map((color) => (
                                    <button
                                        key={color.id}
                                        className={`fp-color-item ${selectedColors[color.id] ? 'selected' : ''}`}
                                        onClick={() =>
                                            setSelectedColors((p) => ({
                                                ...p,
                                                [color.id]: !p[color.id],
                                            }))
                                        }
                                    >
                                        <span
                                            className="fp-color-swatch"
                                            style={{
                                                background: color.hex,
                                                border: color.border ? '1px solid #ccc' : 'none',
                                            }}
                                        />
                                        <span className="fp-color-label">{color.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── SIZE ───────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="SIZE"
                            isOpen={openSections.size}
                            onToggle={() => toggleSection('size')}
                        />
                        <div className="fp-divider" />
                        {openSections.size && (
                            <div className="fp-tree">
                                {SIZE_TREE.map((item) => (
                                    <div key={item.id} className="fp-tree-group">
                                        <button
                                            className="fp-tree-parent"
                                            onClick={() =>
                                                setExpandedSizes((p) => ({
                                                    ...p,
                                                    [item.id]: !p[item.id],
                                                }))
                                            }
                                        >
                                            <span>{item.label}</span>
                                            <span className="fp-tree-toggle">
                                                {expandedSizes[item.id] ? '−' : '+'}
                                            </span>
                                        </button>
                                        {expandedSizes[item.id] && (
                                            <div className="fp-tree-children">
                                                {item.children.map((child) => (
                                                    <label key={child} className="fp-checkbox-row">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                !!selectedSizes[
                                                                    `${item.id}_${child}`
                                                                ]
                                                            }
                                                            onChange={() =>
                                                                setSelectedSizes((p) => ({
                                                                    ...p,
                                                                    [`${item.id}_${child}`]:
                                                                        !p[`${item.id}_${child}`],
                                                                }))
                                                            }
                                                        />
                                                        <span>{child}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── PRICE ──────────────────────────────── */}
                    <div className="fp-section">
                        <AccordionHeader
                            title="PRICE"
                            isOpen={openSections.price}
                            onToggle={() => toggleSection('price')}
                        />
                        <div className="fp-divider" />
                        {openSections.price && (
                            <div className="fp-price">
                                <p className="fp-price-guide">
                                    점을 이동시켜 가격 범위를 설정해보세요
                                </p>
                                <div className="fp-range-wrap">
                                    <div
                                        className="fp-range-fill"
                                        style={{
                                            left: `${(priceRange[0] / PRICE_MAX) * 100}%`,
                                            right: `${100 - (priceRange[1] / PRICE_MAX) * 100}%`,
                                        }}
                                    />
                                    <input
                                        type="range"
                                        min={PRICE_MIN}
                                        max={PRICE_MAX}
                                        step={1000}
                                        value={priceRange[0]}
                                        onChange={(e) => handlePriceSlider(e, 0)}
                                        className="fp-range fp-range-min"
                                    />
                                    <input
                                        type="range"
                                        min={PRICE_MIN}
                                        max={PRICE_MAX}
                                        step={1000}
                                        value={priceRange[1]}
                                        onChange={(e) => handlePriceSlider(e, 1)}
                                        className="fp-range fp-range-max"
                                    />
                                </div>
                                <div className="fp-price-inputs">
                                    <div className="fp-price-input-wrap">
                                        <input
                                            type="number"
                                            className="fp-price-input"
                                            value={priceRange[0]}
                                            onChange={(e) =>
                                                setPriceRange((p) => [Number(e.target.value), p[1]])
                                            }
                                        />
                                        <span className="fp-price-unit">원</span>
                                    </div>
                                    <span className="fp-price-sep">~</span>
                                    <div className="fp-price-input-wrap">
                                        <input
                                            type="number"
                                            className="fp-price-input"
                                            value={priceRange[1]}
                                            onChange={(e) =>
                                                setPriceRange((p) => [p[0], Number(e.target.value)])
                                            }
                                        />
                                        <span className="fp-price-unit">원</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="filter-panel__footer">
                    <button className="footer-btn apply-btn" onClick={handleApply}>
                        필터 적용
                    </button>
                    <button className="footer-btn reset-btn" onClick={handleReset}>
                        초기화
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterPanel;
