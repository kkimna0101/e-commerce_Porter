import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./CollabHero.scss";

const CollabHero = () => {
  const heroRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const heroSection = heroRef.current;
    const textGroup = textGroupRef.current;

    let ctx = gsap.context(() => {
      const handleMouseMove = (e) => {
        const rect = heroSection.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        const xPos = (clientX / rect.width - 0.5) * 2;
        const yPos = (clientY / rect.height - 0.5) * 2;

        const maxTilt = 4;

        gsap.to(textGroup, {
          rotateY: xPos * maxTilt,
          rotateX: -yPos * maxTilt,
          x: xPos * 10,
          y: yPos * 10,
          ease: "power2.out",
          duration: 0.6,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(textGroup, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          ease: "power2.out",
          duration: 0.6,
        });
      };

      heroSection.addEventListener("mousemove", handleMouseMove);
      heroSection.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        heroSection.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroSection);

    return () => ctx.revert();
  }, []);

  return (
    <section className="collab-hero" ref={heroRef}>
      <div className="hero-bg-img">
        <img src="/images/collab/collab_hero.png" alt="Howl Collection" />
      </div>

      <div className="hero-content-wrap inner">
        <div className="hero-text-group" ref={textGroupRef}>
          <h1 className="title-howl">HOWL</h1>
          <p className="sub-korea">ONLY IN KOREA</p>
        </div>
      </div>
    </section>
  );
};

export default CollabHero;
