'use strict';

module.exports = async (ctx, next) => {

  console.log(`\n\x1b[32m--------------------------------- ${ctx.method} START --------------------------------\n`);

  console.log(`\x1b[34mpath: ${ctx.url}\x1b[30m`);

  console.log(`\n--> `, ctx.request.body, '\n');

  await next();

  console.log(`\n<-- `, ctx.body);

  console.log(`\n\x1b[32m---------------------------------- ${ctx.method} END --------------------------------\x1b[30m`);

};