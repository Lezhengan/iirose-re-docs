// 轻量静态服务器：用于本地预览 docsify 站点
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, 'docs'); // 服务 docsify 站点（docs/ 目录）
const realRoot = fs.realpathSync(root);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function respond(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  res.end(body);
}

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return respond(res, 405, '405 Method Not Allowed', { Allow: 'GET, HEAD' });
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return respond(res, 400, '400 Bad Request');
  }

  if (pathname.includes('\0') || pathname.includes('\\')) {
    return respond(res, 400, '400 Bad Request');
  }
  if (pathname === '/') pathname = '/index.html';

  const file = path.resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
    return respond(res, 403, '403 Forbidden');
  }

  fs.realpath(file, (err, realFile) => {
    if (err) return respond(res, err.code === 'ENOENT' ? 404 : 500, err.code === 'ENOENT' ? '404 Not Found' : '500 Internal Server Error');
    if (realFile !== realRoot && !realFile.startsWith(`${realRoot}${path.sep}`)) {
      return respond(res, 403, '403 Forbidden');
    }

    fs.readFile(realFile, (readErr, data) => {
      if (readErr) return respond(res, 500, '500 Internal Server Error');
      let mime = MIME[path.extname(realFile).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': mime,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store'
      });
      if (req.method === 'GET') res.end(data);
      else res.end();
    });
  });
}).listen(3001, () => console.log('docs preview: http://localhost:3001/'));
