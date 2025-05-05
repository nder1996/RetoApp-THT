export class App {
  public message = 'hola pppcsdasdfasdfasdf2222!';
  router: any;

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Mi Aplicación Aurelia';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'home/index', nav: true, title: 'Inicio' },
      { route: 'tareas', name: 'tareas', moduleId: 'crud-task/index', nav: true, title: 'Gestión de Tareas' }

    ]);
  }
}
