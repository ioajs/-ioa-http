'use strict';

const { router } = require('@app');

router.get('/', 'home.index');

router.get('/sms/:name/:sub', 'home.sms');

router.post('/login', 'home.login');

router.socket('/login', 'home.login');