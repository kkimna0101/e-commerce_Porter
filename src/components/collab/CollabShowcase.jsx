import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CollabShowcase.scss";

gsap.registerPlugin(ScrollTrigger);

const CollabShowcase = () => {
  const showcaseRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const unionTextRef = useRef(null);
  const stoneTextRef = useRef(null);

  useEffect(() => {
    const showcaseSection = showcaseRef.current;
    const img1 = img1Ref.current;
    const img2 = img2Ref.current;
    const unionText = unionTextRef.current;
    const stoneText = stoneTextRef.current;

    let ctx = gsap.context(() => {
      const bounceEase = "bounce.out";

      gsap.from(img1, {
        y: -300,
        opacity: 0,
        duration: 1.5,
        ease: bounceEase,
        scrollTrigger: {
          trigger: img1,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(img2, {
        y: -300,
        opacity: 0,
        duration: 1.5,
        ease: bounceEase,
        scrollTrigger: {
          trigger: img2,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      const applyTilt = (element) => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const xPos = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          const maxTilt = 3;

          gsap.to(element, {
            rotateY: xPos * maxTilt,
            rotateX: -yPos * maxTilt,
            x: xPos * 8,
            y: yPos * 8,
            ease: "power2.out",
            duration: 0.8,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            ease: "power2.out",
            duration: 0.8,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);
      };

      if (unionText) applyTilt(unionText);
      if (stoneText) applyTilt(stoneText);
    }, showcaseSection);

    return () => ctx.revert();
  }, []);

  return (
    <section className="collab-showcase" ref={showcaseRef}>
      <div className="showcase-item union-area">
        <div className="text-box" ref={unionTextRef}>
          <h2 className="brand-title">UNION</h2>
        </div>
        <div className="img-box" ref={img1Ref}>
          <img src="/images/collab/collab_showcase_1.png" alt="UNION" />
        </div>
      </div>

      <div className="showcase-item stoneisland-area">
        <div className="img-box" ref={img2Ref}>
          <img src="/images/collab/collab_showcase_2.png" alt="STONE ISLAND" />
        </div>
        <div className="text-box">
          <div className="title-frame" ref={stoneTextRef}>
            <h2 className="brand-title stone">STONE</h2>
            <h2 className="brand-title island">ISLAND</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollabShowcase;
