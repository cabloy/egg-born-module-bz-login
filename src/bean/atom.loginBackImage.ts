const moduleInfo = module.info;
module.exports = class Atom extends module.meta.class.AtomBase {
  get model() {
    return this.ctx.model.module(moduleInfo.relativeName).loginBackImage;
  }

  async default({ atomClass, item, options, user }) {
    // loginBackImage default
    const data = await this.model.default();
    // super
    return await super.default({ atomClass, data, item, options, user });
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

  async create({ atomClass, item, options, user }) {
    // super
    const data = await super.create({ atomClass, item, options, user });
    // add loginBackImage
    data.itemId = await this.model.create(data);
    // data
    return data;
  }

  async write({ atomClass, target, key, item, options, user }) {
    // check demo
    this.ctx.bean.util.checkDemoForAtomWrite();
    // super
    const data = await super.write({ atomClass, target, key, item, options, user });
    // update loginBackImage
    if (key.atomId !== 0) {
      await this.model.write(data);
    }
    // data
    return data;
  }

  async delete({ atomClass, key, options, user }) {
    // super
    await super.delete({ atomClass, key, options, user });
    // delete loginBackImage
    await this.model.delete({
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
    const item = await this.model.get({ id: atom.itemId });
    if (action === 101 && item.isCurrent === 0) return res;
    return null;
  }

  _getMeta(item) {
    const meta = this._ensureItemMeta(item);
    // meta.flags
    // meta.summary
    meta.summary = item.description;
  }
};
