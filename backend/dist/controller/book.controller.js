"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBooks = exports.getBookBySlug = void 0;
const book_model_1 = __importDefault(require("../model/book.model"));
const funcs_1 = require("../lib/funcs");
const book = book_model_1.default;
// -------------------- CONTROLLERS --------------------
exports.getBookBySlug = (0, funcs_1.asyncHandler)(async (req, res) => {
    const { slug } = req.params;
    const findBookBySlug = await book
        .findOne({ slug })
        .populate('author')
        .populate('category');
    if (!findBookBySlug) {
        return res.status(404).json({
            message: 'Book not found',
            statusCode: 404,
        });
    }
    return res.status(200).json(findBookBySlug);
});
exports.getAllBooks = (0, funcs_1.asyncHandler)(async (req, res) => {
    const books = await book.find({}).populate('author').populate('category');
    return res.status(200).json(books);
});
