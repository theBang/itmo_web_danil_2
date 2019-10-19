const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const cors = require('@koa/cors');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const { promises: { readFile } } = require('fs');

const app = new Koa();
const routerAPI = new Router({ prefix: '/api/posts' });
const routerUI = new Router({ prefix: '/posts' });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length > 2 && v.length < 41;
      },
      message: props => `${props.value} is not a valid!`
    }
  },
  categories: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length > 2 && v.length < 41;
      },
      message: props => `${props.value} is not a valid!`
    }
  },
  content: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length > 2 && v.length < 121;
      },
      message: props => `${props.value} is not a valid!`
    }
  }
});

postSchema.pre('replaceOne', function(next) {
  const titleCheck = this._update.title.length > 2 && this._update.title.length < 41;
  const categoriesCheck = this._update.categories.length > 2 && this._update.categories.length < 41;
  const contentCheck = this._update.content.length > 2 && this._update.content.length < 121;
  if (titleCheck && categoriesCheck && contentCheck) next();
  else next(new Error(`Replace Error (not right: ${(!titleCheck) ? 'title': ((!categoriesCheck) ? 'categories' : 'content')})`));
});

const Post = mongoose.model('Post', postSchema);

app
  .use(serve(__dirname + '/dist'))
  .use(cors())
  .use(logger())
  .use(bodyparser())
  .use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        switch (ctx.accepts('html', 'json')) {
          case 'html':
            ctx.type = 'html';
            ctx.body = '<h1>Page Not Found</h1>';
            break;
          case 'json':
            ctx.body = {
              message: 'Page Not Found'
            };
            break;
          default:
            ctx.type = 'text';
            ctx.body = 'Page Not Found';
        }
      }
    } catch(e) {
      ctx.status = e.status || 500;
      switch (ctx.accepts('html', 'json')) {
        case 'html':
          ctx.type = 'html';
          ctx.body = `<h1>${e.message}</h1>`;
          break;
        case 'json':
          ctx.body = {
            error: e.message
          };
          break;
        default:
          ctx.type = 'text';
          ctx.body = e.message;
      }
      ctx.app.emit('error', e, ctx);
    }
  });  
  //.use(views(path.join(__dirname, '/views'), { extension: 'pug' }));

routerUI
  .get('/', async (ctx, next) => ctx.body = await readFile(__dirname + '/client/dist/index.html', { encoding: 'utf-8' }))
  .get('/new', async (ctx, next) => ctx.body = await readFile(__dirname + '/client/dist/index.html', { encoding: 'utf-8' }))
  .get('/:id', async (ctx, next) => ctx.body = await readFile(__dirname + '/client/dist/index.html', { encoding: 'utf-8' }));

routerAPI
  .use(cors())
  .get('/', async (ctx, next) => {
    ctx.body = await Post.find().exec();
  })
  .get('/:id', async (ctx, next) => {
    ctx.body = await Post.findById(ctx.params.id).exec();
  })
  .post('/', async (ctx, next) => {
    ctx.body = await new Post({ 
      title: ctx.request.body.title,
      categories: ctx.request.body.categories,
      content: ctx.request.body.content
    }).save();
  })
  .delete('/:id', async (ctx, next) => {
    const post = await Post.findById(ctx.params.id).exec();
    const deleted = await Post.deleteOne({ _id: ctx.params.id });

    if (deleted.ok) ctx.body = post;
    else ctx.throw(400, 'Post was not deleted');
  })
  .put('/:id', async (ctx, next) => {
    const replaced = await Post.replaceOne({ _id: ctx.params.id }, {
      title: ctx.request.body.title,
      categories: ctx.request.body.categories,
      content: ctx.request.body.content
    });

    if (replaced.nModified) ctx.body = await Post.findById(ctx.params.id).exec();
    else ctx.throw(400, 'Post was not modified');
  });

app
  .use(routerAPI.routes())
  .use(routerUI.routes())
  .listen(config.PORT, () => console.log(`process: ${process.pid}`));

mongoose.connect(config.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => console.log('Mongoose opened to ' + config.DB_URL));
mongoose.connection.on('error', err => console.log('Mongoose error: ' + err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose closed (app termination)');
    process.exit(0);
  });
});