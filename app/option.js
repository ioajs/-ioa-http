'use strict';

const ioa = require('ioa');
const common = require('./common');

ioa.beforeMiddleware = [];
const { routerTree, SymbolWildcard, SymbolName, SymbolMiddleware } = common;


// rest路由参数格式约定
const Resources = {
   "index": {
      "type": 'GET',
      "params": ""
   },
   "details": {
      "type": 'GET',
      "params": "/:id"
   },
   "create": {
      "type": 'POST',
      "params": ""
   },
   "update": {
      "type": 'PUT',
      "params": "/:id"
   },
   "destroy": {
      "type": 'DELETE',
      "params": "/:id"
   }
}


/**
 * 为app添加路由依赖
 * @param {*} app 
 */
function router(app) {

   app.$beforeMiddleware = [];

   /**
    * 
    * @param {String} type 请求类型，GET、POST、PUT、DELETE
    * @param {String} path 路由路径
    * @param {Array} middleware 包含多个中间件的数组
    * @param {Function} controller 控制器
    */
   function processPath(type, path, middleware, controller) {

      // 中间件类型验证
      for (let item of middleware) {
         if (item) {
            if (!(item instanceof Function)) {
               throw new Error(`路由指定中间件必须为函数类型`);
            }
         } else {
            throw new Error(`路由指定中间件不存在`);
         }
      }

      // 控制器类型验证
      if (!(controller instanceof Function)) {
         throw new Error(`路由指定${path}控制器不存在`);
      }

      let [, ...pathArray] = path.split('/');

      // 对请求类型进行分组保存
      let iterative = routerTree;

      //将path路径转换为对应的对象索引结构
      for (let name of pathArray) {

         let [one, ...cname] = name;

         // 路由包含动态参数，提取并保存参数名
         if (one === ':') {

            if (!iterative[SymbolWildcard]) {
               iterative[SymbolWildcard] = {}
            }

            iterative = iterative[SymbolWildcard];
            iterative[SymbolName] = cname.join('');

         } else {

            if (!iterative[name]) {
               iterative[name] = {}
            }

            iterative = iterative[name]

         }

      }

      if (!iterative[SymbolMiddleware]) {
         iterative[SymbolMiddleware] = {}
      }

      iterative[SymbolMiddleware][type] = [
         ...ioa.beforeMiddleware,
         ...app.$beforeMiddleware,
         ...middleware,
         controller
      ]

   }

   /**
    * 从middleware中根据Path路径提取控制器
    * @param {*} middleware 
    */
   function processController(path, middleware) {

      let controller = middleware.pop()

      if (typeof controller === 'string') {

         const controllerPath = controller

         const controllerPathArray = controllerPath.split('.');
         controller = app.controller;

         // 迭代提取controller
         for (let itemPath of controllerPathArray) {

            let item = controller[itemPath];
            if (item) {
               controller = item;
            } else {
               throw new Error(`${path}路由中未找到${controllerPath}控制器`)
            }

         }

         if (controller instanceof Function) {

            return controller;

         } else {

            throw new Error(`${path}路由中指定${controllerPath}控制器必须为函数类型`);

         }

      } else if (controller instanceof Function) {

         return controller;

      } else {

         throw new Error(`${path}路由中指定控制器必须为函数类型`);

      }

   }

   // 路由预处理解析，按请求类型进行分组

   app.router = {
      get(path, ...middleware) {
         const controller = processController(path, middleware);
         processPath('GET', path, middleware, controller);
      },
      post(path, ...middleware) {
         const controller = processController(path, middleware);
         processPath('POST', path, middleware, controller);
      },
      put(path, ...middleware) {
         const controller = processController(path, middleware);
         processPath('PUT', path, middleware, controller);
      },
      delete(path, ...middleware) {
         const controller = processController(path, middleware);
         processPath('DELETE', path, middleware, controller);
      },
      /**
       * Rest api
       * @param {String} path 
       * @param {...Function} middleware 
       */
      resources(path, ...middleware) {

         const controllerPath = middleware.pop();
         const controllerPathArray = controllerPath.split('.');

         // 迭代提取controller
         let controller = app.controller;
         for (const name of controllerPathArray) {
            const item = controller[name];
            if (item) {
               controller = item;
            } else {
               throw new Error(`RESTful路由指定${controllerPath}控制器不存在`);
            }
         }

         if (typeof controller === 'object') {

            for (const name in Resources) {
               const action = controller[name];
               if (action instanceof Function) {
                  const { type, params } = Resources[name];
                  processPath(type, path + params, middleware, action);
               }
            }

         } else {

            throw new Error(`REST路由指定${controllerPath}控制器不存在`);

         }

      },
      /**
       * 添加应用级中间件
       * @param  {...any} parameter 
       */
      befor(...parameter) {
         for (const item of parameter) {
            if (item) {
               app.$beforeMiddleware.push(item);
            }
         }
      },
      /**
       * 添加全局中间件
       * @param  {...any} parameter 
       */
      global(...parameter) {
         for (const item of parameter) {
            if (item) {
               ioa.beforeMiddleware.push(item);
            }
         }
      },
   }

}

module.exports = {
   "middleware": {
      "level": 30
   },
   "controller": {
      "level": 50,
      module(func) {
         if (func.prototype) {
            return new func();
         }
         return func;
      }
   },
   "router": {
      "level": 100,
      before: router,
   }
};