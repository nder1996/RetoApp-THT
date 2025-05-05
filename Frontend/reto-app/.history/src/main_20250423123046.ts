import {Aurelia} from 'aurelia-framework';
import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin('aurelia-bootstrap-datepicker');


  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
