import { productsData } from '../../assets/api/productData';

export const createProductSlice = (set, get) => ({
    products: [],
    filteredProducts: [],
    currentProduct: null,

    // 현재 적용 필터 저장 (FilterPanel 누적용)
    activeFilters: {
        category: 'All',
        name: '',
        brands: [],
        types: [],
        series: [],
        colors: [],
        sizeCategories: [],
        capacities: [],
        priceRange: [0, 3590000],
    },

    fetchProducts: () => {
        // persist 캐시와 무관하게 항상 최신 데이터로 초기화
        set({ products: productsData, filteredProducts: productsData });
    },

    fetchProductById: (id) => {
        const { products } = get();
        const product = products.find((p) => p.id === id);
        set({ currentProduct: product || null });
    },

    setFilters: (updater) => {
        const state = get();
        const products = state.products;

        // updater가 함수면 (FilterPanel 방식), 아니면 plain object (ProductList 방식)
        const prev = state.activeFilters;
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };

        // ── 필터 적용 ──────────────────────────────────────────────────────
        let result = [...products];

        // 1. 카테고리
        if (next.category && next.category !== 'All') {
            result = result.filter((p) => p.category === next.category);
        }

        // 2. 검색어
        if (next.name) {
            result = result.filter((p) => p.name.toLowerCase().includes(next.name.toLowerCase()));
        }

        // 3. 브랜드
        if (next.brands && next.brands.length > 0) {
            result = result.filter((p) => next.brands.includes(p.brand));
        }

        // 4. 타입
        if (next.types && next.types.length > 0) {
            result = result.filter((p) => next.types.includes(p.type));
        }

        // 5. 시리즈 (부분 일치)
        if (next.series && next.series.length > 0) {
            result = result.filter((p) =>
                next.series.some((s) => p.series?.toLowerCase().includes(s.toLowerCase()))
            );
        }

        // 6. 컬러 (배열 교집합)
        if (next.colors && next.colors.length > 0) {
            result = result.filter((p) => (p.color || []).some((c) => next.colors.includes(c)));
        }

        // 7. 사이즈 카테고리
        if (next.sizeCategories && next.sizeCategories.length > 0) {
            result = result.filter((p) => next.sizeCategories.includes(p.sizeCategory));
        }

        // 8. 세부 용량/인치
        if (next.capacities && next.capacities.length > 0) {
            result = result.filter((p) => next.capacities.includes(p.capacity));
        }

        // 9. 가격 범위
        if (next.priceRange) {
            const [min, max] = next.priceRange;
            result = result.filter((p) => p.price >= min && p.price <= max);
        }

        set({ activeFilters: next, filteredProducts: result });
    },

    clearFilters: () => {
        const { products } = get();
        set({
            filteredProducts: products,
            activeFilters: {
                category: 'All',
                name: '',
                brands: [],
                types: [],
                series: [],
                colors: [],
                sizeCategories: [],
                capacities: [],
                priceRange: [0, 3590000],
            },
        });
    },

    addReview: (productId, review) => {
        const { products, currentProduct } = get();
        const updatedProducts = products.map((p) => {
            if (p.id === productId) {
                return { ...p, reviews: [...p.reviews, { ...review, id: Date.now() }] };
            }
            return p;
        });
        set({ products: updatedProducts });
        if (currentProduct && currentProduct.id === productId) {
            get().fetchProductById(productId);
        }
    },

    updateReview: (productId, reviewId, content, rating) => {
        const { products, currentProduct } = get();
        const updatedProducts = products.map((p) => {
            if (p.id === productId) {
                return {
                    ...p,
                    reviews: p.reviews.map((r) =>
                        r.id === reviewId
                            ? {
                                  ...r,
                                  content,
                                  rating,
                                  date: new Date().toISOString().split('T')[0],
                              }
                            : r
                    ),
                };
            }
            return p;
        });
        set({ products: updatedProducts });
        if (currentProduct && currentProduct.id === productId) {
            get().fetchProductById(productId);
        }
    },

    deleteReview: (productId, reviewId) => {
        const { products, currentProduct } = get();
        const updatedProducts = products.map((p) => {
            if (p.id === productId) {
                return { ...p, reviews: p.reviews.filter((r) => r.id !== reviewId) };
            }
            return p;
        });
        set({ products: updatedProducts });
        if (currentProduct && currentProduct.id === productId) {
            get().fetchProductById(productId);
        }
    },

    getUserReviews: (userName) => {
        const { products } = get();
        const userReviews = [];
        products.forEach((p) => {
            p.reviews.forEach((r) => {
                if (r.user === userName) {
                    userReviews.push({
                        productId: p.id,
                        productName: p.name,
                        productImage: p.image,
                        ...r,
                    });
                }
            });
        });
        return userReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
});
