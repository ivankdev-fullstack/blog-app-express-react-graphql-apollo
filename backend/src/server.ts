import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { Mutation, Post, Profile, Query, User } from "./resolvers";
import { typeDefs } from "./schema";
import { getUserFromToken } from "./utils/getUserFromToken";
dotenv.config();

export interface Context {
  prisma: PrismaClient;
  userInfo: { userId: number } | null;
}

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Profile,
    Post,
    User,
    Mutation,
  },
});

async function startGraphQLServer() {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => {
        try {
          const userInfo = getUserFromToken(req.headers.authorization || "");
          return { prisma, userInfo };
        } catch (err) {
          console.log(err);
          throw Error("Error in ExpressMiddleware." + err);
        }
      },
    })
  );
}

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

checkDatabaseConnection();
startGraphQLServer();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
