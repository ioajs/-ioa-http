import ioa from 'ioa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import consoln from 'consoln';
import router from 'ioa-router';

const { argv } = ioa;
const { config } = ioa.app;

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

if (config.debug === true) {
   const debug = require('./debug.js');
   koa.use(debug);
}

koa.use(router);

koa.listen(port);

consoln.log(`Local: http://localhost:${port}`);
