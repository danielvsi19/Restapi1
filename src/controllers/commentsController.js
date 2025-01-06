// commentsController.js
import * as commentsService from "../services/commentsService.js";
import { StatusCodes } from "http-status-codes";

// החזרת כל התגובות לפוסט
const getAllCommentsHandler = async (req, res, next) => {
    try {
        const postId = req.query.postId;  // מזהה הפוסט

        const allComments = postId
            ? await commentsService.getCommentsByPostId(postId) 
            : await commentsService.getAllComments(); 

        res.status(StatusCodes.OK).json(allComments);
    } catch (error) {
        next(error);  // מעביר את השגיאה ל-handler הבא
    }
};

// החזרת תגובה לפי מזהה
const getCommentByIdHandler = async (req, res, next) => {
    try {
        const comment = await commentsService.getCommentById(req.params.commentId);  // קריאת תגובה לפי מזהה
        if (!comment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
        }
        res.status(StatusCodes.OK).json(comment);
    } catch (error) {
        next(error);
    }
};

// הוספת תגובה
const addCommentHandler = async (req, res, next) => {
    try {
        const newComment = await commentsService.addComment(req.body);  // הוספת תגובה
        res.status(StatusCodes.CREATED).json(newComment);
    } catch (error) {
        next(error);
    }
};

// עדכון תגובה
const updateCommentByIdHandler = async (req, res, next) => {
    try {
        const updatedComment = await commentsService.updateCommentById(req.params.commentId, req.body);
        if (!updatedComment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
        }
        res.status(StatusCodes.OK).json(updatedComment);
    } catch (error) {
        next(error);
    }
};

// מחיקת תגובה
const deleteCommentByIdHandler = async (req, res, next) => {
    try {
        const deleted = await commentsService.deleteCommentById(req.params.commentId);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
        }
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export {
    getAllCommentsHandler,
    getCommentByIdHandler,
    addCommentHandler,
    updateCommentByIdHandler,
    deleteCommentByIdHandler
};
