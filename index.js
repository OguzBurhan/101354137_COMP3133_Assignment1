const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comp3133_assigment1', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the Apollo Server
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();
