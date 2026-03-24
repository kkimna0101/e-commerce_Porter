import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutHero.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
    const wrapRef = useRef(null);
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const bgTxtRef = useRef(null); 

    useEffect(() => {
        const wrap = wrapRef.current;
        const title = titleRef.current;
        const body = bodyRef.current;
        const bgTxt = bgTxtRef.current; 

        if (!wrap || !title || !body || !bgTxt) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrap,
                    start: 'top top',
                    end: '+=2000', 
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(title, { y: -450, color: '#ff5f00', duration: 1 }, 0)
              .to(body, { y: -450, duration: 1 }, 0)
              .to(bgTxt, { y: -450, duration: 1 }, 1);
        }, wrapRef);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, []);

    return (
            <div className="about-hero" ref={wrapRef}>
                
                <div ref={bgTxtRef} className="about-hero__bg-txt">
                    <img src="/images/about/about_hero_txt.png" alt="background text" />
                </div>

                <div className="about-hero__content">
                    <h1 ref={titleRef} className="about-hero__title">
                        ABOUT OUR<br />
                        YOSHIDA & CO.
                    </h1>
                    <div ref={bodyRef} className="about-hero__body">
                        <p className="about-hero__sub">
                            포터(<span className="en">PORTER</span>)는 1935년 가방 장인 요시다 기치조가 설립한<br />
                            요시다 컴퍼니(<span className="en">YOSHIDA & CO.</span>)에서 1962년에 발표한 자체 브랜드입니다.
                        </p>
                        <p className="about-hero__desc">
                            이 브랜드는 '바늘 한 땀 한 땀에 영혼을 담는다'는 '일침입혼(一針入魂)'의 장인 정신을 바탕으로 전개됩니다.<br />
                            포터는 무엇보다 '물건을 운반하는 도구'라는 가방의 기본적인 본질을 최우선으로 여깁니다.<br />
                            모든 제작 과정은 숙련된 장인들의 눈과 손을 거쳐 완성되며, 현대적인 디자인에 뛰어난 기술력과 기능성을 결합했습니다.<br />
                            사용하면 할수록 감탄을 자아내는 내구성과 실용성을 모두 겸비한 가방 브랜드로 널리 인정받고 있습니다.
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default AboutHero;