// Prints, per page and per section, exactly which photograph is being
// used and what its alt text says it shows. This is the report you read
// to check that an image MATCHES its section — audit:images only proves
// a section has one at all.
//
// It also flags the same photograph appearing twice on one page, which
// is what makes a page feel repetitive even when every section is
// technically covered.
//
//   npm run build && node scripts/image-map-report.mjs
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

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };

const serve = (root) =>
    new Promise((resolve) => {
        const server = createServer(async (req, res) => {
            const p = join(root, normalize(decodeURIComponent(req.url.split('?')[0])));
            const target = existsSync(p) && extname(p) ? p : join(root, 'index.html');
            try {
                res.writeHead(200, { 'Content-Type': MIME[extname(target)] ?? 'application/octet-stream' });
                res.end(await readFile(target));
            } catch {
                res.writeHead(404).end('not found');
            }
        });
        server.listen(0, '127.0.0.1', () => resolve(server));
    });

const collect = () =>
    [...document.querySelectorAll('main section')].map((sec, i) => {
        const heading = sec.querySelector('h1, h2, h3');
        const eyebrow = sec.querySelector('span[class*="uppercase"]');
        const images = [...sec.querySelectorAll('img')].map((im) => {
            // A hero backdrop sits inside an aria-hidden wrapper at ~15%
            // opacity — it's a texture, not the picture that tells you what
            // the section is about. Tracked, but not counted as the
            // section's own image when looking for repeats.
            const backdrop = !!im.closest('[aria-hidden="true"]');
            return {
                id: (im.currentSrc || im.src).match(/photo-[0-9a-f]+/)?.[0] ?? '(none)',
                alt: im.alt || '(decorative)',
                backdrop,
            };
        });
        return {
            index: i + 1,
            label: (eyebrow?.textContent || heading?.textContent || '(no heading)').trim().slice(0, 44),
            images,
        };
    });

const main = async () => {
    const executablePath = BROWSERS.find((p) => existsSync(p));
    if (!executablePath) {
        console.error('No Chrome or Edge found.');
        process.exit(1);
    }

    const server = await serve(join(process.cwd(), 'dist'));
    const { port } = server.address();
    const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox'] });

    const repeats = [];

    try {
        const page = await browser.newPage();
        // Let the real image requests through — we need currentSrc.
        await page.setViewport({ width: 1440, height: 900 });

        for (const route of ROUTES) {
            await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle2' });
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await new Promise((r) => setTimeout(r, 900));
            await page.evaluate(() => window.scrollTo(0, 0));
            await new Promise((r) => setTimeout(r, 300));

            const sections = await page.evaluate(collect);
            console.log(`\n══ ${route}`);

            // Which photo IDs back a *section banner* (the first image in a
            // section) — those are the ones a repeat is jarring for.
            const banners = new Map();

            for (const s of sections) {
                const unique = [...new Map(s.images.map((im) => [im.id, im])).values()];
                console.log(`  § ${s.label}`);
                for (const im of unique) {
                    console.log(`      ${im.backdrop ? '~' : ' '} ${im.id.padEnd(20)} ${im.alt}`);
                }

                const lead = unique.find((im) => !im.backdrop)?.id;
                if (lead && lead !== '(none)') {
                    if (banners.has(lead)) {
                        repeats.push(`${route}: "${banners.get(lead)}" and "${s.label}" both lead with ${lead}`);
                    } else {
                        banners.set(lead, s.label);
                    }
                }
            }
        }
    } finally {
        await browser.close();
        server.close();
    }

    if (repeats.length) {
        console.log('\n── Same photo leading two sections on one page ──');
        for (const r of repeats) console.log(`  ! ${r}`);
    } else {
        console.log('\nNo photograph leads two sections on the same page.');
    }
};

main();
