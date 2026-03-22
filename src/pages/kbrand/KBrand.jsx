import React from 'react';
import NewArrivalsSection from '../../components/kbrand/NewArrivalsSection';
import TrendingSection from '../../components/kbrand/TrendingSection';
import ArtistSection from '../../components/kbrand/ArtistSection';
import KCollectionSection from '../../components/kbrand/KCollectionSection';
import './KBrand.scss';

const KBrand = () => {
    return (
        <div className="kbrand-page">
            {/* 1. 스티키 텍스트 + 스크롤 사진 */}
            <NewArrivalsSection />

            {/* 2. 풀 이미지 */}
            <div className="kbrand-hero-img">
                <img src="/images/kbrand/hero.jpg" alt="K Brand Hero" />
            </div>

            {/* 3. Trending Now */}
            <TrendingSection />

            {/* 4. 작가 롤링 */}
            <ArtistSection />

            {/* 5. 컬렉션 가로 스크롤 */}
            <KCollectionSection />
        </div>
    );
};

export default KBrand;
