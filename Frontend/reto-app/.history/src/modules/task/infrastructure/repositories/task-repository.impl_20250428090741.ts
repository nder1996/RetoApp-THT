
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITaskRepository } from 'modules/task/core/interfaces/task-repository.interface';

@Injectable({
    providedIn: 'root'
  })
export class TaskRepository implements ITaskRepository {

}