import { TaskRequest } from "modules/task/application/dtos/request/TaskRequest";
import { TaskResponse } from "modules/task/application/dtos/response/TaskResponse";
import { StringifyOptions } from "querystring";

export interface ITaskRepository {
    getAllTask(): Promise<TaskResponse[]>;
    getById(id: number): Promise<TaskResponse>;
    inactivateById(id: number): Promise<string>;
    insert(tareaRequest: TaskRequest): Promise<string>;
    update(id:number,tareaRequest: TaskRequest): Promise<StringifyOptionsg>;
  }