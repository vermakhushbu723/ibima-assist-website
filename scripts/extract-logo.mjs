// The product app ships a co-branding lockup at
//   car-damage-insurance-web-app/src/assets/logo.png
// containing TWO logos side by side: New India Assurance (a client) on
// the left, and the IBima Assist mark on the right.
//
// This corporate site is IBima Assist's own, so only the right-hand mark
// belongs in its navbar, footer and favicon — carrying a client insurer's
// logo in the site chrome would present them as part of this brand.
//
// This script pulls out just the IBima Assist mark, trims it, drops the
// white background to transparent, and writes:
//   public/logo-ibima.png      full mark (icon + wordmark)
//   public/logo-ibima-icon.png the icon alone, for the favicon
//
//   node scripts/extract-logo.mjs
//
import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const SOURCE = 'D:/Project/demoDeepak/car-insorence/car-damage-insurance-web-app/src/assets/logo.png';

// Column 363–374 is the empty gutter between the two logos (measured, not
// guessed — see the column ink profile that found it).
const SPLIT_X = 375;

const src = PNG.sync.read(readFileSync(SOURCE));

const at = (png, x, y) => {
    const i = (png.width * y + x) << 2;
    return [png.data[i], png.data[i + 1], png.data[i + 2], png.data[i + 3]];
};

const isBlank = ([r, g, b, a]) => a < 20 || (r > 238 && g > 238 && b > 238);
// The mark sits inside a thin dark rectangle in the source file.
const isBorder = ([r, g, b, a]) => a > 20 && r < 110 && g < 110 && b < 110;

/** Copies a rectangle out of a PNG. */
const crop = (png, x0, y0, w, h) => {
    const out = new PNG({ width: w, height: h });
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const s = (png.width * (y + y0) + (x + x0)) << 2;
            const d = (w * y + x) << 2;
            out.data[d] = png.data[s];
            out.data[d + 1] = png.data[s + 1];
            out.data[d + 2] = png.data[s + 2];
            out.data[d + 3] = png.data[s + 3];
        }
    }
    return out;
};

/** Shrinks to the tightest box containing non-blank pixels, plus padding. */
const trim = (png, pad = 2) => {
    let minX = png.width;
    let minY = png.height;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
            if (!isBlank(at(png, x, y))) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }
    if (maxX < 0) throw new Error('nothing left after trim');
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(png.width - 1, maxX + pad);
    maxY = Math.min(png.height - 1, maxY + pad);
    return crop(png, minX, minY, maxX - minX + 1, maxY - minY + 1);
};

/**
 * White background -> transparent, with a soft ramp so anti-aliased edges
 * don't end up with a hard white fringe on a dark navbar.
 */
const dropWhite = (png) => {
    for (let i = 0; i < png.data.length; i += 4) {
        const [r, g, b] = [png.data[i], png.data[i + 1], png.data[i + 2]];
        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const nearWhite = min > 228 && max - min < 14;
        if (nearWhite) {
            png.data[i + 3] = 0;
        } else if (min > 200 && max - min < 22) {
            png.data[i + 3] = Math.round(png.data[i + 3] * ((228 - min) / 28));
        }
    }
    return png;
};

// ── 1. The right-hand half ─────────────────────────────────────
let mark = crop(src, SPLIT_X, 0, src.width - SPLIT_X, src.height);

// ── 2. Strip the rectangle drawn around it ─────────────────────
// Walk in from each edge while the row/column is mostly border colour.
const mostlyBorder = (png, fixed, along, horizontal) => {
    let n = 0;
    for (let i = 0; i < along; i++) {
        const px = horizontal ? at(png, i, fixed) : at(png, fixed, i);
        if (isBorder(px)) n++;
    }
    return n / along > 0.6;
};

let top = 0;
let bottom = mark.height - 1;
let left = 0;
let right = mark.width - 1;
while (top < bottom && mostlyBorder(mark, top, mark.width, true)) top++;
while (bottom > top && mostlyBorder(mark, bottom, mark.width, true)) bottom--;
while (left < right && mostlyBorder(mark, left, mark.height, false)) left++;
while (right > left && mostlyBorder(mark, right, mark.height, false)) right--;
mark = crop(mark, left, top, right - left + 1, bottom - top + 1);

// ── 3. Trim, de-white, write ───────────────────────────────────
mark = dropWhite(trim(mark, 3));
writeFileSync('public/logo-ibima.png', PNG.sync.write(mark));
console.log(`public/logo-ibima.png       ${mark.width}x${mark.height}`);

// ── 4. The icon alone, for the favicon and the navbar ──────────
// The mark is stacked — graphic on top, "IBima Assist" beneath — so the
// split is a horizontal gutter, found by looking for the emptiest run of
// rows in the middle of the image.
const inkPerRow = [];
for (let y = 0; y < mark.height; y++) {
    let n = 0;
    for (let x = 0; x < mark.width; x++) if (mark.data[((mark.width * y + x) << 2) + 3] > 30) n++;
    inkPerRow.push(n);
}

let gutter = -1;
let bestRun = 0;
let run = 0;
for (let y = Math.floor(mark.height * 0.3); y < mark.height * 0.85; y++) {
    // Rows with a trace of ink still count — the graphic has a long thin
    // tail that would otherwise never leave a completely empty row.
    if (inkPerRow[y] <= Math.max(1, mark.width * 0.02)) {
        run++;
        if (run > bestRun) {
            bestRun = run;
            gutter = y - run + 1;
        }
    } else {
        run = 0;
    }
}

const cutAt = gutter > 0 ? gutter : Math.floor(mark.height * 0.62);
const icon = trim(crop(mark, 0, 0, mark.width, cutAt), 2);
writeFileSync('public/logo-ibima-icon.png', PNG.sync.write(icon));
console.log(`public/logo-ibima-icon.png  ${icon.width}x${icon.height}   (split at y=${cutAt})`);

// ── 5. A square favicon ────────────────────────────────────────
// Browsers letterbox a wide image into a square tab slot; centring it on
// a transparent square canvas keeps it crisp instead.
const SIDE = 256;
const scale = Math.min((SIDE * 0.86) / icon.width, (SIDE * 0.86) / icon.height);
const fw = Math.round(icon.width * scale);
const fh = Math.round(icon.height * scale);
const ox = Math.round((SIDE - fw) / 2);
const oy = Math.round((SIDE - fh) / 2);

const favicon = new PNG({ width: SIDE, height: SIDE });
favicon.data.fill(0);
for (let y = 0; y < fh; y++) {
    for (let x = 0; x < fw; x++) {
        // Nearest-neighbour is fine going down from 166px to ~220px.
        const sx = Math.min(icon.width - 1, Math.floor(x / scale));
        const sy = Math.min(icon.height - 1, Math.floor(y / scale));
        const s = (icon.width * sy + sx) << 2;
        const d = (SIDE * (y + oy) + (x + ox)) << 2;
        favicon.data[d] = icon.data[s];
        favicon.data[d + 1] = icon.data[s + 1];
        favicon.data[d + 2] = icon.data[s + 2];
        favicon.data[d + 3] = icon.data[s + 3];
    }
}
writeFileSync('public/favicon.png', PNG.sync.write(favicon));
console.log(`public/favicon.png          ${SIDE}x${SIDE}`);

// ── 6. Report the wordmark's real colours ──────────────────────
// So the HTML wordmark beside the icon matches the printed one instead of
// approximating it. Sampled per half, because "IBima" and "Assist" are
// set in different colours.
const sampleBand = (x0, x1) => {
    const tally = new Map();
    for (let y = cutAt; y < mark.height; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (mark.width * y + x) << 2;
            if (mark.data[i + 3] < 200) continue;
            const key = `${mark.data[i] >> 4},${mark.data[i + 1] >> 4},${mark.data[i + 2] >> 4}`;
            tally.set(key, (tally.get(key) ?? 0) + 1);
        }
    }
    return [...tally.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([k, n]) => {
            const [r, g, b] = k.split(',').map((v) => (Number(v) << 4) | 8);
            return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')} (${n}px)`;
        });
};

const half = Math.floor(mark.width / 2);
console.log('\nwordmark colours:');
console.log(`  left  half ("IBima")  ${sampleBand(0, half).join('  ')}`);
console.log(`  right half ("Assist") ${sampleBand(half, mark.width).join('  ')}`);
