"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controller/comment.controller");
const params_middleware_1 = require("../middlewares/params.middleware");
const router = express_1.default.Router();
router.get('/featured', comment_controller_1.getFeaturedComments);
router.route('/:id').get(params_middleware_1.idController, comment_controller_1.getCommentByBookId).post(comment_controller_1.addComment);
exports.default = router;
