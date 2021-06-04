## @ioa/koa

集成koa.js、路由及相关配套服务的http组件

### Install

```
npm install @ioa/koa
```

```js
// 根入口文件
import ioa from 'ioa';

ioa.apps("./main");
```

```js
// 应用入口文件
import ioa from 'ioa';
const { app } = ioa;

app.component("@ioa/config");
app.component("@ioa/koa");
```

### 路由

路由按作用域可分为全局路由、应用级路由、应用内路由三种，示例如下：

```js
import ioa from 'ioa';
const { router } = ioa.app;

router.global(cors); // 全局路由，跨应用，添加到所有path路由中间件之前

router.befor(token); // 应用级路由，中间件仅在当前应用内生效

router.get('/', "token", 'index.home'); // 应用内路由

router.get('/sms/:sid/sd/:id', 'index.sms');

router.post('/sms/:sid/sd/:sid', 'index.sms');

router.post('/login', 'index.login');

router.put('/login', 'index.login');

router.delele('/login', 'index.login');
```

#### 声明式路由

声明式路由具有高度灵活和可定制url的特性。允许随意定义url格式，调用任意middleware、controller，但每个url都需要单独定义。

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


### controller

> 支持Class、Object、箭头函数三种方式定义controller，不支持用普通函数直接定义controller（目前仅通过有无prototype来区分，所有包含prototype属性的函数均被视为构造函数）

在$app/controller目录下创建控制器文件，框架自动载入并进行类型检测，支持多级目录分组。
