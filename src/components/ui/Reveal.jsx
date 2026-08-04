import React, { useEffect, useRef, useState } from 'react';

/**
 * Animates its children into view the first time they cross the
 * viewport.
 *
 * @param {string} from  travel direction — 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
 * @param {number} delay stagger, in ms
 *
 * Falls back to "always visible" without IntersectionObserver, and
 * the .reveal rules in index.css drop the motion entirely under
 * prefers-reduced-motion.
 */
const Reveal = ({
    children,
    delay = 0,
    from = 'up',
    className = '',
    as: Tag = 'div',
    ...rest
}) => {
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
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal reveal-${from} ${visible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export default Reveal;
