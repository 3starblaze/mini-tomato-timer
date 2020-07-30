import bus from '../bus.js';
import SettingsComponent from '../SettingsComponent/index.vue';
import ControlBarComponent from '../ControlBarComponent/index.vue';

export default {
    name: 'App',
    components: {
        "settings": SettingsComponent,
        "control-bar": ControlBarComponent,
    },
    created() {
        bus.$on('askNotification', () => {
            Notification.requestPermission().then(result => {
                this.notificationPermission = result;
            });
        });
    },
    mounted() {
        // Global key press handler
        window.addEventListener('keypress', (e) => {
            if (e.key === 'p') this.pureView = !this.pureView;
        });
    },
    data: () => ({
        notificationPermission: Notification.permission,
        pureView: false,
    }),
    watch: {
        notificationPermission: function(newPermission) {
            bus.$emit('notificationChange', newPermission);
        }
    },
}
