export class TaskRequest {
    constructor(
      public Id?: number,
      public Title?: string,
      public Description?: string,
      public Status?: string,
      public state?: string,
      public createdAt?: Date,
      public updatedAt?: Date,
      public dueDate?: Date
    ) {}
   }