import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, "Body is required"],
    },
    text: {
        type: String,
        required: [true, "Text is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post ID is required"],
    },
}, {
    timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
