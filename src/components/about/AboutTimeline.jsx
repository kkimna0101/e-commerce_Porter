import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutTimeline.scss";

gsap.registerPlugin(ScrollTrigger);

const storeData = [
  {
    year: "2016",
    title: "포터 강남 스토어 오픈",
    img: "/images/about/about_store_2016.png",
  },
  {
    year: "2018",
    title: "포터 한남 스토어 오픈",
    img: "/images/about/about_store_2018.png",
  },
  {
    year: "2019",
    title: "포터 가로수길 스토어 오픈",
    desc: "압구정점으로 이전 오픈",
    img: "/images/about/about_store_2019.png",
  },
  {
    year: "2020",
    title: "포터 강남 스토어 리뉴얼 오픈",
    img: "/images/about/about_store_2020.png",
  },
  {
    year: "2021",
    title: "포터 압구정 스토어 리뉴얼 오픈",
    img: "/images/about/about_store_2021_1.png",
  },
  {
    year: "2021",
    title: "포터 더현대서울점 오픈",
    img: "/images/about/about_store_2021_2.png",
  },
  {
    year: "2024",
    title: "포터 이태원 스토어 오픈",
    img: "/images/about/about_store_2024.png",
  },
  {
    year: "2025",
    title: "포터 신세계 센텀시티점 오픈",
    img: "/images/about/about_store_2025.png",
  },
];

const AboutTimeline = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartScrollY = useRef(0);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char"
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {char}
      </span>
    ));

  const START_P = 6 / 17;
  const END_P = 16 / 17;

  const moveToIdx = (idx) => {
    const st = stRef.current;
    if (!st) return;
    const clamped = Math.max(0, Math.min(7, idx));
    const targetProgress = START_P + (clamped / 7) * (END_P - START_P);
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const titleChars = titleRef.current.querySelectorAll(".char");
    const header = headerRef.current;

    let ctx = gsap.context(() => {
      gsap.set(titleChars, { y: 150, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      const xMove = -(track.scrollWidth - window.innerWidth);

      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "+=7000",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          stRef.current = self;
          const p = self.progress;

          if (p <= START_P) {
            setCurrentIdx(0);
          } else if (p >= END_P) {
            setCurrentIdx(7);
          } else {
            const mappedP = (p - START_P) / (END_P - START_P);
            setCurrentIdx(Math.round(mappedP * 7));
          }
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=7000",
          scrub: 1,
        },
      });

      tl.to(titleChars, { y: 0, opacity: 1, duration: 1.5, stagger: 0.1 }, 0)
        .to(lineRef.current, { scaleX: 1, duration: 1.2 }, 0.5)
        .to(
          header,
          {
            scale: 0.5,
            transformOrigin: "left top",
            top: "calc(50vh - 400px)",
            y: 0,
            duration: 3,
            ease: "power2.inOut",
          },
          2,
        )
        .to(
          ".track-container",
          { top: "calc(50vh - 258px)", duration: 3, ease: "power2.inOut" },
          2,
        )
        .to(
          ".timeline-scrollbar",
          { top: "calc(50vh + 298px)", duration: 3, ease: "power2.inOut" },
          2,
        )
        .to(track, { x: xMove, duration: 10, ease: "none" }, 6)
        .to({}, { duration: 1 }, 16);
    }, sectionRef);

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startX.current = e.pageX;
      dragStartScrollY.current = window.scrollY;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const walk = (startX.current - e.pageX) * 2.5;
      window.scrollTo(0, dragStartScrollY.current + walk);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const preventDefault = (e) => e.preventDefault();

    track.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    track.addEventListener("dragstart", preventDefault);

    return () => {
      ctx.revert();
      track.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      track.removeEventListener("dragstart", preventDefault);
    };
  }, []);

  return (
    <section className="about-timeline" ref={sectionRef}>
      <div className="header-container" ref={headerRef}>
        <div className="header-inner">
          <h2 className="title" ref={titleRef}>
            {splitText("OUR STORES")}
          </h2>
          <span className="line" ref={lineRef}></span>
          <span className="sub">한국 스토어 전개</span>
        </div>
      </div>

      <div className="track-container">
        <div className="track-inner" ref={trackRef}>
          <div className="porter-man start-man">
            <img src="/images/offline/porter_man.png" alt="porter man" />
          </div>

          {storeData.map((data, i) => (
            <div
              key={i}
              className={`card ${i === currentIdx ? "active" : ""} ${i % 2 === 0 ? "top-img" : "bottom-img"}`}
            >
              {i % 2 === 0 ? (
                <>
                  <div className="img-box">
                    <img src={data.img} alt={data.title} draggable={false} />
                  </div>
                  <div className="info-box">
                    <div className="year">{data.year}</div>
                    <div className="text-box">
                      <h4 className="store-title">{data.title}</h4>
                      {data.desc && <p className="desc">{data.desc}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-box">
                    <div className="year">{data.year}</div>
                    <div className="text-box">
                      <h4 className="store-title">{data.title}</h4>
                      {data.desc && <p className="desc">{data.desc}</p>}
                    </div>
                  </div>
                  <div className="img-box">
                    <img src={data.img} alt={data.title} draggable={false} />
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="porter-man end-man">
            <img src="/images/offline/porter_man.png" alt="porter man" />
          </div>
        </div>
      </div>

      <div className="timeline-scrollbar">
        <button
          className="nav-btn prev"
          onClick={() => moveToIdx(currentIdx - 1)}
          disabled={currentIdx === 0}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <path
              d="M11 16L6 6L1 16"
              stroke="#929292"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="scrollbar-inner">
          <span className="num">0{currentIdx + 1}</span>
          <div className="scrollbar-track">
            <div
              className="scrollbar-thumb"
              style={{ left: `${(currentIdx / 7) * (300 - 37.5)}px` }}
            />
          </div>
          <span className="num">08</span>
        </div>

        <button
          className="nav-btn next"
          onClick={() => moveToIdx(currentIdx + 1)}
          disabled={currentIdx === 7}
        >
          <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
            <path
              d="M1 6L6 16L11 6"
              stroke="#929292"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default AboutTimeline;
