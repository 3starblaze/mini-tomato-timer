import tmpBeepSound from '../assets/crappy_beep.mp3';
const beepSound = new Audio(tmpBeepSound);

export default {
    name: 'ControlBar',
    data: () => ({
        currentTime: 25 * 1000 * 60,
        currentTimerId: null,
        notificationPermission: Notification.permission,
        activeButton: null,
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
            this.activeButton = null;
            new Notification("Time is over!");
            this.beep();
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
        askNotification: function() {
            Notification.requestPermission().then(function(result) {
                this.notificationPermission = result;
            });
        },
        beep() {
            const timesToBeep = 3;
            beepSound.play();
            let timesBeeped = 1;
            beepSound.onended = () => {
                if (timesBeeped < timesToBeep) {
                    beepSound.play();
                    timesBeeped++;
                }
            }
        },
        sessionTick() {
            this.startTicking(25);
            this.activeButton = 'session';
        },
        shortBreakTick() {
            this.startTicking(5);
            this.activeButton = 'shortBreak';
        },
        longBreakTick() {
            this.startTicking(10);
            this.activeButton = 'longBreak';
        }
    },
}
