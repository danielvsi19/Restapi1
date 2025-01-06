import "dotenv/config";
import express from "express";

import postsRouter from "./routers/postsRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import { getCommentsCollection } from "./services/commentsService.js";
import { getPostsCollection } from "./services/postsService.js";
import getDatabase from "./Connection/connection.js";

const port = 8080;
let db = null;

try {
    const app = express();
    app.use(express.json());
    getCommentsCollection();
    getPostsCollection();
    app.use("/post", postsRouter);
    app.use("/comment", commentsRouter);
    app.listen(port, () => {
        console.log(`[SERVER] App is running on port ${port}.`);
    });
} catch (error) {
    console.log(error);
};