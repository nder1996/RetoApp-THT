interface ITaskStatus {
  id: number;
  name: string;
  description: string;
}
interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: ITaskStatus;
  statusClass: string;
}

export class CrudTask {
  message: string = 'Bienvenido a la Gestión de Tareas';
  tasks: any[] = [];
  public selectDetele: ITask;
  public selectEdit: any;
  public listStatus: any[] = []

  constructor() {
    this.initializeList();
  }

  initializeList() {
    this.tasks = [
       {
    id: 1,
    title: 'Interface Design',
    description: 'Create wireframes for the main page',
    dueDate: '05/12/2025',
    status: {
      id: 1,
      name: "Pending",
      description: "Task that has not yet been started and is waiting for assignment or resources"
    },
    statusClass: 'bg-warning'
  },
  {
    id: 2,
    title: 'Backend Development',
    description: 'Implement REST API for user management',
    dueDate: '05/18/2025',
    status: {
      id: 2,
      name: "In Progress",
      description: "Task that is currently being executed and has partial advances"
    },
    statusClass: 'bg-info'
  },
  {
    id: 3,
    title: 'Testing',
    description: 'Perform unit tests of the authentication module',
    dueDate: '05/25/2025',
    status: {
      id: 3,
      name: "Completed",
      description: "Task that has been finished and verified, meeting all requirements"
    },
    statusClass: 'bg-success'
  }
    ];
    this.listStatus = [
      {
        id: 1,
        name: "Pendiente",
        description: "Tarea que aún no ha sido iniciada y está en espera de asignación o recursos"
      },
      {
        id: 2,
        nombre: "En Progreso",
        description: "Tarea que se está ejecutando actualmente y tiene avances parciales"
      },
      {
        id: 3,
        nombre: "Completada",
        description: "Tarea que ha sido finalizada y verificada, cumpliendo todos los requisitos"
      }
    ];
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

 


  prepareDelete(task) {
    // this.taskToDelete = task;
    // Si necesitas hacer logging
    this.selectDetele = task;
    console.log('Preparando para eliminar:', task);
  }
}
