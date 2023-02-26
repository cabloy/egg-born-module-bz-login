module.exports = app => {
  class BackImageController extends app.Controller {
    async setCurrent() {
      const res = await this.ctx.service.backImage.setCurrent({
        key: this.ctx.request.body.key,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }

  return BackImageController;
};
