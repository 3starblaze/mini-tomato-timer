import bus from '../bus.js';

export default {
    name: 'Settings',
    data: () => ({
        visible: false,
        notificationPermission: Notification.permission,
        pureViewShortcut: null,
    }),
    created() {
        bus.$on('notificationChange', (value) => {
            this.notificationPermission = value;
        });
        bus.$on('pureViewShortcutChange', (value) => {
            this.pureViewShortcut = value;
        })
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
