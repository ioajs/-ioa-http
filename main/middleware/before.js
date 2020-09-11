'use strict';

module.exports = async function (ctx, next) {

   console.log("before middleware");

   await next();
   
}