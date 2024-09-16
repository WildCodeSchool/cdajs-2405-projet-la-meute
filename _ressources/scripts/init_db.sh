#!/bin/bash

# Exécuter les commandes dans le conteneur PostgreSQL
docker exec -i pawplanner-db-1 psql -U postgres <<EOF
CREATE USER paw_planner_admin WITH PASSWORD '1234';
CREATE DATABASE paw_planner OWNER paw_planner_admin;
GRANT ALL PRIVILEGES ON DATABASE paw_planner TO paw_planner_admin;
EOF

echo "Utilisateur et base de données PostgreSQL créés avec succès."
