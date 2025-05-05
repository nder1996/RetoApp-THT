
import { inject, Injectable } from 'aurelia-framework';
import { environment } from 'environments/environment';
import { TaskRequest } from 'modules/task/application/dtos/request/TaskRequest';
import { TaskResponse } from 'modules/task/application/dtos/response/TaskResponse';
import { ITaskRepository } from 'modules/task/core/interfaces/task-repository.interface';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class TaskRepository implements ITaskRepository {

    constructor(private http: HttpClient) {}


    private apiUrl = `${environment.apiUrl}TaskItem`;

    
    async getAllTask(): Promise<TaskResponse[]> {
        console.log("ruta de api "+this.apiUrl);
        try {
            const response = await this.http.fetch(`${this.apiUrl}`);
            if (!response.ok) {
                throw new Error('Error al obtener tareas');
            }
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error("Error en getAllTask:", error);
            return [];
        }
    }

    async getById(id: number): Promise<TaskResponse> {
        try {
            const response = await this.http.fetch(`${this.apiUrl}/${id}`);  // Corregí la ruta para mantener consistencia
            if (!response.ok) {
                throw new Error(`Error al obtener la tarea con id ${id}`);
            }
            const data = await response.json();
            return data || {} as TaskResponse; // Si data es undefined, retorna objeto vacío
        } catch (error) {
            console.error(`Error en getById para id ${id}:`, error);
            return {} as TaskResponse; // En caso de error, retorna objeto vacío
        }
    }

    async inactivateById(id: number): Promise<string> {
        try {
            const response = await this.http.fetch(`${this.apiUrl}/${id}`, { 
                method: 'DELETE' // Cambiado a DELETE por ser más apropiado para REST
            });
            if (!response.ok) {
                throw new Error('Error al inactivar la tarea');
            }
            return await response.text() || 'Tarea inactivada correctamente';
        } catch (error) {
            console.error(`Error al inactivar tarea ${id}:`, error);
            return 'Error al inactivar la tarea';
        }
     }

     async insert(tareaRequest: TaskRequest): Promise<string> {
        try {
            const response = await this.http.fetch(`${this.apiUrl}`, {
                method: 'POST',
                body: JSON.stringify(tareaRequest),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Error al insertar la tarea');
            }
            return await response.text() || 'Tarea insertada correctamente';
        } catch (error) {
            console.error("Error al insertar tarea:", error);
            return 'Error al insertar la tarea';
        }
     }

     async update(id: number, tareaRequest: TaskRequest): Promise<string> {
        try {
            const response = await this.http.fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(tareaRequest),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Error al actualizar la tarea');
            }
            return await response.text() || 'Tarea actualizada correctamente';
        } catch (error) {
            console.error(`Error al actualizar tarea ${id}:`, error);
            return 'Error al actualizar la tarea';
        }
     }

}

