import React from 'react';
import { PageRoute } from '../types';
import { getPostBySlug } from '../utils/siteLogic';
import { PROFILE, SOCIAL_LINKS, INSTAGRAM_SKETCHES } from '../data/siteData';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#7b1300] mb-4">Post not found</h1>
        <button
          onClick={() => onNavigate('blog')}
          className="text-[#7b1300] hover:underline cursor-pointer"
        >
          &larr; Back to Blog
        </button>
      </div>
    );
  }

  const handleNavigatePost = (targetSlug: string) => {
    onNavigate(targetSlug as PageRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-6 py-10 flex flex-col items-center">
      {/* Category / Main Header */}
      <div className="w-full text-left mb-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-[#7b1300] tracking-wide">
          {post.title}
        </h1>
      </div>

      {/* Center Subtitle & Narrative */}
      <div className="w-full max-w-2xl mx-auto text-center my-6">
        <h2 className="text-3xl sm:text-4xl font-normal text-[#7b1300] mb-6">
          {post.subtitle}
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-[#404040] leading-relaxed text-left sm:text-center">
          {post.paragraphs.map((p, idx) => {
            if (p.includes('@rockz_ntg')) {
              const parts = p.split('@rockz_ntg');
              return (
                <p key={idx}>
                  {parts[0]}
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#7b1300] hover:text-[#520d00] font-semibold"
                  >
                    @rockz_ntg
                  </a>
                  {parts[1]}
                </p>
              );
            }
            if (p.includes('StatForge')) {
              const parts = p.split('StatForge');
              return (
                <p key={idx}>
                  {parts[0]}
                  <span className="font-semibold text-[#7b1300]">StatForge</span>
                  {parts[1]}
                </p>
              );
            }
            return <p key={idx}>{p}</p>;
          })}
        </div>
      </div>

      {/* Main Feature Art (Sketchbook or Technical) */}
      <div className="w-full max-w-2xl mx-auto my-8 select-none flex flex-col items-center">
        <div className="w-full rounded-lg overflow-hidden border-2 border-[#cfc4a6] shadow-sm bg-[#ede5d2]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto pixelated object-contain"
          />
        </div>
        {post.id === 'sketchbook-journey' && (
          <p className="text-xs text-[#777] italic mt-2.5 text-center">
            Hand-drawn anime pencil studies & reference sketches from Instagram{' '}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7b1300] font-semibold hover:underline"
            >
              @rockz_ntg
            </a>
          </p>
        )}
      </div>

      {/* Featured 12 Instagram Sketch Posts Grid */}
      {post.id === 'sketchbook-journey' && (
        <section className="w-full max-w-4xl my-6">
          <div className="border-t border-b border-[#cfc4a6] py-10 my-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ede4d1] rounded-full text-xs font-semibold text-[#7b1300] uppercase tracking-widest mb-2 border border-[#cfc4a6]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram Feed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-[0.12em] text-[#7b1300] uppercase mb-2">
                12 LATEST SKETCH POSTS
              </h3>
              <p className="text-xs sm:text-sm text-[#555] max-w-lg mx-auto">
                Directly from{' '}
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7b1300] font-bold underline hover:text-[#520d00]"
                >
                  @rockz_ntg
                </a>
                . Click on any sketch to view the original post, live comments, and likes on Instagram!
              </p>
            </div>

            {/* 12-Item Instagram Post Grid (3 columns desktop, 2 columns mobile) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {INSTAGRAM_SKETCHES.map((item, index) => (
                <a
                  key={item.id}
                  href={item.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${item.title} - View live post, likes & comments on Instagram @rockz_ntg`}
                  className="group relative block aspect-square rounded-xl overflow-hidden border border-[#cfc4a6] bg-[#f0eada] shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Sketch Post Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Post Index Badge */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[#23282d]/75 text-white text-[10px] font-mono rounded backdrop-blur-xs flex items-center gap-1.5">
                    <span>#{String(index + 1).padStart(2, '0')}</span>
                    {item.dateSigned && (
                      <span className="text-white/70 border-l border-white/30 pl-1 text-[9px]">
                        {item.dateSigned}
                      </span>
                    )}
                  </div>

                  {/* Instagram / Reel Corner Icon */}
                  <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#23282d]/75 flex items-center justify-center text-white text-xs backdrop-blur-xs group-hover:bg-[#b9603e] transition-colors">
                    {item.isReel ? (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm6 2.5 6 3.5-6 3.5v-7z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                  </div>

                  {/* Clean Hover Overlay with Real Info & Direct Instagram Action */}
                  <div className="absolute inset-0 bg-[#1e2328]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white z-20">
                    <div>
                      <div className="text-[10px] font-semibold text-[#f7b2bd] tracking-wider uppercase mb-1">
                        {item.category || 'Pen & Ink Sketch'}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] leading-snug line-clamp-3 text-[#e6ded0] font-normal">
                        {item.caption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/20">
                      {typeof item.actualLikes === 'number' && typeof item.actualComments === 'number' ? (
                        <div className="flex items-center gap-3 text-xs font-semibold text-[#f7b2bd] mb-1.5">
                          <span>❤️ {item.actualLikes}</span>
                          <span>💬 {item.actualComments}</span>
                        </div>
                      ) : null}
                      <div className="inline-flex items-center justify-between w-full text-[10px] font-semibold tracking-wider uppercase text-[#f7b2bd] group-hover:text-white transition-colors">
                        <span>View on Instagram</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Call-to-Action to Instagram Profile */}
            <div className="text-center mt-8 pt-6 border-t border-[#dfd6be]">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#b9603e] hover:bg-[#a14f30] text-white text-xs md:text-sm font-semibold tracking-[0.16em] uppercase rounded-lg transition-all duration-200 shadow hover:shadow-md cursor-pointer active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>View More & Follow @rockz_ntg on Instagram</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Featured GitHub Repositories for technical post */}
      {post.repos && post.repos.length > 0 && (
        <section className="w-full max-w-3xl my-8">
          <div className="border-t border-b border-[#cfc4a6] py-8 my-6">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#7b1300] uppercase mb-1">
                FEATURED GITHUB REPOSITORIES
              </h3>
              <p className="text-xs sm:text-sm text-[#555]">
                Direct links to open-source code and university projects on{' '}
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7b1300] underline font-medium hover:text-[#520d00]"
                >
                  github.com/{PROFILE.githubUrl.split('/').pop()}
                </a>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.repos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-4 bg-[#f0eada] hover:bg-[#e8e0cd] border border-[#cfc4a6] rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#7b1300] group-hover:underline">
                        {repo.name}
                      </span>
                      <svg
                        className="w-4 h-4 text-[#7b1300] opacity-70 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed mb-4">
                      {repo.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#48796a] font-medium pt-2 border-t border-[#cfc4a6]/40">
                    <span>{repo.language}</span>
                    <span className="text-xs text-[#7b1300] group-hover:translate-x-0.5 transition-transform">
                      View Code &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation between posts */}
      <div className="w-full max-w-3xl flex justify-between items-center pt-8 border-t border-[#cfc5aa] text-sm text-[#7b1300]">
        <div>
          {post.prevSlug ? (
            <button
              onClick={() => handleNavigatePost(post.prevSlug!)}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              &larr; Previous Post
            </button>
          ) : (
            <button
              onClick={() => handleNavigatePost('statforge-aiml')}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              &larr; Previous Post
            </button>
          )}
        </div>

        <div>
          {post.nextSlug ? (
            <button
              onClick={() => handleNavigatePost(post.nextSlug!)}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              Next Post &rarr;
            </button>
          ) : (
            <button
              onClick={() => handleNavigatePost('sketchbook-journey')}
              className="hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              Next Post &rarr;
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
