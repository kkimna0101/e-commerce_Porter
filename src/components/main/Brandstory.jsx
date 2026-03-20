import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Brandstory.scss';

const SH = 50;
const LH = 104;
const LARGE_SLOT = 5;
const TOTAL_SLOTS = 12;

const words = [
    'ACCORD',
    'BOOTH PACK',
    'ACCESSORIES',
    'SMOKY',
    'INTERACTIVE',
    'YOSHIDA',
    'PROTECTION',
    'ORIGINAL',
    'SCREEN',
    'UNLIMITED',
    'WONDER',
    'SNACK PACK',
];

const BrandStory = () => {
    const porterRef = useRef(null);
    const slotRefs = useRef([]);
    const aliveRef = useRef(true);
    const offsetRef = useRef(0);
    const [porterW, setPorterW] = useState(0);

    const vpH = SH * LARGE_SLOT + LH + SH * (TOTAL_SLOTS - LARGE_SLOT - 1);

    useEffect(() => {
        if (porterRef.current) {
            setPorterW(porterRef.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        if (!porterRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) setPorterW(width);
            }
        });
        resizeObserver.observe(porterRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!porterW) return;
        aliveRef.current = true;

        const roll = () => {
            if (!aliveRef.current) return;
            offsetRef.current = (offsetRef.current + 1) % words.length;
            const newOffset = offsetRef.current;

            slotRefs.current.forEach((span, slotIdx) => {
                if (!span) return;
                const isLarge = slotIdx === LARGE_SLOT;
                const h = isLarge ? LH : SH;

                gsap.timeline()
                    .to(span, { y: -h, opacity: 0, duration: 0.25, ease: 'power2.in' })
                    .call(() => {
                        const wordIdx = (newOffset + slotIdx) % words.length;
                        span.textContent = words[wordIdx];
                        gsap.set(span, { y: h, opacity: 0 });
                    })
                    .to(span, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
            });

            setTimeout(roll, 3000);
        };

        const t = setTimeout(roll, 3000);
        return () => {
            aliveRef.current = false;
            clearTimeout(t);
            slotRefs.current.forEach((s) => s && gsap.killTweensOf(s));
        };
    }, [porterW]);

    return (
        <div className="brand-story-content">
            <section className="brand-story">
                <div className="brand-story__left">
                    <div className="bs-viewport" style={{ height: vpH }}>
                        <span
                            className="bs-porter"
                            ref={porterRef}
                            style={{ top: SH * LARGE_SLOT }}
                        >
                            PORTER
                        </span>

                        {Array.from({ length: TOTAL_SLOTS }).map((_, slotIdx) => {
                            const isLarge = slotIdx === LARGE_SLOT;
                            const top =
                                slotIdx < LARGE_SLOT
                                    ? slotIdx * SH
                                    : slotIdx === LARGE_SLOT
                                      ? SH * LARGE_SLOT
                                      : SH * LARGE_SLOT + LH + (slotIdx - LARGE_SLOT - 1) * SH;

                            return (
                                <div
                                    key={slotIdx}
                                    className="bs-slot"
                                    style={{
                                        top,
                                        height: isLarge ? LH : SH,
                                        fontSize: isLarge ? LH + 'px' : SH + 'px',
                                        paddingLeft: isLarge ? porterW + 'px' : 0,
                                        fontFamily:
                                            "'Roboto Condensed', 'Arial Narrow', Arial, sans-serif",
                                        fontWeight: 900,
                                    }}
                                >
                                    <span
                                        ref={(el) => (slotRefs.current[slotIdx] = el)}
                                        style={{ display: 'inline-block' }}
                                    >
                                        {words[(offsetRef.current + slotIdx) % words.length]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="brand-story__right">
                    <div className="brand-story__tit">
                        <h2 className="brand-story__title">장인의 손길로 완성한 본질</h2>
                        <p className="brand-story__subtitle">: 가방 그 이상의 가치</p>
                    </div>
                    <p className="brand-story__body-ko">
                        현대적인 디자인에 뛰어난 기술력과 기능성, 사용하면 할수록 감탄을 더하게 하는
                        <span>내구성과 실용성을 모두 겸비한 가방 브랜드 'PORTER(포터)'.</span> 바늘
                        한 땀의 정성은 시간이 흐를 수록 사용자의 삶에 깊숙이 스며들어, 단순한 소지품
                        그 이상의 흔적과 신뢰를 남기는 <span>인생의 반려 도구</span>가 됩니다.
                    </p>
                    <p className="brand-story__body-en">
                        Modern design, great technology, and functionality make it more impressive
                        the more you use it Porter, a bag brand that combines durability and
                        practicality. Each needle's sincerity permeates the user's life over time,
                        becoming a daily companion tool that goes beyond simple belongings and
                        leaves traces and trust.
                    </p>
                </div>
            </section>
            {/* brand-story__bottom 제거 → TransitionSection으로 이동 */}
        </div>
    );
};

export default BrandStory;
