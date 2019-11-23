'use strict';

const app = require('@app');

app.on("./lib");

app.loader({
   "config": false,
   "middleware": false,
})