import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MainAboutSection.scss';

gsap.registerPlugin(ScrollTrigger);

const MainAboutSection = () => {
    const sectionRef = useRef(null);
    const mainTextRef = useRef(null);
    const subTextRef = useRef(null);

    useEffect(() => {
        const mainText = mainTextRef.current;
        const subText = subTextRef.current;

        if (!mainText || !subText) return;

        // ✅ 스크롤 전 초기 상태를 명시적으로 설정
        // (opacity:0 / visibility:hidden 상태로 굳는 것을 방지)
        gsap.set(mainText, { autoAlpha: 0, y: 50 });
        gsap.set(subText, { autoAlpha: 0, y: 50 });

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    // 💡 가장 중요한 핵심: '화면에 고정되는(sticky)' 요소 자체를 기준으로 삼으면 스크롤 계산이 멈춰버립니다!
                    // 반드시 실제로 3000px 동안 부모 역할을 하며 스크롤되는 'scroll-wrapper'를 기준으로 삼아야 합니다.
                    trigger: sectionRef.current.querySelector('.scroll-wrapper'),
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    pin: false, // GSAP가 DOM을 복제해서 망가뜨리는 현상(ProductSection 중복 등)을 방지하기 위해 순수 CSS sticky만 사용
                    invalidateOnRefresh: true,
                    // 💡 앞선 3개의 TransitionSection(총 3600px)이 높이를 마음껏 늘려놓은 "이후"에
                    // 이 섹션의 좌표를 가장 마지막에 정확히 짚어내도록 우선순위를 제일 낮게(-1) 깔아둡니다.
                    refreshPriority: -1,
                },
            });

            tl.to({}, { duration: 5 })
                // ✅ ref 직접 사용 (전역 선택자 충돌 제거)
                .to(mainText, { autoAlpha: 1, y: 0, duration: 15 })
                .to({}, { duration: 5 })
                .to(subText, { autoAlpha: 1, y: 0, duration: 15 })
                .to({}, { duration: 25 })
                .to(mainText, { autoAlpha: 0, y: -150, duration: 15 })
                .to(subText, { autoAlpha: 0, y: -150, duration: 15 }, '-=10')
                .to({}, { duration: 15 });
        }, sectionRef);

        // ✅ 레이아웃이 안정된 뒤 refresh (폰트·이미지 로딩 여유 포함)
        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
            // ✅ cleanup 시 인라인 스타일 완전 제거 (Strict Mode 재마운트 대비)
            gsap.set([mainText, subText], { clearProps: 'all' });
        };
    }, []);

    return (
        <section className="main-about-section" ref={sectionRef}>
            <div className="about-content">
                <div className="scroll-wrapper">
                    <div className="sticky-container">
                        <div className="background-image" />
                        <div className="text-layer">
                            <img
                                ref={mainTextRef}
                                src="/images/main/mainabouttxt1.png"
                                alt="PORTER ESSENCE"
                                className="main-text-img"
                            />
                            <p ref={subTextRef} className="sub-title">
                                <span>장인의 손길로 완성한 본질 :</span> 가방 그 이상의 가치
                            </p>
                        </div>
                    </div>
                </div>

                <div className="orange-box">
                    <div className="left-text">
                        <h2>THE SINGLE STITCH</h2>
                        <p className="explore-text">Explore About PORTER</p>
                    </div>
                    <div className="right-text">
                        <h3 className="title-ko">
                            일침입혼(一針入魂), 한 땀에 담은 타협 없는 장인 정신
                        </h3>
                        <p className="desc-ko">
                            1962년부터 이어져 온 요시다 가방의 철학은 진정한 포터(PORTER)의 본질이자
                            기술력
                            <br />
                            의 정점입니다. 단순한 가방을 넘어, 사용자의 일상과 함께 호흡하고
                            진화하며 고유한 가<br />
                            치를 더해가는 <span className="bold-text">영원한 동반자</span>를
                            만듭니다. 보이지 않는 디테일에서 완성되는 시대를 초월
                            <br />한 <span className="bold-text">모던 기능주의</span>. 당신의 평생을
                            함께할 <span className="bold-text">완벽한 '삶의 도구'</span>를 경험해
                            보세요.
                        </p>
                        <p className="desc-en">
                            Since 1962, Yoshida Kaban's philosophy has defined the true essence of
                            PORTER. More than just a<br />
                            bag, it is a lifelong companion that evolves with your everyday journey.
                            Timeless modern
                            <br />
                            functionalism born from invisible details. Discover the perfect 'Tool
                            for Life'
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainAboutSection;
