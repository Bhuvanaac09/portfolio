export type PageRoute = 'home' | 'about' | 'blog' | 'contact' | 'sketchbook-journey' | 'statforge-aiml';

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  image: string;
  paragraphs: string[];
  repos?: GithubRepo[];
  prevSlug: string | null;
  nextSlug: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  postUrl: string;
  title: string;
  caption: string;
  dateSigned?: string;
  category?: string;
  isReel?: boolean;
  actualLikes?: number;
  actualComments?: number;
}

