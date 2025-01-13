import * as express from "express";

import validateCommentsMiddleware from "../middleware/validateCommentsMiddleware.js";
import * as commentsHandler from "../controllers/commentsController.js";

const commentsRouter = express.Router();

commentsRouter.route("/").get(commentsHandler.getAllCommentsHandler);

commentsRouter.route("/:commentId").get(commentsHandler.getCommentByIdHandler);

commentsRouter.route("/").post(validateCommentsMiddleware, commentsHandler.addCommentHandler);

commentsRouter.route("/:commentId").put(validateCommentsMiddleware, commentsHandler.updateCommentByIdHandler);

commentsRouter.route("/:commentId").delete(commentsHandler.deleteCommentByIdHandler);

commentsRouter.get("/post/:postId", commentsHandler.getCommentsByPostIdHandler);

export default commentsRouter;
