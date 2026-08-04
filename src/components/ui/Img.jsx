import React, { useState } from 'react';
import { img } from '../../data/images';

/**
 * Remote photograph with the boring parts handled: a responsive
 * srcset so phones don't download a 1600px file, native lazy
 * loading below the fold, a tinted placeholder while it arrives,
 * and a fade-in once it does.
 *
 * @param {string}  base     Unsplash photo base from src/data/images.js
 * @param {string}  alt      required — describes the photo, not the layout
 * @param {string}  ratio    Tailwind aspect utility, e.g. 'aspect-[4/3]'
 * @param {boolean} zoom     scale the image on hover of the nearest .group
 * @param {boolean} priority skip lazy loading (use for above-the-fold only)
 * @param {number}  width    intrinsic width to request for the default src
 */
const Img = ({
    base,
    alt,
    ratio = 'aspect-[4/3]',
    zoom = false,
    priority = false,
    width = 1200,
    className = '',
    imgClassName = '',
    children,
}) => {
    const [loaded, setLoaded] = useState(false);

    const srcSet = [480, 800, 1200, 1600].map((w) => `${img(base, { w })} ${w}w`).join(', ');

    return (
        <div className={`relative overflow-hidden ${ratio} ${className}`}>
            {/* Placeholder — brand-tinted so the gap never flashes white */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-slate-200 to-brand-100 transition-opacity duration-700 ${
                    loaded ? 'opacity-0' : 'opacity-100 animate-pulse'
                }`}
                aria-hidden="true"
            />

            <img
                src={img(base, { w: width })}
                srcSet={srcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={priority ? 'high' : 'auto'}
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                    loaded ? 'opacity-100' : 'opacity-0'
                } ${zoom ? 'group-hover:scale-[1.06]' : ''} ${imgClassName}`}
            />

            {/* Overlays — gradients, badges, detection boxes */}
            {children}
        </div>
    );
};

export default Img;
