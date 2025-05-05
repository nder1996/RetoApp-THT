# Database connection parameters
$dbHost = "localhost"
$dbPort = "5432"
$dbName = "CleanArchitecture"
$dbUser = "postgres"
$dbPassword = "postgres"

# Path to the SQL file
$sqlFile = "20240101000000_CreateTodoTables.sql"

# Construct the psql command
$psqlCommand = "psql -h $dbHost -p $dbPort -U $dbUser -d $dbName -f $sqlFile"

# Set the PGPASSWORD environment variable
$env:PGPASSWORD = $dbPassword

# Execute the command
Invoke-Expression $psqlCommand

# Clear the password from environment
$env:PGPASSWORD = "" 