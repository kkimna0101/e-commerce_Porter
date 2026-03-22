import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NewArrivalsSection from '../../components/kbrand/NewArrivalsSection';
import TrendingSection from '../../components/kbrand/TrendingSection';
import ArtistSection from '../../components/kbrand/ArtistSection';
import KCollectionSection from '../../components/kbrand/KCollectionSection';
import './KBrand.scss';

const KBrand = () => {
    useEffect(() => {
        // 모든 섹션이 DOM에 완전히 그려진 뒤 위치 재계산
        // requestAnimationFrame 두 번으로 레이아웃 페인트 이후 보장
        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });

        return () => cancelAnimationFrame(raf);
        // ※ ScrollTrigger.getAll().kill() 제거 → 각 컴포넌트가 자체 cleanup 담당
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
