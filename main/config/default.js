'use strict';

module.exports = {
   "lib": {
      "port": 8600,
      "debug": true,
      "parser": {
         enableTypes: ['json', 'form', 'text'],
         extendTypes: { text: ['text/xml', 'application/xml'] }
      }
   }
}