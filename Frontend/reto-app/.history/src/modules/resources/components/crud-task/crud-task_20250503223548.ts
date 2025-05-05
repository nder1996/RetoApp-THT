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
  public selectDetele: TaskResponse= new TaskResponse();
  public selectEdit: ITask;
  public listStatus: ITaskStatus[] = [];
  public EditModal: boolean = false;

  public modalDataForm:TaskResponse = new TaskResponse();

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



  formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }




  editTask(task) {
    // Crea una copia del objeto task para evitar modificar el original directamente
    this.selectEdit = { ...task };
    
    // Asegúrate de que dueDate sea un objeto Date si viene como string
    if (this.selectEdit.dueDate && typeof this.selectEdit.dueDate === 'string') {
      this.selectEdit.dueDate = new Date(this.selectEdit.dueDate);
    }
    
    this.EditModal = true;
    console.log('Editando tarea:', task);
  }
  

  addTask(task) {
    this.EditModal = false;
    console.log('Editando tarea:', task);
  }

  deleteTask(task) {
    console.log('Eliminando tarea:', task);
    this.eliminarTarea(this.selectDetele);
  }




  async prepareDelete(task) {
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

  /* ========================== VALIDACION DE FORMULARIOS  ==================================== */
  public formErrors: any = {};
  validateForm() {
    let isValid = true;
    const errors = {};
    
    // Título - requerido y solo letras, números y espacios
    if (!this.modalDataForm.title || this.modalDataForm.title.trim() === '') {
      errors.title = 'El título es obligatorio';
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]{3,50}$/.test(this.modalDataForm.title)) {
      errors.title = 'El título debe tener entre 3-50 caracteres alfanuméricos';
      isValid = false;
    }
    
    // Descripción - requerida y longitud mínima
    if (!this.modalDataForm.description || this.modalDataForm.description.trim() === '') {
      errors.description = 'La descripción es obligatoria';
      isValid = false;
    } else if (this.modalDataForm.description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
      isValid = false;
    }
    
    // Fecha - requerida y formato correcto
    if (!this.modalDataForm.dueDate) {
      errors.dueDate = 'La fecha es obligatoria';
      isValid = false;
    } else {
      // Si es un objeto Date, convertirlo a string para validar
      const dateStr = this.modalDataForm.dueDate instanceof Date ? 
        this.modalDataForm.dueDate.toISOString().split('T')[0] : 
        String(this.modalDataForm.dueDate);
        
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        errors.dueDate = 'Formato de fecha inválido';
        isValid = false;
      }
    }
    
    // Estado - requerido
    if (!this.modalDataForm.status) {
      errors.status = 'El estado es obligatorio';
      isValid = false;
    }
    
    this.formErrors = errors;
    return isValid;
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

  async eliminarTarea(task: TaskResponse) {
    try {
      await this.taskRepository.inactivateById(task.id);
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
