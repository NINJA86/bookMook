"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idController = exports.slugController = void 0;
const mongoose_1 = require("mongoose");
const funcs_1 = require("../lib/funcs");
const model_1 = require("../model");
exports.slugController = (0, funcs_1.asyncHandler)(async (req, res, next) => {
    console.log(req.body);
    const slug = req.params.slug;
    const book = await model_1.bookModel.find({ slug });
    if (!book) {
        return res.status(404).json({
            message: 'Book not Found',
            statusCode: 404,
        });
    }
    req.book = book;
    next();
});
exports.idController = (0, funcs_1.asyncHandler)(async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: 'Invalid Id format',
            statusCode: 400,
        });
    }
    const getComments = await model_1.commentModel.find({ book: id });
    if (!getComments) {
        return res.status(404).json({
            message: 'Invalid ID (comment not found)',
            statusCode: 404,
        });
    }
    next();
});
