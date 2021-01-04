import Schema from './src/graphql';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
//import jwt from 'jsonwebtoken';
//import moment from 'moment';
import cors from 'cors';


const server = new ApolloServer({
  schema: Schema,
});

const app = express();
app.use(cors());

server.applyMiddleware({ app });

module.exports = app;
