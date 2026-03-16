import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductItem from '../components/ProductItem';
import './ProductList.scss';

const CATEGORIES = ['All', 'Work', 'Daily', 'Travel', 'Small Goods', 'Other'];

const ProductList = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const { products, filteredProducts, fetchProducts, setFilters, clearFilters } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let baseFilters = { 
      category: activeCategory, 
      gender: 'All', 
      isSale: false, 
      isBest: false,
      name: '' 
    };

    if (pathname.includes('/women')) baseFilters.gender = 'Woman';
    if (pathname.includes('/men')) baseFilters.gender = 'Man';
    if (pathname.includes('/sale')) baseFilters.isSale = true;
    if (pathname.includes('/best')) baseFilters.isBest = true;
    
    if (searchQuery) {
      baseFilters.name = searchQuery;
    }

    setFilters(baseFilters);
  }, [pathname, activeCategory, setFilters, products, searchQuery]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  const getPageTitle = () => {
    if (searchQuery) return `SEARCH: ${searchQuery}`;
    if (pathname.includes('/women')) return 'WOMEN';
    if (pathname.includes('/men')) return 'MEN';
    if (pathname.includes('/sale')) return 'SALE';
    if (pathname.includes('/best')) return 'BEST SELLERS';
    return 'ALL PRODUCTS';
  };

  return (
    <div className="product-list-page inner">
      <div className="product-list-page__header">
        <h2 className="page-title">{getPageTitle()}</h2>
        
        {!pathname.includes('/sale') && !pathname.includes('/best') && !searchQuery && (
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-list-page__content">
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(item => (
              <ProductItem key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>조건에 맞는 상품이 존재하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
