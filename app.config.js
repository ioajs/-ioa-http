'use strict';

module.exports = {
   "./app": {
      "enable": true,
      options(ioa, options) {
         Object.assign(ioa.options, options);
      }
   },
   "./user": {
      "enable": true,
   }
}