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

  _frozenCurrentTime: number;

  _playState: 'playing' | 'stopped';

  constructor(
    currentTime: number,
    stopCallback: StopCallback | null = null,
    tickCallback: TickCallback | null = null,
    tickRate = 100,
  ) {
    this._frozenCurrentTime = currentTime;
    this._stopCallback = stopCallback;
    this._tickCallback = tickCallback;
    this._tickRate = tickRate;
    this._currentTickerId = null;
    this._stopTime = null;
    this._playState = 'stopped';
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
    if (this._playState === 'playing' && this._stopTime !== null) {
      this._frozenCurrentTime = this._stopTime - Date.now();
    }
    return this._frozenCurrentTime;
  }

  set currentTime(ms: number) {
    if (typeof ms !== 'number') {
      throw new Error('`currentTime` is not a number!');
    }
    this._frozenCurrentTime = ms;
  }

  play(): void {
    if (this._playState === 'playing') return;
    this._stopTime = Date.now() + this._frozenCurrentTime;
    this._playState = 'playing';
    this._startTick();
  }

  stop(): void {
    if (this._playState === 'stopped') return;
    this._playState = 'stopped';
    this._stopTick();
  }

  reset(ms: number): void {
    this.stop();
    this.currentTime = ms;
  }
}
