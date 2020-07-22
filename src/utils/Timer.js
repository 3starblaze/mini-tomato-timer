export default class Timer {
    constructor(onStopCallback=null) {
        this.onStopCallback = onStopCallback;
    }

    start(minutes) {
        this.currentTime = minutes * 1000 * 60;

        this.currentTimerId = setInterval(() => {
            this.currentTime -= 1000;

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
