import React from "react";
import "./ProductDetail.scss";

import HeroSection from "./components/HeroSection";
import BrandStory from "./components/BrandStory";
import SubNav from "./components/SubNav";
import ProductInfo from "./components/ProductInfo";
import DetailSection from "./components/DetailSection";
import ScaleSection from "./components/ScaleSection";
import GuidedSection from "./components/GuidedSection";
import Community from "./components/Community";
import RelatedItems from "./components/RelatedItems";
import FloatingBar from "./components/FloatingBar";

const ProductDetail = () => {
  return (
    <div className="product-detail">
      <HeroSection />
      <BrandStory />
      <SubNav />

      <section id="product-detail">
        <ProductInfo />
      </section>

      <section id="detail-scale">
        <DetailSection />
        <ScaleSection />
      </section>

      <section id="guide">
        <GuidedSection />
      </section>

      <section id="community">
        <Community />
      </section>

      <section id="related">
        <RelatedItems />
      </section>

      <FloatingBar />
    </div>
  );
};

export default ProductDetail;
