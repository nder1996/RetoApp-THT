@noView()
export class AlertService {
  private alerts: Array<{
    message: string;
    type: string;
    timeout: number;
    id: number;
  }> = [];
  private nextId: number = 1;

  // Alert types based on Bootstrap colors
  public readonly TYPES = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    DANGER: 'danger',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    LIGHT: 'light',
    DARK: 'dark'
  };

  getAlerts() {
    return this.alerts;
  }

  /**
   * Show an alert message
   * @param message The message to display
   * @param type The alert type (Bootstrap color)
   * @param timeout Time in ms before auto-dismissing (0 for no auto-dismiss)
   * @returns The ID of the created alert
   */
  show(message: string, type: string = 'info', timeout: number = 5000): number {
    const id = this.nextId++;
    const alert = { message, type, timeout, id };
    this.alerts.push(alert);

    if (timeout > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, timeout);
    }

    return id;
  }

  /**
   * Show a success alert
   */
  success(message: string, timeout: number = 5000): number {
    return this.show(message, this.TYPES.SUCCESS, timeout);
  }

  /**
   * Show an info alert
   */
  info(message: string, timeout: number = 5000): number {
    return this.show(message, this.TYPES.INFO, timeout);
  }

  /**
   * Show a warning alert
   */
  warning(message: string, timeout: number = 5000): number {
    return this.show(message, this.TYPES.WARNING, timeout);
  }

  /**
   * Show a danger/error alert
   */
  danger(message: string, timeout: number = 5000): number {
    return this.show(message, this.TYPES.DANGER, timeout);
  }

  /**
   * Dismiss a specific alert by ID
   */
  dismiss(id: number): void {
    const index = this.alerts.findIndex(alert => alert.id === id);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }

  /**
   * Dismiss all alerts
   */
  dismissAll(): void {
    this.alerts = [];
  }
}