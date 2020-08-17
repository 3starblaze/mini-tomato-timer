import globalData from '../globalData';
import bus from '../bus';

export default {
  name: 'Settings',
  data: () => ({
    globalData,
    visible: false,
  }),
  methods: {
    toggleVisibility() {
      this.visible = !this.visible;
    },
    askNotification() {
      bus.$emit('askNotification');
    },
  },
};
