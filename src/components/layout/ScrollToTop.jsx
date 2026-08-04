import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router keeps the scroll position across navigations, which
 * lands you halfway down a freshly-opened page. Reset it on every
 * path change — unless the URL carries a hash, in which case let
 * the browser handle the anchor itself.
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) return;
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
