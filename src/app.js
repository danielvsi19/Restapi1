import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import postsRouter from "./routers/postsRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import { getPostsCollection } from "./services/postsService.js";

const port = 8080;
let db = null;

// חיבור ל-Mongoose
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('[SERVER] Connected to MongoDB successfully');
        db = mongoose.connection;
    } catch (error) {
        console.error('[SERVER] Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// חיבור למסד הנתונים באמצעות Mongoose
connectToDatabase();
getPostsCollection();

const app = express();
app.use(express.json());

// שימוש במסלולים שלך
app.use("/post", postsRouter);
app.use("/comment", commentsRouter);

// הפעלת השרת
app.listen(port, () => {
    console.log(`[SERVER] App is running on port ${port}.`);
});
