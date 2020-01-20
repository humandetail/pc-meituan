import Koa from 'koa';
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt');

// 引入路由文件
import cart from './routes/cart';
import category from './routes/category';
import geo from './routes/geo';
import search from './routes/search';
import users from './routes/users';

import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import Redis from 'koa-redis';
import json from 'koa-json';
import dbConfig from './config/config';
import passport from './utils/passport';

const app = new Koa();

app.keys = ['meituan', 'secert'];
app.proxy = true;
app.use(session({
  key: 'meituan',
  prefix: 'meituan:uid',
  store: new Redis()
}));
app.use(bodyParser({
  extendTypes: ['json', 'from', 'text']
}));
app.use(json());

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});

app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = app.env !== 'production';

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // 使用路由中间件
  app.use(cart.routes()).use(cart.allowedMethods());
  app.use(category.routes()).use(category.allowedMethods());
  app.use(geo.routes()).use(geo.allowedMethods());
  app.use(search.routes()).use(search.allowedMethods());
  app.use(users.routes()).use(search.allowedMethods());

  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  })

  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
