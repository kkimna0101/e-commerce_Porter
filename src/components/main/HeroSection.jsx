import React from 'react';
import './HeroSection.scss';

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero__frame">
                <img
                    src="https://placehold.co/1870x550"
                    alt="Porter collection"
                    className="hero__img"
                />
            </div>
        </section>
    );
};

export default HeroSection;
