'use strict';

class home {
   index(ctx) {
      ctx.body = ctx.params;
   }
}

module.exports = home;