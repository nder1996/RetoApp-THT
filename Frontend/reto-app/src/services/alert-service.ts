export class AlertService {
  alerts = [];
  nextId = 1;
  
  show(message, type = 'info', timeout = 5000) {
    const id = this.nextId++;
    const alert = { id, message, type, timeout };
    this.alerts.push(alert);
    
    if (timeout > 0) {
      setTimeout(() => this.dismiss(id), timeout);
    }
    
    return id;
  }
  
  success(message, timeout = 5000) {
    return this.show(message, 'success', timeout);
  }
  
  info(message, timeout = 5000) {
    return this.show(message, 'info', timeout);
  }
  
  warning(message, timeout = 5000) {
    return this.show(message, 'warning', timeout);
  }
  
  danger(message, timeout = 5000) {
    return this.show(message, 'danger', timeout);
  }
  
  dismiss(id) {
    const index = this.alerts.findIndex(a => a.id === id);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }
}