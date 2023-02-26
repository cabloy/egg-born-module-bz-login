const loginBackImage = require('./schema/loginBackImage.js');

module.exports = app => {
  const schemas = {};
  // loginBackImage
  Object.assign(schemas, loginBackImage(app));
  // ok
  return schemas;
};
