module.exports = app => {
  class Atom extends app.meta.AtomBase {
    async create({ atomClass, item, options, user }) {
      // super
      const key = await super.create({ atomClass, item, options, user });
      // add loginBackImage
      const res = await this.ctx.model.loginBackImage.insert({
        atomId: key.atomId,
      });
      // return key
      return { atomId: key.atomId, itemId: res.insertId };
    }

    async read({ atomClass, options, key, user }) {
      // super
      const item = await super.read({ atomClass, options, key, user });
      if (!item) return null;
      // meta
      this._getMeta(item);
      // ok
      return item;
    }

    async select({ atomClass, options, items, user }) {
      // super
      await super.select({ atomClass, options, items, user });
      // meta
      for (const item of items) {
        this._getMeta(item);
      }
    }

    async write({ atomClass, target, key, item, options, user }) {
      // check demo
      this.ctx.bean.util.checkDemoForAtomWrite();
      // super
      await super.write({ atomClass, target, key, item, options, user });
      // update loginBackImage
      const data = await this.ctx.model.loginBackImage.prepareData(item);
      await this.ctx.model.loginBackImage.update(data);
    }

    async delete({ atomClass, key, options, user }) {
      // super
      await super.delete({ atomClass, key, options, user });
      // delete loginBackImage
      await this.ctx.model.loginBackImage.delete({
        id: key.itemId,
      });
    }

    async checkRightAction({ atom, atomClass, action, options, user }) {
      // super
      const res = await super.checkRightAction({ atom, atomClass, action, options, user });
      if (!res) return res;
      if (atom.atomStage !== 1) return res;
      if (action !== 101) return res;
      // setCurrent
      const item = await this.ctx.model.loginBackImage.get({ id: atom.itemId });
      if (action === 101 && item.isCurrent === 0) return res;
      return null;
    }

    _getMeta(item) {
      const meta = this._ensureItemMeta(item);
      // meta.flags
      // meta.summary
      meta.summary = item.description;
    }
  }

  return Atom;
};
