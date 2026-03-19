import React, { useRef, useEffect } from 'react';
import './PotrSection.scss';

const productList = [
  { id: 1, src: '/images/main/mainpotrimage2.png', width: 465, height: 376, boxClass: 'box-top-left' },
  { id: 2, src: '/images/main/mainpotrimage3.png', width: 490, height: 447, boxClass: 'box-top-right' },
  { id: 3, src: '/images/main/mainpotrimage4.png', width: 450, height: 450, boxClass: 'box-bot-left' },
  { id: 4, src: '/images/main/mainpotrimage5.png', width: 497, height: 466, boxClass: 'box-bot-right' },
];

const PotrSection = () => {
  const videoRef = useRef(null);

  // 스크롤 시 화면에 영상이 보일 때만 재생
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 화면에 보일 때: 시간을 0초로 되감고 재생
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          } else {
            // 화면에서 벗어날 때: 영상을 잠시 멈춤
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.3 } // 영상이 화면에 30% 정도 보일 때 작동
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <section className="potr-section">
      <div className="temp-space">
        <p>상단 작업 영역 (임시 공간 1143px)</p>
      </div>

      <div className="potr-content">

        {/* 상단 영역 */}
        <div className="top-content">
          <div className="top-left">
            <img src="/images/main/mainpotrimage1.png" alt="Main" width="930" height="779" />
          </div>
          <div className="top-right">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src="/videos/mainanimation1.mp4"
                muted
                loop
                playsInline
              ></video>
            </div>

            <div className="potr-info">
              <img src="/images/main/mainpotrtxt1.png" alt="P.O.T.R." width="394" height="160" className="logo-img" />
              <div className="text-group">
                <h3 className="subtitle">현대적 삶의 궤적을 함께하는 라이프스타일</h3>
                <p className="body-text">
                  2021년 탄생한 POTR(피·오·티·알)은 현대인을 위한 <span className="medium-text">'삶의 도구'</span>를 제안합니다.<br />
                  복잡한 도심 속에서도 빛을 발하는 모던한 미학, 그리고 사용자의 동선과 패턴을<br />
                  치밀하게 계산한 직관적인 수납 설계는 POTR만의 차별점입니다.
                </p>
                <p className="body-text-m">일상적인 순간부터 땀 흘리는 역동적인 스포츠, 낯선 곳으로 떠나는 여행까지.</p>
                <div className="view-more">
                  <span>VIEW MORE</span>
                  <div className="line"></div>
                  <span>PRODUCT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 텍스트 및 상품 리스트 영역 */}
        <div className="sticky-container">
          <div className="sticky-text">
            <h2>Essential Gear <span className="thin">For</span><br />Modern Urban Life</h2>
            <p>현대적 도시의 삶을 지탱하는 본질적인 도구</p>
          </div>
          <div className="product-grid">
            {productList.map((item) => (
              <div key={item.id} className={`product-box ${item.boxClass}`}>
                <img src={item.src} alt={`Product ${item.id}`} width={item.width} height={item.height} />
              </div>
            ))}
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="bottom-content">
          <div className="bottom-left">
            <img src="/images/main/mainpotrimage6.png" alt="Force" width="452" height="300" />
            <img src="/images/main/mainlltxt1.png" alt="LUGGAGE LABEL" width="240" height="45" className="ll-logo" />
          </div>
          <div className="bottom-right">
            <img src="/images/main/mainpotrimage7.png" alt="Right Bottom" width="1060" height="680" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PotrSection;