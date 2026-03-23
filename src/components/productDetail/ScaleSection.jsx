import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SectionTitle } from "./ProductInfo";
import { productDetailData } from "../../assets/api/productDetailData";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./ScaleSection.scss";

const WAYS = [
  { num: "01", label: "HANDCARRY" },
  { num: "02", label: "CROSSBODY" },
  { num: "03", label: "SHOULDER" },
];

const ScaleSection = () => {
  const { id } = useParams();
  const productId = id ? Number(id) : 138;
  const detail = productDetailData.find((p) => p.id === productId) || {};

  const images = detail.scaleImages || [
    `/images/productdetail/scale/${productId}_scale_1.png`,
    `/images/productdetail/scale/${productId}_scale_2.png`,
    `/images/productdetail/scale/${productId}_scale_3.png`,
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const imageWrapRef = useRef(null);
  const rightRef = useRef(null);
  const scrollCooldown = useRef(false);
  const dragStartX = useRef(null);
  const dragMoved = useRef(false);

  const goNext = () => setActiveIdx((prev) => (prev + 1) % WAYS.length);
  const goPrev = () =>
    setActiveIdx((prev) => (prev - 1 + WAYS.length) % WAYS.length);

  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (scrollCooldown.current) return;
    scrollCooldown.current = true;
    setTimeout(() => {
      scrollCooldown.current = false;
    }, 700);
    if (e.deltaY > 0) goNext();
    else goPrev();
  };

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX;
    dragMoved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) dragMoved.current = true;
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (dragMoved.current && Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    dragStartX.current = null;
    dragMoved.current = false;
  };

  useEffect(() => {
    const imgEl = imageWrapRef.current;
    const rightEl = rightRef.current;
    if (imgEl)
      imgEl.addEventListener("wheel", handleScroll, { passive: false });
    if (rightEl)
      rightEl.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      if (imgEl) imgEl.removeEventListener("wheel", handleScroll);
      if (rightEl) rightEl.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="scale-section">
      <SectionTitle text="SCALE" />

      <div className="scale-section__body">
        <div className="scale-section__left">
          <div
            className="scale-section__image-wrap"
            ref={imageWrapRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div
              className="scale-section__img-slider"
              style={{ transform: `translateX(-${activeIdx * 780}px)` }}
            >
              {images.map((src, idx) => (
                <div key={idx} className="scale-section__img-item">
                  <img
                    src={src}
                    alt={`scale-${idx}`}
                    className="scale-section__img"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div className="scale-section__progress">
              <div
                className="scale-section__progress-bar"
                style={{ width: `${((activeIdx + 1) / images.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="scale-section__side-thumbs">
            <div className="scale-section__thumb-list">
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`thumb-${idx}`}
                  className={`scale-section__thumb ${activeIdx === idx ? "active" : ""}`}
                  onClick={() => setActiveIdx(idx)}
                  draggable={false}
                />
              ))}
            </div>
            <div className="scale-section__thumb-arrows">
              <button className="scale-section__thumb-arrow" onClick={goPrev}>
                <ChevronUp size={40} strokeWidth={2} />
              </button>
              <button className="scale-section__thumb-arrow" onClick={goNext}>
                <ChevronDown size={40} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="scale-section__right"
          ref={rightRef}
          style={{ cursor: "ns-resize" }}
        >
          <div className="scale-section__num-box">
            <span className="scale-section__num">{WAYS[activeIdx].num}</span>
          </div>

          <div className="scale-section__labels">
            {WAYS.map((way, idx) => {
              const diff = (idx - activeIdx + WAYS.length) % WAYS.length;
              const position = diff === 0 ? 0 : diff === 1 ? 1 : -1;
              return (
                <div
                  key={idx}
                  className="scale-section__label-wrap"
                  style={{
                    transform: `translateY(${position * 110}%) rotateX(${position * -25}deg)`,
                    opacity: activeIdx === idx ? 1 : 0.4,
                  }}
                >
                  <span
                    className={`scale-section__label ${activeIdx === idx ? "active" : ""}`}
                  >
                    {way.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleSection;
