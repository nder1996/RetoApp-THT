export class TaskRequest {
    constructor(
      public Id?: number,
      public Title?: string,
      public Description?: string,
      public Status?: string,
      public State?: string,
      public CreatedAt?: Date,
      public updatedAt?: Date,
      public dueDate?: Date
    ) {}
   }