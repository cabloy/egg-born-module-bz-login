module.exports = app => {
  class LoginBackImage extends app.meta.Model {
    constructor(ctx) {
      super(ctx, { table: 'bzLoginBackImage', options: { disableDeleted: false } });
    }
  }
  return LoginBackImage;
};
