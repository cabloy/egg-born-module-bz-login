const versionManager = require('./bean/version.manager.js');
const atomLoginBackImage = require('./bean/atom.loginBackImage.js');

module.exports = {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.loginBackImage': {
    bean: atomLoginBackImage,
  },
};