'use strict';

const ioa = require('ioa');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routerMiddleware = require('ioa-router');

const { main, logger } = ioa;

let port = process.env.PORT || 8800;

const { config } = main;

if (config && config.port) {
   port = config.port;
}

ioa.port = port;

const koa = new Koa();

ioa.koa = koa;

koa.use(bodyParser());
koa.use(routerMiddleware);
koa.listen(port);

logger.log(`http server: http://localhost:${port}`);