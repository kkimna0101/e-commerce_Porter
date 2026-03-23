import React from "react";
import "./ProductDetail.scss";

import ProductHero from "../../components/productDetail/ProductHero";
import BrandStory from "../../components/productDetail/BrandStory";
import SubNav from "../../components/productDetail/SubNav";
import ProductInfo from "../../components/productDetail/ProductInfo";
import DetailSection from "../../components/productDetail/DetailSection";
import ScaleSection from "../../components/productDetail/ScaleSection";
import GuidedSection from "../../components/productDetail/GuidedSection";
import Community from "../../components/productDetail/Community";
import RelatedItems from "../../components/productDetail/RelatedItems";
import FloatingBar from "../../components/productDetail/FloatingBar";

const ProductDetail = () => {
  return (
    <div className="product-detail">
      <ProductHero />
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
