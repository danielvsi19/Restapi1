import StatusCodes from "http-status-codes";

const validatePost = (
    req, res, next
) => {
    const post = req.body;

    if (typeof post.title !== 'string' || post.title.trim() === '') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Post must contain a title!" });
    };

    if (typeof post.body !== 'string' || post.body.trim() === '') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Post must contain a body!" });
    };

    if (post.image && typeof post.image !== 'string') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Image must be a string!" });
    };

    if (typeof post.userId !== 'number' || !Number.isInteger(post.userId)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "User ID must exist!" });
    };

    next();
};

export default validatePost;