/* 섹션: 모듈 가져오기 */
import React, { useState, useEffect, useRef } from 'react';
import { X, Bell, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useStore } from '../../store/useStore';
import './ActionModal.scss';

const ActionModal = ({ isOpen, onClose, type, isLoggedIn, product, setModalConfig }) => {
  /* 섹션: 상태 관리 */
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [isSmsAgreed, setIsSmsAgreed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [restockStep, setRestockStep] = useState('login_prompt'); // login_prompt | guest_form
  const prevOpenRef = useRef(false);

  // 시뮬레이션 및 실제 로그인 상태를 통합한 유효 로그인 여부 (가이드 분기 대응)
  const isSimulatedLogout = type === 'restock' || (restockStep === 'guest_form' && type !== 'restock_login');
  const isEffectiveLoggedIn = (isLoggedIn || type === 'restock_login') && !isSimulatedLogout;

  /* 섹션: 초기화 로직 */
  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      setIsSmsAgreed(false);
      setPhoneNumber('');
      setRestockStep('login_prompt');
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  if (!isOpen) return null;

        /* 로그인 체험 시나리오: 장바구니 담기 후 즉시 결제 이동 */
    const handleLoginExperience = () => {
        if (product) {
            // 결제 전 옵션 누락 방지
            const cartProduct = {
                ...product,
                selectedColor: product.selectedColor || product.colors?.[0]?.name || 'Black',
                selectedSize: product.selectedSize || 'Free'
            };
            addToCart(cartProduct);
            navigate('/checkout', { state: { selectedIds: [cartProduct.id] } });
            onClose();
        }
    };

    /* 비회원 주문 전용 핸들러 */
    const handleGuestCheckout = () => {
        if (product) {
            // 결제 전 옵션 누락 방지
            const cartProduct = {
                ...product,
                selectedColor: product.selectedColor || product.colors?.[0]?.name || 'Black',
                selectedSize: product.selectedSize || 'Free'
            };
            addToCart(cartProduct);
            navigate('/checkout', { state: { selectedIds: [cartProduct.id] } });
            onClose();
        }
    };

        /* 로그아웃 체험 시나리오: 버튼 종류에 따라 다른 팝업 */
    const handleLogoutExperience = () => {
        if (type === 'restock_guide') {
            setModalConfig({ isOpen: true, type: 'restock_logout_prompt' });
        } else {
            setModalConfig({ isOpen: true, type: 'buy' });
        }
    };

    const handleRestockSubmit = () => {
        // 1. 비회원일 경우 휴대폰 번호 입력 확인 (공백 제외)
        if (!isEffectiveLoggedIn && (!phoneNumber || !phoneNumber.trim())) {
            Swal.fire({
                position: 'top',
                title: '알림',
                text: '휴대폰 번호를 (공백, 하이픈(-)제외) 입력해주세요.',
                icon: 'warning',
                confirmButtonColor: '#5D675B',
                confirmButtonText: '확인'
            });
            return;
        }

        // 3. SMS 수신 동의 확인 (로그인/비회원 공통)
        if (!isSmsAgreed) {
            Swal.fire({
                position: 'top',
                title: '알림',
                text: 'SMS 수신 동의에 체크해주세요.',
                icon: 'warning',
                confirmButtonColor: '#5D675B',
                confirmButtonText: '확인'
            });
            return;
        }

        // 4. 신청 완료 팝업
        Swal.fire({
            position: 'top',
            title: '알림',
            html: `재입고 알림 신청이 완료되었습니다.<br /><br />알림은 60일 이후 자동 해제되며, <br />${isEffectiveLoggedIn ? '마이페이지 재입고 알림 내역에서 ' : '비회원 알림 내역에서 '}확인 가능합니다.`,
            icon: 'success',
            confirmButtonColor: '#5D675B',
            confirmButtonText: '확인'
        }).then(() => {
            onClose();
        });
    };

    const renderContent = () => {
        switch (type) {
        case 'buy_guide':
        case 'restock_guide':
        return {
            isGuide: true,
            msg1: '원하시는 시나리오를 선택해 주세요!',
            msg2: (
          <>
            사용자 여정에 따른 <strong>포터의 인터페이스 변화</strong>를 체험할 수 있습니다.
          </>
        ),
            btns: [
                {
                    label: '로그인 시점',
                    onClick: type === 'restock_guide'
                        ? () => setModalConfig({ isOpen: true, type: 'restock_login' })
                        : handleLoginExperience
                },
                {
                    label: '로그아웃 시점',
                    onClick: handleLogoutExperience
                }
            ]
        };

      case 'cart':
        return {
          title: '장바구니',
          msg1: '1개의 상품이 장바구니에 담겼습니다.',
          msg2: '',
          btns: [
            { label: '장바구니 이동', onClick: () => { navigate('/cart'); onClose(); }, isFill: false },
            { label: '쇼핑 계속하기', onClick: onClose, isFill: true }
          ]
        };  
      case 'buy':
          return {
          title: '바로 구매',
          msg1: '편하게 로그인 해보세요!',
          msg2: '나중에도 장바구니 또는 주문 정보 등 다양한 소식을 확인하실 수 있습니다.',
          btns: [
            { label: '비회원 주문하기', onClick: handleGuestCheckout, isFill: false },
            { label: '로그인', onClick: () => { navigate('/login'); onClose(); }, isFill: true }
          ]
        };

      case 'restock_logout_prompt': // 재입고 알림 > 로그아웃 시점 선택 시
        return {
          title: '재입고 알림',
          msg1: '편하게 로그인 해보세요!',
          msg2: '마이페이지에서 재입고 알림 내역을 확인하실 수 있습니다.',
          btns: [
            { 
              label: '비회원 신청하기', 
              onClick: () => { 
                setModalConfig({ isOpen: true, type: 'restock' }); 
                setRestockStep('guest_form'); 
              }, 
              isFill: false 
            },
            { label: '로그인', onClick: () => { navigate('/login'); onClose(); }, isFill: true }
          ]
        };

      case 'restock': // 재입고 알림
      case 'restock_login': // 재입고 알림 (로그인 시뮬레이션)
        if (isEffectiveLoggedIn) {
          /* 로그인 상태일 때 */
          return {
            title: '재입고 알림',
            isForm: true,
            msg1: '재입고 알림 신청',
            btns: [
              { label: '신청하기', onClick: handleRestockSubmit, isFill: true },
              { label: '취소', onClick: onClose, isFill: false }
            ]
          };
        } else {
          /* 로그아웃 상태일 때 */
          if (restockStep === 'login_prompt') {
            return {
              title: '재입고 알림',
              msg1: '편하게 로그인 해보세요!',
              msg2: '마이페이지에서 재입고 알림 내역을 확인하실 수 있습니다.',
              btns: [
                { label: '비회원 신청하기', onClick: () => setRestockStep('guest_form'), isFill: true },
                { label: '취소', onClick: onClose, isFill: false }
              ]
            };
          } else {
            /* 로그아웃 + 비회원 신청 폼 클릭 시 */
            return {
              title: '재입고 알림',
              isForm: true,
              isGuest: true,
              msg1: '재입고 알림 신청',
              btns: [
                { 
                  label: <><ArrowLeft size={16} style={{ marginRight: '4px' }}/> 이전</>, 
                  onClick: () => { 
                    setModalConfig({ isOpen: true, type: 'restock_logout_prompt' }); 
                    setRestockStep('login_prompt'); 
                  },
                  isFill: false 
                },
                { label: '신청하기', onClick: handleRestockSubmit, isFill: true }
              ]
            };
          }
        }
      default: return {};
    }
  };

  const data = renderContent();

  return (
    /* 가이드 모드일 땐 별도의 overlay 클래스 부여 */
    <div className={`action-modal-overlay ${data.isGuide ? 'visitor-mode' : ''}`} onClick={onClose}>
    <div className={`action-modal-container ${data.isForm ? 'is-tall' : ''}`} onClick={(e) => e.stopPropagation()}>
       
        {/* 가이드 모드에서는 상단 헤더(바)를 숨김 */}
        {!data.isGuide && (
          <div className="modal-header">
            <span className="header-title">{data.title}</span>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>
        )}

        <div className="modal-content">
          {/* 가이드 모드에선 배경 워터마크 로고 숨김 */}
          {!data.isGuide && <img src="/images/productdetail/hero_product/logo_opacity2.png" alt="bg" className="bg-watermark" />}
         
          <div className="text-container">
            {/*가이드 모드(To. Visitor) 전용 레이아웃 */}
            {data.isGuide ? (
              <div className="visitor-layout">
                <h2 className="visitor-to">To. Visitor</h2>
                <div className="visitor-msg-group">
                  <p className="visitor-question">{data.msg1}</p>
                  <p className="visitor-sub">{data.msg2}</p>
                </div>
                <div className="visitor-choices">
                  {data.btns.map((btn, i) => (
                    <span key={i} className="visitor-text-btn" onClick={btn.onClick}>
                      {btn.label}
                    </span>
                  ))}
                </div>
                <button className="visitor-close" onClick={onClose}><X size={30} /></button>
              </div>
            ) : data.isForm ? (
              <div className="restock-form">
                <div className="title-row">
                  <span className="form-msg">{data.msg1}</span>
                  <Bell size={20} color="#000" />
                </div>
                {data.isGuest && (
                  <div className="input-group">
                    <label>휴대폰 번호</label>
                    <input
                      type="text"
                      placeholder="하이픈(-) 제외 입력"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                )}
                <div className="notice-box">
                  <p>- 60일 이후 자동 해제</p>
                  <p>- {isEffectiveLoggedIn ? '마이페이지 재입고 알림 내역에서' : '비회원 알림 내역에서'} 확인 가능</p>
                </div>
                <div className="checkbox-row" onClick={() => setIsSmsAgreed(!isSmsAgreed)}>
                  <div className={`check-box ${isSmsAgreed ? 'active' : ''}`}>
                    {isSmsAgreed && <Check size={14} color="#fff" />}
                  </div>
                  <span>SMS 수신 동의</span>
                </div>
              </div>
            ) : (
                /* 일반 팝업 (장바구니 등) */
              <div className="message-view">
                <span className="main-msg">{data.msg1}</span>
                {/* msg2가 있을 때만 렌더링하여 정렬 흐트러짐 방지 */}
                {data.msg2 && <span className="sub-msg">{data.msg2}</span>}
              </div>
            )}
          </div>

          {/* 하단 버튼 프레임 */}
          {!data.isGuide && (
            <div className="modal-btn-frame">
              {data.btns?.map((btn, i) => (
                <button
                  key={i}
                  className={`modal-btn ${btn.isFill ? 'fill' : 'outline'}`}
                  onClick={btn.onClick}
                  disabled={btn.label === '신청하기' ? false : btn.disabled}
                  data-is-inactive={btn.label === '신청하기' && !isSmsAgreed}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;