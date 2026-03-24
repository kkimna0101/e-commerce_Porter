import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutHistory.scss";

gsap.registerPlugin(ScrollTrigger);

const historyData = [
  {
    id: "1935",
    kanji: "創業",
    year: "1935",
    title: "요시다 가방 설립",
    desc: "가방 장인인 요시다 기치조가<br/>Yoshida Company를 설립하며<br/>모든 역사의 첫 걸음을 내디뎠습니다.<br/>변하지 않는 장인 정신의 시작점입니다.",
    img: "/images/about/about_history_1935.png",
    yearColor: "#000000",
  },
  {
    id: "1962",
    kanji: "誕生",
    year: "1962",
    title: "자체 브랜드 포터(PORTER) 런칭",
    desc: "요시다 가방의 기술력과 철학을 집약한<br/>자체 브랜드 '포터(PORTER)'를 세상에<br/>처음 선보였습니다. 현대적인 디자인과<br/>내구성을 모두 갖춘 걸작의 탄생입니다.",
    img: "/images/about/about_history_1962.png",
    yearColor: "#ff5f00",
  },
  {
    id: "1983",
    kanji: "傑作",
    year: "1983",
    title: "탱커(TANKER) 라인업 런칭",
    desc: "미 공군의 비행 재킷 MA-1을 모티브로<br/>한 오리지널 원단을 사용한 베스트셀러<br/>시리즈 '탱커'가 탄생했습니다. 포터를 상<br/>징하는 시그니처 라인입니다.",
    img: "/images/about/about_history_1983.png",
    yearColor: "#000000",
  },
  {
    id: "2000",
    kanji: "店舗",
    year: "2000",
    title: "쿠라치카 요시다 오모테산도 오픈",
    desc: "도쿄 오모테산도에 KURA CHIKA<br/>YOSHIDA 스토어를 오픈하며<br/>브랜드의 세계관을 직접 경험할 수 있는<br/>상징적인 공간을 마련했습니다.",
    img: "/images/about/about_history_2000.png",
    yearColor: "#ff5f00",
  },
];

const AboutHistory = () => {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  const imgsRef = useRef([]);
  const triggerRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      gsap.set(imgsRef.current, { filter: "grayscale(100%)" });

      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "+=8000",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.23) setCurrentIdx(0);
          else if (p < 0.5) setCurrentIdx(1);
          else if (p < 0.77) setCurrentIdx(2);
          else setCurrentIdx(3);
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=8000",
          scrub: 1,
        },
      });

      tl.to(imgsRef.current[0], {
        filter: "grayscale(0%)",
        duration: 4,
        ease: "power2.inOut",
      })
        .to(slidesRef.current[0], {
          y: "-100vh",
          duration: 2,
          ease: "power1.inOut",
        })
        .to(imgsRef.current[1], {
          filter: "grayscale(0%)",
          duration: 4,
          ease: "power2.inOut",
        })
        .to(
          slidesRef.current[1],
          { x: "-100vw", duration: 2, ease: "power1.inOut" },
          "+=1",
        )
        .to(imgsRef.current[2], {
          filter: "grayscale(0%)",
          duration: 4,
          ease: "power2.inOut",
        })
        .to(
          slidesRef.current[2],
          { y: "-100vh", duration: 2, ease: "power1.inOut" },
          "+=1",
        )
        .to(imgsRef.current[3], {
          filter: "grayscale(0%)",
          duration: 4,
          ease: "power2.inOut",
        })
        .to({}, { duration: 2 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const moveToIdx = (idx) => {
    if (!triggerRef.current) return;
    const trigger = triggerRef.current;
    const clamped = Math.max(0, Math.min(3, idx));
    const targetProgs = [0, 0.3, 0.57, 0.84];
    const targetY =
      trigger.start + (trigger.end - trigger.start) * targetProgs[clamped];
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section className="about-history" ref={sectionRef}>
      <div className="history-inner">
        <div className="slides-area">
          {historyData.map((data, index) => (
            <div
              key={data.id}
              className="slide-panel"
              ref={(el) => (slidesRef.current[index] = el)}
              style={{ zIndex: 10 - index }}
            >
              <div className="left-area">
                <div className="kanji-box">{data.kanji}</div>
                <div className="year-box" style={{ color: data.yearColor }}>
                  {data.year}
                </div>
                <div className="content-box">
                  <div className="vertical-line"></div>
                  <div className="text-wrap">
                    <h3 className="title">{data.title}</h3>
                    <p
                      className="desc"
                      dangerouslySetInnerHTML={{ __html: data.desc }}
                    ></p>
                  </div>
                </div>
              </div>
              <div className="right-area">
                <div className="img-box">
                  <img
                    src={data.img}
                    alt={data.title}
                    ref={(el) => (imgsRef.current[index] = el)}
                    className="history-img"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="scrollbar-area">
          <button
            className="nav-btn"
            onClick={() => moveToIdx(currentIdx - 1)}
            disabled={currentIdx === 0}
          >
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              style={{ transform: "rotate(90deg)" }}
            >
              <path
                d="M16 1L6 6L16 11"
                stroke="#929292"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="num top-num">0{currentIdx + 1}</div>
          <div className="track">
            <div
              className="thumb"
              style={{ top: `${(currentIdx / 3) * (150 - 37.5)}px` }}
            ></div>
          </div>
          <div className="num bottom-num">04</div>
          <button
            className="nav-btn"
            onClick={() => moveToIdx(currentIdx + 1)}
            disabled={currentIdx === 3}
          >
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              style={{ transform: "rotate(90deg)" }}
            >
              <path
                d="M6 1L16 6L6 11"
                stroke="#929292"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
