import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// =============================================================
// SMALL MOTION PRIMITIVES
// Everything here is CSS-driven; JS only feeds it a number or a
// class. No animation library — the site doesn't need one, and
// the bundle is better off without it.
// =============================================================

/** True when the visitor has asked for reduced motion. */
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Thin progress bar pinned under the navbar showing how far down
 * the page you are.
 */
export const ScrollProgress = () => {
    const [pct, setPct] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setPct(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
            <div
                className="h-full origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-brand-300 transition-[width] duration-150 ease-out"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
};

/**
 * Translates its children against the scroll to create depth.
 * `speed` is a fraction of the scroll distance — 0.15 is subtle,
 * 0.4 is obvious. Disabled entirely under reduced motion.
 */
export const Parallax = ({ speed = 0.18, className = '', children }) => {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        const node = ref.current;
        if (!node) return undefined;

        let frame = null;
        const update = () => {
            frame = null;
            const rect = node.getBoundingClientRect();
            // Distance of the element's centre from the viewport centre.
            const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
            setOffset(-fromCentre * speed);
        };

        const onScroll = () => {
            if (frame === null) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [speed]);

    return (
        <div ref={ref} className={className} style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
            {children}
        </div>
    );
};

/**
 * Feeds pointer position into the --mx/--my custom properties the
 * `.spotlight` rule reads, so a card lights up under the cursor.
 */
export const Spotlight = ({ className = '', as: Tag = 'div', children, ...rest }) => {
    const ref = useRef(null);

    const onMove = (e) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        node.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    return (
        <Tag ref={ref} onPointerMove={onMove} className={`spotlight ${className}`} {...rest}>
            {children}
        </Tag>
    );
};

/**
 * Re-runs the page-in animation whenever the route changes, so
 * navigating between pages reads as a transition rather than a cut.
 */
export const PageTransition = ({ children }) => {
    const { pathname } = useLocation();
    return (
        <div key={pathname} className="page-in">
            {children}
        </div>
    );
};

/**
 * Splits a line into words and reveals them one after another.
 * Kept to headline use — it is expensive to read at paragraph length.
 */
export const WordReveal = ({ text, className = '', delay = 0, step = 55 }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return undefined;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={className}>
            {text.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
                    <span
                        className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            transform: visible ? 'none' : 'translateY(105%)',
                            transitionDelay: `${delay + i * step}ms`,
                        }}
                    >
                        {word}
                        {' '}
                    </span>
                </span>
            ))}
        </span>
    );
};
