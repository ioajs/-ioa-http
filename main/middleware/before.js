export default async function (ctx, next) {

   console.log("before middleware");

   await next();
   
}