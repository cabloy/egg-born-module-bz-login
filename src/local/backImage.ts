import { BeanBase, Local } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalBackImage extends BeanBase<ScopeModule> {
  async setCurrent({ key, user: _user }: any) {
    // get old
    let keyOld;
    const itemOld = await this.scope.model.loginBackImage.get({
      isCurrent: 1,
    });
    if (itemOld) {
      keyOld = { atomId: itemOld.atomId, itemId: itemOld.id };
    }
    if (keyOld && keyOld.atomId === key.atomId) {
      // do nothing
      return null;
    }
    // new
    await this.scope.model.loginBackImage.update({
      id: key.itemId,
      isCurrent: 1,
    });
    if (keyOld) {
      await this.scope.model.loginBackImage.update({
        id: keyOld.itemId,
        isCurrent: 0,
      });
    }
    // ok
    return { key, keyOld };
  }

  async getCurrent({ user: _user }: any) {
    return await this.scope.model.loginBackImage.get({
      isCurrent: 1,
    });
  }
}
