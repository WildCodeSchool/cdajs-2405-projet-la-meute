import { DataSource } from "typeorm";

export const dataSource = new DataSource({
	// database configuration
	type: "postgres",
	host: process.env.DBHOST || "db",
	port: Number(process.env.DBPORT) || 5432,
	database: process.env.DBNAME,
	username: process.env.DBUSERNAME,
	password: process.env.DBPASS,

	// TypeORM configuration
	entities: ["src/entities/*.ts"],
	migrations: ["src/migrations/*.ts"],
	synchronize: true, // FIXME: true or false? research needed.
	logging: true, // FIXME: delete this line in production
});
