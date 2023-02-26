export default {
  meta: {
    global: false,
  },
  props: {
    layoutManager: {
      type: Object,
    },
    layout: {
      type: Object,
    },
    layoutItems: {
      type: Object,
    },
    info: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    _renderCurrent() {
      const { text } = this.info;
      if (text === 0) return null;
      return <f7-icon f7="::done"></f7-icon>;
    },
  },
  render() {
    return <div class="eb-antdv-table-cell">{this._renderCurrent()}</div>;
  },
};
