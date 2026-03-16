import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    // public 폴더 경로를 편하게 쓰기 위한 변수 설정
    const imgPath = `${process.env.PUBLIC_URL}/images`;

    return (
        <footer className="footer-container Bk-Bk_solid">
            <div className="footer-top">
                {/* 첫 번째 : ABOUT */}
                <div className="footer-col">
                    <h2 className="Wh-Wh_solid">ABOUT</h2>
                    <div className="sub-menu txt-bebebe">
                        <Link to="/about">포터 스토리</Link>
                        <Link to="/offline">스토어</Link>
                        <Link to="/">뉴스레터</Link>
                        <Link to="/">언론 및 뉴스</Link>
                    </div>
                </div>

                {/* 두 번째 : CONTACT */}
                <div className="footer-col">
                    <h2 className="Wh-Wh_solid">CONTACT</h2>
                    <div className="sub-menu txt-bebebe">
                        <Link to="/mypage">회원 정보</Link>
                        <Link to="/board/inquiry">1:1 문의하기</Link>
                        <Link to="/board/faq">FAQ</Link>
                        <Link to="/">수리 및 유지보수</Link>
                    </div>
                </div>

                {/* 세 번째 : POLICY */}
                <div className="footer-col">
                    <h2 className="Wh-Wh_solid">POLICY</h2>
                    <div className="sub-menu txt-bebebe">
                        <Link to="/">개인 정보 보호 정책</Link>
                        <Link to="/">이용약관</Link>
                    </div>
                </div>

                {/* 네 번째 : PORTER (로고 영역) */}
                <div className="footer-col">
                    <h2 className="Wh-Wh_50">PORTER</h2>
                    <div className="sub-menu logo-menu">
                        <Link to="/">
                            <img
                                src={`${imgPath}/porterlogo_w.png`}
                                alt="PORTER"
                                className="logo-1"
                            />
                        </Link>
                        <Link to="/">
                            <img src={`${imgPath}/potrlogo_w.png`} alt="POTR" className="logo-2" />
                        </Link>
                        <Link to="/">
                            <img
                                src={`${imgPath}/luggagelabellogo_w.png`}
                                alt="LUGGAGE LABEL"
                                className="logo-3"
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="menu-list Wh-Wh_solid">
                    <Link to="/product">PRODUCT</Link>
                    <Link to="/collab">COLLABORATION</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/offline">OFFLINE</Link>
                </div>

                <div className="language-list txt-none-active">
                    <span>LANGUAGE</span>
                    <span className="divider"></span>
                    <span>ENGLISH 日本語 中国话</span>
                </div>

                <div className="copyright-list Wh-Wh_solid">
                    <p>Copyright (c) 2025 YOSHIDA & CO., LTD. ALL RIGHTS RESERVED</p>
                    <p>@porter_kr</p>
                </div>

                <div className="logo-box">
                    <Link to="/">
                        <img
                            src={`${imgPath}/instagramlogo.png`}
                            alt="Instagram"
                            className="insta-logo Wh-Wh_90"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
