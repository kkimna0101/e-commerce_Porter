import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Main from "./pages/main/Main";
import ProductList from "./pages/productList/ProductList";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Complete from "./pages/complete/Complete";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import FindAccount from "./pages/findAccount/FindAccount";
import MyPage from "./pages/mypage/MyPage";
import Board from "./pages/board/Board";
import NotFound from "./pages/notFound/NotFound";
import Collab from "./pages/collab/Collab";
import KBrand from "./pages/kbrand/KBrand";
import About from "./pages/about/About";
import Offline from "./pages/offline/offline";
import OfflineStore from "./pages/offline/offlineStore";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const location = useLocation();
  const validPaths = [
    "/",
    "/product",
    "/women",
    "/men",
    "/kids",
    "/sale",
    "/best",
    "/cart",
    "/checkout",
    "/complete",
    "/login",
    "/signup",
    "/find-account",
    "/mypage",
    "/collab",
    "/k-brand",
    "/about",
    "/offline",
  ];
  const isNotFound = !validPaths.some((path) => {
    const normalizedPath = location.pathname === "/"
      ? "/"
      : (location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname);
    const normalizedTarget = path === "/"
      ? "/"
      : (path.endsWith("/") ? path.slice(0, -1) : path);

    return (
      normalizedPath === normalizedTarget ||
      location.pathname.startsWith("/product/") ||
      location.pathname.startsWith("/offline/") ||
      location.pathname.startsWith("/board/")
    );
  });

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/about"
          element={
            <SubLayout>
              <About />
            </SubLayout>
          }
        />
        <Route
          path="/product"
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
          path="/collab"
          element={
            <SubLayout>
              <Collab />
            </SubLayout>
          }
        />
        <Route
          path="/k-brand"
          element={
            <SubLayout>
              <KBrand />
            </SubLayout>
          }
        />
        <Route
          path="/offline"
          element={
            <SubLayout>
              <Offline />
            </SubLayout>
          }
        />
        <Route
          path="/offline/:id"
          element={
            <SubLayout>
              <OfflineStore />
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
      {!isNotFound && <Footer />}
    </>
  );
}

export default App;
