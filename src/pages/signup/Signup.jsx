import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Swal from 'sweetalert2';
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, error } = useStore();

    const [formData, setFormData] = useState({
        emailId: '',
        emailDomain: '',
        emailDomainCustom: '',
        password: '',
        passwordConfirm: '',
        name: '',
        eventConsent: '',
    });

    const [terms, setTerms] = useState({
        all: false,
        age: false,
        service: false,
        privacy: false,
    });

    const [openTerms, setOpenTerms] = useState({
        service: false,
        privacy: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmailDomainSelect = (e) => {
        const val = e.target.value;
        setFormData((prev) => ({
            ...prev,
            emailDomain: val,
            emailDomainCustom: val === 'direct' || val === '' ? prev.emailDomainCustom : val,
        }));
    };

    const getEmail = () => {
        const domain =
            formData.emailDomain === 'direct' || formData.emailDomain === ''
                ? formData.emailDomainCustom
                : formData.emailDomain;
        return `${formData.emailId}@${domain}`;
    };

    const handleTermAll = (checked) => {
        setTerms({ all: checked, age: checked, service: checked, privacy: checked });
    };

    const handleTerm = (key, checked) => {
        const next = { ...terms, [key]: checked };
        next.all = next.age && next.service && next.privacy;
        setTerms(next);
    };

    const toggleTermOpen = (key) => {
        setOpenTerms((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.emailId || (!formData.emailDomainCustom && !formData.emailDomain)) {
            return Swal.fire({
                position: 'top',
                text: '이메일을 입력해주세요.',
                icon: 'warning',
                confirmButtonColor: '#5D675B',
            });
        }
        if (formData.password !== formData.passwordConfirm) {
            return Swal.fire({
                position: 'top',
                text: '비밀번호가 일치하지 않습니다.',
                icon: 'warning',
                confirmButtonColor: '#5D675B',
            });
        }
        if (!terms.age || !terms.service || !terms.privacy) {
            return Swal.fire({
                position: 'top',
                text: '필수 약관에 동의해주세요.',
                icon: 'warning',
                confirmButtonColor: '#5D675B',
            });
        }

        const success = signup({
            name: formData.name,
            email: getEmail(),
            password: formData.password,
        });

        if (success) {
            Swal.fire({
                position: 'top',
                title: '가입 완료',
                text: '포터의 회원이 되신 것을 환영합니다.',
                icon: 'success',
                confirmButtonColor: '#5D675B',
            }).then(() => navigate('/login'));
        }
    };

    return (
        <div className="signup-page inner">
            <h2 className="signup-page__title">JOIN MEMBERSHIP</h2>
            <hr className="signup-divider" />

            <form onSubmit={handleSubmit} className="signup-form">
                {/* ── 이메일 아이디 ── */}
                <div className="signup-row">
                    <label>이메일 아이디</label>
                    <div className="email-box">
                        <input
                            type="text"
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleChange}
                            placeholder="이메일 아이디를 입력하세요"
                            required
                        />
                        <span className="email-at">@</span>
                        <input
                            type="text"
                            name="emailDomainCustom"
                            value={formData.emailDomainCustom}
                            onChange={handleChange}
                            placeholder="직접입력"
                            disabled={
                                formData.emailDomain !== '' && formData.emailDomain !== 'direct'
                            }
                            className={
                                formData.emailDomain !== '' && formData.emailDomain !== 'direct'
                                    ? 'disabled'
                                    : ''
                            }
                        />
                        <div className="select-wrap">
                            <select value={formData.emailDomain} onChange={handleEmailDomainSelect}>
                                <option value="">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="kakao.com">kakao.com</option>
                                <option value="direct">직접입력</option>
                            </select>
                        </div>
                        <span className="email-hint">본인 소유의 이메일을 선택해 주세요.</span>
                    </div>
                </div>

                {/* ── 비밀번호 ── */}
                <div className="signup-row">
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="영문 + 숫자 + 특수문자 조합 8~16자리"
                        required
                        minLength={6}
                    />
                </div>

                {/* ── 비밀번호 확인 ── */}
                <div className="signup-row">
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder=""
                        required
                    />
                </div>

                {/* ── 이름 ── */}
                <div className="signup-row">
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ex) 홍길동"
                        required
                    />
                </div>

                {/* ── 이벤트 정보 동의 ── */}
                <div className="signup-row">
                    <label>이벤트 정보 동의</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="eventConsent"
                                value="수신"
                                checked={formData.eventConsent === '수신'}
                                onChange={handleChange}
                            />
                            <span>수신</span>
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="eventConsent"
                                value="비수신"
                                checked={formData.eventConsent === '비수신'}
                                onChange={handleChange}
                            />
                            <span>비수신</span>
                        </label>
                    </div>
                </div>

                {error && <p className="signup-error">{error}</p>}

                {/* <hr className="signup-divider" /> */}

                {/* ── 약관 동의 ── */}
                <div className="terms-section">
                    {/* 전체동의 */}
                    <div className="terms-row terms-row--all">
                        <label className="terms-label">
                            <input
                                type="checkbox"
                                checked={terms.all}
                                onChange={(e) => handleTermAll(e.target.checked)}
                            />
                            <span>전체동의합니다.</span>
                        </label>
                    </div>

                    {/* 만 14세 이상 */}
                    <div className="terms-row">
                        <label className="terms-label">
                            <input
                                type="checkbox"
                                checked={terms.age}
                                onChange={(e) => handleTerm('age', e.target.checked)}
                            />
                            <span>만 14세 이상입니다. (필수)</span>
                        </label>
                    </div>

                    {/* 이용약관 */}
                    <div className="terms-row">
                        <div className="terms-row__head">
                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    checked={terms.service}
                                    onChange={(e) => handleTerm('service', e.target.checked)}
                                />
                                <span>이용약관 동의 (필수)</span>
                            </label>
                            <button
                                type="button"
                                className={`terms-toggle ${openTerms.service ? 'open' : ''}`}
                                onClick={() => toggleTermOpen('service')}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                        </div>
                        {openTerms.service && (
                            <div className="terms-content">
                                <p>
                                    이용약관 내용이 들어갑니다. 서비스 이용에 관한 규정 및 조건을
                                    포함합니다.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 개인정보 수집 */}
                    <div className="terms-row">
                        <div className="terms-row__head">
                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    checked={terms.privacy}
                                    onChange={(e) => handleTerm('privacy', e.target.checked)}
                                />
                                <span>개인정보 수집 및 이용에 대한 동의 (필수)</span>
                            </label>
                            <button
                                type="button"
                                className={`terms-toggle ${openTerms.privacy ? 'open' : ''}`}
                                onClick={() => toggleTermOpen('privacy')}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                        </div>
                        {openTerms.privacy && (
                            <div className="terms-content">
                                <p>
                                    개인정보 수집 및 이용에 관한 내용이 들어갑니다. 수집 항목, 목적,
                                    보유기간 등을 포함합니다.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 버튼 ── */}
                <div className="signup-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
                        취소
                    </button>
                    <button type="submit" className="btn-confirm">
                        확인
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
