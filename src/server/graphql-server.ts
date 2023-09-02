import { ApolloServer} from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import * as fs from 'fs';
import resolvers from '../resolvers/resolver';
import express, { RequestHandler, json } from 'express';
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

let graphqlMiddleware : RequestHandler = (req, res, next) => {
  res.send("loading graphql middleware");
};

async function updateMiddleware() {
  await server.start();
  graphqlMiddleware = expressMiddleware(
    server, 
    {
      context: async ({req}) => {
        return { user: req["auth"] || null };
      }
    }
  );
}

updateMiddleware();


api.use(
  json(),
  expressjwt({
    secret: "SECRET_KEY",
    algorithms: ["HS256"],
    credentialsRequired: true
  }),
);

api.use(
  "/shopping-app", 
  (req, res, next) => graphqlMiddleware(req, res, next), // middleware is not directly provided because it is loaded asynchronously
);

export default serverless(api, {basePath: "/.netlify/functions/graphql"});
