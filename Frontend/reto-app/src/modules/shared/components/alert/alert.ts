import { bindable, inject } from 'aurelia-framework';
import { AlertService } from '../../services/alert-service';

@inject(AlertService)
export class Alert {
  @bindable position: string = 'top-right'; // Options: top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  
  constructor(private alertService: AlertService) {}
  
  get alerts() {
    return this.alertService.getAlerts();
  }
  
  dismiss(id: number) {
    this.alertService.dismiss(id);
  }
  
  getPositionClass() {
    switch (this.position) {
      case 'top-right': return 'position-fixed top-0 end-0 p-3';
      case 'top-left': return 'position-fixed top-0 start-0 p-3';
      case 'bottom-right': return 'position-fixed bottom-0 end-0 p-3';
      case 'bottom-left': return 'position-fixed bottom-0 start-0 p-3';
      case 'top-center': return 'position-fixed top-0 start-50 translate-middle-x p-3';
      case 'bottom-center': return 'position-fixed bottom-0 start-50 translate-middle-x p-3';
      default: return 'position-fixed top-0 end-0 p-3';
    }
  }
}