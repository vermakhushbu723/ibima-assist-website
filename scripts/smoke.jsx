// Renders every page and layout component to a string so any runtime
// error (bad import, undefined data key, invalid hook usage) fails
// loudly here instead of only surfacing in a browser.
//
//   npm run smoke
//
// Pages are imported directly rather than through <App />, because
// React.lazy() routes would only render the Suspense fallback.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Routes, StaticRouter } from 'react-router';
import Navbar from '../src/components/layout/Navbar.jsx';
import Footer from '../src/components/layout/Footer.jsx';
import HomePage from '../src/pages/HomePage.jsx';
import AboutPage from '../src/pages/AboutPage.jsx';
import SolutionsPage from '../src/pages/SolutionsPage.jsx';
import SolutionDetailPage from '../src/pages/SolutionDetailPage.jsx';
import WhyUsPage from '../src/pages/WhyUsPage.jsx';
import TeamPage from '../src/pages/TeamPage.jsx';
import FaqPage from '../src/pages/FaqPage.jsx';
import ContactPage from '../src/pages/ContactPage.jsx';
import NotFoundPage from '../src/pages/NotFoundPage.jsx';
import { SOLUTIONS } from '../src/data/solutions.js';

// `path` is the route pattern the component is mounted under, so
// useParams() resolves the same way it does in the real app.
const CASES = [
    { name: 'Navbar', at: '/', Component: Navbar },
    { name: 'Footer', at: '/', Component: Footer },
    { name: 'HomePage', at: '/', Component: HomePage },
    { name: 'AboutPage', at: '/about', Component: AboutPage },
    { name: 'SolutionsPage', at: '/solutions', Component: SolutionsPage },
    { name: 'WhyUsPage', at: '/why-us', Component: WhyUsPage },
    { name: 'TeamPage', at: '/team', Component: TeamPage },
    { name: 'FaqPage', at: '/faqs', Component: FaqPage },
    { name: 'ContactPage', at: '/contact', Component: ContactPage },
    { name: 'NotFoundPage', at: '/nope', Component: NotFoundPage },
    // Every solution detail page, mounted on the real :slug pattern.
    ...SOLUTIONS.map((s) => ({
        name: `SolutionDetail:${s.slug}`,
        at: `/solutions/${s.slug}`,
        path: '/solutions/:slug',
        Component: SolutionDetailPage,
    })),
    // An unknown slug is expected to redirect, so it renders nothing.
    {
        name: 'SolutionDetail:unknown-slug',
        at: '/solutions/unknown-slug',
        path: '/solutions/:slug',
        Component: SolutionDetailPage,
        expectEmpty: true,
    },
];

let failed = 0;

for (const { name, at, path, Component, expectEmpty } of CASES) {
    try {
        const tree = path ? (
            <Routes>
                <Route path={path} element={<Component />} />
            </Routes>
        ) : (
            <Component />
        );

        // No ConfigProvider here on purpose — antd is scoped inside the
        // components that use it (see src/theme/AntdScope.jsx), so
        // rendering without one is exactly what the real app does.
        const html = renderToString(<StaticRouter location={at}>{tree}</StaticRouter>);

        if (expectEmpty) {
            if (html.length > 40) throw new Error('expected a redirect, but markup was rendered');
            console.log(`  ok   ${name.padEnd(38)} redirected`);
            continue;
        }

        if (!html || html.length < 40) {
            throw new Error(`rendered suspiciously little markup (${html.length} chars)`);
        }
        console.log(`  ok   ${name.padEnd(38)} ${String(html.length).padStart(7)} chars`);
    } catch (err) {
        failed += 1;
        console.error(`  FAIL ${name}\n       ${err.stack}\n`);
    }
}

console.log(
    failed === 0
        ? `\nAll ${CASES.length} components rendered cleanly.`
        : `\n${failed} of ${CASES.length} failed.`,
);
process.exit(failed === 0 ? 0 : 1);
