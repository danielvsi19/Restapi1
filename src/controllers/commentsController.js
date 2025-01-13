import mongoose from 'mongoose';
import * as commentsService from "../services/commentsService.js";
import { StatusCodes } from "http-status-codes";

// התחברות למונגוDB
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});


const getAllCommentsHandler = async (req, res, next) => {
    try {
        const postId = req.query.postId;  // מזהה הפוסט

        const allComments = postId
            ? await commentsService.getCommentsByPostId(postId)  // מיון לפי מזהה פוסט
            : await commentsService.getAllComments();  // כל התגובות
        
        res.status(StatusCodes.OK).json(allComments);
    } catch (error) {
        next(error);  // מעביר את השגיאה ל-handler הבא
    }
};


const getCommentByIdHandler = async (req, res) => {
    try {
        const comment = await commentsService.getCommentById(req.params.commentId);  // קריאת תגובה עם Mongoose
        if (comment) {
            return res.send(comment);
        } else {
            return res.status(400).send("Comment not found");
        }
    } catch (error) {
        return res.status(400).send("error message");
    }
};

const getCommentsByPostIdHandler = async (req, res, next) => {
    try {
        const postId = req.params.postId;  // מזהה הפוסט

        const postComments = await commentsService.getCommentsByPostId(postId);

        if (postComments.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No comments found for this post" });
        }

        res.status(StatusCodes.OK).json(postComments);
    } catch (error) {
        next(error);  // תפס שגיאות והעבר אותן הלאה לטיפול מרכזי
    }
};


// הוספת תגובה
const addCommentHandler = async (req, res, next) => {
    try {
        const { text, postId } = req.body;  // תפס את שדות ה- text וה- postId

        if (!text) {  // לוודא שהשדה text קיים
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Text is required" });
        }

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
        const deleted = await commentsService.deleteCommentById(req.params.commentId);  // משתמש בפונקציה שכתבת
        if (deleted === 0) {  // אם ה-`deletedCount` הוא 0, זה אומר שהתגובה לא נמצאה
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
        }
        res.status(StatusCodes.NO_CONTENT).send();  // אם נמחק בהצלחה, אין תוכן להחזיר
    } catch (error) {
        next(error);  // תפס שגיאות והעבר אותן הלאה לטיפול מרכזי
    }
};



export {
    getAllCommentsHandler,
    getCommentByIdHandler,
    addCommentHandler,
    updateCommentByIdHandler,
    deleteCommentByIdHandler,
    getCommentsByPostIdHandler
};
