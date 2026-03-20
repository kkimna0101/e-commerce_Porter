import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Swal from 'sweetalert2';
import DaumPostcode from 'react-daum-postcode';
import './Checkout.scss';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, addOrder, removeMultipleFromCart, isLoggedIn } = useStore();

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 주문자 정보
    const [ordererData, setOrdererData] = useState({
        name: '',
        phonePrefix: '010',
        phoneMid: '',
        phoneLast: '',
        emailId: '',
        emailDomain: '',
        emailDomainCustom: '',
        password: '',
        passwordConfirm: '',
    });

    // 배송지 정보
    const [formData, setFormData] = useState({
        receiver: '',
        phonePrefix: '010',
        phoneMid: '',
        phoneLast: '',
        zipcode: '',
        address: '',
        detailAddress: '',
        memo: '',
    });

    const [sameAsOrderer, setSameAsOrderer] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedCard, setSelectedCard] = useState('');

    const selectedIds = location.state?.selectedIds || [];

    useEffect(() => {
        if (selectedIds.length === 0) {
            Swal.fire({
                text: '주문할 상품이 없습니다.',
                icon: 'error',
                confirmButtonColor: '#1a1a1a',
            }).then(() => {
                navigate('/cart');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 주문자 정보와 동일 체크 시 배송지 자동 입력
    useEffect(() => {
        if (sameAsOrderer) {
            setFormData((prev) => ({
                ...prev,
                receiver: ordererData.name,
                phonePrefix: ordererData.phonePrefix,
                phoneMid: ordererData.phoneMid,
                phoneLast: ordererData.phoneLast,
            }));
        }
    }, [sameAsOrderer, ordererData]);

    const orderItems = cartItems.filter((item) => selectedIds.includes(item.cartId));
    const itemsPrice = orderItems.reduce(
        (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
        0
    );
    const shippingFee = itemsPrice > 0 && itemsPrice < 100000 ? 3000 : 0;
    const totalPrice = itemsPrice + shippingFee;

    const handleOrdererChange = (e) => {
        const { name, value } = e.target;
        setOrdererData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCompletePostcode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '')
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setFormData((prev) => ({
            ...prev,
            zipcode: data.zonecode,
            address: fullAddress,
        }));
        setIsPostcodeOpen(false);
    };

    const getPhone = (data) => `${data.phonePrefix}-${data.phoneMid}-${data.phoneLast}`;

    const getEmail = () => {
        const domain =
            ordererData.emailDomain === 'direct'
                ? ordererData.emailDomainCustom
                : ordererData.emailDomain;
        return `${ordererData.emailId}@${domain}`;
    };

    const handlePayment = () => {
        if (
            !ordererData.name ||
            !ordererData.phoneMid ||
            !ordererData.phoneLast ||
            !ordererData.emailId ||
            !ordererData.password
        ) {
            return Swal.fire({
                text: '주문자 정보를 모두 입력해주세요.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        if (ordererData.password !== ordererData.passwordConfirm) {
            return Swal.fire({
                text: '비밀번호가 일치하지 않습니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        if (
            !formData.receiver ||
            !formData.phoneMid ||
            !formData.phoneLast ||
            !formData.zipcode ||
            !formData.address ||
            !formData.detailAddress
        ) {
            return Swal.fire({
                text: '배송지 정보를 모두 입력해주세요.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        if (paymentMethod === 'card' && !selectedCard) {
            return Swal.fire({
                text: '결제할 카드를 선택해주세요.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }

        const userId = isLoggedIn ? useStore.getState().user.id : 'guest';

        const newOrder = {
            id: `ORD_${Date.now()}`,
            userId,
            items: orderItems,
            ordererInfo: {
                name: ordererData.name,
                phone: getPhone(ordererData),
                email: getEmail(),
            },
            shippingInfo: {
                ...formData,
                phone: getPhone(formData),
            },
            paymentMethod,
            selectedCard,
            subtotal: itemsPrice,
            shippingFee,
            totalAmount: totalPrice,
            createdAt: new Date().toISOString(),
            status: '결제완료',
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
                    {/* ── 주문자 정보 ── */}
                    <div className="form-group-box">
                        <h3>주문자 정보</h3>

                        <div className="form-row">
                            <label>이름</label>
                            <input
                                type="text"
                                name="name"
                                value={ordererData.name}
                                onChange={handleOrdererChange}
                                placeholder="이름을 입력하세요"
                            />
                        </div>

                        <div className="form-row">
                            <label>휴대전화</label>
                            <div className="phone-box">
                                <select
                                    name="phonePrefix"
                                    value={ordererData.phonePrefix}
                                    onChange={handleOrdererChange}
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                <span className="phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phoneMid"
                                    value={ordererData.phoneMid}
                                    onChange={handleOrdererChange}
                                    placeholder="0000"
                                    maxLength={4}
                                />
                                <span className="phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phoneLast"
                                    value={ordererData.phoneLast}
                                    onChange={handleOrdererChange}
                                    placeholder="0000"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>이메일</label>
                            <div className="email-box">
                                <input
                                    type="text"
                                    name="emailId"
                                    value={ordererData.emailId}
                                    onChange={handleOrdererChange}
                                    placeholder="이메일 아이디"
                                />
                                <span className="email-at">@</span>
                                <input
                                    type="text"
                                    name="emailDomainCustom"
                                    value={ordererData.emailDomainCustom}
                                    onChange={handleOrdererChange}
                                    placeholder="직접입력"
                                    disabled={
                                        ordererData.emailDomain !== 'direct' &&
                                        ordererData.emailDomain !== ''
                                    }
                                    className={
                                        ordererData.emailDomain !== 'direct' &&
                                        ordererData.emailDomain !== ''
                                            ? 'disabled'
                                            : ''
                                    }
                                />
                                <select
                                    name="emailDomain"
                                    value={ordererData.emailDomain}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setOrdererData((prev) => ({
                                            ...prev,
                                            emailDomain: val,
                                            emailDomainCustom:
                                                val === 'direct' ? prev.emailDomainCustom : val,
                                        }));
                                    }}
                                >
                                    <option value="">직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="kakao.com">kakao.com</option>
                                    <option value="direct">직접입력</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <label>주문비밀번호</label>
                            <input
                                type="password"
                                name="password"
                                value={ordererData.password}
                                onChange={handleOrdererChange}
                                placeholder="영문, 숫자 조합 최소 4자리"
                            />
                        </div>

                        <div className="form-row">
                            <label>비밀번호확인</label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                value={ordererData.passwordConfirm}
                                onChange={handleOrdererChange}
                                placeholder="영문, 숫자 조합 최소 4자리"
                            />
                        </div>
                    </div>

                    {/* ── 배송지 정보 ── */}
                    <div className="form-group-box">
                        <div className="form-group-box__head">
                            <h3>배송지 정보 입력</h3>
                            <label className="same-as-orderer">
                                <input
                                    type="checkbox"
                                    checked={sameAsOrderer}
                                    onChange={(e) => setSameAsOrderer(e.target.checked)}
                                />
                                <span>주문자 정보와 동일</span>
                            </label>
                        </div>

                        <div className="form-row">
                            <label>받으시는 분</label>
                            <input
                                type="text"
                                name="receiver"
                                value={formData.receiver}
                                onChange={handleInputChange}
                                placeholder="이름을 입력하세요"
                            />
                        </div>

                        <div className="form-row">
                            <label>휴대전화</label>
                            <div className="phone-box">
                                <select
                                    name="phonePrefix"
                                    value={formData.phonePrefix}
                                    onChange={handleInputChange}
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="019">019</option>
                                </select>
                                <span className="phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phoneMid"
                                    value={formData.phoneMid}
                                    onChange={handleInputChange}
                                    placeholder="0000"
                                    maxLength={4}
                                />
                                <span className="phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phoneLast"
                                    value={formData.phoneLast}
                                    onChange={handleInputChange}
                                    placeholder="0000"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        <div className="form-row address-row">
                            <label>주소</label>
                            <div className="zipcode-box">
                                <input
                                    type="text"
                                    readOnly
                                    value={formData.zipcode}
                                    placeholder="우편번호"
                                />
                                <button type="button" onClick={() => setIsPostcodeOpen(true)}>
                                    우편번호 검색
                                </button>
                            </div>
                            <div className="address-inputs">
                                <input
                                    type="text"
                                    readOnly
                                    value={formData.address}
                                    placeholder="기본 주소"
                                />
                                <input
                                    type="text"
                                    name="detailAddress"
                                    value={formData.detailAddress}
                                    onChange={handleInputChange}
                                    placeholder="상세 주소를 입력하세요"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <label>배송요청사항</label>
                            <select
                                name="memo"
                                value={formData.memo}
                                onChange={handleInputChange}
                                className="memo-select"
                            >
                                <option value="">배송 메시지를 선택해 주세요.</option>
                                <option value="부재시 문앞에 놓아주세요">
                                    부재시 문앞에 놓아주세요
                                </option>
                                <option value="부재시 경비실에 맡겨주세요">
                                    부재시 경비실에 맡겨주세요
                                </option>
                                <option value="배송 전 연락바랍니다">배송 전 연락바랍니다</option>
                                <option value="직접 수령하겠습니다">직접 수령하겠습니다</option>
                            </select>
                        </div>
                    </div>

                    {/* ── 결제방법 ── */}
                    <div className="form-group-box">
                        <h3>결제방법</h3>
                        <div className="payment-radios">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                                <span>신용카드</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank"
                                    checked={paymentMethod === 'bank'}
                                    onChange={() => setPaymentMethod('bank')}
                                />
                                <span>계좌이체</span>
                            </label>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="card-select">
                                <select
                                    value={selectedCard}
                                    onChange={(e) => setSelectedCard(e.target.value)}
                                >
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
                                <p>
                                    계좌번호 안내:{' '}
                                    <strong>국민은행 123456-12-123456 (주)PORTER</strong>
                                </p>
                                <p>주문 후 24시간 내 미입금 시 자동 취소됩니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── 우측 ORDER SUMMARY ── */}
                <div className="checkout-summary-section">
                    <div className="summary-box">
                        <h3>ORDER SUMMARY</h3>
                        <div className="order-items-preview">
                            {orderItems.map((item) => (
                                <div key={item.cartId} className="preview-item">
                                    <div className="img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="info">
                                        <p className="name">{item.name}</p>
                                        <p className="opt">
                                            Color: {item.selectedColor} / Size: {item.selectedSize}
                                        </p>
                                        <p className="qty-price">
                                            {item.quantity}개 /{' '}
                                            {(item.discountPrice || item.price).toLocaleString()}₩
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="summary-row mt-24">
                            <span>상품 금액</span>
                            <span>₩ {itemsPrice.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>배송비</span>
                            <span>₩ {shippingFee.toLocaleString()}</span>
                        </div>
                        <div className="summary-row total">
                            <span>총 결제 금액</span>
                            <span>₩ {totalPrice.toLocaleString()}</span>
                        </div>

                        <button className="btn-pay" onClick={handlePayment}>
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>

            {isPostcodeOpen && (
                <div className="postcode-modal">
                    <div
                        className="postcode-modal__bg"
                        onClick={() => setIsPostcodeOpen(false)}
                    ></div>
                    <div className="postcode-modal__content">
                        <button className="close-btn" onClick={() => setIsPostcodeOpen(false)}>
                            ✕
                        </button>
                        <DaumPostcode onComplete={handleCompletePostcode} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
