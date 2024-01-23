import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleBzLogin } from '../index.js';

@Controller()
export class ControllerBackImage extends BeanBase {
  @Use()
  scope: ScopeModuleBzLogin;

  async setCurrent() {
    const res = await this.scope.local.backImage.setCurrent({
      key: this.ctx.request.body.key,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
  async getCurrent() {
    const res = await this.scope.local.backImage.getCurrent({
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
