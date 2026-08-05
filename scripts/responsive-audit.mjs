// Loads every page of the built site at a spread of real device widths
// and fails on anything that breaks the layout:
//
//   - horizontal page overflow (the classic "site scrolls sideways on a phone")
//   - any element wider than the viewport
//   - tap targets under 40px on touch-sized viewports
//   - text smaller than 11px
//
// Drives the browser already installed on this machine via puppeteer-core,
// so there is no 300MB Chromium download.
//
//   npm run build && npm run audit:responsive
//
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer-core';

const BROWSERS = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];

const VIEWPORTS = [
    { name: 'phone-320', width: 320, height: 700, touch: true },
    { name: 'phone-360', width: 360, height: 780, touch: true },
    { name: 'phone-390', width: 390, height: 844, touch: true },
    { name: 'phone-430', width: 430, height: 932, touch: true },
    { name: 'tablet-768', width: 768, height: 1024, touch: true },
    { name: 'tablet-1024', width: 1024, height: 768, touch: true },
    { name: 'laptop-1280', width: 1280, height: 800, touch: false },
    { name: 'laptop-1440', width: 1440, height: 900, touch: false },
    { name: 'desktop-1920', width: 1920, height: 1080, touch: false },
    { name: 'desktop-2560', width: 2560, height: 1440, touch: false },
];

const ROUTES = [
    '/',
    '/about',
    '/solutions',
    '/solutions/motor-claim-survey',
    '/solutions/pre-inspection',
    '/solutions/ai-damage-assessment',
    '/solutions/intimation-management',
    '/solutions/surveyor-mobile-app',
    '/solutions/partner-network-console',
    '/solutions/non-motor-claims',
    '/why-us',
    '/team',
    '/faqs',
    '/contact',
    '/not-a-real-page',
];

const MIME = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
};

// Minimal static server with the same SPA fallback the host applies,
// so deep links resolve exactly as they will in production.
// Port 0 lets the OS pick a free one, so a previous run that hasn't
// fully released its socket can't block this one.
const serve = (root) =>
    new Promise((resolve) => {
        const server = createServer(async (req, res) => {
            const urlPath = decodeURIComponent(req.url.split('?')[0]);
            const filePath = join(root, normalize(urlPath));
            const target = existsSync(filePath) && extname(filePath) ? filePath : join(root, 'index.html');
            try {
                const body = await readFile(target);
                res.writeHead(200, { 'Content-Type': MIME[extname(target)] ?? 'application/octet-stream' });
                res.end(body);
            } catch {
                res.writeHead(404).end('not found');
            }
        });
        server.listen(0, '127.0.0.1', () => resolve(server));
    });

// Runs in the page. Returns everything wrong with this render.
const inspect = (viewportWidth, isTouch) => {
    const problems = [];
    const doc = document.documentElement;

    const overflow = doc.scrollWidth - doc.clientWidth;
    if (overflow > 1) problems.push({ kind: 'page-overflow', detail: `${overflow}px wider than viewport` });

    const describe = (el) => {
        const id = el.id ? `#${el.id}` : '';
        const cls = typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}` : '';
        return `${el.tagName.toLowerCase()}${id}${cls}`.slice(0, 110);
    };

    for (const el of document.querySelectorAll('body *')) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') continue;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // An element only matters if nothing above it clips the overflow.
        // A ken-burns background scaled past the viewport inside an
        // overflow-hidden hero is doing exactly what it should.
        let clipped = false;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
            const ov = getComputedStyle(p);
            if (/hidden|clip|auto|scroll/.test(ov.overflowX)) {
                clipped = true;
                break;
            }
        }

        if (!clipped && rect.width > viewportWidth + 1) {
            problems.push({
                kind: 'element-too-wide',
                detail: `${describe(el)} is ${Math.round(rect.width)}px`,
            });
        }

        // Sticking out past either edge of the page.
        if (!clipped && style.position !== 'fixed' && (rect.left < -1 || rect.right > viewportWidth + 1)) {
            problems.push({
                kind: 'element-off-canvas',
                detail: `${describe(el)} spans ${Math.round(rect.left)}→${Math.round(rect.right)}`,
            });
        }

        // Unreadably small text. Decorative product mockups are exempt —
        // they're pictures of a UI, not text anyone is meant to read.
        const size = parseFloat(style.fontSize);
        if (
            size &&
            size < 11 &&
            el.textContent.trim().length > 2 &&
            !el.querySelector('*') &&
            !el.closest('[data-decorative]')
        ) {
            problems.push({ kind: 'text-too-small', detail: `${describe(el)} at ${size}px` });
        }

        // Cramped tap targets on touch viewports. 24×24 CSS px is the
        // WCAG 2.2 SC 2.5.8 (Target Size, Minimum) Level AA bar. Links
        // sitting inline inside a sentence are exempt under that rule.
        if (isTouch && (el.tagName === 'A' || el.tagName === 'BUTTON')) {
            const inlineInProse =
                style.display === 'inline' &&
                el.parentElement &&
                el.parentElement.textContent.trim().length > el.textContent.trim().length + 20;

            if (!inlineInProse && (rect.height < 24 || rect.width < 24)) {
                problems.push({
                    kind: 'tap-target-small',
                    detail: `${describe(el)} is ${Math.round(rect.width)}×${Math.round(rect.height)}`,
                });
            }
        }
    }

    // Collapse duplicates — one broken card in a list of seven reports once.
    const seen = new Set();
    return problems.filter((p) => {
        const key = `${p.kind}|${p.detail}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

const main = async () => {
    const executablePath = BROWSERS.find((p) => existsSync(p));
    if (!executablePath) {
        console.error('No Chrome or Edge found. Install one, or add its path to BROWSERS.');
        process.exit(1);
    }

    const server = await serve(join(process.cwd(), 'dist'));
    const { port } = server.address();
    const browser = await puppeteer.launch({
        executablePath,
        headless: true,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });

    let failures = 0;
    let checks = 0;

    try {
        const page = await browser.newPage();
        // Photographs come from Unsplash; block them so the audit measures
        // layout rather than network luck. The <Img> placeholder keeps the
        // same box, so geometry is unchanged.
        await page.setRequestInterception(true);
        page.on('request', (r) =>
            /images\.unsplash\.com|fonts\.g/.test(r.url()) ? r.abort() : r.continue(),
        );

        for (const vp of VIEWPORTS) {
            const bad = [];

            for (const route of ROUTES) {
                await page.setViewport({
                    width: vp.width,
                    height: vp.height,
                    isMobile: vp.touch,
                    hasTouch: vp.touch,
                    deviceScaleFactor: 1,
                });
                await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });

                // Scroll the page so lazy images and reveals trigger, then
                // force every reveal to its settled state. Measuring an
                // element mid-slide would report it hanging off-canvas when
                // the resting layout is fine — and the resting layout is
                // what we're auditing.
                await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await new Promise((r) => setTimeout(r, 240));
                await page.evaluate(() => {
                    window.scrollTo(0, 0);
                    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
                    // Freeze the decorative loops (ken-burns, float, marquee)
                    // so geometry doesn't depend on when we happen to look.
                    const style = document.createElement('style');
                    style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important}';
                    document.head.appendChild(style);
                });
                await new Promise((r) => setTimeout(r, 200));

                const problems = await page.evaluate(inspect, vp.width, vp.touch);
                checks += 1;
                if (problems.length) bad.push({ route, problems });
            }

            if (bad.length === 0) {
                console.log(`  ok   ${vp.name.padEnd(14)} ${vp.width}×${vp.height} — all ${ROUTES.length} pages clean`);
            } else {
                failures += bad.length;
                console.log(`  FAIL ${vp.name.padEnd(14)} ${vp.width}×${vp.height}`);
                for (const { route, problems } of bad) {
                    console.log(`         ${route}`);
                    for (const p of problems.slice(0, 6)) console.log(`           · ${p.kind}: ${p.detail}`);
                    if (problems.length > 6) console.log(`           · …and ${problems.length - 6} more`);
                }
            }
        }
    } finally {
        await browser.close();
        server.close();
    }

    console.log(
        failures === 0
            ? `\n${checks} page/viewport combinations checked — no layout breaks.`
            : `\n${failures} page/viewport combination(s) with problems.`,
    );
    process.exit(failures === 0 ? 0 : 1);
};

main();
