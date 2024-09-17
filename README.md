# Paw Planner

### -- 🚧 Work in progress 🚧

Started in September 2024 as a school project, **Paw Planner** is a service designed to facilitate the connection between canine professionals and dog owners. Its main feature is a calendar where professionals can propose available slots for specific activities, and dog owners can book these slots.

We are a team of four aspiring web developers working on this project: [Florence](https://github.com/FlorenceBuchelet), [Florian](https://github.com/Dolpheus89), [Julien](https://github.com/Carcali) and [Melissa](https://github.com/Melprcllr).

## Stack
- **Prerequisites**:
    - **NodeJS** needs to be installed **globally**.
    - **npm**
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
- Client side:
    - **React** (through ViteJS)
    - **Apollo Client** (via Vite)
    - **Sass**

## Launch

### TLDR;
1. **First Launch**
    - Clone both `.env.sample` in a `.env` file (in root and /server)
    - Run `npm run install:all`
    - Run `npm run init:db`
    - Run `docker compose up`
2. **Any other launch**
    - `docker compose up`

### Explanations

First of all, copy and edit the `.env.sample` in a `.env` file. There's one in the root folder and another in the /server folder. (FIXME: to be centralized)<br>
On first launch, **the variables you'll put in this file will be used to create your database** so file it up accordingly with secured informations.

Then run `npm run install:all` to run the `npm install` commands in the root, /client and /server folders in one go. 

On first launch, create your PostgreSQL user, either inside your container (run `npm run init:db`, it works as explained in [this documentation](./_ressources/documentation/Database_initialization.md)) or through a PostgreSQL user interface such as **pgAdmin**.

You can verify if your user has been created through adminer (Système: PostgreSQL | Serveur: db | Utilisateur: $DBUSERNAME | Mot de passe: $DBPASS | Base de données: $DBNAME).

Run `docker compose up`.

Isolated basic commands for debugging purpose: 
- client side: `npm run dev`
- server side: `npm start`


### Folder Structure

```lua (aesthetic use, not actual lua)
PawPlanner/
├── _ressources/
│   ├── documentation/
|   │   └── -- documentation on specific features
│   └── UML/
├── server/                 -- backend
├── client/                 -- frontend
|   ├── src/
|   │   ├── components/
|   │   └── pages/
|   │       └── App.tsx
|   ├── .env                -- create this before first launch
|   └── .env.sample
├── .env                    -- create this before first launch
├── .env.sample
├── docker-compose.yml
└── -- Other config files
```