const { request } = require('http');

const sendReq = (num, msg) => {
  const options = {
    port: 3000,
    host: '127.0.0.1',
    path: `/spell/${num}`,
    method: 'GET'
  }

  const req = request(options, res => {
    let buff = '';
    res.on('data', chunk => buff += String(chunk));
    res.on('end', () => console.log(msg + buff));
  });
  req.end()
}

const rand = (shift = 0) => Math.floor(Math.random() * 999999 + shift);

const usualNum = rand();
sendReq(usualNum, `Usual number: ${usualNum}, got: `);

const overNum = rand(1000000);
sendReq(overNum, `Over number: ${overNum}, got: `);


const strNum = '212k';
sendReq(strNum, `String number: ${strNum}, got: `);