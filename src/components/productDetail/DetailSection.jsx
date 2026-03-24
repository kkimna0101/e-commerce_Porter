import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { productDetailData } from "../../assets/api/productDetailData";
import "./DetailSection.scss";
import "./ProductInfo.scss";

const DetailSection = () => {
  const { id } = useParams();
  const productId = id ? Number(id) : 138;
  const detail = productDetailData.find((p) => p.id === productId) || {};

  const images = detail.detailImages || [
    `/images/productdetail/detail/${productId}_detail_1.png`,
    `/images/productdetail/detail/${productId}_detail_2.png`,
    `/images/productdetail/detail/${productId}_detail_3.png`,
    `/images/productdetail/detail/${productId}_detail_4.png`,
    `/images/productdetail/detail/${productId}_detail_5.png`,
    `/images/productdetail/detail/${productId}_detail_6.png`,
  ];

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupIdx, setPopupIdx] = useState(0);
  const cursorRef = useRef(null);
  const gridRef = useRef(null);
  const rafRef = useRef(null);
  const cursorPos = useRef({ x: 0, y: 0 });

  const [magnifier, setMagnifier] = useState({ visible: false, x: 0, y: 0 });
  const magnifierRef = useRef(null);
  const popupImgRef = useRef(null);

  const openPopup = (idx) => {
    setPopupIdx(idx);
    setPopupOpen(true);
  };
  const closePopup = () => setPopupOpen(false);
  const handlePrev = () =>
    setPopupIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setPopupIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleMouseMove = useCallback((e) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
        cursorRef.current.style.opacity = "1";
      }
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  }, []);

  const handlePopupMouseMove = useCallback((e) => {
    const img = popupImgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setMagnifier((prev) => ({ ...prev, visible: false }));
      return;
    }
    setMagnifier({
      visible: true,
      x,
      y,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  const handlePopupMouseLeave = useCallback(() => {
    setMagnifier((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    if (popupOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [popupOpen]);

  const MAGNIFIER_SIZE = 150;
  const ZOOM = 2.5;

  return (
    <div className="detail-section">
      <h2 className="section-title-plain">DETAILS</h2>

      <div
        className="detail-section__grid"
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cursorRef}
          className="detail-section__cursor"
          style={{ opacity: 0 }}
        >
          <ZoomIn size={20} strokeWidth={1.5} />
        </div>

        <div className="detail-section__row-top">
          <div
            className="detail-section__img-wrap detail-section__img-wrap--full"
            onClick={() => openPopup(0)}
          >
            <img src={images[0]} alt="detail-1" />
          </div>
        </div>
        <div className="detail-section__row-mid">
          <div
            className="detail-section__img-wrap detail-section__img-wrap--half"
            onClick={() => openPopup(1)}
          >
            <img src={images[1]} alt="detail-2" />
          </div>
          <div
            className="detail-section__img-wrap detail-section__img-wrap--half"
            onClick={() => openPopup(2)}
          >
            <img src={images[2]} alt="detail-3" />
          </div>
        </div>
        <div className="detail-section__row-bot">
          <div
            className="detail-section__img-wrap detail-section__img-wrap--third"
            onClick={() => openPopup(3)}
          >
            <img src={images[3]} alt="detail-4" />
          </div>
          <div
            className="detail-section__img-wrap detail-section__img-wrap--third"
            onClick={() => openPopup(4)}
          >
            <img src={images[4]} alt="detail-5" />
          </div>
          <div
            className="detail-section__img-wrap detail-section__img-wrap--third"
            onClick={() => openPopup(5)}
          >
            <img src={images[5]} alt="detail-6" />
          </div>
        </div>
      </div>

      {popupOpen && (
        <div className="detail-section__popup-overlay" onClick={closePopup}>
          <div
            className="detail-section__popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="detail-section__popup-close"
              onClick={closePopup}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <div
              className="detail-section__popup-img-wrap"
              onMouseMove={handlePopupMouseMove}
              onMouseLeave={handlePopupMouseLeave}
            >
              <img
                ref={popupImgRef}
                src={images[popupIdx]}
                alt={`detail-popup-${popupIdx}`}
                className="detail-section__popup-img"
              />

              {magnifier.visible && (
                <div
                  className="detail-section__magnifier"
                  style={{
                    width: MAGNIFIER_SIZE,
                    height: MAGNIFIER_SIZE,
                    left: magnifier.x - MAGNIFIER_SIZE / 2,
                    top: magnifier.y - MAGNIFIER_SIZE / 2,
                    backgroundImage: `url(${images[popupIdx]})`,
                    backgroundSize: `${magnifier.width * ZOOM}px ${magnifier.height * ZOOM}px`,
                    backgroundPosition: `-${magnifier.x * ZOOM - MAGNIFIER_SIZE / 2}px -${magnifier.y * ZOOM - MAGNIFIER_SIZE / 2}px`,
                  }}
                />
              )}

              <div className="detail-section__popup-arrows">
                <button
                  className="detail-section__popup-arrow"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={40} strokeWidth={2} />
                </button>
                <button
                  className="detail-section__popup-arrow"
                  onClick={handleNext}
                >
                  <ChevronRight size={40} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailSection;
