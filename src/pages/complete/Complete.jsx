import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import './Complete.scss';

const Complete = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { getOrderById, isLoggedIn } = useStore();

    const orderId = location.state?.orderId;
    const orderInfo = getOrderById(orderId);

    const [openSections, setOpenSections] = useState({
        order: true,
        payment: true,
        shipping: true,
    });

    useEffect(() => {
        if (!orderId || !orderInfo) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!orderInfo) return null;

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const firstItem = orderInfo.items[0];
    const remainCount = orderInfo.items.length - 1;
    const previewLabel =
        remainCount > 0 ? `${firstItem?.name} 외 ${remainCount}건` : firstItem?.name;

    const createdDate = new Date(orderInfo.createdAt)
        .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\. /g, ' - ')
        .replace('.', '');

    return (
        <div className="complete-page inner">
            <h2 className="complete-page__title">ORDER COMPLETE</h2>
            <p className="complete-page__sub">구매가 정상적으로 완료되었습니다.</p>

            <div className="complete-links">
                <Link to="/">GO HOME</Link>
                <Link to="/product">CONTINUE SHOPPING</Link>
            </div>

            {/* ── 주문 정보 ── */}
            <div className="complete-section">
                <button className="complete-section__head" onClick={() => toggleSection('order')}>
                    <span className="section-title">주문 정보</span>
                    <span className="section-preview">{!openSections.order && previewLabel}</span>
                    <span className={`section-arrow ${openSections.order ? 'open' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    </span>
                </button>

                {openSections.order && (
                    <div className="complete-section__body">
                        <div className="order-items">
                            {orderInfo.items.map((item) => (
                                <div key={item.cartId} className="order-item">
                                    <div className="order-item__img-wrap">
                                        <img src={item.image} alt={item.name} />
                                        <span className="order-item__qty">{item.quantity}</span>
                                    </div>
                                    <div className="order-item__info">
                                        <p className="order-item__name">{item.name}</p>
                                        <p className="order-item__opt">{item.selectedColor}</p>
                                        <p className="order-item__price">
                                            ₩{' '}
                                            {(
                                                (item.discountPrice || item.price) * item.quantity
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── 결제 정보 ── */}
            <div className="complete-section">
                <button className="complete-section__head" onClick={() => toggleSection('payment')}>
                    <span className="section-title">결제 정보</span>
                    <span className="section-preview" />
                    <span className={`section-arrow ${openSections.payment ? 'open' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    </span>
                </button>

                {openSections.payment && (
                    <div className="complete-section__body">
                        <div className="info-grid">
                            <span className="info-label">주문번호</span>
                            <span className="info-value">{orderInfo.id}</span>

                            <span className="info-label">결제일시</span>
                            <span className="info-value">{createdDate}</span>

                            <span className="info-label">결제수단</span>
                            <span className="info-value">
                                {orderInfo.paymentMethod === 'card'
                                    ? orderInfo.selectedCard
                                    : '무통장 입금'}
                            </span>

                            <span className="info-label">결제금액</span>
                            <span className="info-value">
                                {orderInfo.totalAmount.toLocaleString()}원
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 배송 정보 ── */}
            <div className="complete-section">
                <button
                    className="complete-section__head"
                    onClick={() => toggleSection('shipping')}
                >
                    <span className="section-title">배송 정보</span>
                    <span className="section-preview" />
                    <span className={`section-arrow ${openSections.shipping ? 'open' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                    </span>
                </button>

                {openSections.shipping && (
                    <div className="complete-section__body">
                        <div className="info-grid">
                            <span className="info-label">받으시는 분</span>
                            <span className="info-value">{orderInfo.shippingInfo.receiver}</span>

                            <span className="info-label">휴대전화</span>
                            <span className="info-value">
                                {orderInfo.shippingInfo.phone ||
                                    `${orderInfo.shippingInfo.phonePrefix}-${orderInfo.shippingInfo.phoneMid}-${orderInfo.shippingInfo.phoneLast}`}
                            </span>

                            <span className="info-label">이메일</span>
                            <span className="info-value">
                                {orderInfo.ordererInfo?.email || '-'}
                            </span>

                            <span className="info-label">주소</span>
                            <span className="info-value">
                                {orderInfo.shippingInfo.address}{' '}
                                {orderInfo.shippingInfo.detailAddress}
                            </span>

                            {orderInfo.shippingInfo.memo && (
                                <>
                                    <span className="info-label">배송 시 요청사항</span>
                                    <span className="info-value">
                                        {orderInfo.shippingInfo.memo}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── 하단 버튼 ── */}
            {/* <div className="complete-actions">
                {isLoggedIn ? (
                    <Link to="/mypage" className="btn-complete btn-complete--black">
                        주문 내역 보기
                    </Link>
                ) : (
                    <Link to="/login" className="btn-complete btn-complete--black">
                        로그인 하러 가기
                    </Link>
                )}
                <Link to="/" className="btn-complete btn-complete--outline">
                    홈으로 돌아가기
                </Link>
            </div> */}
        </div>
    );
};

export default Complete;
