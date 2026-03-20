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

const ProductDetail = () => {
    return (
        <div className="product-detail">
            <HeroSection />
            <BrandStory />
            <ProductInfo />
            <DetailSection />
            <ScaleSection />
            <GuidedCommunity />
            <RelatedItems />
            <FloatingBar />
        </div>
    );
};

export default ProductDetail;