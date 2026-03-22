import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { useStore } from '../../../store/useStore';
import StockPopup from './StockPopup';
import AccordionMenu from './AccordionMenu';
import ActionModal from './ActionModal';
import { productsData } from '../../../assets/api/productData';
import './HeroSection.scss';

const HeroSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = id ? Number(id) : 138;


    /* 섹션: 상태 관리 */
    const { isLoggedIn, user, toggleWishlist, addToCart } = useStore();
    const [isStockPopupOpen, setIsStockPopupOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '' });



    const foundProduct = productsData.find(p => p.id === productId) || {};

    // HeroSection 전용 UI 컬러 호환용 매핑 (글로벌 통합 컬러)
    const colorMap = {
        'Black': { name: "블랙", code: "#000000" },
        'Sage Green': { name: "세이지그린", code: "#717B73" },
        'Iron Blue': { name: "아이언블루", code: "#262D3C" },
        'Navy': { name: "네이비", code: "#1a2550" },
        'Khaki': { name: "카키", code: "#5d675b" },
        'Silver': { name: "실버", code: "#C0C0C0" },
        'Mint': { name: "민트", code: "#00d2b1" },
        'White': { name: "화이트", code: "#ffffff", border: true },
        'Gray': { name: "그레이", code: "#888888" },
        'Red': { name: "레드", code: "#e41c1c" },
        'Pink': { name: "핑크", code: "#f4a7b9" },
        'Green': { name: "그린", code: "#1a8c1a" },
        'Blue': { name: "블루", code: "#1c3ee4" },
        'Purple': { name: "퍼플", code: "#7b1ae4" },
        'Yellow': { name: "옐로우", code: "#f0d800" },
        'Orange': { name: "오렌지", code: "#f07800" },
        'Brown': { name: "브라운", code: "#7b4f1a" },
        'Beige': { name: "베이지", code: "#d4b896" },
        'Olive': { name: "올리브", code: "#6b6b2a" },
        'Clear': { name: "투명", code: "#f2f2f2" },
        'Camel': { name: "카멜", code: "#c19a6b" },
        'Bordeaux': { name: "보르도", code: "#641315" },
        'Light Brown': { name: "라이트브라운", code: "#b5651d" }
    };

    // 영어 텍스트를 받으면 매핑 정보(한글, CSS헥스) 객체 덩어리로 변환
    const productColors = (foundProduct.color || []).map(c => colorMap[c] || { name: c, code: "#000000" });
    if (productColors.length === 0) productColors.push({ name: "블랙", code: "#000000" });


    const formattedPrice = foundProduct.price ? foundProduct.price.toLocaleString() : "628,000";

    const product = {
        ...foundProduct,
        id: foundProduct.id || productId,
        series: foundProduct.series || "TANKER",
        name: foundProduct.name || "TANKER SHORT HELMET BAG",
        brand: foundProduct.brand || "PORTER",
        category: foundProduct.subType || "TANKER",
        price: foundProduct.price || 628000, // 원본 숫자 유지
        colors: productColors,
        thumbnails: [
            { bg: "/images/productdetail/hero_product/thumbnail1.png", item: `/images/productdetail/hero_product/${foundProduct.id || productId}_heroproduct_1.png` },
            { bg: "/images/productdetail/hero_product/thumbnail2.png" },
            { bg: "/images/productdetail/hero_product/thumbnail3.png" },
            { bg: "/images/productdetail/hero_product/thumbnail4.png" }
        ]
    };


    // 품절 여부 판단 (데이터에 stock: 0 이 있으면 품절)
    const isSoldOut = foundProduct.stock === 0;

    /* 섹션: 이벤트 핸들러 */
    //위시리스트 클릭 핸들러
    const handleWishlist = () => {
        if (!isLoggedIn) {
            Swal.fire({
                position: 'top',
                title: '로그인 필요', text: '회원만 찜하기 기능을 사용할 수 있습니다.', icon: 'warning',
                confirmButtonText: '확인', confirmButtonColor: '#5D675B',
                showCancelButton: true, cancelButtonText: '닫기',
            }).then((result) => { if (result.isConfirmed) { /* navigate('/login') */ } });
            return;
        }
        const added = toggleWishlist(user.id, product);
        Swal.fire({
            toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000,
            icon: added ? 'success' : 'info',
            title: added ? '위시리스트에 담겼습니다.' : '위시리스트에서 제외되었습니다.',
        });
    };

    // 모달 열기 핸들러
    const openModal = (type) => setModalConfig({ isOpen: true, type });

    // 장바구니 버튼 클릭 핸들러
    const handleCart = () => {
        // 기본 옵션 설정하여 장바구니 추가
        const cartProduct = {
            ...product,
            selectedColor: product.colors[0]?.name || 'Black',
            selectedSize: foundProduct.sizeCategory || 'Free'
        };
        addToCart(cartProduct);
        openModal('cart');
    };

    // 바로구매 버튼 클릭 시 '포트폴리오 NPC 가이드' 팝업을 먼저 띄움
    const handleBuy = () => {
        openModal('buy_guide');
    };

    // 컬러 클릭 핸들러 (준비 중 알림)
    const handlePreparation = (e) => {
        e.preventDefault();
        Swal.fire({
            position: 'top',
            title: '알림',
            html: '현재 서비스 준비 중입니다.<br />더욱 다양한 제품으로 찾아뵙겠습니다.',
            icon: 'info',
            confirmButtonColor: '#5D675B',
            confirmButtonText: '확인'
        });
    };

    return (
        /* 상단 */
        <section className="hero-section">
            <div className="hero-left">
                <div className="series-name-sticky">
                    <h2 className="series-name">{product.series}</h2>
                </div>
                <div className="thumbnail-list">
                    {product.thumbnails.map((thumb, idx) => (
                        <div key={idx} className="thumb-container">
                            <img src={thumb.bg} alt={`bg-${idx}`} className="thumb-bg" />
                            {thumb.item && (
                                <img src={thumb.item} alt={`item-${idx}`} className="thumb-item" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="hero-right">
                <div className="info-sticky-wrapper">
                    <div className="info-header">
                        <h1 className="prod-name">{product.name ? product.name.toUpperCase() : ""}</h1>
                        <div className="cat-group">
                            <Link to="/brand" className="cat-item">{product.brand}</Link>
                            <Link to="/category" className="cat-item">{product.category ? product.category.toUpperCase() : ""}</Link>
                        </div>
                    </div>

                    <div className="color-section">
                        <h3 className="section-label">COLOR</h3>
                        <div className="color-list">
                            {product.colors.map((c, i) => (
                                <Link to={`/product/${c.name}`} key={i} className="color-item" onClick={handlePreparation}>
                                    <div className="color-chip-box" style={{ backgroundColor: c.code, border: c.border ? '1px solid #ccc' : 'none' }}></div>
                                    <span className="color-name-text">{c.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 매장재고 영역 */}
                    <div className="info-accordions">
                        <div className="acc-line"></div>
                        <div className="acc-item" onClick={() => setIsStockPopupOpen(true)}>
                            <span className="acc-title">매장재고</span>
                            <div className="plus-icon"><Plus size={25} strokeWidth={2} color="#333333" /></div>
                        </div>
                        <div className="acc-line"></div>

                        {/* 제품상세 영역 */}
                        <div className="acc-item" onClick={() => setIsDetailOpen(!isDetailOpen)}>
                            <span className="acc-title">제품상세</span>
                            <div className="plus-icon">
                                <Plus
                                    size={25}
                                    strokeWidth={2}
                                    color="#333333"
                                />
                            </div>
                        </div>

                        {/* 아코디언 메뉴 */}
                        <div className={`accordion-reveal-wrapper ${isDetailOpen ? 'open' : ''}`}>
                            <div className="accordion-reveal-inner">
                                <AccordionMenu productId={product.id} isOpen={isDetailOpen} />
                            </div>
                        </div>
                        <div className="acc-line"></div>
                    </div>
                </div>
            </div>
            {/* 하단 초록 바*/}
            <div className="bottom-sticky-bar">
                <div className="bar-inner">
                    <span className={`price-text ${isSoldOut ? 'sold-out' : ''}`}>
                        <span className="price-val">
                            <span className="price-symbol">₩</span> {product.price?.toLocaleString()}
                        </span>
                        {isSoldOut && (
                            <span className="sold-out-label">OUT OF STOCK</span>
                        )}
                    </span>

                    <div className="btn-group">
                        {/* 클릭 핸들러 연결 */}
                        <button className="bar-btn" onClick={handleWishlist}>위시리스트</button>
                        <div className="bar-divider"></div>

                        {/*품절 여부에 따른 버튼 스위칭 및 모달 연결 */}
                        {isSoldOut ? (
                            <button className="bar-btn alert" onClick={() => openModal('restock_guide')}>재입고 알림</button>
                        ) : (
                            <>
                                <button className="bar-btn" onClick={handleCart}>장바구니</button>
                                <div className="bar-divider"></div>
                                <button className="bar-btn" onClick={handleBuy}>바로구매</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <StockPopup
                isOpen={isStockPopupOpen}
                onClose={() => setIsStockPopupOpen(false)}
                product={product}
            />
            {/* 액션 모달 배치 */}
            <ActionModal
                isOpen={modalConfig.isOpen}
                type={modalConfig.type}
                isLoggedIn={isLoggedIn}
                product={product}
                setModalConfig={setModalConfig}
                onClose={() => setModalConfig({ isOpen: false, type: '' })}
            />
        </section>
    );
};

export default HeroSection;