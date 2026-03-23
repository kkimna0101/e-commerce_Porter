import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, RotateCcw, MapPin, Search, Copy, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import './StockPopup.scss';

const StockPopup = ({ isOpen, onClose, product }) => {
    /* 섹션: 상태 관리 */
  const [selectedOption, setSelectedOption] = useState('');
  const [isStockChecked, setIsStockChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedStore, setSelectedStore] = useState(null); // 선택된 매장 상세
  const [showLocationPopup, setShowLocationPopup] = useState(false); // 위치동의 팝업

  /* 섹션: 초기화 로직 */
  useEffect(() => {
    if (isOpen) {
      setSelectedOption('');
      setIsStockChecked(false);
      setSearchTerm('');
      setSelectedStore(null);
    }
  }, [isOpen]);

  // 섹션: 매장 데이터
  const storeData = useMemo(() => {
    return [
      { id: 1, name: '강남점', addr: '서울 강남구 강남대로 442 1층', tel: '02-553-1935' },
      { id: 2, name: '이태원점', addr: '서울시 용산구 녹사평대로 168-10', tel: '02-749-1935' },
      { id: 3, name: '압구정점', addr: '서울시 강남구 압구정로46길 65-2 히든파크 1층', tel: '02-540-1935' },
      { id: 4, name: '더현대서울점', addr: '서울특별시 영등포구 여의대로 108 더현대서울 B2', tel: '02-3277-0888' },
      { id: 5, name: '신세계 센텀시티점', addr: '부산 해운대구 센텀남대로 35 신세계센텀시티 3층', tel: '051-745-2759' }
    ].map(s => ({ ...s, stock: Math.random() > 0.5 ? 'O' : 'X' }));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      position: 'top',
      title: '알림',
      text: '복사되었습니다!',
      icon: 'success',
      confirmButtonColor: '#5D675B',
      confirmButtonText: '확인'
    });
  };

  /* 섹션: 내부 로직 */
  const handleSearchReset = () => {
    setSearchTerm('');
    setSelectedStore(null);
  };

  const handleGoBack = () => {
    setIsStockChecked(false);
    setSearchTerm('');
    setSelectedStore(null);
  };

  // 재고 확인 버튼 클릭 시 유효성 검사 함수
  const handleCheckStockClick = () => {
    if (!selectedOption) {
      Swal.fire({
        position: 'top',
        title: '알림',
        text: '상품 옵션을 선택해 주세요.',
        icon: 'warning',
        confirmButtonColor: '#5D675B',
        confirmButtonText: '확인'
      });
      return;
    }
    setIsStockChecked(true);
  };

  /* 섹션: 화면 렌더링 */
  return (
    <div className="stock-popup-overlay" onClick={onClose}>
      {/* stopPropagation으로 팝업 내부 클릭시 닫힘 방지 */}
      <div
        className={`stock-popup-container ${isStockChecked ? 'view-results-mode' : 'view-select-mode'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 섹션: 헤더 */}
        <div className="popup-header">
          <span className="header-title">매장 재고</span>
          <button className="close-icon-btn" onClick={onClose}>
            <X size={24} color="#000000" />
          </button>
        </div>

        <div className="popup-content">
          {/* 배경 로고 워터마크 */}
        <img src="/images/productdetail/hero_product/logo_opacity2.png" alt="bg-logo" className="bg-logo-fixed" />
          {/* 상단 공통 상품 정보 */}
          <div className="product-top-row">
            {/* 상품 사진 1번 동적 렌더링 */}
           <img src={product?.thumbnails?.[0]?.item || `/images/productdetail/hero_product/${product.id}_heroproduct_1.png`} alt={product.name} className="prod-img" />
            <div className="prod-info-right">
              <h2 className="prod-name">{product.name}</h2>
              <div className="select-box-wrapper">
                <select
                  className="option-select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  disabled={isStockChecked}
                >
                  <option value="" disabled>옵션 선택</option>
                  {product.colors.map((c, i) => (
                    <option key={i} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="select-chevron" size={15} />
              </div>
            </div>
          </div>

          {!isStockChecked ? (
      /* 섹션: 옵션 선택 전*/
            <div className="inner-view-select">
              <div className="btn-group-row">
                <button className="btn-outline" onClick={onClose}>닫기</button>
                {/* 함수 연결 및 클래스 조건부 부여 */}
                <button
                  className={`btn-fill ${selectedOption ? 'active' : ''}`}
                  onClick={handleCheckStockClick}
                >
                  재고 확인
                </button>
              </div>
            </div>
          ) : (
            /* 섹션: 재고 확인 후 */
            <div className="inner-view-results">
             <div className="search-tools-row">
                <button className="tool-btn reset" onClick={handleSearchReset}><RotateCcw size={14} /> 검색 초기화</button>
                <button className="tool-btn find-store" onClick={() => setShowLocationPopup(true)}><MapPin size={14} /> 가까운 매장 찾기</button>
              </div>

              <div className="search-input-box">
                <input
                  type="text"
                  placeholder="매장을 입력해 주세요."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={16} className="search-icon" />
              </div>

              <div className="store-list-header">
                <span className="label">매장명</span>
                <span className="label">재고여부</span>
              </div>

              <div className="store-list-body">
                {storeData.map((s) => (
                  <div
                    key={s.id}
                    className={`store-item ${searchTerm && s.name.includes(searchTerm) ? 'highlight' : ''}`}
                    onClick={() => setSelectedStore(s)}
                  >
                    <span className="s-name">{s.name}</span>
                    <span className="s-stock">{s.stock}</span>
                  </div>
                ))}

                {/* 매장 상세 미니 팝업 */}
                {selectedStore && (
                  <div className="store-detail-mini">
                    <div className="detail-row">
                      <span>{selectedStore.addr}</span>
                      <Copy size={14} onClick={() => handleCopy(selectedStore.addr)} className="copy-icon" />
                    </div>
                    <div className="detail-row">
                      <span>{selectedStore.tel}</span>
                      <Copy size={14} onClick={() => handleCopy(selectedStore.tel)} className="copy-icon" />
                    </div>
                    <button className="mini-close" onClick={() => setSelectedStore(null)}>닫기</button>
                  </div>
                )}
              </div>

              <div className="bottom-btn-group">
                <button className="btn-outline-prev" onClick={handleGoBack}><ArrowLeft size={16} /> 이전</button>
                <button className="btn-outline-bottom" onClick={onClose}>닫기</button>
              </div>
            </div>
          )}
        </div>

        {/* 위치 권한 팝업 */}
        {showLocationPopup && (
          <div className="location-consent-modal">
            <div className="modal-inner">
              <p>현재 위치 기반 서비스를 위해<br/>위치 정보 활용에 동의하시겠습니까?</p>
              <div className="modal-btns">
                <button onClick={() => {
                  Swal.fire({
                    position: 'top',
                    title: '알림',
                    text: '현재 서비스 준비 중입니다.',
                    icon: 'info',
                    confirmButtonColor: '#5D675B',
                    confirmButtonText: '확인'
                  });
                  setShowLocationPopup(false);
                }}>동의</button>
                <button onClick={() => setShowLocationPopup(false)}>거절</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockPopup;