'use strict';

const ioa = require('ioa');

ioa.loader({
   "./main": {
      "enable": true,
      "components": {
         ".": {
            "enable": true
         },
      },
   },
   "./user": {
      "enable": true,
      "components": {
         ".": {
            "enable": true
         },
      },
   }
});