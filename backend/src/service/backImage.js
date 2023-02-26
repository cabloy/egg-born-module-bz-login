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
