const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  if (path === '/final_sorted') {
    res.end('TEST: final_sorted works');
  } else if (path === '/final_sorted_base64') {
    res.end('TEST: final_sorted_base64 works');
  } else if (path === '/random') {
    res.end('TEST: random works');
  } else {
    res.end('TEST: path = ' + path);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Test server listening on port ${PORT}`));
