import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('modules/resources/index'))
    .feature(PLATFORM.moduleName('modules/shared/index'))
    //.plugin('aurelia-bootstrap-datepicker');


  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.container.registerSingleton(AlertService);

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
