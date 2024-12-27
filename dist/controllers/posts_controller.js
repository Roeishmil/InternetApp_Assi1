"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostModel = require("../models/posts_model");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.sender;
    try {
        if (filter) {
            const posts = yield PostModel.find({ sender: filter });
            res.send(posts);
        }
        else {
            const posts = yield PostModel.find();
            res.send(posts);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const post = yield PostModel.findById(postId);
        if (post) {
            res.send(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const createAPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postBody = req.body;
    try {
        const post = yield PostModel.create(postBody);
        res.status(201).send(post);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const updatePostByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id; //Get the id from the json
    const postBody = req.body;
    try {
        const post = yield PostModel.updateOne({ _id: postId }, { $set: { content: postBody.content } });
        if (post) {
            res.send(post);
        }
        else {
            res.status(404).send("Post not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = {
    getAllPosts,
    createAPost,
    updatePostByID,
    getPostById,
};
//# sourceMappingURL=posts_controller.js.map