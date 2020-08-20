import globalData from '../globalData';

export default class GlobalDataHandler {
  data: unknown;

  constructor() {
    this.data = globalData;
  }

  updatePersistent(): void {
    window.localStorage.setItem('globalData', JSON.stringify(this.data));
  }

  readPersistent(): void {
    const readData = JSON.parse(window.localStorage.getItem('globalData'));
    this.data = { ...this.data, ...readData };
  }
}
