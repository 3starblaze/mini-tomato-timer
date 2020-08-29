import GlobalDataHandler from '../utils/GlobalDataHandler.ts';
import bus from '../bus.ts';

export default {
  name: 'Settings',
  data: () => ({
    globalData: GlobalDataHandler.data,
    visible: false,
  }),
  methods: {
    toggleVisibility() {
      this.visible = !this.visible;
    },
    askNotification() {
      bus.$emit('askNotification');
    },
    notificationIsEnabled() {
      return this.globalData.notificationPermission === 'granted';
    },
  },
};
