import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './BrandStory.scss';

const SH = 46;
const LH = 104;
const LARGE_SLOT = 5; // 0-based, 큰 슬롯 위치 (위에서 6번째 줄)
const TOTAL_SLOTS = 12;

const words = [
    'ACCORD',
    'BOOTH PACK',
    'ACCESSORIES',
    'SMOKE',
    'INTERACTIVE',
    'YOSHIDA', // 처음 큰 슬롯에 보일 단어
    'PROTECTION',
    'STAND ORIGINAL',
    'SCREEN',
    'UNLIMITED',
    'WONDER',
    'SNACK PACK',
];

const BrandStory = () => {
    const porterRef = useRef(null);
    const slotRefs = useRef([]); // 각 슬롯의 텍스트 span ref
    const aliveRef = useRef(true);
    const offsetRef = useRef(0); // 현재 words 시작 인덱스
    const [porterW, setPorterW] = useState(0);

    const vpH = SH * LARGE_SLOT + LH + SH * (TOTAL_SLOTS - LARGE_SLOT - 1);

    useEffect(() => {
        if (porterRef.current) {
            setPorterW(porterRef.current.getBoundingClientRect().width);
        }
    }, []);

    useEffect(() => {
        if (!porterW) return;
        aliveRef.current = true;

        const roll = () => {
            if (!aliveRef.current) return;

            offsetRef.current = (offsetRef.current + 1) % words.length;
            const newOffset = offsetRef.current;

            // 모든 슬롯을 동시에 위로 슬라이드 아웃 → 새 텍스트로 교체 → 아래서 슬라이드 인
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
        <>
            <section className="brand-story">
                <div className="brand-story__left">
                    <div className="bs-viewport" style={{ height: vpH }}>
                        {/* PORTER 고정 레이블 */}
                        <span
                            className="bs-porter"
                            ref={porterRef}
                            style={{ top: SH * LARGE_SLOT }}
                        >
                            PORTER
                        </span>

                        {/* 고정 슬롯들 */}
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
                    <h2 className="brand-story__title">장인의 손길로 완성한 본질</h2>
                    <p className="brand-story__subtitle">: 가방 그 이상의 가치</p>
                    <p className="brand-story__body-ko">
                        현대적인 디자인에 뛰어난 기술력과 기능성, 사용하면 할수록 감탄을 더하게 하는
                        내구성과 실용성을 모두 겸비한 가방 브랜드 'POTER(포터)'. 바늘 한 땀의 정성은
                        시간이 흐를 수록 사용자의 삶에 깊숙이 스며들어, 단순한 소지품 그 이상의
                        흔적과 신뢰를 남기는 인생의 반려 도구가 됩니다.
                    </p>
                    <p className="brand-story__body-en">
                        Modern design, great technology, and functionality make it more impressive
                        the more you use it Potter, a bag brand that combines durability and
                        practicality. Each needle's sincerity permeates the user's life over time,
                        becoming a daily companion tool that goes beyond simple belongings and
                        leaves traces and trust.
                    </p>
                </div>
            </section>
            <section>
                <div className="bs__bottom-content">
                    <div className="bs__bottom-left">
                        <img
                            src="/images/main/main_porter01.png"
                            alt="Force"
                            width="460"
                            height="310"
                        />
                        <img
                            src="/images/main/main_portertxt.svg"
                            alt="LUGGAGE LABEL"
                            width="120"
                            height="48"
                            className="bs__bottom-porter-txt"
                        />
                    </div>
                    <img
                        src="/images/main/main_porter02.png"
                        alt="Right Bottom"
                        width="979"
                        height="720"
                    />
                </div>
            </section>
        </>
    );
};

export default BrandStory;

/*

porter 우측 회색큰글자 위치 고정된 버전 (반응형에서 괜찮을지 모르겠어서 일단 보류)

import React, { useEffect, useRef } from 'react'; // useState 제거
import gsap from 'gsap';
import './BrandStory.scss';

const SH = 46;
const LH = 104;
const LARGE_SLOT = 5;
const TOTAL_SLOTS = 12;

const words = [
    'ACCORD',
    'BOOTH PACK',
    'ACCESSORIES',
    'SMOKE',
    'INTERACTIVE',
    'YOSHIDA',
    'PROTECTION',
    'STAND ORIGINAL',
    'SCREEN',
    'UNLIMITED',
    'WONDER',
    'SNACK PACK',
];

const BrandStory = () => {
    // 1. 불필요해진 porterRef와 porterW(useState) 삭제
    const slotRefs = useRef([]);
    const aliveRef = useRef(true);
    const offsetRef = useRef(0);

    const vpH = SH * LARGE_SLOT + LH + SH * (TOTAL_SLOTS - LARGE_SLOT - 1);

    // 2. 포터 크기 측정용 useEffect 전체 삭제

    // 3. 애니메이션 useEffect 의존성 배열 수정
    useEffect(() => {
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
    }, []); // porterW가 없어졌으므로 빈 배열로 변경

    return (
        <>
            <section className="brand-story">
                <div className="brand-story__left">
                    <div className="bs-viewport" style={{ height: vpH }}>
                       // PORTER 고정 레이블 (ref 삭제) 
                        <span className="bs-porter" style={{ top: SH * LARGE_SLOT }}>
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
                                        // 4. 이 부분에 고정값 320px 적용
                                        paddingLeft: isLarge ? '340px' : 0,
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
                    <h2 className="brand-story__title">장인의 손길로 완성한 본질</h2>
                    <p className="brand-story__subtitle">: 가방 그 이상의 가치</p>
                    <p className="brand-story__body-ko">
                        현대적인 디자인에 뛰어난 기술력과 기능성, 사용하면 할수록 감탄을 더하게 하는
                        내구성과 실용성을 모두 겸비한 가방 브랜드 'POTER(포터)'. 바늘 한 땀의 정성은
                        시간이 흐를 수록 사용자의 삶에 깊숙이 스며들어, 단순한 소지품 그 이상의
                        흔적과 신뢰를 남기는 인생의 반려 도구가 됩니다.
                    </p>
                    <p className="brand-story__body-en">
                        Modern design, great technology, and functionality make it more impressive
                        the more you use it Potter, a bag brand that combines durability and
                        practicality. Each needle's sincerity permeates the user's life over time,
                        becoming a daily companion tool that goes beyond simple belongings and
                        leaves traces and trust.
                    </p>
                </div>
            </section>
            <section>
                <div className="bs__bottom-content">
                    <div className="bs__bottom-left">
                        <img
                            src="/images/main/main_porter01.png"
                            alt="Force"
                            width="460"
                            height="310"
                        />
                        <img
                            src="/images/main/main_portertxt.svg"
                            alt="LUGGAGE LABEL"
                            width="120"
                            height="48"
                            className="bs__bottom-porter-txt"
                        />
                    </div>
                    <img
                        src="/images/main/main_porter02.png"
                        alt="Right Bottom"
                        width="979"
                        height="720"
                    />
                </div>
            </section>
        </>
    );
};

export default BrandStory;

*/
