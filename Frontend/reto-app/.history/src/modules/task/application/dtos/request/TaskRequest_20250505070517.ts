export class TaskRequest {
    constructor(
      public Id?: number,
      public Title?: string,
      public description?: string,
      public status?: string,
      public state?: string,
      public createdAt?: Date,
      public updatedAt?: Date,
      public dueDate?: Date
    ) {}
   }