import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  History,
  ChevronUp,
  ChevronDown,
  X,
  Minus,
  Plus,
  Search,
} from "lucide-react";
import Swal from "sweetalert2";
import { useStore } from "../../store/useStore";
import { productsData } from "../../assets/api/productData";
import ActionModal from "./ActionModal";
import "./FloatingBar.scss";

const FloatingBar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id ? Number(id) : 138;
  const { isLoggedIn, user, toggleWishlist, addToCart, wishlist, cart } =
    useStore();

  const product = productsData.find((p) => p.id === productId) || {};
  const isSoldOut = product.stock === 0;

  const [activePopup, setActivePopup] = useState(null);
  const [actionModal, setActionModal] = useState({ isOpen: false, type: null });
  const [isLiked, setIsLiked] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reorderSearch, setReorderSearch] = useState("");
  const [reorderProduct, setReorderProduct] = useState(product);
  const [reorderNote, setReorderNote] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [seenProducts, setSeenProducts] = useState([]);
  const [barTop, setBarTop] = useState(0);
  const popupRef = useRef(null);
  const barRef = useRef(null);

  const likeCount = wishlist?.length || 0;
  const cartCount = cart?.length || 0;

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("seenProducts") || "[]");
    const seenList = seen
      .map((sid) => productsData.find((p) => p.id === sid))
      .filter(Boolean)
      .slice(0, 5);
    setSeenProducts(seenList);
    const current = JSON.parse(localStorage.getItem("seenProducts") || "[]");
    if (!current.includes(productId)) {
      const updated = [
        productId,
        ...current.filter((i) => i !== productId),
      ].slice(0, 10);
      localStorage.setItem("seenProducts", JSON.stringify(updated));
    }
  }, [productId]);

  useEffect(() => {
    if (user && wishlist)
      setIsLiked(wishlist.some((item) => item.id === productId));
  }, [wishlist, productId, user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        !e.target.closest(".floating-bar__search-overlay")
      ) {
        setActivePopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const calcPosition = () => {
      const subNav = document.querySelector(".sub-nav");
      const footer = document.querySelector("footer");
      if (!subNav || !footer || !barRef.current) return;
      const subNavBottom =
        subNav.getBoundingClientRect().bottom + window.scrollY;
      const startY = subNavBottom + 300;
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const barHeight = barRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const minTop = startY - scrollY;
      const maxTop = footerTop - barHeight - scrollY;
      const centerTop = (viewportH - barHeight) / 2;
      setBarTop(Math.min(Math.max(centerTop, minTop), maxTop));
    };
    window.addEventListener("scroll", calcPosition);
    window.addEventListener("resize", calcPosition);
    calcPosition();
    return () => {
      window.removeEventListener("scroll", calcPosition);
      window.removeEventListener("resize", calcPosition);
    };
  }, []);

  const handleLike = () => {
    if (!isLoggedIn) {
      Swal.fire({
        position: "top",
        title: "로그인 필요",
        text: "회원만 찜하기 기능을 사용할 수 있습니다.",
        icon: "warning",
        confirmButtonColor: "#5D675B",
        confirmButtonText: "확인",
      });
      return;
    }
    const added = toggleWishlist(user.id, product);
    setIsLiked(added);
    if (added) {
      Swal.fire({
        position: "top",
        title: "알림",
        text: "위시리스트에 담았습니다.",
        icon: "success",
        confirmButtonColor: "#5D675B",
        confirmButtonText: "보러가기",
        showCancelButton: true,
        cancelButtonText: "닫기",
      }).then((result) => {
        if (result.isConfirmed) navigate("/mypage");
      });
    }
  };

  const handleCartSubmit = () => {
    if (!selectedOption) {
      Swal.fire({
        position: "top",
        title: "알림",
        text: "옵션을 선택해주세요.",
        icon: "warning",
        confirmButtonColor: "#5D675B",
        confirmButtonText: "확인",
      });
      return;
    }
    addToCart({
      ...product,
      selectedColor: selectedOption,
      selectedSize: product.sizeCategory || "Free",
      quantity,
    });
    setActivePopup(null);
    Swal.fire({
      position: "top",
      title: "알림",
      text: "장바구니에 담았습니다.",
      icon: "success",
      confirmButtonColor: "#5D675B",
      confirmButtonText: "보러가기",
      showCancelButton: true,
      cancelButtonText: "닫기",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  const handleBuyNow = () => {
    setActivePopup(null);
    setActionModal({ isOpen: true, type: "buy_guide" });
  };

  const handleReorderSave = () => {
    setActivePopup(null);
    Swal.fire({
      position: "top",
      title: "알림",
      html: `
            <p style="font-family:'Pretendard';font-weight:600;font-size:16px;color:#333">리오더가 요청되었습니다.</p>
            <p style="font-family:'Pretendard';font-size:12px;color:#929292;margin-top:10px">비회원이신 경우 정보 제공에 제한이 있을 수 있음을 안내드립니다.</p>
        `,
      icon: "success",
      confirmButtonColor: "#5D675B",
      confirmButtonText: "보러가기",
      showCancelButton: true,
      cancelButtonText: "닫기",
      cancelButtonColor: "#929292",
    }).then((result) => {
      if (result.isConfirmed) navigate("/mypage");
    });
  };

  const totalPrice = product.price
    ? (product.price * quantity).toLocaleString()
    : "0";
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  const togglePopup = (name) =>
    setActivePopup((prev) => (prev === name ? null : name));

  const filteredProducts = productsData.filter(
    (p) =>
      p.stock === 0 &&
      p.name.toUpperCase().includes(reorderSearch.toUpperCase()),
  );

  return (
    <>
      <div className="floating-bar" style={{ top: `${barTop}px` }} ref={barRef}>
        <div className="floating-bar__wrap" ref={popupRef}>
          {/* 팝업들 - 버튼 왼쪽에 위치 */}
          {activePopup === "cart" && (
            <div className="floating-bar__popup">
              <div className="floating-bar__popup-header">
                <span>옵션 담기</span>
                <button onClick={() => setActivePopup(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="floating-bar__popup-body">
                <div className="floating-bar__popup-section">
                  <p className="floating-bar__popup-label">색상 / 사이즈</p>
                  <div className="floating-bar__select-wrap">
                    <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="floating-bar__select"
                    >
                      <option value="">옵션 선택</option>
                      {(product.color || []).map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="floating-bar__select-icon"
                    />
                  </div>
                </div>
                <div className="floating-bar__popup-section">
                  <p className="floating-bar__popup-label">수량</p>
                  <div className="floating-bar__qty">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="floating-bar__popup-total">
                  <span>Total</span>
                  <span>{totalPrice} ₩</span>
                </div>
              </div>
              <div className="floating-bar__popup-footer">
                <button
                  className="floating-bar__popup-btn floating-bar__popup-btn--outline"
                  onClick={handleCartSubmit}
                >
                  장바구니
                </button>
                <button
                  className="floating-bar__popup-btn floating-bar__popup-btn--fill"
                  onClick={handleBuyNow}
                >
                  바로 구매
                </button>
              </div>
            </div>
          )}

          {activePopup === "seen" && (
            <div className="floating-bar__popup">
              <div className="floating-bar__popup-header">
                <span>최근 본 제품</span>
                <button onClick={() => setActivePopup(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="floating-bar__popup-body">
                {seenProducts.length === 0 ? (
                  <p className="floating-bar__empty">
                    최근 본 제품이 없습니다.
                  </p>
                ) : (
                  seenProducts.map((p) => (
                    <div
                      key={p.id}
                      className="floating-bar__seen-item"
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setActivePopup(null);
                      }}
                    >
                      <div className="floating-bar__seen-img">
                        <img
                          src={`/images/product/${p.thumbnail}`}
                          alt={p.name}
                        />
                      </div>
                      <div className="floating-bar__seen-info">
                        <span className="floating-bar__seen-name">
                          {p.name}
                        </span>
                        {p.id === productId && (
                          <span className="floating-bar__seen-current">
                            현재 보고있는 제품
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activePopup === "reorder" && (
            <div className="floating-bar__popup">
              <div className="floating-bar__popup-header">
                <span>리오더 요청</span>
                <button onClick={() => setActivePopup(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="floating-bar__popup-body">
                <div className="floating-bar__popup-section">
                  <p className="floating-bar__popup-label">제품명</p>
                  <button
                    className="floating-bar__search-trigger"
                    onClick={() => setShowSearchModal(true)}
                  >
                    {reorderProduct?.id !== product?.id ? (
                      <div className="floating-bar__search-trigger-selected">
                        <div className="floating-bar__search-trigger-img">
                          <img
                            src={`/images/product/${reorderProduct?.thumbnail}`}
                            alt={reorderProduct?.name}
                          />
                        </div>
                        <span>{reorderProduct?.name}</span>
                      </div>
                    ) : (
                      <span className="floating-bar__search-trigger-placeholder">
                        상품 찾기
                      </span>
                    )}
                    <Search size={14} />
                  </button>

                  {/* 현재 제품 리오더 요청하기 버튼 추가 */}
                  <button
                    className="floating-bar__current-product-btn"
                    onClick={() => setReorderProduct(product)}
                  >
                    <div className="floating-bar__current-product-img">
                      <img
                        src={`/images/product/${product?.thumbnail}`}
                        alt={product?.name}
                      />
                    </div>
                    <span>현재 제품 리오더 요청하기</span>
                  </button>
                </div>

                <div className="floating-bar__popup-section">
                  <textarea
                    className="floating-bar__textarea"
                    placeholder="요청사항을 입력해주세요."
                    maxLength={20}
                    value={reorderNote}
                    onChange={(e) => setReorderNote(e.target.value)}
                    rows={3}
                  />
                  <p className="floating-bar__textarea-hint">
                    요청사항을 20자 이내로 적을 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="floating-bar__popup-footer">
                <button
                  className="floating-bar__popup-btn floating-bar__popup-btn--fill"
                  onClick={handleReorderSave}
                >
                  저장하기
                </button>
              </div>
            </div>
          )}

          {/* 버튼 바 */}
          <div className="floating-bar__buttons">
            <button className="floating-bar__btn" onClick={handleLike}>
              <div className="floating-bar__icon-wrap">
                <Heart
                  size={22}
                  strokeWidth={1.2}
                  fill={isLiked ? "#ffffff" : "none"}
                  color="#ffffff"
                />
                {likeCount > 0 && (
                  <span className="floating-bar__badge">{likeCount}</span>
                )}
              </div>
              <span className="floating-bar__label">LIKE</span>
            </button>
            <button
              className="floating-bar__btn"
              onClick={() => togglePopup("cart")}
            >
              <div className="floating-bar__icon-wrap">
                <ShoppingCart size={22} strokeWidth={1.2} color="#ffffff" />
                {cartCount > 0 && (
                  <span className="floating-bar__badge">{cartCount}</span>
                )}
              </div>
              <span className="floating-bar__label">CART</span>
            </button>
            <button
              className="floating-bar__btn"
              onClick={() => togglePopup("seen")}
            >
              <div className="floating-bar__icon-wrap">
                <History size={22} strokeWidth={1.2} color="#ffffff" />
              </div>
              <span className="floating-bar__label">SEEN</span>
            </button>
            {isSoldOut && (
              <button
                className="floating-bar__btn"
                onClick={() => togglePopup("reorder")}
              >
                <div className="floating-bar__icon-wrap">
                  <img
                    src="/images/productdetail/icon_reorder.png"
                    alt="reorder"
                    className="floating-bar__reorder-icon"
                  />
                </div>
                <span className="floating-bar__label">REORDER</span>
              </button>
            )}
            <div className="floating-bar__divider" />
            <button
              className="floating-bar__btn floating-bar__btn--arrow"
              onClick={scrollToTop}
            >
              <ChevronUp size={20} strokeWidth={1.2} color="#ffffff" />
            </button>
            <button
              className="floating-bar__btn floating-bar__btn--arrow"
              onClick={scrollToBottom}
            >
              <ChevronDown size={20} strokeWidth={1.2} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>

      {/* 상품 검색 모달 */}
      {showSearchModal && (
        <div
          className="floating-bar__search-overlay"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="floating-bar__search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="floating-bar__search-modal-header">
              <span>상품 검색</span>
              <button onClick={() => setShowSearchModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="floating-bar__search-modal-input-wrap">
              <input
                type="text"
                placeholder="찾으시는 상품명을 입력하세요"
                value={reorderSearch}
                onChange={(e) => setReorderSearch(e.target.value)}
                className="floating-bar__search-modal-input"
                autoFocus
              />
              <Search size={16} className="floating-bar__search-modal-icon" />
            </div>
            <div className="floating-bar__search-modal-list">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className={`floating-bar__search-modal-item ${reorderProduct?.id === p.id ? "active" : ""}`}
                  onClick={() => {
                    setReorderProduct(p);
                    setShowSearchModal(false);
                    setReorderSearch("");
                  }}
                >
                  <div className="floating-bar__search-modal-img">
                    <img src={`/images/product/${p.thumbnail}`} alt={p.name} />
                  </div>
                  <span>{p.name.toUpperCase()}</span>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="floating-bar__empty">검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <ActionModal
        isOpen={actionModal.isOpen}
        type={actionModal.type}
        product={product}
        isLoggedIn={isLoggedIn}
        onClose={() => setActionModal({ isOpen: false, type: null })}
        setModalConfig={(config) => setActionModal(config)}
      />
    </>
  );
};

export default FloatingBar;
