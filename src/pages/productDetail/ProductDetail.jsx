import React from 'react';
import './ProductDetail.scss';

import HeroSection from './components/HeroSection';
import BrandStory from './components/BrandStory';
import ProductInfo from './components/ProductInfo';
import DetailSection from './components/DetailSection';
import ScaleSection from './components/ScaleSection';
import GuidedCommunity from './components/GuidedCommunity';
import RelatedItems from './components/RelatedItems';
import FloatingBar from './components/FloatingBar';

import SubNav from './components/SubNav';

const ProductDetail = () => {
    return (
        <div className="product-detail">
            <HeroSection />
            <SubNav />
            <section id="product-detail">
                <BrandStory />
                <ProductInfo />
            </section>
            <section id="detail-scale">
                <DetailSection />
                <ScaleSection />
            </section>
            <section id="guide">
                <GuidedCommunity />
            </section>
            <section id="community">
                {/* 커뮤니티 영역 - 현재 GuidedCommunity 에 통합되거나 별도 필요 시 추가 */}
            </section>
            <section id="related">
                <RelatedItems />
            </section>
            <FloatingBar />
        </div>
    );
};

export default ProductDetail;