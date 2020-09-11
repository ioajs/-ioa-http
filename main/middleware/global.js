'use strict';

module.exports = async function (ctx, next) {

   console.log("global middleware");

   await next();
   
}