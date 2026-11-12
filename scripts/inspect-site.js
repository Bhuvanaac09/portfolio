import fs from 'fs';
import path from 'path';

async function run() {
  const pages = ['home', 'about', 'blog', 'contact'];
  const allUploads = new Set();
  
  for (const p of pages) {
    const file = `.playwright-cli/${p}.html`;
    if (!fs.existsSync(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/https:\/\/verogobet\.com\/wp-content\/uploads\/[^\s"'\)]+/g) || [];
    for (const m of matches) {
      allUploads.add(m);
    }
  }

  console.log('Uploads count:', allUploads.size);
  console.log('Uploads:', Array.from(allUploads));
}

run();
