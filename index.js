'use strict';

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         "./app": {
            "enable": true
         },
      },
   },
   "./user": {
      "enable": true,
      "components": {
         "./app": {
            "enable": true,
         },
      },
   }
});