import React from 'react';
import './NewArrivalsSection.scss';

const NewArrivalsSection = () => {
    return (
        <section className="new-arrivals">
            <div className="new-arrivals__inner">
                {/* 스티키 텍스트 */}
                <div className="new-arrivals__sticky">
                    <h1 className="na-headline">
                        New Arrivals <span className="na-eyebrow">Defined</span>
                    </h1>

                    <p className="na-headline">
                        <span className="na-eyebrow">by </span>KOREA ONLY
                    </p>
                    <p className="na-kosub">한국에서만 마주하는 독보적인 브랜드 아이덴티티</p>
                </div>

                {/*
                    사진 그리드
                    - 텍스트 뒤에서 스크롤
                    - margin-top: -92px (translateY(-50%) 보정, LLSection 동일)
                    - padding-bottom: 섹션 끝 조정
                      img3 bottom 에서 20px 위에서 텍스트가 멈추도록
                */}
                <div className="new-arrivals__photos">
                    {/* 상단 행: img1 + img2 */}
                    <div className="na-row-top">
                        <div className="na-img na-img--1">
                            <img src="/images/kbrand/arrivals1.png" alt="New Arrivals 1" />
                        </div>
                        <div className="na-img na-img--2">
                            <img src="/images/kbrand/arrivals2.png" alt="New Arrivals 2" />
                        </div>
                    </div>

                    {/* 하단 행: img3 (좌측) */}
                    <div className="na-row-bot">
                        <div className="na-img na-img--3">
                            <img src="/images/kbrand/arrivals3.png" alt="New Arrivals 3" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivalsSection;
