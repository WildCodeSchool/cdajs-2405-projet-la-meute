import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ExampleResolver } from "./resolvers/ExampleResolvers";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource, verifEnv } from "./dataSource/dataSource";
import { initTestData } from "./dataSource/initTestData";
import { CategoryResolver } from "./resolvers/CategoryResolvers";
import { config } from "dotenv";

config({ path: __dirname + '/../.env' }); // Fix .env forwarding issue

const port = 4000;

export async function startServerApollo() {
    console.log("✨✨ hii", process.env.DBUSERNAME);

    const schema = await buildSchema({
        resolvers: [ExampleResolver, CategoryResolver],
    });

    const server = new ApolloServer({ schema });

    try {
        await dataSource.initialize();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Failed to initialize data source:", error);
    }

    verifEnv();
    // FIXME: Comment this after first launch to avoid doubles
    //await initTestData();

    const { url } = await startStandaloneServer(server, {
        listen: { port },
    });

    console.log(`🚀🚀 Server running at ${url}`);
}


startServerApollo();
