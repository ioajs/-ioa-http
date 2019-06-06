'use strict';

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         "./lib": {
            "enable": true
         },
      },
   },
   "./user": {
      "enable": true,
      "components": {
         "./lib": {
            "enable": true,
         },
      },
   }
});