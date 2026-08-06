// Walks the built site and reports, per page, every <section> and how
// many photographs it contains — so "no section without an image" is a
// checked fact rather than a claim.
//
//   npm run build && node scripts/image-coverage.mjs
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

// Runs in the page.
const collect = () =>
    [...document.querySelectorAll('main section')].map((sec, i) => {
        const heading = sec.querySelector('h1, h2, h3');
        const eyebrow = sec.querySelector('span[class*="uppercase"]');
        return {
            index: i + 1,
            label: (eyebrow?.textContent || heading?.textContent || '(no heading)').trim().slice(0, 46),
            images: sec.querySelectorAll('img').length,
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

    let bare = 0;
    let total = 0;

    try {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (r) => (/images\.unsplash|fonts\.g/.test(r.url()) ? r.abort() : r.continue()));
        await page.setViewport({ width: 1440, height: 900 });

        for (const route of ROUTES) {
            await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await new Promise((r) => setTimeout(r, 260));

            const sections = await page.evaluate(collect);
            console.log(`\n${route}`);
            for (const s of sections) {
                total += 1;
                const flag = s.images === 0 ? 'NO IMAGE' : `${String(s.images).padStart(2)} img`;
                if (s.images === 0) bare += 1;
                console.log(`   ${flag}  ${s.label}`);
            }
        }
    } finally {
        await browser.close();
        server.close();
    }

    console.log(
        bare === 0
            ? `\nAll ${total} sections across ${ROUTES.length} pages carry imagery.`
            : `\n${bare} of ${total} sections have no image.`,
    );
    process.exit(bare === 0 ? 0 : 1);
};

main();
