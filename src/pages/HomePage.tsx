import React from 'react';
import { PageRoute } from '../types';
import { PROFILE } from '../data/siteData';
import { AnimeHeroScene } from '../components/AnimeHeroScene';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleExploreScroll = () => {
    const el = document.getElementById('home-content-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ===================== ANIMATED ANIME HERO SCENE ===================== */}
      <AnimeHeroScene
        onNavigate={onNavigate}
        onExploreClick={handleExploreScroll}
      />

      {/* ===================== ANIMATED SPRITES & BLOG PREVIEW ===================== */}
      <section
        id="home-content-section"
        className="w-full max-w-4xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center"
      >
        {/* Animated chicks & rabbit hopping */}
        <div className="w-full flex justify-center mb-8 select-none">
          <img
            src="/assets/IMG_0784.gif"
            alt="Animated pixel chicks hopping"
            className="w-48 sm:w-60 md:w-72 h-auto pixelated"
          />
        </div>

        {/* Floating vehicles and balloon sprite row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center mb-6 select-none">
          {/* Duck flying spaceship */}
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/VG967-site-2.png"
              alt="Pixel art duck saucer spaceship"
              className="w-44 sm:w-52 h-auto pixelated"
            />
          </div>

          {/* Bunny floating with bird balloon */}
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/VG969-site-1.gif"
              alt="Animated bunny flying with bird balloon"
              className="w-32 sm:w-40 h-auto pixelated"
            />
          </div>

          {/* Pig pulling fruit wagon */}
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/VG967-site.png"
              alt="Pixel art pig pulling fruit wagon"
              className="w-40 sm:w-48 h-auto pixelated"
            />
          </div>
        </div>

        {/* Blog Highlight Card */}
        <div className="text-center my-6">
          <h3 className="text-xl md:text-2xl font-bold text-[#7b1300] tracking-wide mb-1">
            Blog
          </h3>
          <p className="text-sm text-[#444] mb-2 font-normal">
            Short stories about sketching and python codes.
          </p>
          <button
            onClick={() => {
              onNavigate('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs md:text-sm text-[#7b1300] hover:underline font-medium cursor-pointer"
          >
            Read More
          </button>
        </div>
      </section>

      {/* ===================== BUNTING BANNER & ABOUT ME TEASER ===================== */}
      <section className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Bird holding celebratory party flags */}
        <div className="w-full flex justify-center mb-12 select-none">
          <img
            src="/assets/IMG_0711.gif"
            alt="Animated bird flying with bunting banner flags"
            className="w-56 sm:w-68 md:w-76 h-auto pixelated"
          />
        </div>

        {/* About Me Story & Circular Scene */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl">
          {/* Text Info */}
          <div className="flex flex-col text-left">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-[#7b1300] uppercase mb-4">
              ABOUT ME
            </h2>
            <p className="text-sm md:text-base text-[#404040] leading-relaxed mb-3">
              I'm an AIML student in my 2nd year at {PROFILE.university} ({PROFILE.campus}), and I love to sketch!
            </p>
            <p className="text-sm md:text-base text-[#404040] leading-relaxed">
              I can't even draw a single straight line without a reference photo, but I love learning and creating every day.
            </p>
          </div>

          {/* Circular Store Scene with Girl and Goose */}
          <div className="flex justify-center select-none">
            <img
              src="/assets/VG-site.gif"
              alt="Animated circular isometric store scenario with walking character"
              className="w-64 sm:w-72 md:w-80 h-auto pixelated rounded-full"
            />
          </div>
        </div>
      </section>

      {/* ===================== SAY HELLO & PARADE ===================== */}
      <section
        className="w-full py-20 px-6 flex flex-col items-center text-center bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/VG967-site-sayhell9-5-copiar.gif")',
          backgroundSize: 'contain',
        }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-[#7b1300] uppercase mb-3">
          SAY HELLO
        </h2>
        <p className="text-sm md:text-base text-[#444] mb-1">
          Find me everywhere as {PROFILE.instagramHandle}
        </p>
        <p className="text-xs md:text-sm text-[#666] mb-6">or</p>
        <button
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-2.5 bg-[#48796a] hover:bg-[#386356] text-white text-xs md:text-sm font-medium tracking-[0.22em] uppercase transition-all duration-200 shadow-sm hover:shadow cursor-pointer active:scale-95 mb-14"
        >
          CONTACT ME
        </button>

        {/* Animated Sprite Parade */}
        <div className="w-full max-w-2xl flex justify-center select-none">
          <img
            src="/assets/VG968-mini-site-2.gif"
            alt="Animated row of miniature pixel characters"
            className="w-64 sm:w-80 md:w-96 h-auto pixelated"
          />
        </div>
      </section>
    </div>
  );
};
