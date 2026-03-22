import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import './About.scss';

const About = () => {
    return (
        <div className="about-page">
            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">
                        ABOUT OUR<br />
                        YOSHIDA & CO.
                    </h1>
                    <p className="hero-description">
                        요시다앤코는 1935년 이래로 한 가지 일에 집중해 왔습니다.<br />
                        그것은 바로 혁신을 고민하며 일상에 녹아드는 가방을 만드는 것입니다.<br />
                        90년 가까이 이어온 요시다가방의 스토리는 여러 사람의 손을 거쳐,<br />
                        한 땀 한 땀 마음을 담아 정성스럽게 만드는<br />
                        장인 정신에서 시작됩니다.
                    </p>
                </section>

                {/* Brand Image Section */}
                <section className="brand-image-section">
                    <div className="image-container">
                        <img src="/images/productdetail/brandstory1.png" alt="Workshop" className="workshop-image" />
                    </div>
                    <div className="brand-text">
                        <h2>YOSHIDA & CO.</h2>
                        <h3>一針入魂</h3>
                    </div>
                </section>

                {/* History Section - 1935 */}
                <section className="history-section">
                    <div className="history-content">
                        <div className="history-text">
                            <div className="establishment-label">創業</div>
                            <div className="year">1935</div>
                            <div className="history-details">
                                <div className="timeline-line"></div>
                                <div className="history-description">
                                    <h4>요시다 가방 설립</h4>
                                    <p>
                                        가방 장인인 요시다 기치조가<br />
                                        Yoshida Company를 설립하며<br />
                                        모든 역사의 첫 걸음을 내디뎠습니다.<br />
                                        변하지 않는 장인 정신의 시작점입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="history-visual">
                            <img src="/images/productdetail/brandstory1.png" alt="1935 Workshop" />
                            <div className="slider-control">
                                <button className="arrow arrow-up">
                                    <ChevronUp size={30} color="#929292" />
                                </button>
                                <div className="progress-bar">
                                    <span className="progress-number">01</span>
                                    <div className="progress-track">
                                        <div className="progress-fill"></div>
                                    </div>
                                    <span className="progress-number">04</span>
                                </div>
                                <button className="arrow arrow-down">
                                    <ChevronDown size={30} color="#929292" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Stores Section */}
                <section className="stores-section">
                    <div className="stores-header">
                        <h2>OUR STORES</h2>
                        <div className="stores-header-line"></div>
                        <span className="stores-subtitle">한국 스토어 전개</span>
                    </div>

                    <div className="timeline">
                        <div className="timeline-line-horizontal"></div>

                        {/* Store 2016 */}
                        <div className="store-item store-2016">
                            <div className="store-image">
                                <img src="/images/main/recommended1.png" alt="강남 스토어" />
                            </div>
                            <div className="store-info">
                                <h3>2016</h3>
                                <p>포터 강남 스토어 오픈</p>
                            </div>
                        </div>

                        {/* Store 2018 */}
                        <div className="store-item store-2018">
                            <div className="store-info">
                                <h3 className="faded">2018</h3>
                                <p>포터 한남 스토어 오픈</p>
                            </div>
                            <div className="store-image">
                                <img src="/images/main/recommended2.png" alt="한남 스토어" />
                            </div>
                        </div>

                        {/* Store 2019 */}
                        <div className="store-item store-2019">
                            <div className="store-image">
                                <img src="/images/main/recommended3.png" alt="가로수길 스토어" />
                            </div>
                            <div className="store-info">
                                <h3>2019</h3>
                                <p>포터 가로수길 스토어 오픈</p>
                                <p className="sub-text">압구정점으로 이전 오픈</p>
                            </div>
                        </div>

                        {/* Store 2020 */}
                        <div className="store-item store-2020">
                            <div className="store-info">
                                <h3>2020</h3>
                                <p>포터 강남 스토어 리뉴얼 오픈</p>
                            </div>
                            <div className="store-image">
                                <img src="/images/main/recommended4.png" alt="강남 스토어 리뉴얼" />
                            </div>
                        </div>

                        {/* Store 2021 */}
                        <div className="store-item store-2021">
                            <div className="store-image">
                                <img src="/images/main/recommended5.png" alt="더현대서울점" />
                            </div>
                            <div className="store-info">
                                <h3>2021</h3>
                                <p>포터 더현대서울점 오픈</p>
                            </div>
                        </div>

                        {/* Store 2024 - 1 */}
                        <div className="store-item store-2024-1">
                            <div className="store-info">
                                <h3>2024</h3>
                                <p>포터 대구 스토어 오픈</p>
                            </div>
                            <div className="store-image">
                                <img src="/images/main/recommended6.png" alt="대구 스토어" />
                            </div>
                        </div>

                        {/* Store 2024 - 2 */}
                        <div className="store-item store-2024-2">
                            <div className="store-image">
                                <img src="/images/main/recommended7.png" alt="광교 스토어" />
                            </div>
                            <div className="store-info">
                                <h3 className="faded">2024</h3>
                                <p>포터 광교 스토어 오픈</p>
                            </div>
                        </div>

                        {/* Store 2024 - 3 */}
                        <div className="store-item store-2024-3">
                            <div className="store-info">
                                <h3 className="faded">2024</h3>
                                <p>포터 더현대대구점 오픈</p>
                            </div>
                            <div className="store-image">
                                <img src="/images/main/recommended8.png" alt="더현대대구점" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
