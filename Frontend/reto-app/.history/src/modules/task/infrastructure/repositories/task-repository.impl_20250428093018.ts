
import { inject, Injectable } from 'aurelia-framework';
import { environment } from 'environments/environment';
import { TaskRequest } from 'modules/task/application/dtos/request/TaskRequest';
import { TaskResponse } from 'modules/task/application/dtos/response/TaskResponse';
import { ITaskRepository } from 'modules/task/core/interfaces/task-repository.interface';

@inject()
export class TaskRepository implements ITaskRepository {

    private apiUrl = `${environment.apiUrl}`;

    
    getAllTask(): Promise<TaskResponse[]> {
        return lastValueFrom(this.http.get<TaskResponse[]>(`${this.apiUrl}/tasks`));
    }
    getById(id: number): Promise<TaskResponse> {
        throw new Error('Method not implemented.');
    }
    inactivateById(id: number): Promise<string> {
        throw new Error('Method not implemented.');
    }
    insert(tareaRequest: TaskRequest): Promise<string> {
        throw new Error('Method not implemented.');
    }
    update(id: number, tareaRequest: TaskRequest): Promise<string> {
        throw new Error('Method not implemented.');
    }

}

