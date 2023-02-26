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
      if (this.action.name === 'setCurrent') {
        return await this._onActionSetCurrent();
      }
    },
  },
};
