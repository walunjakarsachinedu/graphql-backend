import { ApolloServer, gql } from 'apollo-server-lambda';
import * as fs from 'fs';
import resolvers from '../resolvers/resolver';
import schemaString from './models';


// const schemaString = fs.readFileSync('src/functions/models.gql', 'utf-8');
const typeDefs = gql(schemaString);


const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    cache: 'bounded'
});
const graphqlHandler = server.createHandler();


const getHandler = (event, context) => {
  if (!event.requestContext) {
      event.requestContext = context;
  }
  return graphqlHandler(event, context, () => {});
}

exports.handler = getHandler;