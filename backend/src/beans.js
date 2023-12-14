const versionManager = require('./bean/version.manager.js');
const atomLoginBackImage = require('./bean/atom.loginBackImage.js');

module.exports = app => {
  const beans = {
    // version
    'version.manager': {
      mode: 'app',
      bean: versionManager,
    },
    // atom
    'atom.loginBackImage': {
      bean: atomLoginBackImage,
    },
  };
  return beans;
};
