module.exports = app => {
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
                // atomList: 'layoutAtomListLoginBackImage',
              },
            },
          },
          actions: {},
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
