export default {
  methods: {
    async _onActionSetCurrent() {
      const { ctx, item } = this.$props;
      const key = { atomId: item.atomId, itemId: item.itemId };
      const atomClass = {
        module: item.module,
        atomClassName: item.atomClassName,
      };
      await ctx.$view.dialog.confirm();
      const result = await ctx.$api.post('/bz/login/backImage/setCurrent', { key });
      if (result) {
        // new
        ctx.$meta.eventHub.$emit('atom:action', { key, atomClass, action: { name: 'save' } });
        // old
        if (result.keyOld) {
          ctx.$meta.eventHub.$emit('atom:action', { key: result.keyOld, atomClass, action: { name: 'save' } });
        }
      }
      return true;
    },
  },
};
