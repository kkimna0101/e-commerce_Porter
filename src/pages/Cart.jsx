import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import './Cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, getSanitizedCart, updateCartQuantity, removeFromCart, removeMultipleFromCart, clearCart } = useStore();
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    getSanitizedCart();
  }, [getSanitizedCart]);

  useEffect(() => {
    // 진입 즉시 전체 선택
    const allIds = cartItems.map(item => item.cartId);
    setSelectedIds(allIds);
  }, [cartItems.length]); // length 변경시에만 트리거, 무한 루프 방지

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(cartItems.map(item => item.cartId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const selectedItems = cartItems.filter(item => selectedIds.includes(item.cartId));
  const itemsPrice = selectedItems.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0);
  const shippingFee = itemsPrice > 0 && itemsPrice < 100000 ? 3000 : 0;
  const totalPrice = itemsPrice + shippingFee;

  const handleOrderSelected = () => {
    if (selectedIds.length === 0) {
      return Swal.fire({ text: '주문할 상품을 선택해주세요.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
    }
    navigate('/checkout', { state: { selectedIds } });
  };

  const handleOrderAll = () => {
    const allIds = cartItems.map(item => item.cartId);
    if (allIds.length === 0) {
      return Swal.fire({ text: '장바구니가 비어 있습니다.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
    }
    navigate('/checkout', { state: { selectedIds: allIds } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty inner">
        <h2>SHOPPING BAG</h2>
        <div className="empty-msg">
          <p>장바구니가 비어 있습니다.</p>
          <Link to="/product" className="continue-btn">쇼핑 계속하기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page inner">
      <h2 className="cart-page__title">SHOPPING BAG</h2>
      
      <div className="cart-container">
        <div className="cart-list-section">
          <div className="cart-list__header">
            <label className="checkbox-wrap">
              <input 
                type="checkbox" 
                checked={selectedIds.length > 0 && selectedIds.length === cartItems.length}
                onChange={handleSelectAll}
              />
              <span className="chk-label">전체 선택 ({selectedIds.length}/{cartItems.length})</span>
            </label>
            <button className="btn-remove-selected" onClick={() => {
              if (selectedIds.length === 0) return Swal.fire({ text: '삭제할 상품을 선택해주세요.', icon: 'warning', confirmButtonColor: '#1a1a1a' });
              removeMultipleFromCart(selectedIds);
              setSelectedIds([]);
            }}>선택 삭제</button>
          </div>

          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.cartId} className="cart-item">
                <div className="item-checkbox">
                  <input 
                    type="checkbox"
                    checked={selectedIds.includes(item.cartId)}
                    onChange={(e) => handleSelectItem(item.cartId, e.target.checked)}
                  />
                </div>
                <Link to={`/product/${item.id}`} className="item-img">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="item-info">
                  <p className="meta">{item.category} | {item.gender}</p>
                  <Link to={`/product/${item.id}`} className="name">{item.name}</Link>
                  <p className="options">Color: {item.selectedColor} / Size: {item.selectedSize}</p>
                  <div className="price">
                    {(item.discountPrice || item.price).toLocaleString()}₩
                  </div>
                </div>
                <div className="item-controls">
                  <div className="qty-control">
                    <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn-delete" onClick={() => removeFromCart(item.cartId)}><X size={20} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="cart-summary-section">
          <div className="summary-box">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>상품 금액</span>
              <span>{itemsPrice.toLocaleString()}₩</span>
            </div>
            <div className="summary-row">
              <span>배송비 (10만원 이상 무료)</span>
              <span>+{shippingFee.toLocaleString()}₩</span>
            </div>
            <div className="summary-row total">
              <span>총 결제 금액</span>
              <span>{totalPrice.toLocaleString()}₩</span>
            </div>
            <div className="summary-actions">
              <button className="btn-order btn-selected" onClick={handleOrderSelected}>선택 상품 주문하기</button>
              <button className="btn-order btn-all" onClick={handleOrderAll}>전체 상품 주문하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
