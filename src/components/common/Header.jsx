import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

const PlusIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8.5 0V17M0 8.5H17" stroke="#000000" strokeWidth="2" />
    </svg>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isMainPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLargeHeader = isMainPage && !isScrolled;

    return (
        <header className={`header ${isLargeHeader ? 'large-header' : 'small-header'}`}>
            {/* 로고 클릭 시 메인 이동 */}
            <Link to="/" className="logo-area">
                <img
                    src={`${process.env.PUBLIC_URL}/images/porterlogo.png`}
                    alt="PORTER 로고"
                    className="logo-img"
                />
            </Link>

            <div className="content-area">
                {isLargeHeader && (
                    <p className="top-text">
                        YOSHIDA,
                        <br />
                        POTER
                        <br />
                        STAND
                        <br />
                        YOSHIDA&
                        <br />
                        COMPANY
                    </p>
                )}

                <nav className="bottom-nav">
                    <ul className="menu-group-1">
                        <li className="has-icon">
                            <Link to="/product">
                                PRODUCT <PlusIcon size={isLargeHeader ? 17 : 13} />
                            </Link>
                        </li>
                        <li>
                            <Link to="/collab">COLLABORATION</Link>
                        </li>
                        <li>
                            <Link to="/about">ABOUT</Link>
                        </li>
                        <li>
                            <Link to="/offline">OFFLINE</Link>
                        </li>
                    </ul>
                    <ul className="menu-group-2">
                        <li>
                            <Link to="/product">SEARCH</Link>
                        </li>
                        <li>
                            <Link to="/login">MYPAGE</Link>
                        </li>
                        <li className="has-icon">
                            <Link to="/cart">
                                CART <PlusIcon size={isLargeHeader ? 17 : 13} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
