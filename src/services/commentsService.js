import { ObjectId } from "mongodb";
import getDatabase from "../Connection/connection.js"; // חיבור לבסיס נתונים

let commentsCollection;

const getCollection = async () => {
    const db = await getDatabase();
    commentsCollection = db.collection("comments"); // יצירת הקולקציה בשם "comments"
};

const addComment = async (comment) => {
    const result = await commentsCollection.insertOne(comment);
    return result.insertedId;
};

const getAllComments = async () => {
    return await commentsCollection.find().toArray();
};

const getCommentById = async (id) => {
    return await commentsCollection.findOne({ _id: ObjectId(id) });
};

const deleteCommentById = async (id) => {
    const result = await commentsCollection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
};

export {
    getCollection,
    addComment,
    getAllComments,
    getCommentById,
    deleteCommentById
};
