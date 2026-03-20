import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Swal from 'sweetalert2';
import DaumPostcode from 'react-daum-postcode';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ProductItem from '../../components/ProductItem';
import './MyPage.scss';

const MyPage = () => {
    const navigate = useNavigate();
    const {
        isLoggedIn,
        user,
        logout,
        updateUserAddress,
        getUserOrders,
        getUserWishlist,
        getUserQnas,
        getUserInquiries,
        getUserReviews,
        submitQna,
        updateQna,
        deleteQna,
        submitInquiry,
        updateInquiry,
        deleteInquiry,
        updateReview,
        deleteReview,
    } = useStore();

    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        if (!isLoggedIn) {
            Swal.fire({
                text: '로그인이 필요한 서비스입니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            }).then(() => {
                navigate('/login');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    if (!isLoggedIn || !user) return null;

    const handleLogout = () => {
        Swal.fire({
            text: '로그아웃 하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#1a1a1a',
        }).then((res) => {
            if (res.isConfirmed) {
                logout();
                navigate('/');
            }
        });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return <TabOrders user={user} getUserOrders={getUserOrders} />;
            case 'wishlist':
                return <TabWishlist user={user} getUserWishlist={getUserWishlist} />;
            case 'points':
                return <TabEmptyState title="적립금" msg="사용 가능한 적립금이 없습니다." />;
            case 'coupons':
                return <TabEmptyState title="쿠폰" msg="사용 가능한 쿠폰이 없습니다." />;
            case 'profile':
                return <TabProfile user={user} />;
            case 'address':
                return <TabAddress user={user} updateUserAddress={updateUserAddress} />;
            case 'qna':
                return (
                    <TabQna
                        user={user}
                        getUserQnas={getUserQnas}
                        submitQna={submitQna}
                        updateQna={updateQna}
                        deleteQna={deleteQna}
                    />
                );
            case 'faq':
                return <TabFaqNotice type="faq" />;
            case 'notice':
                return <TabFaqNotice type="notice" />;
            case 'inquiry':
                return (
                    <TabInquiry
                        user={user}
                        getUserInquiries={getUserInquiries}
                        getUserReviews={getUserReviews}
                        submitInquiry={submitInquiry}
                        updateInquiry={updateInquiry}
                        deleteInquiry={deleteInquiry}
                        updateReview={updateReview}
                        deleteReview={deleteReview}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="mypage inner">
            <div className="mypage__welcome">
                <h2>
                    안녕하세요, <strong>{user.name}</strong>님
                </h2>
            </div>

            <div className="mypage__container">
                <aside className="mypage__sidebar">
                    <div className="menu-group">
                        <h3>주문관리</h3>
                        <ul>
                            <li
                                className={activeTab === 'orders' ? 'active' : ''}
                                onClick={() => setActiveTab('orders')}
                            >
                                주문내역
                            </li>
                            <li
                                className={activeTab === 'wishlist' ? 'active' : ''}
                                onClick={() => setActiveTab('wishlist')}
                            >
                                관심 상품
                            </li>
                        </ul>
                    </div>
                    <div className="menu-group">
                        <h3>혜택정보</h3>
                        <ul>
                            <li
                                className={activeTab === 'points' ? 'active' : ''}
                                onClick={() => setActiveTab('points')}
                            >
                                적립금
                            </li>
                            <li
                                className={activeTab === 'coupons' ? 'active' : ''}
                                onClick={() => setActiveTab('coupons')}
                            >
                                쿠폰
                            </li>
                        </ul>
                    </div>
                    <div className="menu-group">
                        <h3>나의 정보관리</h3>
                        <ul>
                            <li
                                className={activeTab === 'profile' ? 'active' : ''}
                                onClick={() => setActiveTab('profile')}
                            >
                                회원 정보 수정
                            </li>
                            <li
                                className={activeTab === 'address' ? 'active' : ''}
                                onClick={() => setActiveTab('address')}
                            >
                                배송지 관리
                            </li>
                            <li onClick={handleLogout}>로그아웃</li>
                        </ul>
                    </div>
                    <div className="menu-group">
                        <h3>고객센터</h3>
                        <ul>
                            <li
                                className={activeTab === 'qna' ? 'active' : ''}
                                onClick={() => setActiveTab('qna')}
                            >
                                Q&A
                            </li>
                            <li
                                className={activeTab === 'faq' ? 'active' : ''}
                                onClick={() => setActiveTab('faq')}
                            >
                                FAQ
                            </li>
                            <li
                                className={activeTab === 'notice' ? 'active' : ''}
                                onClick={() => setActiveTab('notice')}
                            >
                                공지사항
                            </li>
                            <li
                                className={activeTab === 'inquiry' ? 'active' : ''}
                                onClick={() => setActiveTab('inquiry')}
                            >
                                1:1 문의 / 리뷰 관리
                            </li>
                        </ul>
                    </div>
                </aside>

                <main className="mypage__content">{renderContent()}</main>
            </div>
        </div>
    );
};

/* ===== 탭 컴포넌트들 ===== */

const TabEmptyState = ({ title, msg }) => (
    <div className="tab-section empty">
        <h3>{title}</h3>
        <div className="box">
            <p>{msg}</p>
        </div>
    </div>
);

const TabOrders = ({ user, getUserOrders }) => {
    const orders = getUserOrders(user.id);
    return (
        <div className="tab-section">
            <h3>주문내역</h3>
            {orders.length === 0 ? (
                <div className="box">
                    <p>주문 내역이 없습니다.</p>
                </div>
            ) : (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-card">
                            <div className="order-head">
                                <span className="date">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                                <span className="oid">{order.id}</span>
                            </div>
                            <div className="order-body">
                                <img src={order.items[0]?.image} alt={order.items[0]?.name} />
                                <div className="info">
                                    <p className="name">
                                        {order.items[0]?.name}{' '}
                                        {order.items.length > 1
                                            ? `외 ${order.items.length - 1}건`
                                            : ''}
                                    </p>
                                    <p className="price">{order.totalAmount.toLocaleString()}₩</p>
                                    <p className="status">{order.status}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const TabWishlist = ({ user, getUserWishlist }) => {
    const items = getUserWishlist(user.id);
    return (
        <div className="tab-section">
            <h3>관심 상품</h3>
            {items.length === 0 ? (
                <div className="box">
                    <p>관심 상품이 없습니다.</p>
                </div>
            ) : (
                <div className="grid-2col">
                    {items.map((w) => (
                        <ProductItem key={w.product.id} product={w.product} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TabProfile = ({ user }) => (
    <div className="tab-section">
        <h3>회원 정보 수정</h3>
        <div className="form-like">
            <label>이름</label>
            <input type="text" readOnly value={user.name} />
            <label>이메일</label>
            <input type="text" readOnly value={user.email} />
            <button
                className="btn-dark mt-4"
                onClick={() =>
                    Swal.fire('비밀번호 변경', '비밀번호 찾기를 통해 재설정 가능합니다.', 'info')
                }
            >
                비밀번호 변경 안내
            </button>
        </div>
    </div>
);

const TabAddress = ({ user, updateUserAddress }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const handleCompletePostcode = (data) => {
        let fullAddress = data.address;
        if (data.addressType === 'R') {
            let extraAddress = '';
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '')
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddress(`[${data.zonecode}] ${fullAddress} `);
        setIsPostcodeOpen(false);
    };

    const handleSave = () => {
        updateUserAddress(user.id, phone, address);
        setIsEdit(false);
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            title: '저장되었습니다.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    if (isEdit) {
        return (
            <div className="tab-section relative">
                <h3>배송지 관리</h3>
                <div className="form-like">
                    <label>연락처</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                    />
                    <label>배송지 주소</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="직접 입력 또는 주소 찾기"
                        />
                        <button className="btn-dark" onClick={() => setIsPostcodeOpen(true)}>
                            주소 찾기
                        </button>
                    </div>
                    <button className="btn-dark mt-4" onClick={handleSave}>
                        저장하기
                    </button>
                    <button className="btn-outline mt-2" onClick={() => setIsEdit(false)}>
                        취소
                    </button>
                </div>
                {isPostcodeOpen && (
                    <div
                        className="postcode-modal"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 100,
                            background: '#fff',
                            border: '1px solid #ddd',
                            padding: '20px',
                        }}
                    >
                        <button
                            onClick={() => setIsPostcodeOpen(false)}
                            style={{ marginBottom: '10px' }}
                        >
                            닫기
                        </button>
                        <DaumPostcode onComplete={handleCompletePostcode} />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="tab-section">
            <h3>기본 배송지</h3>
            <div className="box">
                <p>
                    <strong>연락처:</strong> {user.phone || '등록된 연락처가 없습니다.'}
                </p>
                <p style={{ marginTop: '8px' }}>
                    <strong>주소:</strong> {user.address || '등록된 주소가 없습니다.'}
                </p>
                <button className="btn-outline mt-4" onClick={() => setIsEdit(true)}>
                    수정하기
                </button>
            </div>
        </div>
    );
};

// 단순 안내 텍스트
const TabFaqNotice = ({ type }) => (
    <div className="tab-section">
        <h3>{type === 'faq' ? 'FAQ (자주 묻는 질문)' : '공지사항'}</h3>
        <div className="box">
            <p>
                전체 {type === 'faq' ? 'FAQ' : '공지'} 목록은 해당{' '}
                <Link
                    to={`/board/${type}`}
                    style={{ color: 'black', fontWeight: 700, textDecoration: 'underline' }}
                >
                    안내 보드
                </Link>
                를 확인해주세요.
            </p>
        </div>
    </div>
);

// QnA CRUD
const TabQna = ({ user, getUserQnas, submitQna, updateQna, deleteQna }) => {
    const [isWrite, setIsWrite] = useState(false);
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const qnas = getUserQnas(user.id);

    const handleSave = () => {
        if (!title.trim() || !content.trim())
            return Swal.fire('경고', '모든 항목을 입력하세요.', 'warning');
        if (editId) {
            updateQna(editId, { title, content });
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                title: '수정됨',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        } else {
            submitQna({ userId: user.id, title, content });
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                title: '등록됨',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
        }
        setIsWrite(false);
        setEditId(null);
        setTitle('');
        setContent('');
    };

    const handleEdit = (q) => {
        setTitle(q.title);
        setContent(q.content);
        setEditId(q.id);
        setIsWrite(true);
    };
    const handleDelete = (id) => {
        Swal.fire({
            text: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#111',
        }).then((r) => {
            if (r.isConfirmed) deleteQna(id);
        });
    };

    if (isWrite)
        return (
            <div className="tab-section">
                <h3>Q&A 작성</h3>
                <div className="form-like">
                    <input
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ background: '#fff' }}>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            style={{ height: '300px', marginBottom: '50px' }}
                        />
                    </div>
                    <button className="btn-dark" onClick={handleSave}>
                        저장
                    </button>
                    <button
                        className="btn-outline mt-2"
                        onClick={() => {
                            setIsWrite(false);
                            setEditId(null);
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        );

    return (
        <div className="tab-section">
            <h3>나의 Q&A</h3>
            <button className="btn-dark mb-4" onClick={() => setIsWrite(true)}>
                작성하기
            </button>
            {qnas.length === 0 ? (
                <div className="box">
                    <p>작성한 Q&A가 없습니다.</p>
                </div>
            ) : (
                <ul className="board-list">
                    {qnas.map((q) => (
                        <li key={q.id}>
                            <div className="row-head">
                                <strong>{q.title}</strong>
                                <span>{q.date}</span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: q.content }}
                                className="html-content"
                            />
                            <div className="actions">
                                <button onClick={() => handleEdit(q)}>수정</button>
                                <button onClick={() => handleDelete(q.id)}>삭제</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Inquiry & Review 통합 탭
const TabInquiry = ({
    user,
    getUserInquiries,
    getUserReviews,
    submitInquiry,
    updateInquiry,
    deleteInquiry,
    updateReview,
    deleteReview,
}) => {
    const inquiries = getUserInquiries(user.id);
    const reviews = getUserReviews(user.name);

    const [isWrite, setIsWrite] = useState(false);
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [editReviewId, setEditReviewId] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState('');
    const [editReviewRating, setEditReviewRating] = useState(5);

    const handleInqSave = () => {
        if (!title.trim() || !content.trim())
            return Swal.fire('경고', '항목을 입력하세요.', 'warning');
        if (editId) updateInquiry(editId, { title, content });
        else submitInquiry({ userId: user.id, title, content });
        setIsWrite(false);
        setEditId(null);
        setTitle('');
        setContent('');
    };
    const handleInqEdit = (i) => {
        setTitle(i.title);
        setContent(i.content);
        setEditId(i.id);
        setIsWrite(true);
    };
    const handleInqDel = (id) =>
        Swal.fire({
            text: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#111',
        }).then((r) => {
            if (r.isConfirmed) deleteInquiry(id);
        });

    const handleRevSave = (productId, reviewId) => {
        updateReview(productId, reviewId, editReviewContent, editReviewRating);
        setEditReviewId(null);
    };
    const handleRevEdit = (r) => {
        setEditReviewId(r.id);
        setEditReviewContent(r.content);
        setEditReviewRating(r.rating);
    };
    const handleRevDel = (pid, rId) =>
        Swal.fire({
            text: '삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#111',
        }).then((r) => {
            if (r.isConfirmed) deleteReview(pid, rId);
        });

    return (
        <div className="tab-section">
            <h3>내가 쓴 상품 리뷰</h3>
            {reviews.length === 0 ? (
                <div className="box">
                    <p>작성한 리뷰가 없습니다.</p>
                </div>
            ) : (
                <ul className="board-list review">
                    {reviews.map((r) => (
                        <li key={`rev_${r.productId}_${r.id}`}>
                            <div className="row-head">
                                <img
                                    src={r.productImage}
                                    alt={r.productName}
                                    style={{ width: '40px', marginRight: '12px' }}
                                />
                                <span>{r.productName}</span>
                                <span style={{ marginLeft: 'auto' }}>{r.date}</span>
                            </div>

                            {editReviewId === r.id ? (
                                <div className="rev-edit-box mt-4">
                                    <div style={{ marginBottom: '8px' }}>
                                        Rating:{' '}
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={editReviewRating}
                                            onChange={(e) =>
                                                setEditReviewRating(Number(e.target.value))
                                            }
                                        />
                                    </div>
                                    <textarea
                                        value={editReviewContent}
                                        onChange={(e) => setEditReviewContent(e.target.value)}
                                        style={{ width: '100%', height: '80px', padding: '8px' }}
                                    ></textarea>
                                    <button
                                        className="btn-dark mt-2"
                                        onClick={() => handleRevSave(r.productId, r.id)}
                                    >
                                        저장
                                    </button>
                                    <button
                                        className="btn-outline mt-2"
                                        onClick={() => setEditReviewId(null)}
                                    >
                                        취소
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p style={{ margin: '8px 0' }}>
                                        Rating: {'★'.repeat(r.rating)}
                                    </p>
                                    <p className="html-content">{r.content}</p>
                                    <div className="actions">
                                        <button onClick={() => handleRevEdit(r)}>수정</button>
                                        <button onClick={() => handleRevDel(r.productId, r.id)}>
                                            삭제
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <hr style={{ margin: '40px 0', borderColor: '#e5e5e5' }} />

            <h3>내 1:1 문의</h3>
            {isWrite ? (
                <div className="form-like">
                    <input
                        type="text"
                        placeholder="문의 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ background: '#fff' }}>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            style={{ height: '300px', marginBottom: '50px' }}
                        />
                    </div>
                    <button className="btn-dark" onClick={handleInqSave}>
                        저장
                    </button>
                    <button
                        className="btn-outline mt-2"
                        onClick={() => {
                            setIsWrite(false);
                            setEditId(null);
                        }}
                    >
                        취소
                    </button>
                </div>
            ) : (
                <>
                    <button className="btn-dark mb-4" onClick={() => setIsWrite(true)}>
                        문의 작성
                    </button>
                    {inquiries.length === 0 ? (
                        <div className="box">
                            <p>문의 내역이 없습니다.</p>
                        </div>
                    ) : (
                        <ul className="board-list">
                            {inquiries.map((i) => (
                                <li key={i.id}>
                                    <div className="row-head">
                                        <strong>{i.title}</strong>
                                        <span>{i.date}</span>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: i.content }}
                                        className="html-content"
                                    />
                                    <div className="actions">
                                        <button onClick={() => handleInqEdit(i)}>수정</button>
                                        <button onClick={() => handleInqDel(i.id)}>삭제</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default MyPage;
