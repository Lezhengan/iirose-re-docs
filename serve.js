// 轻量静态服务器：用于本地预览 docsify 站点
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'docs'); // 服务 docsify 站点（docs/ 目录）

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('403'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404 Not Found'); }
    let mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    // reference/ 下的 .html 是逆向产物源码，强制以纯文本显示，避免被浏览器渲染成页面
    if (p.startsWith('/reference/') && p.endsWith('.html')) mime = 'text/plain; charset=utf-8';
    res.writeHead(200, { 'Content-Type': mime, 'X-Content-Type-Options': 'nosniff' });
    res.end(data);
  });
}).listen(3001, () => console.log('docs preview: http://localhost:3001/'));
