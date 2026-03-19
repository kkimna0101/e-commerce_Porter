import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Intro.scss';

const Intro = () => {
  const blockRef = useRef(null);

  const preloaderRef = useRef(null);
  const charRefs = useRef([]);

  const logoRef = useRef(null);

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
    const introTl = gsap.timeline();

    introTl.fromTo(
      charRefs.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12,
      },
    );

    introTl
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power3.inOut',
        delay: 1,
      })
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
      });
  }, []);

  return (
    <div className="intro-preloader-wrap" ref={blockRef}>
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
