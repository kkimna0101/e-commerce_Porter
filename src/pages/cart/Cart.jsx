import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Swal from 'sweetalert2';
import './Cart.scss';

const Cart = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        getSanitizedCart,
        updateCartQuantity,
        removeFromCart,
        removeMultipleFromCart,
        clearCart,
    } = useStore();
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        getSanitizedCart();
    }, [getSanitizedCart]);

    // 진입 즉시 전체 선택
    useEffect(() => {
        const allIds = cartItems.map((item) => item.cartId);
        setSelectedIds(allIds);
    }, [cartItems.length]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(cartItems.map((item) => item.cartId));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, id]);
        } else {
            setSelectedIds((prev) => prev.filter((sid) => sid !== id));
        }
    };

    const selectedItems = cartItems.filter((item) => selectedIds.includes(item.cartId));
    const itemsPrice = selectedItems.reduce(
        (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
        0
    );
    const shippingFee = itemsPrice > 0 && itemsPrice < 100000 ? 3000 : 0;
    const totalPrice = itemsPrice + shippingFee;

    const handleOrderSelected = () => {
        if (selectedIds.length === 0) {
            return Swal.fire({
                text: '주문할 상품을 선택해주세요.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        navigate('/checkout', { state: { selectedIds } });
    };

    const handleOrderAll = () => {
        const allIds = cartItems.map((item) => item.cartId);
        if (allIds.length === 0) {
            return Swal.fire({
                text: '장바구니가 비어 있습니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        navigate('/checkout', { state: { selectedIds: allIds } });
    };

    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) {
            return Swal.fire({
                text: '삭제할 상품을 선택해주세요.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        }
        removeMultipleFromCart(selectedIds);
        setSelectedIds([]);
    };

    // ── 공통 헤더 + 컨트롤 ───────────────────────────────
    const CartHeader = () => (
        <>
            <div className="cart-controls">
                <label className="checkbox-wrap">
                    <input
                        type="checkbox"
                        checked={
                            cartItems.length > 0 &&
                            selectedIds.length === cartItems.length
                        }
                        onChange={handleSelectAll}
                        disabled={cartItems.length === 0}
                    />
                    <span className="chk-label">
                        전체선택 ({selectedIds.length}/{cartItems.length})
                    </span>
                </label>
                <button
                    className="btn-delete-selected"
                    onClick={handleDeleteSelected}
                    disabled={cartItems.length === 0}
                >
                    삭제
                </button>
            </div>

            <div className="cart-table-head">
                <span></span>
                <span>상품정보</span>
                <span>주문수량</span>
                <span>상품금액</span>
                <span></span>
            </div>
        </>
    );

    // ── 빈 장바구니 ──────────────────────────────────────
    if (cartItems.length === 0) {
        return (
            <div className="cart-page inner">
                <h2 className="cart-page__title">CART</h2>

                <div className="cart-layout">
                    <section className="cart-left">
                        <CartHeader />
                        <div className="cart-empty">
                            <div className="empty-bg-text">
                                <span>YOUR</span>
                                <span>CART</span>
                                <span>IS</span>
                            </div>
                            <div className="empty-bg-text">
                                <span className="word-empty">Empty</span>
                            </div>
                            <div className="empty-links">
                                <Link to="/product">GO SHOPPING</Link>
                                <Link to="/about">ABOUT OUR PRODUCTS</Link>
                            </div>
                        </div>
                    </section>

                    <aside className="cart-summary">
                        <div className="summary-head">
                            <h3>TOTAL</h3>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-fee-row">
                            <span>상품 금액</span>
                            <span>₩ 0</span>
                        </div>
                        <div className="summary-fee-row">
                            <span>배송비</span>
                            <span>₩ 0</span>
                        </div>
                        <div className="summary-total-row">
                            <span className="label">총 결제 예정 금액</span>
                            <span className="amount">₩ 0</span>
                        </div>
                        <div className="summary-actions">
                            <button className="btn-checkout btn-all" disabled>
                                Proceed to Checkout
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }

    // ── 상품 있는 장바구니 ────────────────────────────────
    return (
        <div className="cart-page inner">
            <h2 className="cart-page__title">CART</h2>

            <div className="cart-layout">
                {/* LEFT */}
                <section className="cart-left">
                    <CartHeader />

                    <ul className="cart-list">
                        {cartItems.map((item) => (
                            <li key={item.cartId} className="cart-item">
                                {/* 1. 체크박스 */}
                                <div className="item-check">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.cartId)}
                                        onChange={(e) =>
                                            handleSelectItem(item.cartId, e.target.checked)
                                        }
                                    />
                                </div>

                                {/* 2. 상품정보 */}
                                <div className="item-info">
                                    <Link to={`/product/${item.id}`} className="item-thumb-link">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="item-thumb"
                                        />
                                    </Link>
                                    <div className="item-details">
                                        <Link to={`/product/${item.id}`} className="item-name">
                                            {item.name}
                                        </Link>
                                        <p className="item-option">{item.selectedColor}</p>
                                        <p className="item-option">{item.selectedSize}</p>
                                    </div>
                                </div>

                                {/* 3. 주문수량 */}
                                <div className="item-qty">
                                    <div className="qty-box">
                                        <button
                                            onClick={() =>
                                                updateCartQuantity(item.cartId, item.quantity - 1)
                                            }
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateCartQuantity(item.cartId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* 4. 상품금액 — 헤더와 정렬되도록 독립 컬럼 */}
                                <div className="item-price">
                                    ₩ {((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                                </div>

                                {/* 5. X 버튼 — 독립 컬럼 */}
                                <div className="item-remove">
                                    <button
                                        className="btn-remove"
                                        onClick={() => removeFromCart(item.cartId)}
                                        aria-label="삭제"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* RIGHT */}
                <aside className="cart-summary">
                    <div className="summary-head">
                        <h3>TOTAL</h3>
                    </div>

                    <div className="summary-items">
                        {selectedItems.length > 0 ? (
                            selectedItems.map((item) => (
                                <div className="summary-item-row" key={item.cartId}>
                                    <span className="s-name">{item.name}</span>
                                    <span>
                                        ₩{' '}
                                        {(
                                            (item.discountPrice || item.price) * item.quantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="summary-empty-msg">선택된 상품 없음</p>
                        )}
                    </div>

                    <hr className="summary-divider" />

                    <div className="summary-fee-row">
                        <span>상품 금액</span>
                        <span>₩ {itemsPrice.toLocaleString()}</span>
                    </div>
                    <div className="summary-fee-row">
                        <span>배송비</span>
                        <span>₩ {shippingFee.toLocaleString()}</span>
                    </div>

                    <div className="summary-total-row">
                        <span className="label">총 결제 예정 금액</span>
                        <span className="amount">₩ {totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="summary-actions">
                        <button className="btn-checkout btn-all" onClick={handleOrderAll}>
                            Proceed to Checkout
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;