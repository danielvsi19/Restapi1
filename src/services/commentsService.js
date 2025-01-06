import { ObjectId } from "mongodb";
import getDatabase from "../Connection/connection.js";

let commentsCollection;

const getCommentsCollection = async () => {
    const db = await getDatabase();
    commentsCollection = db.collection("comments"); 
};

const addComment = async (comment) => {
    console.log(comment);
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
    addComment,
    getAllComments,
    getCommentById,
    deleteCommentById,
    getCommentsCollection
};