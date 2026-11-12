import fs from 'fs';

function extractPageDetails(filename) {
  const html = fs.readFileSync(`.playwright-cli/${filename}`, 'utf8');
  console.log(`\n============================ ${filename} ============================`);

  // Extract all text content grouped by headings and paragraphs
  const elements = [];
  const regex = /<(h[1-6]|p|a|button|img)[^>]*>(.*?)<\/\1>|<img[^>]*>/gis;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const full = match[0];
    const tag = match[1] || 'img';
    const content = match[2] ? match[2].replace(/<[^>]+>/g, '').trim() : '';
    if (tag === 'img') {
      const srcMatch = full.match(/src=["']([^"']+)["']/);
      const altMatch = full.match(/alt=["']([^"']*)["']/);
      elements.push({ tag: 'img', src: srcMatch ? srcMatch[1].split('/').pop() : '', alt: altMatch ? altMatch[1] : '' });
    } else if (content) {
      const hrefMatch = full.match(/href=["']([^"']+)["']/);
      elements.push({ tag, content, href: hrefMatch ? hrefMatch[1] : undefined });
    }
  }

  console.log(JSON.stringify(elements.filter(e => 
    !e.content?.includes('Skip to content') && 
    !e.content?.includes('Cookie') && 
    !e.content?.includes('Powered by')
  ), null, 2));
}

extractPageDetails('home.html');
extractPageDetails('about.html');
extractPageDetails('blog.html');
extractPageDetails('contact.html');
