## @ioa/http

集成koa.js、路由及相关配套服务的http组件

### Install

```
npm install @ioa/http
```


### Usage

```js
const ioa = require('ioa')

ioa.loader();

ioa.http();
```


#### 预设.loader.js配置选项

预设.loader.js配置项是为http serve应用场景预设的加载配置项目，建议按需加载，配置示例如下：

```js
// app.config.js
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

// .loader.js
const { options } = require('@app');

module.exports = {
   ...options,
   "other": {
      level: 100
   }
}

```

### 路由

app.router对象中提供了befor、get、post、put、delele路由声明方法，支持用resources批量定义RESTful路由。

* router.befor(middleware) 定义应用级的全局前置中间件，该中间件仅作用于当前应用，并在所有其它路由配置中间件之前执行。

#### 示例代码

``` js
const { router, middleware, controller } = require('@app');

const { cors, auth } = middleware;

const { home } = controller;

router.befor(cors);

router.befor(auth);

router.get('/', home.index);
```

### 路由模式

ioa中同时支持声明式和自动寻址两种路由模式：


#### 声明式路由

声明式路由具有高度灵活和可定制url的特性。允许随意定义url格式，调用任意middleware、controller，但每个url都需要单独定义。

```js
const { router } = require('@app')

router.get('/', 'index.home')

router.get('/sms/:sid/sd/:id', 'index.sms')

router.post('/sms/:sid/sd/:sid', 'index.sms')

router.post('/login', 'index.login')

router.put('/login', 'index.login')

router.delele('/login', 'index.login')

// 分组路由
router.group('admin', {
    "login": ['index.login'],
    "sms": ['index.sms'],
    "cc": {
        "xx": ['index.xx'],
        "jj": ['index.jj']
    },
})
```

#### 自动寻址路由

指定一个controller目录，路由解析器根据目录结构自动寻址，不再需要单独配置每个路由。这对于常规、标准化路由的定义非常方便，但是缺乏灵活性。

```js
// 映射到controller/admin目录
router.controller('admin')
```

#### RESTful路由

RESTful路由与Controller的映射关系

Method | Path |  Controller.Action
--- | --- | ---:
GET | /test | index
GET | /test/:id | details
POST | /test | create
PUT | /test/:id | update
DELETE | /test/:id | destroy


```js
// 自动生成get、post、put、delete
router.resources('/rest', 'rest')
```


### 中间件

在$app/middleware目录下添加中间件文件，框架自动载入并进行类型检测。

#### 路由中间件

在路由中使用中间件时，通过app.middleware引用中间件，插入到配置项中。

```js
const { test, token } = app.middleware

router.get('/', test, token, 'index.home')
```

#### 应用级中间件

应用级中间件的作用域仅在当前应用内有效，配置示例如下：

```js
const { test, token } = app.middleware

router.get('/', test, token, 'index.home')
```


#### 全局中间件

当需要使用全局中间件时，通过app.AppsMiddleware数组进行添加。

```js
const cors = require('@koa/cors')

app.AppsMiddleware.push(cors({ origin: '*' }))
```


### model

在$app/model目录下创建模型配置文件，框架自动载入并进行类型检测，在controller中通过app.model访问模型，支持多级目录分组。


### controller

在$app/controller目录下创建控制器文件，框架自动载入并进行类型检测，支持多级目录分组。


### 日志

日志功能由loggercc模块提供，参考链接：https://github.com/xiangle/loggercc