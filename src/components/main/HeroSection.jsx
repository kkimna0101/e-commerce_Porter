import React from 'react';
import './HeroSection.scss';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero__frame">
                <video
                    src="/videos/PALACExPORTER2.mp4"
                    className="hero__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            </div>
        </section>
    );
};

export default HeroSection;