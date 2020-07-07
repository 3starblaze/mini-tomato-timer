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
        onTickEnd: function() {
            console.log("it's over!");
        },
        startTicking: function(minutes) {
            this.currentTime = minutes * 1000 * 60;
            if (this.currentTimerId) clearInterval(this.currentTimerId);

            this.currentTimerId = setInterval(() => {
                this.currentTime -= 1000;

                if (this.currentTime <= 0) {
                    this.currentTime = 0;
                    clearInterval(this.currentTimerId);
                    this.currentTimerId = null;
                    this.onTickEnd();
                }
            }, 1000);
        },
    }
}
