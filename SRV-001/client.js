const { request: r } = require('http');
const options = {
  hostname: 'localhost',
  port: 4321,
  method: 'POST',
  path: '/'
};
const req = r(options, res => res.on('data', d => console.log(String(d))));

req.end('nice');