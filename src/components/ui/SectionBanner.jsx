import React from 'react';
import Img from './Img';
import Reveal from './Reveal';
import { getSectionImage } from '../../data/images';

/**
 * A wide photographic band that tells you what a section is about
 * before you read it. Used on every section that doesn't already
 * carry its own imagery, so the page scans visually top to bottom.
 *
 * @param {string} name    key into SECTION_IMAGES
 * @param {string} caption bold line over the image
 * @param {string} sub     supporting line, hidden on the smallest phones
 * @param {string} ratio   Tailwind aspect utility; defaults to a short band
 * @param {string} align   'left' (default) or 'center' text placement
 */
const SectionBanner = ({
    name,
    caption,
    sub,
    ratio = 'aspect-[16/9] xs:aspect-[21/9] sm:aspect-[3/1]',
    align = 'left',
    className = '',
    delay = 0,
}) => {
    const photo = getSectionImage(name);
    const centred = align === 'center';

    return (
        <Reveal delay={delay} from="up" className={className}>
            <div className="group overflow-hidden rounded-2xl sm:rounded-3xl">
                <Img base={photo.base} alt={photo.alt} ratio={ratio} zoom>
                    <div
                        className={
                            centred
                                ? 'absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/60 to-ink/30'
                                : 'absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/65 to-ink/15'
                        }
                    />
                    <div
                        className={`absolute inset-0 flex flex-col justify-center p-5 sm:p-8 lg:p-10 ${
                            centred ? 'items-center text-center' : 'max-w-xl'
                        }`}
                    >
                        {caption && (
                            <p className="text-h3 font-extrabold tracking-tight text-white">{caption}</p>
                        )}
                        {sub && (
                            <p className="mt-2 hidden text-[13px] leading-relaxed text-slate-300 xs:block sm:mt-2.5 sm:text-sm">
                                {sub}
                            </p>
                        )}
                    </div>
                </Img>
            </div>
        </Reveal>
    );
};

export default SectionBanner;
