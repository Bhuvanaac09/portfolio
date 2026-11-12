import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { parseRouteFromHash, getPageTitle } from './utils/siteLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    parseRouteFromHash(window.location.hash)
  );

  // Sync route on hash change and back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseRouteFromHash(window.location.hash);
      setCurrentRoute(newRoute);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title dynamically based on active page
  useEffect(() => {
    document.title = getPageTitle(currentRoute);
  }, [currentRoute]);

  const handleNavigate = (route: PageRoute) => {
    window.location.hash = route === 'home' ? '' : `#${route}`;
    setCurrentRoute(route);
  };

  // Determine background color based on active page
  const isLightPage =
    currentRoute === 'blog' ||
    currentRoute === 'contact' ||
    currentRoute === 'sketchbook-journey' ||
    currentRoute === 'statforge-aiml';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isLightPage ? 'bg-[#faf6ea]' : 'bg-[#e5dec9]'
      }`}
    >
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      <main className="flex-grow w-full">
        {currentRoute === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentRoute === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentRoute === 'blog' && <BlogPage onNavigate={handleNavigate} />}
        {currentRoute === 'contact' && <ContactPage />}
        {currentRoute === 'sketchbook-journey' && (
          <BlogPostPage slug="sketchbook-journey" onNavigate={handleNavigate} />
        )}
        {currentRoute === 'statforge-aiml' && (
          <BlogPostPage slug="statforge-aiml" onNavigate={handleNavigate} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
      <CookieBanner />
    </div>
  );
}
