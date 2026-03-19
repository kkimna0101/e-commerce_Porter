import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Intro.scss';

// Intro: und-ny.com 스타일 인트로 프리로더
// 1단계: 올리브 배경 + "PORTER" 글자가 왼쪽 하단에서 한 글자씩 올라옴
// 2단계: 1초 대기 후 프리로더 화면이 위로 이동하며 사라짐
const Intro = () => {
  const blockRef = useRef(null);

  // 인트로 프리로더 refs
  const preloaderRef = useRef(null);
  const charRefs = useRef([]);

  // 로고 텍스트 ref
  const logoRef = useRef(null);

  // 프리로더에 표시할 글자
  const alphabetImages = [
    { char: 'P', src: '/images/logo_p.png' },
    { char: 'O', src: '/images/logo_o.png' },
    { char: 'R', src: '/images/logo_r.png' },
    { char: 'T', src: '/images/logo_t.png' },
    { char: 'E', src: '/images/logo_e.png' },
    { char: 'R', src: '/images/logo_r.png' },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // ============================================================
    // 1단계: 프리로더 – "PORTER" 한 글자씩 아래→위로 등장
    // ============================================================
    const introTl = gsap.timeline();

    // 각 글자를 아래(y: 200px)에서 위(y: 0)로 순차적으로 올림
    // stagger: 0.12초 간격으로 한 글자씩 등장
    introTl.fromTo(
      charRefs.current,
      { y: 200, opacity: 0 }, // 시작: 200px 아래에 숨겨진 상태
      {
        y: 0, // 끝: bottom 0 원래 위치
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12, // 글자별 0.12초 간격
      },
    );

    // ============================================================
    // 2단계: 프리로더 위로 + PORTER 글자 아래로 동시에
    // ============================================================
    introTl
      // 프리로더 배경: 위로 올라감
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power3.inOut',
        delay: 1,
      })
      // PORTER 글자: 아래로 내려감 (동시 실행)
      .to(
        logoRef.current,
        {
          y: 300,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.inOut',
        },
        '<',
      )
      .then(() => {
        document.body.style.overflow = '';
      }); // '<' = 이전 애니메이션과 동시 시작
  }, []);

  return (
    <div className="intro-preloader-wrap" ref={blockRef}>
      {/* ===== 프리로더: 올리브 배경 + "PORTER" ===== */}
      <div className="intro-preloader" ref={preloaderRef}>
        <div className="intro-preloader__logo" ref={logoRef}>
          {alphabetImages.map((item, i) => (
            <img
              className="intro-preloader__char-img"
              key={i}
              src={item.src}
              alt={item.char}
              ref={(el) => (charRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intro;
