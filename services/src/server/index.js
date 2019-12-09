import express from "express";

const port = process.env.PORT || 1300;
const { ApolloServer, gql } = require("apollo-server-express");

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.all("*", (req, res) => {
  res.status(404).json({ message: "Missing endpoint" });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`listening on ${port}${server.graphqlPath}`)
);
