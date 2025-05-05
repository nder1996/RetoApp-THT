export class App {
  public message = 'hola pppcsdasdfasdfasdf2222!';


  configureRouter(config, router) {
    this.router = router;
    config.title = 'Mi Aplicación Aurelia';
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'home/index', nav: true, title: 'Inicio' },
      { route: 'usuarios', name: 'usuarios', moduleId: 'usuarios/index', nav: true, title: 'Usuarios' }
    ]);
  }
}
