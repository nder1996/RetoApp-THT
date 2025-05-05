
import { inject, Injectable } from 'aurelia-framework';
import { TaskRequest } from 'modules/task/application/dtos/request/TaskRequest';
import { TaskResponse } from 'modules/task/application/dtos/response/TaskResponse';
import { ITaskRepository } from 'modules/task/core/interfaces/task-repository.interface';
import { injectable } from 'aurelia-dependency-injection';
@Injectable({
    providedIn: 'root'
  })
export class TaskRepository implements ITaskRepository {
    getAllTask(): Promise<TaskResponse[]> {
        throw new Error('Method not implemented.');
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

