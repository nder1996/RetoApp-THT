import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class App {
  public message = 'hola pppcsdasdfasdfasdf2222!';
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Mi Aplicación Aurelia';
    config.map([
      {
        route: ['', 'task'],
        name: 'crud-task',
        moduleId: PLATFORM.moduleName('modules/resources/components/crud-task/crud-task'),
        nav: true,
        title: 'Gestión de Tareas'
      }
    ]);
  }
}
