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