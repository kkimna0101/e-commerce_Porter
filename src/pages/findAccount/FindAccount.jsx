import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Swal from 'sweetalert2';
import '../login/Login.scss';

const FindAccount = () => {
    const navigate = useNavigate();
    const { findEmail, findPassword, resetPassword } = useStore();
    const [activeTab, setActiveTab] = useState('ID');

    // ID 찾기
    const [idName, setIdName] = useState('');
    const [idPhone, setIdPhone] = useState('');

    // PW 찾기
    const [pwEmail, setPwEmail] = useState('');
    const [pwName, setPwName] = useState('');
    const [isPwMatched, setIsPwMatched] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const handleFindId = (e) => {
        e.preventDefault();
        const email = findEmail(idName, idPhone);
        if (email) {
            Swal.fire({
                title: '이메일 확인',
                text: `회원님의 이메일은 ${email} 입니다.`,
                icon: 'success',
                confirmButtonColor: '#1a1a1a',
            });
        } else {
            Swal.fire({
                text: '일치하는 정보가 없습니다.',
                icon: 'error',
                confirmButtonColor: '#1a1a1a',
            });
        }
    };

    const handleFindPw = (e) => {
        e.preventDefault();
        const matched = findPassword(pwEmail, pwName);
        if (matched) {
            setIsPwMatched(true);
        } else {
            Swal.fire({
                text: '일치하는 정보가 없습니다.',
                icon: 'error',
                confirmButtonColor: '#1a1a1a',
            });
        }
    };

    const handleResetPw = (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            return Swal.fire({
                text: '비밀번호가 일치하지 않습니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        if (newPassword.length < 6) {
            return Swal.fire({
                text: '비밀번호는 6자리 이상이어야 합니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }

        resetPassword(pwEmail, newPassword);
        Swal.fire({
            title: '변경 완료',
            text: '비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.',
            icon: 'success',
            confirmButtonColor: '#1a1a1a',
        }).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="find-account-page inner">
            <div className="find-box">
                <h2>FIND ACCOUNT</h2>

                <div
                    className="tabs-header"
                    style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        borderBottom: '1px solid #e5e5e5',
                    }}
                >
                    <button
                        style={{
                            padding: '16px 0',
                            fontSize: '15px',
                            fontWeight: '700',
                            borderBottom: activeTab === 'ID' ? '2px solid #000' : 'none',
                            color: activeTab === 'ID' ? '#000' : '#a1a1a1',
                        }}
                        onClick={() => {
                            setActiveTab('ID');
                            setIsPwMatched(false);
                        }}
                    >
                        FIND ID
                    </button>
                    <button
                        style={{
                            padding: '16px 0',
                            fontSize: '15px',
                            fontWeight: '700',
                            borderBottom: activeTab === 'PW' ? '2px solid #000' : 'none',
                            color: activeTab === 'PW' ? '#000' : '#a1a1a1',
                        }}
                        onClick={() => setActiveTab('PW')}
                    >
                        FIND PASSWORD
                    </button>
                </div>

                {activeTab === 'ID' && (
                    <form onSubmit={handleFindId} className="find-form">
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={idName}
                                onChange={(e) => setIdName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder="PHONE (010-0000-0000)"
                                value={idPhone}
                                onChange={(e) => setIdPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            FIND ID
                        </button>
                    </form>
                )}

                {activeTab === 'PW' && !isPwMatched && (
                    <form onSubmit={handleFindPw} className="find-form">
                        <div className="input-row">
                            <input
                                type="email"
                                placeholder="E-MAIL"
                                value={pwEmail}
                                onChange={(e) => setPwEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder="NAME"
                                value={pwName}
                                onChange={(e) => setPwName(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            FIND PASSWORD
                        </button>
                    </form>
                )}

                {activeTab === 'PW' && isPwMatched && (
                    <form onSubmit={handleResetPw} className="find-form">
                        <p
                            style={{
                                textAlign: 'center',
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#555',
                            }}
                        >
                            새로운 비밀번호를 입력해주세요.
                        </p>
                        <div className="input-row">
                            <input
                                type="password"
                                placeholder="NEW PASSWORD"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="password"
                                placeholder="CONFIRM NEW PASSWORD"
                                value={newPasswordConfirm}
                                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            RESET PASSWORD
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FindAccount;
