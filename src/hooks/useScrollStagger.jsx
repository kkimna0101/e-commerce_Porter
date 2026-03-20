import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollStagger = (triggerRef, selector) => {
    useEffect(() => {
        const el = triggerRef.current;
        if (!el) return;

        const targets = gsap.utils.toArray(el.querySelectorAll(selector));
        if (targets.length === 0) return;

        gsap.set(targets, { y: 80, opacity: 0 });

        const stArray = ScrollTrigger.batch(targets, {
            start: 'top 85%',
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out', overwrite: true }),
            onLeave: batch => gsap.to(batch, { opacity: 0, y: -80, duration: 0.5, stagger: 0.1, overwrite: true }),
            onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out', overwrite: true }),
            onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 80, duration: 0.5, stagger: 0.1, overwrite: true })
        });

        return () => {
            if (stArray && stArray.length) {
                stArray.forEach(t => t.kill());
            }
        };
    }, [triggerRef, selector]);
};

export default useScrollStagger;