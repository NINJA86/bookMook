"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedComments = exports.addComment = exports.getCommentByBookId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const funcs_1 = require("../lib/funcs");
const model_1 = require("../model");
exports.getCommentByBookId = (0, funcs_1.asyncHandler)(async (req, res, next) => {
    const id = req.params.id;
    const comment = await model_1.commentModel.find({ book: id }).populate('user');
    console.log('comment');
    if (!comment) {
        return res.status(404).json({
            message: 'comment not found',
            statusCode: 404,
        });
    }
    return res.json(comment);
});
exports.addComment = (0, funcs_1.asyncHandler)(async (req, res, next) => {
    const { user, book, text, rating, location, avatar } = req.body;
    // ✅ validate کردن ObjectId ها
    if (!mongoose_1.default.Types.ObjectId.isValid(user) ||
        !mongoose_1.default.Types.ObjectId.isValid(book)) {
        return res.status(400).json({
            message: 'Invalid user or book ID',
            statusCode: 400,
        });
    }
    const result = await model_1.commentModel.create({
        user,
        book,
        text,
        rating,
        location,
        avatar,
    });
    // ✅ منطق درست - if result یعنی موفق شد
    if (!result) {
        return res.status(400).json({
            message: 'Adding comment has been failed',
            statusCode: 400,
        });
    }
    return res.status(201).json({
        message: 'Comment has been successfully added',
        statusCode: 201,
        data: result,
    });
});
exports.getFeaturedComments = (0, funcs_1.asyncHandler)(async (req, res, next) => {
    const featuredComments = await model_1.commentModel
        .find({ rating: { $gte: 4 } })
        .populate('book', 'title slug')
        .populate('user', 'name')
        .limit(10);
    return res.json(featuredComments);
});
