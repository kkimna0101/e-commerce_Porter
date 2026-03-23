import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TransitionPotrToLL.scss';

gsap.registerPlugin(ScrollTrigger);

const TransitionPotrToLL = () => {
    const sectionRef  = useRef(null);
    const bgRef       = useRef(null);
    const leftTopRef  = useRef(null);
    const rightTopRef = useRef(null);

    useEffect(() => {
        const section  = sectionRef.current;
        const bgEl     = bgRef.current;
        const leftImg  = leftTopRef.current;
        const rightImg = rightTopRef.current;

        if (!section || !bgEl || !leftImg || !rightImg) return;

        let tl;

        const raf = requestAnimationFrame(() => {
            ScrollTrigger.refresh();

            const sectionH = section.offsetHeight;

            const getRelativeRect = (el) => {
                const sRect = section.getBoundingClientRect();
                const eRect = el.getBoundingClientRect();
                const top   = eRect.top - sRect.top;
                return { top, bottom: top + eRect.height, height: eRect.height };
            };

            const leftCache  = getRelativeRect(leftImg);
            const rightCache = getRelativeRect(rightImg);

            const updateClip = (el, cache, bgTopEdge) => {
                let pct;
                if (bgTopEdge >= cache.bottom)   pct = 0;
                else if (bgTopEdge <= cache.top) pct = 100;
                else pct = ((cache.bottom - bgTopEdge) / cache.height) * 100;
                gsap.set(el, { clipPath: `inset(0 0 ${pct}% 0)` });
            };

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=1200',
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onRefresh() {
                        const l = getRelativeRect(leftImg);
                        const r = getRelativeRect(rightImg);
                        Object.assign(leftCache, l);
                        Object.assign(rightCache, r);
                    },
                },
            });

            // 노란 배경이 아래→위로 슬라이드 (white → yellow 전환)
            tl.fromTo(bgEl,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    force3D: true,
                    onUpdate() {
                        const yPct      = gsap.getProperty(bgEl, 'yPercent');
                        const bgTopEdge = (yPct / 100) * sectionH;
                        updateClip(leftImg,  leftCache,  bgTopEdge);
                        updateClip(rightImg, rightCache, bgTopEdge);
                    },
                },
                0
            );
        });

        return () => {
            cancelAnimationFrame(raf);
            if (tl) {
                tl.scrollTrigger?.kill();
                tl.kill();
            }
        };
    }, []);

    return (
        <section className="tp2ll-section" ref={sectionRef}>

            {/* 노란 배경이 아래서 올라옴 (LLSection 색상) */}
            <div className="tp2ll-bg" ref={bgRef} />

            <div className="tp2ll-content">

                {/* 좌측: 작은 이미지 스택 */}
                <div className="tp2ll-left">
                    <div className="tp2ll-img-stack">
                        {/* 하단: Potr bottom-left */}
                        <div className="tp2ll-img-card">
                            <img src="/images/main/mainpotrimage6.png" alt="Potr" />
                        </div>
                        {/* 상단: LL left-col 이미지 — clip으로 리빌 */}
                        <div className="tp2ll-img-card tp2ll-img-card--top" ref={leftTopRef}>
                            <img src="/images/main/mainluggageimage1.png" alt="Luggage Label" />
                        </div>
                    </div>

                    {/* LL 로고: 노란 bg가 올라오면 자연스럽게 나타남 */}
                    <img
                        src="/images/main/mainlltxt2.png"
                        alt="LUGGAGE LABEL"
                        className="tp2ll-logo"
                    />
                </div>

                {/* 우측: 큰 이미지 스택 */}
                <div className="tp2ll-right">
                    <div className="tp2ll-img-stack tp2ll-img-stack--right">
                        {/* 하단: Potr bottom-right */}
                        <div className="tp2ll-img-card">
                            <img src="/images/main/mainpotrimage7.png" alt="Potr" />
                        </div>
                        {/* 상단: LL right-col 이미지 — clip으로 리빌 */}
                        <div className="tp2ll-img-card tp2ll-img-card--top" ref={rightTopRef}>
                            <img src="/images/main/mainluggageimage2.png" alt="Luggage Label" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TransitionPotrToLL;
