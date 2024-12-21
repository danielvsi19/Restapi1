import { postsRepository } from "../repositories/postRepository.js";
import getDatabase from "../Connection/connection.js";
import { ObjectId } from "mongodb";

let postsIdCounter = postsRepository.length;
let postsCollection;

const getCollection = async () => {
    const db = await getDatabase();
    postsCollection = db.collection("posts"); 
};

const getAllPosts = async () => {
    return await postsCollection.find().toArray();
};

const addPost = async (post) => {
    const result = await postsCollection.insertOne(post);
    
    return result.insertedId;
};

const getPostById = async (postId) => {
    return await postsCollection.findOne(
        { _id: ObjectId.createFromHexString(postId) }
    );
};

const getAllPostsByUserId = async (userId) => {
    return await postsCollection.find(
        { userId: userId }
    ).toArray();
};

const updatePostById = async (postId, replacementPost) => {
    const result = await postsCollection.updateOne(
        { _id: ObjectId.createFromHexString(postId) },
        { $set: replacementPost },
    );
    
    if (result.matchedCount === 0) {
        throw new Error(`Post with ID ${postId} does not exist!`);
    } else {
        return result.modifiedCount;

        postsRepository[postIndex] = { ...postsRepository[postIndex], ...replacementPost };
    };
};

export {
    getAllPosts,
    addPost,
    getPostById,
    getAllPostsByUserId,
    updatePostById,
    getCollection,
};