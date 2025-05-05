-- Create tasks table
CREATE TABLE "tasks" (
    "Id" SERIAL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "DueDate" TIMESTAMP WITH TIME ZONE,
    "Status" TEXT NOT NULL DEFAULT 'Pending',
    "State" TEXT,
    "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "CreatedBy" TEXT,
    "UpdateAt" TIMESTAMP WITH TIME ZONE,
    "LastModifiedBy" TEXT
);

-- Create indexes
CREATE INDEX "IX_tasks_Status" ON "tasks" ("Status");
CREATE INDEX "IX_tasks_DueDate" ON "tasks" ("DueDate");
CREATE INDEX "IX_tasks_Title" ON "tasks" ("Title"); 