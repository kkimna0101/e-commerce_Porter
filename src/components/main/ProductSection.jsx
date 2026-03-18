import React, { useRef, useEffect, useState } from 'react';
import './ProductSection.scss';

const productList = [
  { id: 1, name: 'TANKER SQUARE TOTE BAG(L)', price: '₩ 818,000', src: '/images/main/recommended1.png' },
  { id: 2, name: 'TANKER ENVELOPE BAG', price: '₩ 448,000', src: '/images/main/recommended2.png' },
  { id: 3, name: 'TANKER SHORT HELMET BAG', price: '₩ 628,000', src: '/images/main/recommended3.png' },
  { id: 4, name: 'TANKER TOTE BAG(L)', price: '₩ 748,000', src: '/images/main/recommended4.png' },
  { id: 5, name: 'TANKER 3WAY DOCUMENT BAG W zip', price: '₩ 978,000', src: '/images/main/recommended5.png' },
  { id: 6, name: 'TANKER FANNY PACK', price: '₩ 448,000', src: '/images/main/recommended6.png' },
  { id: 7, name: 'TANKER BOSTON BAG', price: '₩ 598,000', src: '/images/main/recommended7.png' },
  { id: 8, name: 'TANKER BOSTON BAG(L)', price: '₩ 748,000', src: '/images/main/recommended8.png' },
];

const ProductSection = () => {
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    const slider = sliderRef.current;
    if (!content || !slider) return;

    const handleWheel = (e) => {
      e.preventDefault(); 
      slider.scrollLeft += e.deltaY * 1.0; 
    };

    content.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      content.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  const scrollToStart = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="product-section">
      <div className="product-content" ref={contentRef}>
        
        <div className="section-header">
          <h2>Recommended Product</h2>
          <span className="view-more">View More</span>
        </div>

        <div className="slider-container">
          
          {showArrow && (
            <button className="back-arrow" onClick={scrollToStart}>
              ←
            </button>
          )}

          <div 
            className="product-slider"
            ref={sliderRef} 
            onScroll={handleScroll}
          >
            {productList.map((product) => (
              <div key={product.id} className="product-card">
                <div className="img-box">
                  <img src={product.src} alt={product.name} />
                </div>
                <div className="info-box">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductSection;