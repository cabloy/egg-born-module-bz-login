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
export default schemas;
