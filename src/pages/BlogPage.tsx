import React from 'react';
import { PageRoute } from '../types';
import { BLOG_POSTS } from '../data/siteData';

interface BlogPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
      <div className="w-full space-y-16">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="w-full flex flex-col items-center pb-12 border-b border-[#cfc5aa] last:border-b-0"
          >
            {/* Animated Illustration (Original Vero Gobet Artwork) */}
            <div
              onClick={() => {
                onNavigate(post.slug as PageRoute);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full max-w-xl cursor-pointer select-none mb-6 group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto pixelated object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>

            {/* Post Title & Read More Link */}
            <div className="w-full max-w-xl text-left">
              <h2
                onClick={() => {
                  onNavigate(post.slug as PageRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-2xl sm:text-3xl font-medium text-[#7b1300] tracking-wide mb-3 cursor-pointer hover:underline"
              >
                {post.title}
              </h2>
              <button
                onClick={() => {
                  onNavigate(post.slug as PageRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm font-medium text-[#7b1300] hover:underline cursor-pointer"
              >
                Read More &raquo;
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
