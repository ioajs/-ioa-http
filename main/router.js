'use strict';

const { router, middleware } = require('@app');

router.global(middleware.global);

router.before(middleware.before);

router.get('/', 'home.index');

router.get('/object', 'object.index');

router.get('/func', 'func');

router.get('/sms/:name/:sub', 'home.sms');

router.post('/login', 'home.login');
