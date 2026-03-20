import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Board.scss';

const Board = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { notices, faqs, isLoggedIn, user, submitInquiry } = useStore();

    const [activeFaq, setActiveFaq] = useState(null);

    const [inquiryTitle, setInquiryTitle] = useState('');
    const [inquiryContent, setInquiryContent] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const handleInquirySubmit = () => {
        if (!isLoggedIn) {
            return Swal.fire({
                text: '로그인 후 이용 가능합니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            }).then(() => navigate('/login'));
        }
        if (!inquiryTitle.trim() || !inquiryContent.trim()) {
            return Swal.fire('경고', '모든 항목을 입력하세요.', 'warning');
        }

        submitInquiry({ userId: user.id, title: inquiryTitle, content: inquiryContent });
        Swal.fire({
            title: '접수 완료',
            text: '문의가 성공적으로 접수되었습니다. 마이페이지에서 확인 가능합니다.',
            icon: 'success',
            confirmButtonColor: '#1a1a1a',
        }).then(() => {
            navigate('/mypage');
        });
    };

    const getPageTitle = () => {
        if (type === 'notice') return 'NOTICE';
        if (type === 'faq') return 'FAQ';
        if (type === 'inquiry') return '1:1 INQUIRY';
        return 'CUSTOMER SERVICE';
    };

    return (
        <div className="board-page inner">
            <h2 className="page-title">{getPageTitle()}</h2>

            <div className="board-tabs">
                <Link to="/board/notice" className={type === 'notice' ? 'active' : ''}>
                    공지사항
                </Link>
                <Link to="/board/faq" className={type === 'faq' ? 'active' : ''}>
                    자주 묻는 질문
                </Link>
                <Link to="/board/inquiry" className={type === 'inquiry' ? 'active' : ''}>
                    1:1 문의하기
                </Link>
            </div>

            <div className="board-content">
                {type === 'notice' && (
                    <ul className="notice-list">
                        {notices.map((n) => (
                            <li key={n.id} className="notice-item">
                                <div className="notice-row">
                                    <span className="col-id">{n.id}</span>
                                    <span className="col-title">{n.title}</span>
                                    <span className="col-date">{n.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {type === 'faq' && (
                    <div className="faq-list">
                        {faqs.map((f) => (
                            <div
                                key={f.id}
                                className={`faq-item ${activeFaq === f.id ? 'open' : ''}`}
                            >
                                <div
                                    className="faq-q"
                                    onClick={() => setActiveFaq(activeFaq === f.id ? null : f.id)}
                                >
                                    <span className="q-mark">Q</span>
                                    <span className="title">
                                        [{f.category}] {f.title}
                                    </span>
                                    <span className="icon">
                                        {activeFaq === f.id ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </span>
                                </div>
                                {activeFaq === f.id && (
                                    <div className="faq-a">
                                        <span className="a-mark">A</span>
                                        <p>{f.content}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {type === 'inquiry' && (
                    <div className="inquiry-form">
                        {!isLoggedIn ? (
                            <div className="login-prompt block">
                                <p>회원만 1:1 문의가 가능합니다.</p>
                                <button onClick={() => navigate('/login')} className="btn-dark">
                                    로그인하러 가기
                                </button>
                            </div>
                        ) : (
                            <div className="form-inner">
                                <div className="form-group">
                                    <label>문의 제목</label>
                                    <input
                                        type="text"
                                        value={inquiryTitle}
                                        onChange={(e) => setInquiryTitle(e.target.value)}
                                        placeholder="제목을 입력하세요."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>문의 내용</label>
                                    <div style={{ background: '#fff' }}>
                                        <ReactQuill
                                            theme="snow"
                                            value={inquiryContent}
                                            onChange={setInquiryContent}
                                            style={{ height: '300px', marginBottom: '50px' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button className="btn-dark" onClick={handleInquirySubmit}>
                                        문의 접수하기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Board;
