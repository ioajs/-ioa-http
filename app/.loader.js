'use strict';

const component = require('@app');
const levels = require('ioa-router/lib/levels.js');

component.shared('levels', levels);

module.exports = {
   "http.js": {
      level: 100
   },
}