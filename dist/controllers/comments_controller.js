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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_model_1 = __importDefault(require("../models/comments_model"));
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.post_id;
    try {
        if (filter) {
            const comments = yield comments_model_1.default.find({ post_id: filter });
            res.send(comments);
        }
        else {
            const comments = yield comments_model_1.default.find();
            res.send(comments);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    try {
        const comment = yield comments_model_1.default.findById(commentId);
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const createAComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentBody = req.body;
    try {
        const comment = yield comments_model_1.default.create(commentBody);
        res.status(201).send(comment);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const updateCommentByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id; //Get the id from the json
    const commentBody = req.body;
    try {
        const comment = yield comments_model_1.default.updateOne({ _id: commentId }, { $set: { content: commentBody.content } });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
const deleteCommentByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id; //Get the id from the json
    try {
        const comment = yield comments_model_1.default.deleteOne({ _id: commentId });
        if (comment) {
            res.send(comment);
        }
        else {
            res.status(404).send("comment not found");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = {
    getAllComments,
    createAComment,
    updateCommentByID,
    getCommentById,
    deleteCommentByID,
};
//# sourceMappingURL=comments_controller.js.map