import globalData from '../globalData.ts';

export default class GlobalDataHandler {
  private static _currentInstance: GlobalDataHandler | null = null;

  data: any;

  constructor() {
    const currentInstanceString = GlobalDataHandler._currentInstance ? GlobalDataHandler._currentInstance.toString : 'null';
    if (GlobalDataHandler._currentInstance) return GlobalDataHandler._currentInstance;
    this.data = globalData;
    this.readPersistent();
    GlobalDataHandler._currentInstance = this;
  }

  updatePersistent(): void {
    window.localStorage.setItem('globalData', JSON.stringify(this.data));
  }

  readPersistent(): void {
    const readData: any = JSON.parse(
      localStorage.getItem('globalData') || '{}',
    );
    this.data = { ...this.data, ...readData };
  }
}
