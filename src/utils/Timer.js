export default class Timer {
  constructor(onStopCallback = null, tickCallback = null, tickRate = 100) {
    this._onStopCallback = onStopCallback;
    this._tickCallback = tickCallback;
    this._tickRate = tickRate;
    this._currentTickerId = null;
    this._stopTime = null;
  }

  _stopTick() {
    if (this._currentTickerId !== null) {
      clearInterval(this._currentTickerId);
      this._currentTickerId = null;
    }
  }

  _startTick() {
    this._stopTick();

    this._currentTickerId = setInterval(() => {
      if (this.currentTime <= 0) {
        this._stopTick();
        if (this._onStopCallback !== null) {
          this._onStopCallback();
        }
      }

      if (this._tickCallback !== null) this._tickCallback(this.currentTime);
    }, this._tickRate);
  }

  get currentTime() {
    return this._stopTime - Date.now();
  }

  start(minutes) {
    this._stopTime = Date.now() + minutes * 1000 * 60;
    this._startTick();
  }
}
