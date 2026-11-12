import fs from 'fs';
import path from 'path';

async function main() {
  const assetsDir = path.resolve('public/assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  const urls = new Set();
  const htmlFiles = fs.readdirSync('.playwright-cli').filter(f => f.endsWith('.html'));
  for (const f of htmlFiles) {
    const content = fs.readFileSync(path.join('.playwright-cli', f), 'utf8');
    const matches = content.match(/https:\/\/verogobet\.com\/wp-content\/uploads\/[^\s"'\)<>]+/g) || [];
    for (const u of matches) {
      const clean = u.split('?')[0];
      if (!clean.endsWith('.css')) {
        urls.add(clean);
      }
    }
  }

  // Also inspect post CSS files
  const cssFiles = fs.readdirSync('.playwright-cli').filter(f => f.endsWith('.css'));
  for (const f of cssFiles) {
    const text = fs.readFileSync(path.join('.playwright-cli', f), 'utf8');
    const matches = text.match(/https:\/\/verogobet\.com\/wp-content\/uploads\/[^\s"'\)]+/g) || [];
    for (const u of matches) {
      const clean = u.split('?')[0].replace(/['"]/g, '');
      if (!clean.endsWith('.css')) {
        urls.add(clean);
      }
    }
  }

  // Also fetch post pages
  for (const pUrl of ['https://verogobet.com/impossible-city/', 'https://verogobet.com/gifs-collection/']) {
    try {
      const res = await fetch(pUrl);
      const text = await res.text();
      const matches = text.match(/https:\/\/verogobet\.com\/wp-content\/uploads\/[^\s"'\)<>]+/g) || [];
      for (const u of matches) {
        const clean = u.split('?')[0];
        if (!clean.endsWith('.css')) {
          urls.add(clean);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.log(`Found ${urls.size} media assets. Downloading...`);
  
  const manifest = {};
  for (const u of urls) {
    const filename = path.basename(u);
    const dest = path.join(assetsDir, filename);
    try {
      if (!fs.existsSync(dest)) {
        console.log(`Downloading: ${filename}`);
        const res = await fetch(u);
        if (res.ok) {
          const buf = await res.arrayBuffer();
          fs.writeFileSync(dest, Buffer.from(buf));
        } else {
          console.warn(`Failed ${u}: ${res.status}`);
        }
      }
      manifest[u] = `/assets/${filename}`;
    } catch (err) {
      console.error(`Error downloading ${u}:`, err.message);
    }
  }

  fs.writeFileSync('public/assets-manifest.json', JSON.stringify(manifest, null, 2));
  console.log('Finished downloading assets.');
}

main();
