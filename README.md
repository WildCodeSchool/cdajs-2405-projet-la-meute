# Paw Planner

Started in September 2024 as a school project, **Paw Planner** is a web application designed to facilitate the connection between canine professionals and dog owners. Its main feature is a calendar where trainers can propose available slots for specific activities, and dog owners can book these slots.

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
    - **Husky**
- Server side:
    - **NodeJS**
    - **TypeORM**
    - **TypeGraphQL**
    - **Apollo Server**
    - **PostegreSQL**
- Client side:
    - **React** (through ViteJS)
    - **Apollo Client**
    - **Sass**
    - **Storybook**
- Tests:
    - **Jest**
    - **MockTypeORM**
    - **Testing library**
    - **Vitest**
    - **Playwright**


## Launch

### TLDR;
1. **First Launch**
    - Run `make env` and edit your .env file.
    - Run `make first-launch` (it will install your dependencies, initialize your database, synchronize the forms validation rules and build your project)
2. **Any other launch**
    - Launching docker containers: `make up`
    - Building docker containers and launching project: `make build`
    - Full launch: `make launch` (install dependencies, sync validation rules and build)
3. **Migrations** :
    - `make migrations` runs all pending migrations
    - `make migration-revert` reverts the last run migration

Don't forget to apply migrations when needed with `make migrations`!

**Client**: http://localhost:4200/ </br>
**Server**: http://localhost:3200/

**Adminer**: http://localhost:8080/

### Explanations

First of all, run `make env` and edit the `.env` file with your variables. <br>
On first launch, **the variables you'll put in this file will be used to create your database** so file it up accordingly with secured informations.

Run `make first-launch`. It will:
- run the `npm install` commands in the /root, /client and /server folders in one go. 
- create your PostgreSQL user inside your container, it works as explained in [this documentation](./_ressources/documentation/Database_initialization.md) you could also create it through a PostgreSQL user interface such as **pgAdmin**. You can verify if your user has been created through **adminer** (Système: PostgreSQL | Serveur: db | Utilisateur: $DBUSERNAME | Mot de passe: $DBPASS | Base de données: $DBNAME - replace the variables).
- synchronize the form validation rules
- build your project
- run migrations

Isolated basic commands for debugging purpose: 
- client side: `npm run dev`
- server side: `npm start`

## Design Patterns

This project uses common design patterns to ensure maintainability and scalability:
- **Custom Hook pattern**: Frontend logic such as authentication and API interactions are encapsulated in reusable React hooks (`useAuth`, `useForm`).
- **ForwardRef**: To make Inputs in Forms reusable we used a form of React **Higher-order component** called ForwardRef, it wraps the component and makes its ref accessible to its parent.
- **Repository pattern**: Data access is abstracted through TypeORM repositories. This allows for a clear separation between logics.
- **Resolver pattern**: GraphQL layer uses the Resolver pattern to delegate request to specific functions, keeping them isolated, maintainable and testable.

### Organizational patterns:
- **Atomic Design**: We use a simplified version of the Atomic Design methodology to allow for scalable UI. Atoms (buttons, inputs), Molecules (cards, forms), Layouts to place components on pages (dashboard) and pages for data injection and routing.
- **Compound Component Pattern**: The more complex components (Modals for example) use the compound pattern to group related components under a shared parent, improving readability and usage.
- **Separation of concerns**: Logic-heavy components (pages, resolvers, services) are separated from UI and utility functions to keep responsibilities clear and separated. 

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
