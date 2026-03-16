import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import Swal from 'sweetalert2';
import { useStore } from '../store/useStore';
import './ProductItem.scss';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useStore();
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isWishlisted = useStore((state) => 
    isLoggedIn && user ? state.isProductWishlisted(user.id, product.id) : false
  );

  const handleAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Swal.fire({
      title: '장바구니 이동',
      text: '상세 페이지에서 옵션을 선택해주세요.',
      icon: 'info',
      confirmButtonText: '상세 보기',
      confirmButtonColor: '#1a1a1a',
      showCancelButton: true,
      cancelButtonText: '닫기'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/product/${product.id}`);
      }
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      Swal.fire({
        title: '로그인 필요',
        text: '회원만 찜하기 기능을 사용할 수 있습니다.',
        icon: 'warning',
        confirmButtonText: '로그인 하러 가기',
        confirmButtonColor: '#1a1a1a',
        showCancelButton: true,
        cancelButtonText: '닫기'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    const added = toggleWishlist(user.id, product);
    
    // Toast
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon: added ? 'success' : 'info',
      title: added ? '위시리스트에 담겼습니다.' : '위시리스트에서 제외되었습니다.'
    });
  };

  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className="product-item__link">
        <div className="product-item__image-wrap">
          <img src={product.image} alt={product.name} />
          
          <div className="product-item__badges">
            {product.isNew && <span className="badge new">NEW</span>}
            {product.isSale && <span className="badge sale">SALE</span>}
          </div>

          <div className="product-item__actions">
            <button className="action-btn add" onClick={handleAddCart}>
              <span>ADD</span>
            </button>
            <button className={`action-btn heart ${isWishlisted ? 'active' : ''}`} onClick={handleWishlist}>
              <Heart size={20} fill={isWishlisted ? '#000' : 'none'} />
            </button>
          </div>
        </div>
        
        <div className="product-item__info">
          <div className="product-item__meta">
            {product.category} | {product.gender}
          </div>
          <h3 className="product-item__name">{product.name}</h3>
          <div className="product-item__price">
            {product.discountPrice ? (
              <>
                <span className="price-original">{product.price.toLocaleString()}₩</span>
                <span className="price-discount">{product.discountPrice.toLocaleString()}₩</span>
              </>
            ) : (
              <span>{product.price.toLocaleString()}₩</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
