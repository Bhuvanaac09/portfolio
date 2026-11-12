import { BlogPost, GithubRepo, InstagramPost } from '../types';

export const PROFILE = {
  name: 'Chyavan Rohan Tammera',
  shortName: 'Chyavan Rohan',
  role: 'AIML Student & Sketcher',
  university: 'JAIN University',
  campus: 'Kanakapura, Bangalore',
  year: '2nd Year',
  bio: "I'm a 2nd year Artificial Intelligence and Machine Learning student at JAIN University in Bangalore (Kanakapura campus). Beyond code and models, my favorite hobby is to sketch around anything. I honestly can't even draw a single line without a reference, but I love the process and I'm learning every day!",
  quote: "Turning machine learning models into code and references into sketches.",
  email: 'chyavanrohan@gmail.com',
  avatar: '/assets/rohan-avatar.gif',
  instagramHandle: '@rockz_ntg',
  instagramUrl: 'https://www.instagram.com/rockz_ntg/',
  githubUrl: 'https://github.com/chyavanrohan',
  linkedinUrl: 'https://www.linkedin.com/in/chyavan-rohan-tammera-320674381/'
};

export const GITHUB_REPOS: GithubRepo[] = [
  {
    name: 'StatForge',
    description: 'Statistics & Probability Experiential Learning platform featuring interactive visual experiments and probability distributions.',
    language: 'TypeScript',
    url: 'https://github.com/chyavanrohan/StatForge'
  },
  {
    name: 'python-codes',
    description: 'Core repository containing Python scripts, exploratory notebooks, AIML algorithms, and data analysis exercises.',
    language: 'Python',
    url: 'https://github.com/chyavanrohan/python-codes'
  },
  {
    name: 'JAIN-orientation',
    description: 'Interactive web guide introducing JAIN University campus life and academics from a student perspective.',
    language: 'TypeScript',
    url: 'https://github.com/chyavanrohan/JAIN-orientation'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sketchbook-journey',
    slug: 'sketchbook-journey',
    title: 'My Sketchbook Journey & Drawing Studies',
    subtitle: 'Learning to sketch one reference at a time',
    category: 'Art & Sketches',
    excerpt: 'Hand-drawn ink studies, shonen anime portraits, divine figures, and dark fantasy art directly from @rockz_ntg.',
    image: '/assets/insta-posts/user-posts-banner.png',
    paragraphs: [
      "Here is an honest confession: I can't even draw a single straight line without a reference photo in front of me! But sketching has become my favorite creative sanctuary.",
      "I love picking reference stills, anime scenes, and random objects around me, breaking them down into intense ink portraits and pencil studies.",
      "Every piece you see on my Instagram (@rockz_ntg) is a marker of my learning curve. It's about patience, observing details, and enjoying the craft every day."
    ],
    prevSlug: null,
    nextSlug: 'statforge-aiml'
  },
  {
    id: 'statforge-aiml',
    slug: 'statforge-aiml',
    title: 'Python Codes & AIML Lab: University Projects',
    subtitle: 'Exploring statistics, probability, and machine learning',
    category: 'Engineering & Code',
    excerpt: 'Hands-on projects from my 2nd year AIML curriculum at JAIN University, from probability simulation to Python data models.',
    image: '/assets/IMG_1379.gif',
    paragraphs: [
      "As a second-year AIML student at JAIN University (Kanakapura, Bangalore), understanding the mathematical bedrock of probability and statistics is essential before building complex neural architectures.",
      "That is why I created StatForge—an experiential interactive learning environment dedicated to statistical intuition, probability simulations, and data visualization.",
      "Alongside StatForge, my GitHub repository python-codes tracks my continuous laboratory work with NumPy, Pandas, algorithmic problems, and machine learning models."
    ],
    repos: GITHUB_REPOS,
    prevSlug: 'sketchbook-journey',
    nextSlug: null
  }
];

export const SOCIAL_LINKS = {
  instagram: PROFILE.instagramUrl,
  github: PROFILE.githubUrl,
  linkedin: PROFILE.linkedinUrl,
  email: PROFILE.email
};

export const INSTAGRAM_SKETCHES: InstagramPost[] = [
  {
    id: 'user-post-01',
    imageUrl: '/assets/insta-posts/user-post-01.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Asta (Black Clover)',
    caption: 'Asta in Black Anti-Magic form raising the giant Demon-Slayer Sword with surging dark aura and devil wing',
    dateSigned: '7/11/24',
    category: 'Black Clover • Anime Ink Study'
  },
  {
    id: 'user-post-02',
    imageUrl: '/assets/insta-posts/user-post-02.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Cristiano Ronaldo (CR7)',
    caption: 'Intricate cross-hatching and scribbled ink portrait of CR7 with expressive athletic intensity',
    dateSigned: '6/11/24',
    category: 'Sports Icon • Ink Portrait'
  },
  {
    id: 'user-post-03',
    imageUrl: '/assets/insta-posts/user-post-03.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Miyamoto Musashi (Vagabond)',
    caption: 'Takehiko Inoue reference study: "YES, THAT WAS THEN..." capturing the legendary ronin\'s piercing gaze',
    dateSigned: '1/11/24',
    category: 'Vagabond • Manga Master Study'
  },
  {
    id: 'user-post-04',
    imageUrl: '/assets/insta-posts/user-post-04.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Skeleton Knight',
    caption: 'Undead skeletal knight riding a rearing charger with bone-wing spine and dark fantasy linework',
    dateSigned: '3/11/24',
    category: 'Dark Fantasy • Ink Drawing'
  },
  {
    id: 'user-post-05',
    imageUrl: '/assets/insta-posts/user-post-05.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Lord Shiva & Nandi',
    caption: 'Lord Shiva in serene meditation beside the sacred bull Nandi with trishul, damru, and skulls',
    dateSigned: '6/9/24',
    category: 'Mythology & Sacred Art'
  },
  {
    id: 'user-post-06',
    imageUrl: '/assets/insta-posts/user-post-06.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Lord Krishna with Flute',
    caption: 'Lord Krishna playing the divine flute adorned with peacock feather crown (signed रोहन in Devanagari)',
    dateSigned: '4/9/24',
    category: 'Mythology & Sacred Art'
  },
  {
    id: 'user-post-07',
    imageUrl: '/assets/insta-posts/user-post-07.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Crown of Thorns',
    caption: 'Spiked celestial halo portrait with high-contrast chiaroscuro ink shadows and surreal emotional depth',
    dateSigned: '2/9/24',
    category: 'Surreal Expressionism'
  },
  {
    id: 'user-post-08',
    imageUrl: '/assets/insta-posts/user-post-08.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Lord Narasimha',
    caption: 'Ferocious multi-armed avatar upon the temple threshold with intricate divine ornaments',
    dateSigned: '10/8/24',
    category: 'Mythology & Sacred Avatars'
  },
  {
    id: 'user-post-09',
    imageUrl: '/assets/insta-posts/user-post-09.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Bouquet of Life',
    caption: 'Memento mori study: Skeletal figure tenderly cradling a vibrant blooming bouquet of roses',
    dateSigned: '28/8/24',
    category: 'Memento Mori • Concept Art'
  },
  {
    id: 'user-post-10',
    imageUrl: '/assets/insta-posts/user-post-10.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Shifting Perspectives',
    caption: 'Cubist surreal portrait study with multiple intersecting facial perspectives and dimensional planes',
    dateSigned: 'Aug 2024',
    category: 'Anatomy & Perspectives'
  },
  {
    id: 'user-post-11',
    imageUrl: '/assets/insta-posts/user-post-11.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Sacred Adornment',
    caption: 'Traditional portrait featuring intricate ceremonial headdress, forehead bindi, and tribal choker necklace',
    dateSigned: '24/8/24',
    category: 'Traditional Cultural Art'
  },
  {
    id: 'user-post-12',
    imageUrl: '/assets/insta-posts/user-post-12.jpg',
    postUrl: 'https://www.instagram.com/rockz_ntg/',
    title: 'Intricate Manga Bride',
    caption: 'Upside-down perspective featuring ornate bridal headdress, fine pen linework, and expressive anime eyes',
    dateSigned: '2024',
    isReel: true,
    category: 'Manga Linework • Video Reel'
  }
];


