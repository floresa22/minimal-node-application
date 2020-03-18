import 'dotenv/config';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const schema = gql`
  type Query {
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

const me = users[1];

const resolvers = {
  Query: {
    users: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },
};

// const resolvers = {
//   Query: {
//     me: () => {
//       return {
//         username: 'Robin Wieruch',
//       };
//     },
//     user: (parent, args) => {
//       return {
//         username: 'Dave Davids',
//       };
//     },
//   },
// };

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

// const userCredentials = { firstname: 'Robin' };
// const userDetails = { nationality: 'German' };

// const user = {
//   ...userCredentials,
//   ...userDetails,
// };

// console.log(user);

// console.log(process.env.SOME_ENV_VARIABLE);

// const data = {
//   me: {
//     username: 'Robin Wieruch',
//   },
// };
