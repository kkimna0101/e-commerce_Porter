import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store/useStore';
import ProductItem from '../components/ProductItem';

import 'swiper/css';
import 'swiper/css/effect-fade';
import './Main.scss';

/* eslint-disable react-hooks/exhaustive-deps */
function Main() {
  const { products, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.gsap-fade-up');
    sections.forEach(sec => {
      gsap.fromTo(sec, 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, [products]); // products 로딩 후 트리거 재계산 가능성 고려

  const bestItems = products.filter(p => p.isBest).slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Visual */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
          loop={true}
          className="hero__swiper"
        >
          <SwiperSlide>
            <div className="hero__slide" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
              <div className="hero__content">
                <h2 className="hero__title">NEW COLLECTION</h2>
                <p className="hero__desc">Discover the latest trends in our new arrivals.</p>
                <Link to="/product" className="hero__btn">SHOP NOW</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__slide" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
              <div className="hero__content">
                <h2 className="hero__title">TIMELESS PIECES</h2>
                <p className="hero__desc">Elevate your everyday wardrobe with our timeless pieces.</p>
                <Link to="/product" className="hero__btn">SHOP NOW</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero__slide" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
              <div className="hero__content">
                <h2 className="hero__title">URBAN ESSENTIALS</h2>
                <p className="hero__desc">Modern essentials for the urban lifestyle.</p>
                <Link to="/product" className="hero__btn">SHOP NOW</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Intro Section */}
      <section className="intro">
        <div className="inner">
          <div className="intro-text gsap-fade-up">
            <h2 className="gsap-fade-up">OUR PHILOSOPHY</h2>
            <p className="gsap-fade-up">
              PORTER는 불필요한 장식을 배제하고 본질에 집중합니다. <br />
              시간이 지나도 변하지 않는 가치를 담아, <br />
              당신의 일상에 조화롭게 스며드는 미니멀리즘의 정석을 선보입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Best Items Section */}
      <section className="best-items inner">
        <h2 className="section-title gsap-fade-up">BEST SELLERS</h2>
        <div className="best-grid">
          {bestItems.map(item => (
            <div key={item.id} className="gsap-fade-up">
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="promo-banner">
        <div className="promo-banner__bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}></div>
        <div className="promo-banner__content inner gsap-fade-up">
          <h2 className="banner__title">SEASON OFF SALE</h2>
          <p className="banner__desc">최대 50% 할인된 가격으로 다양한 상품을 만나보세요.</p>
          <Link to="/sale" className="banner__btn">SHOP NOW</Link>
        </div>
      </section>
    </div>
  );
};

export default Main;
