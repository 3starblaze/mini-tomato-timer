import bus from '../bus';
import SettingsComponent from '../SettingsComponent/index.vue';
import ControlBarComponent from '../ControlBarComponent/index.vue';

export default {
  name: 'App',
  components: {
    settings: SettingsComponent,
    'control-bar': ControlBarComponent,
  },
  created() {
    bus.$on('askNotification', () => {
      Notification.requestPermission().then((result) => {
        this.notificationPermission = result;
      });
    });
  },
  mounted() {
    // Global key press handler
    window.addEventListener('keypress', (e) => {
      if (e.key === this.pureViewShortcut) this.pureView = !this.pureView;
    });
    bus.$emit('pureViewShortcutChange', this.pureViewShortcut);
  },
  data: () => ({
    notificationPermission: Notification.permission,
    pureView: false,
    pureViewShortcut: 'p',
  }),
  watch: {
    notificationPermission(newPermission) {
      bus.$emit('notificationChange', newPermission);
    },
    pureViewShortcut(newPureViewShortcut) {
      bus.$emit('pureViewShortcutChange', newPureViewShortcut);
    },
  },
};
