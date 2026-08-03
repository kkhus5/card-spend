import "./config/ingestEnvironmentFiles.js";

import express from "express";
import rateLimit from "express-rate-limit";

import { serverPort } from "./config/index.js";
import { connectMongoose } from "./config/mongoConfig.js";
import { v1Router } from "./routes/v1/index.js";
import { webhooksRouter } from "./routes/webhooks/index.js";

const app = express();

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 500,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);
app.use("/webhooks", express.raw({ type: "application/json" }), webhooksRouter);
app.use(express.json());

app.get("/", (_, res) => res.send("Welcome to the Karat server."));
app.get("/health", (_, res) => res.json({ status: "ok" }));
app.use("/api/v1", v1Router);

const setup = async () => {
    await connectMongoose();

    app.listen(serverPort, () => {
        console.log("server running", { port: serverPort });
    });
};

setup();
