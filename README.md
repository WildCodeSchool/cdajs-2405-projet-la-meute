# Paw Planner

### -- 🚧 Work in progress 🚧

Started in September 2024 as a school project, **Paw Planner** is a service designed to facilitate the connection between canine professionals and dog owners. Its main feature is a calendar where professionals can propose available slots for specific activities, and dog owners can book these slots.

We are a team of four aspiring web developers working on this project: [Florence](https://github.com/FlorenceBuchelet), [Florian](https://github.com/Dolpheus89), [Julien](https://github.com/Carcali) and [Melissa](https://github.com/Melprcllr).

## Stack
- **Prerequisites**:
    - **NodeJS** needs to be installed **globally**.
    - **npm**
    - **Docker**
    - **Make**
___

- General:
    - **Typescript**
    - **Docker**
    - **Biome** : Biome is an alternative to ESLint and Prettier for ensuring code quality. It provides both linting and formatting in one tool.
- Server side:
    - **NodeJS**
    - **TypeORM**
    - **Apollo Server**
    - **TypeGraphQL**
    - **PostegreSQL**
    - **Jest**
- Client side:
    - **React** (through ViteJS)
    - **Apollo Client** (via Vite)
    - **Sass**
    - **Vitest**

## Launch

### TLDR;
1. **First Launch**
    - Run `make env` and edit your .env file.
    - Run `make first-launch` (it will install your dependencies, initialize your database and synchronize the forms validation rules)
    - When your server is ready, run `make migrations`
2. **Any other launch**
    - Launching docker containers: `make up`
    - Building docker containers and launching project: `make build`
    - Full launch: `make launch` (install dependencies, sync validation rules and build)

Don't forget to apply migrations when needed with `make migrations`.

**Client**: http://localhost:4200/ </br>
**Server**: http://localhost:3200/

**Adminer**: http://localhost:8080/

### Explanations

First of all, copy and edit the `.env.sample` in a `.env` file. <br>
On first launch, **the variables you'll put in this file will be used to create your database** so file it up accordingly with secured informations.

Then run `npm run install:all` to run the `npm install` commands in the /root, /client and /server folders in one go. 

On first launch, create your PostgreSQL user, either inside your container (run `npm run db:init`, it works as explained in [this documentation](./_ressources/documentation/Database_initialization.md)) or through a PostgreSQL user interface such as **pgAdmin**.

You can verify if your user has been created through **adminer** (Système: PostgreSQL | Serveur: db | Utilisateur: $DBUSERNAME | Mot de passe: $DBPASS | Base de données: $DBNAME - replace the variables).

Run `docker compose up`.

Isolated basic commands for debugging purpose: 
- client side: `npm run dev`
- server side: `npm start`

// FIXME: add doc design pattern

### Folder Structure

```lua (aesthetic use, not actual lua)
PawPlanner/
├── _ressources/
│   ├── documentation/
|   │   └── -- documentation on specific features
│   ├── scripts/
│   └── UML/
├── client/                     -- FRONTEND
│   ├── public/
|   ├── src/
|   │   ├── __tests__/
|   │   |   └── ...
|   │   ├── assets/
|   │   ├── components/
|   │   |   ├── _atoms/
|   │   |   ├── _molecules/
|   │   |   ├── _organisms/
|   │   |   └── ComponentName/
|   |   │       ├── ComponentName.tsx
|   |   │       └── ComponentName.scss
|   │   ├── graphQL/
|   │   |   ├── mutations/
|   │   |   └── queries/
|   │   ├── helpers/
|   │   |   └── -- Utility functions
|   │   ├── layouts/
|   │   |   └── -- Footer, Header, general layout
|   │   ├── pages/
|   │   |   ├── DesignSystem/
|   |   │   |   └── DesignSystem.tsx
|   │   |   └── PageName/
|   |   │       ├── PageName.tsx
|   |   │       └── PageName.scss
|   │   ├── styles/             -- General styles
|   │   |   ├── _base.scss      -- HTML selectors
|   │   |   ├── _mixins.scss
|   │   |   ├── _reset.scss     -- normalize.css
|   │   |   ├── _variables.scss -- Colors, typography and variables naming
|   │   |   └── main.scss       -- Style imports in App.tsx
|   │   ├── types/              -- Typescript type declarations
|   │   |   └── ...
|   │   └── App.tsx
|   └── -- Other client side config files
├── server/                     -- BACKEND
|   ├── src/
|   │   ├── __tests__/
|   │   |   └── ...
|   │   ├── dataSource/
|   │   |   ├── dataSource.ts
|   │   |   └── initTestData.ts
|   │   ├── entities/
|   │   └── resolvers/
|   ├── index.ts          
|   └── -- Other server side config files
├── .env                        -- ❗ create this before first launch
├── .env.sample
├── docker-compose.yml
└── -- Other general config files
```
