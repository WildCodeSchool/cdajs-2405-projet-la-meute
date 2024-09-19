import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

// SQL commands
const createUserCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE USER ${process.env.DBUSERNAME} WITH PASSWORD '${process.env.DBPASS}';"`;
const createDatabaseCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE DATABASE ${process.env.DBNAME} OWNER ${process.env.DBUSERNAME};"`;
const grantPrivilegesCommand = `docker exec -i pawplanner-db-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${process.env.DBNAME} TO ${process.env.DBUSERNAME};"`;

// Function to execute a shell command
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

// Loop to wait for the container to run
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

// Démarrer le conteneur PostgreSQL
const startDbCommand = 'docker compose up -d db';
const stopDbCommand = 'docker compose stop db';

executeCommand(startDbCommand, (err) => {
    if (err) return;
    waitForPostgres((err) => {
        if (err) return;
        executeCommand(createUserCommand, (err) => {
            if (err) return;
            executeCommand(createDatabaseCommand, (err) => {
                if (err) return;
                executeCommand(grantPrivilegesCommand, (err) => {
                    if (err) return;
                    console.info('Database initialized and permissions granted.');
                    executeCommand(stopDbCommand, (err) => {
                        if (err) return;
                        console.info('Database initialized and container successfully stopped.');
                    });
                });
            });
        });
    });
});