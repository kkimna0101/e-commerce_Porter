import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productsData } from '../../assets/api/productData';
import './KCollectionSection.scss';

gsap.registerPlugin(ScrollTrigger);

const COLLECTION_IDS = [135, 18, 38, 49, 100, 89];

const productList = COLLECTION_IDS.map((id) => {
    const p = productsData.find((item) => item.id === id);
    return {
        id: p.id,
        name: p.name,
        series: p.series,
        src: `/images/product/${p.thumbnail}`,
    };
});

const KCollectionSection = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const tlRef = useRef(null); // tl ref 별도 보관
    const stRef = useRef(null);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const scrollWidth = track.scrollWidth - window.innerWidth + 120;
        const totalDistance = scrollWidth * 1.5;

        const tl = gsap.timeline();
        tlRef.current = tl;

        tl.to(track, { x: -scrollWidth, ease: 'none', duration: 1 });
        tl.to({}, { duration: 0.5 });

        stRef.current = ScrollTrigger.create({
            animation: tl,
            trigger: section,
            start: 'center center',
            end: () => `+=${totalDistance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => setShowArrow(self.progress > 0.65),
        });

        return () => {
            // 자신의 트리거와 타임라인만 정리
            if (tlRef.current) tlRef.current.kill();
            if (stRef.current) stRef.current.kill();
        };
    }, []);

    const scrollToStart = () => {
        if (stRef.current) {
            window.scrollTo({ top: stRef.current.start, behavior: 'smooth' });
        }
    };

    return (
        <section className="kcollection-section" ref={sectionRef}>
            <div className="kcollection-content">
                <div className="kcollection-header">
                    <h2>PORTER'S Collections</h2>
                    <span className="kcollection-more">View More</span>
                </div>

                <div className="kcollection-slider-wrap">
                    {showArrow && (
                        <button className="kcollection-back" onClick={scrollToStart}>
                            ←
                        </button>
                    )}

                    <div className="kcollection-slider" ref={trackRef}>
                        {productList.map((product) => (
                            <div key={product.id} className="kcollection-card">
                                <div className="kcollection-img">
                                    <img src={product.src} alt={product.name} />
                                </div>
                                <div className="kcollection-info">
                                    <p className="kcollection-name">{product.name}</p>
                                    <p className="kcollection-series">{product.series}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KCollectionSection;
