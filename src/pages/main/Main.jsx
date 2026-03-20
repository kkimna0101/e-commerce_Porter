import React, { useEffect } from 'react';
import Intro from '../../components/Intro';
import HeroSection from '../../components/main/HeroSection';
import Header from '../../components/common/Header';


import BrandStory from '../../components/main/Brandstory';
import PorterSection from '../../components/main/PorterSection';
import PotrSection from '../../components/main/PotrSection';
import LLSection from '../../components/main/LLSection';
import './Main.scss';
import MainAboutSection from '../../components/main/MainAboutSection';
import ProductSection from '../../components/main/ProductSection';
import TransitionSection from '../../components/main/Transitionsection';

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
                <TransitionSection />
                <PorterSection />
                <PotrSection />
                <LLSection />
                <MainAboutSection />
                <ProductSection />
            </main>
        </>
    );
};

export default Main;
