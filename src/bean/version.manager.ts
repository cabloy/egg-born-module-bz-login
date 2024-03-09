import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: bzLoginBackImage
      await this.bean.model.createTable('bzLoginBackImage', function (table) {
        table.basicFields();
        table.atomId();
        table.string('backImage', 255);
        table.int0('isCurrent');
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // add role rights
      const roleRights = [
        { roleName: 'system', action: 'create' },
        { roleName: 'system', action: 'read', scopeNames: 0 },
        { roleName: 'system', action: 'read', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'write', scopeNames: 0 },
        { roleName: 'system', action: 'write', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'delete', scopeNames: 0 },
        { roleName: 'system', action: 'delete', scopeNames: 'authenticated' },
        // { roleName: 'system', action: 'clone', scopeNames: 0 },
        // { roleName: 'system', action: 'clone', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'deleteBulk' },
        // { roleName: 'system', action: 'exportBulk' },
        // custom
        { roleName: 'system', action: 'setCurrent', scopeNames: 'authenticated' },
      ];
      await this.ctx.bean.role.addRoleRightBatch({ atomClassName: 'loginBackImage', roleRights });
    }
  }

  async test() {}
}
