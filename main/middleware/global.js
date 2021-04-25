export default async function (ctx, next) {

   console.log("global middleware");

   await next();
   
}