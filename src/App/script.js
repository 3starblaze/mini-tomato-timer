export default {
    name: 'App',
    data: () => ({
        currentTime: 25 * 1000 * 60,
        currentTimerId: null,
    }),
    computed: {
        formattedTime: function() {
            let minutes = String(Math.floor(this.currentTime / 1000 / 60))
            minutes = (minutes.length == 1 ? '0' : '') + minutes
            let seconds = String(Math.floor(this.currentTime / 1000 % 60))
            seconds = (seconds.length == 1 ? '0' : '') + seconds
            return `${minutes}:${seconds}`;
        },
    },
    methods: {
        startTicking: function(minutes) {
            this.currentTime = minutes * 1000 * 60;
            if (this.currentTimerId) clearInterval(this.currentTimerId);

            this.currentTimerId = setInterval(() => {
                this.currentTime -= 1000;
            }, 1000);
        },
    }
}
