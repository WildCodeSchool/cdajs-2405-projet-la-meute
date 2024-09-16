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
- **Biome** : Biome is an alternative to ESLint and Prettier for ensuring code quality. It provides both linting and formatting in one tool.

## Launch

First of all, copy and edit the `.env.sample` in a `.env` file. There's one in the root folder and Server folder. (FIXME: to be centralized)

Then run `npm run install:all` to run the `npm install` commands in the root, client and server folders. 

Work in progress
- client: `npm i` on first launch + `npm run dev`

- server: 

On first launch, create your PostgreSQL user, either inside your container (run `npm run init:db` as explained in [this documentation](./_ressources/documentation/Database_initialization.md)) or through a PostgreSQL user interface such as **pgAdmin**.


### Folder Structure

```lua
-- Work in progress
PawPlanner/
├── server/
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    ├── .env
    └── .env.sample
```