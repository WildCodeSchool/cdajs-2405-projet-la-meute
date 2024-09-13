# Paw Planner

## Stack
- React (ViteJS)
- NodeJS
- Typescript
- Apollo (Client (via Vite) et Server)
- TypeORM
- TypeGraphQL
- PostegreSQL
- Docker

## Launch

Work in progress
- Client: `npm i` on first launch + `npm run dev`

- Server: 

On first launch, create your PostgreSQL user, either inside your container (as explained right under) or through a PostgreSQL user interface such as **pgAdmin**.

To manage your database inside your container:

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
