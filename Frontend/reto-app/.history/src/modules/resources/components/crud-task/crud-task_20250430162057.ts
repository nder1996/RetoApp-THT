import { TaskRequest } from "modules/task/application/dtos/request/TaskRequest";
import { TaskResponse } from "modules/task/application/dtos/response/TaskResponse";
import { TaskRepository } from "modules/task/infrastructure/repositories/task-repository.impl";
import { inject } from 'aurelia-framework';

interface ITaskStatus {
  id: number;
  name: string;
  description: string;
}
interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: ITaskStatus;
  statusClass: string;
}

@inject(TaskRepository)
export class CrudTask {
  public message: string = 'Bienvenido a la Gestión de Tareas';
  public tasks: ITask[] = [];
  public listTasks: TaskResponse[] = [];
  public selectDetele: ITask;
  public selectEdit: ITask;
  public listStatus: ITaskStatus[] = [];
  public EditModal: boolean = false;

  constructor(private taskRepository: TaskRepository) {
    this.initializeList();
  }

  async initializeList() {
    await this.cargarTareas();
    this.listStatus = [
      {
        id: 1,
        name: "Pendiente",
        description: "Tarea que aún no ha sido iniciada y está en espera de asignación o recursos"
      },
      {
        id: 2,
        name: "En Progreso",
        description: "Tarea que se está ejecutando actualmente y tiene avances parciales"
      },
      {
        id: 3,
        name: "Completada",
        description: "Tarea que ha sido finalizada y verificada, cumpliendo todos los requisitos"
      }
    ];
  }

  editTask(task) {
    // Lógica para editar la tarea
    this.EditModal = true;
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


  statusTaskTag(nameStatus: string): string {
    switch (nameStatus) {
      case "PENDIENTE":
        return "text-bg-warning";
      case "EN PROGRESO":
        return "text-bg-info";
      case "COMPLETADO":
        return "text-bg-success";
      default:
        return "text-bg-secondary";
    }
  }

  /* ========================= CONSUMO DE APIS ==================================== */

  async cargarTareas() {
    try {
      const response = await this.taskRepository.getAllTask();
      if (response) {
        this.listTasks = response;
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      // Aquí pondrías lógica para mostrar errores en la UI si es necesario
    }
  }

  async agregarTarea(nuevaTarea: TaskRequest) {
    try {
      await this.taskRepository.insert(nuevaTarea);
      await this.cargarTareas(); // Refresca la lista después de agregar
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  }

  async eliminarTarea(id: number) {
    try {
      await this.taskRepository.inactivateById(id);
      await this.cargarTareas(); // Refresca la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  }

  async actualizarTarea(id: number, tareaActualizada: TaskRequest) {
    try {
      await this.taskRepository.update(id, tareaActualizada);
      await this.cargarTareas();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  }
}
