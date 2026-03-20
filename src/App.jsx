import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Main from './pages/main/Main';
import ProductList from './pages/productList/ProductList';
import ProductDetail from './pages/productDetail/ProductDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Complete from './pages/complete/Complete';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import FindAccount from './pages/findAccount/FindAccount';
import MyPage from './pages/mypage/MyPage';
import Board from './pages/board/Board';
import NotFound from './pages/notFound/NotFound';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

// 서브 페이지 공통 레이아웃: Header 상단 고정 + 콘텐츠
const SubLayout = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* 메인: Header는 Main.jsx 안에서 HeroSection 아래에 배치 */}
                <Route path="/" element={<Main />} />

                {/* 서브 페이지: SubLayout이 Header 포함 */}
                <Route
                    path="/product"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/women"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/men"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/kids"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/sale"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/best"
                    element={
                        <SubLayout>
                            <ProductList />
                        </SubLayout>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <SubLayout>
                            <ProductDetail />
                        </SubLayout>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <SubLayout>
                            <Cart />
                        </SubLayout>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <SubLayout>
                            <Checkout />
                        </SubLayout>
                    }
                />
                <Route
                    path="/complete"
                    element={
                        <SubLayout>
                            <Complete />
                        </SubLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <SubLayout>
                            <Login />
                        </SubLayout>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <SubLayout>
                            <Signup />
                        </SubLayout>
                    }
                />
                <Route
                    path="/find-account"
                    element={
                        <SubLayout>
                            <FindAccount />
                        </SubLayout>
                    }
                />
                <Route
                    path="/mypage"
                    element={
                        <SubLayout>
                            <MyPage />
                        </SubLayout>
                    }
                />
                <Route
                    path="/board/:type"
                    element={
                        <SubLayout>
                            <Board />
                        </SubLayout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <SubLayout>
                            <NotFound />
                        </SubLayout>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
