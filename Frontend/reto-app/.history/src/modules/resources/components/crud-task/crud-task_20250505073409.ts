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

  public modalDataForm:TaskRequest = new TaskRequest();

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

  attached() {
    // Asegúrate que dueDate siempre sea un objeto Date
    if (!(this.modalDataForm.DueDate instanceof Date) && this.modalDataForm.DueDate) {
      this.modalDataForm.DueDate = new Date(this.modalDataForm.DueDate);
    }
  }

  getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
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
    // Clear previous errors
    this.formErrors = {};
    let isValid = true;
    
    // Título - requerido y solo letras, números y espacios
    if (!this.modalDataForm.Title || this.modalDataForm.Title.trim() === '') {
      this.formErrors.title = 'El título es obligatorio';
      isValid = false;
    }
   /* } else if (!/^[a-zA-Z0-9\s]{3,50}$/.test(this.modalDataForm.title)) {
      this.formErrors.title = 'El título debe tener entre 3-50 caracteres alfanuméricos';
      isValid = false;
    }*/
    
    // Descripción - requerida y longitud mínima
    if (!this.modalDataForm.Description || this.modalDataForm.Description.trim() === '') {
      this.formErrors.description = 'La descripción es obligatoria';
      isValid = false;
    } else if (this.modalDataForm.Description.length < 10) {
      this.formErrors.description = 'La descripción debe tener al menos 10 caracteres';
      isValid = false;
    }
    
    // Fecha - requerida y formato correcto
    if (!this.modalDataForm.DueDate) {
      this.formErrors.dueDate = 'La fecha es obligatoria';
      isValid = false;
    } else {
      const dateStr = this.modalDataForm.DueDate instanceof Date ? 
        this.modalDataForm.DueDate.toISOString().split('T')[0] : 
        String(this.modalDataForm.DueDate);
        
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        this.formErrors.DueDate = 'Formato de fecha inválido';
        isValid = false;
      }
    }
    
    // Estado - requerido
    if (!this.modalDataForm.Status) {
      this.formErrors.status = 'El estado es obligatorio';
      isValid = false;
    }
    
    return isValid;
  }

  submitForm() {
    // El formulario ya fue validado en este punto
    
    if (this.EditModal) {
      // Actualizar tarea existente
      this.updateTask();
    } else {
      // Crear nueva tarea
      this.createTask();
    }
    
    // Cerrar modal
    //const modalElement = document.getElementById('exampleModal');
   // const modal = bootstrap.Modal.getInstance(modalElement);
    //modal.hide();
  }
  
  createTask() {
    // Llamada al servicio para crear tarea
   
    this.modalDataForm.State = "A";
    this.modalDataForm.I = "A";
    console.log("Crear tarea:", JSON.stringify(this.modalDataForm) );
    this.agregarTarea(this.modalDataForm);
  }
  
  updateTask() {
    // Llamada al servicio para actualizar tarea
    this.actualizarTarea(0,this.modalDataForm);
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
