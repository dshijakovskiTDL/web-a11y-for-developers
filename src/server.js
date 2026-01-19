import { serve } from 'bun';
import { join, extname } from 'path';

const PORT = process.env.PORT || 3000;
const srcDir = import.meta.dir; // src directory
const rootDir = join(srcDir, '..'); // project root

// MIME types for common file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filepath = url.pathname;
    let fullPath;

    // Default to index.html for root
    if (filepath === '/') {
      fullPath = join(srcDir, 'pages/index.html');
    }
    // If path starts with /public, serve from project root
    else if (filepath.startsWith('/public/')) {
      fullPath = join(rootDir, filepath.slice(1)); // Remove leading slash, serve from root
    }
    // If no extension, assume it's an HTML page in src/pages
    else if (!extname(filepath)) {
      fullPath = join(srcDir, `pages${filepath}.html`);
    }
    // If path ends with /, try index.html
    else if (filepath.endsWith('/')) {
      fullPath = join(srcDir, `pages${filepath}index.html`);
    }
    // Other files (css, js, etc.) serve from src
    else {
      fullPath = join(srcDir, filepath.slice(1)); // Remove leading slash, serve from src/
    }

    try {
      const file = Bun.file(fullPath);
      const exists = await file.exists();

      if (!exists) {
        console.log(`File not found: ${fullPath}`);
        return new Response('Not Found', { status: 404 });
      }

      // Get the correct MIME type
      const ext = extname(fullPath);
      const mimeType = mimeTypes[ext] || 'application/octet-stream';

      return new Response(file, {
        headers: {
          'Content-Type': mimeType,
        },
      });
    } catch (error) {
      console.error('Error serving file:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
});

console.log(`Server running on port ${PORT}`);
