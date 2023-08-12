import { ApolloServer, gql } from 'apollo-server-lambda';
// const { ApolloServer, gql } = require('apollo-server-lambda');


const typeDefs = gql`
  type Query {
    hello: String
    books: [Book]
    authors: [Author]
  }
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author: (book) => authors.find(author => book.authorId === author.id)
  },
  Author: {
    books: (author) => author.booksId.map(bookId => books.find(book => bookId === book.id))
  }
};

const books = [
  {id: 1, title: "marathi", authorId: 1},
  {id: 2, title: "hindi", authorId: 2},
  {id: 3, title: "english", authorId: 2},
  {id: 4, title: "french", authorId: 1},
];

const authors = [
  {id: 1, name: "Ethan", booksId: [1, 4]},
  {id: 1, name: "Olivia", booksId: [2, 3]},
];

const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    // cors: {
    //   origin: '*', // Replace with the appropriate origin
    //   // credentials: true,
    // },
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