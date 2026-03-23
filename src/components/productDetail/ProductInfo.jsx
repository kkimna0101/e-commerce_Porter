import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productsData } from "../../assets/api/productData";
import { productDetailData } from "../../assets/api/productDetailData";
import "./ProductInfo.scss";

export const SectionTitle = ({ text }) => {
  const letters = text.split("");
  return (
    <h2 className="section-title">
      {letters.map((char, idx) => (
        <span className="section-title__mask" key={idx}>
          <span
            className="section-title__letter"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </h2>
  );
};

const ProductInfo = () => {
  const { id } = useParams();
  const productId = id ? Number(id) : 138;

  const product = productsData.find((p) => p.id === productId) || {};
  const detail = productDetailData.find((p) => p.id === productId) || {};

  const allImages = [
    `/images/productdetail/hero_product/${productId}_heroproduct_1.png`,
    `/images/productdetail/hero_product/${productId}_inner_2.png`,
    `/images/productdetail/hero_product/${productId}_inner_3.png`,
    `/images/productdetail/hero_product/${productId}_inner_4.png`,
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(null);
  const dragMoved = useRef(false);

  const handlePrev = () =>
    setActiveIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const getSliderStart = () => {
    if (activeIdx === 0) return 0;
    if (activeIdx === allImages.length - 1) return allImages.length - 3;
    return activeIdx - 1;
  };

  const sliderStart = getSliderStart();
  const miniImages = allImages.slice(sliderStart, sliderStart + 3);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current = false;
    setDragOffset(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 5) dragMoved.current = true;
    setDragOffset(diff * 0.3);
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (dragMoved.current && Math.abs(diff) > 20) {
      if (diff < 0) handleNext();
      else handlePrev();
    }
    dragStartX.current = null;
    setDragOffset(0);
    dragMoved.current = false;
  };

  return (
    <div className="product-info">
      <SectionTitle text="PRODUCT" />

      <div className="product-info__body">
        <div className="product-info__image-box">
          <img
            src={allImages[activeIdx]}
            alt="product"
            className="product-info__main-img"
          />
          <span className="product-info__counter">
            {activeIdx + 1}/{allImages.length}
          </span>
        </div>

        <div className="product-info__right">
          <div className="product-info__text-area">
            <h3 className="product-info__name">{product.name || ""}</h3>
            <p className="product-info__desc-main">
              {detail.productInfo || ""}
            </p>
            <p className="product-info__sub-title">{detail.subTitle || ""}</p>
            <p className="product-info__sub-desc">{detail.subDesc || ""}</p>
            {detail.notice && (
              <p className="product-info__notice">{detail.notice}</p>
            )}
          </div>

          <div className="product-info__mini-area">
            <button className="product-info__arrow" onClick={handlePrev}>
              <ChevronLeft size={40} strokeWidth={2} />
            </button>

            <div className="product-info__mini-viewport">
              <div
                className="product-info__mini-list"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{
                  transform: `translateX(${dragOffset}px)`,
                  transition: dragStartX.current
                    ? "none"
                    : "transform 0.3s ease",
                }}
              >
                {miniImages.map((src, idx) => {
                  const realIdx = sliderStart + idx;
                  return (
                    <div
                      key={realIdx}
                      className="product-info__mini-item"
                      onClick={() => setActiveIdx(realIdx)}
                    >
                      <img
                        src={src}
                        alt={`mini-${realIdx}`}
                        className={`product-info__mini-img ${realIdx === allImages.length - 1 ? "small" : ""} ${activeIdx === realIdx ? "active" : ""}`}
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="product-info__drag-layer"
                onMouseDown={(e) => {
                  dragStartX.current = e.clientX;
                  dragMoved.current = false;
                }}
                onMouseMove={(e) => {
                  if (dragStartX.current === null) return;
                  const diff = Math.abs(dragStartX.current - e.clientX);
                  if (diff > 5) dragMoved.current = true;
                  setDragOffset((e.clientX - dragStartX.current) * 0.3);
                }}
                onMouseUp={(e) => {
                  if (dragStartX.current === null) return;
                  const diff = dragStartX.current - e.clientX;
                  if (dragMoved.current && Math.abs(diff) > 20) {
                    if (diff > 0) handleNext();
                    else handlePrev();
                  }
                  dragStartX.current = null;
                  setDragOffset(0);
                  dragMoved.current = false;
                }}
                onMouseLeave={() => {
                  dragStartX.current = null;
                  setDragOffset(0);
                  dragMoved.current = false;
                }}
                onClick={(e) => {
                  if (dragMoved.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const itemWidth = rect.width / 3;
                  const clickedIdx = sliderStart + Math.floor(x / itemWidth);
                  setActiveIdx(Math.min(clickedIdx, allImages.length - 1));
                }}
              />
            </div>

            <button className="product-info__arrow" onClick={handleNext}>
              <ChevronRight size={40} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
