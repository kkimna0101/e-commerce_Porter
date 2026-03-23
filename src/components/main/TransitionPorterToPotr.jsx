import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TransitionPorterToPotr.scss';

gsap.registerPlugin(ScrollTrigger);

const LETTERS = [
    {
        id: 'P',
        d: 'M48.4062 122.14H19.3234V91.3199H48.4062C52.5051 91.3199 55.8232 90.1362 58.3606 87.7687C60.8981 85.4012 62.7523 82.1459 63.9234 78.0028C65.0946 73.7751 65.6801 69.0401 65.6801 63.7978C65.6801 58.471 65.0946 53.4824 63.9234 48.8319C62.7523 44.1815 60.8981 40.4612 58.3606 37.6709C55.8232 34.7961 52.5051 33.3587 48.4062 33.3587H28.5948V187.203H0V2.53906H48.4062C57.9703 2.53906 66.1681 5.16021 72.9996 10.4025C79.8962 15.6448 85.1987 22.8741 88.9073 32.0904C92.6158 41.2221 94.4701 51.7067 94.4701 63.5442C94.4701 75.4662 92.6158 85.8239 88.9073 94.6175C85.1987 103.326 79.8962 110.091 72.9996 114.91C66.1681 119.73 57.9703 122.14 48.4062 122.14Z',
    },
    {
        id: 'O',
        d: 'M202.65 80.5369V111.357C202.65 124.378 201.413 135.792 198.941 145.601C196.534 155.324 193.086 163.484 188.596 170.079C184.172 176.589 178.804 181.493 172.493 184.791C166.247 188.089 159.318 189.737 151.706 189.737C144.094 189.737 137.132 188.089 130.821 184.791C124.575 181.493 119.175 176.589 114.621 170.079C110.131 163.484 106.651 155.324 104.178 145.601C101.706 135.792 100.47 124.378 100.47 111.357V80.5369C100.47 67.1775 101.673 55.5092 104.081 45.5319C106.488 35.4701 109.969 27.0993 114.523 20.4196C119.077 13.6553 124.478 8.58215 130.724 5.20002C136.97 1.73334 143.899 0 151.511 0C159.123 0 166.052 1.73334 172.298 5.20002C178.544 8.58215 183.944 13.6553 188.499 20.4196C193.053 27.0993 196.534 35.4701 198.941 45.5319C201.413 55.5092 202.65 67.1775 202.65 80.5369ZM174.25 111.357V80.2832C174.25 71.4897 173.762 64.0068 172.786 57.8344C171.81 51.5774 170.346 46.462 168.394 42.488C166.443 38.514 164.068 35.5969 161.27 33.7367C158.473 31.8765 155.219 30.9465 151.511 30.9465C147.802 30.9465 144.517 31.8765 141.654 33.7367C138.856 35.5969 136.482 38.514 134.53 42.488C132.643 46.462 131.212 51.5774 130.236 57.8344C129.325 64.0068 128.869 71.4897 128.869 80.2832V111.357C128.869 119.812 129.357 127.041 130.333 133.044C131.309 139.048 132.773 143.952 134.725 147.757C136.677 151.562 139.052 154.394 141.849 156.254C144.712 158.03 147.998 158.918 151.706 158.918C155.35 158.918 158.57 158.03 161.368 156.254C164.231 154.394 166.605 151.562 168.492 147.757C170.379 143.952 171.81 139.048 172.786 133.044C173.762 127.041 174.25 119.812 174.25 111.357Z',
    },
    {
        id: 'T',
        d: 'M271.696 2.53906V187.203H243.296V2.53906H271.696ZM307.024 2.53906V33.3587H208.65V2.53906H307.024Z',
    },
    {
        id: 'R',
        d: 'M313.023 2.53906H358.599C368.098 2.53906 376.199 4.65289 382.9 8.88055C389.601 13.1082 394.741 19.3651 398.32 27.6514C401.898 35.9376 403.687 46.1685 403.687 58.3442C403.687 68.3214 402.646 76.8613 400.564 83.9638C398.482 90.9817 395.522 96.8581 391.683 101.593C387.845 106.244 383.258 109.964 377.923 112.754L369.237 119.476H332.249L332.152 88.6565H357.819C361.722 88.6565 364.943 87.5573 367.48 85.3589C370.083 83.076 372.002 79.9052 373.238 75.8467C374.54 71.7036 375.19 66.884 375.19 61.3881C375.19 55.5539 374.605 50.5653 373.434 46.4222C372.328 42.1945 370.538 38.9815 368.066 36.7831C365.659 34.5002 362.503 33.3587 358.599 33.3587H341.618V187.203H313.023V2.53906ZM377.532 187.203L351.475 104.891L381.436 104.764L408.079 185.428V187.203H377.532Z',
    },
];

const INIT_SCALE = 50 / 190;

const TransitionPorterToPotr = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const leftTopRef = useRef(null);
    const rightImgTopRef = useRef(null);
    const letterRefs = useRef([]);
    const videoRef = useRef(null); // 💡 비디오 전용 ref 추가

    useEffect(() => {
        const section = sectionRef.current;
        const bgEl = bgRef.current;
        const leftTop = leftTopRef.current;
        const rightImgTop = rightImgTopRef.current;
        const letters = letterRefs.current.filter(Boolean);
        const videoEl = videoRef.current; // 💡 비디오 엘리먼트 가져오기

        if (!section || !bgEl || !leftTop || !rightImgTop || letters.length === 0) return;

        // 💡여기에 IntersectionObserver 추가
        const options = { root: null, threshold: 0 }; // 💡 threshold를 0으로 설정하여 한 픽셀이라도 화면에 들어오면 바로 재생
        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (videoEl) {
                    // 비디오 엘리먼트가 존재할 때만
                    if (entry.isIntersecting) {
                        videoEl.play(); // 화면에 들어오면 재생
                    } else {
                        videoEl.pause(); // 화면에서 나가면 정지
                    }
                }
            });
        };
        const observer = new IntersectionObserver(observerCallback, options);
        if (videoEl) {
            observer.observe(videoEl); // 비디오 엘리먼트 감시 시작
        }

        gsap.set([leftTop, rightImgTop], { clipPath: 'inset(0 0 100% 0)' });

        letters.forEach((el) => {
            gsap.set(el, {
                scale: INIT_SCALE,
                svgOrigin: '409 190',
                force3D: true,
            });
        });

        let tl;

        const raf = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            const sectionH = section.offsetHeight;
            const getRelativeRect = (el) => {
                const sRect = section.getBoundingClientRect();
                const eRect = el.getBoundingClientRect();
                const top = eRect.top - sRect.top;
                return { top, bottom: top + eRect.height, height: eRect.height };
            };

            const leftCache = getRelativeRect(leftTop);
            const rightImgCache = getRelativeRect(rightImgTop);

            const updateClip = (el, cache, bgTopEdge) => {
                let pct;
                if (bgTopEdge >= cache.bottom) pct = 0;
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
                        Object.assign(leftCache, getRelativeRect(leftTop));
                        Object.assign(rightImgCache, getRelativeRect(rightImgTop));
                    },
                },
            });

            tl.fromTo(
                bgEl,
                { yPercent: 100 },
                {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    force3D: true,
                    onUpdate() {
                        const yPct = gsap.getProperty(bgEl, 'yPercent');
                        const bgTopEdge = (yPct / 100) * sectionH;
                        updateClip(leftTop, leftCache, bgTopEdge);
                        updateClip(rightImgTop, rightImgCache, bgTopEdge);
                    },
                },
                0
            );

            tl.to(
                letters,
                {
                    scale: 1,
                    svgOrigin: '409 190',
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power1.inOut',
                    force3D: true,
                },
                0.1
            );
        });

        return () => {
            cancelAnimationFrame(raf);
            if (tl) {
                tl.scrollTrigger?.kill();
                tl.kill();
            }
            if (observer && videoEl) {
                observer.unobserve(videoEl); // 💡cleanup 함수에 unobserve 추가
            }
        };
    }, []);

    return (
        <section className="tp2p-section" ref={sectionRef}>
            <div className="tp2p-bg" ref={bgRef} />

            <div className="tp2p-content">
                <div className="tp2p-left">
                    <div className="tp2p-img-layer">
                        <img src="/images/main/mainpotrimage1.png" alt="Potr" />
                    </div>
                    <div className="tp2p-img-layer tp2p-img-layer--clip" ref={leftTopRef}>
                        <img src="/images/main/main_porter09.png" alt="Porter" />
                    </div>
                </div>

                <div className="tp2p-right">
                    <div className="tp2p-right-img">
                        <div className="tp2p-img-layer">
                            <video
                                ref={videoRef} // 💡 ref 연결
                                src="/videos/mainanimation1.mp4"
                                muted
                                // 💡 autoPlay는 제거 (감시자가 제어)
                                loop
                                playsInline
                            />
                        </div>
                        <div className="tp2p-img-layer tp2p-img-layer--clip" ref={rightImgTopRef}>
                            <img src="/images/main/main_porter10.png" alt="Porter" />
                        </div>
                    </div>

                    <div className="tp2p-logo-area">
                        <svg
                            width="409"
                            height="190"
                            viewBox="0 0 409 190"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="tp2p-logo-svg"
                        >
                            {LETTERS.map((letter, i) => (
                                <g key={letter.id} ref={(el) => (letterRefs.current[i] = el)}>
                                    <path d={letter.d} fill="black" />
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransitionPorterToPotr;
