import { TaskRequest } from "modules/task/application/dtos/request/TaskRequest";
import { TaskResponse } from "modules/task/application/dtos/response/TaskResponse";
import { TaskRepository } from "modules/task/infrastructure/repositories/task-repository.impl";
import { inject } from 'aurelia-framework';
import * as bootstrap from 'bootstrap';



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
  public selectDetele: TaskResponse = new TaskResponse();
  public selectEdit: ITask;
  public listStatus: ITaskStatus[] = [];
  public EditModal: boolean = false;

  public modalDataForm: TaskRequest = new TaskRequest();

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

  // Formatea la fecha para el input datetime-local
  formatDateForInput(date) {
    if (!date) return '';
    
    try {
      const d = new Date(date);
      
      // Verificar si la fecha es válida
      if (isNaN(d.getTime())) {
        console.error('Fecha inválida en formatDateForInput:', date);
        return '';
      }
      
      // Formato YYYY-MM-DDThh:mm
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  }

  // Actualiza la fecha cuando cambia el input
  updateDueDate(value) {
    if (value) {
      this.modalDataForm.DueDate = new Date(value);
    }
  }

  // Actualiza el método getTomorrowDate para incluir la hora
  /*getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}T00:00`;
  }
*/
  formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }




  editTask(task) {
    this.modalDataForm = new TaskRequest();
    this.modalDataForm.Id = task.id;
    this.modalDataForm.Title = task.title;
    this.modalDataForm.Description = task.description;
    this.modalDataForm.Status = task.Status;
    this.modalDataForm.DueDate = task.dueDate.split('T')[0]
    this.modalDataForm.State = "A"
    this.EditModal = true;
    console.log("abrio TASK EDIAT : ",JSON.stringify(task ))
  }
  


  addTask() {
    this.EditModal = false;
    this.modalDataForm = new TaskRequest();
   // console.log('Editando tarea:', task);
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
    this.modalDataForm.DueDate = new Date()
    this.modalDataForm.State = "A";
    this.modalDataForm.Id = 1;
    console.log("Crear tarea:", JSON.stringify(this.modalDataForm));
    this.agregarTarea(this.modalDataForm);
  }

  updateTask() {
    console.log("Ediar tarea:", JSON.stringify(this.modalDataForm));
    this.actualizarTarea(this.modalDataForm.Id, this.modalDataForm);
  }

  /* ========================= CONSUMO DE APIS ==================================== */
  async cargarTareas() {
    try {
      const response = await this.taskRepository.getAllTask();
      if (response) {
        this.listTasks = response;
        //console.log("lista de cargar Tareas : "+JSON.stringify(this.listTasks))
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
      // Aquí pondrías lógica para mostrar errores en la UI si es necesario
    }
  }

  async agregarTarea(nuevaTarea: TaskRequest) {
    try {
      await this.taskRepository.insert(nuevaTarea);
      // Cerrar modal usando Bootstrap
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }

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
