"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_controller_1 = __importDefault(require("../controllers/posts_controller"));
router.get("/", posts_controller_1.default.getAllPosts);
router.get("/:id", posts_controller_1.default.getPostById);
router.post("/", posts_controller_1.default.createAPost);
router.put("/:id", posts_controller_1.default.updatePostByID);
exports.default = router;
//# sourceMappingURL=posts_route.js.map