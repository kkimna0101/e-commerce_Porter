import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 0' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ marginBottom: '20px' }}>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/" style={{ textDecoration: 'underline' }}>홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
