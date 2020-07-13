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
    data: () => ({
        notificationPermission: Notification.permission,
    }),
    watch: {
        notificationPermission: function(newPermission) {
            bus.$emit('notificationChange', newPermission);
        }
    },
}
