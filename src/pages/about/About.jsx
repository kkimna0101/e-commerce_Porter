import React from 'react';
import AboutHero from '../../components/about/AboutHero';
import AboutSlogan from '../../components/about/AboutSlogan';
import AboutHistory from '../../components/about/AboutHistory';
import AboutTimeline from '../../components/about/AboutTimeline';
import './About.scss';

const About = () => {
    return (
        <div className="about-page-wrapper">
            <AboutHero />
            <AboutSlogan />
            <AboutHistory />
            <AboutTimeline />
        </div>
    );
};

export default About;