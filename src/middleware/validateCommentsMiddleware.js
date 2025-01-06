import StatusCodes from "http-status-codes";

const validateComment = (req, res, next) => {
    const comment = req.body;

    if (typeof comment.body !== 'string' || comment.body.trim() === '') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Comment must contain a body!" });
    };

    if (typeof comment.postId !== 'number' || !Number.isInteger(comment.postId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Comment must be associated with a post!" });
    };

    if (typeof comment.userId !== 'number' || !Number.isInteger(comment.userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID must be a valid number!" });
    };

    next();
};

export default validateComment;
