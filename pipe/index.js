const [{ Server: h1 }, x] = [require('http'), require('express')];
const session = require('express-session');
const fetch = require('node-fetch');
const zip = require('zip');



const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// mongoose.connect('mongodb+srv://sessionuser:sessionpassword@gossjs-8jzrf.mongodb.net/sessionstore', {
//    useMongoClient: true
// });
mongoose.Promise = global.Promise;
// const db = mongoose.connection;
const { createReadStream: readStr } = require('fs');

let server;
const Router = x.Router();
const PORT = 5555;
const { log } = console;
const hu = { 'Content-Type': 'text/html; charset=utf-8' };
const app = x();
const protect = (r, res, next) => {
   if (r.session.name === 'admin') {
     return next();
   }
   r.res.redirect('/denied');
};
Router
  .route('/')
  .get(r => r.res.end('Привет мир!'));
app
  .use(require('express-session')({ 
      secret: 'mysecret', 
      resave: true, 
      saveUninitialized: true,
      /* store: new MongoStore({ mongooseConnection: db }) */  
      }))
  /* .use((r, rs, n) => rs.status(200).set(hu) && n()) */
  .use(x.static('.'))
  .use('/', Router)
  .get('/package', r => {
    const d = { 'Content-type': 'application/json',
 'Content-disposition': 'attachment; filename=result.json'
};
    r.res.set(d);
    readStr('./package.json').pipe(r.res);
    // r.res.sendFile('package.json');
     // https://kodaktor.ru/__dirname
  })
  .get('/login', r => { 
    // тайный маршрут-авторизатор
    r.session = r.session || {};
    r.session.name = 'admin';
    r.session.random = Math.random();
    r.res.end('login'); 
  })
  .get('/profile', protect, r => r.res.json(JSON.stringify(r.session)))
  .get('/denied', r => r.res.status(401).end('BAD ATTEMPT'))
  .get('/stop', r => {
      r.res.end('Closing....');
      server.close();
  })
  .get('/ip', async (r) => {
      const result = await	fetch('https://fork.kodaktor.ru/getusers')
  .then(x => x.text());
  console.log(result);
  r.res.end('OK');
  // 
  })
  .use(({ res: r }) => r.status(404).end('Пока нет!'))
  .use((e, r, rs, n) => rs.status(500).end(`Ошибка: ${e}`))
  /* .set('view engine', 'pug') */
  .set('x-powered-by', false);
module.exports = server = h1(app)
  .listen(process.env.PORT || PORT, () => log(process.pid));