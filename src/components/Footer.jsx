import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner inner">
        <div className="footer__top">
          <ul className="footer__main-menu">
            <li><Link to="/product">PRODUCT</Link></li>
            <li><Link to="/collab">COLLABORATION</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/offline">OFFLINE</Link></li>
          </ul>
          
          <div className="footer__sub-menus">
            <div className="footer__col">
              <h3>ABOUT</h3>
              <ul>
                <li><Link to="/about">포터 스토리</Link></li>
                <li><Link to="/offline">스토어</Link></li>
                <li><Link to="/">뉴스레터</Link></li>
                <li><Link to="/">언론 및 뉴스</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h3>CONTACT</h3>
              <ul>
                <li><Link to="/mypage">회원 정보</Link></li>
                <li><Link to="/board/inquiry">1:1 문의하기</Link></li>
                <li><Link to="/board/faq">FAQ</Link></li>
                <li><Link to="/">수리 및 유지보수</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h3>POLICY</h3>
              <ul>
                <li><Link to="/">개인정보처리방침</Link></li>
                <li><Link to="/">이용약관</Link></li>
              </ul>
            </div>
            <div className="footer__col footer__brands">
              <h3>PORTER</h3>
              <ul>
                <li><Link to="/">PORTER 브랜드 로고</Link></li>
                <li><Link to="/">POTR 브랜드 로고</Link></li>
                <li><Link to="/">LUGGAGE LABEL 브랜드 로고</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__lang">
            <span className="lang-label">LANGUAGE</span>
            <span className="lang-list">ENGLISH, 日本語, 中国话</span>
          </div>
          <div className="footer__copyright">
            &copy; 2026 E-Commerce Porter. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
