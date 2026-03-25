import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Transitionsection.scss';

gsap.registerPlugin(ScrollTrigger);

const CONTAINER_SCALE = 590 / 120;

const LETTER_PATHS = [
    { id: 'P', d: 'M48.632 154.923H20.7739V112.172H48.632C51.8869 112.172 54.5036 110.857 56.4821 108.228C58.5244 105.599 59.9922 101.971 60.8857 97.3432C61.8431 92.6106 62.3217 87.2995 62.3217 81.41C62.3217 75.0999 61.8431 69.263 60.8857 63.8993C59.9922 58.5357 58.5244 54.2238 56.4821 50.9635C54.5036 47.5981 51.8869 45.9154 48.632 45.9154H32.7405V232.854H0V3.16406H48.632C58.2691 3.16406 66.5659 6.52948 73.5224 13.2603C80.5428 19.9912 85.9357 29.2461 89.7012 41.025C93.5305 52.6988 95.4451 66.0553 95.4451 81.0945C95.4451 95.9234 93.5305 108.859 89.7012 119.902C85.9357 130.945 80.5428 139.569 73.5224 145.774C66.5659 151.873 58.2691 154.923 48.632 154.923Z' },
    { id: 'O', d: 'M204.254 100.805V135.511C204.254 152.022 203.01 166.536 200.521 179.051C198.032 191.566 194.489 202.083 189.894 210.602C185.299 219.015 179.842 225.378 173.524 229.69C167.27 233.897 160.313 236 152.654 236C144.932 236 137.912 233.897 131.593 229.69C125.275 225.378 119.818 219.015 115.223 210.602C110.628 202.083 107.086 191.566 104.597 179.051C102.108 166.536 100.863 152.022 100.863 135.511V100.805C100.863 84.2932 102.108 69.7273 104.597 57.1069C107.086 44.4866 110.596 33.9697 115.127 25.5561C119.723 17.1426 125.179 10.7799 131.498 6.46791C137.816 2.15597 144.836 0 152.559 0C160.217 0 167.206 2.15597 173.524 6.46791C179.906 10.7799 185.363 17.1426 189.894 25.5561C194.426 33.9697 197.936 44.4866 200.425 57.1069C202.978 69.7273 204.254 84.2932 204.254 100.805ZM171.035 135.511V100.489C171.035 90.1827 170.652 81.4011 169.886 74.1444C169.12 66.8877 167.972 60.9982 166.44 56.4759C164.908 51.9537 162.994 48.6408 160.696 46.5374C158.398 44.434 155.686 43.3824 152.559 43.3824C149.304 43.3824 146.528 44.434 144.23 46.5374C141.932 48.6408 140.018 51.9537 138.486 56.4759C137.018 60.9982 135.933 66.8877 135.231 74.1444C134.529 81.4011 134.178 90.1827 134.178 100.489V135.511C134.178 145.712 134.529 154.441 135.231 161.698C135.933 168.849 137.018 174.739 138.486 179.366C140.018 183.994 141.964 187.412 144.326 189.62C146.687 191.724 149.463 192.775 152.654 192.775C155.718 192.775 158.398 191.724 160.696 189.62C163.057 187.412 164.972 183.994 166.44 179.366C167.972 174.739 169.12 168.849 169.886 161.698C170.652 154.441 171.035 145.712 171.035 135.511Z' },
    { id: 'R1', d: 'M211.588 3.16406H259.263C268.581 3.16406 276.654 5.7933 283.483 11.0518C290.312 16.3102 295.545 24.0928 299.183 34.3994C302.885 44.7059 304.735 57.4314 304.735 72.5758C304.735 85.722 303.714 96.7122 301.672 105.546C299.694 114.381 296.885 121.69 293.248 127.474C289.61 133.153 285.334 137.833 280.419 141.514L269.793 151.768H232.362L232.17 109.017H258.497C261.496 109.017 263.985 107.755 265.964 105.231C267.942 102.707 269.41 99.1311 270.368 94.5036C271.389 89.771 271.899 84.1444 271.899 77.6239C271.899 70.9983 271.421 65.3191 270.463 60.5865C269.506 55.8539 268.102 52.2256 266.251 49.7015C264.464 47.1774 262.135 45.9154 259.263 45.9154H244.328V232.854H211.588V3.16406ZM273.335 232.854L248.636 131.26L283.291 130.945L308.469 230.488V232.854H273.335Z' },
    { id: 'T', d: 'M368.932 3.16406V232.854H336.096V3.16406H368.932ZM402.726 3.16406V45.9154H303.26V3.16406H402.726Z' },
    { id: 'E', d: 'M489.424 190.26V232.854H428.442V190.26H489.424ZM439.834 3.16406V232.854H407.094V3.16406H439.834ZM481.478 94.3459V135.52H428.442V94.3459H481.478ZM489.711 3.16406V45.9154H428.442V3.16406H489.711Z' },
    { id: 'R2', d: 'M493.119 3.16406H540.794C550.112 3.16406 558.185 5.7933 565.014 11.0518C571.843 16.3102 577.076 24.0928 580.714 34.3994C584.416 44.7059 586.267 57.4314 586.267 72.5758C586.267 85.722 585.246 96.7122 583.203 105.546C581.225 114.381 578.417 121.69 574.779 127.474C571.141 133.153 566.865 137.833 561.951 141.514L551.324 151.768H513.893L513.702 109.017H540.028C543.028 109.017 545.517 107.755 547.495 105.231C549.474 102.707 550.941 99.1311 551.899 94.5036C552.92 89.771 553.43 84.1444 553.43 77.6239C553.43 70.9983 552.952 65.3191 551.995 60.5865C551.037 55.8539 549.633 52.2256 547.782 49.7015C545.995 47.1774 543.666 45.9154 540.794 45.9154H525.86V232.854H493.119V3.16406ZM554.866 232.854L530.168 131.26L564.823 130.945L590 230.488V232.854H554.866Z' },
];

const LETTER_ORIGINS = ['0px 236px', '100px 236px', '211px 236px', '303px 236px', '407px 236px', '493px 236px'];

const TransitionSection = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const leftTopRef = useRef(null);
    const rightTopRef = useRef(null);
    const svgRef = useRef(null);
    const letterRefs = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const bgEl = bgRef.current;
        const leftImg = leftTopRef.current;
        const rightImg = rightTopRef.current;
        const svgEl = svgRef.current;
        const letters = letterRefs.current.filter(Boolean);

        if (!section || !bgEl || !leftImg || !rightImg || !svgEl) return;

        // 태블릿/모바일: scale 4.917배가 화면을 초과하므로 애니메이션 스킵
        if (window.innerWidth <= 1023) {
            gsap.set(bgEl, { yPercent: 0 });
            gsap.set(leftImg, { clipPath: 'inset(0 0 0% 0)' });
            gsap.set(rightImg, { clipPath: 'inset(0 0 0% 0)' });
            return;
        }

        // 데스크탑
        gsap.set(letters, { scale: 1, opacity: 1 });

        const ctx = gsap.context(() => {
            const sectionH = section.offsetHeight;

            const getRelativeRect = (el) => {
                const sRect = section.getBoundingClientRect();
                const eRect = el.getBoundingClientRect();
                return {
                    top: eRect.top - sRect.top,
                    bottom: eRect.top - sRect.top + eRect.height,
                    height: eRect.height,
                };
            };

            const updateClip = (el, cache, bgTopEdge) => {
                let pct =
                    bgTopEdge >= cache.bottom
                        ? 0
                        : bgTopEdge <= cache.top
                          ? 100
                          : ((cache.bottom - bgTopEdge) / cache.height) * 100;
                gsap.set(el, { clipPath: `inset(0 0 ${pct}% 0)` });
            };

            let leftCache = getRelativeRect(leftImg);
            let rightCache = getRelativeRect(rightImg);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=1200',
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onRefresh() {
                        leftCache = getRelativeRect(leftImg);
                        rightCache = getRelativeRect(rightImg);
                    },
                },
            });

            tl.fromTo(
                bgEl,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 1,
                    ease: 'none',
                    onUpdate() {
                        const yPct = gsap.getProperty(bgEl, 'yPercent');
                        const bgTopEdge = (yPct / 100) * sectionH;
                        updateClip(leftImg, leftCache, bgTopEdge);
                        updateClip(rightImg, rightCache, bgTopEdge);
                    },
                },
                0
            );

            [...letters].reverse().forEach((el, i) => {
                const originalIndex = letters.indexOf(el);
                const originX = parseFloat(LETTER_ORIGINS[originalIndex]);
                tl.to(
                    el,
                    {
                        x: originX * (CONTAINER_SCALE - 1),
                        scale: CONTAINER_SCALE,
                        transformOrigin: 'left bottom',
                        duration: 0.8,
                        ease: 'power2.out',
                    },
                    i * 0.02
                );
            });
        }, sectionRef.current);

        const handleRefresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleRefresh);
        const timeoutId = setTimeout(handleRefresh, 500);

        return () => {
            ctx.revert();
            window.removeEventListener('load', handleRefresh);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section className="ts-section" ref={sectionRef}>
            <div className="ts-bg" ref={bgRef} />
            <div className="ts-content">
                <div className="ts-left">
                    <div className="ts-img-stack">
                        <div className="ts-img-card">
                            <img src="/images/main/main_porter03.png" alt="porter_character" />
                        </div>
                        <div className="ts-img-card ts-img-card--top" ref={leftTopRef}>
                            <img src="/images/main/main_porter01.png" alt="porter_character" />
                        </div>
                    </div>
                    <svg
                        ref={svgRef}
                        width="120"
                        height="48"
                        viewBox="0 0 590 236"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ts-porter-svg"
                    >
                        {LETTER_PATHS.map((letter, i) => (
                            <g key={letter.id} ref={(el) => (letterRefs.current[i] = el)}>
                                <path d={letter.d} fill="#838E4F" />
                            </g>
                        ))}
                    </svg>
                </div>
                <div className="ts-right">
                    <div className="ts-img-stack ts-img-stack--right">
                        <div className="ts-img-card">
                            <video src="/videos/Main_PORTER.mp4" muted autoPlay loop playsInline />
                        </div>
                        <div className="ts-img-card ts-img-card--top" ref={rightTopRef}>
                            <img src="/images/main/main_porter02.png" alt="porter" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransitionSection;