import { ApolloServer} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import * as fs from 'fs';
import resolvers from '../resolvers/resolver';
import express, { json } from 'express';
import serverless from 'serverless-http';
import { expressjwt } from 'express-jwt';

const schemaString = fs.readFileSync('src/schema/models.gql', 'utf-8');
const typeDefs = schemaString;


const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
});

const api = express();

server.start().then(
  () => api.use(
    "/.netlify/functions/graphql/expressMiddleware", 
    json(), 
    expressMiddleware(server),
  )
)

export default serverless(api);
