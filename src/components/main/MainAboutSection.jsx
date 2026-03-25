import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './MainAboutSection.scss';

gsap.registerPlugin(ScrollTrigger);

const MainAboutSection = () => {
    const sectionRef = useRef(null);
    const mainTextRef = useRef(null);
    const mainText2Ref = useRef(null);
    const subTextRef = useRef(null);

    useEffect(() => {
        const mainText = mainTextRef.current;
        const mainText2 = mainText2Ref.current;
        const subText = subTextRef.current;

        if (!mainText || !mainText2 || !subText) return;

        gsap.set(mainText, { autoAlpha: 0, y: 50 });
        gsap.set(mainText2, { autoAlpha: 0, y: 50 });
        gsap.set(subText, { autoAlpha: 0, y: 50 });

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current.querySelector('.scroll-wrapper'),
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,
                    pin: false,
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                },
            });

            tl.to({}, { duration: 5 })
                .to(mainText, { autoAlpha: 1, y: -40, duration: 15 })
                .to({}, { duration: 5 })
                .to(mainText2, { autoAlpha: 1, y: -40, duration: 15 })
                .to({}, { duration: 5 })
                .to(subText, { autoAlpha: 1, y: -40, duration: 15 })
                .to({}, { duration: 20 })
                .to(mainText, { autoAlpha: 0, y: -150, duration: 15 })
                .to(mainText2, { autoAlpha: 0, y: -150, duration: 15 }, '-=10')
                .to(subText, { autoAlpha: 0, y: -150, duration: 15 }, '-=10')
                .to({}, { duration: 15 });
        }, sectionRef);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
            gsap.set([mainText, mainText2, subText], { clearProps: 'all' });
        };
    }, []);

    return (
        <section className="main-about-section" ref={sectionRef}>
            <div className="about-content">
                <div className="scroll-wrapper">
                    <div className="sticky-container">
                        <div className="background-image" />
                        <div className="text-layer">
                            <div className="main-text-wrap">
                                <h2 ref={mainTextRef} className="main-text-heading">
                                    The essence <br className="mobile-br" />
                                    <span className="thin">crafted by</span>
                                </h2>
                                <h2 ref={mainText2Ref} className="main-text-heading">
                                    master craftsmanship
                                </h2>
                            </div>
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
