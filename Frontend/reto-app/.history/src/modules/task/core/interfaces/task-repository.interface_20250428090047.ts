export interface ITaskRepository {
    getAllTask(): Promise<<TaskResponse[]>;
    getById(id: number): Promise<ApiResponse<TaskResponse>>;
    inactivateById(id: number): Promise<ApiResponse<string>>;
    insert(tareaRequest: TaskRequest): Promise<ApiResponse<string>>;
    update(id:number,tareaRequest: TaskRequest): Promise<ApiResponse<string>>;
  }