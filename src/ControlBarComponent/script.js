import globalData from '../globalData';
import tmpBeepSound from '../assets/alarm-clock-short.wav';
import PlayButton from '../assets/play.svg';
import StopButton from '../assets/stop.svg';
import Timer from '../utils/Timer.ts';

const beepSound = new Audio(tmpBeepSound);

const minutesToMs = (minutes) => minutes * 60000;

const timerModeTime = {
  session: minutesToMs(25),
  shortBreak: minutesToMs(5),
  longBreak: minutesToMs(10),
};

export default {
  name: 'ControlBar',
  components: {
    PlayButton,
    StopButton,
  },
  data: () => ({
    globalData,
    currentTime: 25 * 1000 * 60,
    timer: null,
    activeButton: null,
  }),
  created() {
    this.timer = new Timer(this.currentTime, this.onTickEnd, this.updateTime);
  },
  computed: {
    formattedTime() {
      let minutes = String(Math.floor(this.currentTime / 1000 / 60));
      minutes = (minutes.length === 1 ? '0' : '') + minutes;
      let seconds = String(Math.floor((this.currentTime / 1000) % 60));
      seconds = (seconds.length === 1 ? '0' : '') + seconds;
      return `${minutes}:${seconds}`;
    },
  },
  methods: {
    onTickEnd() {
      this.activeButton = null;
      new Notification('Time is over!');
      this.beep();
    },
    startTicking(ms) {
      this.timer.reset(ms);
      this.play();
    },
    askNotification() {
      Notification.requestPermission().then(function setPermission(result) {
        this.globalData.notificationPermission = result;
      });
    },
    beep() {
      const timesToBeep = 3;
      beepSound.play();
      let timesBeeped = 1;
      beepSound.onended = () => {
        if (timesBeeped < timesToBeep) {
          beepSound.play();
          timesBeeped += 1;
        }
      };
    },
    switchTimerMode(timerMode) {
      this.activeButton = timerMode;
      this.startTicking(timerModeTime[timerMode]);
    },
    updateTime(time) {
      this.currentTime = time;
    },
    play() {
      this.timer.play();
    },
    stop() {
      this.timer.stop();
    },
  },
};
