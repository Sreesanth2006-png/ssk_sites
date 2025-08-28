const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

/** In-memory data store for demo purposes */
let todos = [
  { id: 1, text: 'Learn full-stack basics', done: false },
  { id: 2, text: 'Build something small', done: false },
];
let nextId = 3;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function serveStatic(req, res) {
  let filePath = req.url === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, req.url);
  // Prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = ext === '.html' ? 'text/html' : ext === '.css' ? 'text/css' : ext === '.js' ? 'application/javascript' : 'text/plain';
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(filePath).pipe(res);
  });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      // Protect against too large payloads
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/todos')) {
    if (req.method === 'GET') {
      return sendJson(res, 200, todos);
    }
    if (req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const text = (body.text || '').toString().trim();
        if (!text) return sendJson(res, 400, { error: 'text is required' });
        const todo = { id: nextId++, text, done: false };
        todos.push(todo);
        return sendJson(res, 201, todo);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }
    }
    if (req.method === 'PATCH') {
      try {
        const body = await parseBody(req);
        const id = Number(body.id);
        const todo = todos.find(t => t.id === id);
        if (!todo) return sendJson(res, 404, { error: 'Not found' });
        if (typeof body.done === 'boolean') todo.done = body.done;
        if (typeof body.text === 'string') todo.text = body.text.trim();
        return sendJson(res, 200, todo);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }
    }
    if (req.method === 'DELETE') {
      try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        const idParam = url.searchParams.get('id');
        const id = Number(idParam);
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) return sendJson(res, 404, { error: 'Not found' });
        const removed = todos.splice(index, 1)[0];
        return sendJson(res, 200, removed);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }
    }
    res.writeHead(405);
    return res.end('Method Not Allowed');
  }

  return serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

