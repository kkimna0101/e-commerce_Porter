import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ArtistSection.scss';

const SH = 44;
const LH = 140;
const TOTAL_SLOTS = 11;
const CENTER_SLOT = 5;

const artists = [
    'PARK SEOBO',
    'SUH DOHO',
    'SAMBYPEN',
    '275C',
    'Lee Bae',
    'Yang Haegue',
    'Aokizy',
    'GRAFFLEX',
    'BUMBGUE',
    'Seonglib',
    'Lee Jaiik',
    'JI HYEYEON',
];

const ArtistSection = () => {
    const slotRefs = useRef([]);
    const aliveRef = useRef(true);
    const offsetRef = useRef(0);

    const vpH = SH * CENTER_SLOT + LH + SH * (TOTAL_SLOTS - CENTER_SLOT - 1);

    useEffect(() => {
        aliveRef.current = true;

        const roll = () => {
            if (!aliveRef.current) return;
            offsetRef.current = (offsetRef.current + 1) % artists.length;
            const newOffset = offsetRef.current;

            slotRefs.current.forEach((span, slotIdx) => {
                if (!span) return;
                const isCenter = slotIdx === CENTER_SLOT;
                const h = isCenter ? LH : SH;
                const wordIdx = (newOffset + slotIdx) % artists.length;

                gsap.timeline()
                    .to(span, { y: -h, duration: 0.3, ease: 'power2.in' })
                    .call(() => {
                        span.textContent = artists[wordIdx];
                        gsap.set(span, { y: h });
                    })
                    .to(span, { y: 0, duration: 0.3, ease: 'power2.out' });
            });

            setTimeout(roll, 2000);
        };

        const t = setTimeout(roll, 2000);
        return () => {
            aliveRef.current = false;
            clearTimeout(t);
            slotRefs.current.forEach((s) => s && gsap.killTweensOf(s));
        };
    }, []);

    return (
        <section className="artist-section">
            <div className="artist-section__inner">
                {/* 좌측: 롤링 이름 */}
                <div className="artist-section__left">
                    <div className="artist-viewport" style={{ height: vpH }}>
                        {Array.from({ length: TOTAL_SLOTS }).map((_, slotIdx) => {
                            const isCenter = slotIdx === CENTER_SLOT;
                            const slotH = isCenter ? LH : SH;
                            const top =
                                slotIdx < CENTER_SLOT
                                    ? slotIdx * SH
                                    : slotIdx === CENTER_SLOT
                                      ? CENTER_SLOT * SH
                                      : CENTER_SLOT * SH + LH + (slotIdx - CENTER_SLOT - 1) * SH;
                            const wordIdx = (offsetRef.current + slotIdx) % artists.length;

                            return (
                                <div
                                    key={slotIdx}
                                    className={`artist-slot ${isCenter ? 'artist-slot--center' : ''}`}
                                    style={{ top, height: slotH }}
                                >
                                    {/* 수직 클리핑 래퍼: 인접 슬롯 시각 침범 방지 */}
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            height: slotH,
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <span
                                            ref={(el) => (slotRefs.current[slotIdx] = el)}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {artists[wordIdx]}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 우측: 설명 텍스트 */}
                <div className="artist-section__right">
                    <div className="artist-section__header">
                        <div className="artist-section__title">PORTER'S ARTIST</div>
                        <h2 className="artist-section__subtitle">: 포터의 작가들</h2>
                    </div>
                    <p className="artist-section__desc">
                        <span className="artist-section__desc-bold">
                            포터의 80여 년 역사에 깃든 '일침입혼'의 가치는 한국의 아티스트들과
                            새로운 대화를 시작합니다.
                        </span>{' '}
                        우리는 단순히 유행을 쫓는 협업이 아닌, 각자의 분야에서 타협하지 않는 고집을
                        이어온 작가들을 조명합니다. 포터의 견고한 캔버스 위에 한국 작가들의 독창적인
                        시선이 더해져 완성된 이 특별한 기록들은, 사물이 예술이 되는 짜릿한 경험을
                        선사합니다.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ArtistSection;
