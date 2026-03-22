import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TrendingSection.scss';

gsap.registerPlugin(ScrollTrigger);

const trendItems = [
    {
        id: 1,
        name: 'SUH-Round',
        descKo: 'SUH DO HO, 어디를 가든 당신을 감싸는, 가장 작은 단위의 공간',
        descEn: 'The smallest space that surrounds you, wherever you go',
        collection: 'Explore Collection',
        collectionName: 'SUH-ROUND',
        src: '/images/kbrand/trend1.jpg',
        imgAlign: 'right',
    },
    {
        id: 2,
        name: 'Beyond the Norm',
        descKo: 'Sambypen - 클래식한 가치에 한 줄의 위트를 더해, 새롭게 재해석하다',
        descEn: 'Reinterpreting the classics with a stroke of wit',
        collection: 'Explore Collection',
        collectionName: 'BEYOND THE NORM',
        src: '/images/kbrand/trend2.jpg',
        imgAlign: 'left',
    },
    {
        id: 3,
        name: 'Trace of Vacuity',
        descKo: 'PARK SEO BO - 자연의 본질을 담기 위해 마음을 비우는 과정',
        descEn: 'Emptying the mind to capture the essence of nature',
        collection: 'Explore Collection',
        collectionName: 'TRACE OF VACUITY',
        src: '/images/kbrand/trend3.jpg',
        imgAlign: 'right',
    },
];

const TrendingSection = () => {
    const lineRefs = useRef([]);

    useEffect(() => {
        const triggers = [];

        lineRefs.current.forEach((line) => {
            if (!line) return;

            // 초기: scaleX 0 (라인 안 보임)
            gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

            // 뷰포트에 들어오면 좌→우로 채워짐
            const st = ScrollTrigger.create({
                trigger: line,
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(line, {
                        scaleX: 1,
                        duration: 1.4,
                        ease: 'power2.out',
                    });
                },
                onLeaveBack: () => {
                    gsap.to(line, {
                        scaleX: 0,
                        duration: 0.4,
                        ease: 'power2.in',
                    });
                },
            });

            triggers.push(st);
        });

        return () => triggers.forEach((t) => t.kill());
    }, []);

    return (
        <section className="trending">
            <div className="trending__inner">
                {/* 헤더 */}
                <div className="trending__header">
                    <h2 className="trending__title">TRENDING NOW</h2>
                    <p className="trending__sub">Right now from us for you, Enjoy.</p>
                </div>

                {/* 아이템 리스트 */}
                <div className="trending__list">
                    {trendItems.map((item, i) => (
                        <div
                            key={item.id}
                            className={`trending__item trending__item--img-${item.imgAlign}`}
                        >
                            {/* 텍스트 */}
                            <div className="trending__text-col">
                                <div className="trending__info">
                                    <h3 className="trending__name">{item.name}</h3>
                                    <div className="trending__desc">
                                        <p className="trending__desc-en">{item.descEn}</p>
                                        <p className="trending__desc-ko">{item.descKo}</p>
                                    </div>
                                    <div className="trending__meta">
                                        <span className="trending__collection">
                                            {item.collection}
                                        </span>
                                        {/* ref로 각 라인 참조 */}
                                        <span className="trending__line-wrap">
                                            <span className="trending__line-base" />{' '}
                                            {/* 얇은 라인 (항상 보임) */}
                                            <span
                                                className="trending__line"
                                                ref={(el) => (lineRefs.current[i] = el)}
                                            />{' '}
                                            {/* 두꺼운 라인 (애니메이션) */}
                                        </span>
                                        <span className="trending__col-name">
                                            {item.collectionName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 이미지 */}
                            <div className="trending__img-col">
                                <div className="trending__img-wrap">
                                    <img src={item.src} alt={item.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;
