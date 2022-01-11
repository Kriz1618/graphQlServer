import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

async function initServer() {
    const app = express();
    app.use(cors());
    dotenv.config();

    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app })
    app.use((req, res) => { res.send("Server started successfully") });
    const PORT = process.env.PORT || 5000;
console.log('21 ', process.env.mongodb);
    try {
        await mongoose.connect(process.env.mongodb);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
    app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`));
}

initServer();
