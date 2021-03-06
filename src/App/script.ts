import Vue from 'vue';
import bus from '../bus.ts';
import GlobalDataHandler from '../utils/GlobalDataHandler.ts';
import SettingsComponent from '../SettingsComponent/index.vue';
import ControlBarComponent from '../ControlBarComponent/index.vue';

import { faviconString } from '../GlobalDefinitions.ts';

import defaultFavicon from '../assets/mtm-favicon.png';
import playingFavicon from '../assets/mtm-favicon-playing.png';
import stoppedFavicon from '../assets/mtm-favicon-stopped.png';

const faviconObject = [defaultFavicon, playingFavicon, stoppedFavicon];

export default Vue.extend({
  name: 'App',
  components: {
    settings: SettingsComponent,
    'control-bar': ControlBarComponent,
  },
  created(): void {
    bus.$on('askNotification', () => {
      Notification.requestPermission().then((result) => {
        this.globalData.notificationPermission = result;
      });
    });
    this.changeFavicon(defaultFavicon);
  },
  mounted(): void {
    // Global key press handler
    window.addEventListener('keypress', (e) => {
      if (e.key === this.globalData.pureViewShortcut) {
        this.globalData.pureView = !this.globalData.pureView;
      }
    });
  },
  data: () => ({
    CurrentGlobalDataHandler: new GlobalDataHandler(),
    globalData: (new GlobalDataHandler()).data,
  }),
  watch: {
    globalData: {
      handler: function globalDataWatcher(): void {
        this.CurrentGlobalDataHandler.updatePersistent();
      },
      deep: true,
    },
    'globalData.documentTitle': function documentTitleWatcher(newDocumentTitle: string): void {
      document.title = newDocumentTitle;
    },
    'globalData.faviconType': function faviconTypeWatcher(newFaviconType: faviconString): void {
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
    changeFavicon(iconObject: any): void {
      if (!faviconObject.includes(iconObject)) throw Error('Invalid favicon object');
      const link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = iconObject;
      document.getElementsByTagName('head')[0].appendChild(link);
    },
  },
});
