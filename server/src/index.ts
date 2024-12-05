import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ExampleResolver } from "./resolvers/ExampleResolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";
import { initTestData } from "./dataSource/initTestData";
import { CategoryResolver } from "./resolvers/CategoryResolvers";
import { UserResolvers } from "./resolvers/UserResolvers";
import dotenv from "dotenv";
dotenv.config();

const port = 3200;

export async function startServerApollo() {
	const schema = await buildSchema({
		resolvers: [ExampleResolver, CategoryResolver, UserResolvers],
	});

	const server = new ApolloServer({ schema });

	try {
		await dataSource.initialize();
		console.info("Database connected successfully!");
	} catch (error) {
		console.error("Failed to initialize data source:", error);
	}

	// FIXME: Comment this after first launch to avoid doubles
	await initTestData();
	// initTestData() Drop table and reload data test in every launch
	// await initTestData();

	const { url } = await startStandaloneServer(server, {
		listen: { port },
	});

	console.info(`🚀🚀 Server running at ${url}`);
}

startServerApollo();
