import 'dotenv/config'; //no mover
import Schema from './graphql';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
//import moment from 'moment';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

const getMe = async req => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch {
      throw new AuthenticationError('Your session has expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  schema: Schema,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      me,
    };
  },
});

const app = express();
app.use(cors());
app.use('/imagenes', express.static(path.join(__dirname, '..', '/storage')));
app.use(bodyParser.json({ limit: '5mb' }));

server.applyMiddleware({ app });

module.exports = app;
