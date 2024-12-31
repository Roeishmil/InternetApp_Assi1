import commentsModel, { IComments } from "../models/comments_model";
import { Request, Response } from "express";
import BaseController from "./base_controller";

class CommentsController extends BaseController<IComments> {
    constructor() {
        super(commentsModel);
    }

    async create(req: Request, res: Response) {
        const userId = req.body.owner;
        const comment = {
            ...req.body,
            owner: userId
        }
        req.body = comment;
        console.log(req.body);
        super.create(req, res);
    };

    async getAll(req: Request, res: Response) {
        try {
            const comments = await commentsModel.find();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    };

    async getById(req: Request, res: Response) {
        super.getById(req, res);
    };

    async deleteItem(req: Request, res: Response) {
        super.deleteItem(req, res);
    };

    async updateItem(req: Request, res: Response) {
        super.updateItem(req, res);
    };
}

export default new CommentsController();
// const commentsController = new BaseController<IComments>(commentsModel);

// commentsController.create = async (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     const comment = {
//         ...req.body,
//         owner: userId
//     }
//     req.body = comment;
//     commentsController.create(req, res);
// };

// commentsController.getAll = async (req: Request, res: Response) => {
//     commentsController.getAll(req, res);
// };

// commentsController.getById = async (req: Request, res: Response) => {
//     commentsController.getById(req, res);
// }

// commentsController.deleteItem = async (req: Request, res: Response) => {
//     commentsController.deleteItem(req, res);
// }

// commentsController.updateItem = async (req: Request, res: Response) => {
//     commentsController.updateItem(req, res);
// }
