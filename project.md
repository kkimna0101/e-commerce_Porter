# PORTER 구현 기준서

## 1. 이 문서의 목표

이 프로젝트의 핵심은 아래 4가지를 동시에 맞추는 것입니다.

1. **빅타이포를 이용한 개성있고, 타이포를 제외한 영역에선 미니멀한 패션 이커머스 무드**
2. **React + Zustand + LocalStorage 기반의 클라이언트 전용 구조**
3. **상품 목록 / 상세 / 장바구니 / 결제 / 마이페이지까지 이어지는 실제 사용자 흐름**
4. **모바일, 태블릿, 데스크탑에서 모두 자연스러운 반응형 레이아웃**

즉, 이 프로젝트는 “예쁜 메인 페이지 한 장”이 아니라, **실제 쇼핑 흐름을 끝까지 돌려볼 수 있는 프론트엔드 포트폴리오**로 구현해야 합니다.

---

## 2. 한 줄 정의

**흑백 모노톤 기반의 패션 브랜드 UI를 React로 구현한 서버리스 이커머스 포트폴리오**

- 백엔드는 붙이지 않는다.
- 상품, 회원, 장바구니, 주문, 문의, 리뷰는 모두 **클라이언트 상태 + LocalStorage 영속성**으로 처리한다.
- 결과물은 “설명용 목업”이 아니라 **실제 클릭 흐름이 살아 있는 UI**여야 한다.

---

## 3. 이 프로젝트에서 절대 놓치면 안 되는 기준

### 3-1. 구조 기준

- 라우팅은 `react-router-dom` 기반으로 구성한다.
- 전역 상태는 `Zustand`로 관리한다.
- LocalStorage persist key는 **`ff-storage`** 를 사용한다.
- 검색 최근어는 Store가 아니라 **`recentSearches`** 키로 직접 LocalStorage에 저장한다.
- 데이터 소스는 API 호출이 아니라 **초기 Seed Data**를 사용한다.

### 3-2. 화면 기준

- 전체 톤은 **화이트 배경 + 블랙 텍스트 + 라이트 그레이 보더** 중심이다.
- 메인페이지 무드는 **빅타이포**를 이용한 **개성있는 무드**를 구현한다.
- 서브페이지는 컬러 포인트는 거의 쓰지 않고, **버튼에만 카키 계열**을 제한적으로 사용한다.
- 타이포는 과장하여 사용하고, **uppercase / 좁은 자간 / 얇은 구분선 / 작은 여백**으로 브랜드 무드를 만든다.
- 버튼, 카드, 테이블, 폼 모두 **각진 형태(rounded 거의 없음)** 로 유지한다.

### 3-3. UX 기준

- Sticky Header, Search Modal, Mobile Fullscreen Menu, Wishlist Toggle, 장바구니 수량 변경, 주문 흐름, 리뷰 CRUD, 문의 CRUD, 주소 검색까지 **실제 동작**해야 한다.
- 새로고침 후에도 로그인 상태, 장바구니, 위시리스트, 주문, 문의, 리뷰 수정 결과가 남아 있어야 한다.
- 반응형은 단순 축소가 아니라 **구성 자체가 바뀌어야** 한다.

---

## 4. 실제 코드 기준으로 먼저 바로잡아야 하는 사항

기존 설명문에는 실제 코드와 다르게 적힌 부분이 있다. 바이브 코딩할 때는 아래를 **진짜 기준**으로 잡아야 한다.

### 4-1. 실제 기준 정정

- 실제 폰트는 **Pretendard** 기반이며, 영문 폰트는 **roboto, roboto condense**를 사용한다.
- GSAP는 스크롤 리빌 전체에 쓰인다.
- React Query Provider는 감싸고 있지만, 핵심 비즈니스 데이터는 **React Query를 쓰지 않고 Local Seed Data + Zustand** 로 처리한다.
- 상품 카테고리는 문서상 예시보다 실제 코드 기준이 중요하다. 실제 필터 카테고리는 **`All`, `Work`, `Daily`, `Travel`, `Small Goods`, `Other`** 다.
- 상품 페이지 내에서는 상세 필터가 적용될 예정이다.
- 실제 상품 Seed Data에는 현재 들어있지 않다.
- Product Card의 빠른 `ADD` 버튼은 현재 코드상 **옵션 선택 없이도 장바구니에 담길 수 있는 느슨한 구현**이다.
- `/board/inquiry` 페이지는 단순 textarea form이고, **ReactQuill 기반의 진짜 CRUD 문의 작성/수정/삭제는 MyPage 내부**에 있다.

### 4-2. 구현 시 권장 판단

결과를 비슷하게 맞추는 것이 1순위라면 아래처럼 가면 된다.

- 화면은 최대한 비슷하게 구현한다.
- 단, 아래는 보완해도 좋다.
    - Product Card 빠른 담기 시 기본 옵션 정책 명확화
    - 게스트 결제 후 `/mypage` 이동 문제 보완
    - Share 버튼 실동작 연결

---

## 5. 실제 기술 스택

## 5-1. 필수 스택

- **React 19**
- **Vite 7**
- **React Router DOM 7**
- **Zustand 5**
- **Sass / SCSS**
- **Swiper 11**
- **GSAP 3**
- **Lucide React**
- **SweetAlert2**
- **react-quill-new**
- **react-daum-postcode**

---

## 6. 전역 디자인 시스템

## 6-1. 폰트

```scss
font-family:
    'Pretendard Variable',
    Pretendard,
    roboto,
    'roboto condense',
    sans-serif;
```

```scss
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

```

## 6-2. 컬러 토큰

```scss
$white: #ffffff;
$black: #000000;
$gray-100: #f5f5f5;
$gray-200: #e5e5e5;
$gray-300: #d1d1d1;
$gray-400: #a1a1a1;
$gray-500: #767676;
$gray-600: #555555;
$gray-700: #333333;
$gray-800: #1a1a1a;
$point-khaki: #5D675B;
$point_orange : #FF5F00;
$txt_header : #1d1d1d;
$txt_body : #333333;
$txt_caption : #666666;
$txt_none-active : #929292;
$main_txt_green : #838E4F;
$main_bg_yellow : #EDE58C;
```

### 6-3. 레이아웃 기준

- 공통 컨테이너 `.inner`
    - `width: 95%`
    - `max-width: 1600px`
    - 데스크탑 이하는 padding 추가
- Header 높이
    - Desktop: **60px**
    - Tablet: **60px**
    - Mobile: **60px**
- Product Grid
    - Desktop: **4열**
    - Tablet: **3열**
    - Mobile: **2열**
- Product Card 이미지 비율
    - `padding-top: 130%` 수준의 **세로로 긴 비율**

### 6-4. 반응형 브레이크포인트

```scss
$mobile: 600px;
$tablet: 1023px;
$desktop: 1600px;
```

- 모바일: `max-width: 600px`
- 태블릿: `max-width: 1023px`
- 데스크탑 유틸: `max-width: 1600px`

### 6-5. 무드 키워드

- minimal
- monochrome
- editorial
- clean whitespace
- uppercase headings
- thin borders
- restrained luxury

---

## 7. 전체 라우팅 맵

라우트는 아래 기준으로 구현한다.

```txt
/
/about
/product
/collab
/collabDetail
/kBrand
/product/:id
/cart
/checkout
/complete
/login
/signup
/find-account
/mypage
/board/notices
/board/faq
/board/inquiry
```

### 7-1. 라우트 의미

- `/` : 홈
- `/about` : 브랜드 소개
- `/product` : 전체 상품 목록
- `/collab` : 콜라보 메인페이지
- `/collabDetail` : 콜라보 상품 상세
- `/kBrand` : K 콜라보 메인페이지
- `/product/:id` : 상품 상세
- `/cart` : 장바구니
- `/checkout` : 결제
- `/complete` : 결제 완료
- `/login`, `/signup`, `/find-account` : 인증 흐름
- `/mypage` : 회원 전용 개인 포털
- `/board/notices`, `/board/faq`, `/board/inquiry` : 고객센터 계열

---

## 8. 데이터 모델 명세

## 8-1. 상품(Product)

Product 객체는 아래 필드를 기준으로 구성한다.
설명은 한글로 작성

```ts
interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    discountPrice: number | null;
    image: string;
    description: string;
    isNew: boolean;
    stock: number;
    colors: string[];
    sizes: string[];
    specs: {
        material: string;
        weight: string;
        origin: string;
        care: string;
    };
    reviews: {
        id: number;
        user: string;
        date: string;
        rating: number;
        content: string;
    }[];
}
```

### 8-2. 사용자(User)

```ts
interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;
    address?: string;
    createdAt: string;
}
```

실제 로그인 세션에 저장되는 `user`는 password를 제외한 형태다.

### 8-3. 장바구니 아이템(CartItem)

```ts
interface CartItem extends Product {
    selectedColor?: string;
    selectedSize?: string;
    quantity: number;
    cartId: string; // `${id}-${selectedColor}-${selectedSize}`
}
```

### 8-4. 주문(Order)

```ts
interface Order {
    id: string; // ORD_${Date.now()}
    userId: string;
    items: CartItem[];
    shippingInfo: {
        receiver: string;
        phone: string;
        zipcode: string;
        address: string;
        detailAddress: string;
        memo: string;
    };
    paymentMethod: 'card' | 'bank';
    selectedCard: string;
    subtotal: number;
    shippingFee: number;
    totalAmount: number;
    createdAt: string;
    status: '결제완료';
}
```

### 8-5. 문의 / Q&A / 공지 / FAQ

```ts
interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    category: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

interface Inquiry {
    id: number;
    userId: string;
    title: string;
    content: string;
    date: string;
}

interface Qna {
    id: number;
    userId: string;
    title: string;
    content: string;
    date: string;
}
```

### 8-6. 위시리스트

```ts
interface WishlistItem {
    userId: string;
    product: Product;
}
```

---

## 9. Zustand 아키텍처

## 9-1. Root Store

`useStore.js` 에서 여러 Slice를 합친다.

- `createAuthSlice`
- `createProductSlice`
- `createCartSlice`
- `createBoardSlice`
- `createOrderSlice`
- `createWishlistSlice`

### 9-2. Persist 설정

```ts
name: 'ff-storage';
storage: createJSONStorage(() => localStorage);
```

### 9-3. 실제 partialize 대상

다음만 영속 저장한다.

- `users`
- `user`
- `isLoggedIn`
- `products`
- `cartItems`
- `inquiries`
- `qnas`
- `orders`
- `wishlist`

즉, `filteredProducts`, `currentProduct`, `notices`, `faqs` 같은 값은 영속 대상이 아니다.

---

## 10. Slice별 실제 역할

## 10-1. authSlice

역할:

- 로그인
- 회원가입
- 테스트 회원 생성/로그인
- 로그아웃
- 주소/연락처 수정
- 아이디 찾기
- 비밀번호 찾기 / 재설정

핵심 액션:

- `login(credentials)`
- `loginAsTestUser(onlyRegister?)`
- `signup(userData)`
- `logout()`
- `updateUserAddress(userId, newPhone, newAddress)`
- `findEmail(name, phone)`
- `findPassword(email, name)`
- `resetPassword(email, newPassword)`

## 10-2. productSlice

역할:

- Seed Data 로드
- 상품 상세 조회
- 목록 필터링
- 리뷰 CRUD
- 내가 쓴 리뷰 조회

핵심 액션:

- `fetchProducts()`
- `fetchProductById(id)`
- `setFilters(newFilters)`
- `clearFilters()`
- `addReview(productId, review)`
- `updateReview(productId, reviewId, content, rating)`
- `deleteReview(productId, reviewId)`
- `getUserReviews(userName)`

### 10-3. cartSlice

역할:

- 장바구니 담기
- 옵션 조합별 unique cartId 생성
- 수량 수정
- 개별 삭제 / 선택 삭제 / 전체 비우기
- 예전 데이터 보정

핵심 액션:

- `getSanitizedCart()`
- `addToCart(product, quantity?)`
- `updateCartQuantity(cartId, quantity)`
- `removeFromCart(cartId)`
- `removeMultipleFromCart(cartIds)`
- `clearCart()`
- `getTotalItems()`

## 10-4. orderSlice

역할:

- 결제 완료 주문 저장
- 주문번호 기반 조회
- 로그인 유저 주문 조회

핵심 액션:

- `addOrder(orderData)`
- `getOrderById(orderId)`
- `getUserOrders(userId)`

## 10-5. boardSlice

역할:

- 공지사항 로드
- FAQ 카테고리 필터 로드
- 1:1 문의 CRUD
- Q&A CRUD
- 사용자별 문의 조회

핵심 액션:

- `fetchNotices()`
- `fetchFAQs(category?)`
- `submitInquiry(data)`
- `updateInquiry(id, updateData)`
- `deleteInquiry(id)`
- `getUserInquiries(userId)`
- `submitQna(data)`
- `updateQna(id, updateData)`
- `deleteQna(id)`
- `getUserQnas(userId)`

## 10-6. wishlistSlice

역할:

- 관심상품 토글
- 유저별 리스트 조회
- 특정 상품 찜 여부 확인

핵심 액션:

- `toggleWishlist(userId, product)`
- `getUserWishlist(userId)`
- `isProductWishlisted(userId, productId)`

---

## 11. 공통 레이아웃 구현 기준

## 11-1. App

- 앱 시작 시 `fetchProducts()` 1회 실행
- 글로벌 스타일 `styles/index.scss` 로드
- `QueryClientProvider` 로 감싸지만 실제 핵심 상태는 Zustand 사용

## 11-2. Layout

구조는 단순하다.

```tsx
<Header />
<main className="main">
  <Outlet />
</main>
<Footer />
```

## 11-3. Header

필수 요소:

- 좌측 로고 `PORTER`
- 우측 GNB
    - PRODUCT 옆 + 아이콘
    - COLLABORATION
    - ABOUT
    - OFFLINE

- 우측 유틸
    - SEARCH
    - 로그인 시 MY PAGE
    - 로그인 안했을 시 LOGIN
    - CART 옆 + 아이콘
    - 모바일 햄버거

필수 동작:

- Header는 **sticky**
- 모바일 메뉴 열리면 **body scroll lock**
- Cart 아이콘 배지는 `cartItems.reduce(quantity)` 결과
- 로그인 상태에 따라 util 메뉴가 달라져야 함

### 11-4. 모바일 메뉴

- 태블릿 이하에서 햄버거 노출
- 전체 화면 고정 오버레이 메뉴
- 왼쪽에서 슬라이드 진입
- 메뉴 클릭 시 닫힘

## 11-5. Search Modal

필수 동작:

- Search 아이콘 클릭 시 전체 화면 검색 모달 오픈
- overlay 클릭 또는 X 버튼 클릭 시 닫힘
- 검색어 입력 후 submit 하면 `/product` 이동
- `setFilters({ name: query })` 로 상품 검색
- 최근 검색어는 `recentSearches` 키로 LocalStorage 저장
- 중복 제거 + 최신순 + 최대 5개 유지
- 최근 검색어 개별 삭제 가능

화면 무드:

- 화이트 반투명 오버레이
- blur 적용
- 큰 uppercase input
- 최근 검색어는 pill 형태

## 11-6. Footer

배경은 검은색, 텍스트는 흰색.
구성:
메인 대표 카테고리(폰트 사이즈 80PX, 굵기 800, ROBOTO CONDENCED)는 모두 대문자, 좌우로 넓게 배치(좌우padding 60px)
하위 메뉴는 호버시 메인 아래 좌측정렬로 등장 (폰트 사이즈 16PX, 굵기 200)
- ABOUT
  - 포터 스토리
  - 스토어 
  - 뉴스레터
  - 언론 및 뉴스
- CONTACT
  - 회원 정보
  - 1:1 문의하기
  - FAQ
  - 수리 및 유지보수
- POLICY
  - 개인정보처리방침
  - 이용약관
- PORTER
  - PORTER 브랜드 로고
  - POTR 브랜드 로고
  - LUGGAGE LABEL 브랜드 로고

위 메뉴가 좌우로 정렬되고, 그 아래에 좌측정렬로 배치.
폰트는 ROBOTO, 굵기 700, 크기는 20px
- PRODUCT
- COLLABORATION
- ABOUT
- OFFLINE
LANGUAGE는 $txt_none_active 컬러를 사용해 강조하지않음.
- LANGUAGE (구분선) ENGLISH,日本語,中国话
- 하단 카피라이트
- instagram 아이콘

반응형:

- Desktop: 2fr / 3fr grid
- Tablet 이하: 세로 스택
- Mobile: 각 컬럼 1열

---

## 12. 홈 화면 구현 기준

## 12-1. Hero Visual



구성:

- `Swiper` + `EffectFade` + `Autoplay`
- 3개 슬라이드
- 이미지 전체 화면형
- 상단 Header 높이를 제외한 `calc(100vh - headerHeight)`
- 텍스트:
    - NEW COLLECTION
    - TIMELESS PIECES
    - URBAN ESSENTIALS
- CTA 버튼: `SHOP NOW`

동작:

- 자동 슬라이드: 5초
- 전환 속도: 1000ms
- 슬라이드 바뀔 때 title / desc / button에 GSAP 등장 애니메이션

## 12-2. Intro Section

- `MINIMALISM & MODERNITY` 헤드라인
- 브랜드 소개 문장
- 넓은 여백과 중앙 정렬

## 12-3. Best Items Section

- `isBest === true` 상품 중 상위 4개만 노출
- `ProductItem` 재사용
- 제목: `BEST ITEMS`
- 부제: `이번 시즌 가장 사랑받는 에센셜 아이템`

## 12-4. Banner Section

- `SEASON OFF SALE`
- 설명 문장
- `SHOP NOW` 버튼
- 브랜드 캠페인 느낌의 넓은 배너

---

## 13. 상품 목록 페이지 구현 기준

## 13-1. 경로별 자동 필터

`useLocation()`의 pathname 기준으로 자동 필터를 건다.

- `/women` → `gender: 'Woman'`
- `/men` → `gender: 'Man'`
- `/sale` → `isSale: true`
- `/best` → `isBest: true`
- `/product` → 검색어가 없으면 필터 초기화

### 13-2. 카테고리 탭

```txt
All / Outer / Top / Knit / Pants / Skirt / Dress
```

- 클릭 시 `setFilters({ category })`
- 활성 버튼은 underline + 진한 색상

### 13-3. 리스트 상태

- 로딩 시 spinner
- 결과 없으면 `검색 결과가 없습니다.`
- 결과 있으면 4/3/2 grid

---

## 14. ProductItem 카드 기준

카드에서 반드시 살아 있어야 하는 포인트:

- 세로로 긴 이미지 비율
- hover 시 이미지 확대
- hover 시 하단 액션 바 슬라이드 업
- NEW / SALE 배지
- 가격 표시
    - `discountPrice` 있으면 원가 취소선 + 할인 가격
    - 없으면 일반 가격만
- 메타 텍스트: `category | gender`

### 14-1. 액션 버튼

1. `ADD`
    - SweetAlert 성공 모달
    - “장바구니로 이동하시겠습니까?”
    - 확인 시 `/cart`
2. `Heart`
    - 비로그인 시 로그인 유도 Alert
    - 로그인 시 찜 토글
    - 하단 우측 toast

### 14-2. 현재 기준 주의점

현재 코드는 카드에서 바로 `addToCart(product)` 를 호출해서, 옵션 없는 상품이 들어갈 수 있다.

바이브 코딩 시 선택지는 2개다.

- **재현**: 빠른 담기를 허용한다.
- **완성도 보완**: 카드에서는 담기 대신 상세 페이지로 보내거나, 기본 옵션 정책을 만든다.

---

## 15. 상품 상세 페이지 구현 기준

## 15-1. 상단 구조

- 상단 `BACK` 버튼
- 좌측 큰 상품 이미지
- 우측 상품 정보 박스
- Desktop에서 우측 정보는 sticky

## 15-2. 상품 정보 영역

포함 요소:

- 카테고리
- 상품명
- 가격
- 설명
- 컬러 선택칩
- 사이즈 버튼
- 수량 증감 버튼
- `ADD TO BASKET`
- 위시리스트 버튼
- SHARE 버튼
- 무료 배송 문구

### 15-3. 옵션 선택 규칙

- 컬러 미선택 시 경고 Alert
- 사이즈 미선택 시 경고 Alert
- 둘 다 선택해야 장바구니 추가 가능
- cartId는 `id-color-size` 조합

## 15-4. Detail / Reviews 탭

탭은 2개만 있다.

- `DETAILS`
- `REVIEWS (n)`

### 15-5. DETAILS 탭

아래 스펙을 리스트로 보여준다.

- Material
- Weight
- Origin
- Care

### 15-6. REVIEWS 탭

구성:

- 평균 평점 숫자
- 별점 시각화
- 리뷰 개수
- 리뷰 작성 폼
- 리뷰 목록

리뷰 작성 규칙:

- 비로그인: “회원만 리뷰 작성 가능 / 로그인하러 가기” 문구 노출
- 로그인: 별점 + textarea + POST REVIEW 버튼
- 작성 후 SweetAlert 성공

리뷰 목록 규칙:

- 사용자명은 **앞 3글자 이후 마스킹**
    - 예: `seoeun` → `seo***`
- 로그인 유저가 본인 리뷰일 때만 Edit / Delete 노출
- 수정 시 inline edit mode
- 삭제 시 확인 Alert

### 15-7. 연관 상품 섹션

- 현재 상품과 같은 category, 자기 자신 제외
- 최대 10개 중 Swiper로 표시
- 제목: `YOU MAY ALSO LIKE`
- breakpoints:
    - 320: 1.5개
    - 768: 2.5개
    - 1024+: 4개

---

## 16. 장바구니 페이지 구현 기준

## 16-1. 핵심 동작

- 최초 진입 시 `getSanitizedCart()` 실행
- 기존 cartId 없는 데이터가 있으면 보정
- 진입 즉시 전체 상품 선택 상태로 시작

## 16-2. UI 구성

- 좌측: 장바구니 리스트
- 우측: 주문 요약 사이드바 (sticky)

리스트 요소:

- 체크박스
- 상품 이미지
- 상품명
- category / gender
- 선택 옵션
- 가격
- 수량 증감
- 개별 삭제 버튼

상단 선택 바:

- 전체 선택 체크박스
- `전체 선택 (선택수/전체수)` 표시

하단 액션:

- 선택 상품 삭제
- 장바구니 비우기

## 16-3. 금액 계산 규칙

- 선택된 상품만 금액 계산
- 가격은 `discountPrice || price`
- 10만원 이상 무료배송
- 미만이면 3,000원

## 16-4. 주문 버튼

- `선택 상품 주문하기` → 선택된 cartId만 전달
- `전체 상품 주문하기` → 전체 cartId 전달

## 16-5. 빈 장바구니 상태

- 아이콘
- `장바구니가 비어 있습니다.`
- `쇼핑 계속하기` 버튼
- `/women` 이동

---

## 17. 결제 페이지 구현 기준

## 17-1. 진입 규칙

- `location.state?.selectedIds` 를 받는다.
- 값이 있으면 선택 상품만 주문 리스트로 노출
- 값이 없으면 전체 cartItems 사용
- 주문할 상품이 없으면 `/cart`로 돌려보낸다.

## 17-2. 배송지 정보 폼

필드:

- 수령인
- 연락처
- 우편번호
- 기본 주소
- 상세 주소
- 배송 메모

주소 검색:

- `react-daum-postcode` 모달 사용
- 선택 완료 시 우편번호 + 기본 주소 자동 반영

## 17-3. 결제 수단

- `신용카드`
- `무통장 입금`

신용카드 선택 시:

- 현대카드
- 삼성카드
- KB국민카드
- 신한카드

무통장 선택 시:

- 계좌번호 안내 문구
- 예금주 안내
- 24시간 내 입금 안내 노트

## 17-4. 주문 요약

오른쪽 사이드바에 표시:

- 주문 상품 썸네일/이름/옵션/수량/가격
- 상품 금액
- 배송비
- 총 결제 금액
- `결제하기` 버튼

## 17-5. 결제 완료 처리

검증:

- 수령인 / 연락처 / 주소 필수
- 카드 결제면 카드 선택 필수

결제 성공 시:

1. `newOrder` 생성
2. `addOrder(newOrder)`
3. 주문한 상품만 장바구니에서 삭제
4. `/complete` 이동

### 17-6. 실제 한계

비회원 상태로 결제하면 주문은 `guest` 로 저장되지만, 결제 후 `/mypage` 는 로그인 가드가 걸려 있어 UX가 어색해질 수 있다.

재현 우선이면 그대로 가고, 완성도 우선이면 아래 둘 중 하나로 보완해도 된다.

- checkout 진입 자체를 로그인 필수로 바꾸기
- 별도 주문완료 페이지를 만들기

---

## 18. 인증 페이지 구현 기준

## 18-1. 로그인

구성:

- E-MAIL
- PASSWORD
- LOG IN 버튼
- `임시 회원 (테스트용)` 버튼
- `Find ID / PASSWORD`
- `JOIN NOW`

동작:

- `login(credentials)` 호출
- 성공 시 홈 이동
- 실패 시 `error` 문구 표시

테스트 회원 버튼:

- 입력칸에 아래 값 자동 채움
    - `test@ffashion.com`
    - `testpassword123`
- `loginAsTestUser(true)` 로 계정이 없으면 먼저 등록만 해둠

## 18-2. 회원가입

구성:

- NAME
- E-MAIL
- PASSWORD
- CONFIRM PASSWORD
- CREATE ACCOUNT

동작:

- 비밀번호 불일치 시 Alert
- 이메일 중복 시 store error 표시
- 성공 시 성공 Alert 후 `/login` 이동

## 18-3. 계정 찾기

탭 구조:

- FIND ID
- FIND PASSWORD

### ID 찾기

- 이름 + 전화번호 입력
- 일치하면 이메일을 SweetAlert로 표시

### PASSWORD 찾기

1. 이메일 + 이름 검증
2. 성공 시 새 비밀번호 입력 폼으로 전환
3. 새 비밀번호 / 확인 입력
4. 일치하면 `resetPassword`
5. 성공 후 로그인 페이지 이동

---

## 19. 마이페이지 구현 기준

## 19-1. 접근 가드

- 비로그인 시 SweetAlert 경고 후 `/login` 이동
- 로그인 전에는 빈 화면 반환

## 19-2. 기본 레이아웃

- 좌측 사이드바 메뉴
- 우측 컨텐츠 패널
- 상단 환영 배너

사이드바 메뉴 그룹:

- 주문관리
    - 주문내역
    - 관심 상품
- 혜택정보
    - 적립금
    - 쿠폰
- 나의 정보관리
    - 회원 정보 수정
    - 배송지 관리
    - 로그아웃
- 고객센터
    - Q&A
    - FAQ
    - 공지사항
    - 1:1 문의

## 19-3. 주문내역 탭

- `getUserOrders(user.id)` 사용
- 최신 주문이 위로 오도록 reverse
- 카드 UI에 아래 정보 표시
    - 주문일
    - 주문번호
    - 대표 상품 썸네일
    - 상품명 (+ 외 n건)
    - 총 결제 금액
    - 상태

## 19-4. 관심 상품 탭

- `getUserWishlist(user.id)` 결과를 `ProductItem` grid로 렌더링
- 없으면 empty state

## 19-5. 적립금 / 쿠폰 탭

- 실제 기능은 없고 summary + empty state만 존재
- 적립금 0원 / 쿠폰 0장 표시

## 19-6. 회원 정보 수정 탭

- 이름 / 이메일 readOnly
- 버튼은 있으나 실제 비밀번호 수정 로직은 없음

## 19-7. 배송지 관리 탭

상태:

- 조회 모드
- 수정/등록 모드

기능:

- 기본 배송지 카드 표시
- 수정 버튼 클릭 시 폼 전환
- 연락처, 우편번호, 기본 주소, 상세 주소 입력
- 우편번호 찾기는 DaumPostcode 모달 사용
- 저장 시 `updateUserAddress(user.id, phone, fullAddress)` 호출

## 19-8. Q&A 탭

- 리스트 / 작성 폼 2상태
- `ReactQuill` 사용
- 내 Q&A 목록 조회: `getUserQnas(user.id)`
- 작성 / 수정 / 삭제 모두 가능
- 삭제 시 SweetAlert confirm

## 19-9. FAQ 탭

MyPage 내부 FAQ는 별도 아코디언이 아니라, **간단한 텍스트 리스트 요약형**이다.

## 19-10. 공지사항 탭

MyPage 내부 공지사항도 **간단한 텍스트 리스트 요약형**이다.

## 19-11. 1:1 문의 탭

이 탭은 단순 문의만 있는 게 아니라, **내가 쓴 리뷰 + 내 1:1 문의**를 함께 보여주는 통합 탭이다.

### 상단: 내가 등록한 리뷰

- `getUserReviews(user.name)` 사용
- 상품 썸네일/상품명 표시
- 상품 클릭 시 상세 페이지 이동
- 리뷰 수정 / 삭제 가능
- 수정 시 별점 + textarea inline edit

### 하단: 내 1:1 문의

- `getUserInquiries(user.id)` 사용
- 문의 작성 버튼
- 작성/수정은 `ReactQuill` 사용
- 수정/삭제 가능

즉, 이 탭은 **“내 글 관리” 성격**을 담당한다.

---

## 20. 고객센터(Board) 페이지 구현 기준

## 20-1. Notice 페이지

- `fetchNotices()` 로 Seed Data 로드
- 테이블 형태
- 컬럼:
    - No.
    - Title
    - Date
- title 앞에 `[category]` 노출

## 20-2. FAQ 페이지

- `fetchFAQs(currentCat)` 사용
- 카테고리 버튼:
    - All
    - 주문
    - 배송
    - 반품/환불
    - 회원정보
- 클릭 시 필터링
- 아코디언 열고 닫기 가능
- 열릴 때 부드러운 transition

## 20-3. Inquiry 페이지

- 고객센터 단독 문의 폼
- 필드:
    - TYPE select
    - TITLE input
    - CONTENT textarea
- 제출 성공/실패 Alert

주의:

- 이 페이지는 MyPage의 리치 에디터 문의 시스템보다 단순하다.
- **서브 보조 페이지** 느낌이다.

---

## 21. 폴더 구조 기준

```bash
src/
  assets/
    api/
      boardData.js     # 공지사항(Notice) 및 FAQ 초기 모의 데이터 배열
      productData.js   # 카테고리별(Outer, Top 등) 상품 상세 리뷰 및 속성 데이터 집합
    styles/
      variables.scss
      mixins.scss
    components/
      Header.jsx
      Header.scss
      Footer.jsx
      Footer.scss
      CartContext.jsx
      AuthContext.jsx
    pages/
      Main.jsx
      Main.scss
      ProductList.jsx
      ProductList.scss
      ProductDetail.jsx
      ProductDetail.scss
      NotFound.jsx
      NotFound.scss
      Collab.jsx
      Collab.scss
      CollabDetail.jsx
      CollabDetail.scss
      KBrand.jsx
      KBrand.scss
      About.jsx
      About.scss
      Login.jsx
      Login.scss
      Signup.jsx
      Signup.scss
      Cart.jsx
      Cart.scss
      Checkout.jsx
      Checkout.scss
      Complete.jsx
      Complete.scss

    App.jsx
    index.scss
    main.jsx
```

---

## 22. 바이브 코딩 구현 순서 추천

이 프로젝트는 한 번에 크게 던지면 AI가 자주 흐트러진다. 아래 순서로 나누는 편이 훨씬 잘 나온다.

### 1단계

- Vite + React + Router + Zustand + SCSS 세팅
- 전역 스타일, 색상 토큰, 반응형 믹스인, `.inner`, Header/Footer/Layout 먼저 완성

### 2단계

- `productData.js`, `boardData.js` Seed Data 만들기
- `useStore.js` + 각 Slice 생성
- LocalStorage persist 연동

### 3단계

- Home / Search Modal / Nav / ProductItem / ProductList 구현
- `/product`, `/collaboration`, `/kbrand` 흐름 연결

### 4단계

- ProductDetail 구현
- 옵션 선택, 리뷰 CRUD, related swiper, wishlist 연동

### 5단계

- Cart / Checkout 구현
- 선택 주문 / 전체 주문 / 결제 성공 후 주문 저장까지 연결

### 6단계

- Login / Signup / FindAccount 구현
- 테스트 회원 플로우 연결

### 7단계

- MyPage 전체 탭 구현
- 주문 / 위시 / 주소 / Q&A / 1:1 문의 / 내 리뷰 관리 연결

### 8단계

- Notice / FAQ / Inquiry 마무리
- SweetAlert 커스텀 / 모바일 UI 보정

---

## 23. AI에 바로 넣기 좋은 바이브 코딩 프롬프트

아래 프롬프트는 실제로 결과물을 비슷하게 만드는 데 도움이 되도록 작성했다.

## 23-1. 전체 프로젝트 시작 프롬프트

```txt
React 19 + Vite + react-router-dom + Zustand + SCSS로 미니멀 패션 이커머스 프론트엔드 프로젝트를 만들어줘.
브랜드 무드는 ZARA 계열의 흑백 모노톤, 넓은 여백, 얇은 보더, uppercase 타이포다.
백엔드는 붙이지 말고, 모든 데이터는 seed data + Zustand + localStorage persist로 처리해.
localStorage persist key는 ff-storage로 하고, 검색 최근어는 recentSearches로 별도 저장해.
라우트는 /, /about, /product, /women, /men, /kids, /best, /sale, /product/:id, /cart, /checkout, /login, /signup, /find-account, /mypage, /board/notices, /board/faq, /board/inquiry 를 만들어줘.
먼저 전역 스타일 토큰, layout, header, footer, 라우터, store 뼈대부터 만들어줘.
```

## 23-2. 상품 목록/상세 프롬프트

```txt
상품 목록과 상품 상세를 만들어줘.
목록 페이지는 /product, /women, /men, /best, /sale 경로에 따라 필터가 자동 적용되게 하고,
카테고리 탭은 All, Outer, Top, Knit, Pants, Skirt, Dress 로 구성해.
상품 카드는 세로로 긴 이미지 비율, hover 시 하단 액션 버튼, NEW 배지 표시가 있어야 해.
상세 페이지는 좌측 큰 이미지, 우측 sticky 정보 영역, color/size 선택, 수량 변경, add to basket, wishlist 버튼, details/reviews 탭, 리뷰 CRUD, related swiper까지 구현해줘.
리뷰는 로그인 사용자만 작성 가능하고, 본인 리뷰만 수정/삭제 가능하게 해줘.
```

## 23-3. 장바구니/결제 프롬프트

```txt
장바구니와 결제 페이지를 만들어줘.
장바구니는 product id + selectedColor + selectedSize 조합으로 cartId를 만들고,
전체 선택, 개별 선택, 선택 삭제, 전체 비우기, 수량 변경, 선택 상품 주문하기, 전체 상품 주문하기가 가능해야 해.
결제 페이지는 선택된 cartId만 받아서 주문할 수 있어야 하고,
배송지 입력, react-daum-postcode 주소 검색 모달, 카드/무통장 결제 선택, 주문 요약 사이드바, 결제 완료 후 order 저장과 장바구니 삭제까지 연결해줘.
```

## 23-4. 로그인/회원가입/계정찾기 프롬프트

```txt
로그인, 회원가입, 아이디/비밀번호 찾기 페이지를 만들어줘.
Zustand authSlice로 users, user, isLoggedIn, error를 관리하고,
로그인 실패 시 에러 문구를 보여줘.
임시 회원 시작 버튼을 만들어서 test@ffashion.com / testpassword123 을 자동 입력하고,
계정이 없으면 먼저 스토어에 등록만 해두게 해줘.
회원가입은 이메일 중복 검사와 비밀번호 확인 검사를 넣고,
아이디 찾기는 이름+전화번호, 비밀번호 찾기는 이메일+이름 확인 후 재설정 가능하게 만들어줘.
```

## 23-5. 마이페이지 프롬프트

```txt
로그인한 사용자 전용 마이페이지를 만들어줘.
비로그인 접근 시 sweetalert로 로그인 필요 안내 후 /login 으로 보내줘.
좌측 사이드바 메뉴와 우측 콘텐츠 구조로 만들고,
주문내역, 관심상품, 적립금, 쿠폰, 회원정보, 배송지관리, Q&A, FAQ, 공지사항, 1:1 문의 탭이 있어야 해.
배송지 관리는 react-daum-postcode 모달과 updateUserAddress를 사용하고,
Q&A와 1:1 문의 작성/수정 폼은 react-quill-new로 만들어줘.
1:1 문의 탭에서는 내가 쓴 상품 리뷰 목록과 내 문의 목록을 함께 관리할 수 있게 해줘.
```

## 23-6. 폴리싱 프롬프트

```txt
전체 프로젝트를 ZARA 스타일의 미니멀 UI로 폴리싱해줘.
폰트는 Pretendard, 컬러는 black/white/gray 중심, SALE만 red 포인트를 사용해.
header는 sticky, mobile menu는 full screen overlay, search modal은 blur overlay,
product grid는 desktop 4열 / tablet 3열 / mobile 2열,
cart summary와 product detail info는 desktop에서 sticky,
sweetalert2 팝업은 각진 모양과 블랙 버튼 스타일로 커스텀해줘.
반응형은 단순 축소가 아니라 모바일에서 구성 자체가 자연스럽게 바뀌어야 해.
```

---

## 24. 정의된 완료 기준 (Definition of Done)

### 24-1. 화면

- [ ] 헤더가 sticky다.
- [ ] 태블릿 이하에서 햄버거 메뉴가 전체 화면으로 열린다.
- [ ] 검색 모달이 전체 화면 오버레이로 뜬다.
- [ ] 홈 Hero가 풀스크린 비주얼 느낌으로 동작한다.
- [ ] 상품 카드가 세로형 이미지 카드다.
- [ ] 상세 페이지가 좌우 2컬럼 + sticky info 구조다.
- [ ] 장바구니/결제 요약이 우측 sticky 사이드바다.
- [ ] 마이페이지가 좌측 메뉴 + 우측 패널 구조다.

### 24-2. 기능

- [ ] 앱 시작 시 상품 Seed Data가 스토어에 들어간다.
- [ ] 검색어로 상품 검색이 된다.
- [ ] 최근 검색어가 최대 5개 저장된다.
- [ ] 찜하기 토글이 된다.
- [ ] 리뷰 작성/수정/삭제가 된다.
- [ ] 문의/Q&A 작성/수정/삭제가 된다.
- [ ] 장바구니에 옵션 조합 기준으로 담긴다.
- [ ] 선택 주문 / 전체 주문이 된다.
- [ ] 주문 후 장바구니에서 해당 상품만 제거된다.
- [ ] 마이페이지에서 내 주문 / 찜 / 리뷰 / 문의를 볼 수 있다.

### 24-3. 영속성

- [ ] 새로고침 후 로그인 상태가 유지된다.
- [ ] 새로고침 후 장바구니가 유지된다.
- [ ] 새로고침 후 위시리스트가 유지된다.
- [ ] 새로고침 후 주문 내역이 유지된다.
- [ ] 새로고침 후 내가 쓴 리뷰/Q&A/문의가 유지된다.

### 24-4. 반응형

- [ ] 모바일에서 Header 높이와 메뉴 구조가 달라진다.
- [ ] Product Grid가 2열로 줄어든다.
- [ ] 상세 페이지가 1열로 떨어진다.
- [ ] Footer가 세로 스택으로 바뀐다.
- [ ] 장바구니/결제 UI가 모바일에서도 읽기 쉬운 구조다.

---

## 25. 약점과 보완 포인트

### 25-1. `/kids` 메뉴

- 현재 라우트는 있지만 실제 필터 데이터가 없다.
- 선택지:
    - 메뉴 제거
    - 더미 데이터 추가
    - 빈 상태 페이지로 명확히 처리

### 25-2. 카드 퀵 ADD의 옵션 문제

- 현재 구현은 옵션 없는 cart item이 생길 여지가 있다.
- 권장 보완:
    - 카드에서는 상세 페이지 이동만 허용
    - 또는 기본 옵션을 강제로 지정

### 25-3. 게스트 결제 플로우

- 주문 저장 후 `/mypage` 로 이동하는데 비로그인 사용자는 막힌다.
- 권장 보완:
    - 결제 전 로그인 필수
    - 또는 주문완료 페이지 별도 제공

### 25-4. 회원정보 수정 탭

- 현재는 readOnly + 버튼만 있고 실제 수정 로직이 없다.
- 포트폴리오 완성도를 높이려면 추후 확장 가능

### 25-5. Share 버튼

- UI만 있고 실제 공유 액션이 없다.
- `navigator.share` 또는 URL copy로 보완 가능

### 25-6. React Query

- Provider만 있고 핵심 기능에는 거의 사용하지 않는다.
- 의도적으로 유지할지, 아니면 제거하고 프로젝트를 더 선명하게 만들지 결정하면 된다.

---

## 26. 최종 정리

이 프로젝트를 잘 재현하려면 아래 순서를 기억하면 된다.

1. **브랜드 무드**를 먼저 맞춘다.  
   검정/흰색/회색, 큰 여백, 얇은 선, 절제된 타이포가 먼저다.

2. **레이아웃과 흐름**을 맞춘다.  
   Header → Search → Product List → Detail → Cart → Checkout → MyPage 흐름이 자연스럽게 이어져야 한다.

3. **상태와 영속성**을 맞춘다.  
   이 프로젝트의 강점은 예쁜 UI보다도, 상태가 새로고침 후에도 유지되는 실제 상호작용에 있다.

4. **반응형과 디테일**로 마무리한다.  
   모바일 메뉴, sticky 영역, hover, toast, alert, review edit mode 같은 요소가 결과물의 완성도를 크게 올린다.

---
