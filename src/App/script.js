import bus from '../bus';
import GlobalDataHandler from '../utils/GlobalDataHandler.ts';
import SettingsComponent from '../SettingsComponent/index.vue';
import ControlBarComponent from '../ControlBarComponent/index.vue';

import defaultFavicon from '../assets/mtm-favicon.png';
import playingFavicon from '../assets/mtm-favicon-playing.png';
import stoppedFavicon from '../assets/mtm-favicon-stopped.png';

export default {
  name: 'App',
  components: {
    settings: SettingsComponent,
    'control-bar': ControlBarComponent,
  },
  created() {
    bus.$on('askNotification', () => {
      Notification.requestPermission().then((result) => {
        this.globalData.notificationPermission = result;
      });
    });
    this.changeFavicon(defaultFavicon);
    this.globalData = this.CurrentGlobalDataHandler.data;
  },
  mounted() {
    // Global key press handler
    window.addEventListener('keypress', (e) => {
      if (e.key === this.globalData.pureViewShortcut) {
        this.globalData.pureView = !this.globalData.pureView;
      }
    });
  },
  data: () => ({
    CurrentGlobalDataHandler: new GlobalDataHandler(),
    globalData: null,
  }),
  watch: {
    globalData: {
      handler: function globalDataWatcher() {
        this.CurrentGlobalDataHandler.updatePersistent();
      },
      deep: true,
    },
    'globalData.documentTitle': function documentTitleWatcher(newDocumentTitle) {
      document.title = newDocumentTitle;
    },
    'globalData.faviconType': function faviconTypeWatcher(newFaviconType) {
      switch (newFaviconType) {
        case 'playing':
          this.changeFavicon(playingFavicon);
          break;
        case 'stopped':
          this.changeFavicon(stoppedFavicon);
          break;
        default:
          this.changeFavicon(defaultFavicon);
          break;
      }
    },
  },
  methods: {
    changeFavicon(iconObject) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = iconObject;
      document.getElementsByTagName('head')[0].appendChild(link);
    },
  },
};
