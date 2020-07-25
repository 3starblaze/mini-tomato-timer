import tmpBeepSound from '../assets/crappy_beep.mp3';
const beepSound = new Audio(tmpBeepSound);
import Timer from '../utils/Timer';

export default {
    name: 'ControlBar',
    data: () => ({
        currentTime: 25 * 1000 * 60,
        timer: null,
        notificationPermission: Notification.permission,
        activeButton: null,
    }),
    created() {
        this.timer = new Timer(this.onTickEnd, this.updateTime);
    },
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
            this.timer.start(minutes);
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
        },
        updateTime(time) {
            this.currentTime = time;
        },
        play() {
            this.timer.play();
        },
        stop() {
            this.timer.stop();
        }
    },
}
