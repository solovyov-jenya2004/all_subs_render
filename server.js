const http = require('http');

const CONFIG_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted';
const BASE64_URL = 'https://raw.githubusercontent.com/solovyov-jenya2004/all_subs/main/final_sorted_base64';


async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub error: ${res.status}`);
  return res.text();
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
    if (path === '/final_sorted' || path === '/final_sorted/') {
      const body = await fetchText(CONFIG_URL);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Subscription-Userinfo': 'upload=0; download=0; total=0',
        'Content-Disposition': 'inline; filename="all_subs"; filename*=UTF-8\'\'%F0%9F%9A%80%20all_subs',
        "profile-title": "inline; \"all_subs\"; UTF-8''%F0%9F%9A%80%20all_subs",
        'announce': `UTF-8''%E2%9A%A1%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B2%20%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%D1%85%20%C2%AB%D0%B1%D0%B5%D0%BB%D1%8B%D1%85%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%C2%BB`,
        'profile-web-page-url': 'https://github.com/solovyov-jenya2004/all_subs/',
        'support-url': 'https://github.com/solovyov-jenya2004/all_subs/issues',
        'profile-update-interval': '1'
      });
      return res.end(body);
    }

    if (path === '/final_sorted_base64' || path === '/final_sorted_base64/') {
      const body = await fetchText(BASE64_URL);
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Subscription-Userinfo': 'upload=0; download=0; total=0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        
      });
      return res.end(body);
    }

    if (path === '/random' || path === '/random/')) {
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
        'Subscription-Userinfo': 'upload=0; download=0; total=0',
        'Content-Disposition': 'inline; filename="all_subs"; filename*=UTF-8\'\'%F0%9F%9A%80%20all_subs',
        "profile-title": "inline; \"all_subs\"; UTF-8''%F0%9F%9A%80%20all_subs",
        'announce': `UTF-8''%E2%9A%A1%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B9%D1%82%D0%B5%20%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B0%D1%86%D0%B8%D0%B8%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B2%20%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%D1%85%20%C2%AB%D0%B1%D0%B5%D0%BB%D1%8B%D1%85%20%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%BE%D0%B2%C2%BB`,
        'profile-web-page-url': 'https://github.com/solovyov-jenya2004/all_subs/',
        'support-url': 'https://github.com/solovyov-jenya2004/all_subs/issues',
        'profile-update-interval': '1'
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
