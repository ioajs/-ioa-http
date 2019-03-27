'use strict';

const app = require('@app');
const option = require('./option.js');

app.setOption(option);

module.exports = {
   "after.js": {
      "level": 110,
   },
   "http.js": {
      level: 200
   },
}