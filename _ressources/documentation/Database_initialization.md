# Database Initialization

At first launch, PostgreSQL requires the creation of a **Database** and its **User**. 

To achieve this, one can enter their docker container (`docker exec -it pawplanner-db-1 psql -U postgres`) then run several SQL commands to : 
```sql
/* 1. Create a user */
CREATE USER paw_planner_admin WITH PASSWORD '1234';
/* 2. Create a datase */
CREATE DATABASE paw_planner OWNER paw_planner_admin;
/* 3. Grant privileges to this user on this database */
GRANT ALL PRIVILEGES ON DATABASE paw_planner TO paw_planner_admin;
exit
```
But we worked on a simple command at initialization to do that for us: `npm run init:db`. It works like this: 
## Creating your PostgreSQL user through a npm command

Here's what we needed to achieve with this script:
1. We needed a npm command to run the whole process
2. This command runs a nodeJS script
3. This script uses environment variables
4. The `.env` file must be filed in /root
5. This script runs SQL commands sequentially
6. The container must run during the process and stop when it's finished to avoid conflicts
7. The container's name must always be the same to ensure the script works
___
### 1. npm command

```json
{
  "scripts": {
    "init:db": "node ./_ressources/scripts/init_db_user.ts"
  },
  "devDependencies": {
    "@types/node": "^22.5.5"
  }
}
```
The script uses Node and therefore needs its type declarations.

### 2. Node script

```js
import { exec } from 'child_process';

function executeCommand(command: string, errorHandler: (error: Error | null) => void) {
    exec(command, (error, stdout: string, stderr: string) => {
        if (error) {
            console.error(`Error: ${error}`);
            return errorHandler(error);
        }
        console.info(`Output: ${stdout}`);
        console.error(`Errors: ${stderr}`);
        errorHandler(null);
    });
}
```
This function executes a command within a shell, with a callback function when the execution is done.
- param `command`: the shell command to execute.
- param `errorHandler`: either gets an `Error` or `null` if everything went smoothly.
- function `exec`: the actual function allowing the spawn of a shell and the processing of the command and its output.([official documentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback))
    - param `command`: the command param is used here.
    - param `error`: either an `Error` object or `null`.
    - param `stdout`: standard output of the command.
    - param `stderr`: standard error from the command.

If an error occurs, it is logged to the console and the `errorHandler` callback function is called.<br>
For each command, the console will output the `stdout` and `stderr` strings.

### 3. Environment variables 
```js
import dotenv from 'dotenv';
dotenv.config();
```
Ensure the environment variables are accessible through `process.env.VARIABLE_NAME`. 
### 4. Prerequisite: .env
The only actual prerequisite is to copy the `.env.sample` file into a `.env` file in root and edit it with the real informations.
```js (not actual js)
DBNAME=YOUR_DBNAME
DBUSERNAME=YOUR_DBUSERNAME
DBPASS=YOUR_DBPASS
```

### 5. SQL commands
The SQL commands had to be divided to ensure they'd run sequentially and not as a `TRANSACTION`. `psql` in Docker turns multiple SQL commands into a single transaction but the `CREATE DATABASE` command cannot be run in one.
```js
// The commands are kept in distinct constants with the env variables
const createUserCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE USER ${process.env.DBUSERNAME} WITH PASSWORD '${process.env.DBPASS}';"`;
const createDatabaseCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE DATABASE ${process.env.DBNAME} OWNER ${process.env.DBUSERNAME};"`;
const grantPrivilegesCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${process.env.DBNAME} TO ${process.env.DBUSERNAME};"`;

(...)

// The commands are sent to the executeCommand() function one at a time
executeCommand(createUserCommand, (err) => {
    if (err) return;
    executeCommand(createDatabaseCommand, (err) => {
        if (err) return;
        executeCommand(grantPrivilegesCommand, (err) => {
            if (err) return;
        });
    });
});
```

### 6. Starting and stopping the container 
We need the container to run in order to act on our database. The commands are kept in variables and passed to the `executeCommand()` function when needed.
```js
const startDbCommand = 'docker compose up -d db';
const stopDbCommand = 'docker compose stop db';

executeCommand(startDbCommand, (err) => {
    if (err) return;
    waitForPostgres((err) => {
        if (err) return;
        // Execute the SQL commands
        executeCommand(stopDbCommand, (err) => {
            if (err) return;
            console.info('Database initialized and container successfully stopped.');
        });
    });
});
```
The `waitForPostgres()` function contains a `check()` loop running the `pg_isready` PostgreSQL command to ensure the container is running before sending our SQL commands. It checks the container every 2 seconds (`setTimeout(check, 2000)`), 10 times (`retries` variable).
```js
function waitForPostgres(errorHandler: (error: Error | null) => void) {
    const checkCommand = 'docker exec pawplanner-db-1 pg_isready';
    let retries = 10;

    function check() {
        exec(checkCommand, (error) => {
            if (error && retries > 0) {
                retries--;
                console.info('PostgreSQL is not ready, trying again...');
                setTimeout(check, 2000);
            } else if (retries === 0) {
                return errorHandler(new Error('PostgreSQL is still not ready after 10 tries. Stopping attempts.'));
            } else {
                errorHandler(null);
            }
        });
    }

    check();
}
```
### 7. Consistent container name 
To ensure the consistent container naming required in our commands (for example: `const checkCommand = 'docker exec pawplanner-db-1 pg_isready';`), the name is specified in the `docker-compose.yml`.
```yml
db:
    (...)
    container_name: pawplanner-db-1
```
We could have used another environment variable for this purpose but chose against it to avoid adding more complexity. With this solution, we ensure the script reliably targets the right container.