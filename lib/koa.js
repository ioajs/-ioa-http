'use strict';

const ioa = require('ioa');
const app = require('@app');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routerMiddleware = require('ioa-router');
const consoln = require('consoln');

const { argv } = ioa;
const { config } = app;

let port = 8800;

if (argv.port && argv.port[0]) {
   port = argv.port[0];
} else if (argv.p && argv.p[0]) {
   port = argv.p[0];
} else if (config && config.port) {
   port = config.port;
}

const koa = new Koa();

koa.use(bodyParser(config.parser));

koa.use(routerMiddleware);

koa.listen(port);

consoln.log(`server: http://localhost:${port}`);