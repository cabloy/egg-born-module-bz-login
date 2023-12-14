module.exports = class LoginBackImage extends module.meta.class.Model {
  constructor() {
    super({ table: 'bzLoginBackImage', options: { disableDeleted: false } });
  }
};
