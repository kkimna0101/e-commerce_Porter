import React, { useRef } from 'react';
import './MainAboutSection.scss';

const MainAboutSection = () => {
  const imageRef = useRef(null);

  // 마우스 이동 시 이미지 패닝 효과
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    
    // 중심점으로부터의 상대적 위치 계산 (-0.5 ~ 0.5)
    // 0에 가까울수록 중심, -0.5는 왼쪽/위, 0.5는 오른쪽/아래
    const relX = (clientX - rect.left) / rect.width - 0.5;
    const relY = (clientY - rect.top) / rect.height - 0.5;

    // 움직임 범위 설정 (반대로 움직여서 시야를 이동시키는 느낌)
    const moveX = relX * -60; 
    const moveY = relY * -60;

    // 이미지 transform 업데이트
    imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
  };

  // 마우스가 나가면 부드럽게 제자리로
  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = `translate(0, 0) scale(1.1)`;
  };

  return (
    <section className="main-about-section">
      <div className="about-content">
        
        {/* 상단 이미지 영역 (마우스 패닝 효과) */}
        <div 
          className="image-wrap" 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="panning-image" 
            ref={imageRef}
          ></div>
        </div>

        {/* 하단 오렌지색 박스 영역 */}
        <div className="orange-box">
          
          {/* 좌측 텍스트 묶음 */}
          <div className="left-text">
            <h2>THE SINGLE STITCH</h2>
            <p className="explore-text">Explore About PORTER</p>
          </div>

          {/* 우측 텍스트 묶음 */}
          <div className="right-text">
            <h3 className="title-ko">일침입혼(一針入魂), 한 땀에 담은 타협 없는 장인 정신</h3>
            <p className="desc-ko">
              1962년부터 이어져 온 요시다 가방의 철학은 진정한 포터(PORTER)의 본질이자 기술력<br />
              의 정점입니다. 단순한 가방을 넘어, 사용자의 일상과 함께 호흡하고 진화하며 고유한 가<br />
              치를 더해가는 <span className="bold-text">영원한 동반자</span>를 만듭니다. 보이지 않는 디테일에서 완성되는 시대를 초월<br />
              한 <span className="bold-text">모던 기능주의</span>. 당신의 평생을 함께할 <span className="bold-text">완벽한 '삶의 도구'</span>를 경험해 보세요.
            </p>
            <p className="desc-en">
              Since 1962, Yoshida Kaban's philosophy has defined the true essence of PORTER. More than just a<br />
              bag, it is a lifelong companion that evolves with your everyday journey. Timeless modern<br />
              functionalism born from invisible details. Discover the perfect 'Tool for Life'
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default MainAboutSection;