import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductSection.scss';

gsap.registerPlugin(ScrollTrigger);

const productList = [
    { productId: 135, name: 'TANKER SQUARE TOTE BAG(L)', price: '₩ 818,000', src: '/images/main/recommended1.png' },
    { productId: 137, name: 'TANKER ENVELOPE BAG', price: '₩ 448,000', src: '/images/main/recommended2.png' },
    { productId: 138, name: 'TANKER SHORT HELMET BAG', price: '₩ 628,000', src: '/images/main/recommended3.png' },
    { productId: 139, name: 'TANKER TOTE BAG(L)', price: '₩ 748,000', src: '/images/main/recommended4.png' },
    { productId: 141, name: 'TANKER 3WAY DOCUMENT BAG W zip', price: '₩ 978,000', src: '/images/main/recommended5.png' },
    { productId: 145, name: 'TANKER FANNY PACK', price: '₩ 448,000', src: '/images/main/recommended6.png' },
    { productId: 147, name: 'TANKER BOSTON BAG', price: '₩ 598,000', src: '/images/main/recommended7.png' },
    { productId: 148, name: 'TANKER BOSTON BAG(L)', price: '₩ 748,000', src: '/images/main/recommended8.png' },
];

const ProductSection = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const stRef = useRef(null);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const track = trackRef.current;
        const scrollWidth = track.scrollWidth - window.innerWidth + 120;
        const totalDistance = scrollWidth * 3;

        const tl = gsap.timeline();

        tl.to(track, {
            x: -scrollWidth,
            ease: 'none',
            duration: 1,
        });

        tl.to({}, { duration: 0.5 });

        stRef.current = ScrollTrigger.create({
            animation: tl,
            trigger: sectionRef.current,
            start: 'center center',
            end: () => `+=${totalDistance}`,
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                setShowArrow(self.progress > 0.65);
            },
        });

        return () => {
            if (tl) tl.kill();
            if (stRef.current) stRef.current.kill();
        };
    }, []);

    const scrollToStart = () => {
        if (stRef.current) {
            window.scrollTo({
                top: stRef.current.start,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="product-section" ref={sectionRef}>
            <div className="product-content">
                <div className="section-header">
                    <h2>Recommended Product</h2>
                    <span className="view-more" onClick={() => navigate('/product')}>View More</span>
                </div>

                <div className="slider-container">
                    {showArrow && (
                        <button className="back-arrow" onClick={scrollToStart}>
                            ←
                        </button>
                    )}

                    <div className="product-slider" ref={trackRef}>
                        {productList.map((product) => (
                            <div
                                key={product.productId}
                                className="product-card"
                                onClick={() => navigate(`/product/${product.productId}`)}
                            >
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