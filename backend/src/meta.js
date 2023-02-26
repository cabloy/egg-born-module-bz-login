module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  // schemas
  const schemas = require('./config/validation/schemas.js')(app);
  // static
  const staticLayouts = require('./config/static/layouts.js')(app);
  const staticResources = require('./config/static/resources.js')(app);
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
