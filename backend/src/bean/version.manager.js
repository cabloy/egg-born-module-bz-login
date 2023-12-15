module.exports = class Version {
  async update(options) {
    if (options.version === 1) {
      // create table: bzLoginBackImage
      const sql = `
          CREATE TABLE bzLoginBackImage (
            id int(11) NOT NULL AUTO_INCREMENT,
            createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deleted int(11) DEFAULT '0',
            iid int(11) DEFAULT '0',
            atomId int(11) DEFAULT '0',
            backImage varchar(255) DEFAULT NULL,
            isCurrent int(11) DEFAULT '0',
            PRIMARY KEY (id)
          )
        `;
      await this.ctx.model.query(sql);
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
};
