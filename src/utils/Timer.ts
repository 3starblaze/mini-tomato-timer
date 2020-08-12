interface StopCallback {
  (): unknown;
}

interface TickCallback {
  (time: number): unknown;
}

export default class Timer {
  _stopCallback: StopCallback | null;

  _tickCallback: TickCallback | null;

  _tickRate: number;

  _currentTickerId: number | null;

  _stopTime: number | null;

  constructor(
    stopCallback: StopCallback | null = null,
    tickCallback: TickCallback | null = null,
    tickRate = 100,
  ) {
    this._stopCallback = stopCallback;
    this._tickCallback = tickCallback;
    this._tickRate = tickRate;
    this._currentTickerId = null;
    this._stopTime = null;
  }

  _stopTick(): void {
    if (this._currentTickerId !== null) {
      clearInterval(this._currentTickerId);
      this._currentTickerId = null;
    }
  }

  _startTick(): void {
    this._stopTick();

    this._currentTickerId = window.setInterval(() => {
      if (this.currentTime <= 0) {
        this._stopTick();
        if (this._stopCallback !== null) {
          this._stopCallback();
        }
      }

      if (this._tickCallback !== null) this._tickCallback(this.currentTime);
    }, this._tickRate);
  }

  get currentTime(): number {
    return this._stopTime - Date.now();
  }

  start(minutes: number): void {
    this._stopTime = Date.now() + minutes * 1000 * 60;
    this._startTick();
  }
}
