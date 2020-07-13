import bus from '../bus.js';

export default {
    name: 'Settings',
    data: () => ({
        visible: false,
        notificationPermission: Notification.permission,
    }),
    created() {
        bus.$on('notificationChange', (value) => {
            this.notificationPermission = value;
        });
    },
    methods: {
        toggleVisibility() {
            this.visible = !this.visible;
        },
        askNotification() {
            bus.$emit('askNotification');
        },
    },
}
