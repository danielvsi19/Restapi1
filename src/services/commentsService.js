import mongoose from 'mongoose';

const Comment = mongoose.model('Comment', new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}));


const addComment = async (commentData) => {
    try {
        const newComment = new Comment(commentData);
        await newComment.save();
        return newComment;
    } catch (error) {
        throw error;
    }
};

const getCommentsByPostId = async (postId) => {
    try {
        const comments = await Comment.find({ postId: postId }).exec();  // מציאת תגובות לפי postId
        return comments;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching comments");
    }
};

const getAllComments = async () => {
    try {
        const comments = await Comment.find({});
        return comments;
    } catch (error) {
        throw error;
    }
};

const getCommentById = async (commentId) => {
    try {
        const comment = await Comment.findById(commentId);
        return comment;
    } catch (error) {
        throw error;
    }
};

const updateCommentById = async (commentId, updatedData) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, updatedData, { new: true });
        return updatedComment;
    } catch (error) {
        throw error;
    }
};

const deleteCommentById = async (commentId) => {
    try {
        const deleted = await Comment.deleteOne({ _id: commentId });
        return deleted.deletedCount;
    } catch (error) {
        throw error;
    }
};

export { addComment, getCommentsByPostId, getAllComments, getCommentById, updateCommentById, deleteCommentById };
