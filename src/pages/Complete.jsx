import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckCircle } from 'lucide-react';
import './Complete.scss';

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrderById, isLoggedIn } = useStore();
  
  const orderId = location.state?.orderId;
  const orderInfo = getOrderById(orderId);

  useEffect(() => {
    if (!orderId || !orderInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!orderInfo) return null;

  return (
    <div className="complete-page inner">
      <div className="complete-box">
        <CheckCircle size={64} className="icon-success" />
        <h2>주문이 완료되었습니다!</h2>
        <p className="order-number">주문 번호 : <strong>{orderInfo.id}</strong></p>
        
        <div className="order-summary-box">
          <div className="summary-item">
            <span className="label">수령인</span>
            <span className="value">{orderInfo.shippingInfo.receiver}</span>
          </div>
          <div className="summary-item">
            <span className="label">배송지</span>
            <span className="value">{orderInfo.shippingInfo.address} {orderInfo.shippingInfo.detailAddress}</span>
          </div>
          <div className="summary-item">
            <span className="label">결제 금액</span>
            <span className="value highlight">{orderInfo.totalAmount.toLocaleString()}₩</span>
          </div>
          <div className="summary-item">
            <span className="label">결제 수단</span>
            <span className="value">
              {orderInfo.paymentMethod === 'card' ? `${orderInfo.selectedCard} 결제` : '무통장 입금 (국민은행 123456-12-123456)'}
            </span>
          </div>
        </div>

        <div className="action-buttons">
          {isLoggedIn ? (
            <Link to="/mypage" className="btn btn-black">주문 내역 보기</Link>
          ) : (
            <Link to="/login" className="btn btn-black">로그인 하러 가기</Link>
          )}
          <Link to="/" className="btn btn-outline">홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Complete;
