import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    // database configuration
    type: 'postgres',
    host: 'db',
    port: 5432,
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASS,

    // TypeORM configuration
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: true // FIXME: delete this line in production
})