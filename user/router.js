import ioa from 'ioa';

const { router } = ioa.app();

router.get('/user/:name', 'home.index');