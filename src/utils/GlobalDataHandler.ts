export default class GlobalDataHandler {
  private static currentInstance: GlobalDataHandler | null = null;

  data: any;

  constructor() {
    if (GlobalDataHandler.currentInstance) return GlobalDataHandler.currentInstance;
    this.data = {
      notificationPermission: Notification.permission,
      pureView: false,
      pureViewShortcut: 'p',
      documentTitle: '',
      faviconType: 'default', // 'default' | 'playing' | 'stopped'
    };
    this.readPersistent();
    GlobalDataHandler.currentInstance = this;
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
