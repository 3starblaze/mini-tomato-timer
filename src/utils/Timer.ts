interface StopCallback {
  (): unknown;
}

interface TickCallback {
  (time: number): unknown;
}

export default class Timer {
  private stopCallback: StopCallback | null;

  private tickCallback: TickCallback | null;

  private tickRate: number;

  private currentTickerId: number | null;

  private stopTime: number | null;

  private frozenCurrentTime: number;

  private playState: 'playing' | 'stopped';

  constructor(
    currentTime: number,
    stopCallback: StopCallback | null = null,
    tickCallback: TickCallback | null = null,
    tickRate = 100,
  ) {
    if (currentTime < 0) throw new Error('currentTime can\'t be negative');
    if (typeof currentTime !== 'number') {
      throw new Error('currenTime is not a number');
    }

    this.frozenCurrentTime = currentTime;
    this.stopCallback = stopCallback;
    this.tickCallback = tickCallback;
    this.tickRate = tickRate;
    this.currentTickerId = null;
    this.stopTime = null;
    this.playState = 'stopped';
  }

  private stopTick(): void {
    if (this.currentTickerId !== null) {
      clearInterval(this.currentTickerId);
      this.currentTickerId = null;
    }
  }

  private startTick(): void {
    this.stopTick();

    this.currentTickerId = window.setInterval(() => {
      if (this.currentTime <= 0) {
        this.stopTick();
        if (this.stopCallback !== null) {
          this.stopCallback();
        }
      }
      if (this.tickCallback !== null) this.tickCallback(this.currentTime);
    }, this.tickRate);
  }

  get currentTime(): number {
    if (this.playState === 'playing' && this.stopTime !== null) {
      const calculatedTime = this.stopTime - Date.now();
      this.frozenCurrentTime = calculatedTime >= 0 ? calculatedTime : 0;
    }
    return this.frozenCurrentTime;
  }

  set currentTime(ms: number) {
    if (typeof ms !== 'number') {
      throw new Error('`currentTime` is not a number!');
    }
    this.frozenCurrentTime = ms;
  }

  play(): void {
    if (this.playState === 'playing') return;
    this.stopTime = Date.now() + this.frozenCurrentTime;
    this.playState = 'playing';
    this.startTick();
  }

  stop(): void {
    if (this.playState === 'stopped') return;
    this.playState = 'stopped';
    this.stopTick();
  }

  reset(ms: number): void {
    this.stop();
    this.currentTime = ms;
  }
}
