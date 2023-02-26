import LoginBackPC from '../assets/img/login-back-pc.jpg';

export default {
  meta: {
    title: 'Sign In',
  },
  data() {
    return {
      item: null,
      ready: false,
    };
  },
  computed: {
    backgroundImage() {
      if (!this.ready) return null;
      const imageUrl = (this.item && this.item.backImage) || LoginBackPC;
      return `url(${imageUrl})`;
    },
  },
  created() {
    this._load();
  },
  methods: {
    async _load() {
      this.item = await this.$api.get('backImage/current');
      this.ready = true;
    },
    _renderTitle() {
      return null;
    },
    _renderMenu() {
      return null;
    },
    _renderBody() {
      const options = {
        props: {
          showTitle: true,
        },
      };
      return (
        <div class="login-wrapper">
          <eb-component module="a-login" name="login" options={options}></eb-component>
        </div>
      );
    },
    _renderFooter() {},
  },
  render() {
    const style = {};
    if (this.backgroundImage) {
      style.backgroundImage = this.backgroundImage;
    }
    return (
      <eb-page no-toolbar={false} no-navbar={true} no-swipeback={true} style={style}>
        {this._renderTitle()}
        {this._renderMenu()}
        {this._renderBody()}
        {this._renderFooter()}
      </eb-page>
    );
  },
};
