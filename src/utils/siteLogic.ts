import { PageRoute, ContactFormData, FormValidationResult } from '../types';
import { BLOG_POSTS, PROFILE } from '../data/siteData';

export function parseRouteFromHash(hash: string): PageRoute {
  const clean = hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase().trim();
  if (!clean || clean === 'home') return 'home';
  if (clean === 'about') return 'about';
  if (clean === 'blog') return 'blog';
  if (clean === 'contact') return 'contact';
  if (clean === 'sketchbook-journey') return 'sketchbook-journey';
  if (clean === 'statforge-aiml') return 'statforge-aiml';
  // backward compatibility for old slugs
  if (clean === 'impossible-city') return 'sketchbook-journey';
  if (clean === 'gifs-collection') return 'statforge-aiml';
  return 'home';
}

export function getPageTitle(route: PageRoute): string {
  switch (route) {
    case 'home':
      return `Home - ${PROFILE.shortName}`;
    case 'about':
      return `About - ${PROFILE.shortName}`;
    case 'blog':
      return `Showcase - ${PROFILE.shortName}`;
    case 'contact':
      return `Contact - ${PROFILE.shortName}`;
    case 'sketchbook-journey':
      return `My Sketchbook Journey - ${PROFILE.shortName}`;
    case 'statforge-aiml':
      return `StatForge & AIML Lab - ${PROFILE.shortName}`;
    default:
      return `Home - ${PROFILE.shortName}`;
  }
}

export function validateContactForm(data: ContactFormData): FormValidationResult {
  const errors: FormValidationResult['errors'] = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'This field is required.';
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'This field is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug) || null;
}
