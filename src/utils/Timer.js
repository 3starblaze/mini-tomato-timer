export default class Timer {
    constructor(onStopCallback=null, tickCallback=null, updateRate=100) {
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

    start(minutes) {
        this.currentTime = minutes * 1000 * 60;
        this.clearTimer();

        this.currentTimerId = setInterval(() => {
            this.currentTime -= this.updateRate;
            if (this.tickCallback !== null) this.tickCallback(this.currentTime);

            if (this.currentTime <= 0) {
                this.currentTime = 0;
                clearInterval(this.currentTimerId);
                this.currentTimerId = null;
                if (this.onStopCallback !== null) {
                    this.onStopCallback();
                }
            }
        }, this.updateRate);
    }

    stop() {
        this.clearTimer();
    }
}
