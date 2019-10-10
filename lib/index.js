'use strict';

const app = require('@app');
const loads = require('ioa-router/lib/loads.js');

app.emit('loads', loads);

module.exports = {
   "koa.js": {
      level: 100
   },
}