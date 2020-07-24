export default class Timer {
    constructor(onStopCallback=null, tickCallback=null) {
        this.onStopCallback = onStopCallback;
        this.tickCallback = tickCallback;
    }

    start(minutes) {
        this.currentTime = minutes * 1000 * 60;

        if (this.currentTimerId !== null) {
            clearInterval(this.currentTimerId);
        }
        this.currentTimerId = setInterval(() => {
            this.currentTime -= 1000;
            if (this.tickCallback !== null) this.tickCallback(this.currentTime);

            if (this.currentTime <= 0) {
                this.currentTime = 0;
                clearInterval(this.currentTimerId);
                this.currentTimerId = null;
                if (this.onStopCallback !== null) {
                    this.onStopCallback();
                }
            }
        }, 1000);
    }
}
