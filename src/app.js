import "dotenv/config";
import express from "express";

import postsRouter from "./routers/postsRouter.js";
import { getCollection } from "./services/postsService.js";

const port = 8080;

try {
    const app = express();
    app.use(express.json());
    getCollection();
    
    app.use("/post", postsRouter);

    app.listen(port, () => {
        console.log(`[SERVER] App is running on port ${port}.`);
    });
} catch (error) {
    console.log(error);
};