import { productsData } from '../../assets/api/productData';

export const createProductSlice = (set, get) => ({
  products: [],
  filteredProducts: [],
  currentProduct: null,

  fetchProducts: () => {
    const { products } = get();
    if (products.length === 0) {
      set({ products: productsData, filteredProducts: productsData });
    } else {
      set({ filteredProducts: products });
    }
  },

  fetchProductById: (id) => {
    const { products } = get();
    const product = products.find(p => p.id === id);
    set({ currentProduct: product || null });
  },

  setFilters: (filters) => {
    const { products } = get();
    let result = [...products];

    if (filters.category && filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.gender && filters.gender !== 'All') {
      result = result.filter(p => p.gender === filters.gender);
    }
    if (filters.isSale) {
      result = result.filter(p => p.isSale);
    }
    if (filters.isBest) {
      result = result.filter(p => p.isBest);
    }
    if (filters.name) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    set({ filteredProducts: result });
  },

  clearFilters: () => {
    const { products } = get();
    set({ filteredProducts: products });
  },

  addReview: (productId, review) => {
    const { products, currentProduct } = get();
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: [
            ...p.reviews,
            { ...review, id: Date.now() }
          ]
        };
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
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: p.reviews.map(r => 
            r.id === reviewId ? { ...r, content, rating, date: new Date().toISOString().split('T')[0] } : r
          )
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
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          reviews: p.reviews.filter(r => r.id !== reviewId)
        };
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
    products.forEach(p => {
      p.reviews.forEach(r => {
        if (r.user === userName) {
          userReviews.push({
            productId: p.id,
            productName: p.name,
            productImage: p.image,
            ...r
          });
        }
      });
    });
    return userReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
});
