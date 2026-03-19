import React, { useRef, useEffect } from 'react';
import './PorterSection.scss';

const productList = [
    {
        id: 1,
        src: 'https://via.placeholder.com/465x376/838E4F/ffffff?text=Product+1',
        boxClass: 'box-top-left',
    },
    {
        id: 2,
        src: 'https://via.placeholder.com/490x447/838E4F/ffffff?text=Product+2',
        boxClass: 'box-top-right',
    },
    {
        id: 3,
        src: 'https://via.placeholder.com/450x450/838E4F/ffffff?text=Product+3',
        boxClass: 'box-bot-left',
    },
    {
        id: 4,
        src: 'https://via.placeholder.com/497x466/838E4F/ffffff?text=Product+4',
        boxClass: 'box-bot-right',
    },
];

const PorterSection = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                        }
                    } else {
                        if (videoRef.current) {
                            videoRef.current.pause();
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    return (
        <section className="porter-section">
            <div className="porter-container">
                {/* 상단: 헤더/미디어 영역 */}
                <div className="header-content">
                    <div className="media-grid">
                        <div className="gif-box">
                            <img
                                src="https://via.placeholder.com/200x150?text=GIF+Area"
                                alt="Porter Character"
                            />
                        </div>
                        <div className="video-box">
                            <video
                                ref={videoRef}
                                src="/videos/porter_making.mp4"
                                muted
                                loop
                                playsInline
                            ></video>
                        </div>
                    </div>

                    <div className="brand-intro">
                        <h1 className="brand-logo">PORTER</h1>
                        <div className="brand-text">
                            <p className="main-desc">시대가 흘러도 변하지 않는 일점입혼의 정수</p>
                            <p className="sub-desc">
                                요시다 가방의 철학은 1935년부터 시작되었습니다. 한 땀 한 땀 장인의
                                혼을 담아내는 바느질은 <br />
                                사용자의 삶과 함께하며 시간이 흐를수록 깊이를 더해갑니다. 포터의
                                디자인은 유행을 타지 않는 <br />
                                클래식함과 동시에 현대적인 감각을 놓치지 않습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 중단: 스티키 텍스트 & 상품 리스트 */}
                <div className="sticky-wrapper">
                    <div className="sticky-text-area">
                        <div className="sticky-inner">
                            <h2 className="display-text">
                                Timeless Mastery
                                <br />
                                Woven In <span className="highlight">Every Stitch</span>
                            </h2>
                            <p className="caption">장인의 바느질 하나하나에 깃든 영원한 숙련미</p>
                        </div>
                    </div>

                    <div className="product-list-grid">
                        {productList.map((item) => (
                            <div key={item.id} className={`product-card ${item.boxClass}`}>
                                <div className="img-bg">
                                    <img src={item.src} alt={`Porter product ${item.id}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단: 라이프스타일/일러스트 영역 */}
                <div className="footer-visual">
                    <div className="lifestyle-image">
                        <img
                            src="https://via.placeholder.com/800x600?text=Lifestyle+Image"
                            alt="Bike Lifestyle"
                        />
                    </div>
                    <div className="illust-section">
                        <div className="illust-image">
                            <img
                                src="https://via.placeholder.com/400x300?text=Illustration"
                                alt="Art Illust"
                            />
                        </div>
                        <div className="bottom-label">P.O.T.R.</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PorterSection;
