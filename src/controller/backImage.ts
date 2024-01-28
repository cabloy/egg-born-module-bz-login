import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerBackImage extends BeanBase<ScopeModule> {
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
