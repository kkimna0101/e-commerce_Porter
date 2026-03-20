import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Heart, Share2, Star } from 'lucide-react';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '../../components/ProductItem';
import './ProductDetail.scss';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        products,
        currentProduct,
        fetchProductById,
        isLoggedIn,
        user,
        toggleWishlist,
        isProductWishlisted,
        addToCart,
        addReview,
        updateReview,
        deleteReview,
    } = useStore();

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('DETAILS');
    const [reviewInput, setReviewInput] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [editingReviewId, setEditingReviewId] = useState(null);

    useEffect(() => {
        fetchProductById(id);
        window.scrollTo(0, 0);
    }, [id, fetchProductById]);

    if (!currentProduct)
        return (
            <div className="inner" style={{ paddingTop: '100px' }}>
                Loading...
            </div>
        );

    const isWishlisted =
        isLoggedIn && user ? isProductWishlisted(user.id, currentProduct.id) : false;

    const handleWishlist = () => {
        if (!isLoggedIn) {
            Swal.fire({
                title: '로그인 필요',
                text: '회원만 가능합니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            }).then(() => navigate('/login'));
            return;
        }
        const added = toggleWishlist(user.id, currentProduct);
        Swal.fire({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 2000,
            icon: added ? 'success' : 'info',
            title: added ? '담겼습니다' : '제외되었습니다',
        });
    };

    const handleAddCart = () => {
        if (!selectedColor)
            return Swal.fire({
                text: '컬러를 선택하세요',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });
        if (!selectedSize)
            return Swal.fire({
                text: '사이즈를 선택하세요',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });

        addToCart({ ...currentProduct, selectedColor, selectedSize }, quantity);
        Swal.fire({
            title: '장바구니 이동',
            text: '장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: '장바구니 이동',
            cancelButtonText: '계속 쇼핑',
            confirmButtonColor: '#1a1a1a',
        }).then((res) => {
            if (res.isConfirmed) navigate('/cart');
        });
    };

    const handleReviewSubmit = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: '회원만 리뷰 작성 가능합니다.',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            }).then(() => navigate('/login'));
            return;
        }
        if (!reviewInput.trim())
            return Swal.fire({
                text: '리뷰 내용을 입력하세요',
                icon: 'warning',
                confirmButtonColor: '#1a1a1a',
            });

        if (editingReviewId) {
            updateReview(currentProduct.id, editingReviewId, reviewInput, reviewRating);
            setEditingReviewId(null);
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: '수정되었습니다',
            });
        } else {
            addReview(currentProduct.id, {
                user: user.name,
                rating: reviewRating,
                content: reviewInput,
                date: new Date().toISOString().split('T')[0],
            });
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: '등록되었습니다',
            });
        }
        setReviewInput('');
        setReviewRating(5);
    };

    const handleEditReview = (r) => {
        setEditingReviewId(r.id);
        setReviewInput(r.content);
        setReviewRating(r.rating);
    };

    const handleDeleteReview = (rId) => {
        Swal.fire({
            text: '정말 삭제하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#1a1a1a',
        }).then((res) => {
            if (res.isConfirmed) {
                deleteReview(currentProduct.id, rId);
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 2000,
                    icon: 'success',
                    title: '삭제되었습니다',
                });
            }
        });
    };

    const maskName = (name) => (name.length > 3 ? name.substring(0, 3) + '***' : name + '*');

    const relatedProducts = products
        .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 10);

    return (
        <div className="product-detail">
            <div className="product-detail__inner inner">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← BACK
                </button>

                <div className="detail-top">
                    <div className="detail-top__image">
                        <img src={currentProduct.image} alt={currentProduct.name} />
                    </div>

                    <div className="detail-top__info">
                        <div className="info-sticky">
                            <span className="info-cat">
                                {currentProduct.category} | {currentProduct.gender}
                            </span>
                            <h1 className="info-name">{currentProduct.name}</h1>
                            <div className="info-price">
                                {currentProduct.discountPrice ? (
                                    <>
                                        <span className="origin">
                                            {currentProduct.price.toLocaleString()}₩
                                        </span>
                                        <span className="discount">
                                            {currentProduct.discountPrice.toLocaleString()}₩
                                        </span>
                                    </>
                                ) : (
                                    <span>{currentProduct.price.toLocaleString()}₩</span>
                                )}
                            </div>

                            <p className="info-desc">{currentProduct.description}</p>

                            <div className="info-options">
                                <div className="option-group">
                                    <label>COLOR</label>
                                    <div className="color-chips">
                                        {currentProduct.colors.map((c) => (
                                            <button
                                                key={c}
                                                className={`color-chip ${selectedColor === c ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(c)}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="option-group">
                                    <label>SIZE</label>
                                    <div className="size-btns">
                                        {currentProduct.sizes.map((s) => (
                                            <button
                                                key={s}
                                                className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                                                onClick={() => setSelectedSize(s)}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="option-group quantity-box">
                                    <label>QUANTITY</label>
                                    <div className="qty-control">
                                        <button
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        >
                                            -
                                        </button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="info-actions">
                                <button className="btn-add-cart" onClick={handleAddCart}>
                                    ADD TO BASKET
                                </button>
                                <div className="action-sub">
                                    <button
                                        className={`btn-wish ${isWishlisted ? 'active' : ''}`}
                                        onClick={handleWishlist}
                                    >
                                        <Heart size={20} fill={isWishlisted ? '#000' : 'none'} />{' '}
                                        WISHLIST
                                    </button>
                                    <button
                                        className="btn-share"
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            Swal.fire({
                                                toast: true,
                                                position: 'bottom-end',
                                                title: 'URL 복사됨',
                                                showConfirmButton: false,
                                                timer: 2000,
                                            });
                                        }}
                                    >
                                        <Share2 size={20} /> SHARE
                                    </button>
                                </div>
                            </div>
                            <p className="free-shipping">FREE SHIPPING OVER 100,000₩</p>
                        </div>
                    </div>
                </div>

                <div className="detail-tabs">
                    <div className="tabs-header">
                        <button
                            className={activeTab === 'DETAILS' ? 'active' : ''}
                            onClick={() => setActiveTab('DETAILS')}
                        >
                            DETAILS
                        </button>
                        <button
                            className={activeTab === 'REVIEWS' ? 'active' : ''}
                            onClick={() => setActiveTab('REVIEWS')}
                        >
                            REVIEWS ({currentProduct.reviews.length})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'DETAILS' && (
                            <div className="tab-details">
                                <ul>
                                    <li>
                                        <strong>Material:</strong> {currentProduct.specs.material}
                                    </li>
                                    <li>
                                        <strong>Weight:</strong> {currentProduct.specs.weight}
                                    </li>
                                    <li>
                                        <strong>Origin:</strong> {currentProduct.specs.origin}
                                    </li>
                                    <li>
                                        <strong>Care:</strong> {currentProduct.specs.care}
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'REVIEWS' && (
                            <div className="tab-reviews">
                                <div className="review-form">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="rating-select">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={24}
                                                        fill={
                                                            star <= reviewRating ? '#111' : 'none'
                                                        }
                                                        stroke={
                                                            star <= reviewRating ? '#111' : '#ccc'
                                                        }
                                                        onClick={() => setReviewRating(star)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                            <textarea
                                                value={reviewInput}
                                                onChange={(e) => setReviewInput(e.target.value)}
                                                placeholder="리뷰를 작성해주세요."
                                            />
                                            <button onClick={handleReviewSubmit}>
                                                {editingReviewId ? 'UPDATE REVIEW' : 'POST REVIEW'}
                                            </button>
                                        </>
                                    ) : (
                                        <div className="login-prompt">
                                            <p>회원만 리뷰 작성 가능합니다.</p>
                                            <button onClick={() => navigate('/login')}>
                                                로그인하러 가기
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <ul className="review-list">
                                    {currentProduct.reviews.map((r) => (
                                        <li key={r.id}>
                                            <div className="rev-head">
                                                <span className="stars">
                                                    {'★'.repeat(r.rating)}
                                                    {'☆'.repeat(5 - r.rating)}
                                                </span>
                                                <span className="user">{maskName(r.user)}</span>
                                                <span className="date">{r.date}</span>
                                            </div>
                                            <p className="rev-content">{r.content}</p>
                                            {isLoggedIn && user?.name === r.user && (
                                                <div className="rev-actions">
                                                    <button onClick={() => handleEditReview(r)}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteReview(r.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                    {currentProduct.reviews.length === 0 && (
                                        <p className="no-review">첫 리뷰를 남겨주세요.</p>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h2>YOU MAY ALSO LIKE</h2>
                        <Swiper
                            breakpoints={{
                                320: { slidesPerView: 1.5, spaceBetween: 16 },
                                768: { slidesPerView: 3, spaceBetween: 24 },
                                1024: { slidesPerView: 4, spaceBetween: 24 },
                            }}
                        >
                            {relatedProducts.map((p) => (
                                <SwiperSlide key={p.id}>
                                    <ProductItem product={p} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
