'use strict';

// 路由后置处理节点，在所有router加载完毕后触发，为每个中间件队列添加全局中间件

const common = require('./common');

const { allQueue, beforeMiddleware } = common;

for (const list of allQueue) {
   list.unshift(...beforeMiddleware);
}