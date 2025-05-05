import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('components/crud-task/crud-task')
  ]);
}
