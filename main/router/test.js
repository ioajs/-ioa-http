import ioa from 'ioa';

const { router } = ioa.app;

router.get('/router/test', ctx => {

  ctx.body = 'router test';

});
