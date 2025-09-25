import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function startServer() {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    console.log("Подключение к in-memory MongoDB...");
    await mongoose.connect(uri);

    const app = express();
    app.use(express.json());

    // ...

    app.use((req, res) => {
        res.status(404).send({ error: "Not found" });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: err.message });
    });

    app.listen(3000, () => {
        console.log("Сервер запущен на http://localhost:3000");
    });
}

startServer().catch(console.error);
