import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './Brandstory.scss';

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

const ITEM_H = 50;        // 일반 li 높이
const PORTER_H = 104;     // PORTER 행 높이
const PORTER_ROW = 5;     // PORTER가 위치하는 행 인덱스
const VISIBLE = 12;       // 보이는 행 수
const SCALE = ITEM_H / PORTER_H; // 축소 비율 ≈ 0.48

const BrandStory = () => {
    const listRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const porterRef = useRef(null);
    const aliveRef = useRef(true);
    const offsetRef = useRef(0);
    const timerRef = useRef(null);
    const spanRefs = useRef([]);
    const [porterW, setPorterW] = useState(0);

    // 현재 PORTER 옆 단어 / 다음 단어
    const [porterWord, setPorterWord] = useState(
        words[(0 + PORTER_ROW) % words.length]
    );
    const [nextWord, setNextWord] = useState(
        words[(0 + PORTER_ROW + 1) % words.length]
    );

    // 일반 행 데이터 생성 (PORTER 행 제외)
    const buildRows = useCallback((offset) => {
        return Array.from({ length: VISIBLE + 1 }, (_, i) => {
            const wordIdx = (offset + i) % words.length;
            return {
                word: words[wordIdx],
                isPorterRow: i === PORTER_ROW,
            };
        });
    }, []);

    const [rows, setRows] = useState(() => buildRows(0));

    /* ── PORTER 너비 측정 ── */
    useEffect(() => {
        if (porterRef.current) {
            setPorterW(porterRef.current.getBoundingClientRect().width);
        }
        const ro = new ResizeObserver((entries) => {
            for (const e of entries) {
                if (e.contentRect.width > 0) setPorterW(e.contentRect.width);
            }
        });
        if (porterRef.current) ro.observe(porterRef.current);
        return () => ro.disconnect();
    }, []);

    /* ── 롤링 애니메이션 ── */
    useEffect(() => {
        if (!porterW || !listRef.current) return;
        aliveRef.current = true;

        const DURATION = 1.0;

        const roll = () => {
            if (!aliveRef.current) return;

            const ul = listRef.current;
            const prev = prevRef.current;
            const next = nextRef.current;
            if (!ul) return;

            const tl = gsap.timeline({
                onComplete: () => {
                    if (!aliveRef.current) return;

                    // prev/next 숨기기
                    if (prev) gsap.set(prev, { opacity: 0 });
                    if (next) gsap.set(next, { opacity: 0 });

                    // 오프셋 증가
                    offsetRef.current = (offsetRef.current + 1) % words.length;
                    const off = offsetRef.current;

                    // 데이터 갱신
                    setRows(buildRows(off));
                    setPorterWord(words[(off + PORTER_ROW) % words.length]);
                    setNextWord(words[(off + PORTER_ROW + 1) % words.length]);

                    // 위치 초기화
                    gsap.set(ul, { y: 0 });

                    spanRefs.current.forEach((s, idx) => {
                        if (!s) return;
                        if (idx === PORTER_ROW - 1) {
                            gsap.set(s, { opacity: 0, y: 0 });
                        } else {
                            gsap.set(s, { opacity: 1, y: 0 });
                        }
                    });

                    // React 리렌더 후 복원
                    requestAnimationFrame(() => {
                        const aboveSpan = spanRefs.current[PORTER_ROW - 1];
                        if (aboveSpan) {
                            gsap.to(aboveSpan, { opacity: 1, duration: 0.25, ease: 'sine.out' });
                        }
                        if (prev) gsap.set(prev, { x: 0, y: 0, scale: 1, opacity: 1 });
                        if (next) gsap.set(next, { x: 0, y: PORTER_H, scale: SCALE, opacity: 0 });
                    });

                    timerRef.current = setTimeout(roll, 3000);
                },
            });

            // 1) 스트립 전체 위로
            tl.to(ul, {
                y: -ITEM_H,
                duration: DURATION,
                ease: 'sine.inOut',
            }, 0);

            // 2) text-prev: 축소 + PORTER 옆에서 왼쪽으로 슬라이드 (위쪽 행에 안착)
            if (prev) {
                tl.to(prev, {
                    scale: SCALE,
                    x: -porterW,          // PORTER 너비만큼 왼쪽으로 (left:porterW → 시각적 left:0)
                    y: 0,                 // ul이 -50px 이동하므로 추가 y 불필요 (시각적 250-50=200=row4)
                    duration: DURATION,
                    ease: 'sine.inOut',
                    transformOrigin: 'left top',
                }, 0);
            }

            // 3) text-next: 아래에서 올라오며 커짐 → PORTER 옆에 안착
            if (next) {
                tl.fromTo(next,
                    {
                        y: PORTER_H,
                        x: -porterW,      // 왼쪽 정렬에서 시작
                        scale: SCALE,
                        opacity: 1,
                    },
                    {
                        y: ITEM_H,        // ul -50px + y 50px = 시각적으로 PORTER 위치(250px)
                        x: 0,             // PORTER 옆 위치로 이동
                        scale: 1,
                        opacity: 1,
                        duration: DURATION,
                        ease: 'sine.inOut',
                        transformOrigin: 'left top',
                    },
                    0,
                );
            }

            // 4) PORTER 바로 아래 행 — 즉시 숨김 (text-next와 겹침 방지)
            const belowSpan = spanRefs.current[PORTER_ROW];
            if (belowSpan) {
                gsap.set(belowSpan, { opacity: 0 });
            }

            // 5) 최상단 — 페이드아웃
            const topSpan = spanRefs.current[0];
            if (topSpan) {
                tl.to(topSpan, {
                    opacity: 0,
                    y: -8,
                    duration: DURATION * 0.6,
                    ease: 'sine.inOut',
                }, 0);
            }

            // 6) 최하단 — 페이드인
            const bottomSpan = spanRefs.current[spanRefs.current.length - 1];
            if (bottomSpan) {
                tl.fromTo(bottomSpan,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1, y: 0,
                        duration: DURATION * 0.8,
                        ease: 'sine.inOut',
                    },
                    DURATION * 0.2,
                );
            }
        };

        timerRef.current = setTimeout(roll, 3000);

        return () => {
            aliveRef.current = false;
            clearTimeout(timerRef.current);
            if (listRef.current) gsap.killTweensOf(listRef.current);
            spanRefs.current.forEach((s) => s && gsap.killTweensOf(s));
            if (prevRef.current) gsap.killTweensOf(prevRef.current);
            if (nextRef.current) gsap.killTweensOf(nextRef.current);
        };
    }, [porterW, buildRows]);

    /* ── 렌더링 ── */
    let spanIdx = 0;

    return (
        <div className="brand-story-content">
            <section className="brand-story">
                <div className="brand-story__left">
                    <div className="bs-porter" ref={porterRef}>PORTER</div>

                    <ul className="bs-word-list" ref={listRef}>
                        {rows.map((row, i) => {
                            if (row.isPorterRow) {
                                // PORTER 행 — 스페이서 + prev/next 텍스트
                                return (
                                    <li key={i} className="bs-word-list__item bs-word-list__item--porter-row">
                                        <span
                                            ref={prevRef}
                                            className="bs-text-prev"
                                            style={{ left: porterW + 'px' }}
                                        >
                                            {porterWord}
                                        </span>
                                        <span
                                            ref={nextRef}
                                            className="bs-text-next"
                                            style={{
                                                left: porterW + 'px',
                                                transform: `translateY(${PORTER_H}px) scale(${SCALE})`,
                                                transformOrigin: 'left top',
                                                opacity: 0,
                                            }}
                                        >
                                            {nextWord}
                                        </span>
                                    </li>
                                );
                            }

                            const refIdx = spanIdx++;
                            return (
                                <li key={i} className="bs-word-list__item">
                                    <span
                                        ref={(el) => (spanRefs.current[refIdx] = el)}
                                        className="bs-word-list__text"
                                    >
                                        {row.word}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
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
        </div>
    );
};

export default BrandStory;
