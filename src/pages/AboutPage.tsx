import React from 'react';
import { PageRoute } from '../types';
import { PROFILE } from '../data/siteData';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Banner with Isometric City Art (Original Layout) */}
      <section className="relative w-full max-w-5xl mx-auto px-6 pt-4 pb-12 flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-6">
          <div className="w-36 sm:w-48 md:w-64 select-none">
            <img
              src="/assets/VG967-site-aboutme-contact-copiar.png"
              alt="Pixel art cityscape"
              className="w-full h-auto pixelated object-contain"
            />
          </div>
          <div className="pt-8 sm:pt-12 text-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-[#7b1300] uppercase">
              ABOUT ME
            </h1>
          </div>
        </div>

        {/* Floating duck plane and walking sprite */}
        <div className="w-full max-w-3xl flex justify-around items-center my-6 select-none">
          <img
            src="/assets/VGsite-hi.gif"
            alt="Pixel character walking"
            className="w-16 sm:w-20 md:w-24 h-auto pixelated"
          />
          <img
            src="/assets/VG967-site-hi-copiar.png"
            alt="Little bird in plane and flower"
            className="w-32 sm:w-44 md:w-56 h-auto pixelated"
          />
        </div>
      </section>

      {/* Hi / Bio Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-8 text-left md:text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#7b1300] tracking-wider mb-6">
          HI
        </h2>
        <div className="space-y-4 text-sm md:text-base text-[#404040] leading-relaxed">
          <p className="font-medium text-[#7b1300]">
            My name is {PROFILE.name}.
          </p>
          <p>
            I'm an Artificial Intelligence and Machine Learning (AIML) student currently in my 2nd year at {PROFILE.university} living in Bangalore ({PROFILE.campus}).
          </p>
          <p>
            My hobby is to sketch around anything. I honestly can't even draw a single line without a reference photo right in front of me, but I'm still learning and practicing every day!
          </p>
          <p>
            A charming, happy world where all my sketches, Python codes, and creative experiments live happily.
          </p>
        </div>
      </section>

      {/* My Style Section (Original framed animated artwork) */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Style Description */}
        <div className="flex flex-col text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-[0.18em] text-[#7b1300] uppercase mb-6">
            MY STYLE
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[#404040] leading-relaxed">
            <p>Pixelated, isometric with a short colour palette.</p>
            <p>It takes over my Instagram, and my days.</p>
            <p>It can be animated, embroidered and more.</p>
            <p>All the files are created by me using my own illustrations, sketches, and Python codes.</p>
          </div>
        </div>

        {/* Rohan's Animated Pixel Art Avatar (PFP) */}
        <div className="flex flex-col items-center justify-center select-none">
          <img
            src="/assets/rohan-avatar.gif"
            alt="Chyavan Rohan Tammera - Animated pixel art avatar in traditional sherwani"
            className="w-64 sm:w-72 md:w-80 h-auto aspect-square object-cover pixelated rounded-2xl border-4 border-[#cfc4a6] shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          />
          <span className="text-[11px] font-mono tracking-wider text-[#7b1300] uppercase mt-3">
            @rockz_ntg • Pixel Avatar
          </span>
        </div>
      </section>

      {/* Find Me Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#7b1300] uppercase mb-6">
          FIND ME
        </h2>
        <div className="space-y-4 text-sm md:text-base text-[#404040] leading-relaxed mb-8">
          <p>
            I share my sketches and learning journey on Instagram, where you can also catch a glimpse of my daily work in my stories.
          </p>
          <p>
            For a more organized view of my technical projects, check out my GitHub profile and connect on LinkedIn.
          </p>
        </div>
        <button
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-2.5 bg-[#48796a] hover:bg-[#386356] text-white text-xs md:text-sm font-medium tracking-[0.22em] uppercase transition-all duration-200 shadow-sm hover:shadow cursor-pointer active:scale-95"
        >
          GET IN TOUCH
        </button>
      </section>
    </div>
  );
};
