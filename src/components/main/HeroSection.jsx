import React, { useState, useEffect } from 'react';
import './HeroSection.scss';

const HeroSection = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        
        if (isHovered) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isHovered]);

    return (
        <section 
            className="hero" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="hero__frame">
                <video
                    src="/videos/PALACExPORTER2.mp4"
                    className="hero__video"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            </div>
            
            {isHovered && (
                <div 
                    className="hero__cursor"
                    style={{ 
                        left: `${mousePos.x}px`, 
                        top: `${mousePos.y}px` 
                    }}
                >
                    <span className="hero__cursor-text">SCROLL</span>
                </div>
            )}
        </section>
    );
};

export default HeroSection;