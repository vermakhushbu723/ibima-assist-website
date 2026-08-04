import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { PageTransition, ScrollProgress } from './components/ui/Motion';
import HomePage from './pages/HomePage';

// The home page ships in the main bundle since it's the usual entry
// point; every other route is split out so the first paint stays small.
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Placeholder shown while a route chunk loads. Sized to the dark hero
// so the navbar doesn't flash from light to dark and back.
const RouteFallback = () => (
    <div className="surface-deep min-h-[70vh]" aria-busy="true" aria-label="Loading" />
);

const App = () => (
    <div className="flex min-h-screen flex-col bg-white">
        <ScrollToTop />
        <ScrollProgress />
        <Navbar />

        <main className="flex-1">
            <Suspense fallback={<RouteFallback />}>
                <PageTransition>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/solutions" element={<SolutionsPage />} />
                        <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
                        <Route path="/why-us" element={<WhyUsPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/faqs" element={<FaqPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </PageTransition>
            </Suspense>
        </main>

        <Footer />
    </div>
);

export default App;
