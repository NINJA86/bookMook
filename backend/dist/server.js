"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const db_1 = __importDefault(require("./lib/db"));
require("./model/index");
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/api/book', book_route_1.default);
app.use('/api/comment', comment_route_1.default);
const startServer = async () => {
    await (0, db_1.default)();
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
};
startServer();
