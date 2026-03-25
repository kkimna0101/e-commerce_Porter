import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./CollabHero.scss";

const CollabHero = () => {
  const heroRef = useRef(null);
  const textGroupRef = useRef(null);
  const charWaveRef = useRef(null);
  const appearanceTl = useRef(null);

  useEffect(() => {
    const heroSection = heroRef.current;
    const textGroup = textGroupRef.current;
    const charWave = charWaveRef.current;

    let ctx = gsap.context(() => {
      gsap.set(charWave, {
        x: -60,
        y: 0,
        opacity: 0,
        scale: 0.9,
        zIndex: 1,
      });

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
          duration: 0.8,
        });
      };

      const handleMouseEnter = () => {
        if (appearanceTl.current) appearanceTl.current.kill();
        
        appearanceTl.current = gsap.timeline();
        appearanceTl.current
          .set(charWave, { zIndex: 5 })
          .to(charWave, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out"
          });
      };

      const handleMouseLeave = () => {
        gsap.to(textGroup, {
          rotateY: 0, rotateX: 0, x: 0, y: 0,
          ease: "power2.out", duration: 0.8,
        });

        if (appearanceTl.current) appearanceTl.current.kill();

        gsap.set(charWave, { zIndex: 1 });
        
        gsap.to(charWave, {
          x: -60,
          y: 0,
          opacity: 0,
          scale: 0.9,
          duration: 0.7,
          ease: "power2.in"
        });
      };

      heroSection.addEventListener("mousemove", handleMouseMove);
      textGroup.addEventListener("mouseenter", handleMouseEnter);
      textGroup.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        heroSection.removeEventListener("mousemove", handleMouseMove);
        textGroup.removeEventListener("mouseenter", handleMouseEnter);
        textGroup.removeEventListener("mouseleave", handleMouseLeave);
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
        <Link 
          to="/k-brand"
          className="hero-text-group" 
          ref={textGroupRef}
        >
          <div className="title-howl-wrap">
            <h1 className="title-howl">HOWL</h1>
            <div className="char-wave-layer" ref={charWaveRef}>
              <img src="/images/collab/howl_character.png" alt="character" className="char-img" />
            </div>
          </div>
          <div className="sub-korea-wrap">
            <p className="sub-korea">ONLY IN KOREA</p>
            <img src="/images/collab/viewarrow.png" alt="view" className="view-arrow" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CollabHero;