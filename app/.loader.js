'use strict';

const component = require('@app');
const levels = require('ioa-router/lib/levels.js');

component.shared('levels', levels);

module.exports = {
   "koa.js": {
      level: 100
   },
}