export default class Timer {
  constructor(onStopCallback = null, tickCallback = null, updateRate = 100) {
    this.onStopCallback = onStopCallback;
    this.tickCallback = tickCallback;
    this.updateRate = updateRate;
  }

  clearTimer() {
    if (this.currentTimerId !== null) {
      clearInterval(this.currentTimerId);
      this.currentTimerId = null;
    }
  }

  scheduleTick() {
    this.clearTimer();

    this.currentTimerId = setInterval(() => {
      this.currentTime -= this.updateRate;

      if (this.currentTime <= 0) {
        this.currentTime = 0;
        this.clearTimer();
        if (this.onStopCallback !== null) {
          this.onStopCallback();
        }
      }

      if (this.tickCallback !== null) this.tickCallback(this.currentTime);
    }, this.updateRate);
  }

  start(minutes) {
    this.currentTime = minutes * 1000 * 60;
    this.play();
  }

  play() {
    if (typeof this.currentTime !== 'undefined') this.scheduleTick();
  }

  stop() {
    this.clearTimer();
  }
}
