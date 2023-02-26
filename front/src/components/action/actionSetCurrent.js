export default {
  methods: {
    async _onActionSetCurrent() {
      const { ctx, item } = this.$props;
      const key = { atomId: item.atomId, itemId: item.itemId };
      await ctx.$view.dialog.confirm();
      await ctx.$api.post('/bz/login/backImage/setCurrent', { key });
      ctx.$meta.eventHub.$emit('atom:action', { key, action: { name: 'save' } });
      return true;
    },
  },
};
