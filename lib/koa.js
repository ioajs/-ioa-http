'use strict';

const app = require('@app');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routerMiddleware = require('ioa-router');
const consoln = require('consoln');

const { config } = app;

let port = process.env.PORT || 8800;

if (config && config.port) {
   port = config.port;
}

const koa = new Koa();

koa.use(bodyParser());

koa.use(routerMiddleware);

koa.listen(port);

consoln.log(`http server: http://localhost:${port}`);