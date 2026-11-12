import React, { useState } from 'react';
import { PageRoute } from '../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: 'HOME', route: 'home' },
    { label: 'ABOUT', route: 'about' },
    { label: 'BLOG', route: 'blog' },
    { label: 'CONTACT', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (route: PageRoute) => {
    if (route === 'blog' && (currentRoute === 'sketchbook-journey' || currentRoute === 'statforge-aiml')) {
      return true;
    }
    return currentRoute === route;
  };

  const isHomePage = currentRoute === 'home';

  return (
    <header className={`${isHomePage ? 'absolute top-0 right-0 z-40 pointer-events-none' : 'relative'} w-full z-40`}>
      <div className={`max-w-6xl mx-auto px-6 ${isHomePage ? 'py-3 sm:py-4' : 'py-6 md:py-8'} flex justify-end items-center`}>
        {/* Desktop Navigation Links (hidden on home page because they are integrated into the hero illustration) */}
        {!isHomePage && (
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium tracking-[0.12em] pointer-events-auto"
          >
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`transition-colors uppercase duration-200 cursor-pointer ${
                    active
                      ? 'text-[#2c541d] font-semibold'
                      : 'text-[#404040] hover:text-[#7b1300]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        )}

        {/* Mobile Hamburger Button (always available for phone/tablet screens) */}
        <div className="md:hidden pointer-events-auto">
          <button
            type="button"
            aria-label="Main menu toggle"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 bg-[#74a84a] hover:bg-[#60913a] text-white flex flex-col justify-center items-center gap-1.5 rounded p-2 transition-colors cursor-pointer shadow-sm"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-transform duration-200 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ded7c2] border-t border-[#cbbf9f] shadow-lg px-6 py-4 transition-all">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-3">
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`text-base py-2 uppercase font-medium tracking-wider transition-colors ${
                    active ? 'text-[#2c541d] font-bold' : 'text-[#404040] hover:text-[#7b1300]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
