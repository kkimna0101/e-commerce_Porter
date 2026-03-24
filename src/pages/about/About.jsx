import React from 'react';
import AboutHero from '../../components/about/AboutHero';
import AboutSlogan from '../../components/about/AboutSlogan';
import './About.scss';

const About = () => {
    return (
        <div className="about-page-wrapper">
            <AboutHero />
            <AboutSlogan /> 
        </div>
    );
};

export default About;