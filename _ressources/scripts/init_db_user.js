const { exec } = require('child_process');
require('dotenv').config();

// Commande pour créer l'utilisateur
const createUserCommand = `
    docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE USER ${process.env.DBUSERNAME} WITH PASSWORD '${process.env.DBPASS}';"
`;

// Commande pour créer la base de données
const createDatabaseCommand = `
    docker exec -i pawplanner-db-1 psql -U postgres -c "CREATE DATABASE ${process.env.DBNAME} OWNER ${process.env.DBUSERNAME};"
`;

// Commande pour accorder les privilèges
const grantPrivilegesCommand = `
    docker exec -i pawplanner-db-1 psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ${process.env.DBNAME} TO ${process.env.DBUSERNAME};"
`;
// Fonction pour exécuter une commande shell
function executeCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return callback(error);
        }
        console.log(`Output: ${stdout}`);
        console.error(`Errors: ${stderr}`);
        callback(null);
    });
}

// Attendre que PostgreSQL soit prêt
function waitForPostgres(callback) {
    const checkCommand = 'docker exec pawplanner-db-1 pg_isready';
    let retries = 10;

    function check() {
        exec(checkCommand, (error) => {
            if (error && retries > 0) {
                retries--;
                console.log('PostgreSQL n\'est pas encore prêt, réessai...');
                setTimeout(check, 2000); // Réessayer après 2 secondes
            } else if (retries === 0) {
                return callback(new Error('PostgreSQL n\'est pas prêt après plusieurs essais.'));
            } else {
                callback(null);
            }
        });
    }

    check();
}

// Démarrer le conteneur PostgreSQL
const startDbCommand = 'docker compose up -d db';

executeCommand(startDbCommand, (err) => {
    if (err) return;

    waitForPostgres((err) => {
        if (err) return;

        // Exécuter la commande pour créer l'utilisateur
        executeCommand(createUserCommand, (err) => {
            if (err) return;

            // Exécuter la commande pour créer la base de données
            executeCommand(createDatabaseCommand, (err) => {
                if (err) return;

                // Exécuter la commande pour accorder les privilèges
                executeCommand(grantPrivilegesCommand, (err) => {
                    if (err) return;
                    console.log('Base de données configurée et privilèges accordés avec succès.');

                    // Arrêter le conteneur PostgreSQL
                    const stopDbCommand = 'docker compose stop db';

                    executeCommand(stopDbCommand, (err) => {
                        if (err) return;
                        console.log('Base de données configurée et conteneur arrêté avec succès.');
                    });
                });
            });
        });
    });
});

