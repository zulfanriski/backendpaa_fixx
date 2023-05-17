const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser'); // Import library cookie-parser

const dev = process.env.NODE_ENV !== 'ZULFAN';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser()); // Gunakan cookie-parser sebagai middleware

  server.get('/protected', (req, res) => {
    // Handler untuk halaman yang perlu di-autentikasi
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
