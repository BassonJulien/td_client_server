const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    // console.log(req);
    console.log(req.url);
const link = url.parse(req.url, true, true);
if (link.pathname === '/add') {
  res.end(String(add(Number(link.query.a), Number(link.query.b))));
  return;
}if (link.pathname === '/sub') {
    res.end(String(sub(Number(link.query.a), Number(link.query.b))));
    return;
  }if (link.pathname === '/mult') {
    res.end(String(mult(Number(link.query.a), Number(link.query.b))));
    return;
  }if (link.pathname === '/facto') {
    res.end(String(facto(Number(link.query.a))));
    return;
  }

  else {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found');
  return;
}


  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(500, {'Content-Type': 'text/plain'});
});

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
const facto  = a => (a <= 1) ? 1 : a * facto(a - 1);

server.listen(5353);