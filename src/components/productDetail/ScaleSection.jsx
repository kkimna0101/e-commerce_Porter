import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { productDetailData } from '../../assets/api/productDetailData';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './ScaleSection.scss';

const WAYS = [
    { num: '01', label: 'HANDCARRY' },
    { num: '02', label: 'CROSSBODY' },
    { num: '03', label: 'SHOULDER' },
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
    const containerRef = useRef(null);
    const imageWrapRef = useRef(null);
    const rightRef = useRef(null);
    const labelRefs = useRef([]);
    const scrollCooldown = useRef(false);
    const dragStartX = useRef(null);
    const dragMoved = useRef(false);

    const goNext = () => setActiveIdx((prev) => (prev + 1) % WAYS.length);
    const goPrev = () => setActiveIdx((prev) => (prev - 1 + WAYS.length) % WAYS.length);

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

    // wheel 이벤트 바인딩
    useGSAP(
        () => {
            const imgEl = imageWrapRef.current;
            const rightEl = rightRef.current;
            if (imgEl) imgEl.addEventListener('wheel', handleScroll, { passive: false });
            if (rightEl) rightEl.addEventListener('wheel', handleScroll, { passive: false });
            return () => {
                if (imgEl) imgEl.removeEventListener('wheel', handleScroll);
                if (rightEl) rightEl.removeEventListener('wheel', handleScroll);
            };
        },
        { scope: containerRef }
    );

    // 3D 드럼 피커 롤링 애니메이션
    useGSAP(
        () => {
            const ITEM_HEIGHT = 70;
            const len = WAYS.length;

            labelRefs.current.forEach((el, idx) => {
                if (!el) return;

                // 순환 최단 거리 계산 (-1, 0, +1 등)
                let offset = idx - activeIdx;
                if (offset > len / 2) offset -= len;
                if (offset < -len / 2) offset += len;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                gsap.to(el, {
                    y: offset * ITEM_HEIGHT,
                    rotateX: offset * 25,
                    z: isActive ? 0 : -60 * absOffset,
                    opacity: isActive ? 1 : Math.max(0.15, 0.5 - absOffset * 0.15),
                    scale: isActive ? 1 : Math.max(0.7, 1 - absOffset * 0.12),
                    duration: 0.55,
                    ease: 'power2.out',
                    overwrite: true,
                });

                const label = el.querySelector('.scale-section__label');
                if (label) {
                    gsap.to(label, {
                        fontSize: isActive ? '90px' : '60px',
                        color: isActive ? '#222' : '#bbb',
                        duration: 0.55,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                }
            });
        },
        { dependencies: [activeIdx], scope: containerRef }
    );

    return (
        <div className="scale-section" ref={containerRef}>
            <h2 className="section-title-plain">SCALE</h2>

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
                                    className={`scale-section__thumb ${activeIdx === idx ? 'active' : ''}`}
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
                    style={{ cursor: 'ns-resize' }}
                >
                    <div className="scale-section__num-box">
                        <span className="scale-section__num">{WAYS[activeIdx].num}</span>
                    </div>

                    <div className="scale-section__labels">
                        {WAYS.map((way, idx) => (
                            <div
                                key={idx}
                                className="scale-section__label-wrap"
                                ref={(el) => (labelRefs.current[idx] = el)}
                            >
                                <span
                                    className={`scale-section__label ${activeIdx === idx ? 'active' : ''}`}
                                >
                                    {way.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScaleSection;
