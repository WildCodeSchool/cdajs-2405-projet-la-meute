# Database Initialization

At first launch, PostgreSQL requires the creation of a Database and its User. 

To achieve that, one can enter their docker container (`docker exec -it pawplanner-db-1 psql -U postgres`) then run several SQL commands to : 
```sql
/* 1. Create a user */
CREATE USER paw_planner_admin WITH PASSWORD '1234';
/* 2. Create a datase */
CREATE DATABASE paw_planner OWNER paw_planner_admin;
/* 3. Grant privileges to this user on this database */
GRANT ALL PRIVILEGES ON DATABASE paw_planner TO paw_planner_admin;
exit
```

## 1. Creating your PostgreSQL user

After you've run your first `npm install` command in root (manually or through the `npm run install:all` custom command), you'll have `dotenv-cli` installed as a dev dependency.

**dotenv-cli** allows the use of environement variables in the shell, meaning you can run commands with variables in them.

!! le conteneur doit tourner avant

on décide 'un nom de conteneur fixe


1. Access Postgres in Docker: 
```sh
docker exec -it pawplanner-db-1 psql -U postgres
```
2. Create your user: 
```sql
CREATE USER paw_planner_admin WITH PASSWORD '1234';
CREATE DATABASE paw_planner OWNER paw_planner_admin;
GRANT ALL PRIVILEGES ON DATABASE paw_planner TO paw_planner_admin;
exit
```
These informations must match the ones in your `.env` and `Server/.env` files.

