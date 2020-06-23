'use strict';

const app = require('@app');

app.use("./lib");

app.loader({
   "config": false,
   "middleware": false,
})