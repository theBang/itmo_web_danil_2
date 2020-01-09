const [{ Server: h1 }, x] = [require('http'), require('express')];
const socketIO = require('socket.io');

//-----
const mg = require('mongoose');

mg.Promise = global.Promise;
const conn = mg.createConnection('mongodb+srv://dbUser:phikraG1Y0noxzQK@cluster0-ldnub.mongodb.net/messagedb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

const MessageSchema = new mg.Schema({
  username: {
    type: 'String',
  },
  text: {
    type: 'String',
  },
});
const Message = conn.model('Message', MessageSchema);

//----

let s;
const PORT = 1234;
const { log } = console;
const app = x();
app
  .use(x.static('./frontend/build/'))
  // здесь отсчёт идёт от той папки, где запускается yarn start
  // если бы мы писали node . в этой папке (где index.js)
  // то надо было бы брать путь '../frontend/build

  .use(({ res: r }) => r.status(404).end('Пока нет!'))
  .use((e, r, rs, n) => rs.status(500).end(`Ошибка: ${e}`));
module.exports = s = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));

const ws = socketIO(s);
const cb = (d) => log(d);


ws.on('connection', (wsock) => {
  log('Новый пользователь!');
  wsock.emit('serv', 'Добро пожаловать!', cb);
  wsock.on('disconnect', () => log('Пользователь отвалился!'));
});

ws.on('connect', async (wsock) => {
  wsock.on('getMessages', async () => {
    const recentMessages = await Message.find();
    wsock.emit('messages', recentMessages);
  });

  wsock.on('messages', async (username, text) => {
    const nm = new Message({ username, text });
    await nm.save();
    wsock.emit('messages', [nm]);
    wsock.broadcast.emit('messages', [nm]);
  });
});
