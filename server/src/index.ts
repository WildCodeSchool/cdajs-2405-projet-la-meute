import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ExampleResolver } from "./resolvers/ExampleResolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";
import { initTestData } from "./dataSource/initTestData";
import { CategoryResolver } from "./resolvers/CategoryResolvers";
import dotenv from "dotenv";
dotenv.config();

const port = 3200;

export async function startServerApollo() {
	const schema = await buildSchema({
		resolvers: [ExampleResolver, CategoryResolver],
	});

	const server = new ApolloServer({ schema });

	await initTestData();

	// FIXME: Comment this after first launch to avoid doubles
	// await initTestData();

	const { url } = await startStandaloneServer(server, {
		listen: { port },
	});

	console.info(`🚀🚀 Server running at ${url}`);
}

startServerApollo();
