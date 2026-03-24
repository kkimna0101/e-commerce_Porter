import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSlogan.scss';

gsap.registerPlugin(ScrollTrigger);

const AboutSlogan = () => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const textBoxRef = useRef(null);

    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {char}
            </span>
        ));
    };

    useEffect(() => {
        const section = sectionRef.current;
        const img = imgRef.current;
        const textBox = textBoxRef.current;
        
        const bottomChars = gsap.utils.toArray(textBox.querySelectorAll('.line-bottom .char'));
        const topChars = gsap.utils.toArray(textBox.querySelectorAll('.line-top .char'));
        const chars = [...bottomChars, ...topChars];

        if (!section || !img || !chars.length) return;

        let ctx = gsap.context(() => {
            gsap.set(img, { filter: 'grayscale(100%)' });
            gsap.set(chars, { color: '#000000' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top', 
                    end: '+=2500', 
                    scrub: 1, 
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            const totalChars = chars.length;
            const staggerDuration = 0.03;
            const baseDuration = 2;
            const totalTextDuration = baseDuration + (totalChars - 1) * staggerDuration;

            tl.to(chars, {
                fontSize: '170px',
                color: '#5d675b',
                stagger: staggerDuration, 
                duration: baseDuration,
                ease: 'none'
            }, 0)
            .to(img, { 
                filter: 'grayscale(0%)', 
                duration: totalTextDuration, 
                ease: 'none' 
            }, 0);
            
        }, sectionRef);

        const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, []);

    return (
        <section className="about-slogan" ref={sectionRef}>
            <div className="slogan-container">

                <div className="slogan-image-wrap">
                    <img 
                        ref={imgRef} 
                        src="/images/about/about_hero_bg.png" 
                        alt="Yoshida craftsman" 
                    />
                </div>

                <div className="slogan-text-box" ref={textBoxRef}>
                    <div className="slogan-line line-top">
                        {splitText('YOSHIDA & CO.')}
                    </div>
                    <div className="slogan-line line-bottom">
                        {splitText('一針入魂')}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSlogan;