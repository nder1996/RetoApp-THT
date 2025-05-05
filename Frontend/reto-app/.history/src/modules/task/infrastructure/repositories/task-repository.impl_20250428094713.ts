
import { inject, Injectable } from 'aurelia-framework';
import { environment } from 'environments/environment';
import { TaskRequest } from 'modules/task/application/dtos/request/TaskRequest';
import { TaskResponse } from 'modules/task/application/dtos/response/TaskResponse';
import { ITaskRepository } from 'modules/task/core/interfaces/task-repository.interface';
import { HttpClient } from 'aurelia-fetch-client';

@inject()
export class TaskRepository implements ITaskRepository {

    constructor(private http: HttpClient) {}


    private apiUrl = `${environment.apiUrl}`;

    
    async getAllTask(): Promise<TaskResponse[]> {
        const response = await this.http.fetch(`${this.apiUrl}/tasks`);
        if (!response.ok) {
            throw new Error('Error al obtener tareas');
        }
        return await response.json();
    }

    async getById(id: number): Promise<TaskResponse> {
        const response = await this.http.fetch(`${this.apiUrl}/tasks/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener la tarea con id ${id}`);
        }
        return await response.json();
    }

    async inactivateById(id: number): Promise<string> {
        // Suponiendo que inactivar es un DELETE o un endpoint específico
        const response = await this.http.fetch(`${this.apiUrl}/tasks/${id}/inactivate`, { method: 'POST' });
        if (!response.ok) {
            throw new Error('Error al inactivar la tarea');
        }
        return await response.text();
    }

    async insert(tareaRequest: TaskRequest): Promise<string> {
        const response = await this.http.fetch(`${this.apiUrl}/tasks`, {
            method: 'POST',
            body: JSON.stringify(tareaRequest),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Error al insertar la tarea');
        }
        return await response.text();
    }

    async update(id: number, tareaRequest: TaskRequest): Promise<string> {
        const response = await this.http.fetch(`${this.apiUrl}/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(tareaRequest),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }
        return await response.text();
    }

}

