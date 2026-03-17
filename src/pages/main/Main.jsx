import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import HeroSection from '../../components/main/HeroSection';
import Intro from '../../components/Intro';

import BrandStory from '../../components/main/Brandstory';
import PotrSection from '../../components/main/PotrSection';
import LLSection from '../../components/main/LLSection';
import './Main.scss';
import PorterSection from '../../components/main/PorterSection';

const Main = () => {
    // 새로고침 시 무조건 화면 맨 위에서 시작
    useEffect(() => {
        // 브라우저가 스크롤 위치를 기억하는 기능 차단
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        // 화면을 맨 위로
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Intro />
            <HeroSection />
            <Header />
            <main className="main">
                <BrandStory />
                <PorterSection />
                <PotrSection />
                <LLSection />
            </main>
        </>
    );
};

export default Main;
