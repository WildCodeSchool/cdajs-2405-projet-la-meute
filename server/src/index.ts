import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";
import "module-alias/register";

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

import { graphqlUploadExpress } from "graphql-upload-ts";
import { dataSource } from "./dataSource/dataSource";
import { initTestData } from "./dataSource/initTestData";

import { UserResolvers } from "./resolvers/UserResolvers";
import { DogResolver } from "./resolvers/DogResolver";
import { EventResolver } from "./resolvers/EventResolver";
import { ServicesResolvers } from "./resolvers/ServicesResolvers";
import { SearchResolvers } from "./resolvers/SearchResolvers";

dotenv.config();
const port = 3200;

export async function startServerApollo() {
	const schema = await buildSchema({
		resolvers: [
			UserResolvers,
			DogResolver,
			EventResolver,
			ServicesResolvers,
			SearchResolvers,
		],
	});

	const server = new ApolloServer({ schema });
	const app = express();

	app.use(cors());
	app.use("/upload", express.static(path.join(__dirname, "../upload")));
	app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 10 }));

	try {
		await dataSource.initialize();
		console.info("Database connected successfully!");
	} catch (error) {
		console.error("Failed to initialize data source:", error);
	}

	// FIXME: Comment this after first launch to avoid doubles
	// initTestData() Drop table and reload data test in every launch
	await initTestData();
	await server.start();

	app.use("/", express.json(), expressMiddleware(server));

	app.listen(port, () => {
		console.info(`🚀🚀 Server running at http://localhost:${port}`);
	});
}

startServerApollo();
