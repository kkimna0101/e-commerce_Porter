import React, { useRef, useEffect, useCallback } from 'react';
import './BrandStory.scss';

const BrandStory = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const rafRef = useRef(null);

    const update = useCallback(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        if (!section || !text) return;

        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const scrolled = headerHeight - rect.top;

        const baseSize = 260;
        const minSize = 120;
        const scaleMin = minSize / baseSize;

        if (scrolled < 0) {
            text.style.transform = `translateY(0px) scale(${scaleMin})`;
            return;
        }

        const progress = Math.min(scrolled / sectionHeight, 1);
        let scaleValue;
        if (progress <= 0.5) {
            scaleValue = scaleMin + (1 - scaleMin) * (progress / 0.5);
        } else if (progress <= 0.95) {
            scaleValue = 1 - (1 - scaleMin) * ((progress - 0.5) / 0.45);
        } else {
            scaleValue = scaleMin;
        }

        // 실제 보이는 텍스트 높이 = offsetHeight * 현재 scale
        const visibleTextHeight = text.offsetHeight * scaleValue;
        const maxTop = sectionHeight - visibleTextHeight - 50;
        const topValue = Math.min(scrolled, maxTop);

        text.style.transform = `translateY(${topValue}px) scale(${scaleValue.toFixed(4)})`;
    }, []);

    const handleScroll = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
    }, [update]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll, update]);

    return (
        <section className="brand-story-final" ref={sectionRef}>
            <div className="bg-image-wrap">
                <img
                    src="/images/productdetail/brandstory1.png"
                    alt="bg-logo"
                />
            </div>

            <h2 className="title-text" ref={textRef}>
                YOSHIDA & CO.LTD<br />
                株式会社吉田
            </h2>
        </section>
    );
};

export default BrandStory;