-- Create TodoLists table
CREATE TABLE "TodoLists" (
    "Id" SERIAL PRIMARY KEY,
    "Title" TEXT,
    "Colour_Code" TEXT NOT NULL DEFAULT '#FFFFFF',
    "Created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "CreatedBy" TEXT,
    "LastModified" TIMESTAMP WITH TIME ZONE,
    "LastModifiedBy" TEXT
);

-- Create TodoItems table
CREATE TABLE "TodoItems" (
    "Id" SERIAL PRIMARY KEY,
    "ListId" INTEGER NOT NULL,
    "Title" TEXT,
    "Note" TEXT,
    "Priority" INTEGER NOT NULL,
    "Reminder" TIMESTAMP WITH TIME ZONE,
    "Done" BOOLEAN NOT NULL DEFAULT FALSE,
    "Created" TIMESTAMP WITH TIME ZONE NOT NULL,
    "CreatedBy" TEXT,
    "LastModified" TIMESTAMP WITH TIME ZONE,
    "LastModifiedBy" TEXT,
    CONSTRAINT "FK_TodoItems_TodoLists_ListId" FOREIGN KEY ("ListId") REFERENCES "TodoLists" ("Id") ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX "IX_TodoItems_ListId" ON "TodoItems" ("ListId"); 