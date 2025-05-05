import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  public message = 'hola pppcsdasdfasdfasdf2222!';
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Mi Aplicación Aurelia';
    config.map([
      {
        route: ['', 'task'], // Añadir ruta vacía como alias
        name: 'crud-task',
        moduleId: 'resources/components/crud-task/crud-task',
        nav: true,
        title: 'Gestión de Tareas'
      }
    ]);
   // config.mapUnknownRoutes(PLATFORM.moduleName('resources/components/crud-task/crud-task'));
  }
}
