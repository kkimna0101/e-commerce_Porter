import React, { useRef, useEffect } from 'react';
import './PorterSection.scss';
import useScrollStagger from '../../hooks/useScrollStagger';

const productList = [
    {
        id: 1,
        src: '/images/main/main_porter05.png',
        width: 570,
        height: 590,
        boxClass: 'box-top-left',
    },
    {
        id: 2,
        src: '/images/main/main_porter06.png',
        width: 1080,
        height: 690,
        boxClass: 'box-top-right',
    },
    {
        id: 3,
        src: '/images/main/main_porter07.png',
        width: 726,
        height: 736,
        boxClass: 'box-bot-left',
    },
    {
        id: 4,
        src: '/images/main/main_porter08.png',
        width: 726,
        height: 736,
        boxClass: 'box-bot-right',
    },
];

const PorterSection = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    useScrollStagger(sectionRef, '.product-box');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                        }
                    } else {
                        if (videoRef.current) {
                            videoRef.current.pause();
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <section className="main-porter-section" ref={sectionRef}>
            <div className="main-porter-container">

                {/* main-porter-header-content 제거 → TransitionSection으로 이동 */}

                {/* 브랜드 텍스트 (TransitionSection 이후 첫 콘텐츠) */}
                <div className="main-porter-brand-text">
                    <p className="main-porter-desc">
                        시대가 흘러도 변하지 않는 일침입혼의 정수
                    </p>
                    <p className="main-porter-sub-desc">
                        1962년 시작된 포터는 <span>'일침입혼(一針入魂)'</span> 정신을 계승하는
                        요시다 가방의 메인 브랜드로 상징적인 탠커 시리즈와 견고한 나일론 본딩
                        소재는 시대를 초월한 신뢰를 약속하며 상징적인 탠커 시리즈와 견고한
                        나일론본딩 소재는 시대를 초월한 신뢰를 약속합니다.
                    </p>
                    <p className="main-porter-sub-desc-m">
                        단순히 가방을 넘어, 세월이 흐를수록 당신의 일상에 깊게 스며드는 영속적인
                        동반자를 지향합니다.
                    </p>
                    <div className="view-more">
                        <span>VIEW MORE</span>
                        <div className="line"></div>
                        <span>PRODUCT</span>
                    </div>
                </div>

                {/* 스크롤 텍스트 및 상품 리스트 */}
                <div className="sticky-container">
                    <div className="sticky-text">
                        <h2>
                            Timeless Mastery
                            <br />
                            <span className="thin">Woven in</span>Every Stitch{' '}
                        </h2>
                        <p>한 땀의 바느질에 새겨진 시대를 초월한 숙련미</p>
                    </div>
                    <div className="product-grid">
                        {productList.map((item) => (
                            <div key={item.id} className={`product-box ${item.boxClass}`}>
                                <img
                                    src={item.src}
                                    alt={`Product ${item.id}`}
                                    width={item.width}
                                    height={item.height}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단 영역 */}
                <div className="bottom-content">
                    <div className="bottom-left">
                        <img
                            src="/images/main/main_porter09.png"
                            alt="main_porter_image"
                            width="930"
                            height="779"
                        />
                    </div>
                    <div className="bottom-right">
                        <img
                            src="/images/main/main_porter10.png"
                            alt="main_porter_image"
                            width="520"
                            height="338"
                        />
                        <img
                            src="/images/main/main_porter11.png"
                            alt="POTR"
                            width="122"
                            height="50"
                            className="ll-logo"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PorterSection;