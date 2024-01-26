import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
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
            actionModule: __ThisModule__,
            actionComponent: 'action',
            icon: { f7: '::radio-button-unchecked' },
            enableOnOpened: null,
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
    validators: {},
    keywords: {},
    schemas,
  },
  index: {
    indexes: {
      bzLoginBackImage: 'createdAt,updatedAt,atomId',
    },
  },
};
export default meta;
