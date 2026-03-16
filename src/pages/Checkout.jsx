import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Swal from 'sweetalert2';
import DaumPostcode from 'react-daum-postcode';
import './Checkout.scss';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, addOrder, removeMultipleFromCart, isLoggedIn } = useStore();
  
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [formData, setFormData] = useState({
    receiver: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    memo: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCard, setSelectedCard] = useState('');

  // location.state 에서 넘어온 selectedIds
  const selectedIds = location.state?.selectedIds || [];

  useEffect(() => {
    if (selectedIds.length === 0) {
      Swal.fire({ text: '주문할 상품이 없습니다.', icon: 'error', confirmButtonColor: '#1a1a1a' }).then(() => {
        navigate('/cart');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderItems = cartItems.filter(item => selectedIds.includes(item.cartId));
  const itemsPrice = orderItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const shippingFee = itemsPrice > 0 && itemsPrice < 100000 ? 3000 : 0;
  const totalPrice = itemsPrice + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompletePostcode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setFormData(prev => ({
      ...prev,
      zipcode: data.zonecode,
      address: fullAddress
    }));
    setIsPostcodeOpen(false);
  };

  const handlePayment = () => {
    if (!formData.receiver || !formData.phone || !formData.zipcode || !formData.address || !formData.detailAddress) {
      return Swal.fire({ text: '배송지 정보를 모두 입력해주세요.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
    }
    if (paymentMethod === 'card' && !selectedCard) {
      return Swal.fire({ text: '결제할 카드를 선택해주세요.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
    }

    // 게스트 결제여부 확인
    const userId = isLoggedIn ? useStore.getState().user.id : 'guest';

    const newOrder = {
      id: `ORD_${Date.now()}`,
      userId,
      items: orderItems,
      shippingInfo: formData,
      paymentMethod,
      selectedCard,
      subtotal: itemsPrice,
      shippingFee,
      totalAmount: totalPrice,
      createdAt: new Date().toISOString(),
      status: '결제완료'
    };

    addOrder(newOrder);
    removeMultipleFromCart(selectedIds);
    navigate('/complete', { state: { orderId: newOrder.id } });
  };

  return (
    <div className="checkout-page inner">
      <h2 className="checkout-page__title">CHECKOUT</h2>
      
      <div className="checkout-container">
        <div className="checkout-form-section">
          
          <div className="form-group-box">
            <h3>SHIPPING INFO</h3>
            <div className="form-row">
              <label>수령인</label>
              <input type="text" name="receiver" value={formData.receiver} onChange={handleInputChange} placeholder="이름을 입력하세요" />
            </div>
            <div className="form-row">
              <label>연락처</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="010-0000-0000" />
            </div>
            <div className="form-row address-row">
              <label>배송지 주소</label>
              <div className="zipcode-box">
                <input type="text" readOnly value={formData.zipcode} placeholder="우편번호" />
                <button type="button" onClick={() => setIsPostcodeOpen(true)}>주소 찾기</button>
              </div>
              <input type="text" readOnly value={formData.address} placeholder="기본 주소" className="mt-8" />
              <input type="text" name="detailAddress" value={formData.detailAddress} onChange={handleInputChange} placeholder="상세 주소를 입력하세요" className="mt-8" />
            </div>
            <div className="form-row">
              <label>배송 메모</label>
              <input type="text" name="memo" value={formData.memo} onChange={handleInputChange} placeholder="배송 시 요청사항을 입력하세요 (선택)" />
            </div>
          </div>

          <div className="form-group-box">
            <h3>PAYMENT METHOD</h3>
            <div className="payment-radios">
              <label className="radio-label">
                <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span>신용카드</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                <span>무통장 입금</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="card-select">
                <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)}>
                  <option value="">카드를 선택해주세요</option>
                  <option value="현대카드">현대카드</option>
                  <option value="삼성카드">삼성카드</option>
                  <option value="KB국민카드">KB국민카드</option>
                  <option value="신한카드">신한카드</option>
                </select>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bank-info">
                <p>계좌번호 안내: <strong>국민은행 123456-12-123456 (주)PORTER</strong></p>
                <p>주문 후 24시간 내 미입금 시 자동 취소됩니다.</p>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-summary-section">
          <div className="summary-box">
            <h3>ORDER SUMMARY</h3>
            <div className="order-items-preview">
              {orderItems.map(item => (
                <div key={item.cartId} className="preview-item">
                  <div className="img"><img src={item.image} alt={item.name} /></div>
                  <div className="info">
                    <p className="name">{item.name}</p>
                    <p className="opt">Color: {item.selectedColor} / Size: {item.selectedSize}</p>
                    <p className="qty-price">
                      {item.quantity}개 / {(item.discountPrice || item.price).toLocaleString()}₩
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row mt-24">
              <span>상품 금액</span>
              <span>{itemsPrice.toLocaleString()}₩</span>
            </div>
            <div className="summary-row">
              <span>배송비</span>
              <span>+{shippingFee.toLocaleString()}₩</span>
            </div>
            <div className="summary-row total">
              <span>총 결제 금액</span>
              <span>{totalPrice.toLocaleString()}₩</span>
            </div>
            
            <button className="btn-pay" onClick={handlePayment}>
              {totalPrice.toLocaleString()}₩ 결제하기
            </button>
          </div>
        </div>
      </div>

      {isPostcodeOpen && (
        <div className="postcode-modal">
          <div className="postcode-modal__bg" onClick={() => setIsPostcodeOpen(false)}></div>
          <div className="postcode-modal__content">
            <button className="close-btn" onClick={() => setIsPostcodeOpen(false)}>X</button>
            <DaumPostcode onComplete={handleCompletePostcode} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
