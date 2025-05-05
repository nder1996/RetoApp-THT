import { PLATFORM } from 'aurelia-pal';
import { FrameworkConfiguration } from 'aurelia-framework';
import { TaskRepository } from '../task/infrastructure/repositories/';
import { ITaskRepository } from './core/interfaces/task-repository.interface';
import { TaskService } from './application/services/task.service';

// Esta función será llamada por Aurelia cuando se cargue el módulo
export function configure(config: FrameworkConfiguration) {
  // Registra componentes UI que deben estar disponibles globalmente
  config.globalResources([
    PLATFORM.moduleName('./resources/components/crud-task/crud-task')
  ]);
  
  // Registra servicios en el contenedor de inyección de dependencias
  const container = config.container;
  container.registerSingleton(ITaskRepository, TaskRepository);
  container.registerSingleton(TaskService);
}

// Exportaciones públicas del módulo
export * from './core/models/task.model';
export * from './application/dtos/request/TaskRequest';
export * from './application/dtos/response/TaskResponse';