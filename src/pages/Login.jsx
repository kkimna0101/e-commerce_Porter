import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginAsTestUser, error } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ email, password });
    if (success) {
      navigate('/');
    }
  };

  const handleTestLogin = () => {
    loginAsTestUser();
    navigate('/');
  };

  return (
    <div className="login-page inner">
      <div className="login-box">
        <h2>LOGIN</h2>
        <p className="desc">PORTER 방문을 환영합니다.</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-row">
            <input 
              type="email" 
              placeholder="E-MAIL" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-row">
            <input 
              type="password" 
              placeholder="PASSWORD" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          {error && <p className="error-msg">{error}</p>}
          
          <button type="submit" className="btn-login">LOG IN</button>
        </form>

        <div className="test-login-wrap">
          <button type="button" className="btn-test" onClick={handleTestLogin}>임시 회원 (테스트용) 시작하기</button>
        </div>

        <div className="login-links">
          <Link to="/find-account">Find ID / PASSWORD</Link>
          <Link to="/signup" className="join-link">JOIN NOW</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
