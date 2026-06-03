const http = require('http');
const https = require('https');

const CONFIG_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted';
const BASE64_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted_base64';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    if (path === '/final_sorted') {
      const body = await fetchText(CONFIG_URL);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Subscription-Userinfo': 'upload=0; download=0; total=0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      return res.end(body);
    }

    if (path === '/final_sorted_base64') {
      const body = await fetchText(BASE64_URL);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Subscription-Userinfo': 'upload=0; download=0; total=0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      return res.end(body);
    }

    if (path === '/random') {
      const text = await fetchText(CONFIG_URL);
      const lines = text.split('\n').map(l => l.trim());
      const headers = lines.filter(l => l.startsWith('#'));
      const proxies = lines.filter(l => l.length > 0 && !l.startsWith('#'));

      if (proxies.length === 0) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(headers.join('\n') + '\n');
      }

      let n = parseInt(url.searchParams.get('n'), 10);
      if (isNaN(n) || n < 1) n = 100;
      n = Math.min(n, proxies.length);

      const selected = shuffle([...proxies]).slice(0, n);
      const body = [...headers, '', ...selected].join('\n');

      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Disposition': 'inline; filename="random_sub.txt"',
        'profile-title': 'all_subs (random)',
        'announce': 'Random subscription from the pool',
        'profile-web-page-url': 'https://github.com/solovyov-jenya2004/all_subs',
        'support-url': 'https://github.com/solovyov-jenya2004/all_subs/issues',
        'profile-update-interval': '1',
        'subscription-userinfo': 'upload=0; download=0; total=0',
      });
      return res.end(body);
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end('# Server error\n');
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));