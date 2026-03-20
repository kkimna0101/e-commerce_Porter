import React from 'react';
import './LLSection.scss';

const LLSection = () => {
  return (
    <section className="ll-section">
      <div className="ll-content">

        {/* 1. 상단 묶음 영역 */}
        <div className="top-content">
          <div className="left-col">
            <img src="/images/main/mainluggageimage1.png" alt="Luggage Top Left" width="452" height="300" />
            
            <div className="text-wrap">
              <img src="/images/main/mainlltxt2.png" alt="LUGGAGE LABEL" width="560" height="103" className="logo-img" />
              
              <h3 className="subtitle">독창적 소재와 실험적 시도로 구축한 기술적 유산</h3>
              <p className="body-text body-text-1">
                <span className="medium-text">1984년 시작된 러기지 라벨</span>은 과감한 소재와 실험적 시도로 구축<br />
                한 기술적 유산입니다.
              </p>
              
              <p className="body-text body-text-2">
                상징적인 '레드 라벨' 엠블럼과 PVC 코팅 캔버스 소재는 브랜드만<br />
                의 강렬한 정체성을 대변합니다. 밀리터리 감성을 현대적으로 재해<br />
                석한 디자인으로, <span className="medium-text">타협하지 않는 테크니컬한 가치</span>를 지향합니다.
              </p>
              
              <div className="view-more">
                <span>VIEW MORE</span>
                <div className="line"></div>
                <span>PRODUCT</span>
              </div>
            </div>
          </div>

          <div className="right-col">
            <img src="/images/main/mainluggageimage2.png" alt="Luggage Top Right" width="1080" height="680" />
          </div>
        </div>

        {/* 2. 스티키 텍스트 영역 */}
        <div className="sticky-container">
          <div className="sticky-text">
            <h2>Bold Identity <span className="thin">Built On</span><br />Technical Excellence</h2>
            <p>탁월한 기술력을 바탕으로 구축된 대담한 정체성</p>
          </div>
          
          {/* 3. 상품 리스트 박스 영역 */}
          <div className="product-grid">

            <div className="luggage-box box-top-left">
              <img src="/images/main/mainluggageimage3.png" alt="Luggage Product 1" />
            </div>
            <div className="luggage-box box-top-right">
              <img src="/images/main/mainluggageimage4.png" alt="Luggage Product 2" />
            </div>
            <div className="luggage-box box-bot-left">
              <img src="/images/main/mainluggageimage5.png" alt="Luggage Product 3" />
            </div>
            <div className="luggage-box box-bot-right">
              <img src="/images/main/mainluggageimage6.png" alt="Luggage Product 4" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LLSection;