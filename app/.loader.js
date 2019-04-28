'use strict';

const app = require('@app');
const levels = require('./levels.js');

app.setLevels(levels);

module.exports = {
   "after.js": {
      "level": 90,
   },
   "http.js": {
      level: 100
   },
}