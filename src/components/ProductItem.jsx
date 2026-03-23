import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { IoCartOutline } from 'react-icons/io5';
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

    /* 섹션: 이벤트 핸들러 */
    const handleAddCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            position: 'top',
            title: '장바구니 이동',
            text: '상세 페이지에서 옵션을 선택해주세요.',
            icon: 'info',
            confirmButtonText: '상세 보기',
            confirmButtonColor: '#5D675B',
            showCancelButton: true,
            cancelButtonText: '닫기',
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
                position: 'top',
                title: '로그인 필요',
                text: '회원만 찜하기 기능을 사용할 수 있습니다.',
                icon: 'warning',
                confirmButtonText: '로그인 하러 가기',
                confirmButtonColor: '#5D675B',
                showCancelButton: true,
                cancelButtonText: '닫기',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        const added = toggleWishlist(user.id, product);
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000,
            icon: added ? 'success' : 'info',
            title: added ? '위시리스트에 담겼습니다.' : '위시리스트에서 제외되었습니다.',
        });
    };

    /* 섹션: 화면 렌더링 */
    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`} className="product-item__link">
                <div className="product-item__image-wrap">
                    <img src={`/images/product/${product.thumbnail}`} alt={product.name} />

                    {/* <div className="product-item__badges">
            {product.isNew && <span className="badge new">NEW</span>}
            {product.isSale && <span className="badge sale">SALE</span>}
          </div> */}
                    {product.stock === 0 && (
                        <div className="product-item__soldout">
                            <p className="product-item__soldout-title">OUT OF STOCK</p>
                            <p className="product-item__soldout-sub">Sorry, Please wait.</p>
                        </div>
                    )}

                    <div className="product-item__overlay">
                        <button
                            className="overlay-btn cart-btn"
                            onClick={handleAddCart}
                            aria-label="Add to cart"
                        >
                            <IoCartOutline size={22} strokeWidth={1.5} />
                        </button>
                        <button
                            className={`overlay-btn wish-btn ${isWishlisted ? 'active' : ''}`}
                            onClick={handleWishlist}
                            aria-label="Add to wishlist"
                        >
                            <Heart
                                size={22}
                                strokeWidth={1.5}
                                fill={isWishlisted ? '#000' : 'none'}
                            />
                        </button>
                    </div>
                </div>

                <div className="product-item__info">
                    <h3 className="product-item__name">{product.name}</h3>
                    <div className="product-item__price">
                        {product.discountPrice ? (
                            <>
                                <span className="price-original">
                                    ₩ {product.price.toLocaleString()}
                                </span>
                                <span className="price-discount">
                                    ₩ {product.discountPrice.toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="price-base">₩ {product.price.toLocaleString()}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductItem;
