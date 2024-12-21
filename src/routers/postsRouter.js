import * as express from "express";

import validatePostMiddleware from "../middleware/validatePostsMiddleware.js";
import * as postsHandler from "../controllers/postsController.js";

const postsRouter = express.Router();

postsRouter.route("/").get(postsHandler.getAllPostsHandler);
postsRouter.route("/:postId").get(postsHandler.getPostByIdHandler);

postsRouter.route("/").post(validatePostMiddleware, postsHandler.addPostHandler);

postsRouter.route("/:postId").put(validatePostMiddleware, postsHandler.updatePostByIdHandler);

export default postsRouter;