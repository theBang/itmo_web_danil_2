const restify = require('restify');
const russian = require('./spell');

const server = restify.createServer();

const PORT = 3000;
/*
function respond (req, res, next) {
    res.send(russian(23));
    next();
}
*/
server.get('/spell/:num', (req, res, next) => {
  const num = Number(req.params.num);
  if (isNaN(num)) return next(new Error('It is not a Number!'));
  if (num > 999999) return next(new Error('Too big Number!'));

  res.send(russian(num));
  return next();
});

server.listen(PORT, () => console.log('%s listening at %s', server.name, server.url));