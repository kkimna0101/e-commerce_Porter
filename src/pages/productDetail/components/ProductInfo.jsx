import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductInfo.scss';

export const SectionTitle = ({ text }) => {
    const letters = text.split('');
    return (
        <h2 className="section-title">
            {letters.map((char, idx) => (
                <span className="section-title__mask" key={idx}>
                    <span className="section-title__letter" style={{ animationDelay: `${idx * 0.06}s` }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </h2>
    );
};

const ProductInfo = () => {
    const { id } = useParams();
    const productId = id ? Number(id) : 138;

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

    const handlePrev = () => setActiveIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    const handleNext = () => setActiveIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

    const getSliderStart = () => {
        if (activeIdx === 0) return 0;
        if (activeIdx === allImages.length - 1) return allImages.length - 3;
        return activeIdx - 1;
    };

    const sliderStart = getSliderStart();
    const miniImages = allImages.slice(sliderStart, sliderStart + 3);

    const handleMouseDown = (e) => {
        dragStartX.current = e.clientX;
        dragMoved.current = false;
        setDragOffset(0);
    };

    const handleMouseMove = (e) => {
        if (dragStartX.current === null) return;
        const diff = e.clientX - dragStartX.current;
        if (Math.abs(diff) > 5) dragMoved.current = true;
        setDragOffset(diff * 0.3);
    };

    const handleMouseUp = (e) => {
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

    const handleMouseLeave = () => {
        if (dragStartX.current !== null) {
            dragStartX.current = null;
            setDragOffset(0);
            dragMoved.current = false;
        }
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
                        <h3 className="product-info__name">TANKER SHORT HELMET BAG</h3>
                        <p className="product-info__desc-main">
                            포터의 시그니처 시리즈인 탱커가 세계 최초로 양산화에 성공한 100% 식물성 나일론 소재를 사용해 새롭게 태<br />
                            어났습니다. "ALL NEW TANKER- 아무것도 변하지 않고, 모든 것이 바뀐다" 라는 콘셉트로 혁신적인 변화를<br />
                            시도했습니다.
                        </p>
                        <p className="product-info__sub-title">
                            숏 헬멧 백은 헬멧 백의 가로형 소형 버전입니다.
                        </p>
                        <p className="product-info__sub-desc">
                            A4 파일을 수납할 수 있으며, 작업 시와 작업 외 시간에 모두 사용할 수 있는 매력적인 크기입니다. 어깨끈은 탈<br />
                            부착이 가능하여 핸드백으로 사용하거나 어깨에 메는 두 가지 방식으로 사용할 수 있습니다.
                        </p>
                        <p className="product-info__notice">
                            * 모든 타입에 정품 파우치가 함께 제공됩니다.
                        </p>
                    </div>

                    <div className="product-info__mini-area">
                        <button className="product-info__arrow" onClick={handlePrev}>
                            <ChevronLeft size={40} strokeWidth={2} />
                        </button>

                        <div className="product-info__mini-viewport">
                            <div
                                className="product-info__mini-list"
                                style={{
                                    transform: `translateX(${dragOffset}px)`,
                                    transition: dragStartX.current ? 'none' : 'transform 0.3s ease',
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
                                                className={`product-info__mini-img ${realIdx === allImages.length - 1 ? 'small' : ''} ${activeIdx === realIdx ? 'active' : ''}`}
                                                draggable={false}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                className="product-info__drag-layer"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseLeave}
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