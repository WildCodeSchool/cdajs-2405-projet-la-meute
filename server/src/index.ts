import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { GraphQLError } from "graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";
import { initTestData } from "./dataSource/initTestData";
import dotenv from "dotenv";
import { UserResolvers } from "./resolvers/UserResolvers";
dotenv.config();

const port = 3200;

export async function startServerApollo() {
	const schema = await buildSchema({
		resolvers: [UserResolvers],
	});

	const server = new ApolloServer({ schema, introspection: true });

	try {
		await dataSource.initialize();
		console.info("Database connected successfully!");
	} catch (error) {
		console.error("Failed to initialize data source:", error);
	}

	// FIXME: Comment this after first launch to avoid doubles
	// initTestData() Drop table and reload data test in every launch
	await initTestData();

	try {
		const { url } = await startStandaloneServer(server, {
			listen: { port },
		});

		console.info(`🚀 Server running at ${url}`);
	} catch (error) {
		console.error("Server failed to start:", error);
	}
}

startServerApollo();
