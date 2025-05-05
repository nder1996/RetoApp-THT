export class CrudTask {
  message: string = 'Bienvenido a la Gestión de Tareas';
  tasks: any[] = [];

  constructor() {
    this.tasks = [
      { id: 1, title: 'Tarea 1', completed: false },
      { id: 2, title: 'Tarea 2', completed: true }
    ];
  }
}
