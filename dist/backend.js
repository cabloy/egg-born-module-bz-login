/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 224:
/***/ ((module) => {

module.exports = app => {
  const aops = {};
  return aops;
};


/***/ }),

/***/ 426:
/***/ ((module) => {

module.exports = app => {
  class Atom extends app.meta.AtomBase {
    async create({ atomClass, item, options, user }) {
      // super
      const key = await super.create({ atomClass, item, options, user });
      // add loginBackImage
      const res = await this.ctx.model.loginBackImage.insert({
        atomId: key.atomId,
      });
      // return key
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async read({ atomClass, options, key, user }) {
      // super
      const item = await super.read({ atomClass, options, key, user });
      if (!item) return null;
      // meta
      this._getMeta(item);
      // ok
      return item;
    }

    async select({ atomClass, options, items, user }) {
      // super
      await super.select({ atomClass, options, items, user });
      // meta
      for (const item of items) {
        this._getMeta(item);
      }
    }

    async write({ atomClass, target, key, item, options, user }) {
      // check demo
      this.ctx.bean.util.checkDemoForAtomWrite();
      // super
      await super.write({ atomClass, target, key, item, options, user });
      // update loginBackImage
      const data = await this.ctx.model.loginBackImage.prepareData(item);
      await this.ctx.model.loginBackImage.update(data);
    }

    async delete({ atomClass, key, options, user }) {
      // super
      await super.delete({ atomClass, key, options, user });
      // delete loginBackImage
      await this.ctx.model.loginBackImage.delete({
        id: key.itemId,
      });
    }

    async checkRightAction({ atom, atomClass, action, stage, user, checkFlow }) {
      // super
      const res = await super.checkRightAction({ atom, atomClass, action, stage, user, checkFlow });
      if (!res) return res;
      if (atom.atomStage !== 1) return res;
      if (action !== 101) return res;
      // setCurrent
      const item = await this.ctx.model.loginBackImage.get({ id: atom.itemId });
      if (action === 101 && item.isCurrent === 0) return res;
      return null;
    }

    _getMeta(item) {
      const meta = this._ensureItemMeta(item);
      // meta.flags
      // meta.summary
      meta.summary = item.description;
    }
  }

  return Atom;
};


/***/ }),

/***/ 899:
/***/ ((module) => {

module.exports = app => {
  class Version extends app.meta.BeanBase {
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
  }

  return Version;
};


/***/ }),

/***/ 187:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const versionManager = __webpack_require__(899);
const atomLoginBackImage = __webpack_require__(426);

module.exports = app => {
  const beans = {
    // version
    'version.manager': {
      mode: 'app',
      bean: versionManager,
    },
    // atom
    'atom.loginBackImage': {
      mode: 'app',
      bean: atomLoginBackImage,
    },
  };
  return beans;
};


/***/ }),

/***/ 76:
/***/ ((module) => {

// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};
  return config;
};


/***/ }),

/***/ 624:
/***/ ((module) => {

// error code should start from 1001
module.exports = {};


/***/ }),

/***/ 327:
/***/ ((module) => {

module.exports = {
  LoginBackImages: 'Login Back Images',
  SetCurrent: 'Set Current',
};


/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = {
  LoginBackImage: '登录背景图',
  LoginBackImages: '登录背景图',
  SetCurrent: '设为当前',
};


/***/ }),

/***/ 25:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  'en-us': __webpack_require__(327),
  'zh-cn': __webpack_require__(72),
};


/***/ }),

/***/ 669:
/***/ ((module) => {

module.exports = app => {
  // const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const content = {
    layouts: {
      table: {
        blocks: {
          items: {
            columns: [
              {
                dataIndex: 'atomName',
                title: 'Atom Name',
                align: 'left',
                component: {
                  module: 'a-baselayout',
                  name: 'listLayoutTableCellAtomName',
                },
              },
              {
                dataIndex: 'backImage',
                title: 'BackImage',
                align: 'center',
                component: {
                  module: 'a-baserender',
                  name: 'renderTableCellImage',
                  options: {
                    props: {
                      size: {
                        height: 36,
                      },
                    },
                  },
                },
              },
              {
                dataIndex: 'isCurrent',
                title: 'IsCurrent',
                align: 'center',
                component: {
                  module: 'bz-login',
                  name: 'listLayoutTableCellIsCurrent',
                },
              },
              {
                dataIndex: 'userName',
                title: 'Creator',
                align: 'left',
                component: {
                  module: 'a-baselayout',
                  name: 'listLayoutTableCellUserName',
                },
              },
              {
                dataIndex: 'atomCreatedAt',
                title: 'Created Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
              {
                dataIndex: 'atomUpdatedAt',
                title: 'Modification Time',
                align: 'center',
                params: {
                  dateFormat: {
                    lines: true,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  const layout = {
    atomName: 'LoginBackImage',
    atomStaticKey: 'layoutAtomListLoginBackImage',
    atomRevision: 2,
    description: '',
    layoutTypeCode: 3,
    content: JSON.stringify(content),
    resourceRoles: 'root',
  };
  return layout;
};


/***/ }),

/***/ 512:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const layoutAtomListLoginBackImage = __webpack_require__(669);

module.exports = app => {
  const layouts = [
    //
    layoutAtomListLoginBackImage(app),
  ];
  return layouts;
};


/***/ }),

/***/ 429:
/***/ ((module) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const resources = [
    // menu
    {
      atomName: 'LoginBackImages',
      atomStaticKey: 'listLoginBackImage',
      atomRevision: 1,
      atomCategoryId: 'a-base:menu.BasicProfile',
      resourceType: 'a-base:menu',
      resourceConfig: JSON.stringify({
        module: moduleInfo.relativeName,
        atomClassName: 'loginBackImage',
        atomAction: 'read',
      }),
      resourceIcon: ':outline:login-outline',
      appKey: 'a-appbooster:appSystem',
      resourceRoles: 'template.system',
    },
  ];
  return resources;
};


/***/ }),

/***/ 475:
/***/ ((module) => {

module.exports = app => {
  const schemas = {};
  // loginBackImage
  schemas.loginBackImage = {
    type: 'object',
    properties: {
      atomName: {
        type: 'string',
        ebType: 'text',
        ebTitle: 'Name',
        notEmpty: true,
      },
      backImage: {
        type: 'string',
        ebType: 'image',
        ebTitle: 'BackImage',
        notEmpty: true,
      },
      isCurrent: {
        // not set type
        // type: 'number',
        ebType: 'toggle',
        ebTitle: 'IsCurrent',
        ebReadOnly: true,
        ebDisplay: {
          host: {
            stage: 'formal',
          },
        },
      },
    },
  };
  // loginBackImage search
  schemas.loginBackImageSearch = {
    type: 'object',
    properties: {},
  };
  return schemas;
};


/***/ }),

/***/ 232:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const loginBackImage = __webpack_require__(475);

module.exports = app => {
  const schemas = {};
  // loginBackImage
  Object.assign(schemas, loginBackImage(app));
  // ok
  return schemas;
};


/***/ }),

/***/ 59:
/***/ ((module) => {

module.exports = app => {
  class BackImageController extends app.Controller {
    async setCurrent() {
      const res = await this.ctx.service.backImage.setCurrent({
        key: this.ctx.request.body.key,
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
    async getCurrent() {
      const res = await this.ctx.service.backImage.getCurrent({
        user: this.ctx.state.user.op,
      });
      this.ctx.success(res);
    }
  }

  return BackImageController;
};


/***/ }),

/***/ 95:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const backImage = __webpack_require__(59);
module.exports = app => {
  const controllers = { backImage };
  return controllers;
};


/***/ }),

/***/ 421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const config = __webpack_require__(76);
const locales = __webpack_require__(25);
const errors = __webpack_require__(624);

module.exports = app => {
  // aops
  const aops = __webpack_require__(224)(app);
  // beans
  const beans = __webpack_require__(187)(app);
  // routes
  const routes = __webpack_require__(825)(app);
  // controllers
  const controllers = __webpack_require__(95)(app);
  // services
  const services = __webpack_require__(214)(app);
  // models
  const models = __webpack_require__(230)(app);
  // meta
  const meta = __webpack_require__(458)(app);

  return {
    aops,
    beans,
    routes,
    controllers,
    services,
    models,
    config,
    locales,
    errors,
    meta,
  };
};


/***/ }),

/***/ 458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  // schemas
  const schemas = __webpack_require__(232)(app);
  // static
  const staticLayouts = __webpack_require__(512)(app);
  const staticResources = __webpack_require__(429)(app);
  // meta
  const meta = {
    base: {
      atoms: {
        loginBackImage: {
          info: {
            bean: 'loginBackImage',
            title: 'LoginBackImage',
            tableName: 'bzLoginBackImage',
            language: false,
            category: false,
            tag: false,
            comment: false,
            attachment: false,
            layout: {
              config: {
                atomList: 'layoutAtomListLoginBackImage',
              },
            },
          },
          actions: {
            setCurrent: {
              code: 101,
              title: 'SetCurrent',
              actionModule: moduleInfo.relativeName,
              actionComponent: 'action',
              icon: { f7: '::radio-button-unchecked' },
              enableOnOpened: true,
              directShowOnList: true,
              directShowOnItem: true,
              stage: 'formal',
            },
          },
          validator: 'loginBackImage',
          search: {
            validator: 'loginBackImageSearch',
          },
        },
      },
      statics: {
        'a-baselayout.layout': {
          items: staticLayouts,
        },
        'a-base.resource': {
          items: staticResources,
        },
      },
    },
    validation: {
      validators: {
        loginBackImage: {
          schemas: 'loginBackImage',
        },
        loginBackImageSearch: {
          schemas: 'loginBackImageSearch',
        },
      },
      keywords: {},
      schemas,
    },
    index: {
      indexes: {
        bzLoginBackImage: 'createdAt,updatedAt,atomId',
      },
    },
  };
  return meta;
};


/***/ }),

/***/ 701:
/***/ ((module) => {

module.exports = app => {
  class LoginBackImage extends app.meta.Model {
    constructor(ctx) {
      super(ctx, { table: 'bzLoginBackImage', options: { disableDeleted: false } });
    }
  }
  return LoginBackImage;
};


/***/ }),

/***/ 230:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const loginBackImage = __webpack_require__(701);

module.exports = app => {
  const models = {
    loginBackImage,
  };
  return models;
};


/***/ }),

/***/ 825:
/***/ ((module) => {

module.exports = app => {
  const routes = [
    // backImage
    {
      method: 'post',
      path: 'backImage/setCurrent',
      controller: 'backImage',
      meta: { right: { type: 'atom', atomClass: 'bz-login:loginBackImage', action: 'setCurrent' } },
    },
    {
      method: 'get',
      path: 'backImage/current',
      action: 'getCurrent',
      controller: 'backImage',
    },
  ];
  return routes;
};


/***/ }),

/***/ 725:
/***/ ((module) => {

module.exports = app => {
  class BackImage extends app.Service {
    async setCurrent({ key, user }) {
      // get old
      let keyOld;
      const itemOld = await this.ctx.model.loginBackImage.get({
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
      await this.ctx.model.loginBackImage.update({
        id: key.itemId,
        isCurrent: 1,
      });
      if (keyOld) {
        await this.ctx.model.loginBackImage.update({
          id: keyOld.itemId,
          isCurrent: 0,
        });
      }
      // ok
      return { key, keyOld };
    }

    async getCurrent({ user }) {
      return await this.ctx.model.loginBackImage.get({
        isCurrent: 1,
      });
    }
  }

  return BackImage;
};


/***/ }),

/***/ 214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const backImage = __webpack_require__(725);
module.exports = app => {
  const services = { backImage };
  return services;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(421);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=backend.js.map