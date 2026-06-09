"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.commentModel = exports.categoryModel = exports.bookModel = exports.authorModel = void 0;
const author_model_1 = __importDefault(require("./author.model"));
exports.authorModel = author_model_1.default;
const book_model_1 = __importDefault(require("./book.model"));
exports.bookModel = book_model_1.default;
const category_model_1 = __importDefault(require("./category.model"));
exports.categoryModel = category_model_1.default;
const comment_model_1 = __importDefault(require("./comment.model"));
exports.commentModel = comment_model_1.default;
const user_model_1 = __importDefault(require("./user.model"));
exports.userModel = user_model_1.default;
