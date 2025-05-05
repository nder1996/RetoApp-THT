import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./components/crud-task/crud-task')
    // Agrega aquí otros componentes que quieras registrar globalmente
  ]);
}
