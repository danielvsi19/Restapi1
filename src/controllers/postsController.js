import { StatusCodes } from "http-status-codes";

import * as postsService from "../services/postsService.js";

const getAllPostsHandler = async (
    req, res, next,
) => {
    try {
        const senderId = req.query.sender;

        const allPosts = senderId 
        ? await postsService.getAllPostsByUserId(+ senderId) 
        : await postsService.getAllPosts();

        res.status(StatusCodes.OK).json(allPosts);
    } catch (error) {
        next(error);
    };
};

const getPostByIdHandler = async (
    req, res, next,
) => {
    try {
        const postById = await postsService.getPostById(req.params.postId);

        res.status(StatusCodes.OK).json(postById);
    } catch (error) {
        next(error);
    };
};

const addPostHandler = async (
    req, res, next,
) => {
    try {
        await postsService.addPost(req.body);

        res.status(StatusCodes.CREATED).send(`Post added succesfully!`);
    } catch (error) {
        next(error);
    };
};

const updatePostByIdHandler = async (
    req, res, next
) => {
    try {
        await postsService.updatePostById(req.params.postId, req.body);

        res.status(StatusCodes.OK).send(`Post with ID ${req.params.postId} updated succesfully!`);
    } catch (error) {
        next(error);
    };
};

export {
    getAllPostsHandler,
    getPostByIdHandler,
    addPostHandler,
    updatePostByIdHandler,
};