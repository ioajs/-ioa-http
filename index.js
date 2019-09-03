'use strict';

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         "./lib/": true,
      },
   },
   "./user": {
      "enable": true,
      "components": {
         "./lib/": true,
      },
   }
});