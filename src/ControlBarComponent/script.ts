import Vue from 'vue';
import GlobalDataHandler from '../utils/GlobalDataHandler.ts';
import tmpBeepSound from '../assets/alarm-clock-short.wav';
import PlayButton from '../assets/play.svg';
import StopButton from '../assets/stop.svg';
import Timer from '../utils/Timer.ts';

const beepSound = new Audio(tmpBeepSound);

const minutesToMs = (minutes: number) => minutes * 60000;

type timerMode = 'session' | 'shortBreak' | 'longBreak' | null;
const timerModeTime = {
  session: minutesToMs(25),
  shortBreak: minutesToMs(5),
  longBreak: minutesToMs(10),
};

export default Vue.extend({
  name: 'ControlBar',
  components: {
    PlayButton,
    StopButton,
  },
  data: () => ({
    globalData: (new GlobalDataHandler()).data,
    currentTime: 25 * 1000 * 60,
    timer: null as unknown as Timer,
    activeButton: null as timerMode,
  }),
  created() {
    this.timer = new Timer(this.currentTime, this.onTickEnd, this.updateTime) as Timer;
  },
  computed: {
    formattedTime(): string {
      let minutes = String(Math.floor(this.currentTime / 1000 / 60));
      minutes = (minutes.length === 1 ? '0' : '') + minutes;
      let seconds = String(Math.floor((this.currentTime / 1000) % 60));
      seconds = (seconds.length === 1 ? '0' : '') + seconds;

      const formattedTime = `${minutes}:${seconds}`;
      this.globalData.documentTitle = formattedTime;
      return formattedTime;
    },
  },
  methods: {
    onTickEnd() {
      this.activeButton = null;
      new Notification('Time is over!');
      this.beep();
      this.globalData.faviconType = 'stopped';
    },
    startTicking(ms: number) {
      this.timer.reset(ms);
      this.play();
    },
    askNotification() {
      Notification.requestPermission().then((result) => {
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
    switchTimerMode(timerMode: timerMode) {
      this.activeButton = timerMode;
      if (timerMode === null) return;
      this.startTicking(timerModeTime[timerMode]);
    },
    updateTime(time: number) {
      this.currentTime = time;
    },
    play() {
      this.globalData.faviconType = 'playing';
      this.timer.play();
    },
    stop() {
      this.globalData.faviconType = 'stopped';
      this.timer.stop();
    },
  },
});
