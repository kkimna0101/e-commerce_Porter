import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';
const errorImg = '/images/404_error.png';

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="text-area">
        <p className="go-home" onClick={() => navigate('/')}>
          GO HOME <ArrowRightIcon />
        </p>
        <p className="about-products">
          ABOUT OUR PRODUCTS
        </p>
      </div>
      
      {/* 우클릭 금지*/}
      <img 
        src={errorImg} 
        alt="404 Page Not Found" 
        className="error-image" 
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default NotFound;
