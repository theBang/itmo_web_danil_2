const restify = require('restify');
const server = restify.createServer();
const PORT = 3000;

function respond (req, res, next) {
    res.sendRaw('hello ' + req.params.name);
    next();
}

server.get('/spell/:num', respond);
server.head('/hello/:name', respond);

server.listen(PORT, () => console.log('%s listening at %s', server.name, server.url));