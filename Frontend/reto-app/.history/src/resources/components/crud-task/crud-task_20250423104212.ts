export class CrudTask {
  message: string = 'Bienvenido a la Gestión de Tareas';
  tasks: any[] = [];

  constructor() {
  
  }

  inizilitarList(){

  }

  editTask(task) {
    // Lógica para editar la tarea
    this.selectEdit = task;
    console.log('Editando tarea:', task);
  }

  deleteTask(task) {
    // Lógica para eliminar la tarea
    console.log('Eliminando tarea:', task);
    this.selectEdit = task;
    // Podrías hacer algo como:
    // this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  public selectDetele: any;
  public selectEdit: any;
  public listStatus: any[] = []


  prepareDelete(task) {
    // this.taskToDelete = task;
    // Si necesitas hacer logging
    this.selectDetele = task;
    console.log('Preparando para eliminar:', task);
  }
}
