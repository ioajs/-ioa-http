'use strict';

const { router } = require('@app');

router.get('/', 'home.index');

router.get('/sms/:name/:sub', 'home.sms');

router.get('/login', 'home.login');