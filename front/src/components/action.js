import Vue from 'vue';
import ActionSetCurrent from './action/actionSetCurrent.js';
const ebActionBase = Vue.prototype.$meta.module.get('a-base').options.mixins.ebActionBase;

export default {
  meta: {
    global: false,
  },
  mixins: [
    ebActionBase, //
    ActionSetCurrent,
  ],
  methods: {
    async onAction() {
      const action = this.action;
      const actionName = action.actionName || action.name;
      if (actionName === 'setCurrent') {
        return await this._onActionSetCurrent();
      }
    },
  },
};
