export class TaskRequest {
    constructor(
      public Id?: number,
      public Title?: string,
      public Description?: string,
      public Status?: string,
      public State?: string,
      public CreatedAt?: Date,
      public UpdatedAt?: Date,
      public DueDate?: Date
    ) {}
   }