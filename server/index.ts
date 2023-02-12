import * as dotenv from 'dotenv'
import connectDB from './config/db';
const port = process.env.PORT || 5000;
import { createSchema, createYoga } from 'graphql-yoga';
import { join } from "path";
import { readFileSync } from "fs";
import resolvers from './schema/resolvers'
import express from 'express';

dotenv.config();
const typeDefs = readFileSync(join(process.cwd(), "server", "schema", "schema.graphql"), {
  encoding: "utf-8",
});
connectDB().then((cn) => console.log(`MongoDB connected: ${cn.connection.host}:${process.env.MONGO_PORT}`));

const app = express()

const yoga = createYoga({
  cors: true,
  schema: createSchema({
    typeDefs,
    resolvers
  })
})

app.use('/graphql', yoga);

app.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/graphql`);
})

export default app;
