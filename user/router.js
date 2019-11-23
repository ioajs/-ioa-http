'use strict';

const { router } = require('@app');

router.get('/user/:name', 'home.index');