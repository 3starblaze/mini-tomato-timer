import Vue from 'vue';
import GlobalDataHandler from '../utils/GlobalDataHandler.ts';
import bus from '../bus.ts';

export default Vue.extend({
  name: 'Settings',
  data: () => ({
    globalData: (new GlobalDataHandler()).data,
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
});
