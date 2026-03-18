import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const { login, loginAsTestUser, error } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saveId, setSaveId] = useState(false);

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
            <h2 className="login-page__title">LOGIN</h2>
            <hr className="login-divider" />

            {/* ── 로그인 폼 영역 ── */}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form__left">
                    <div className="login-row">
                        <label>이메일 아이디</label>
                        <input
                            type="email"
                            placeholder="이메일 아이디를 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-row">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <div className="login-options">
                        <label className="save-id-label">
                            <input
                                type="radio"
                                checked={saveId}
                                onChange={() => setSaveId(!saveId)}
                            />
                            <span>아이디 저장하기</span>
                        </label>
                    </div>
                </div>

                <div className="login-form__right">
                    <button type="submit" className="btn-login">
                        LOGIN
                    </button>
                    <div className="login-find-links">
                        <Link to="/find-account">아이디 찾기</Link>
                        <span className="divider-text">|</span>
                        <Link to="/find-account">비밀번호 찾기</Link>
                    </div>
                </div>
            </form>

            <hr className="login-divider" />

            {/* ── 회원가입 영역 ── */}
            <div className="login-join-section">
                <div className="login-join-section__left">
                    <p className="join-title">JOIN MEMBERSHIP →</p>
                    <p className="join-sub">회원가입하기</p>
                </div>
                <div className="login-join-section__right">
                    <div className="join-right-stack">
                        <Link to="/signup" className="btn-join">
                            JOIN TO US
                        </Link>
                        <button type="button" className="btn-test" onClick={handleTestLogin}>
                            임시 회원 (테스트용) 시작하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
