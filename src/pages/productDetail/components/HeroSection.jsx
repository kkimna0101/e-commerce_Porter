import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import './HeroSection.scss';

const HeroSection = () => {
    const product = {
        series: "TANKER",
        name: "TANKER SHORT HELMET BAG",
        brand: "PORTER", 
        category: "TANKER",
        price: "628,000",
        colors: [
            { name: "블랙", code: "#000000" },
            { name: "세이지그린", code: "#717B73" },
            { name: "아이언블루", code: "#262D3C" }
        ],
        thumbnails: [
            { bg: "/images/productdetail/hero_product/thumbnail1.png", item: "/images/productdetail/hero_product/24.png" },
            { bg: "/images/productdetail/hero_product/thumbnail2.png" },
            { bg: "/images/productdetail/hero_product/thumbnail3.png" },
            { bg: "/images/productdetail/hero_product/thumbnail4.png" }
        ]
    };

    return (
        /* 상단 */
        <section className="hero-section">
            <div className="hero-left">
                <div className="series-name-sticky">
                    <h2 className="series-name">{product.series}</h2>
                </div>
                <div className="thumbnail-list">
                    {product.thumbnails.map((thumb, idx) => (
                        <div key={idx} className="thumb-container">
                            <img src={thumb.bg} alt={`bg-${idx}`} className="thumb-bg" />
                            {thumb.item && (
                                <img src={thumb.item} alt={`item-${idx}`} className="thumb-item" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-right">
                <div className="info-sticky-wrapper">
                    <div className="info-header">
                        <h1 className="prod-name">{product.name}</h1>
                        <div className="cat-group">
                            <Link to="/brand" className="cat-item">{product.brand}</Link>
                            <Link to="/category" className="cat-item">{product.category}</Link>
                        </div>
                    </div>

                    <div className="color-section">
                        <h3 className="section-label">COLOR</h3>
                        <div className="color-list">
                            {product.colors.map((c, i) => (
                                <Link to={`/product/${c.name}`} key={i} className="color-item">
                                    <div className="color-chip-box" style={{ backgroundColor: c.code }}></div>
                                    <span className="color-name-text">{c.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="info-accordions">
                        <div className="acc-line"></div>
                        <div className="acc-item">
                            <span className="acc-title">매장재고</span>
                            <div className="plus-icon"><Plus size={25} strokeWidth={2} color="#333333" /></div>
                        </div>
                        <div className="acc-line"></div>
                        <div className="acc-item">
                            <span className="acc-title">제품상세</span>
                            <div className="plus-icon"><Plus size={25} strokeWidth={2} color="#333333" /></div>
                        </div>
                        <div className="acc-line"></div>
                    </div>
                </div>
            </div>

            {/* 하단 초록 바*/}
            <div className="bottom-sticky-bar">
                <div className="bar-inner">
                    <span className="price-text">
                        <span className="price-symbol">₩</span> {product.price}
                    </span>
                    
                    <div className="btn-group">
                        <button className="bar-btn">위시리스트</button>
                        <div className="bar-divider"></div>
                        <button className="bar-btn">장바구니</button>
                        <div className="bar-divider"></div>
                        <button className="bar-btn">바로구매</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;