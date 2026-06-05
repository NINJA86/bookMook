"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = exports.getBookBySlug = exports.slugController = exports.idController = void 0;
const book_model_1 = __importDefault(require("../model/book.model"));
const funcs_1 = require("../lib/funcs");
const book = book_model_1.default;
// -------------------- PARAM MIDDLEWARE --------------------
const idController = (req, res, next, id) => {
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            message: 'Invalid ID',
            statusCode: 400,
        });
    }
    next();
};
exports.idController = idController;
const slugController = (req, res, next, slug) => {
    if (!slug) {
        return res.status(400).json({
            message: 'Invalid slug',
            statusCode: 400,
        });
    }
    next();
};
exports.slugController = slugController;
// -------------------- CONTROLLERS --------------------
exports.getBookBySlug = (0, funcs_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const findBookBySlug = await book.findOne({ slug });
    if (!findBookBySlug) {
        return res.status(404).json({
            message: 'Book not found',
            statusCode: 404,
        });
    }
    return res.status(200).json(findBookBySlug);
});
exports.getAllBooks = (0, funcs_1.asyncHandler)(async (req, res) => {
    const books = await book.find({});
    return res.status(200).json(books);
});
