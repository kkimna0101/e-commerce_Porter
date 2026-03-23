import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { offlineStores } from '../../assets/api/offlineStores';
import { offlineStoresMap } from '../../assets/api/offlineStores';
import './offlineStore.scss';
import KakaoMap from "../../components/offline/KakaoMap";

const SLIDE_COUNT = 4;
const WHEEL_THROTTLE_MS = 520;
const WHEEL_MIN_DELTA = 28;
const INTERSECTION_MIN_RATIO = 0;
const OfflineStore = () => {
    const { id } = useParams();
    const store = offlineStores.find((s) => s.id === id);
    const map = offlineStoresMap.find((s) => s.id === id);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderRef = useRef(null);
    const currentIndexRef = useRef(0);
    const isSliderActiveRef = useRef(false);
    const lastWheelAtRef = useRef(0);
    const imageRef = useRef(null);

    const scrollToMap = () => {
      imageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
    useEffect(() => {
        setCurrentIndex(0);
    }, [id]);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const slides = useMemo(
        () =>
            Array.from(
                { length: SLIDE_COUNT },
                (_, i) => `/images/offline/${id}_${i + 1}.png`
            ),
        [id]
    );

    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const rect = entry.boundingClientRect;
                const sliderCenter = rect.top + rect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                isSliderActiveRef.current =
                    entry.isIntersecting &&
                    Math.abs(sliderCenter - viewportCenter) < 100;
            },
            {
                threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
                rootMargin: '0px',
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [id]);

    useEffect(() => {
        const total = slides.length;
        if (total === 0) return undefined;

        const handleWheel = (e) => {
            if (!isSliderActiveRef.current) return;

            const idx = currentIndexRef.current;
            const deltaY = e.deltaY;

            if (Math.abs(deltaY) < WHEEL_MIN_DELTA) return;

            const now = Date.now();
            const inCooldown = now - lastWheelAtRef.current < WHEEL_THROTTLE_MS;

            if (deltaY > 0) {
                if (idx < total - 1) {
                    e.preventDefault();
                    if (inCooldown) return;
                    lastWheelAtRef.current = now;
                    setCurrentIndex(idx + 1);
                }
            } else if (deltaY < 0) {
                if (idx > 0) {
                    e.preventDefault();
                    if (inCooldown) return;
                    lastWheelAtRef.current = now;
                    setCurrentIndex(idx - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [slides.length, id]);

    if (!store) {
        return <Navigate to="/offline" replace />;
    }

    return (
        <div className="offline-store-page inner">
            <div className="offline-store-page__inner">
                <h1 className="offline-store-page__title">{store.name}</h1>      
                <div className='offline-store-page__content'>
                <div className='offline-store-page__image-container'>
                    <div className="offline-store-page__slider" ref={sliderRef} aria-roledescription="carousel">
                    <div className="offline-store-page__indicator" aria-label="Store images">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`Image ${i + 1} of ${slides.length}`}
                                aria-current={i === currentIndex ? 'true' : undefined}
                                className={`offline-store-page__indicator-segment ${
                                    i === currentIndex ? 'is-active' : ''
                                }`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                    <div className="offline-store-page__stage">
                        <div
                            className="offline-store-page__image-wrap"
                            key={currentIndex}
                        >
                            <img
                                src={slides[currentIndex]}
                                alt={`${store.name} — ${currentIndex + 1} / ${slides.length}`}
                                className="offline-store-page__image"
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div className='offline-store-page__info-container'>
                    
                    <div className='offline-store-page__title-container'>
                    <span className='offline-store-page__title-kr'>포터 {store.name_kr}</span>
                    <span className='offline-store-page__title-en'>PORTER {store.name}</span>
                    </div>
                    <p className='offline-store-page__description'>{store.description}</p>
                    <div className='offline-store-page__divider'></div>
                    <p className='offline-store-page__address'>{store.address}</p>
                    <div className='offline-store-page__info-cols'>
                        <div className='offline-store-page__info-col'>                        <span className='offline-store-page__info-item-title'>TEL</span>
                        <p className='offline-store-page__info-item '>{store.tel}</p></div>
                        <div className='offline-store-page__info-col'>                        <span className='offline-store-page__info-item-title'>HOURS</span>
                        <p className='offline-store-page__info-item'>{store.hr}</p> </div>
                        <div className='offline-store-page__info-col'>                        <span className='offline-store-page__info-item-title'>SERVICE</span>
                        <p className='offline-store-page__info-item'>수리접수</p></div>
                    </div>
                    <button className='offline-store-page__map-button' onClick={scrollToMap}>SHOW MAP</button>
                </div>
                </div>
            </div>
            <div className='offline-store-page__map-container' ref={imageRef}>
                <KakaoMap  mapUrl={map.mapUrl} imageUrl={map.imageUrl}  />
                <div className='offline-store-page__map-right-container'>
                    <img src='/images/offline/porter_man.png' alt='porter_man' />
                    <div className='offline-store-page__logo-text-container'>
                        <span className='offline-store-page__logo-text-en'>PORTER</span>
                        <div className='offline-store-page__logo-line'></div>
                        <span className='offline-store-page__logo-text-en'>{store.name}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OfflineStore;
