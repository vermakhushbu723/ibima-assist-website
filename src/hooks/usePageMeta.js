import { useEffect } from 'react';
import { BRAND } from '../data/site';

/**
 * Sets the document title and meta description per page. A tiny
 * stand-in for a head manager — the site is small enough that a
 * dependency isn't worth it.
 */
const usePageMeta = (title, description) => {
    useEffect(() => {
        document.title = title ? `${title} | ${BRAND.name}` : `${BRAND.name} | ${BRAND.tagline}`;

        if (!description) return;
        let tag = document.querySelector('meta[name="description"]');
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', 'description');
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', description);
    }, [title, description]);
};

export default usePageMeta;
