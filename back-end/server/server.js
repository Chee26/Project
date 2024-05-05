// Import necessary modules
const fs = require("fs");
const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const { MongoClient } = require("mongodb");

// MongoDB connection URL
const url = "mongodb://localhost:27017";

// Initialize MongoDB client and database
let db;

// About message
let aboutMessage = "NUS Course Project API v1.0";

// GraphQL scalar type for Date
const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

// GraphQL resolvers
const resolvers = {
  Query: {
    about: () => aboutMessage, // Resolver for the 'about' query
    stocksList, // Resolver for the 'stocksList' query
  },
  Mutation: {
    stockAdd, // Resolver for the 'stockAdd' mutation
  },
  GraphQLDate, // Scalar type for Date
  JSON: new GraphQLScalarType({
    // Scalar type for JSON
    name: "JSON",
    description: "JSON scalar type",
    parseValue(value) {
      return value; // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      return parseLiteral(ast);
    },
  }),
};

// Function to parse GraphQL literals
function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value);
      });
      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}

// Function to fetch stock list from MongoDB
async function stocksList() {
  const stocks = await db.collection("stocks").find({}).toArray();
  return stocks.reverse();
}

// Function to generate next sequence ID
function getNextSequence() {
  return Math.floor(Math.random() * 1000000);
}

// Function to add a new stock
async function stockAdd(_, { stock }) {
  stock.id = getNextSequence();
  stock.searchDate = new Date();
  await db.collection("stocks").insertOne(stock);
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock?.equity}&apikey=330NAY2DUDMV67W2`,
  );
  const res = await response.json();
  return res;
}

// Function to connect to MongoDB
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log("Connected to MongoDB at", url);
  db = client.db();
}

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs: fs.readFileSync("./server/schema.graphql", "utf-8"), // Read schema from file
  resolvers, // Define resolvers
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

// Create Express app
const app = express();

// Serve static files from 'public' directory
app.use(express.static("public"));

// Apply Apollo Server middleware to Express app
server.applyMiddleware({ app, path: "/graphql" });

// Start server
(async function () {
  try {
    await connectToDb(); // Connect to MongoDB
    app.listen(3000, function () {
      console.log("App started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
