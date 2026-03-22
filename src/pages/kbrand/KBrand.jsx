import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NewArrivalsSection from '../../components/kbrand/NewArrivalsSection';
import TrendingSection from '../../components/kbrand/TrendingSection';
import ArtistSection from '../../components/kbrand/ArtistSection';
import KCollectionSection from '../../components/kbrand/KCollectionSection';
import './KBrand.scss';

const KBrand = () => {
    useEffect(() => {
        // rAF보다 setTimeout이 자식 컴포넌트 useEffect 완료를 더 확실히 보장
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="kbrand-page">
            <NewArrivalsSection />

            <div className="kbrand-hero-img">
                <img src="/images/kbrand/hero.jpg" alt="K Brand Hero" />
            </div>

            <TrendingSection />
            <ArtistSection />
            <KCollectionSection />
        </div>
    );
};

export default KBrand;
