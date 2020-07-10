export default {
    name: 'Settings',
    data: () => ({
        visible: false,
    }),
    methods: {
        toggleVisibility() {
            this.visible = !this.visible;
        }
    },
}
