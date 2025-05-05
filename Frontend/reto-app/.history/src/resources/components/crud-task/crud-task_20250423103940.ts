export class CrudTask {
  message: string = 'Bienvenido a la Gestión de Tareas';
  tasks: any[] = [];

  constructor() {
    this.tasks = [
      {
        id: 1,
        title: 'Diseño de interfaz',
        description: 'Crear wireframes para la página principal',
        dueDate: '12/05/2025',
        status: 'Pendiente',
        statusClass: 'bg-warning'
      },
      {
        id: 2,
        title: 'Desarrollo backend',
        description: 'Implementar API REST para gestión de usuarios',
        dueDate: '18/05/2025',
        status: 'En progreso',
        statusClass: 'bg-info'
      },
      {
        id: 3,
        title: 'Testing',
        description: 'Realizar pruebas unitarias del módulo de autenticación',
        dueDate: '25/05/2025',
        status: 'Completada',
        statusClass: 'bg-success'
      }
    ];
    [
      {
        id: 1,
        nombre: "Pendiente",
        descripcion: "Tarea que aún no ha sido iniciada y está en espera de asignación o recursos"
      },
      {
        id: 2,
        nombre: "En Progreso",
        descripcion: "Tarea que se está ejecutando actualmente y tiene avances parciales"
      },
      {
        id: 3,
        nombre: "Completada",
        descripcion: "Tarea que ha sido finalizada y verificada, cumpliendo todos los requisitos"
      }
    ]
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
  public listStatus


  prepareDelete(task) {
    // this.taskToDelete = task;
    // Si necesitas hacer logging
    this.selectDetele = task;
    console.log('Preparando para eliminar:', task);
  }
}
