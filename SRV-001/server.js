
const { Server } = require('http');
const s = new Server();
s.on('request', (req, res) => {
  const { url, method } = req;
  const hu = {
    'Content-Type': 'text/html; charset=utf-8'
  };
  
  if (req.method == 'POST') {
    console.log("[200] " + req.method + " to " + req.url);
      
    req.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
    });
    
    req.on('end', function() {
      // empty 200 OK response for now
      res.writeHead(200, "OK", {...hu});
      res.end();
    });
  } else {
    console.log("[405] " + req.method + " to " + req.url);
    res.writeHead(405, "Method not supported", {...hu});
    res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
  }/*
  res.writeHead(200, { ...hu });
  res.end(`Привет мир с URL = ${url}!`);*/
});
s.on('connection', () => console.log(process.pid));
s.listen(4321, '127.0.0.1');