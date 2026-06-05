"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const router = express_1.default.Router();
router.param('id', book_controller_1.idController);
router.param('slug', book_controller_1.slugController);
router.get('/getAll', book_controller_1.getAllBooks);
router.get('/:slug', book_controller_1.getBookBySlug);
exports.default = router;
