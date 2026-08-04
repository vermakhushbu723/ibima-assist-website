import React, { useEffect, useRef, useState } from 'react';

/**
 * Counts a number up once it scrolls into view. Respects
 * prefers-reduced-motion by jumping straight to the final value.
 */
const StatCounter = ({ value, suffix = '', prefix = '', duration = 1400, className = '' }) => {
    const ref = useRef(null);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const node = ref.current;
        if (!node) return undefined;

        const reduced =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        if (reduced || typeof IntersectionObserver === 'undefined') {
            setDisplay(value);
            return undefined;
        }

        let frame;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                const start = performance.now();
                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    // easeOutCubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setDisplay(Math.round(value * eased));
                    if (progress < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );

        observer.observe(node);
        return () => {
            observer.disconnect();
            if (frame) cancelAnimationFrame(frame);
        };
    }, [value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display}
            {suffix}
        </span>
    );
};

export default StatCounter;
