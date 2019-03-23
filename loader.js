'use strict';

const before = require('./app/router');

module.exports = {
   "model": {
      "level": 20,
   },
   "middleware": {
      "level": 30
   },
   "service": {
      "level": 40,
   },
   "controller": {
      "level": 50,
      module(func) {
         if (func.prototype) {
            return new func();
         }
         return func;
      }
   },
   "router": {
      "level": 100,
      before,
   }
}