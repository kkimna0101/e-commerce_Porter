import React, { useRef } from 'react';
import './PotrSection.scss';
import useScrollStagger from '../../hooks/useScrollStagger';

const PotrSection = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    // 상품 그리드 애니메이션 훅
    useScrollStagger(gridRef, '.potr-box');

    return (
        <section className="potr-section" ref={sectionRef}>
            <div className="potr-content">
                {/* 1. 브랜드 스토리 영역 (로고 이미지 삭제, 텍스트부터 시작) */}
                <div className="top-info-only">
                    <div className="potr-info">
                        <div className="text-group">
                            <h3 className="subtitle">현대적 삶의 궤적을 함께하는 라이프스타일</h3>
                            <p className="body-text">
                                2021년 탄생한 POTR(피·오·티·알)은 현대인을 위한{' '}
                                <span className="medium-text">'삶의 도구'</span>를 제안합니다.
                                <br />
                                복잡한 도심 속에서도 빛을 발하는 모던한 미학, 그리고 사용자의 동선과
                                패턴을
                                <br />
                                치밀하게 계산한 직관적인 수납 설계는 POTR만의 차별점입니다.
                            </p>
                            <p className="body-text-m">
                                일상적인 순간부터 땀 흘리는 역동적인 스포츠, 낯선 곳으로 떠나는
                                여행까지.
                            </p>
                            <div className="view-more">
                                <span>VIEW MORE</span>
                                <div className="line"></div>
                                <span>PRODUCT</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. 스티키 텍스트 및 상품 그리드 영역 */}
                <div className="sticky-container">
                    <div className="sticky-text">
                        <h2>
                            Essential Gear <span className="thin">For</span>
                            <br />
                            Modern Urban Life
                        </h2>
                        <p>현대적 도시의 삶을 지탱하는 본질적인 도구</p>
                    </div>

                    <div className="product-grid" ref={gridRef}>
                        <div className="potr-box box-top-left">
                            <img src="/images/main/mainpotrimage2.png" alt="Potr Product 1" />
                        </div>
                        <div className="potr-box box-top-right">
                            <img src="/images/main/mainpotrimage3.png" alt="Potr Product 2" />
                        </div>
                        <div className="potr-box box-bot-left">
                            <img src="/images/main/mainpotrimage4.png" alt="Potr Product 3" />
                        </div>
                        <div className="potr-box box-bot-right">
                            <img src="/images/main/mainpotrimage5.png" alt="Potr Product 4" />
                        </div>
                    </div>
                </div>

                {/* 3. 하단 Force 사진 영역 */}
                <div className="bottom-content">
                    <div className="bottom-left">
                        <img
                            src="/images/main/mainpotrimage6.png"
                            alt="Force"
                            width="452"
                            height="300"
                        />
                        <img
                            src="/images/main/mainlltxt1.png"
                            alt="LUGGAGE LABEL"
                            width="240"
                            height="45"
                            className="ll-logo"
                        />
                    </div>
                    <div className="bottom-right">
                        <img
                            src="/images/main/mainpotrimage7.png"
                            alt="Right Bottom"
                            width="1060"
                            height="680"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PotrSection;
