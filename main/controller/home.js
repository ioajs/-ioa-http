class Controller {
  init(ctx) {
    ctx.body = 'hello ioa';
  }
}

export default class extends Controller {
  index(ctx) {
    this.init(ctx);
    // ctx.body = 'hello ioa';
  }
  sms(ctx) {
    ctx.body = ctx.params;
  }
  login(ctx) {
    const body = ctx.request.body;
    ctx.body = {
      type: 'login',
      body
    };
  }
};