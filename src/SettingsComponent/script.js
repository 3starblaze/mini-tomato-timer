import globalData from '../globalData.ts';
import bus from '../bus.ts';

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
    notificationIsEnabled() {
      return globalData.notificationPermission === 'granted';
    },
  },
};
